import { db } from '@/lib/db';

import type { Slug } from './types';

export const getUrlEntry = async (slug: Slug) => {
    const urlEntry = await db.urlEntry.findUnique({
        where: { slug: slug },
    });

    return urlEntry;
};
