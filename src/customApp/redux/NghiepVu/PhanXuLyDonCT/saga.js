import {all, takeEvery, put, call} from 'redux-saga/effects';
import api from '../../../containers/NghiepVu/PhanXuLyDonCT/config';
import actions from './actions';
import dayjs from 'dayjs';

function* getInitData({payload}) {
  try {
    const canboxuly = yield call(api.GetAllCanBoXuLy);
    const tenfile = yield call(api.GetAllDanhMucTenFile);
    const danhsachloaikhieuto = yield call(api.GetAllDanhMucLoaiKhieuTo);
    const danhsachcoquanphanxuly = yield call(api.GetCoQuanPhanXuLy);
    yield put({
      type: actions.PHANXULYDONCT_GET_INIT_REQUEST_SUCCESS,
      payload: {
        DanhSachCoQuanPhanXuLy: danhsachcoquanphanxuly.data.Data,
        DanhSachCanBoXuLy: canboxuly.data.Data,
        DanhSachTenFile: tenfile.data.Data,
        DanhSachLoaiKhieuTo: danhsachloaikhieuto.data.Data,
      },
    });
  } catch (e) {
    yield put({
      type: actions.PHANXULYDONCT_GET_INIT_REQUEST_ERROR,
    });
  }
}

function* getDanhSachSoTiepCongDan({payload}) {
  try {
    // if(payload.filterData.)
    const newFilterData = {
      ...payload.filterData,
    };
    const response = yield call(api.DanhSachPhanXuLy, newFilterData);

    yield put({
      type: actions.PHANXULYDONCT_GET_LIST_REQUEST_SUCCESS,
      payload: {
        DanhSachPhanXuLy: response.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.PHANXULYDONCT_GET_LIST_REQUEST_ERROR,
    });
  }
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(
      actions.PHANXULYDONCT_GET_LIST_REQUEST,
      getDanhSachSoTiepCongDan,
    ),
    yield takeEvery(actions.PHANXULYDONCT_GET_INIT_REQUEST, getInitData),
  ]);
}
