import {all, takeEvery, put, call} from 'redux-saga/effects';
import api from '../../../containers/HeThong/NhatKyHeThong/config';
import actions from './actions';

function* getList({payload}) {
  try {
    const response = yield call(api.SystemLog, payload.filter);
    const responseAll = yield call(api.SystemLog, {
      ...payload.filter,
      PageSize: 9999,
      PageNumber: 1,
    });
    yield put({
      type: actions.NHATKYHETHONG_GET_LIST_REQUEST_SUCCESS,
      payload: {
        NhatKyHeThong: response.data.Data,
        NhatKyHeThongAll: responseAll.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.NHATKYHETHONG_GET_LIST_REQUEST_ERROR,
    });
  }
}

export default function* rootSaga() {
  yield all([yield takeEvery(actions.NHATKYHETHONG_GET_LIST_REQUEST, getList)]);
}
