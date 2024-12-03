import { apiGetAuth, apiPostAuth } from "../../../../api";
import server from "../../../../settings";
import { getDefaultPageSize } from "../../../../helpers/utility";

const apiUrl = {
  //'HeThongCanBo
  listusermanagement: server.v2Url + "HeThongCanBo/GetListPaging",
  edituser: server.v2Url + "HeThongCanBo/Update",
  deleteuser: server.v2Url + "HeThongCanBo/Delete",
  adduser: server.v2Url + "HeThongCanBo/insert",
  detailsUser: server.v2Url + "HeThongCanBo/GetByID",
  resetmk: server.v2Url + "HeThongCanBo/ResetPassword",
  taifilemau: server.v2Url + "HeThongCanBo/DowloadExel",
  importfile: server.v2Url + "HeThongCanBo/ReadExcelFile",
  getAlluser: server.v2Url + "HeThongCanBo/GetAllVaiTro",
  resetpassword: server.v2Url + "HeThongNguoiDung/ResetPassword",
  allchucvu: server.v2Url + "ChucVu/GetListPaging",
  allcoquan: server.v2Url + "CoQuan/GetAllCoQuanSuDungPM",
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
    return apiPostAuth(apiUrl.edituser, { ...params });
  },
  DeleteUser: (params) => {
    return apiPostAuth(apiUrl.deleteuser, { ...params });
  },
  AddUser: (params) => {
    return apiPostAuth(apiUrl.adduser, { ...params });
  },
  DetailsUser: (params) => {
    return apiGetAuth(apiUrl.detailsUser, { ...params });
  },
  ResetPassword: (params) => {
    return apiGetAuth(apiUrl.resetpassword, { ...params });
  },
  GetAllChucVu: (params) => {
    return apiGetAuth(apiUrl.allchucvu, { ...params });
  },
  GetAllCoQuan: (params) => {
    return apiGetAuth(apiUrl.allcoquan, { ...params });
  },
};

export default api;
