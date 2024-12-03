import {apiGetAuth, apiPostAuth, apiGet} from '../../../../api';
import server from '../../../../settings';
import {getDefaultPageSize} from '../../../../helpers/utility';

export const apiUrl = {
  chitietdonthu: server.v2Url + 'ChiTietDonThu/GetChiTietDonThu',
  getalldanhmuctenfile: server.v2Url + 'ChiTietDonThu/DanhMucTenFile',
  getalldanhmucloaikhieuto: server.v2Url + 'ChiTietDonThu/DanhMucLoaiKhieuTo',
};
const api = {
  ChiTietDonThu: (param) => {
    return apiGetAuth(apiUrl.chitietdonthu, {
      ...param,
    });
  },
  GetAllDanhMucTenFile: (param) => {
    return apiGetAuth(apiUrl.getalldanhmuctenfile, {
      ...param,
    });
  },
  GetAllDanhMucLoaiKhieuTo: (param) => {
    return apiGetAuth(apiUrl.getalldanhmucloaikhieuto, {
      ...param,
    });
  },
};

export default api;
