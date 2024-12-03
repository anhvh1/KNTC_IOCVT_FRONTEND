import { all, takeEvery, put, call } from "redux-saga/effects";
import api from "../../../containers/HeThong/QLChucNang/config";
import actions from "./actions";
function* getListData(action) {
  try {
    const response = yield api.DanhSachChucNang(action.payload);
    yield put({
      type: actions.QLCHUCNANG_GET_LIST_SUCCESS,
      payload: {
        DanhSachChucNang: response.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.QLCHUCNANG_GET_LIST_ERROR,
    });
  }
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.QLCHUCNANG_GET_LIST_REQUEST, getListData),
  ]);
}
