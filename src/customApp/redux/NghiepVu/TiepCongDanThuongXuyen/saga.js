import {all, takeEvery, put, call} from 'redux-saga/effects';
import api from '../../../containers/NghiepVu/TiepCongDanThuongXuyen/config';
import actions from './actions';
import dayjs from 'dayjs';

function* getInitData({payload}) {
  try {
    const loaikhieuto = yield call(api.GetAllDanhMucLoaiKhieuTo);
    const quoctich = yield call(api.GetAllQuocTich);
    const dantoc = yield call(api.GetAllDanToc);
    const tinh = yield call(api.GetAllTinh);
    yield put({
      type: actions.TIEPCONGDANTHUONGXUYEN_GET_INIT_REQUEST_SUCCESS,
      payload: {
        DanhSachLoaiKhieuTo: loaikhieuto.data.Data,
        DanhSachQuocTich: quoctich.data.Data,
        DanhSachDanToc: dantoc.data.Data,
        DanhSachTinh: tinh.data.Data,
      },
    });
  } catch (e) {
    yield put({
      type: actions.TIEPCONGDANTHUONGXUYEN_GET_INIT_REQUEST_ERROR,
    });
  }
}

function* getDanhSachSoTiepCongDan({payload}) {
  try {
    // if(payload.filterData.)
    const newFilterData = {
      ...payload.filterData,
      LoaiKhieuToID: payload.filterData?.tabsKey
        ? payload.filterData?.tabsKey
        : 1,
    };
    const response = yield call(
      api.DanhSachTiepCongDanThuongXuyen,
      newFilterData,
    );
    const huongxuly = yield call(api.GetAllHuongXuLy);

    yield put({
      type: actions.TIEPCONGDANTHUONGXUYEN_GET_LIST_REQUEST_SUCCESS,
      payload: {
        DanhSachTiepDan: response.data.Data,
        DanhSachHuongXuLy: huongxuly.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.TIEPCONGDANTHUONGXUYEN_GET_LIST_REQUEST_ERROR,
    });
  }
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(
      actions.TIEPCONGDANTHUONGXUYEN_GET_LIST_REQUEST,
      getDanhSachSoTiepCongDan,
    ),
    yield takeEvery(
      actions.TIEPCONGDANTHUONGXUYEN_GET_INIT_REQUEST,
      getInitData,
    ),
  ]);
}
