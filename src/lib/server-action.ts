export type ActionResponse<T> =
    | {
          status: 'success';
          data: T;
      }
    | {
          status: 'action-error';
          data: string[];
      }
    | {
          status: 'unknown-error';
          data: string;
      };
