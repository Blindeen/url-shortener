import { permanentRedirect, notFound, RedirectType } from 'next/navigation';

import { getOriginalUrl } from '@/features/url-shortener';

export default async function RedirectPage(props: PageProps<'/[slug]'>) {
    const { slug } = await props.params;

    let originalUrl: string;
    try {
        originalUrl = await getOriginalUrl(slug);
    } catch {
        notFound();
    }

    permanentRedirect(originalUrl, RedirectType.replace);
}
