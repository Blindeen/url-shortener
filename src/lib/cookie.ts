import { cookies } from 'next/headers';
import { type ResponseCookie } from 'next/dist/compiled/@edge-runtime/cookies/index';

export const setCookie = async (
    name: string,
    value: string,
    options?: Partial<ResponseCookie>
) => {
    const cookieStore = await cookies();
    cookieStore.set(name, value, options);
};

export const getCookie = async (name: string) => {
    const cookieStore = await cookies();
    return cookieStore.get(name);
};

export const deleteCookie = async (name: string) => {
    const cookieStore = await cookies();
    cookieStore.delete(name);
};

export const setAuthCookie = async (token: string) => {
    const cookieOptions = {
        expires: undefined, //TODO: set an expiration date for the cookie based on max age from environment variables
        maxAge: undefined, //TODO: set a max age for the cookie from environment variables
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
    };
    await setCookie('auth_token', token, cookieOptions);
};

export const deleteAuthCookie = async () => {
    await deleteCookie('auth_token');
};
