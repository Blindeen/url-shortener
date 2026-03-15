'use server';

import { redirect, RedirectType } from 'next/navigation';
import { deleteAuthCookie } from '@/lib/cookie';

export const logout = async () => {
    await deleteAuthCookie();
    redirect('/login', RedirectType.replace);
};
