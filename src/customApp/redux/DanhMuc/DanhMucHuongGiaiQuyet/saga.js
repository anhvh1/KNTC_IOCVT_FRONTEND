import { all, takeEvery, put, call } from "redux-saga/effects";
import api from "../../../containers/DanhMuc/DanhMucHuongGiaiQuyet/config";
import actions from "./action";
function* getList({ payload }) {
  try {
    const response = yield call(api.DanhSachHuongGiaiQuyet, payload.filterData);
    yield put({
      type: actions.DANHMUCHUONGGIAIQUYET_GET_LIST_REQUEST_SUCCESS,
      payload: {
        DanhSachHuongGiaiQuyet: response.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.DANHMUCHUONGGIAIQUYET_GET_LIST_REQUEST_ERROR,
    });
  }
}
export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.DANHMUCHUONGGIAIQUYET_GET_LIST_REQUEST, getList),
  ]);
}
