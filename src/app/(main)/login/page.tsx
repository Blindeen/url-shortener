import type { Metadata } from 'next';
import { LoginForm } from '@/modules/login';

export const metadata: Metadata = {
    title: 'Login',
};

export default function LoginPage() {
    return (
        <div className='flex h-full items-center justify-center'>
            <LoginForm />
        </div>
    );
}
