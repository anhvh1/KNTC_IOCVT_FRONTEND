import {apiGetAuth, apiPostAuth} from '../../../../api';
import server from '../../../../settings';
import {getDefaultPageSize} from '../../../../helpers/utility';
export const apiUrl = {
  // server.v2Url + "DanhMucBieuMau/DanhSachBieuMau"
  danhmucbieumau: server.v2Url + 'DanhMucBieuMau/DanhSachBieuMau',
  thembieumau: server.v2Url + 'DanhMucBieuMau/ThemBieuMau',
  chitietbieumau: server.v2Url + 'DanhMucBieuMau/BieuMauChiTiet',
  danhsachcap: server.v2Url + 'DanhMucBieuMau/DanhSachCap',
  lichsuchitiet: server.v2Url + 'DanhMucBieuMau/LichSuChiTiet',
  downloadfile: server.v2Url + 'DanhMucBieuMau/DowloadBieuMau?fileName=',
  xoabieumau: server.v2Url + 'DanhMucBieuMau/XoaBieuMau',
  bieumaupreview: server.v2Url + 'DanhMucBieuMau/Preview',
  suabieumau: server.v2Url + 'DanhMucBieuMau/SuaBieuMau',
};
const api = {
  DanhMucBieuMau: (param) => {
    return apiGetAuth(apiUrl.danhmucbieumau, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  ChiTietBieuMau: (param) => {
    return apiGetAuth(apiUrl.chitietbieumau, {
      ...param,
    });
  },
  BieuMauPreView: (param) => {
    return apiGetAuth(apiUrl.bieumaupreview, param);
  },
  DanhSachCap: (param) => {
    return apiGetAuth(apiUrl.danhsachcap, param);
  },
  LichSuChiTiet: (param) => {
    return apiGetAuth(apiUrl.lichsuchitiet, param);
  },
  ThemBieuMau: (param) => {
    return apiPostAuth(apiUrl.thembieumau, param, {
      'Content-Type': 'multipart/form-data',
    });
  },
  SuaBieuMau: (param) => {
    return apiPostAuth(apiUrl.suabieumau, param, {
      'Content-Type': 'multipart/form-data',
    });
  },
  XoaBieuMau: (param) => {
    return apiPostAuth(apiUrl.xoabieumau, {
      BieuMauID: param,
    });
  },
};

export default api;
