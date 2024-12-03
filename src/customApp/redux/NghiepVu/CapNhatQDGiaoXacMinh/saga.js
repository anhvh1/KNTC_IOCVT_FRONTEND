import {all, takeEvery, put, call} from 'redux-saga/effects';
import api from '../../../containers/NghiepVu/CapNhatQDGiaoXacMinh/config';
import actions from './actions';
import dayjs from 'dayjs';

function* getInitData() {
  try {
    const huongxuly = yield call(api.GetAllHuongXuLy);
    const danhsachcoquan = yield call(api.GetCoQuanGQ);
    const danhsachloaikhieuto = yield call(api.GetAllDanhMucLoaiKhieuTo);
    yield put({
      type: actions.CAPNHATGDGIAOXACMINH_INIT_REQUEST_SUCCESS,
      payload: {
        DanhSachHuongXuLy: huongxuly.data.Data,
        DanhSachCoQuan: danhsachcoquan.data.Data,
        DanhSachLoaiKhieuTo: danhsachloaikhieuto.data.Data,
      },
    });
  } catch (e) {
    yield put({
      type: actions.CAPNHATGDGIAOXACMINH_INIT_REQUEST_ERROR,
    });
  }
}

function* getDanhSachGiaoXacMinh({payload}) {
  try {
    const newFilterData = {
      ...payload.filterData,
    };
    const response = yield call(api.DanhSachQDGiaoXacMinh, newFilterData);
    yield put({
      type: actions.CAPNHATGDGIAOXACMINH_LIST_REQUEST_SUCCESS,
      payload: {
        DanhSachQDGiaoXacMinh: response.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.CAPNHATGDGIAOXACMINH_LIST_REQUEST_ERROR,
    });
  }
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(
      actions.CAPNHATGDGIAOXACMINH_LIST_REQUEST,
      getDanhSachGiaoXacMinh,
    ),
    yield takeEvery(actions.CAPNHATGDGIAOXACMINH_INIT_REQUEST, getInitData),
  ]);
}
