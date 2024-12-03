import {
  apiGetAuth,
  apiPostAuth,
  apiPutAuth,
  apiDeleteAuth,
} from '../../../../api';
import server from '../../../../settings';
import {getDefaultPageSize} from '../../../../helpers/utility';

export const apiUrl = {
  danhsachdanhmucchung: server.v2Url + 'DanhMucChung/GetList',
  exportexcel: server.v2Url + 'BaoCao/KQGQ01_Excel',
  danhmucchucvu: '',
};
const api = {
  DanhSachDanhMucChung: (param) => {
    return apiGetAuth(apiUrl.danhsachdanhmucchung, {
      ...param,
    });
  },
};

export default api;
