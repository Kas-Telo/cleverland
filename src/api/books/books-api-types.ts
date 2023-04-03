type ResponseBaseBookType = {
  issueYear: string | null;
  rating: number | null;
  title: string;
  authors: string[] | null;
  categories: string[] | null;
  id: number;
  booking: ResponseBookingBookType | null;
  delivery: ResponseDeliveryBookType | null;
  histories: [ResponseHistoriesBookType] | null;
};
export type ResponseBookCardType = ResponseBaseBookType & {
  image: {
    url: string | null;
  } | null;
};
export type ResponseBookType = ResponseBaseBookType & {
  description: string | null;
  publish: string | null;
  pages: string | null;
  cover: string | null;
  weight: string | null;
  format: string | null;
  ISBN: string | null;
  producer: string | null;
  images:
    | [
        {
          url: string | null;
        }
      ]
    | null;
  comments: ResponseCommentBookType[] | null;
};
export type CategoryType = {
  name: string;
  path: string;
  id: number;
};
export type ResponseCommentBookType = {
  id: number;
  rating: number;
  text: string | null;
  createdAt: string;
  user: {
    commentUserId: number;
    firstName: string;
    lastName: string;
    avatarUrl: string | null;
  };
};
export type ResponseBookingBookType = {
  id: number;
  order: boolean;
  dateOrder: string | null;
  customerId: number | null;
  customerFirstName: string | null;
  customerLastName: string | null;
};
export type ResponseDeliveryBookType = {
  id: number;
  handed: boolean;
  dateHandedFrom: string;
  dateHandedTo: string;
  recipientId: number;
  recipientFirstName: string | null;
  recipientLastName: string | null;
};
export type ResponseHistoriesBookType = {
  id: number | null;
  userId: number | null;
};
