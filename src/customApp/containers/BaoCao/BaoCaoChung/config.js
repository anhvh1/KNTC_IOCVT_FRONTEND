import {apiGetAuth, apiPostAuth} from '../../../../api';
import server from '../../../../settings';
import {getDefaultPageSize} from '../../../../helpers/utility';

export const apiUrl = {
  thongtinbaocao: server.v2Url + 'BaoCao/BaoCaoThongKe',
  danhsachcapbaocao: server.v2Url + 'BaoCao/GetListCap',
  chitietdonthu: server.v2Url + 'BaoCao/BaoCaoThongKe_DSChiTietDonThu',
  treeloaikhieuto: server.v2Url + 'BaoCao/DanhMucLoaiKhieuTo',
  danhsachdulieu: server.v2Url + 'BaoCao/GetPhamVi',
  getcoquanbydulieu: server.v2Url + 'BaoCao/GetCoQuanByPhamVi',
  danhsachcoquan: server.v2Url + 'BaoCao/GetDanhSachCoQuan',
  exportexcel: server.v2Url + 'BaoCao/BaoCaoThongKe_Excel',
  exportexceldanhsachdon: server.v2Url + 'BaoCao/DSChiTietDonThu_Excel',
  getmaxlevel: server.v2Url + 'BaoCao/GetCapBaoCao',
};
const api = {
  ThongTinBaoCao: (param) => {
    return apiGetAuth(apiUrl.thongtinbaocao, {
      ...param,
    });
  },
  getMaxLevel: (param) => {
    return apiGetAuth(apiUrl.getmaxlevel, {
      ...param,
    });
  },
  TreeLoaiKhieuTo: (param) => {
    return apiGetAuth(apiUrl.treeloaikhieuto, {
      ...param,
    });
  },
  SaveReport: (param) => {
    return apiPostAuth(apiUrl.savereport, {
      ...param,
    });
  },
  ExportExcel: (param) => {
    return apiGetAuth(apiUrl.exportexcel, {
      ...param,
    });
  },
  ExportExcelDanhSachDonThu: (param) => {
    return apiGetAuth(apiUrl.exportexceldanhsachdon, {
      ...param,
    });
  },
  DanhSachCoQuan: (params) => {
    return apiGetAuth(apiUrl.danhsachcoquan, {
      ...params,
    });
  },
  DanhSachCapBaoCao: (params) => {
    return apiGetAuth(apiUrl.danhsachcapbaocao, {
      ...params,
    });
  },
  DanhSachDuLieu: (params) => {
    return apiGetAuth(apiUrl.danhsachdulieu, {
      ...params,
    });
  },
  GetCoQuanByDuLieu: (params) => {
    return apiGetAuth(apiUrl.getcoquanbydulieu, {
      ...params,
    });
  },
  ChiTietDonThu: (params) => {
    return apiGetAuth(apiUrl.chitietdonthu, {
      ...params,
      PageNumber: params.PageNumber ? params.PageNumber : 1,
      PageSize: params.PageSize ? params.PageSize : getDefaultPageSize(),
    });
  },
};

export default api;
