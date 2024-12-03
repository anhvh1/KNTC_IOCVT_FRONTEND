import {apiGetAuth, apiPostAuth} from '../../../../api';
import server from '../../../../settings';
import {getDefaultPageSize} from '../../../../helpers/utility';

const apiUrl = {
  danhsachthamquyen: server.v2Url + 'DanhMucThamQuyen/DanhSachThamQuyen',
  chitietthamquyen: server.v2Url + 'DanhMucThamQuyen/ChiTietThamQuyen',
  themthamquyen: server.v2Url + 'DanhMucThamQuyen/ThemMoiThamQuyen',
  capnhatthamquyen: server.v2Url + 'DanhMucThamQuyen/CapNhatThamQuyen',
  xoathamquyen: server.v2Url + 'DanhMucThamQuyen/XoaThamQuyen',
};
const api = {
  DanhSachThamQuyen: (param) => {
    return apiGetAuth(apiUrl.danhsachthamquyen, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  ChiTietThamQuyen: (param) => {
    return apiGetAuth(apiUrl.chitietthamquyen, {
      ...param,
    });
  },
  ThemThamQuyen: (param) => {
    return apiPostAuth(apiUrl.themthamquyen, {
      ...param,
    });
  },
  CapNhatThamQuyen: (param) => {
    return apiPostAuth(apiUrl.capnhatthamquyen, {
      ...param,
    });
  },
  XoaThamQuyen: (param) => {
    return apiPostAuth(apiUrl.xoathamquyen, param);
  },
};

export default api;
