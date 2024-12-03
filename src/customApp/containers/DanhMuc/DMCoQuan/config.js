import { apiGetAuth, apiPostAuth, apiDeleteAuth } from "../../../../api";
import server from "../../../../settings";

export const apiUrl = {
  danhsachcoquan: server.v2Url + "CoQuan/GetTree",
  getallcoquan:
    server.v2Url +
    "DanhMucCoQuanDonVi/api/v2/DanhMucCoQuanDonVi/DanhSachCacCap",
  chitietcoquan: server.v2Url + "CoQuan/GetByID",
  themcoquan: server.v2Url + "CoQuan/Insert",
  suacoquan: server.v2Url + "CoQuan/Update_New",
  xoacoquan: server.v2Url + "CoQuan/Delete",
  danhsachcaccapdonvi: server.v2Url + "Cap/GetAll",
  danhsachthamquyen: server.v2Url + "DanhMucCoQuanDonVi/DanhSachThamQuyen",
  danhsachdiagioi:
    server.v2Url + "DanhMucDiaGioiHanhChinh/DanhSachCacCap/Tinh/Huyen/Xa",
  danhsachGetAllWorkFlow: server.v2Url + "CoQuan/GetAllWorkFlow",
  getalltw: server.v2Url + "CoQuan/GetAllTrungUong",
  downloadDanhSach: server.v2Url + "CoQuan/DownloadFileCoQuan",
  coquanthanhtra: server.v2Url + "CoQuan/GetCoQuanThanhTra",
};
const api = {
  danhSachDiaGioi: (param) => {
    return apiGetAuth(apiUrl.danhsachdiagioi, {
      ...param,
    });
  },
  ListCoQuanThanhtra: (param) => {
    return apiGetAuth(apiUrl.coquanthanhtra, {
      ...param,
    });
  },
  DownloadDanhSach: (param) => {
    return apiGetAuth(apiUrl.downloadDanhSach, {
      ...param,
    });
  },
  danhSachCoQuan: (param) => {
    return apiGetAuth(apiUrl.danhsachcoquan, {
      ...param,
    });
  },
  chiTietCoQuan: (param) => {
    return apiGetAuth(apiUrl.chitietcoquan, {
      ...param,
    });
  },
  themCoQuan: (param) => {
    return apiPostAuth(apiUrl.themcoquan, {
      ...param,
    });
  },
  xoaCoQuan: (CoQuanID) => {
    return apiPostAuth(apiUrl.xoacoquan, CoQuanID); // Sending the ID as part of the request body
  },
  danhSachCacCapDonVi: (param) => {
    return apiGetAuth(apiUrl.danhsachcaccapdonvi);
  },
  danhsachGetAllWorkFlow: (param) => {
    return apiGetAuth(apiUrl.danhsachGetAllWorkFlow);
  },
  danhSachThamQuyen: (param) => {
    return apiGetAuth(apiUrl.danhsachthamquyen);
  },
  AllCoQuan: () => {
    return apiGetAuth(apiUrl.getallcoquan);
  },
  suaCoQuan: (param) => {
    return apiPostAuth(apiUrl.suacoquan, {
      ...param,
    });
  },
  AllCoQuanTW: (param) => {
    return apiGetAuth(apiUrl.getalltw, {
      ...param,
    });
  },
};

export default api;
