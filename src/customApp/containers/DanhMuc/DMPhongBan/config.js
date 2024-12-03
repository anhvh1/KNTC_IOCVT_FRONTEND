import {apiGetAuth, apiPostAuth} from '../../../../api';
import server from '../../../../settings';
import {getDefaultPageSize} from '../../../../helpers/utility';

const apiUrl = {
  danhsachphongban: server.v2Url + 'DanhMucPhongBan/DanhSachPhongBan',
  chitietphongban: server.v2Url + 'DanhMucPhongBan/ChiTietPhongBan',
  themphongban: server.v2Url + 'DanhMucPhongBan/ThemMoiPhongBan',
  capnhatphongban: server.v2Url + 'DanhMucPhongBan/CapNhatPhongBan',
  xoaphongban: server.v2Url + 'DanhMucPhongBan/XoaPhongBan',
};
const api = {
  DanhSachPhongBan: (param) => {
    return apiGetAuth(apiUrl.danhsachphongban, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  ChiTietPhongBan: (param) => {
    return apiGetAuth(apiUrl.chitietphongban, {
      ...param,
    });
  },
  ThemPhongBan: (param) => {
    return apiPostAuth(apiUrl.themphongban, {
      ...param,
    });
  },
  CapNhatPhongBan: (param) => {
    return apiPostAuth(apiUrl.capnhatphongban, {
      ...param,
    });
  },
  XoaPhongBan: (param) => {
    return apiPostAuth(apiUrl.xoaphongban, param);
  },
};

export default api;
