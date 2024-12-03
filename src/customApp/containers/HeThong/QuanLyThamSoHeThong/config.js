import { apiGetAuth, apiPostAuth } from "../../../../api";
import server from "../../../../settings";
import { getDefaultPageSize } from "../../../../helpers/utility";

const apiUrl = {
  danhsachthamsohethong: server.v2Url + "SystemConfig/GetListPaging",
  chitietthamsohethong: server.v2Url + "SystemConfig/GetByID",
  themthamsohethong: server.v2Url + "SystemConfig/Insert",
  capnhatthamsohethong: server.v2Url + "SystemConfig/Update",
  xoathamsohethong: server.v2Url + "SystemConfig/Delete",
};
const api = {
  DanhSachThamSoHeThong: (param) => {
    return apiGetAuth(apiUrl.danhsachthamsohethong, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  ChiTietThamSoHeThong: (param) => {
    return apiGetAuth(apiUrl.chitietthamsohethong, {
      ...param,
    });
  },
  ThemMoiThamSoHeThong: (param) => {
    return apiPostAuth(apiUrl.themthamsohethong, {
      ...param,
    });
  },
  CapNhatThamSoHeThong: (param) => {
    return apiPostAuth(apiUrl.capnhatthamsohethong, {
      ...param,
    });
  },
  XoaThamSoHeThong: (param) => {
    return apiPostAuth(apiUrl.xoathamsohethong, { ...param });
  },
};

export default api;
