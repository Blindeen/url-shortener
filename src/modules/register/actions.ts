'use server';

import z from 'zod';

import { db } from '@/lib/db';
import { setAuthCookie } from '@/lib/cookie';
import { type ActionResponse } from '@/lib/server-action';
import { hashPassword } from '@/lib/password';

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
        return {
            status: 'action-error',
            data: { errors },
        };
    }

    let newUser;
    try {
        const existingUser = await db.user.findUnique({
            where: { login: validatedBody.email },
        });
        if (existingUser) {
            return {
                status: 'action-error',
                data: { errors: ['Email is already registered'] },
            };
        }

        const hashedPassword = await hashPassword(validatedBody.password);
        newUser = await db.user.create({
            data: {
                login: validatedBody.email,
                password: hashedPassword,
            },
        });
    } catch {
        return {
            status: 'unknown-error',
            data: 'An unknown error occurred while creating the user',
        };
    }

    //TODO: generate a JWT token and set it as a cookie
    const jwtToken = 'dummy-token';
    await setAuthCookie(jwtToken);

    return {
        status: 'success',
        data: { message: 'User registered successfully' },
    };
}
