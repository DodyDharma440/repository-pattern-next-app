import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

axios("");

export type HttpMethod =
  | "POST"
  | "GET"
  | "PUT"
  | "PATCH"
  | "DELETE"
  | "HEAD"
  | "OPTIONS";

export interface FactoryOptions<B = Record<string, any>> {
  method?: HttpMethod;
  data?: B;
  options?: AxiosRequestConfig<any>;
  withSignal?: boolean;
}

class FetchFactory {
  axiosInstance: AxiosInstance;
  private controllers = new Map<string, AbortController>();

  constructor(instance: AxiosInstance) {
    this.axiosInstance = instance;
  }

  async call<T, B extends object = object>(
    url: string,
    options?: FactoryOptions<B>
  ) {
    const authToken = "";

    const controller = new AbortController();
    this.controllers.get(url)?.abort();
    this.controllers.set(url, controller);

    return this.axiosInstance<T>(url, {
      method: options?.method ?? "GET",
      data: options?.data,
      signal: options?.withSignal ?? true ? controller.signal : undefined,
      ...options?.options,
      headers: {
        ...options?.options?.headers,
        ...(authToken ? { Authorization: `Bearer ${authToken}` } : {}),
        Accept: "application/json",
      },
    });
  }
}

export default FetchFactory;
