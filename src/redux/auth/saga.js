import { all, takeEvery, put, fork, call } from "redux-saga/effects";
import { push } from "react-router-redux";
import {
  getToken,
  clearToken,
  getConfigValueByKey,
  getConfigLocal,
} from "../../helpers/utility";
import actions from "./actions";
import api from "../../containers/Page/config";
import { apiUrl } from "../../containers/Page/config";
import axios from "axios";
import { history } from "../store";
import { getLocalKey } from "../../helpers/utility";
export function* loginRequest() {
  yield takeEvery("LOGIN_REQUEST", function* ({ payload }) {
    try {
      const { data } = payload;
      if (data.Status > 0) {
        const user = data.User;
        let role = {};
        yield data.ListRole.forEach((value) => {
          role[value.MaChucNang] = {
            view: value.Xem,
            add: value.Them,
            edit: value.Sua,
            delete: value.Xoa,
          };
        });
        //get data config

        const ListConfig = yield axios.get(apiUrl.listconfig, {
          params: { PageSize: 999 },
          headers: {
            Authorization: `Bearer ${user.Token}`,
          },
        });
        let dataConfig = {};
        if (ListConfig.data.Status > 0) {
          const ListDataConfig = ListConfig.data.Data;
          const pageSize = getConfigValueByKey(ListDataConfig, "PAGE_SIZE", 20);
          const fileLimit = getConfigValueByKey(
            ListDataConfig,
            "FILE_LIMIT",
            10
          );
          const THANHTRATINH_IDS = getConfigValueByKey(
            ListDataConfig,
            "THANHTRATINH_IDS",
            0
          );
          const ACCEPT_FILE_UPLOAD_2 = getConfigValueByKey(
            ListDataConfig,
            "ACCEPT_FILE_UPLOAD_2",
            ""
          );
          const AcceptFileUpload = getConfigValueByKey(
            ListDataConfig,
            "AcceptFileUpload",
            "pdf"
          );
          const namTrienKhai = getConfigValueByKey(
            ListDataConfig,
            "namTrienKhai",
            new Date().getFullYear()
          );
          const tenDonVi = getConfigValueByKey(
            ListDataConfig,
            "Ten_Don_Vi",
            ""
          );
          const tinhTrienKhai = getConfigValueByKey(
            ListDataConfig,
            "TINH_TRIEN_KHAI",
            ""
          );
          const DanToc = getConfigValueByKey(ListDataConfig, "DanToc", "");
          const QuocTich = getConfigValueByKey(ListDataConfig, "QuocTich", "");
          const NamThanhtra = getConfigValueByKey(
            ListDataConfig,
            "NAMTHANHTRA",
            ""
          );
          const SONGAYSAURS = getConfigValueByKey(
            ListDataConfig,
            "SONGAYSAURS",
            ""
          );
          //
          dataConfig = {
            pageSize,
            fileLimit,
            THANHTRATINH_IDS,
            namTrienKhai,
            tenDonVi,
            tinhTrienKhai,
            DanToc,
            QuocTich,
            isIframe: payload.data?.isIframe,
            HrefLink: payload.data?.HrefLink,
            NamThanhtra,
            SONGAYSAURS,
            AcceptFileUpload,
            ACCEPT_FILE_UPLOAD_2,
          };
        }
        yield put({
          type: actions.LOGIN_SUCCESS,
          user,
          role,
          dataConfig,
        });
      }
    } catch (e) {}
  });
}

export function* loginSuccess() {
  yield takeEvery(actions.LOGIN_SUCCESS, function* (payload) {
    yield localStorage.setItem("user_id", payload.user.NguoiDungID);
    yield localStorage.setItem("access_token", payload.user.Token);
    yield localStorage.setItem("role", JSON.stringify(payload.role));
    yield localStorage.setItem("user", JSON.stringify(payload.user));
    yield localStorage.setItem(
      "data_config",
      JSON.stringify(payload.dataConfig)
    );
  });
}

export function* loginError() {
  yield takeEvery(actions.LOGIN_ERROR, function* () {});
}

