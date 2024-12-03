import {apiGetAuth, apiPostAuth} from '../../../../api';
import server from '../../../../settings';
import {getDefaultPageSize} from '../../../../helpers/utility';
export const apiUrl = {
  // server.v2Url + "DanhMucBieuMau/DanhSachBieuMau"
  danhmucbieumau: server.v2Url + 'TrinhTuThuTuc/GetListPaging',
  luutrinhtuthutuc: server.v2Url + 'TrinhTuThuTuc/Save',
  chitietbieumau: server.v2Url + 'TrinhTuThuTuc/GetByID',
  danhsachcap: server.v2Url + 'TrinhTuThuTuc/DanhSachCap',
  lichsuchitiet: server.v2Url + 'TrinhTuThuTuc/LichSuChiTiet',
  downloadfile: server.v2Url + 'TrinhTuThuTuc/DowloadBieuMau?fileName=',
  xoabieumau: server.v2Url + 'TrinhTuThuTuc/Delete',
  bieumaupreview: server.v2Url + 'TrinhTuThuTuc/Preview',
  suatrinhtuthutuc: server.v2Url + 'TrinhTuThuTuc/Save',
  uploadfile: server.v2Url + 'FileDinhKem/Insert',
};
const api = {
  TrinhTuThuTuc: (param) => {
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
  UploadFile: (params) => {
    return apiPostAuth(apiUrl.uploadfile, params);
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
  LuuTrinhTuThuTuc: (param) => {
    return apiPostAuth(apiUrl.luutrinhtuthutuc, param);
  },
  XoaBieuMau: (param) => {
    return apiPostAuth(apiUrl.xoabieumau, param);
  },
};

export default api;
