import axios, { AxiosInstance } from "axios";
import { RequestCookie } from "next/dist/compiled/@edge-runtime/cookies";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";

const parseCookie = (cookies: RequestCookie[]) => {
  if (!cookies) return "";
  return cookies
    .map((cookie) => {
      const stringValue = Array.isArray(cookie.value)
        ? cookie.value[0]
        : cookie.value;
      return `${cookie.name}=${encodeURIComponent(stringValue || "")}`;
    })
    .join("; ");
};

export const createSsrInstance = (
  instance: AxiosInstance,
  cookies: ReadonlyRequestCookies
) => {
  const newInstance = axios.create(instance.defaults);

  (instance.interceptors.request as any).handlers.forEach((handler: any) => {
    if (handler) {
      newInstance.interceptors.request.use(handler.fulfilled, handler.rejected);
    }
  });

  (instance.interceptors.response as any).handlers.forEach((handler: any) => {
    if (handler) {
      newInstance.interceptors.response.use(
        handler.fulfilled,
        handler.rejected
      );
    }
  });

  newInstance.defaults.headers["Cookie"] = parseCookie(cookies.getAll());
  return newInstance;
};
