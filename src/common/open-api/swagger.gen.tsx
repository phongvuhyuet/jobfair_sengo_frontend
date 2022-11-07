/** Generate by swagger-axios-codegen */
// @ts-nocheck
/* eslint-disable */

/** Generate by swagger-axios-codegen */
/* eslint-disable */
// @ts-nocheck
import axiosStatic, { AxiosInstance, AxiosRequestConfig } from 'axios';

export interface IRequestOptions extends AxiosRequestConfig {}

export interface IRequestConfig {
  method?: any;
  headers?: any;
  url?: any;
  data?: any;
  params?: any;
}

// Add options interface
export interface ServiceOptions {
  axios?: AxiosInstance;
}

// Add default options
export const serviceOptions: ServiceOptions = {};

// Instance selector
export function axios(configs: IRequestConfig, resolve: (p: any) => void, reject: (p: any) => void): Promise<any> {
  if (serviceOptions.axios) {
    return serviceOptions.axios
      .request(configs)
      .then(res => {
        resolve(res.data);
      })
      .catch(err => {
        reject(err);
      });
  } else {
    throw new Error('please inject yourself instance like axios  ');
  }
}

export function getConfigs(method: string, contentType: string, url: string, options: any): IRequestConfig {
  const configs: IRequestConfig = { ...options, method, url };
  configs.headers = {
    ...options.headers,
    'Content-Type': contentType
  };
  return configs;
}

export const basePath = '/api/v1';

export interface IList<T> extends Array<T> {}
export interface List<T> extends Array<T> {}
export interface IDictionary<TValue> {
  [key: string]: TValue;
}
export interface Dictionary<TValue> extends IDictionary<TValue> {}

export interface IListResult<T> {
  items?: T[];
}

export class ListResultDto<T> implements IListResult<T> {
  items?: T[];
}

export interface IPagedResult<T> extends IListResult<T> {
  totalCount?: number;
  items?: T[];
}

export class PagedResultDto<T = any> implements IPagedResult<T> {
  totalCount?: number;
  items?: T[];
}

// customer definition
// empty

export class PostsService {
  /**
   * create post
   */
  static posts(
    params: {
      /** requestBody */
      body?: CreatePostDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<StatusResponseDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/posts';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * get list posts
   */
  static posts1(options: IRequestOptions = {}): Promise<PostResponseDto[]> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/posts';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * update post
   */
  static posts2(
    params: {
      /**  */
      id: string;
      /** requestBody */
      body?: UpdatePostDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<StatusResponseDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/posts/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * delete post
   */
  static posts3(
    params: {
      /**  */
      id: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<StatusResponseDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/posts/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * get post
   */
  static posts4(
    params: {
      /**  */
      id: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<PostResponseDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/posts/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
}

export class TopicsService {
  /**
   * create topic
   */
  static topics(
    params: {
      /** requestBody */
      body?: CreateTopicDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<StatusResponseDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/topics';

      const configs: IRequestConfig = getConfigs('post', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * get list topics
   */
  static topics1(options: IRequestOptions = {}): Promise<TopicRespDto[]> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/topics';

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
  /**
   * update topic
   */
  static topics2(
    params: {
      /**  */
      id: string;
      /** requestBody */
      body?: UpdateTopicDto;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<StatusResponseDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/topics/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('put', 'application/json', url, options);

      let data = params.body;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * delete topic
   */
  static topics3(
    params: {
      /**  */
      id: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<StatusResponseDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/topics/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('delete', 'application/json', url, options);

      let data = null;

      configs.data = data;

      axios(configs, resolve, reject);
    });
  }
  /**
   * get topic
   */
  static topics4(
    params: {
      /**  */
      id: string;
    } = {} as any,
    options: IRequestOptions = {}
  ): Promise<TopicRespDto> {
    return new Promise((resolve, reject) => {
      let url = basePath + '/topics/{id}';
      url = url.replace('{id}', params['id'] + '');

      const configs: IRequestConfig = getConfigs('get', 'application/json', url, options);

      /** 适配ios13，get请求不允许带body */

      axios(configs, resolve, reject);
    });
  }
}

export interface StatusResponseDto {
  /**  */
  message?: string;
}

export interface CreatePostDto {
  /**  */
  title?: string;

  /**  */
  content?: string;

  /**  */
  topic_id?: string;
}

export interface UpdatePostDto {
  /**  */
  title?: string;

  /**  */
  content?: string;

  /**  */
  topic_id?: string;

  /**  */
  user_id?: string;

  /**  */
  upvote_count?: number;

  /**  */
  downvote_count?: number;

  /**  */
  status?: EnumUpdatePostDtoStatus;

  /**  */
  publishedAt?: string;

  /**  */
  reject_reason?: string;
}

export interface TopicInfo {
  /**  */
  name?: string;

  /**  */
  _id?: string;
}

export interface UserInfo {
  /**  */
  name?: string;

  /**  */
  _id?: string;
}

export interface PostResponseDto {
  /**  */
  _id?: string;

  /**  */
  title?: string;

  /**  */
  content?: string;

  /**  */
  topic?: TopicInfo;

  /**  */
  user?: UserInfo;

  /**  */
  upvote_count?: number;

  /**  */
  downvote_count?: number;

  /**  */
  reject_reason?: string;

  /**  */
  publishedAt?: Date;

  /**  */
  status?: number;

  /**  */
  createdAt?: Date;

  /**  */
  updatedAt?: Date;
}

export interface CreateTopicDto {
  /**  */
  name?: string;
}

export interface UpdateTopicDto {
  /**  */
  name?: string;
}

export interface TopicRespDto {
  /**  */
  _id?: string;

  /**  */
  name?: string;

  /**  */
  createdAt?: Date;

  /**  */
  updatedAt?: Date;
}
export enum EnumUpdatePostDtoStatus {
  'active' = 'active',
  'pending' = 'pending',
  'reject' = 'reject'
}
