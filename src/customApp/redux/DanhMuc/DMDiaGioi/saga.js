import {all, takeEvery, put, call} from 'redux-saga/effects';
import api from '../../../containers/DanhMuc/DMDiaGioi/config';
import actions from './actions';

function* getInitData({payload}) {
  try {
    const response = yield call(api.danhSachDiaGioi, payload.filterData);
    const DanhSachDiaGioi = yield response.data.Data.map((value, index) => {
      return {
        ...value,
        title: value.Ten,
        key: index.toString(),
        isLeaf: value.TotalChildren < 1,
      };
    });
    yield put({
      type: actions.DIAGIOI_GET_INIT_DATA_REQUEST_SUCCESS,
      payload: {
        DanhSachDiaGioi: DanhSachDiaGioi,
      },
    });
  } catch (e) {
    yield put({
      type: actions.DIAGIOI_GET_INIT_DATA_REQUEST_ERROR,
    });
  }
}

function* getList({payload}) {
  try {
    const response = yield call(api.danhSachDiaGioi, payload.filterData);
    const DanhSachDiaGioi = yield response.data.Data.map((value, index) => {
      return {
        ...value,
        title: value.Ten,
        key: index.toString(),
        isLeaf: value.TotalChildren < 1,
      };
    });
    yield put({
      type: actions.DIAGIOI_GET_LIST_REQUEST_SUCCESS,
      payload: {
        DanhSachDiaGioi: DanhSachDiaGioi,
      },
    });
  } catch (e) {
    yield put({
      type: actions.DIAGIOI_GET_LIST_REQUEST_ERROR,
    });
  }
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.DIAGIOI_GET_INIT_DATA_REQUEST, getInitData),
  ]);
  yield all([yield takeEvery(actions.DIAGIOI_GET_LIST_REQUEST, getList)]);
}
