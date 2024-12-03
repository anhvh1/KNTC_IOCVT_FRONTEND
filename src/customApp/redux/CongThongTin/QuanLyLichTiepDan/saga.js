import {all, takeEvery, put, call} from 'redux-saga/effects';
import api from '../../../containers/CongThongTin/QuanLyLichTiepDan/config';
import actions from './actions';
function* getInit({payload}) {
  try {
    const response = yield call(api.GetAllCoQuan, payload.filterData);
    yield put({
      type: actions.QLLICHTIEPDAN_GET_INIT_REQUEST_SUCCESS,
      payload: {
        DanhSachCoQuan: response.data.Data,
      },
    });
  } catch (e) {
    yield put({
      type: actions.QLLICHTIEPDAN_GET_INIT_REQUEST_ERROR,
    });
  }
}
function* getList({payload}) {
  try {
    const response = yield call(api.LichTiepDan, payload.filterData);
    yield put({
      type: actions.QLLICHTIEPDAN_GET_LIST_REQUEST_SUCCESS,
      payload: {
        DanhSachLichTiepDan: response.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.QLLICHTIEPDAN_GET_LIST_REQUEST_ERROR,
    });
  }
}
export default function* rootSaga() {
  yield all([yield takeEvery(actions.QLLICHTIEPDAN_GET_LIST_REQUEST, getList)]);
  yield all([yield takeEvery(actions.QLLICHTIEPDAN_GET_INIT_REQUEST, getInit)]);
}
