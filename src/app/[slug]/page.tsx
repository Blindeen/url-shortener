import { permanentRedirect, RedirectType } from 'next/navigation';

import { getOriginalUrl } from '@/features/url-shortener';

export default async function RedirectPage(props: PageProps<'/[slug]'>) {
    const { slug } = await props.params;
    const originalUrl = await getOriginalUrl(slug);
    permanentRedirect(originalUrl, RedirectType.replace);
}
