import {
  apiGet,
  apiGetAuth,
  apiGetUser,
  apiPost,
  apiGetToken,
} from "../../../../api";
import server from "../../../../settings";
import { getDefaultPageSize } from "../../../../helpers/utility";

const apiUrl = {
  dangnhap: server.v2Url + "Nguoidung/DangNhap",
  dangnhapsso: server.v2Url + "LoginSSO/Login",
  chitiet: server.v2Url + "HeThongNguoiDung/GetByIDForPhanQuyen",
  getdataconfig: server.v2Url + "SystemConfig/GetByKey",
  listconfig: server.v2Url + "SystemConfig/GetListPaging",
  sendmail: server.v2Url + "HeThongNguoiDung/SendMail",
};
const api = {
  dangNhap: (param) => {
    return apiPost(apiUrl.dangnhap, {
      ...param,
    });
  },
  sendMail: (param) => {
    return apiPost(apiUrl.sendmail, {
      ...param,
    });
  },
  dangNhapSSO: (param) => {
    return apiPost(apiUrl.dangnhapsso, {
      ...param,
    });
  },
  chiTiet: (param) => {
    return apiGetUser(apiUrl.chitiet, {
      ...param,
    });
  },
  getDataConfig: (param) => {
    return apiGetToken(apiUrl.getdataconfig, { ...param });
  },
  getListConfig: (param) => {
    return apiGetToken(apiUrl.listconfig, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
};

export default api;
