import { all, takeEvery, put, call } from "redux-saga/effects";
import api from "../../../containers/NghiepVu/BanHanhKeHoachTTKT/config";
import actions from "./actions";

function* getInitData({ payload }) {
  try {
    const response = yield call(api.danhSachBanHanh, payload.filterData);

    yield put({
      type: actions.BANHANH_GET_INIT_DATA_REQUEST_SUCCESS,
      payload: {
        DanhSachBanHanh: response.data.Data,

        // AllHuongDan: responseAll.data.Data,
        TotalRow: response.data.TotalRow,
        TotalUnit: response.data.Data.TotalUnit,
      },
    });
  } catch (e) {
    console.log(e, "error");
    yield put({
      type: actions.BANHANH_GET_INIT_DATA_REQUEST_ERROR,
    });
  }
}

function* getList({ payload }) {
  try {
    const response = yield call(api.danhSachBanHanh, {
      ...payload.filterData,
      PageSize: 99999,
    });
    const responseAll = yield call(api.danhSachBanHanh, {
      ...payload.filterData,
      DoiTuongTT: 0,
    });
    // const responseAll = yield call(api.danhSachHuongDan, {
    //   PageNumber: 1,
    //   PageSize: 1000,
    // });
    yield put({
      type: actions.BANHANH_GET_LIST_REQUEST_SUCCESS,
      payload: {
        DanhSachBanHanh: response.data.Data,
        DanhSachBanHanhAll: responseAll.data.Data,
        TotalUnit: response.data.Data.TotalUnit,
        // AllHuongDan: responseAll.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.BANHANH_GET_LIST_REQUEST_ERROR,
    });
  }
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.BANHANH_GET_INIT_DATA_REQUEST, getInitData),
  ]);
  yield all([yield takeEvery(actions.BANHANH_GET_LIST_REQUEST, getList)]);
}
