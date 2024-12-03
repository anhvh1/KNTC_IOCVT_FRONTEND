import {apiGetAuth, apiPostAuth} from '../../../../api';
import server from '../../../../settings';
import {getDefaultPageSize} from '../../../../helpers/utility';

export const apiUrl = {
  thongtinbaocao: server.v2Url + 'QuanLyNhapLieu/GetListPaging',
  danhsachcapbaocao: server.v2Url + 'BaoCao/GetListCap',
  chitietdonthu: server.v2Url + 'BaoCao/TCD01_GetDSChiTietDonThu',
  exportexcel: server.v2Url + 'QuanLyNhapLieu/ExportExcel',
};
const api = {
  ThongTinBaoCao: (param) => {
    return apiGetAuth(apiUrl.thongtinbaocao, {
      ...param,
    });
  },
  ExportExcel: (param) => {
    return apiGetAuth(apiUrl.exportexcel, {
      ...param,
    });
  },
  DanhSachCapBaoCao: (params) => {
    return apiGetAuth(apiUrl.danhsachcapbaocao, {
      ...params,
    });
  },
  ChiTietDonThu: (params) => {
    return apiGetAuth(apiUrl.chitietdonthu, {
      ...params,
      PageNumber: params.PageNumber ? params.PageNumber : 1,
      PageSize: params.PageSize ? params.PageSize : getDefaultPageSize(),
    });
  },
};

export default api;
