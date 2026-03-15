'use server';

import { redirect, RedirectType } from 'next/navigation';

import z from 'zod';

import {
    createUser,
    checkUserExists,
    getUserWithGroups,
    getGroupByName,
} from '@/db';
import { setAuthCookie } from '@/lib/cookie';
import { type ActionResponse } from '@/lib/server-action';
import { hashPassword } from '@/lib/password';
import { signJwt } from '@/lib/jwt';
import { logger } from '@/lib/logger';

import { registerUserSchema, type RegisterSuccess } from './definitions';

export async function registerUser(
    payload: FormData
): Promise<ActionResponse<RegisterSuccess>> {
    const email = payload.get('email')?.toString().trim();
    const password = payload.get('password')?.toString().trim();

    let validatedBody;
    try {
        validatedBody = registerUserSchema.parse({ email, password });
    } catch (error) {
        const zodError = error as z.ZodError;
        const errors = zodError.issues.map((issue) => issue.message);

        logger.warn('User registration validation failed', { errors: errors });
        return {
            status: 'action-error',
            data: { errors: errors },
        };
    }

    let newUserWithGroups;
    try {
        const doesUserExist = await checkUserExists(validatedBody.email);
        if (doesUserExist) {
            logger.warn(
                'Attempt to register with an already registered email',
                {
                    email: validatedBody.email,
                }
            );
            return {
                status: 'action-error',
                data: { errors: ['Email is already registered'] },
            };
        }

        const clientsGroup = await getGroupByName('Clients');
        const hashedPassword = await hashPassword(validatedBody.password);
        const newUser = await createUser(
            validatedBody.email,
            hashedPassword,
            clientsGroup.id
        );
        newUserWithGroups = await getUserWithGroups(newUser.id);
    } catch (error) {
        logger.error('Error occurred while creating user', { error });
        return {
            status: 'unknown-error',
            data: 'An unknown error occurred while creating the user',
        };
    }

    const jwtToken = signJwt(newUserWithGroups);
    await setAuthCookie(jwtToken);
    redirect('/', RedirectType.replace);
}
