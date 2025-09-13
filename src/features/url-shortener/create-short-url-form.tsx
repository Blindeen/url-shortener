'use client';

import { useState } from 'react';

import { z } from 'zod';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { Loader2Icon } from 'lucide-react';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';

import { performRequest } from '@/lib/api';

const formSchema = z.object({
    url: z.url({
        protocol: /^https?$/,
        hostname: z.regexes.domain,
    }),
    slug: z.string().max(32),
});

type ShortUrlFormData = z.infer<typeof formSchema>;

type ShortUrlResponse = { message: string; url: string };

export function CreateShortUrlForm() {
    const [loading, setLoading] = useState(false);
    const [shortenedUrl, setShortenedUrl] = useState<string | undefined>(
        undefined
    );
    const form = useForm<ShortUrlFormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            url: '',
            slug: '',
        },
    });

    const onSubmit = async (formData: ShortUrlFormData) => {
        setLoading(true);

        const response = await performRequest<
            ShortUrlFormData,
            ShortUrlResponse
        >('/api/url-entry', 'POST', formData);

        if (response.status === 'success') {
            setShortenedUrl(response.data.url);
            toast.success(response.data.message);
            form.reset();
        } else if (response.status === 'api-error') {
            response.data.errors.forEach((error) => toast.error(error));
        }

        setLoading(false);
    };

    const copyShortUrl = async () => {
        if (!shortenedUrl) return;
        try {
            await navigator.clipboard.writeText(shortenedUrl);
            toast.success('Shortened URL copied to clipboard!');
        } catch {
            toast.error('Writing to clipboard is not allowed.');
        }
    };

    return (
        <div className='flex h-64 w-5/6 flex-col gap-y-8 md:w-3/5 lg:w-4/12'>
            <Form {...form}>
                <form
                    className='flex flex-col items-center gap-y-2'
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <FormField
                        control={form.control}
                        name='url'
                        render={({ field }) => (
                            <FormItem className='h-16 w-full'>
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
                    <FormField
                        control={form.control}
                        name='slug'
                        render={({ field }) => (
                            <FormItem className='h-16 w-full'>
                                <FormControl>
                                    <Input
                                        className='bg-white'
                                        placeholder='Enter a suffix (optional)'
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button
                        className='w-1/2 cursor-pointer'
                        variant='default'
                        type='submit'
                        disabled={loading}
                    >
                        {loading ? (
                            <Loader2Icon className='animate-spin' />
                        ) : (
                            'Submit'
                        )}
                    </Button>
                </form>
            </Form>
            <Tooltip>
                <TooltipTrigger asChild>
                    {shortenedUrl && (
                        <Input
                            className='cursor-pointer bg-white'
                            placeholder='Shortened URL will appear up here'
                            value={shortenedUrl}
                            onClick={copyShortUrl}
                            readOnly
                        />
                    )}
                </TooltipTrigger>
                <TooltipContent>
                    <p>Click to copy the shortened URL</p>
                </TooltipContent>
            </Tooltip>
        </div>
    );
}
