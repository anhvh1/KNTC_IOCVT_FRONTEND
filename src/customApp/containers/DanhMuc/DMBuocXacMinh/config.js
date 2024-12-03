import {apiGetAuth, apiPostAuth} from '../../../../api';
import server from '../../../../settings';
import {getDefaultPageSize} from '../../../../helpers/utility';

const apiUrl = {
  danhsachbuocxacminh: server.v2Url + 'DanhMucBuocXacMinh/DanhSachBuocXacMinh',
  chitietbuocxacminh: server.v2Url + 'DanhMucBuocXacMinh/ChiTietBuocXacMinh',
  thembuocxacminh: server.v2Url + 'DanhMucBuocXacMinh/ThemMoiBuocXacMinh',
  capnhatbuocxacminh: server.v2Url + 'DanhMucBuocXacMinh/CapNhatBuocXacMinh',
  xoabuocxacminh: server.v2Url + 'DanhMucBuocXacMinh/XoaBuocXacMinh',
  danhSachLoaiKhieuToCha:
    server.v2Url + 'DanhMucLoaiKhieuTo/DanhSachLoaiKhieuToCha',
  danhsachfile: server.v2Url + 'DanhMucFile/DanhSachFile',
  danhsachfilemau: server.v2Url + 'DanhMucBuocXacMinh/DanhSachFileMau',
  idfilemau: server.v2Url + 'DanhMucBuocXacMinh/DanhSachFileID',
  themfile: server.v2Url + 'DanhMucBuocXacMinh/ThemMoiFileMau',
  xoafile: server.v2Url + 'DanhMucBuocXacMinh/XoaFileMau',
  capnhatfile: server.v2Url + 'DanhMucBuocXacMinh/CapNhatFileMau',
  getFile: server.v2Url + 'DanhMucBuocXacMinh/Download',
};
const api = {
  DanhSachBuocXacMinh: (param) => {
    return apiGetAuth(apiUrl.danhsachbuocxacminh, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  ChiTietBuocXacMinh: (param) => {
    return apiGetAuth(apiUrl.chitietbuocxacminh, {
      ...param,
    });
  },
  THemBuocXacMinh: (param) => {
    return apiPostAuth(apiUrl.thembuocxacminh, param, {
      'Content-Type': 'multipart/form-data',
    });
  },
  CapNhatBuocXacMinh: (param) => {
    return apiPostAuth(apiUrl.capnhatbuocxacminh, param, {
      'Content-Type': 'multipart/form-data',
    });
  },
  XoaBuocXacMinh: (param) => {
    return apiPostAuth(apiUrl.xoabuocxacminh, param);
  },
  DanhSachLoaiKhieuToCha: (param) => {
    return apiGetAuth(apiUrl.danhSachLoaiKhieuToCha, {
      ...param,
    });
  },
  DanhSachFile: (param) => {
    return apiGetAuth(apiUrl.danhsachfile, {
      ...param,
    });
  },
  DanhSachFileMau: (param) => {
    return apiGetAuth(apiUrl.danhsachfilemau, {
      ...param,
    });
  },
  IdFileMau: (param) => {
    return apiGetAuth(apiUrl.idfilemau, {
      ...param,
    });
  },
  THemFile: (param) => {
    return apiPostAuth(apiUrl.themfile, param, {
      'Content-Type': 'multipart/form-data',
    });
  },
  XoaFile: (param) => {
    return apiPostAuth(apiUrl.xoafile, param);
  },
  CapNhatFile: (param) => {
    return apiPostAuth(apiUrl.capnhatfile, param, {
      'Content-Type': 'multipart/form-data',
    });
  },
  GetFile: (param) => {
    return apiGetAuth(apiUrl.getFile, {
      ...param,
    });
  },
};

export default api;
