import { useQuery } from "@tanstack/react-query";
import { request } from "../../../config/request";
import { getDataType } from "./type";

export const useGetUser = () => {
  return useQuery({
    queryKey: ["getdata"],
    queryFn: () =>
      request
        .get<getDataType>("/api/staff/contracts/all")
        .then((res) => res.data),
  });
};
