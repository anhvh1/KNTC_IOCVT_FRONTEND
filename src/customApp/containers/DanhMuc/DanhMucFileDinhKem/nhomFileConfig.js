import {apiGetAuth, apiPostAuth} from '../../../../api';
import server from '../../../../settings';
import {getDefaultPageSize} from '../../../../helpers/utility';

const apiUrl = {
  danhsachnhomfile: server.v2Url + 'DanhMucFile/DanhSachNhomFile',
  chitietnhomfile: server.v2Url + 'DanhMucFile/ChiTietNhomFile',
  themnhomfile: server.v2Url + 'DanhMucFile/ThemNhomFile',
  capnhatnhomfile: server.v2Url + 'DanhMucFile/CapNhatNhomFile',
  xoanhomfile: server.v2Url + 'DanhMucFile/XoaNhomFile',
};
const api = {
  DanhSachNhomFile: (param) => {
    return apiGetAuth(apiUrl.danhsachnhomfile, {
      ...param,
      PageNumber: param.NhomFilePageNumber ? param.NhomFilePageNumber : 1,
      PageSize: param.NhomFilePageSize
        ? param.NhomFilePageSize
        : getDefaultPageSize(),
    });
  },
  ChiTietNhomFile: (param) => {
    return apiGetAuth(apiUrl.chitietnhomfile, {
      ...param,
    });
  },
  ThemNhomFile: (param) => {
    return apiPostAuth(apiUrl.themnhomfile, {
      ...param,
    });
  },
  CapNhatNhomFile: (param) => {
    return apiPostAuth(apiUrl.capnhatnhomfile, {
      ...param,
    });
  },
  XoaNhomFile: (param) => {
    return apiPostAuth(apiUrl.xoanhomfile, param);
  },
};

export default api;
