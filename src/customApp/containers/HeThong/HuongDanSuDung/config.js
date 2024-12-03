import { apiGetAuth, apiPostAuth } from "../../../../api";
import server from "../../../../settings";
import { getDefaultPageSize } from "../../../../helpers/utility";

const apiUrl = {
  // huongdansudung: "http://192.168.55.121:8188/api/v1/HuongDanSuDung/GetAll_v2",
  huongdansudung:
    "https://kntcv2devapi.gosol.com.vn/api/v1/HuongDanSuDung/GetAll_v2",
  chitiethuongdansudung:
    "https://kntcv2devapi.gosol.com.vn/api/v1/HuongDanSuDung/ChiTiet",
  getallchucnang:
    "https://kntcv2devapi.gosol.com.vn/api/v1/HuongDanSuDung/GetAllChucNang",
  themhuongdansudung:
    "https://kntcv2devapi.gosol.com.vn/api/v1/HuongDanSuDung/Insert",
  capnhathuongdansudung:
    "https://kntcv2devapi.gosol.com.vn/api/v1/HuongDanSuDung/Update",
  xoahuongdansudung: `https://kntcv2devapi.gosol.com.vn/api/v1/HuongDanSuDung/Delete`,
};
const api = {
  HuongDanSuDung: (param) => {
    return apiGetAuth(apiUrl.huongdansudung, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  ThemHuongDanSuDung: (param) => {
    return apiPostAuth(
      "https://kntcv2devapi.gosol.com.vn/api/v1/HuongDanSuDung/Insert",
      param,
      { "Content-Type": "multipart/form-data" }
    );
  },
  ChiTietHuongDanSuDung: (param) => {
    return apiGetAuth(apiUrl.chitiethuongdansudung, {
      ...param,
    });
  },
  GetAllChucNang: (param) => {
    return apiGetAuth(apiUrl.getallchucnang, {
      ...param,
    });
  },
  CapNhatHuongDanSuDung: (param) => {
    return apiPostAuth(
      "https://kntcv2devapi.gosol.com.vn/api/v1/HuongDanSuDung/Update",
      param,
      { "Content-Type": "multipart/form-data" }
    );
  },
  XoaHuongDanSuDung: (param) => {
    return apiPostAuth(apiUrl.xoahuongdansudung, {
      ListID: [param],
    });
  },
};

export default api;
