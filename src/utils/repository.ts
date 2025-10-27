import { cookies } from "next/headers";
import FetchFactory from "@/repositories/factory";
import { apiPlaceholder } from "@/configs/api";
import { AxiosInstance } from "axios";
import { createSsrInstance } from "./axios";
import { ClassConstructor } from "@/types/class";

export const initServerRepo = async <R extends FetchFactory>(
  Repository: ClassConstructor<R>,
  instance?: AxiosInstance
) => {
  const cookieStore = await cookies();
  const repository = new Repository(
    createSsrInstance(instance ?? apiPlaceholder, cookieStore)
  );

  return repository;
};
