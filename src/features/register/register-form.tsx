'use client';

import { useActionState } from 'react';
import Link from 'next/link';
import { Loader2Icon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    Card,
    CardContent,
    CardFooter,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

import { registerUser } from './functions';

export function RegisterForm() {
    const [state, action, pending] = useActionState(registerUser, {
        email: '',
        password: '',
        error: {
            email: undefined,
            password: undefined,
        },
    });

    return (
        <Card className='w-full max-w-sm'>
            <CardHeader>
                <CardTitle>Register a new account</CardTitle>
            </CardHeader>
            <form className='flex flex-col gap-6' action={action}>
                <CardContent>
                    <div className='flex flex-col gap-2'>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor='email'>Email</Label>
                            <div className='flex h-17 flex-col gap-2'>
                                <Input
                                    id='email'
                                    name='email'
                                    type='text'
                                    defaultValue={state.email}
                                    placeholder='Email'
                                />
                                {state.error.email && (
                                    <div className='text-sm text-red-600'>
                                        {state.error.email}
                                    </div>
                                )}
                            </div>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <Label htmlFor='password'>Password</Label>
                            {/* <div className='flex items-center'>
                                <Label htmlFor='password'>Password</Label>
                                <a
                                    href='#'
                                    className='ml-auto inline-block text-sm underline-offset-4 hover:underline'
                                >
                                    Forgot your password?
                                </a>
                            </div> */}
                            <div className='flex h-17 flex-col gap-2'>
                                <Input
                                    id='password'
                                    name='password'
                                    type='password'
                                    defaultValue={state.password}
                                    placeholder='Password'
                                />
                                {state.error.password && (
                                    <div className='text-sm text-red-600'>
                                        {state.error.password}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </CardContent>
                <CardFooter className='flex-col gap-2'>
                    <Button type='submit' className='w-full' disabled={pending}>
                        {pending ? (
                            <Loader2Icon className='animate-spin' />
                        ) : (
                            'Register'
                        )}
                    </Button>
                    <Button variant='outline' className='w-full' asChild>
                        <Link href='/login'>Login</Link>
                    </Button>
                </CardFooter>
            </form>
        </Card>
    );
}
