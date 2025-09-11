import { NextRequest } from 'next/server';
import z from 'zod';

import { db } from '../client';
import { logger } from '@/lib/logger';
import { getUrlEntry } from '@/features/url-shortener';
import { Slug } from '@/features/url-shortener';

const shortenUrlRequestSchema = z.object({
    url: z.url({
        protocol: /^https?$/,
        hostname: z.regexes.domain,
    }),
    slug: z.string().max(32),
});

export async function POST(request: NextRequest) {
    const body = await request.json();

    let validatedBody;
    try {
        validatedBody = shortenUrlRequestSchema.parse(body);
    } catch (error) {
        const zodError = error as z.ZodError;
        const errorMessage = zodError.issues[0].message;
        logger.error(`Invalid request body to ${request.url}: ${errorMessage}`);

        return Response.json({ error: errorMessage }, { status: 400 });
    }

    let slug: Slug | undefined;
    try {
        slug = validatedBody.slug
            ? encodeURIComponent(validatedBody.slug)
            : undefined;
    } catch (error) {
        logger.error(`Failed to process the given slug: ${error}`);
        return Response.json(
            { error: 'Failed to process the given slug' },
            { status: 500 }
        );
    }

    let newEntry;
    try {
        if (slug !== undefined && (await getUrlEntry(slug)) !== null) {
            return Response.json(
                {
                    error: 'Slug is already in use. Please choose another one',
                },
                { status: 409 }
            );
        }

        newEntry = await db.urlEntry.create({
            data: {
                originalUrl: validatedBody.url,
                slug: slug,
            },
        });
    } catch (error) {
        logger.error(`Failed to access the database: ${error}`);
        return Response.json(
            { error: 'Unexpected error occurred' },
            { status: 500 }
        );
    }

    const shortUrl = new URL(`/${newEntry.slug}`, process.env.SERVER_URL);

    return Response.json(
        { message: 'URL shortened successfully', url: shortUrl },
        { status: 201 }
    );
}
