import {all, takeEvery, put, fork, call} from 'redux-saga/effects';
import api from "../../containers/Topbar/config";
// import apiKeKhai from "../../customApp/containers/KeKhaiTaiSan/config";

export function* getNotification() {
  yield takeEvery("GET_NOTIFICATION_REQUEST_TO_APP_SAGA", function* () {
    // const response = yield call(api.getNotifications);
    // if (response.data.Status && response.data.Status > 0) {
    //   yield put({
    //     type: "GET_NOTIFICATION_SUCCESS",
    //     notifications: response.data.Data,
    //   });
    // }
  });
}

export function* getHuongDan() {
  yield takeEvery("GET_HUONGDAN_REQUEST_TO_APP_SAGA", function* () {
    const response = yield call(api.danhSachHuongDan);
    if (response.data.Status && response.data.Status > 0) {
      const listMaChucNangHuongDan = response.data.Data.map(item => {
        return {
          MaChucNang: item.MaChucNang, HuongDanSuDungID: item.HuongDanSuDungID
        }
      });
      localStorage.setItem('danhsachhuongdan', JSON.stringify(listMaChucNangHuongDan));
    }
  });
}

export function* CheckKeKhai() {
  yield takeEvery("CHECK_KE_KHAI", function* () {
    // const checkkekhai = yield call(apiKeKhai.CheckKeKhai);
    // if (checkkekhai.data.Status && checkkekhai.data.Status > 0) {
    //   yield put({
    //     type: "CHECK_KE_KHAI_SUCCESS",
    //     CheckKeKhai: checkkekhai.data.Data
    //   });
    // }
  });
}

export default function* rootSaga() {
  yield all([
    fork(getNotification),
    fork(getHuongDan),
    fork(CheckKeKhai)
  ]);
}
