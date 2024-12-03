import {apiGetAuth, apiPostAuth} from '../../../../api';
import server from '../../../../settings';

const apiUrl = {
  danhsachcoquan: server.v2Url + 'DanhMucLoaiKhieuTo/DanhSachLoaiKhieuTo',
  getallcoquan: server.v2Url + 'DanhMucLoaiKhieuTo/DanhSachLoaiKhieuTo',
  chitietcoquan: server.v2Url + 'DanhMucLoaiKhieuTo/ChiTietLoaiKhieuTo',
  themcoquan: server.v2Url + 'DanhMucLoaiKhieuTo/ThemMoiLoaiKhieuTo',
  suacoquan: server.v2Url + 'DanhMucLoaiKhieuTo/CapNhatLoaiKhieuTo',
  xoacoquan: server.v2Url + 'DanhMucLoaiKhieuTo/XoaLoaiKhieuTo',
  setSuDung: server.v2Url + 'DanhMucLoaiKhieuTo/CapNhatTrangThaiSuDung',
  danhsachdiagioi: server.v2Url + 'danhmucdiagioihanhchinh/getallbycap',
  listbyuser: server.v2Url + 'DanhMucCoQuanDonVi/GetListByUser',
  checkmacq: server.v2Url + 'DanhMucCoQuanDonVi/CheckMaCQ',
};
const api = {
  danhSachCoQuan: (param) => {
    return apiGetAuth(apiUrl.danhsachcoquan, {
      ...param,
    });
  },
  danhSachDiaGioi: (param) => {
    return apiGetAuth(apiUrl.danhsachdiagioi, {
      ...param,
      ID: param.ID ? param.ID : 0,
    });
  },
  chiTietCoQuan: (param) => {
    return apiGetAuth(apiUrl.chitietcoquan, {...param});
  },
  themCoQuan: (param) => {
    return apiPostAuth(apiUrl.themcoquan, {...param});
  },
  suaCoQuan: (param) => {
    return apiPostAuth(apiUrl.suacoquan, {
      ...param,
    });
  },
  xoaCoQuan: (param) => {
    return apiPostAuth(apiUrl.xoacoquan, param);
  },
  setSuDung: (param) => {
    return apiPostAuth(apiUrl.setSuDung, param);
  },
  AllCoQuan: () => {
    return apiGetAuth(apiUrl.getallcoquan);
  },
  ListByUser: () => {
    return apiGetAuth(apiUrl.listbyuser);
  },
  CheckMaCQ: (param) => {
    return apiGetAuth(apiUrl.checkmacq, {
      ...param,
    });
  },
};

export default api;
