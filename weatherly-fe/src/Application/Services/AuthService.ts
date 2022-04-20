import axios, { AxiosRequestConfig } from "axios";

const baseHeaders = {
  Accept: "application/json",
  "Content-Type": "application/json; charset=utf-8",
  "Accept-Language": "en-US, en;q=0.8",
};

axios.interceptors.request.use(
  (config) => {
    const newConfig = {
      ...config,
      headers: {
        ...config.headers,
        ...baseHeaders,
      },
    };

    return newConfig;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export const post = (url: string, data: any, config?: AxiosRequestConfig) =>
  axios.post(url, data, config);
