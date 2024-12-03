
import { all, takeEvery, put, call } from 'redux-saga/effects';
import api from "../../../containers/NghiepVu/QLDonDoc/config";
import actions from './actions';

function* getInitData({ payload }) {
  try {
    const response = yield call(api.DanhSachDonDoc, payload.filterData);
    yield put({
      type: actions.DONDOC_GET_INIT_DATA_REQUEST_SUCCESS,
      payload: {
        DanhSachDonDoc: response.data.Data,
        // AllHuongDan: responseAll.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.DONDOC_GET_INIT_DATA_REQUEST_ERROR,
    });
  }
}

function* getList({ payload }) {
  try {
    const response = yield call(api.DanhSachDonDoc, payload.filterData);
    // const responseAll = yield call(api.danhSachHuongDan, {
    //   PageNumber: 1,
    //   PageSize: 1000,
    // });
    yield put({
      type: actions.DONDOC_GET_LIST_REQUEST_SUCCESS,
      payload: {
        DanhSachDonDoc: response.data.Data,
        // AllHuongDan: responseAll.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.DONDOC_GET_LIST_REQUEST_ERROR,
    });
  }
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.DONDOC_GET_INIT_DATA_REQUEST, getInitData),
  ]);
  yield all([yield takeEvery(actions.DONDOC_GET_LIST_REQUEST, getList)]);
}
