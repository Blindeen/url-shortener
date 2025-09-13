import {
    redirect,
    permanentRedirect,
    notFound,
    RedirectType,
} from 'next/navigation';

import { getUrlEntry } from '@/features/url-shortener';
import { logger } from '@/lib/logger';

import { UrlEntry } from '../../../generated/prisma';

export default async function RedirectPage(props: PageProps<'/[slug]'>) {
    const { slug } = await props.params;

    let urlEntry: UrlEntry | null;
    try {
        urlEntry = await getUrlEntry(slug);
    } catch (error) {
        logger.error(`Error fetching original URL: ${error}`);
        redirect('/error', RedirectType.replace);
    }

    if (urlEntry === null) {
        notFound();
    }

    permanentRedirect(urlEntry.originalUrl, RedirectType.replace);
}
