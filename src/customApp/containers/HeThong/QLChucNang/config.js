import { apiGetAuth, apiPostAuth } from "../../../../api";
import server from "../../../../settings";
import { getDefaultPageSize } from "../../../../helpers/utility";

const apiUrl = {
  danhsachchucnang:
    "https://kntcv2devapi.gosol.com.vn/api/v2/ChucNang/DanhSach",
  danhsachcapcha:
    "https://kntcv2devapi.gosol.com.vn/api/v2/ChucNang/DanhSachCapCha",
  chitietchucnang: "https://kntcv2devapi.gosol.com.vn/api/v2/ChucNang/ChiTiet",
  themchucnang: "https://kntcv2devapi.gosol.com.vn/api/v2/ChucNang/ThemMoi",
  capnhatchucnang: `https://kntcv2devapi.gosol.com.vn/api/v2/ChucNang/Sua`,
  xoachucnang: "https://kntcv2devapi.gosol.com.vn/api/v2/ChucNang/Xoa",
};
const api = {
  DanhSachChucNang: (param) => {
    return apiGetAuth(apiUrl.danhsachchucnang, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  ChiTietChucNang: (param) => {
    return apiGetAuth(apiUrl.chitietchucnang, {
      ...param,
    });
  },
  DanhSachCapCha: (param) => {
    return apiGetAuth(apiUrl.danhsachcapcha, {
      ...param,
    });
  },
  THemChucNang: (param) => {
    return apiPostAuth(apiUrl.themchucnang, {
      ...param,
    });
  },
  CapNhatChucNang: (param) => {
    return apiPostAuth(apiUrl.capnhatchucnang, {
      ...param,
    });
  },
  XoaChucNang: (param) => {
    return apiPostAuth(apiUrl.xoachucnang, {
      ChucNangID: param,
    });
  },
};

export default api;
