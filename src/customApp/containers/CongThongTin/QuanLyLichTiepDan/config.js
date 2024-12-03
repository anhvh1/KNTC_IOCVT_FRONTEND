import {apiGetAuth, apiPostAuth} from '../../../../api';
import server from '../../../../settings';
import {getDefaultPageSize} from '../../../../helpers/utility';
export const apiUrl = {
  // server.v2Url + "DanhMucBieuMau/DanhSachBieuMau"
  lichtiepdan: server.v2Url + 'LichTiepDan/GetListPaging',
  themlichtiepdan: server.v2Url + 'LichTiepDan/Save',
  chitietbieumau: server.v2Url + 'LichTiepDan/GetByID',
  danhsachcap: server.v2Url + 'LichTiepDan/DanhSachCap',
  lichsuchitiet: server.v2Url + 'LichTiepDan/LichSuChiTiet',
  downloadfile: server.v2Url + 'LichTiepDan/DowloadBieuMau?fileName=',
  xoalichtiepdan: server.v2Url + 'LichTiepDan/Delete',
  bieumaupreview: server.v2Url + 'LichTiepDan/Preview',
  sualichtiepdan: server.v2Url + 'LichTiepDan/Save',
  getallcoquan: server.v2Url + 'TiepDan/GetAllCoQuan',
  danhsachlanhdao: server.v2Url + 'TiepDan/GetDanhSachLanhDao',
  updatetrangthaipublic: server.v2Url + 'LichTiepDan/UpdateTrangThaiPublic',
};

const api = {
  LichTiepDan: (param) => {
    return apiGetAuth(apiUrl.lichtiepdan, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  UpdateTrangThai: (param) => {
    return apiPostAuth(apiUrl.updatetrangthaipublic, param);
  },
  ChiTietBieuMau: (param) => {
    return apiGetAuth(apiUrl.chitietbieumau, {
      ...param,
    });
  },
  GetAllCoQuan: (params) => {
    return apiGetAuth(apiUrl.getallcoquan);
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
  ThemLichTiepDan: (param) => {
    return apiPostAuth(apiUrl.themlichtiepdan, param);
  },
  SuaLichTiepDan: (param) => {
    return apiPostAuth(apiUrl.sualichtiepdan, param);
  },
  GetDanhSachLanhDao: (param) => {
    return apiGetAuth(apiUrl.danhsachlanhdao, param);
  },
  XoaLichTiepDan: (param) => {
    return apiPostAuth(apiUrl.xoalichtiepdan, param);
  },
};

export default api;