const logoutSSO = async () => {
  const id_token_hint = getLocalKey("user", {})?.id_token;
  const post_logout_redirect_uri = await api.getDataConfig({
    ConfigKey: "SSO_LOGOUT_POST",
  });
  const SSO_LOGOUT_URL = await api.getDataConfig({
    ConfigKey: "SSO_LOGOUT_URL",
  });
  if (
    SSO_LOGOUT_URL.data.Status > 0 &&
    post_logout_redirect_uri.data.Status > 0 &&
    id_token_hint
  ) {
    const params = {
      id_token_hint,
      post_logout_redirect_uri: post_logout_redirect_uri.data.Data.ConfigValue,
    };
    const url = SSO_LOGOUT_URL.data.Data.ConfigValue;
    let queryString = Object.keys(params)
      .reduce((result, current) => {
        return (result += `${current}=${params[current]}&`);
      }, "")
      .slice(0, -1);
    // location.replace(`${url}?${queryString}`);
  }
};

export function* logout() {
  yield takeEvery(actions.LOGOUT, function* () {
    // logoutSSO();
    clearToken();
    const id_token_hint = getLocalKey("user", {})?.id_token;
    if (!id_token_hint) {
      yield put(push("/"));
    }
  });
}

export function* checkAuthorization(key) {
  yield takeEvery(actions.CHECK_AUTHORIZATION, function* () {
    const userId = getToken().get("userId");
    const accessToken = getToken().get("accessToken");
    if (userId && accessToken) {
      const param = { NguoiDungID: userId, Token: accessToken };
      const response = yield call(api.chiTiet, param);
      if (response.data.Status > 0) {
        let user = response.data.User;
        user = { ...user, Token: accessToken };
        let role = {};
        yield response.data.ListRole.forEach((value) => {
          role[value.MaChucNang] = {
            view: value.Xem,
            add: value.Them,
            edit: value.Sua,
            delete: value.Xoa,
          };
        });
        //get data config
        const ListConfig = yield axios.get(apiUrl.listconfig, {
          params: { PageSize: 999 },
          headers: {
            Authorization: `Bearer ${user.Token}`,
          },
        });
        let dataConfig = {};
        if (ListConfig.data.Status > 0) {
          const ListDataConfig = ListConfig.data.Data;
          const pageSize = getConfigValueByKey(ListDataConfig, "PAGE_SIZE", 20);
          const fileLimit = getConfigValueByKey(
            ListDataConfig,
            "FILE_LIMIT",
            10
          );
          const tenDonVi = getConfigValueByKey(
            ListDataConfig,
            "TEN_DON_VI",
            ""
          );
          const tinhTrienKhai = getConfigValueByKey(
            ListDataConfig,
            "TINH_TRIEN_KHAI",
            ""
          );
          const THANHTRATINH_IDS = getConfigValueByKey(
            ListDataConfig,
            "THANHTRATINH_IDS",
            0
          );
          const isIframe = JSON.parse(localStorage.getItem("data_config"))
            ?.isIframe
            ? JSON.parse(localStorage.getItem("data_config")).isIframe
            : false;
          const HrefLink = JSON.parse(localStorage.getItem("data_config"))
            ?.HrefLink
            ? JSON.parse(localStorage.getItem("data_config")).HrefLink
            : "";
          const DanToc = getConfigValueByKey(ListDataConfig, "DanToc", "");
          const QuocTich = getConfigValueByKey(ListDataConfig, "QuocTich", "");
          const NamThanhtra = getConfigValueByKey(
            ListDataConfig,
            "NAMTHANHTRA",
            ""
          );
          const ACCEPT_FILE_UPLOAD_2 = getConfigValueByKey(
            ListDataConfig,
            "ACCEPT_FILE_UPLOAD_2",
            ""
          );
          const AcceptFileUpload = getConfigValueByKey(
            ListDataConfig,
            "AcceptFileUpload",
            "pdf"
          );
          const SONGAYSAURS = getConfigValueByKey(
            ListDataConfig,
            "SONGAYSAURS",
            ""
          );
          //
          dataConfig = {
            pageSize,
            fileLimit,
            tenDonVi,
            DanToc,
            QuocTich,
            tinhTrienKhai,
            THANHTRATINH_IDS,
            isIframe,
            HrefLink,
            NamThanhtra,
            SONGAYSAURS,
            AcceptFileUpload,
            ACCEPT_FILE_UPLOAD_2,
          };
        }
        yield put({
          type: actions.LOGIN_SUCCESS,
          profile: "Profile",
          user,
          role,
          dataConfig,
        });
      } else {
        clearToken();
        yield put(push("/"));
      }
    } else {
      clearToken();
      if (window.location.pathname !== "/quen-mat-khau") {
        yield put(push("/"));
      }
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(checkAuthorization),
    fork(loginRequest),
    fork(loginSuccess),
    fork(loginError),
    fork(logout),
  ]);
}
