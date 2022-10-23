import { AxiosInstance, AxiosRequestConfig } from "axios";
import axios from "axios";
import { serviceOptions } from "../open-api/swagger.gen";

let instance: AxiosInstance;
const defaultConfig = {};

export const injectInstance = (config: AxiosRequestConfig = defaultConfig) => {
  if (!instance) {
    instance = axios.create(config);
  }
  serviceOptions.axios = instance;
  return instance;
};

/**
 * api with interceptors
 */
export const apiJF = injectInstance();
