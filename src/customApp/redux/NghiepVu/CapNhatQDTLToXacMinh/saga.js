import {all, takeEvery, put, call} from 'redux-saga/effects';
import api from '../../../containers/NghiepVu/CapNhatQDTLToXacMinh/config';
import actions from './actions';
import dayjs from 'dayjs';

function* getInitData({payload}) {
  try {
    const huongxuly = yield call(api.GetAllHuongXuLy);
    const trangthaixuly = yield call(api.GetTrangThaiXuLy);
    const danhsachcoquan = yield call(api.GetAllCoQuan);
    const danhsachtruongphong = yield call(api.DanhSachTruongPhong);
    const danhsachcanbogq = yield call(api.DanhSachCanBoGQ);
    const danhsachcanbo = yield call(api.GetAllCanBoXuLy);
    const danhsachloaikhieuto = yield call(api.GetAllDanhMucLoaiKhieuTo);
    yield put({
      type: actions.CapNhatQDTLToXacMinh_GET_INIT_REQUEST_SUCCESS,
      payload: {
        DanhSachHuongXuLy: huongxuly.data.Data,
        DanhSachCoQuan: danhsachcoquan.data.Data,
        DanhSachCanBoGQ: danhsachcanbogq.data.Data,
        DanhSachCanBo: danhsachcanbo.data.Data,
        DanhSachTruongPhong: danhsachtruongphong.data.Data,
        DanhSachLoaiKhieuTo: danhsachloaikhieuto.data.Data,
        // TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.CapNhatQDTLToXacMinh_GET_INIT_REQUEST_ERROR,
    });
  }
}

function* getDanhSachSoTiepCongDan({payload}) {
  try {
    // if(payload.filterData.)
    const newFilterData = {
      ...payload.filterData,
    };
    const response = yield call(api.DanhSachGiaoXacMinh, newFilterData);
    // const huongxuly = yield call(api.GetAllHuongXuLy);
    // const trangthaixuly = yield call(api.GetTrangThaiXuLy);
    // const danhsachcoquan = yield call(api.GetAllCoQuan);
    yield put({
      type: actions.CapNhatQDTLToXacMinh_GET_LIST_REQUEST_SUCCESS,
      payload: {
        DanhSachGiaoXacMinh: response.data.Data,
        // DanhSachHuongXuLy: huongxuly.data.Data,
        // DanhSachCoQuan: danhsachcoquan.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.CapNhatQDTLToXacMinh_GET_LIST_REQUEST_ERROR,
    });
  }
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(
      actions.CapNhatQDTLToXacMinh_GET_LIST_REQUEST,
      getDanhSachSoTiepCongDan,
    ),
    yield takeEvery(actions.CapNhatQDTLToXacMinh_GET_INIT_REQUEST, getInitData),
    // yield takeEvery(actions.GIAOXACMINH_GET_INIT_REQUEST, getInitData),
  ]);
}
