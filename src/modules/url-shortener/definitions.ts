import z from 'zod';

export const shortenUrlSchema = z.object({
    url: z.url({
        protocol: /^https?$/,
        hostname: z.regexes.domain,
    }),
    slug: z.string().max(32),
});

export type ShortenUrlFormData = z.infer<typeof shortenUrlSchema>;

export type Slug = string;

export type ShortenUrlSuccess = { message: string; url: string };
