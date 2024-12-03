import {apiGetAuth, apiPostAuth} from '../../../../api';
import server from '../../../../settings';
import {getDefaultPageSize} from '../../../../helpers/utility';

const apiUrl = {
  danhsachquoctich: server.v2Url + 'DanhMucQuocTich/DanhSachQuocTich',
  chitietquoctich: server.v2Url + 'DanhMucQuocTich/ChiTietQuocTich',
  themquoctich: server.v2Url + 'DanhMucQuocTich/ThemMoiQuocTich',
  capnhatquoctich: server.v2Url + 'DanhMucQuocTich/CapNhatQuocTich',
  xoaquoctich: server.v2Url + 'DanhMucQuocTich/XoaQuocTich',
};
const api = {
  DanhSachQuocTich: (param) => {
    return apiGetAuth(apiUrl.danhsachquoctich, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  ChiTietQuocTich: (param) => {
    return apiGetAuth(apiUrl.chitietquoctich, {
      ...param,
    });
  },
  THemQuocTich: (param) => {
    return apiPostAuth(apiUrl.themquoctich, {
      ...param,
    });
  },
  CapNhatQuocTich: (param) => {
    return apiPostAuth(apiUrl.capnhatquoctich, {
      ...param,
    });
  },
  XoaQuocTich: (param) => {
    return apiPostAuth(apiUrl.xoaquoctich, param);
  },
};

export default api;
