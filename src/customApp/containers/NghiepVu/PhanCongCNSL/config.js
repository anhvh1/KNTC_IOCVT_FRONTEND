import { apiGetAuth, apiPostAuth, apiDownloadAuth } from '../../../../api';
import server from '../../../../settings';
import { getDefaultPageSize } from '../../../../helpers/utility';

export const apiUrl = {
  danhsachTaoCuoc: server.v2Url + 'PhanCongThanhVien/GetListPaging',
  danhsachCanBo: server.v2Url + 'TaoCuocThanhTra/DanhSachCanBo_GetBy_CoQuanID_Type',
  suaTaoCuoc: server.v2Url + 'TaoCuocThanhTra/Update',
  themTaoCuoc: server.v2Url + 'TaoCuocThanhTra/Insert',
  suaTaoCuocDotXuat: server.v2Url + 'TaoCuocThanhTra/Update_CuocThanhTraDotXuat',
  themTaoCuocDotXuat: server.v2Url + 'TaoCuocThanhTra/Insert_CuocThanhTraDotXuat',
  chitietTaoCuoc: server.v2Url + 'PhanCongThanhVien/GetThanhVienThanhTra',
  PhanCongThanhVien: server.v2Url + 'PhanCongThanhVien/GetByCuocThanhTraID',
  chuyencuocTaoCuoc: server.v2Url + 'QuanLyTaoCuoc/TransferPlan',
  downloadfile: server.v2Url + 'QuanLyTaoCuoc/ExportCoQuanChuaLKHDT',
  listform: server.v2Url + "PhanLoaiThanhTra/GetHinhThuc",
  listfield: server.v2Url + "PhanLoaiThanhTra/GetLinhVuc",
  listagency: server.v2Url + "CoQuan/GetCoQuanThanhTra",
  Listagency: server.v2Url + "CoQuan/GetCoQuanOrDoanhNghiepByPhanLoai",
  deleteCuocDotXuat: server.v2Url + "TaoCuocThanhTra/Delete_CuocThanhTraDotXuat",
  HuyCuoc: server.v2Url + 'PhanCongThanhVien/PhanCongThanhVien',
  BoHuy: server.v2Url + "TaoCuocThanhTra/BoHuyCuocThanhTra",
  ChuyenCuoc: server.v2Url + "CuocThanhTra/ChuyenCuocThanhTraSangNamSau",
  BoChuyenCuoc: server.v2Url + "CuocThanhTra/BoChuyenCuocThanhTraSangNamSau",
  danhSachListHinhThuc: server.v2Url + 'PhanLoaiThanhTra/GetHinhThuc',
};
const api = {
  danhSachListHinhThuc: (param) => {
    return apiGetAuth(apiUrl.danhSachListHinhThuc, {
      ...param,
    });
  },
  deleteCuocDotXuat: (cuocThanhTraID) => {
    return apiPostAuth(`${apiUrl.deleteCuocDotXuat}?cuocThanhTraID=${cuocThanhTraID}`);
  },
  BoChuyenCuoc: (cuocThanhTraID) => {
    return apiPostAuth(`${apiUrl.BoChuyenCuoc}?cuocThanhTraID=${cuocThanhTraID}`);
  },
  BoHuy: (cuocThanhTraID) => {
    return apiPostAuth(`${apiUrl.BoHuy}?cuocThanhTraID=${cuocThanhTraID}`);
  },
  ChuyenCuoc: (param) => {
    return apiPostAuth(apiUrl.ChuyenCuoc, param);
  },
  danhSachTaoCuoc: (param) => {
    return apiGetAuth(apiUrl.danhsachTaoCuoc, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  danhsachCanBo: (param) => {
    return apiGetAuth(apiUrl.danhsachCanBo, {
      ...param,
    });
  },

  chiTietTaoCuoc: (cuocThanhTraID) => {
    return apiGetAuth(`${apiUrl.chitietTaoCuoc}?cuocThanhTraID=${cuocThanhTraID}`);
  },
  PhanCongThanhVien: (cuocThanhTraID) => {
    return apiGetAuth(`${apiUrl.PhanCongThanhVien}?cuocThanhTraID=${cuocThanhTraID}`);
  },
  suaTaoCuoc: (param) => {
    return apiPostAuth(apiUrl.suaTaoCuoc, param);
  },
  themTaoCuoc: (param) => {
    return apiPostAuth(apiUrl.themTaoCuoc, param);
  },
  HuyCuoc: (param) => {
    return apiPostAuth(apiUrl.HuyCuoc, param);
  },
  suaTaoCuocDotXuat: (param) => {
    return apiPostAuth(apiUrl.suaTaoCuocDotXuat, param);
  },
  themTaoCuocDotXuat: (param) => {
    return apiPostAuth(apiUrl.themTaoCuocDotXuat, param);
  },
  chuyencuocTaoCuoc: (param) => {
    return apiPostAuth(apiUrl.chuyencuocTaoCuoc, param);
  },
  DownloadFile: (param) => {
    return apiGetAuth(`${apiUrl.downloadfile}?namThanhTra=${param}`);
  },
  GetListForm: (params) => {
    return apiGetAuth(apiUrl.listform, { ...params });
  },
  GetListField: (params) => {
    return apiGetAuth(apiUrl.listfield, { ...params });
  },
  GetListAgency: (params) => {
    return apiGetAuth(apiUrl.listagency, { ...params });
  },
  getListAgency: (params) => {
    return apiGetAuth(apiUrl.Listagency, {
      ...params,
      PageSize: params.PageSize ? params.PageSize : getDefaultPageSize(),
    });
  },
};

export default api;
