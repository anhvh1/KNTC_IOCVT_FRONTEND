import {apiGetAuth, apiPostAuth} from '../../../../api';
import server from '../../../../settings';
import {getDefaultPageSize} from '../../../../helpers/utility';

export const apiUrl = {
  thongtinbaocao: server.v2Url + 'BaoCao/TCD02',
  danhsachcapbaocao: server.v2Url + 'BaoCao/GetListCap',
  chitietdonthu: server.v2Url + 'BaoCao/TCD02_GetDSChiTietDonThu',
  exportexcel: server.v2Url + 'BaoCao/TCD02_Excel',
};
const api = {
  ThongTinBaoCao: (param) => {
    return apiGetAuth(apiUrl.thongtinbaocao, {
      ...param,
    });
  },
  DanhSachCapBaoCao: (params) => {
    return apiGetAuth(apiUrl.danhsachcapbaocao, {
      ...params,
    });
  },
  ExportExcel: (param) => {
    return apiGetAuth(apiUrl.exportexcel, {
      ...param,
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
