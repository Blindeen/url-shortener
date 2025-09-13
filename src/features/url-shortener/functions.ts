import { db } from '@/lib/db';

export const getUrlEntry = async (slug: string) => {
    const urlEntry = await db.urlEntry.findUnique({
        where: { slug: slug },
    });

    return urlEntry;
};
