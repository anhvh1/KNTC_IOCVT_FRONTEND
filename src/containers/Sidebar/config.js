import {apiGetAuth, apiPostAuth} from '../../api';
import server from '../../settings';
import {getDefaultPageSize} from '../../helpers/utility';

const apiUrl = {
  // getnotifications: server.v2Url + 'NhacViec/GetViecLam',
  danhsachhuongdan: server.v2Url + 'HuongDanSuDung/GetAll',
  changepassword: server.v2Url + 'Hethongnguoidung/ChangePassword',
  getlistchucnang: server.v2Url + 'ChucNang/GetListMenu',
};
const api = {
  getListChucNang: (param) => {
    return apiGetAuth(apiUrl.getlistchucnang, {...param});
  },
};

export default api;
