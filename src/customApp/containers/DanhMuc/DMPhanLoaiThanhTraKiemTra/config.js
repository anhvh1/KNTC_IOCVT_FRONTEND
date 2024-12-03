import Axios from "axios";
import { apiGetAuth, apiPostAuth, apiPutAuth } from "../../../../api";
import { getDefaultPageSize } from "../../../../helpers/utility";
import server from "../../../../settings";

const apiUrl = {
  getPhanLoai: server.v2Url + "PhanLoaiThanhTra/GetListPaging",
  getchitietPhanLoai: server.v2Url + "PhanLoaiThanhTra/GetById",
  postPhanLoai: server.v2Url + "PhanLoaiThanhTra/Insert",
  updatePhanLoai: server.v2Url + "PhanLoaiThanhTra/Update",
  deletePhanLoai: server.v2Url + "PhanLoaiThanhTra/Delete",
  GetByKey: server.v2Url + "SystemConfig/GetByKey",
};
const api = {
  GetTree: server.v2Url + "PhanLoaiThanhTra/GetTree",
  DanhSachPhanLoai: (param) => {
    return apiGetAuth(apiUrl.getPhanLoai, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  ChiTietPhanLoai: (id) => {
    return apiGetAuth(`${apiUrl.getchitietPhanLoai}?id=${id}`, {});
  },
  GetByKey: (id) => {
    return apiGetAuth(`${apiUrl.GetByKey}?ConfigKey=${id}`, {});
  },
  ThemPhanLoai: (param) => {
    return apiPostAuth(apiUrl.postPhanLoai, {
      ...param,
    });
  },

  SuaPhanLoai: (param) => {
    return apiPostAuth(apiUrl.updatePhanLoai, {
      ...param,
    });
  },

  XoaPhanLoai: (param) => {
    return apiPostAuth(apiUrl.deletePhanLoai, {
      ...param,
    });
  },
};

export default api;
