'use server';

import { cookies } from 'next/headers';
import z from 'zod';

import { db } from '@/lib/db';
import { type ActionResponse } from '@/lib/server-action';
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

        newUser = await db.user.create({
            data: {
                login: validatedBody.email,
                password: validatedBody.password,
            },
        });
    } catch {
        return {
            status: 'unknown-error',
            data: 'An unknown error occurred while creating the user',
        };
    }

    // TODO: Export cookies to a utility function - cookie.ts
    const cookieStore = await cookies();
    const token = 'dummy-token'; //TODO: generate a JWT token and set it as a cookie
    const cookieOptions = {
        expires: undefined, //TODO: set an expiration date for the cookie
        maxAge: undefined, //TODO: set a max age for the cookie
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
    };
    cookieStore.set('token', token, cookieOptions);

    return {
        status: 'success',
        data: { message: 'User registered successfully' },
    };
}
