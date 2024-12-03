import {apiGetAuth, apiPostAuth} from '../../../../api';
import server from '../../../../settings';
import {getDefaultPageSize} from '../../../../helpers/utility';

const apiUrl = {
  changeprogress: server.v2Url + 'DanhMucCoQuanDonVi/UpdateQuyTrinh',
  getbyid: server.v2Url + 'DanhMucCoQuanDonVi/GetByID',
};
const api = {
  ChangeProgress: (param) => {
    return apiPostAuth(apiUrl.changeprogress, {
      ...param,
    });
  },
  GetByID: (param) => {
    return apiGetAuth(apiUrl.getbyid, {
      ...param,
    });
  },
};

export default api;
