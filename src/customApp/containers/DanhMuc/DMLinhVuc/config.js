import Axios from "axios";
import { apiGetAuth, apiPostAuth, apiPutAuth } from "../../../../api";
import { getDefaultPageSize } from "../../../../helpers/utility";
import server from "../../../../settings";

const apiUrl = {
  getLinhVuc: server.v2Url + "LinhVuc/GetBySearch",
  getchitietlinhvuc: server.v2Url + "LinhVuc/GetLinhVucByID",
  postLinhVuc: server.v2Url + "LinhVuc/InsertByCoQuanTao",
  updateLinhVuc: server.v2Url + "LinhVuc/Update",
  deleteLinhVuc: server.v2Url + "LinhVuc/Delete",
};
// lay danh sach
const api = {
  DanhSachLinhVuc: (param) => {
    return apiGetAuth(apiUrl.getLinhVuc, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  ChiTietLinhVuc: (id) => {
    return apiGetAuth(`${apiUrl.getchitietlinhvuc}?id=${id}`, {

    });
  },

  ThemLinhVuc: (param) => {
    return apiPostAuth(apiUrl.postLinhVuc, {
      ...param,
    });
  },

  SuaLinhVuc: (param) => {
    return apiPostAuth(apiUrl.updateLinhVuc, {
      ...param,
    });
  },

  XoaLinhVuc: (id) => {
    return apiPostAuth(`${apiUrl.deleteLinhVuc}?id=${id}`);
  },
};

export default api;
