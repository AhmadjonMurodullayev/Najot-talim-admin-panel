import axios from "axios";
const request = axios.create({
  baseURL: "https://dev.api-erp.najotedu.uz",
});
request.interceptors.request.use((config) => {
  // const accessToken = loadState("userData");
  // console.log(accessToken.accessToken)
  const accessToken = JSON.parse(localStorage.getItem("userToken") as string);
  

  config.headers.Authorization = `Bearer ${accessToken?.accessToken}`;

  return config;
});
export { request };
