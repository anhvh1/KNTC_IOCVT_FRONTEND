import {all, takeEvery, put, call} from 'redux-saga/effects';
import api from '../../../containers/NghiepVu/DonThuDaTiepNhan/config';
import actions from './actions';
import dayjs from 'dayjs';

function* getInitData({payload}) {
  try {
    const loaikhieuto = yield call(api.GetAllDanhMucLoaiKhieuTo);
    const tenfile = yield call(api.GetAllDanhMucTenFile);
    const coquan = yield call(api.GetAllCoQuan);
    const danhsachcap = yield call(api.GetAllCap);
    const danhsachcanbolanhdao = yield call(api.GetAllCanBoLanhDao);
    const danhsachbieumau = yield call(api.DanhSachBieuMau);
    const newFilterData = {
      ...payload.filterData,
    };
    const tabsKey = Number(newFilterData.tabsKey);
    const huongxuly = yield call(api.GetAllHuongXuLy);
    yield put({
      type: actions.DONTHUDATIEPNHAN_GET_INIT_REQUEST_SUCCESS,
      payload: {
        DanhSachLoaiKhieuTo: loaikhieuto.data.Data,
        DanhSachCanBoLanhDao: danhsachcanbolanhdao.data.Data,
        DanhSachTenFile: tenfile.data.Data,
        DanhSachCoQuan: coquan.data.Data,
        DanhSachCap: danhsachcap.data.Data,
        DanhSachBieuMau: danhsachbieumau.data.Data,
        DanhSachHuongXuLy: huongxuly.data.Data,
      },
    });
  } catch (e) {
    yield put({
      type: actions.DONTHUDATIEPNHAN_GET_INIT_REQUEST_ERROR,
    });
  }
}

function* getDanhSachSoTiepCongDan({payload}) {
  try {
    const newFilterData = {
      ...payload.filterData,
    };
    const response = yield call(api.DanhSachSoTiepDan, newFilterData);
    const responseAll = yield call(api.DanhSachSoTiepDan, {
      ...newFilterData,
      PageSize: 999999,
    });

    yield put({
      type: actions.DONTHUDATIEPNHAN_GET_LIST_REQUEST_SUCCESS,
      payload: {
        DanhSachTiepDan: response.data.Data,
        DanhSachTiepDanAll: responseAll.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.DONTHUDATIEPNHAN_GET_LIST_REQUEST_ERROR,
    });
  }
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(
      actions.DONTHUDATIEPNHAN_GET_LIST_REQUEST,
      getDanhSachSoTiepCongDan,
    ),
    yield takeEvery(actions.DONTHUDATIEPNHAN_GET_INIT_REQUEST, getInitData),
  ]);
}
