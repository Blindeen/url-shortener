import {
    redirect,
    permanentRedirect,
    notFound,
    RedirectType,
} from 'next/navigation';

import { getOriginalUrl } from '@/features/url-shortener';
import { logger } from '@/lib/logger';

export default async function RedirectPage(props: PageProps<'/[slug]'>) {
    const { slug } = await props.params;

    let originalUrl: string | undefined;
    try {
        originalUrl = await getOriginalUrl(slug);
    } catch (error) {
        logger.error(`Error fetching original URL: ${error}`);
        redirect('/error', RedirectType.replace);
    }

    if (originalUrl === undefined) {
        notFound();
    }

    permanentRedirect(originalUrl, RedirectType.replace);
}
