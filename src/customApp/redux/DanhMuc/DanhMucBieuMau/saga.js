import {all, takeEvery, put, call} from 'redux-saga/effects';
import api from '../../../containers/DanhMuc/DanhMucBieuMau/config';
import actions from './actions';
function* getInit({payload}) {
  try {
    const response = yield call(api.DanhMucBieuMau, {
      ...payload.filterData,
      PageSize: 9999,
    });
    yield put({
      type: actions.DANHMUCBIEUMAU_GET_INIT_REQUEST_SUCCESS,
      payload: {
        DanhSachBieuMauAll: response.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.DANHMUCBIEUMAU_GET_INIT_REQUEST_ERROR,
    });
  }
}
function* getList({payload}) {
  try {
    const response = yield call(api.DanhMucBieuMau, payload.filterData);
    const responseAll = yield call(api.DanhMucBieuMau, {
      ...payload.filterData,
      PageSize: 9999,
      PageNumber: 1,
    });
    yield put({
      type: actions.DANHMUCBIEUMAU_GET_LIST_REQUEST_SUCCESS,
      payload: {
        DanhMucBieuMau: response.data.Data,
        DanhSachBieuMauAll: responseAll.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.DANHMUCBIEUMAU_GET_LIST_REQUEST_ERROR,
    });
  }
}
export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.DANHMUCBIEUMAU_GET_LIST_REQUEST, getList),
    yield takeEvery(actions.DANHMUCBIEUMAU_GET_INIT_REQUEST, getInit),
  ]);
}
