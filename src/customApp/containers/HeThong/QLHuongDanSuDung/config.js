import {apiGetAuth, apiPostAuth, apiDownloadAuth} from '../../../../api';
import server from '../../../../settings';
import {getDefaultPageSize} from '../../../../helpers/utility';

export const apiUrl = {
  danhsachhuongdan: server.v2Url + 'HuongDanSuDung/GetListPaging',
  themhuongdan: server.v2Url + 'HuongDanSuDung/Insert',
  chitiethuongdan: server.v2Url + 'HuongDanSuDung/GetByID',
  suahuongdan: server.v2Url + 'HuongDanSuDung/Update',
  xoahuongdan: server.v2Url + 'HuongDanSuDung/Delete',
  downloadfile: server.v2Url + 'HuongDanSuDung/GetByID',
  danhsachcaccapdonvi:
    server.v2Url + 'DanhMucCoQuanDonVi/DanhSachCacCapDonVi_HDSD',
  getbymachucnang: server.v2Url + 'HuongDanSuDung/GetByMaChucNang',
  getlistmenubycap: server.v2Url + 'HuongDanSuDung/GetListMenuByCap',
};
const api = {
  danhSachHuongDan: (param) => {
    return apiGetAuth(apiUrl.danhsachhuongdan, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  GetListMenuByCap: (param) => {
    return apiGetAuth(apiUrl.getlistmenubycap, {
      ...param,
    });
  },
  danhSachCacCapDonVi: (param) => {
    return apiGetAuth(apiUrl.danhsachcaccapdonvi);
  },
  themHuongDan: (param) => {
    return apiPostAuth(apiUrl.themhuongdan, {
      ...param,
    });
  },
  chiTietHuongDan: (param) => {
    return apiGetAuth(apiUrl.chitiethuongdan, {
      ...param,
    });
  },
  suaHuongDan: (param) => {
    return apiPostAuth(apiUrl.suahuongdan, {
      ...param,
    });
  },
  xoaHuongDan: (param) => {
    return apiPostAuth(apiUrl.xoahuongdan, {
      ...param,
    });
  },
  downloadFile: (param) => {
    return apiGetAuth(apiUrl.downloadfile, param);
  },
  GetByMaChucNang: (param) => {
    return apiGetAuth(apiUrl.getbymachucnang, {...param});
  },
};

export default api;
