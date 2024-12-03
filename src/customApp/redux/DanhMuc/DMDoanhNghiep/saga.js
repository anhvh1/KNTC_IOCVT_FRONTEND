
import { all, takeEvery, put, call } from 'redux-saga/effects';
import api from "../../../containers/DanhMuc/DMDoanhNghiep/config";
import actions from './actions';

function* getInitData({ payload }) {
  try {
    const response = yield call(api.danhSachDoanhNghiep, payload.filterData);
    console.log("DanhSachDoanhNghiep:", response.data.Data);

    yield put({
      type: actions.DOANHNGHIEP_GET_INIT_DATA_REQUEST_SUCCESS,
      payload: {
        DanhSachDoanhNghiep: response.data.Data,
        // AllHuongDan: responseAll.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.DOANHNGHIEP_GET_INIT_DATA_REQUEST_ERROR,
    });
  }
}

function* getList({ payload }) {
  try {
    const response = yield call(api.danhSachDoanhNghiep, payload.filterData);
    // const responseAll = yield call(api.danhSachHuongDan, {
    //   PageNumber: 1,
    //   PageSize: 1000,
    // });
    console.log("DanhSachDoanhNghiep:", response.data.Data);
    yield put({
      type: actions.DOANHNGHIEP_GET_LIST_REQUEST_SUCCESS,
      payload: {
        DanhSachDoanhNghiep: response.data.Data,
        // AllHuongDan: responseAll.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.DOANHNGHIEP_GET_LIST_REQUEST_ERROR,
    });
  }
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.DOANHNGHIEP_GET_INIT_DATA_REQUEST, getInitData),
  ]);
  yield all([yield takeEvery(actions.DOANHNGHIEP_GET_LIST_REQUEST, getList)]);
}
