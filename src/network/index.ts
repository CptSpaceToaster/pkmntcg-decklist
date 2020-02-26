import Axios, { AxiosRequestConfig } from 'axios';

const config: AxiosRequestConfig = {
  baseURL: process.env.VUE_APP_API_BASE_URL,
};

export const Client = Axios.create(config);
