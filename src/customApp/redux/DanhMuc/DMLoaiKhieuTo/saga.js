import {all, takeEvery, put, call} from 'redux-saga/effects';
import api from '../../../containers/DanhMuc/DMLoaiKhieuTo/config';
import actions from './actions';
import {formatDataTreeLoaiKhieuTo} from '../../../../helpers/utility';

function* getInitData({payload}) {
  try {
    //data co quan
    const response = yield call(api.danhSachCoQuan, payload.filterData);
    let resultData = {
      DanhSachLoaiKhieuTo: [],
      expandedKeys: [],
    };
    if (response.data.Data) {
      resultData = yield formatDataTreeLoaiKhieuTo(response.data.Data);
    }

    //return action
    yield put({
      type: actions.KHIEUTO_GET_INIT_DATA_REQUEST_SUCCESS,
      payload: {
        DanhSachLoaiKhieuTo: resultData.DanhSachLoaiKhieuTo,
        expandedKeys: resultData.expandedKeys,
      },
    });
  } catch (e) {
    yield put({
      type: actions.KHIEUTO_GET_INIT_DATA_REQUEST_ERROR,
    });
  }
}

function* getList({payload}) {
  try {
    const response = yield call(api.danhSachCoQuan, payload.filterData);
    const resultData = yield formatTreeDataKhieuTo(response.data.Data);
    yield put({
      type: actions.KHIEUTO_GET_LIST_REQUEST_SUCCESS,
      payload: {
        DanhSachLoaiKhieuTo: resultData.DanhSachLoaiKhieuTo,
        expandedKeys: resultData.expandedKeys,
      },
    });
  } catch (e) {
    yield put({
      type: actions.KHIEUTO_GET_LIST_REQUEST_ERROR,
    });
  }
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.KHIEUTO_GET_INIT_DATA_REQUEST, getInitData),
  ]);
  yield all([yield takeEvery(actions.KHIEUTO_GET_LIST_REQUEST, getList)]);
}
