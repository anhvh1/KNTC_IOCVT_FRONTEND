import { apiGetAuth, apiPostAuth, apiDownloadAuth } from "../../../../api";
import server from "../../../../settings";
import { getDefaultPageSize } from "../../../../helpers/utility";

export const apiUrl = {
  danhsachBanHanh: server.v2Url + "BanHanhKetQuaTT/GetListPaging",
  themBanHanh: server.v2Url + "BanHanhKetQuaTT/Insert",
  chitietBanHanh: server.v2Url + "BanHanhKetQuaTT/GetByNamBanHanh",
  suaBanHanh: server.v2Url + "BanHanhKetQuaTT/Update",
  chuyencuocBanHanh: server.v2Url + "QuanLyBanHanh/TransferPlan",
  downloadfile: server.v2Url + "QuanLyBanHanh/ExportCoQuanChuaLKHDT",
  danhSachListHinhThuc: server.v2Url + "PhanLoaiThanhTra/GetHinhThuc",
  listagency: server.v2Url + "CoQuan/GetCoQuanThanhTra",
  listfield: server.v2Url + "PhanLoaiThanhTra/GetLinhVuc",
};
const api = {
  danhSachBanHanh: (param) => {
    return apiGetAuth(apiUrl.danhsachBanHanh, {
      ...param,
      PageNumber: param?.PageNumber ? param.PageNumber : 1,
      PageSize: param?.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  themBanHanh: (param) => {
    return apiPostAuth(apiUrl.themBanHanh, {
      ...param,
    });
  },
  chiTietBanHanh: (year) => {
    return apiGetAuth(`${apiUrl.chitietBanHanh}?year=${year}`);
  },
  suaBanHanh: (param) => {
    return apiPostAuth(apiUrl.suaBanHanh, param);
  },
  chuyencuocBanHanh: (param) => {
    return apiPostAuth(apiUrl.chuyencuocBanHanh, param);
  },
  DownloadFile: (param) => {
    return apiGetAuth(`${apiUrl.downloadfile}?namThanhTra=${param}`);
  },
  danhSachListHinhThuc: (param) => {
    return apiGetAuth(apiUrl.danhSachListHinhThuc, {
      ...param,
    });
  },
  GetListAgency: (params) => {
    return apiGetAuth(apiUrl.listagency, { ...params });
  },
};

export default api;
