import {apiGetAuth, apiPostAuth} from '../../../../api';
import server from '../../../../settings';
import {getDefaultPageSize} from '../../../../helpers/utility';

const apiUrl = {
  danhsachfile: server.v2Url + 'DanhMucFile/DanhSachFile',
  chitietfile: server.v2Url + 'DanhMucFile/ChiTietFile',
  themfile: server.v2Url + 'DanhMucFile/ThemFile',
  capnhatfile: server.v2Url + 'DanhMucFile/CapNhatFile',
  xoafile: server.v2Url + 'DanhMucFile/XoaFile',
  danhsachchucnang: server.v2Url + 'DanhMucFile/DanhSachChucNang',
};
const api = {
  DanhSachFile: (param) => {
    return apiGetAuth(apiUrl.danhsachfile, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  ChiTietFile: (param) => {
    return apiGetAuth(apiUrl.chitietfile, {
      ...param,
    });
  },
  ThemFile: (param) => {
    return apiPostAuth(apiUrl.themfile, {
      ...param,
    });
  },
  CapNhatFile: (param) => {
    return apiPostAuth(apiUrl.capnhatfile, {
      ...param,
    });
  },
  XoaFile: (param) => {
    return apiPostAuth(apiUrl.xoafile, param);
  },
  DanhSachChucNang: (param) => {
    return apiGetAuth(apiUrl.danhsachchucnang, param);
  },
};

export default api;
