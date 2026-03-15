import { getCookie } from './cookie';

export const isUserAuthenticated = async () => {
    const token = await getCookie('auth_token');
    return !!token;
};
