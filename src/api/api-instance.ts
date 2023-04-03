import axios from 'axios';

export const instance = axios.create({
  baseURL: 'https://strapi.cleverland.by/api',
});

export const authInstance = axios.create({
  baseURL: 'https://strapi.cleverland.by/api/auth',
});

const getToken = () => {
  let token = localStorage.getItem('token');

  if (token !== null) token = JSON.parse(token);

  return token;
};

instance.interceptors.request.use((config) => {
  config.headers.authorization = `Bearer ${getToken()}`;

  return config;
});
