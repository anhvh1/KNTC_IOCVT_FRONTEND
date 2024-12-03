import {apiGet, apiGetAuth, apiGetUser, apiPost, apiGetToken} from '../../api';
import server from '../../settings';
import {getDefaultPageSize} from '../../helpers/utility';
const apiUrl = {
  dangnhap: server.v2Url + 'Nguoidung/DangNhap',
  chitiet: server.v2Url + 'HeThongNguoiDung/GetByIDForPhanQuyen',
  getdataconfig: server.v2Url + 'SystemConfig/GetByKey',
  listconfig: server.v2Url + 'SystemConfig/GetListPaging',
};
const api = {
  dangNhap: (param) => {
    return apiPost(apiUrl.dangnhap, {
      ...param,
    });
  },
  chiTiet: (param) => {
    return apiGetUser(apiUrl.chitiet, {
      ...param,
    });
  },
  getDataConfig: (param) => {
    return apiGetToken(apiUrl.getdataconfig, {...param});
  },
  getListConfig: (param) => {
    return apiGetToken(
      apiUrl.listconfig,
      {
        ...param,
        PageNumber: param.PageNumber ? param.PageNumber : 1,
        PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
      },
      {
        Authorization: `Bearer ${param.Token}`,
      },
    );
  },
};
export {apiUrl};
export default api;
