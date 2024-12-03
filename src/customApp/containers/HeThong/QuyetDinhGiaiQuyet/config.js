import {apiGetAuth, apiPostAuth} from '../../../../api';
import server from '../../../../settings';
import {getDefaultPageSize} from '../../../../helpers/utility';

const apiUrl = {
  danhsachcauhinhnoidungemail:
    server.v2Url + 'QuanLyCauHinhNoiDungEmail/GetListPaging',
  chitietemail: server.v2Url + 'QuanLyCauHinhNoiDungEmail/GetByID',
  capnhatemail: server.v2Url + 'QuanLyCauHinhNoiDungEmail/Save',
  xoaemail: server.v2Url + 'QuanLyCauHinhNoiDungEmail/Delete',
  danhsachloaiemail: server.v2Url + 'QuanLyCauHinhNoiDungEmail/DMLoaiEmail',
};
const api = {
  DanhSachEmail: (param) => {
    return apiGetAuth(apiUrl.danhsachcauhinhnoidungemail, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  DanhSachLoaiEmail: (params) => {
    return apiGetAuth(apiUrl.danhsachloaiemail, {
      ...params,
    });
  },
  ChiTietEmail: (param) => {
    return apiGetAuth(apiUrl.chitietemail, {
      ...param,
    });
  },
  CapNhatEmail: (param) => {
    return apiPostAuth(apiUrl.capnhatemail, {
      ...param,
    });
  },
  XoaEmail: (param) => {
    return apiPostAuth(apiUrl.xoaemail, param);
  },
};

export default api;
