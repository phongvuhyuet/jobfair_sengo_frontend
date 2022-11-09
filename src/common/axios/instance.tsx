import { AxiosInstance, AxiosRequestConfig } from 'axios'
import axios from 'axios'
import { serviceOptions } from '../open-api/swagger.gen'

let instance: AxiosInstance
const defaultConfig = {}

const addRequestInterceptors = (instance: AxiosInstance) => {
  instance.interceptors.request.use((config: AxiosRequestConfig) => {
    if (!config.data) {
      delete config.data
    }
    return config
  })
}
export const injectInstance = (config: AxiosRequestConfig = defaultConfig) => {
  if (!instance) {
    instance = axios.create(config)
    addRequestInterceptors(instance)
  }
  serviceOptions.axios = instance
  return instance
}

/**
 * api with interceptors
 */
export const apiJF = injectInstance()
