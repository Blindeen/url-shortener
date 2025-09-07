'use client';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ChevronRightIcon } from 'lucide-react';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';

const formSchema = z.object({
    url: z.url({
        protocol: /^https?$/,
        hostname: z.regexes.domain,
    }),
});

export function CreateShortUrlForm() {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            url: '',
        },
    });

    const onSubmit = (formData: z.infer<typeof formSchema>) => {
        console.log(formData);
    };

    return (
        <Form {...form}>
            <form
                className='flex h-16 w-5/6 gap-x-2 md:w-3/5 lg:w-4/12'
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <FormField
                    control={form.control}
                    name='url'
                    render={({ field }) => (
                        <FormItem className='flex-1'>
                            <FormControl>
                                <Input
                                    className='bg-white'
                                    placeholder='Enter a URL'
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
                <Button
                    className='cursor-pointer'
                    variant='secondary'
                    size='icon'
                    type='submit'
                >
                    <ChevronRightIcon />
                </Button>
            </form>
        </Form>
    );
}
