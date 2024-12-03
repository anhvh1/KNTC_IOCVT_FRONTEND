import {apiGetAuth, apiPostAuth} from '../../../../api';
import server from '../../../../settings';
import {getDefaultPageSize} from '../../../../helpers/utility';

export const apiUrl = {
  // thongtinbaocao: server.v2Url + 'BaoCao/TTR01',
};
const api = {
  ThongTinBaoCao: (param) => {
    return apiGetAuth(apiUrl.thongtinbaocao, {
      ...param,
    });
  },
};

export default api;
