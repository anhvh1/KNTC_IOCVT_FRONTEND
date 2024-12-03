
import { all, takeEvery, put, call } from 'redux-saga/effects';
import api from '../../../containers/NghiepVu/TaoCuocTTKT/config';
import actions from './actions';

function* getInit({ payload }) {
  try {
    const response = yield call(api.GetListForm, payload.filterData);
    const responseFields = yield call(api.GetListField, payload.filterData);
    yield put({
      type: actions.TAOCUOC_GET_INIT_DATA_REQUEST_SUCCESS,
      payload: {
        ListHinhThuc: response.data.Data,
        ListFields: responseFields.data.Data,
        TotalRow: response.data.TotalRow,
        TotalUnit: response.data.Data.TotalUnit,
      },
    });
  } catch (e) {
    yield put({
      type: actions.TAOCUOC_GET_INIT_DATA_REQUEST_ERROR,
    });
  }
}

function* getList({ payload }) {
  try {
    const response = yield call(api.danhSachTaoCuoc,{...payload.filterData,PageSize: 99999,});
    // const responseAll = yield call(api.danhSachHuongDan, {
    //   PageNumber: 1,
    //   PageSize: 1000,
    // });
    yield put({
      type: actions.TAOCUOC_GET_LIST_REQUEST_SUCCESS,
      payload: {
        DanhSachTaoCuoc: response.data.Data,
        TotalUnit: response.data.Data.TotalUnit,
        // AllHuongDan: responseAll.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.TAOCUOC_GET_LIST_REQUEST_ERROR,
    });
  }
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.TAOCUOC_GET_INIT_DATA_REQUEST, getInit),
  ]);
  yield all([yield takeEvery(actions.TAOCUOC_GET_LIST_REQUEST, getList)]);
}
