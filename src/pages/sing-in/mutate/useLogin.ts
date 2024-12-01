import { useMutation } from "@tanstack/react-query";
import { request } from "../../../config/request";
import { Userdata } from "./type";
import { LoginResponsTpype } from "./type";

export const useLogin = () => {
  return useMutation({
    mutationFn: (data: Userdata) =>
      request
        .post<LoginResponsTpype>("/api/staff/auth/sign-in", data)
        .then((res) => res.data),
    onSuccess: (res) => {
      // saveState("userData", res.data);4
      localStorage.setItem("userToken", JSON.stringify(res.data));
      console.log(res);
    },
  });
};
