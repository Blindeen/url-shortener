import { db } from '@/app/api/client';

export async function getOriginalUrl(slug: string) {
    const urlEntry = await db.urlEntry.findUnique({
        where: { slug: slug },
    });

    if (urlEntry === null) {
        throw new Error('URL not found');
    }

    return urlEntry.originalUrl;
}
