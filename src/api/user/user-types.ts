export type BaseUserType = {
  id: number;
  username: string;
  email: string;
  provider: string;
  confirmed: boolean;
  blocked: boolean;
  createdAt: string;
  updatedAt: string;
  firstName: string;
  lastName: string;
  phone: string;
};
export type UserRoleType = {
  id: number;
  name: string;
  description: string;
  type: string;
};
export type UserComment = {
  id: number;
  rating: number;
  text: string | null;
  bookId: number;
};
export type UserBookType = {
  id: number;
  title: string;
  rating: number | null;
  issueYear: string | null;
  authors: [string];
  image: {
    url: string | null;
  } | null;
};
export type UserBookingType = {
  id: number;
  order: boolean;
  dateOrder: string;
  book: UserBookType;
};
export type UserDeliveryType = {
  id: number;
  handed: boolean;
  dateHandedFrom: string;
  dateHandedTo: string;
  book: UserBookType;
};
export type UserHistoryType = {
  id: number | null;
  books: UserBookType[] | null;
};
export type UserType = BaseUserType & {
  role: UserRoleType | null;
  comments: UserComment[] | null;
  avatar: string | null;
  booking: UserBookingType | null;
  delivery: UserDeliveryType | null;
  history: UserHistoryType | null;
};
export type UserCredentialRequestType = {
  username?: string;
  email?: string;
  password?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  avatar?: number;
};
