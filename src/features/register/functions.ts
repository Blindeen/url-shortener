'use server';

export async function registerUser(
    prevState: {
        email?: string;
        password?: string;
        error: { email?: string; password?: string };
    },
    payload: FormData
) {
    const email = payload.get('email')?.toString().trim();
    const password = payload.get('password')?.toString().trim();

    //TODO: validate email and password with zod

    //TODO: check if user already exists, if not create a new user

    //TODO: generate a JWT token and set it as a cookie

    return {
        email,
        password,
        error: {
            email: undefined,
            password: undefined,
        },
    };
}
