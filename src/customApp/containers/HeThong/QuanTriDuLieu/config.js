import {apiGet, apiPostAuth, apiGetAuth} from '../../../../api';
import server from '../../../../settings';
import {getDefaultPageSize} from '../../../../helpers/utility';

const apiUrl = {
  danhsachnhatky: server.v2Url + 'SystemLog/GetPagingByQuanTriDuLieu',
  danhsachfilephuchoi: server.v2Url + 'QuanTriDuLieu/GetFileInDerectory',
  saoluu: server.v2Url + 'QuanTriDuLieu/BackupDatabase',
  phuchoi: server.v2Url + 'QuanTriDuLieu/RestoreDatabase',
};
const api = {
  getUnit: (param) => {
    return apiGetAuth(apiUrl.danhsachnhatky, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  getFilePhucHoi: () => {
    return apiGetAuth(apiUrl.danhsachfilephuchoi);
  },
  saoLuu: (param) => {
    return apiGetAuth(apiUrl.saoluu, {...param});
  },
  phucHoi: (param) => {
    return apiGetAuth(apiUrl.phuchoi, {...param});
  },
};

export default api;
