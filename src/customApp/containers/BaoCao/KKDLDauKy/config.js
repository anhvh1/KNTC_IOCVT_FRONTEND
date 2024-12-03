import {apiGetAuth, apiPostAuth} from '../../../../api';
import server from '../../../../settings';
import {getDefaultPageSize} from '../../../../helpers/utility';

export const apiUrl = {
  thongtinbaocao: server.v2Url + 'KeKhaiDuLieuDauKy/GetDuLieuDauKy',
  danhsachcapbaocao: server.v2Url + 'BaoCao/GetListCap',
  chitietdonthu:
    server.v2Url + 'KeKhaiDuLieuDauKy/GetDuLieuDauKy_GetDSChiTietDonThu',
  savereport: server.v2Url + 'KeKhaiDuLieuDauKy/Save',
};
const api = {
  ThongTinBaoCao: (param) => {
    return apiGetAuth(apiUrl.thongtinbaocao, {
      ...param,
      // LoaiBaoCao: 1,
    });
  },
  SaveReport: (param) => {
    return apiPostAuth(apiUrl.savereport, param);
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
