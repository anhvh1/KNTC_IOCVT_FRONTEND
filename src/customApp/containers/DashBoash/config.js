import {apiGetAuth, apiPostAuth} from '../../../api';
import server from '../../../settings';

const apiUrl = {
  danhsachdata: server.v2Url + 'DashBoard/GetDanhSachData',
  getcoquanbyphamviid: server.v2Url + 'DashBoard/GetCoQuanByPhamViID',
  danhsachcanhbao: server.v2Url + 'DashBoard/GetDanhSachData',
  getallloaikhieuto: server.v2Url + 'TiepDan/DanhMucLoaiKhieuTo',
  danhsachphanloaivuviec: server.v2Url + 'DashBoard/GetDanhSachData',
  danhsachcanhbaov2: server.v2Url + 'DashBoard/LayDanhSachCanhBao',
  exportdata: server.v2Url + 'BaoCao/BaoCaoThongKe_Excel',
};
const api = {
  DanhSachData: (params) => {
    return apiGetAuth(apiUrl.danhsachdata, {
      ...params,
    });
  },
  DanhSachCanhBaoV2: (params) => {
    return apiGetAuth(apiUrl.danhsachcanhbaov2, {
      ...params,
    });
  },
  GetCoQuanByPhamViID: (params) => {
    return apiGetAuth(apiUrl.getcoquanbyphamviid, {
      ...params,
    });
  },
  DanhSachCanhBao: (params) => {
    return apiGetAuth(apiUrl.danhsachcanhbao, {
      ...params,
    });
  },
  DanhSachPhanLoaiVuViec: (params) => {
    return apiGetAuth(apiUrl.danhsachphanloaivuviec, {
      ...params,
    });
  },
  GetAllDanhMucLoaiKhieuTo: (params) => {
    return apiGetAuth(apiUrl.getallloaikhieuto, {...params});
  },
  ExportData: (params) => {
    return apiGetAuth(apiUrl.exportdata, {...params, Type: 8});
  },
};

export default api;
