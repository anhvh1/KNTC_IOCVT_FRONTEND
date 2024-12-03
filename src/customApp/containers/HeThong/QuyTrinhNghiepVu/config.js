import {apiGetAuth, apiPostAuth} from '../../../../api';
import server from '../../../../settings';
import {getDefaultPageSize} from '../../../../helpers/utility';

const apiUrl = {
  getallcap: server.v2Url + 'QuanLyQuyTrinhNghiepVu/GetAllCap',
  getcoquanbycap: server.v2Url + 'QuanLyQuyTrinhNghiepVu/GetCoQuanByCap',
  getquytrinhbycap: server.v2Url + 'QuanLyQuyTrinhNghiepVu/GetQuyTrinhByCap',
  luuquytrinh: server.v2Url + 'QuanLyQuyTrinhNghiepVu/Save',
};
const api = {
  GetAllCap: (param) => {
    return apiGetAuth(apiUrl.getallcap, {
      ...param,
    });
  },
  GetCoQuanByCap: (params) => {
    return apiGetAuth(apiUrl.getcoquanbycap, {
      ...params,
    });
  },
  GetQuyTrinhByCap: (param) => {
    return apiGetAuth(apiUrl.getquytrinhbycap, {
      ...param,
    });
  },
  SaveQuyTrinh: (param) => {
    return apiPostAuth(apiUrl.luuquytrinh, {
      ...param,
    });
  },
};
export {apiUrl};
export default api;
