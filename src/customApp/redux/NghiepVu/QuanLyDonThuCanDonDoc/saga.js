import {all, takeEvery, put, call} from 'redux-saga/effects';
import api from '../../../containers/NghiepVu/QuanLyDonThuCanDonDoc/config';
import actions from './actions';
import dayjs from 'dayjs';

function* getInitData({payload}) {
  try {
    const response = yield call(api.GetAllDanhMucLoaiKhieuTo);
    const huongxuly = yield call(api.GetAllHuongXuLy);
    const danhsachbieumau = yield call(api.DanhSachBieuMau);
    const danhsachlanhdao = yield call(api.DanhSachLanhDao);
    const danhsachcoquanchuyendon = yield call(api.DanhSachCoQuanChuyenDon);
    const coquan = yield call(api.GetAllCoQuan);
    yield put({
      type: actions.QUANLYDONTHUCANDONDOC_GET_INIT_REQUEST_SUCCESS,
      payload: {
        DanhSachHuongXuLy: huongxuly.data.Data,
        DanhSachLoaiKhieuTo: response.data.Data,
        DanhSachCoQuan: coquan.data.Data,
        DanhSachBieuMau: danhsachbieumau.data.Data,
        DanhSachLanhDao: danhsachlanhdao.data.Data,
        DanhSachCoQuanChuyenDon: danhsachcoquanchuyendon.data.Data,
      },
    });
  } catch (e) {
    yield put({
      type: actions.QUANLYDONTHUCANDONDOC_GET_INIT_REQUEST_ERROR,
    });
  }
}
function* getDanhSachSoTiepCongDan({payload}) {
  try {
    // if(payload.filterData.)
    const newFilterData = {
      ...payload.filterData,
    };
    const response = yield call(api.DanhSachDonThuCanDonDoc, newFilterData);
    const responseExcel = yield call(api.DanhSachDonThuCanDonDoc, {
      ...newFilterData,
      PageSize: 99999999,
      PageNumber: 1,
    });
    yield put({
      type: actions.QUANLYDONTHUCANDONDOC_GET_LIST_REQUEST_SUCCESS,
      payload: {
        DanhSachExcel: responseExcel.data.Data,
        DanhSachDonThuCanDonDoc: response.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.QUANLYDONTHUCANDONDOC_GET_LIST_REQUEST_ERROR,
    });
  }
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(
      actions.QUANLYDONTHUCANDONDOC_GET_LIST_REQUEST,
      getDanhSachSoTiepCongDan,
    ),
    yield takeEvery(
      actions.QUANLYDONTHUCANDONDOC_GET_INIT_REQUEST,
      getInitData,
    ),
  ]);
}
