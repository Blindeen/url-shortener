interface ErrorData {
    errors: string[];
}

export type ActionResponse<T> =
    | {
          status: 'success';
          data: T;
      }
    | {
          status: 'action-error';
          data: ErrorData;
      }
    | {
          status: 'unknown-error';
          data: string;
      };
