import {
  apiPostAuth,
  apiGetAuth,
  apiGet,
  apiPost,
  apiGetToken,
} from '../../../../api';
import server from '../../../../settings';
import {getDefaultPageSize} from '../../../../helpers/utility';

const apiUrl = {
  chitietthisinh: server.v2Url + 'QuanLyThiSinh/GetByID',
  tracuuquyetdinhgiaiquyet: server.v2Url + 'TraCuu/TraCuuQuyetDinhGiaiQuyet',
  tracuutrangthaixulyhoso: server.v2Url + 'TraCuu/TraCuuTrangThaiXuLyHoSo',
  getallcoquan: server.v2Url + 'TraCuu/GetAllCoQuan',
  chitietlichtiepdan: server.v2Url + 'LichTiepDan/GetByID',
  chitiettrinhtuthutuc: server.v2Url + 'TrinhTuThuTuc/GetByID',
  getdanhsachlichtiepdan: server.v2Url + 'LichTiepDan/XemLichTiepDan',
  gettrinhtuthutuc: server.v2Url + 'TrinhTuThuTuc/GetListPaging',
  chitietbanhanh: server.v2Url + 'BanHanhQuyetDinhGQ/GetByID',
  chitietdonthu2: server.v2Url + 'ChiTietDonThu/GetChiTietDonThu',
};
const api = {
  GetAllCoQuan: (params) => {
    return apiGetToken(apiUrl.getallcoquan);
  },
  GetDanhSachLichTiepDan: (params) => {
    return apiGetToken(apiUrl.getdanhsachlichtiepdan);
  },
  ChiTietDonThu2: (params) => {
    return apiGetToken(apiUrl.chitietdonthu2, {...params});
  },
  GetChiTietLichTiepDan: (params) => {
    return apiGetToken(apiUrl.chitietlichtiepdan, {...params});
  },
  GetTrinhTuThuTuc: (params) => {
    return apiGetToken(apiUrl.gettrinhtuthutuc);
  },
  GetChiTietTrinhTuThuTuc: (params) => {
    return apiGetToken(apiUrl.chitiettrinhtuthutuc, params);
  },
  ChiTietBanHanh: (param) => {
    return apiGetToken(apiUrl.chitietbanhanh, {
      ...param,
    });
  },
};

export {apiUrl};
export default api;
