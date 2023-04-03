export type RequestCommentType = {
  data: {
    rating: number;
    text: string;
    book: number;
    user: number;
  };
};
export type ResponseCommentType = {
  id: number;
  attributes: {
    rating: number;
    text: string | null;
    createdAt: string;
    updatedAt: string | null;
    publishedAt: string | null;
  };
};
