import { useMutation, UseMutationResult } from "@tanstack/react-query";
import { request } from "../../../config/request";

interface Attachment {
  url: string;
  origName: string;
  size: number;
}

interface DataTypes {
  id: number;
  title: string;
  courseId: number;
  attachment: Attachment;
}

export const useEdite = (): UseMutationResult<
  any,
  Error,
  DataTypes,
  unknown
> => {
  return useMutation({
    mutationFn: (data: DataTypes) => {
      return request
        .put(`/api/staff/contracts/${data.id}`, data)
        .then((res) => res.data);
    },
  });
};
