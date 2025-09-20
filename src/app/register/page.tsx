import type { Metadata } from 'next';
import { RegisterForm } from '@/modules/register';

export const metadata: Metadata = {
    title: 'Register',
};

export default function RegistrationPage() {
    return (
        <div className='flex h-full items-center justify-center'>
            <RegisterForm />
        </div>
    );
}
