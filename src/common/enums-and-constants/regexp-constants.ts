export const authRegexp = {
  email: new RegExp(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/),
  phone: new RegExp(/^(\+375)\s\((29|25|44|33)\)\s(\d{3})[-](\d{2})[-](\d{2})$/),
};
