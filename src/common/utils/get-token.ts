export const getToken = () => {
  let token = localStorage.getItem('token');

  if (token) token = JSON.parse(token);

  return token;
};
