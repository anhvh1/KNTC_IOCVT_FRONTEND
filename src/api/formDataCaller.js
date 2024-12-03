import axios from "axios";
export const formDataCaller = (url, data, queryParams) => {
  return axios({
    method: "POST",
    url,
    data,
    params: queryParams,
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: `Bearer ${localStorage.getItem("access_token")}`,
    },
  }).catch((err) => {
    const { status, statusText } = err.response;
    return {
      Status: 0,
      Message:
        status || statusText ? `${status} - ${statusText}` : "Đã có lỗi xảy ra",
    };
  });
};
