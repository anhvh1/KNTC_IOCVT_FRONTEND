import {apiGetAuth, apiPostAuth} from '../../api';
import server from '../../settings';
import {getDefaultPageSize} from '../../helpers/utility';

const apiUrl = {
  // getnotifications: server.v2Url + 'NhacViec/GetViecLam',
  danhsachhuongdan: server.v2Url + 'HuongDanSuDung/GetAll',
  changepassword: server.v2Url + 'Hethongnguoidung/ChangePassword',
  getlistchucnang: server.v2Url + 'ChucNang/GetListMenu',
  getbymachucnang: server.v2Url + 'HuongDanSuDung/GetByMaChucNang',
};
const api = {
  getListChucNang: (param) => {
    return apiGetAuth(apiUrl.getlistchucnang, {...param});
  },
  // getNotifications: (param) => {
  //   return apiGetAuth(apiUrl.getnotifications);
  // },
  danhSachHuongDan: (param) => {
    return apiGetAuth(apiUrl.danhsachhuongdan, {
      ...param,
      PageNumber: 1,
      PageSize: 1000,
    });
  },
  changePassword: (param) => {
    return apiPostAuth(apiUrl.changepassword, {...param});
  },
  GetByMaChucNang: (param) => {
    return apiGetAuth(apiUrl.getbymachucnang, {...param});
  },
};

export default api;
