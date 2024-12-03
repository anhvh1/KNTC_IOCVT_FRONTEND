import {apiGetAuth, apiPostAuth, apiDownloadAuth} from '../../../../api';
import server from '../../../../settings';
import {getDefaultPageSize} from '../../../../helpers/utility';

export const apiUrl = {
  danhsachTienHanh: server.v2Url + 'QuanLyThuTuc/GetListPaging',
  themTienHanh: server.v2Url + 'QuanLyThuTuc/Insert',
  chitietTienHanh: server.v2Url + 'QuanLyThuTuc/ChiTiet',
  suaTienHanh: server.v2Url + 'QuanLyThuTuc/Update',
  xoaTienHanh: server.v2Url + 'QuanLyThuTuc/Delete',
  downloadfile: server.v2Url + 'QuanLyTienHanh/ChiTiet',
};
const api = {
  danhSachTienHanh: (param) => {
    return apiGetAuth(apiUrl.danhsachTienHanh, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  themTienHanh: (param) => {
    return apiPostAuth(apiUrl.themTienHanh, {
      ...param,
    });
  },
  chiTietTienHanh: (param) => {
    return apiGetAuth(`${apiUrl.chitietTienHanh}?ID=${param}`);
  },
  suaTienHanh: (param) => {
    return apiPostAuth(apiUrl.suaTienHanh, {
      ...param,
    });
  },
  xoaTienHanh: (param) => {
    return apiPostAuth(apiUrl.xoaTienHanh, param);
  },
  downloadFile: (param) => {
    return apiGetAuth(apiUrl.downloadfile, param);
  },
};

export default api;
