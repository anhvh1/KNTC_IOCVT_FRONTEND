import {all, takeEvery, put, call} from 'redux-saga/effects';
import api from '../../../containers/NghiepVu/QuanLyDonThuDonDoc/config';
import actions from './actions';
import dayjs from 'dayjs';

function* getInitData({payload}) {
  try {
    const response = yield call(api.GetAllDanhMucLoaiKhieuTo);
    const huongxuly = yield call(api.GetAllHuongXuLy);
    const danhsachbieumau = yield call(api.DanhSachBieuMau);
    yield put({
      type: actions.QUANLYDONTHUDONDOC_GET_INIT_REQUEST_SUCCESS,
      payload: {
        DanhSachHuongXuLy: huongxuly.data.Data,
        DanhSachLoaiKhieuTo: response.data.Data,
        DanhSachBieuMau: danhsachbieumau.data.Data,
      },
    });
  } catch (e) {
    yield put({
      type: actions.QUANLYDONTHUDONDOC_GET_INIT_REQUEST_ERROR,
    });
  }
}
function* getDanhSachSoTiepCongDan({payload}) {
  try {
    // if(payload.filterData.)
    const newFilterData = {
      ...payload.filterData,
    };
    const response = yield call(api.DanhSachDonThuDonDoc, newFilterData);

    yield put({
      type: actions.QUANLYDONTHUDONDOC_GET_LIST_REQUEST_SUCCESS,
      payload: {
        DanhSachDonThuDonDoc: response.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.QUANLYDONTHUDONDOC_GET_LIST_REQUEST_ERROR,
    });
  }
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(
      actions.QUANLYDONTHUDONDOC_GET_LIST_REQUEST,
      getDanhSachSoTiepCongDan,
    ),
    yield takeEvery(actions.QUANLYDONTHUDONDOC_GET_INIT_REQUEST, getInitData),
  ]);
}
