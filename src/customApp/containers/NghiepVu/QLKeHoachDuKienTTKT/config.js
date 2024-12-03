import { apiGetAuth, apiPostAuth, apiDownloadAuth } from "../../../../api";
import server from "../../../../settings";
import { getDefaultPageSize } from "../../../../helpers/utility";

export const apiUrl = {
  danhsachKHDuKien: server.v2Url + "QuanLyKHDuKien/GetListPaging",
  themKHDuKien: server.v2Url + "QuanLyThuTuc/Insert",
  chitietKHDuKien: server.v2Url + "CuocThanhTra/GetListPaging_ChiTiet",
  suaKHDuKien: server.v2Url + "QuanLyKHDuKien/EditPlan",
  chuyencuocKHDuKien: server.v2Url + "QuanLyKHDuKien/TransferPlan",
  CheckPBTTChuaGuiKH: server.v2Url + "QuanLyKHDuKien/CheckPBTTChuaGuiKH",
  listfield: server.v2Url + "PhanLoaiThanhTra/GetLinhVuc",
  downloadfile: server.v2Url + "QuanLyKHDuKien/ExportCoQuanChuaLKHDT",
  danhSachListHinhThuc: server.v2Url + "PhanLoaiThanhTra/GetHinhThuc",
};
const api = {
  danhSachKHDuKien: (param) => {
    return apiGetAuth(apiUrl.danhsachKHDuKien, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  themKHDuKien: (param) => {
    return apiPostAuth(apiUrl.themKHDuKien, {
      ...param,
    });
  },
  chiTietKHDuKien: (DoiTuongTT, NamThanhTra, CoQuanLapID) => {
    return apiGetAuth(
      `${apiUrl.chitietKHDuKien}?DoiTuongTT=${DoiTuongTT}&NamThanhTra=${NamThanhTra}&CoQuanLapID=${CoQuanLapID}`
    );
  },
  suaKHDuKien: (param) => {
    return apiPostAuth(apiUrl.suaKHDuKien, param);
  },
  chuyencuocKHDuKien: (param) => {
    return apiPostAuth(apiUrl.chuyencuocKHDuKien, param);
  },
  CheckPBTTChuaGuiKH: (param) => {
    return apiPostAuth(apiUrl.CheckPBTTChuaGuiKH, param);
  },
  DownloadFile: (param) => {
    return apiGetAuth(`${apiUrl.downloadfile}?namThanhTra=${param}`);
  },
  danhSachListHinhThuc: (param) => {
    return apiGetAuth(apiUrl.danhSachListHinhThuc, {
      ...param,
    });
  },
};

export default api;
