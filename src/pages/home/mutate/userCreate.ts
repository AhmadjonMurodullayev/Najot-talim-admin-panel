import { useMutation } from "@tanstack/react-query";
import { request } from "../../../config/request";
import { CreateCourseType } from "./type";

export const userCreate = () => {
  return useMutation({
    mutationFn: (data: CreateCourseType) =>
      request.post("/api/staff/contracts/create", data).then((res) => res.data),
  });
};
