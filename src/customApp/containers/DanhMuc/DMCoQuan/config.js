import {apiGetAuth, apiPostAuth, apiDeleteAuth} from '../../../../api';
import server from '../../../../settings';

const apiUrl = {
  danhsachcoquan: server.v2Url + 'DanhMucCoQuanDonVi/DanhSachCacCap',
  getallcoquan: server.v2Url + 'TiepDan/GetAllCoQuan',
  chitietcoquan: server.v2Url + 'DanhMucCoQuanDonVi/ChiTietCoQuanID',
  themcoquan: server.v2Url + 'DanhMucCoQuanDonVi/ThemMoiCoQuanDonVi',
  suacoquan: server.v2Url + 'DanhMucCoQuanDonVi/CapNhatCoQuan',
  xoacoquan: server.v2Url + 'DanhMucCoQuanDonVi/XoaCoQuanDonVi',
  listbyuser: server.v2Url + 'DanhMucCoQuanDonVi/GetListByUser',
  checkmacq: server.v2Url + 'DanhMucCoQuanDonVi/CheckMaCQ',
  timkiemcoquan: server.v2Url + 'DanhMucCoQuanDonVi/SearchCoQuan',
  danhsachcaccapdonvi: server.v2Url + 'DanhMucCoQuanDonVi/DanhSachCacCapDonVi',
  danhsachthamquiyen: server.v2Url + 'DanhMucCoQuanDonVi/DanhSachThamQuyen',
  getlistcoquanbyuser: server.v2Url + 'DanhMucCoQuanDonVi/GetListCoQuanByUser',
};
const api = {
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
  xoaCoQuan: (param) => {
    return apiGetAuth(`${apiUrl.xoacoquan}?CoQuanID=${param}`);
  },
  danhSachCacCapDonVi: (param) => {
    return apiGetAuth(apiUrl.danhsachcaccapdonvi);
  },
  danhSachThamQuyen: (param) => {
    return apiGetAuth(apiUrl.danhsachthamquiyen);
  },
  AllCoQuan: () => {
    return apiGetAuth(apiUrl.getallcoquan);
  },
  ListByUser: () => {
    return apiGetAuth(apiUrl.listbyuser);
  },
  CheckMaCQ: (param) => {
    return apiGetAuth(apiUrl.checkmacq, {
      ...param,
    });
  },
  suaCoQuan: (param) => {
    return apiPostAuth(apiUrl.suacoquan, {
      ...param,
    });
  },
  GetListCoQuanByUser: (param) => {
    return apiGetAuth(apiUrl.getlistcoquanbyuser, {
      ...param,
    });
  },
};

export default api;
