import { db } from '@/app/api/client';
import { ShortenUrlResponse } from '@/features/url-shortener';
import { ErrorResponse } from '@/errors';

export const shortenUrl = async (url: string, slug: string) => {
    const response = await fetch('/api/url-entry', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url, slug }),
    });

    if (!response.ok) {
        const { error } = (await response.json()) as ErrorResponse;
        throw new Error(error);
    }

    const data = (await response.json()) as ShortenUrlResponse;
    return data;
};

export const getUrlEntry = async (slug: string) => {
    const urlEntry = await db.urlEntry.findUnique({
        where: { slug: slug },
    });

    return urlEntry;
};
