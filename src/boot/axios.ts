/* eslint-disable */
import { boot } from 'quasar/wrappers';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import {Notify} from "quasar";

const api: AxiosInstance = axios.create({
  withCredentials: true,
  baseURL: process.env.API_HOST,
});
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {

    Notify.create({
      message: error.response.data.errorMessage,
      color: "red-5",
    })

    if (401 === error.response.status) {
      // Код для обработки ошибки
      return error.response;
    }
    return Promise.reject(error);
  },
);

export default boot(({ app }) => {
  // Axios boot не запускается, так как не прописан в quasar.conf.js в секцию boot

  // for use inside Vue files (Options API) through this.$axios and this.$api

  app.config.globalProperties.$axios = axios;
  // ^ ^ ^ this will allow you to use this.$axios (for Vue Options API form)
  //       so you won't necessarily have to import axios in each vue file

  app.config.globalProperties.$api = api;
  // ^ ^ ^ this will allow you to use this.$api (for Vue Options API form)
  //       so you can easily perform requests against your app's API
});

export {axios, api};
export type { AxiosResponse };
