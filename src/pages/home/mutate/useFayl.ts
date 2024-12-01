import { useMutation } from "@tanstack/react-query";
import { request } from "../../../config/request";
import { dataType } from "./type";

export const useFayl = () => {
  return useMutation({
    mutationFn: (data: FormData) =>
      request
        .post<dataType>("/api/staff/upload/contract/attachment", data)
        .then((res) => res.data),
  });
};
