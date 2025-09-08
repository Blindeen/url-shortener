import { db } from '@/app/api/client';

import { ShortenUrlResponse } from './types';

export const shortenUrl = async (url: string) => {
    const response = await fetch('/api/url-entry', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
    });

    if (!response.ok) {
        throw new Error(`Failed to shorten URL: ${response.status}`);
    }

    const data = (await response.json()) as ShortenUrlResponse;
    return data;
};

export async function getOriginalUrl(slug: string) {
    const urlEntry = await db.urlEntry.findUnique({
        where: { slug: slug },
    });

    if (urlEntry === null) {
        throw new Error('URL not found');
    }

    return urlEntry.originalUrl;
}
