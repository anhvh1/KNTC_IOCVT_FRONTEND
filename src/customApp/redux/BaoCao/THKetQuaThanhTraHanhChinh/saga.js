import { message } from "antd";
import { all, takeEvery, put, call } from "redux-saga/effects";
import api from "../../../containers/BaoCao/BCThanhTraHanhChinh/config";
import actions from "./action";

function* getBaoCaoTongHop({ payload }) {
  // try {
  //   const response = yield call(api.ThongTinBaoCao, payload.filterData);

  //   yield put({
  //     type: actions.TONGHOPKETQUATTHANHCHINH_INIT_REQUEST_SUCCESS,
  //     payload: {
  //       ThongTinBaoCao: response.data.Data,
  //       TotalRow: response.data.TotalRow,
  //     },
  //   });
  // } catch (e) {
  //   yield put({
  //     type: actions.TONGHOPKETQUATTHANHCHINH_INIT_REQUEST_ERROR,
  //   });
  // }
}

export default function* getThongTinBaoCao() {
  yield all([yield takeEvery(actions.TONGHOPKETQUATTHANHCHINH_INIT_REQUEST, getBaoCaoTongHop)]);
}
