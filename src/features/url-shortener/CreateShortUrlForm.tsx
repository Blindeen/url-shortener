'use client';

import { useState } from 'react';

import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from '@/components/ui/tooltip';
import { ChevronRightIcon, Loader2Icon } from 'lucide-react';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '@/components/ui/form';

import { shortenUrl } from './functions';

const formSchema = z.object({
    url: z.url({
        protocol: /^https?$/,
        hostname: z.regexes.domain,
    }),
});

export function CreateShortUrlForm() {
    const [loading, setLoading] = useState(false);
    const [shortenedUrl, setShortenedUrl] = useState<string | undefined>(
        undefined
    );
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            url: '',
        },
    });

    const onSubmit = async (formData: z.infer<typeof formSchema>) => {
        setLoading(true);
        try {
            const response = await shortenUrl(formData.url);
            setShortenedUrl(response.url);
            form.reset();
            toast.success('URL shortened successfully!');
        } catch {
            toast.error('Failed to shorten URL. Please try again.');
        } finally {
            setLoading(false);
        }
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
        <div className='flex h-28 w-5/6 flex-col gap-y-2 md:w-3/5 lg:w-4/12'>
            <Form {...form}>
                <form
                    className='flex gap-x-2'
                    onSubmit={form.handleSubmit(onSubmit)}
                >
                    <FormField
                        control={form.control}
                        name='url'
                        render={({ field }) => (
                            <FormItem className='h-16 flex-1'>
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
                        disabled={loading}
                    >
                        {loading ? (
                            <Loader2Icon className='animate-spin' />
                        ) : (
                            <ChevronRightIcon />
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
