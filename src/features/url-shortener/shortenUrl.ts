interface ShortenUrlResponse {
    url: string;
}

export const shortenUrl = async (url: string) => {
    const response = await fetch('/api/url-entry', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ url }),
    });

    if (!response.ok) {
        throw new Error('Failed to shorten URL');
    }

    const data = (await response.json()) as ShortenUrlResponse;
    return data;
};
