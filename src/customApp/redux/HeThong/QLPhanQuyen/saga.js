import {all, takeEvery, put, call} from "redux-saga/effects";
import api from "../../../containers/HeThong/QLPhanQuyen/config";
import actions from "./actions";

function* getInitData() {
  try {
    const responseCanBo = yield call(api.danhSachCanBo, {PageSize: 9999});
    yield put({
      type: actions.PHANQUYEN_GET_INIT_DATA_REQUEST_SUCCESS,
      payload: {
        DanhSachCanBo: responseCanBo.data.Data
      }
    });
  } catch (e) {
    yield put({
      type: actions.PHANQUYEN_GET_INIT_DATA_REQUEST_ERROR
    });
  }
}

function* getList({payload}) {
  try {
    const response = yield call(api.danhSachNhom, payload.filterData);
    yield put({
      type: actions.PHANQUYEN_GET_LIST_REQUEST_SUCCESS,
      payload: {
        DanhSachNhom: response.data.Data,
        TotalRow: response.data.TotalRow
      }
    });
  } catch (e) {
    yield put({
      type: actions.PHANQUYEN_GET_LIST_REQUEST_ERROR
    });
  }
}

export default function* rootSaga() {
  yield all([yield takeEvery(actions.PHANQUYEN_GET_INIT_DATA_REQUEST, getInitData)]);
  yield all([yield takeEvery(actions.PHANQUYEN_GET_LIST_REQUEST, getList)]);
}
