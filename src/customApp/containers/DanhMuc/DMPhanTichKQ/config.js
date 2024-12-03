import {apiGetAuth, apiPostAuth} from '../../../../api';
import server from '../../../../settings';
import {getDefaultPageSize} from '../../../../helpers/utility';

const apiUrl = {
  danhsachphantichkq: server.v2Url + 'DanhMucPhanTich/DanhSachPhanTichKQ',
  chitietphantichkq: server.v2Url + 'DanhMucPhanTich/ChiTietPhanTichKQ',
  themphantichkq: server.v2Url + 'DanhMucPhanTich/ThemMoiPhanTichKQ',
  capnhatphantichkq: server.v2Url + 'DanhMucPhanTich/CapNhatPhanTichKQ',
  xoaphantichkq: server.v2Url + 'DanhMucPhanTich/XoaPhanTichKQ',
};
const api = {
  DanhSachPhanTichKQ: (param) => {
    return apiGetAuth(apiUrl.danhsachphantichkq, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  ChiTietPhanTichKQ: (param) => {
    return apiGetAuth(apiUrl.chitietphantichkq, {
      ...param,
    });
  },
  ThemPhanTichKQ: (param) => {
    return apiPostAuth(apiUrl.themphantichkq, {
      ...param,
    });
  },
  CapNhatPhanTichKQ: (param) => {
    return apiPostAuth(apiUrl.capnhatphantichkq, {
      ...param,
    });
  },
  XoaPhanTichKQ: (param) => {
    return apiPostAuth(apiUrl.xoaphantichkq, param);
  },
};

export default api;
