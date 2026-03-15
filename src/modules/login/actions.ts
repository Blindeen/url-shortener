'use server';

import { redirect, RedirectType } from 'next/navigation';

import z from 'zod';

import { checkUserExists, getUserByEmail, getUserWithGroups } from '@/db';
import { setAuthCookie } from '@/lib/cookie';
import { type ActionResponse } from '@/lib/server-action';
import { comparePassword } from '@/lib/password';
import { signJwt } from '@/lib/jwt';
import { logger } from '@/lib/logger';

import { loginUserSchema, type LoginSuccess } from './definitions';

export async function loginUser(
    payload: FormData
): Promise<ActionResponse<LoginSuccess>> {
    const email = payload.get('email')?.toString().trim();
    const password = payload.get('password')?.toString().trim();

    let validatedBody;
    try {
        validatedBody = loginUserSchema.parse({ email, password });
    } catch (error) {
        const zodError = error as z.ZodError;
        const errors = zodError.issues.map((issue) => issue.message);

        logger.warn('User login validation failed', { errors });
        return {
            status: 'action-error',
            data: { errors },
        };
    }

    let userWithGroups;
    try {
        const doesUserExist = await checkUserExists(validatedBody.email);
        if (!doesUserExist) {
            return {
                status: 'action-error',
                data: { errors: ['Invalid email or password'] },
            };
        }

        const user = await getUserByEmail(validatedBody.email);
        const isPasswordValid = await comparePassword(
            validatedBody.password,
            user.password
        );
        if (!isPasswordValid) {
            logger.warn('Failed login attempt', { email: validatedBody.email });
            return {
                status: 'action-error',
                data: { errors: ['Invalid email or password'] },
            };
        }

        userWithGroups = await getUserWithGroups(user.id);
    } catch (error) {
        logger.error('Error occurred while logging in', { error });
        return {
            status: 'unknown-error',
            data: 'An unknown error occurred while logging in',
        };
    }

    const jwtToken = signJwt(userWithGroups);
    await setAuthCookie(jwtToken);
    redirect('/', RedirectType.replace);
}
