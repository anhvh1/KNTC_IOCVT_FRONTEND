import Axios from "axios";
import { apiGetAuth, apiPostAuth, apiPutAuth } from "../../../../api";
import { getDefaultPageSize } from "../../../../helpers/utility";
import server from "../../../../settings";

const apiUrl = {
  getNoiDungThanhTraKiemTra: server.v2Url + "Content/GetListPaging",
  getchitietNoiDungThanhTraKiemTra: server.v2Url + "Content/GetByID",
  postNoiDungThanhTraKiemTra: server.v2Url + "Content/Insert",
  updateNoiDungThanhTraKiemTra: server.v2Url + "Content/Update",
  deleteNoiDungThanhTraKiemTra: server.v2Url + "Content/Delete",
};
// lay danh sach
const api = {
  DanhSachNoiDungThanhTraKiemTra: (param) => {
    return apiGetAuth(apiUrl.getNoiDungThanhTraKiemTra, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  ChiTietNoiDungThanhTraKiemTra: (id) => {
    return apiGetAuth(`${apiUrl.getchitietNoiDungThanhTraKiemTra}?contentID=${id}`, {

    });
  },

  ThemNoiDungThanhTraKiemTra: (param) => {
    return apiPostAuth(apiUrl.postNoiDungThanhTraKiemTra, {
      ...param,
    });
  },

  SuaNoiDungThanhTraKiemTra: (param) => {
    return apiPostAuth(apiUrl.updateNoiDungThanhTraKiemTra, {
      ...param,
    });
  },

  XoaNoiDungThanhTraKiemTra: (id) => {
    return apiPostAuth(`${apiUrl.deleteNoiDungThanhTraKiemTra}?contentID=${id}`);
  },
};

export default api;
