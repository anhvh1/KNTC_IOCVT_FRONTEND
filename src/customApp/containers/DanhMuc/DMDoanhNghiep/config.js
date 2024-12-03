import { apiGetAuth, apiPostAuth, apiDownloadAuth } from '../../../../api';
import server from '../../../../settings';
import { getDefaultPageSize } from '../../../../helpers/utility';

export const apiUrl = {
  danhsachdoanhnghiep: server.v2Url + 'DoanhNghiep/GetListPaging',
  themdoanhnghiep: server.v2Url + 'DoanhNghiep/Insert',
  chitietdoanhnghiep: server.v2Url + 'DoanhNghiep/GetByCoQuanID',
  suadoanhnghiep: server.v2Url + 'DoanhNghiep/Update',
  xoadoanhnghiep: server.v2Url + 'DoanhNghiep/DeleteByCoQuanId',
  danhsachlinhvuc: server.v2Url + 'LinhVuc/GetAll',
  danhsachtinh: server.v2Url + 'Tinh/GetAll',
  downloadFile: server.v2Url + 'DoanhNghiep/DownloadFileImportDoanhNghiep',
  downloadDanhSach: server.v2Url + 'DoanhNghiep/DownloadFileDoanhNghiep',
  danhsachhuyen: server.v2Url + 'Huyen/GetByTinh',
  danhsachxa: server.v2Url + 'Xa/GetByHuyen',
  ImportFile: server.v2Url + 'DoanhNghiep/ImportDoanhNghiep',
};
const api = {
  danhSachDoanhNghiep: (param) => {
    return apiGetAuth(apiUrl.danhsachdoanhnghiep, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  danhSachLinhVuc: (param) => {
    return apiGetAuth(apiUrl.danhsachlinhvuc, {
      ...param,
    });
  },
  danhSachTinh: (param) => {
    return apiGetAuth(apiUrl.danhsachtinh, {
      ...param,
    });
  },
  DownloadFile: (param) => {
    return apiGetAuth(apiUrl.downloadFile, {
      ...param,
    });
  },
  DownloadDanhSach: (param) => {
    return apiGetAuth(apiUrl.downloadDanhSach, {
      ...param,
    });
  },
  
  danhSachHuyen: (tinhID) => {
    return apiGetAuth(`${apiUrl.danhsachhuyen}?tinhID=63`);
  },
  danhSachXa: (huyenID) => {
    return apiGetAuth(`${apiUrl.danhsachxa}?huyenID=${huyenID}`);
  },
  themDoanhNghiep: (param) => {
    return apiPostAuth(apiUrl.themdoanhnghiep, {
      ...param,
    });
  },
  chiTietDoanhNghiep: (param) => {
    return apiGetAuth(apiUrl.chitietdoanhnghiep, param);
  },
  suaDoanhNghiep: (param) => {
    return apiPostAuth(apiUrl.suadoanhnghiep, {
      ...param,
    });
  },
  xoaDoanhNghiep: (param) => {
    return apiPostAuth(apiUrl.xoadoanhnghiep, param);
  },
  ImportFile: (param) => {
    return apiPostAuth(apiUrl.ImportFile, param);
  },
};

export default api;
