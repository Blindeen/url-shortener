import { toast } from 'sonner';

type Uri = `/api${string}`;

type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';

interface ErrorData {
    errors: string[];
}

type ApiResponse<T> =
    | {
          status: 'success';
          data: T;
      }
    | {
          status: 'api-error';
          data: ErrorData;
      }
    | {
          status: 'unknown-error';
          data: string;
      };

export const performRequest = async <T = unknown, U = unknown>(
    uri: Uri,
    method: Method = 'POST',
    body?: T
): Promise<ApiResponse<U>> => {
    try {
        const response = await fetch(uri, {
            method: method,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body),
        });

        if (!response.ok) {
            const errorData = (await response.json()) as ErrorData;
            return { status: 'api-error', data: errorData };
        }

        const successData = (await response.json()) as U;
        return { status: 'success', data: successData };
    } catch {
        const message = 'Failed to perform the request';
        toast.error(message);
        return {
            status: 'unknown-error',
            data: message,
        };
    }
};
