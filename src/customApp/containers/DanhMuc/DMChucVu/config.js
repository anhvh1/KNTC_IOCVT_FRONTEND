import {apiGetAuth, apiPostAuth} from '../../../../api';
import server from '../../../../settings';
import {getDefaultPageSize} from '../../../../helpers/utility';

const apiUrl = {
  danhsachchucvu: server.v2Url + 'DanhMucChucVu/DanhSachChucVu',
  chitietchucvu: server.v2Url + 'DanhMucChucVu/ChiTietChucVu',
  themchucvu: server.v2Url + 'DanhMucChucVu/ThemMoiChucVu',
  capnhatchucvu: server.v2Url + 'DanhMucChucVu/CapNhatChucVu',
  xoachucvu: server.v2Url + 'DanhMucChucVu/XoaChucVu',
};
const api = {
  DanhSachChucVu: (param) => {
    return apiGetAuth(apiUrl.danhsachchucvu, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  ChiTietChucVu: (param) => {
    return apiGetAuth(apiUrl.chitietchucvu, {
      ...param,
    });
  },
  ThemChucVu: (param) => {
    return apiPostAuth(apiUrl.themchucvu, {
      ...param,
    });
  },
  CapNhatChucVu: (param) => {
    return apiPostAuth(apiUrl.capnhatchucvu, {
      ...param,
    });
  },
  XoaChucVu: (param) => {
    return apiPostAuth(apiUrl.xoachucvu, param);
  },
  GetAllChucVu: (param) => {
    return apiGetAuth(apiUrl.danhsachchucvu, {
      ...param,
      PageNumber: 1,
      PageSize: 9999,
    });
  },
};

export default api;
