import {all, takeEvery, put, call} from 'redux-saga/effects';
import api from '../../../containers/HeThong/QuanLyEmail/config';
import actions from './actions';
function* getList({payload}) {
  try {
    const response = yield call(api.DanhSachEmail, payload.filterData);
    yield put({
      type: actions.QUYETDINHGIAIQUYET_GET_LIST_REQUEST_SUCCESS,
      payload: {
        DanhSachQuyetDinhGiaiQuyet: response.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.QUYETDINHGIAIQUYET_GET_LIST_REQUEST_ERROR,
    });
  }
}

function* getInit({payload}) {
  try {
    const DanhSachLoaiEmail = yield call(
      api.DanhSachLoaiEmail,
      payload.filterData,
    );
    yield put({
      type: actions.QUANLYEMAIL_GET_INIT_REQUEST_SUCCESS,
      payload: {
        DanhSachLoaiEmail: DanhSachLoaiEmail.data.Data,
      },
    });
  } catch (e) {
    yield put({
      type: actions.QUANLYEMAIL_GET_INIT_REQUEST_ERROR,
    });
  }
}

export default function* rootSaga() {
  // yield all([yield takeEvery(actions.QUANLYEMAIL_GET_INIT_REQUEST, getInit)]);
  yield all([
    yield takeEvery(actions.QUYETDINHGIAIQUYET_GET_INIT_REQUEST, getList),
  ]);
}
