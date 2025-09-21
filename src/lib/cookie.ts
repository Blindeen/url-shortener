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
    const expirationTime = parseInt(process.env.JWT_EXPIRATION || '3600', 10);
    const cookieOptions = {
        maxAge: expirationTime,
        path: '/',
        secure: process.env.NODE_ENV === 'production',
        httpOnly: true,
    };
    await setCookie('auth_token', token, cookieOptions);
};

export const deleteAuthCookie = async () => {
    await deleteCookie('auth_token');
};
