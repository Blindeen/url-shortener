import { permanentRedirect, notFound, RedirectType } from 'next/navigation';

import { getOriginalUrl } from '@/features/url-shortener';
import { logger } from '@/lib/logger';

export default async function RedirectPage(props: PageProps<'/[slug]'>) {
    const { slug } = await props.params;

    let originalUrl: string;
    try {
        originalUrl = await getOriginalUrl(slug);
    } catch (error) {
        logger.error(
            `Failed to retrieve original URL for slug "${slug}": ${error}`
        );
        notFound();
    }

    permanentRedirect(originalUrl, RedirectType.replace);
}
