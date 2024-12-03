import {apiGetAuth, apiPostAuth} from '../../../../api';
import server from '../../../../settings';
import {getDefaultPageSize} from '../../../../helpers/utility';

const apiUrl = {
  danhsachquyetdinhgiaiquyet:
    server.v2Url + 'TraCuu/GetDanhSachCacQuyetDinhGiaiQuyet',
  chitietdonthuloi: server.v2Url + 'TraCuu/UpdateTrangThaiKhoa',
  danhsachloaikhieutocha:
    server.v2Url + 'DanhMucLoaiKhieuTo/DanhSachLoaiKhieuToCha',
  chitietdonthu2: server.v2Url + 'ChiTietDonThu/GetChiTietDonThu',
  updatetrangthaikhoa: server.v2Url + 'TraCuu/UpdateTrangThaiKhoa',
};
const api = {
  DanhSachQuyetDinhGiaiQuyet: (param) => {
    return apiGetAuth(apiUrl.danhsachquyetdinhgiaiquyet, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  ChiTietDonThu2: (params) => {
    return apiGetAuth(apiUrl.chitietdonthu2, {...params});
  },
  ChiTietDonThuLoi: (param) => {
    return apiGetAuth(apiUrl.chitietdonthuloi, {
      ...param,
    });
  },
  UpdateTrangThaiKhoa: (param) => {
    return apiPostAuth(apiUrl.updatetrangthaikhoa, {
      ...param,
    });
  },
  DanhSachLoaiKhieuToCha: (param) => {
    return apiGetAuth(apiUrl.danhsachloaikhieutocha, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
};

export default api;
