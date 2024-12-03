import {all, takeEvery, put, call} from 'redux-saga/effects';
import api from '../../../containers/NghiepVu/PheDuyetKetQuaXuLy/config';
import actions from './actions';
import dayjs from 'dayjs';

function* getDanhSachSoTiepCongDan({payload}) {
  try {
    // if(payload.filterData.)
    const newFilterData = {
      ...payload.filterData,
    };
    const response = yield call(api.DanhSachPheDuyetKetQuaXuLy, newFilterData);
    const huongxuly = yield call(api.GetAllHuongXuLy);
    const trangthaixuly = yield call(api.GetTrangThaiXuLy);
    const danhsachlanhdao = yield call(api.DanhSachLanhDao);
    yield put({
      type: actions.PHEDUYETKETQUAXULY_GET_LIST_REQUEST_SUCCESS,
      payload: {
        DanhSachPheDuyetKetQuaXuLy: response.data.Data,
        DanhSachHuongXuLy: huongxuly.data.Data,
        DanhSachLanhDao: danhsachlanhdao.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.PHEDUYETKETQUAXULY_GET_LIST_REQUEST_ERROR,
    });
  }
}

function* getInitData({payload}) {
  try {
    const response = yield call(api.DanhSachCoQuanChuyenDon);
    const danhsachloaikhieuto = yield call(api.GetAllDanhMucLoaiKhieuTo);
    yield put({
      type: actions.PHEDUYETKETQUAXULY_GET_INIT_REQUEST_SUCCESS,
      payload: {
        DanhSachCoQuanChuyenDon: response.data.Data,
        DanhSachLoaiKhieuTo: danhsachloaikhieuto.data.Data,
      },
    });
  } catch (e) {
    yield put({
      type: actions.PHEDUYETKETQUAXULY_GET_INIT_REQUEST_ERROR,
    });
  }
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(
      actions.PHEDUYETKETQUAXULY_GET_LIST_REQUEST,
      getDanhSachSoTiepCongDan,
    ),
    yield takeEvery(actions.PHEDUYETKETQUAXULY_GET_INIT_REQUEST, getInitData),
    // yield takeEvery(actions.PHEDUYETKETQUAXULY_GET_INIT_REQUEST, getInitData),
  ]);
}
