import { all, takeEvery, put, call } from "redux-saga/effects";
import api from "../../../containers/DanhMuc/DMPhanLoaiThanhTraKiemTra/config";
import actions from "./actions";

function* getInitData({ payload }) {
  try {
    const response = yield call(api.DanhSachPhanLoai, payload.filterData);

    yield put({
      type: actions.PHANLOAI_GET_INIT_DATA_REQUEST_SUCCESS,
      payload: {
        DanhSachPhanLoai: response.data.Data,
        // AllHuongDan: responseAll.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    console.log(e, "error");
    yield put({
      type: actions.PHANLOAI_GET_INIT_DATA_REQUEST_ERROR,
    });
  }
}

function* getList({ payload }) {
  try {
    const response = yield call(api.DanhSachPhanLoai, payload.filterData);

    yield put({
      type: actions.PHANLOAI_GET_LIST_REQUEST_SUCCESS,
      payload: {
        DanhSachPhanLoai: response.data.Data,
        // AllHuongDan: responseAll.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    console.log(e, "error");
    yield put({
      type: actions.PHANLOAI_GET_LIST_REQUEST_ERROR,
    });
  }
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.PHANLOAI_GET_INIT_DATA_REQUEST, getInitData),
  ]);
  yield all([yield takeEvery(actions.PHANLOAI_GET_LIST_REQUEST, getList)]);
}
