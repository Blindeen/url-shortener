import { NextRequest } from 'next/server';
import z from 'zod';

import { db } from '../client';

const shortenUrlRequestSchema = z.object({
    url: z.url({
        protocol: /^https?$/,
        hostname: z.regexes.domain,
    }),
});

export async function POST(request: NextRequest) {
    const body = await request.json();

    let validatedBody;
    try {
        validatedBody = shortenUrlRequestSchema.parse(body);
    } catch (error) {
        const zodError = error as z.ZodError;
        const errors = zodError.issues.map((issue) => ({
            path: issue.path,
            message: issue.message,
        }));

        return Response.json({ errors: errors }, { status: 400 });
    }

    let newEntry;
    try {
        newEntry = await db.urlEntry.create({
            data: {
                originalUrl: validatedBody.url,
            },
        });
    } catch (error) {
        return Response.json(
            { error: 'Failed to save short URL in the database' },
            { status: 500 }
        );
    }

    const shortUrl = process.env.SERVER_URL + '/' + newEntry.slug;

    return Response.json(
        { message: 'URL shortened successfully', url: shortUrl },
        { status: 201 }
    );
}
