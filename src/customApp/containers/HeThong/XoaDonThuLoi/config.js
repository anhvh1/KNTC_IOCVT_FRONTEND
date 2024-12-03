import {apiGetAuth, apiPostAuth} from '../../../../api';
import server from '../../../../settings';
import {getDefaultPageSize} from '../../../../helpers/utility';

const apiUrl = {
  danhsachdonthuloi: server.v2Url + 'XoaDonThuLoi/GetListPaging',
  chitietdonthuloi: server.v2Url + 'XoaDonThuLoi/GetByID',
  xoadonthuloi: server.v2Url + 'XoaDonThuLoi/Delete',
  danhsachloaikhieutocha:
    server.v2Url + 'DanhMucLoaiKhieuTo/DanhSachLoaiKhieuToCha',
  chitietdonthu2: server.v2Url + 'ChiTietDonThu/GetChiTietDonThu',
};
const api = {
  DanhSachDonThuLoi: (param) => {
    return apiGetAuth(apiUrl.danhsachdonthuloi, {
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
  XoaDonThuLoi: (param) => {
    return apiPostAuth(apiUrl.xoadonthuloi, {
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
