import { useQuery } from "@tanstack/react-query";
import { request } from "../../../config/request";

export const useUserId = (id: number) => {
  return useQuery({
    queryKey: ["getdata", id], // Removed extra space
    queryFn: () =>
      request.get(`/api/staff/contracts/${id}`).then((res) => res.data),
    enabled: !!id,
  });
};
