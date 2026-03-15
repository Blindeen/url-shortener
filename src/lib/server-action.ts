export type ActionResponse<T> =
    | {
          status: 'success';
          data: T;
      }
    | {
          status: 'action-error';
          data: { errors: string[] };
      }
    | {
          status: 'unknown-error';
          data: string;
      };
