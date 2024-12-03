import {apiGetAuth, apiPostAuth} from '../../../../api';
import server from '../../../../settings';
import {getDefaultPageSize} from '../../../../helpers/utility';

const apiUrl = {
  danhsachtrangthaidon:
    server.v2Url + 'DanhMucTrangThaiDon/DanhSachTrangThaiDon',
  chitiettrangthaidon: server.v2Url + 'DanhMucTrangThaiDon/ChiTietTrangThaiDon',
  themtrangthaidon: server.v2Url + 'DanhMucTrangThaiDon/ThemMoiTrangThaiDon',
  capnhaptrangthaidon: server.v2Url + 'DanhMucTrangThaiDon/CapNhatTrangThaiDon',
  xoatrangthaidon: server.v2Url + 'DanhMucTrangThaiDon/XoaTrangThaiDon',
};
const api = {
  DanhSachTrangThaiDon: (param) => {
    return apiGetAuth(apiUrl.danhsachtrangthaidon, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  ChiTietTrangThaiDon: (param) => {
    return apiGetAuth(apiUrl.chitiettrangthaidon, {
      ...param,
    });
  },
  ThemTrangThaiDon: (param) => {
    return apiPostAuth(apiUrl.themtrangthaidon, {
      ...param,
    });
  },
  CapNhatTrangThaiDon: (param) => {
    return apiPostAuth(apiUrl.capnhaptrangthaidon, {
      ...param,
    });
  },
  XoaTrangThaiDon: (param) => {
    return apiPostAuth(apiUrl.xoatrangthaidon, param);
  },
};

export default api;
