import { AxiosRequestConfig } from "axios";

export interface INetwork {
  baseURL?: string;
  url: string;
  params?: any;
  body?: any;
  headers?: AxiosRequestConfig["headers"];
}
