import { AxiosResponse } from "axios";

export type FetchPromise<T> = Promise<AxiosResponse<T>>;

export interface IList<T = object> {
  query: {
    search?: string;
    page?: number;
    limit?: number;
  } & T;
}

export interface ListQuery<T> {
  query: T;
}

export type Store<B, T = object> = {
  body: B;
} & T;

export type Detail<K extends string, T = object> = {
  params: Record<K, number | string | string[]>;
} & T;

export type Update<K extends string, B, T = object> = Detail<K, T> & Store<B>;
