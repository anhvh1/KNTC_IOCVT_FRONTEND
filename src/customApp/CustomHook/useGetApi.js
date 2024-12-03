import { useEffect, useState } from "react";
import { apiGetAuth, apiPostAuth } from "../../api";
import { message } from "antd";
const TYPE_API = {
  GET: 1,
  POST: 2,
};
const useGetApi = (url, type = TYPE_API.GET, params = {}) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    if (type === TYPE_API.GET) {
      apiGetAuth(url, { ...params }).then((res) => {
        if (res.data.Status > 0) {
          setData(res.data.Data);
        } else {
          message.destroy();
          message.warning(res.data.Message);
        }
      });
    } else if (type === TYPE_API.POST) {
      apiPostAuth(url, { ...params }).then((res) => {
        if (res.data.Status > 0) {
          setData(res.data.Data);
        } else {
          message.destroy();
          message.warning(res.data.Message);
        }
      });
    }
  }, []);

  return data;
};

export { useGetApi, TYPE_API };
