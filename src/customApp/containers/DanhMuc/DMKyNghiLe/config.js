import Axios from "axios";
import { apiGetAuth, apiPostAuth, apiPutAuth } from "../../../../api";
import { getDefaultPageSize } from "../../../../helpers/utility";
import server from "../../../../settings";

const apiUrl = {
  getKyNghiLe: server.v2Url + "KyNghiLe/GetListPaging",
  getchitietKyNghiLe: server.v2Url + "KyNghiLe/Chitiet",
  postKyNghiLe: server.v2Url + "KyNghiLe/Insert",
  updateKyNghiLe: server.v2Url + "KyNghiLe/Update",
  deleteKyNghiLe: server.v2Url + "KyNghiLe/Delete",
};
// lay danh sach
const api = {
  DanhSachKyNghiLe: (param) => {
    return apiGetAuth(apiUrl.getKyNghiLe, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  ChiTietKyNghiLe: (id) => {
    return apiGetAuth(`${apiUrl.getchitietKyNghiLe}?LeId=${id}`, {

    });
  },

  ThemKyNghiLe: (param) => {
    return apiPostAuth(apiUrl.postKyNghiLe, {
      ...param,
    });
  },

  SuaKyNghiLe: (param) => {
    return apiPostAuth(apiUrl.updateKyNghiLe, {
      ...param,
    });
  },

  XoaKyNghiLe: (param) => {
    return apiPostAuth(apiUrl.deleteKyNghiLe, {
      ...param,
    });;
  },
};

export default api;
