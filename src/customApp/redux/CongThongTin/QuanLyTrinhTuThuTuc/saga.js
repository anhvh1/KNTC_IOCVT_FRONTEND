import {all, takeEvery, put, call} from 'redux-saga/effects';
import api from '../../../containers/CongThongTin/QuanLyTrinhTuThuTuc/config';
import actions from './actions';
function* getList({payload}) {
  try {
    const response = yield call(api.TrinhTuThuTuc, payload.filterData);
    yield put({
      type: actions.QLTRINHTUTHUTUC_GET_LIST_REQUEST_SUCCESS,
      payload: {
        DanhSachTrinhTuThuTuc: response.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.QLTRINHTUTHUTUC_GET_LIST_REQUEST_ERROR,
    });
  }
}
export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.QLTRINHTUTHUTUC_GET_LIST_REQUEST, getList),
  ]);
}
