import {apiGetAuth, apiPostAuth} from '../../../../api';
import server from '../../../../settings';
import {getDefaultPageSize} from '../../../../helpers/utility';

const apiUrl = {
  listusermanagement: server.v2Url + 'HeThongCanBo/GetListPaging',
  edituser: server.v2Url + 'hethongcanbo/Update',
  deleteuser: server.v2Url + 'hethongcanbo/Delete',
  adduser: server.v2Url + 'hethongcanbo/insert',
  detailsUser: server.v2Url + 'hethongcanbo/GetByID',
  // themuser: server.v2Url + 'hethongcanbo/insert',
  // suauser: server.v2Url + 'hethongcanbo/Update',
  // xoauser: server.v2Url + 'hethongcanbo/Delete',
  resetmk: server.v2Url + 'hethongcanbo/ResetPassword',
  taifilemau: server.v2Url + 'hethongcanbo/DowloadExel',
  importfile: server.v2Url + 'hethongcanbo/ReadExcelFile',
  getAlluser: server.v2Url + 'hethongcanbo/GetAllVaiTro',
  resetpassword: server.v2Url + 'hethongnguoidung/ResetPassword',
};
const api = {
  GetListUserManagement: (param) => {
    return apiGetAuth(apiUrl.listusermanagement, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
      // LoaiDanhMuc: 6
    });
  },
  EditUser: (params) => {
    return apiPostAuth(apiUrl.edituser, {...params});
  },
  DeleteUser: (params) => {
    return apiPostAuth(apiUrl.deleteuser, {...params});
  },
  AddUser: (params) => {
    return apiPostAuth(apiUrl.adduser, {...params});
  },
  DetailsUser: (params) => {
    return apiGetAuth(apiUrl.detailsUser, {...params});
  },
  ResetPassword: (params) => {
    return apiGetAuth(apiUrl.resetpassword, {...params});
  },
};

export default api;
