import {all, takeEvery, put, call} from 'redux-saga/effects';
import api from '../../../containers/NghiepVu/QuanLyVuViecPhucTap/config';
import actions from './actions';
import dayjs from 'dayjs';

function* getInitData({payload}) {
  try {
    const response = yield call(api.GetAllDanhMucLoaiKhieuTo);
    const huongxuly = yield call(api.GetAllHuongXuLy);
    const coquan = yield call(api.GetAllCoQuan);
    yield put({
      type: actions.QUANLYVUVIECPHUCTAP_GET_INIT_REQUEST_SUCCESS,
      payload: {
        DanhSachHuongXuLy: huongxuly.data.Data,
        DanhSachLoaiKhieuTo: response.data.Data,
        DanhSachCoQuan: coquan.data.Data,
      },
    });
  } catch (e) {
    yield put({
      type: actions.QUANLYVUVIECPHUCTAP_GET_INIT_REQUEST_ERROR,
    });
  }
}
function* getList({payload}) {
  try {
    const newFilterData = {
      ...payload.filterData,
      DaDanhDau: Number(payload.filterData.tabsKey) === 2 ? false : true,
    };
    let response = yield call(api.DanhSachVuViecPhucTap, newFilterData);
    let responseExcel = yield call(api.DanhSachVuViecPhucTap, {
      ...newFilterData,
      PageSize: 99999999,
      PageNumber: 1,
    });
    yield put({
      type: actions.QUANLYVUVIECPHUCTAP_GET_LIST_REQUEST_SUCCESS,
      payload: {
        DanhSachVuViec: response.data.Data,
        DanhSachExcel: responseExcel.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.QUANLYVUVIECPHUCTAP_GET_LIST_REQUEST_ERROR,
    });
  }
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.QUANLYVUVIECPHUCTAP_GET_LIST_REQUEST, getList),
    yield takeEvery(actions.QUANLYVUVIECPHUCTAP_GET_INIT_REQUEST, getInitData),
  ]);
}
