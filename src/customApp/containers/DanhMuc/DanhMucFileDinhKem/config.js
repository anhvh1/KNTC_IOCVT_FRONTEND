import {apiGetAuth, apiPostAuth} from '../../../../api';
import server from '../../../../settings';
import {getDefaultPageSize} from '../../../../helpers/utility';

const apiUrl = {
  danhsachfiledinhkem: server.v2Url + 'DanhMucFileDinhKem/DanhSachFileDinhKem',
  chitietfiledinhkem: server.v2Url + 'DanhMucFileDinhKem/ChiTietFileDinhKem',
  themfiledinhkem: server.v2Url + 'DanhMucFileDinhKem/ThemMoiFileDinhKem',
  capnhatfiledinhkem: server.v2Url + 'DanhMucFileDinhKem/CapNhatFileDinhKem',
  xoafiledinhkem: server.v2Url + 'DanhMucFileDinhKem/XoaFileDinhKem',
};
const api = {
  DanhSachFileDinhKem: (param) => {
    return apiGetAuth(apiUrl.danhsachfiledinhkem, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  ChiTietFileDinhKem: (param) => {
    return apiGetAuth(apiUrl.chitietfiledinhkem, {
      ...param,
    });
  },
  ThemFileDinhKem: (param) => {
    return apiPostAuth(apiUrl.themfiledinhkem, {
      ...param,
    });
  },
  CapNhatFileDinhKem: (param) => {
    return apiPostAuth(apiUrl.capnhatfiledinhkem, {
      ...param,
    });
  },
  XoaFileDinhKem: (param) => {
    return apiPostAuth(apiUrl.xoafiledinhkem, param);
  },
};

export default api;
