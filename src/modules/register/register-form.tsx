'use client';

import Link from 'next/link';
import { useTransition } from 'react';
import { useRouter } from 'next/navigation';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Loader2Icon } from 'lucide-react';
import { toast } from 'sonner';

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
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';

import { registerUser } from './actions';
import { registerUserSchema, type RegisterFormData } from './definitions';

export function RegisterForm() {
    const form = useForm<RegisterFormData>({
        resolver: zodResolver(registerUserSchema),
        defaultValues: {
            email: '',
            password: '',
        },
    });
    const [isPending, startTransition] = useTransition();
    const router = useRouter();

    const onSubmit = (data: RegisterFormData) => {
        startTransition(async () => {
            const formData = new FormData();
            formData.append('email', data.email);
            formData.append('password', data.password);

            const response = await registerUser(formData);
            if (response.status === 'success') {
                toast.success(response.data.message);
                router.replace('/');
            } else if (response.status === 'action-error') {
                response.data.errors.forEach((error) => toast.error(error));
            }
        });
    };

    return (
        <Card className='w-full max-w-sm'>
            <CardHeader>
                <CardTitle>Register a new account</CardTitle>
            </CardHeader>

            <Form {...form}>
                <form
                    className='flex flex-col gap-3'
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <CardContent className='flex flex-col gap-3'>
                        <div className='flex flex-col gap-1'>
                            <Label htmlFor='email'>Email</Label>
                            <FormField
                                control={form.control}
                                name='email'
                                render={({ field }) => (
                                    <FormItem className='h-16 w-full'>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className='bg-white'
                                                placeholder='Email'
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                        <div className='flex flex-col gap-1'>
                            <Label htmlFor='password'>Password</Label>
                            <FormField
                                control={form.control}
                                name='password'
                                render={({ field }) => (
                                    <FormItem className='h-16 w-full'>
                                        <FormControl>
                                            <Input
                                                {...field}
                                                className='bg-white'
                                                type='password'
                                                placeholder='Password'
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>
                    </CardContent>

                    <CardFooter className='flex-col gap-2'>
                        <Button
                            type='submit'
                            className='w-full'
                            disabled={isPending}
                        >
                            {isPending ? (
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
            </Form>
        </Card>
    );
}
