export type RequestBookingType = {
  data: {
    order: boolean;
    dateOrder: string;
    book: number;
    customer: number;
  };
};
export type ResponseBookingType = {
  id: 7;
  attributes: {
    order: boolean;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    dateOrder: string;
  };
};
