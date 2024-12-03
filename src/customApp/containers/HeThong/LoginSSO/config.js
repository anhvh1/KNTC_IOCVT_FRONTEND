import {
  apiGet,
  apiGetAuth,
  apiGetUser,
  apiPost,
  apiGetToken,
} from '../../../../api';
import server from '../../../../settings';
import {getDefaultPageSize} from '../../../../helpers/utility';

export const apiUrl = {
  dangnhap: server.v2Url + 'Nguoidung/DangNhap',
  dangnhapsso: server.v2Url + 'LoginSSO/Login',
  chitiet: server.v2Url + 'HeThongNguoiDung/GetByIDForPhanQuyen',
  getdataconfig: server.v2Url + 'SystemConfig/GetByKey',
  listconfig: server.v2Url + 'SystemConfig/GetListPaging',
  sso_authorize: 'https://lgsp-sso.vinhphuc.gov.vn/oauth2/authorize',
  sso_gettoken: 'https://lgsp-sso.vinhphuc.gov.vn/oauth2/token',
  sso_getinfouser: 'https://lgsp-sso.vinhphuc.gov.vn/oauth2/userinfo',
};

const api = {
  dangNhap: (param) => {
    return apiPost(apiUrl.dangnhap, {
      ...param,
    });
  },
  dangNhapSSO: (param) => {
    return apiPost(apiUrl.dangnhapsso, {
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
    return apiGetToken(apiUrl.listconfig, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  getToken_SSO: (param) => {
    return apiPost(apiUrl.sso_gettoken, param, {
      'Content-Type': 'application/x-www-form-urlencoded',
    });
  },
  getInfoUser_SSO: (param) => {
    return apiPost(
      apiUrl.sso_getinfouser,
      param,
      // {
      //     "Content-Type": "application/x-www-form-urlencoded",
      //     Accept: "application/x-www-form-urlencoded",
      //     Accept: "application/json",
      // }
    );
  },
};

export default api;
