export type ResponseErrorType = {
  data: null;
  error: {
    status: number;
    name: string;
    message: string;
    details: Record<string, never>;
  };
};
