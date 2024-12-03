import {apiGetAuth, apiPostAuth} from '../../../../api';
import server from '../../../../settings';
import {getDefaultPageSize} from '../../../../helpers/utility';

const apiUrl = {
  danhsachloaiketqua: server.v2Url + 'DanhMucLoaiKetQua/DanhSachLoaiKetQua',
  chitietloaiketqua: server.v2Url + 'DanhMucLoaiKetQua/ChiTietLoaiKetQua',
  themloaiketqua: server.v2Url + 'DanhMucLoaiKetQua/ThemMoiLoaiKetQua',
  capnhatloaiketqua: server.v2Url + 'DanhMucLoaiKetQua/CapNhatLoaiKetQua',
  xoaloaiketqua: server.v2Url + 'DanhMucLoaiKetQua/XoaLoaiKetQua',
};
const api = {
  DanhSachLoaiKetQua: (param) => {
    return apiGetAuth(apiUrl.danhsachloaiketqua, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  ChiTietLoaiKetQua: (param) => {
    return apiGetAuth(apiUrl.chitietloaiketqua, {
      ...param,
    });
  },
  ThemLoaiKetQua: (param) => {
    return apiPostAuth(apiUrl.themloaiketqua, {
      ...param,
    });
  },
  CapNhatLoaiKetQua: (param) => {
    return apiPostAuth(apiUrl.capnhatloaiketqua, {
      ...param,
    });
  },
  XoaLoaiKetQua: (param) => {
    return apiPostAuth(apiUrl.xoaloaiketqua, param);
  },
};

export default api;
