'use server';

import z from 'zod';

import { db } from '@/db';
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

    let newUser;
    try {
        const existingUser = await db.user.findUnique({
            where: { login: validatedBody.email },
        });
        if (existingUser) {
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

        const clientsGroup = await db.group.findUnique({
            where: { name: 'Clients' },
        });
        if (!clientsGroup) {
            logger.error('Clients group not found in the database');
            throw new Error('Clients group not found in the database');
        }

        const hashedPassword = await hashPassword(validatedBody.password);
        newUser = await db.user.create({
            data: {
                login: validatedBody.email,
                password: hashedPassword,
                groups: {
                    connect: {
                        id: clientsGroup.id,
                    },
                },
            },
        });
    } catch (error) {
        logger.error('Error occurred while creating user', { error });
        return {
            status: 'unknown-error',
            data: 'An unknown error occurred while creating the user',
        };
    }

    const jwtToken = signJwt(newUser);
    await setAuthCookie(jwtToken);

    return {
        status: 'success',
        data: { message: 'User registered successfully' },
    };
}
