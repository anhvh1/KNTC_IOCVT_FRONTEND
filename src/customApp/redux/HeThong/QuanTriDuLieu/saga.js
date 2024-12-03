import {all, takeEvery, put, call} from 'redux-saga/effects';
import api from '../../containers/QuanTriDuLieu/config';
import actions from './actions';

function* getInitData({payload}) {
  try {
    const response = yield call(api.getUnit, payload.filterData);
    const danhsachphuchoi = yield call(api.getFilePhucHoi);
    yield put({
      type: actions.SAOLUU_GET_INIT_DATA_REQUEST_SUCCESS,
      payload: {
        LichSuSaoLuu: response.data.Data,
        DanhSachPhucHoi: danhsachphuchoi.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.SAOLUU_GET_INIT_DATA_REQUEST_ERROR,
    });
  }
}

function* getList({payload}) {
  try {
    const response = yield call(api.getUnit, payload.filterData);
    const danhsachphuchoi = yield call(api.getFilePhucHoi);
    yield put({
      type: actions.SAOLUU_GET_LIST_REQUEST_SUCCESS,
      payload: {
        LichSuSaoLuu: response.data.Data,
        DanhSachPhucHoi: danhsachphuchoi.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.SAOLUU_GET_LIST_REQUEST_ERROR,
    });
  }
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.SAOLUU_GET_INIT_DATA_REQUEST, getInitData),
  ]);
  yield all([yield takeEvery(actions.SAOLUU_GET_LIST_REQUEST, getList)]);
}
