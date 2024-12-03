import {all, takeEvery, put, call} from 'redux-saga/effects';
import api from '../../../containers/NghiepVu/SoTiepDan/config';
import actions from './actions';
import dayjs from 'dayjs';

function* getInitData({payload}) {
  try {
    const loaikhieuto = yield call(api.GetAllDanhMucLoaiKhieuTo);
    const chucvu = yield call(api.GetAllChucVu);
    const hinhthucdagiaiquyet = yield call(api.GetAllHinhThucDaGiaiQuyet);
    const canboxuly = yield call(api.GetAllCanBoXuLy);
    const tenfile = yield call(api.GetAllDanhMucTenFile);
    const coquan = yield call(api.GetAllCoQuan);
    const danhsachcap = yield call(api.GetAllCap);
    const danhsachcanbolanhdao = yield call(api.GetAllCanBoLanhDao);
    const danhsachbieumau = yield call(api.DanhSachBieuMau);
    const newFilterData = {
      ...payload.filterData,
      // LoaiKhieuToID: payload.filterData?.tabsKey
      //   ? payload.filterData?.tabsKey
      //   : 1,
    };
    const tabsKey = Number(newFilterData.tabsKey);
    let callApi;
    if (tabsKey === 2) {
      callApi = api.DanhSachTiepCongDanDotXuatBanTiepDan;
    } else if (tabsKey === 3) {
      callApi = api.DanhSachTiepCongDanDinhKyBanTiepDan;
    } else {
      callApi = api.DanhSachSoTiepDan;
    }
    const huongxuly = yield call(api.GetAllHuongXuLy);
    yield put({
      type: actions.SOTIEPDAN_GET_INIT_REQUEST_SUCCESS,
      payload: {
        DanhSachLoaiKhieuTo: loaikhieuto.data.Data,
        DanhSachCanBoLanhDao: danhsachcanbolanhdao.data.Data,
        DanhSachChucVu: chucvu.data.Data,
        DanhSachHinhThucDaGiaiQuyet: hinhthucdagiaiquyet.data.Data,
        DanhSachCanBoXuLy: canboxuly.data.Data,
        DanhSachTenFile: tenfile.data.Data,
        DanhSachCoQuan: coquan.data.Data,
        DanhSachCap: danhsachcap.data.Data,
        DanhSachBieuMau: danhsachbieumau.data.Data,
        DanhSachHuongXuLy: huongxuly.data.Data,
      },
    });
  } catch (e) {
    yield put({
      type: actions.SOTIEPDAN_GET_INIT_REQUEST_ERROR,
    });
  }
}

function* getDanhSachSoTiepCongDan({payload}) {
  try {
    // if(payload.filterData.)
    const newFilterData = {
      ...payload.filterData,
      // LoaiKhieuToID: payload.filterData?.tabsKey
      //   ? payload.filterData?.tabsKey
      //   : 1,
    };
    const response = yield call(api.DanhSachSoTiepDan, newFilterData);
    const responseAll = yield call(api.DanhSachSoTiepDan, {
      ...newFilterData,
      PageSize: 999999,
      PageNumber: 1,
    });
    yield put({
      type: actions.SOTIEPDAN_GET_LIST_REQUEST_SUCCESS,
      payload: {
        DanhSachTiepDan: response.data.Data,
        DanhSachTiepDanAll: responseAll.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.SOTIEPDAN_GET_LIST_REQUEST_ERROR,
    });
  }
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(
      actions.SOTIEPDAN_GET_LIST_REQUEST,
      getDanhSachSoTiepCongDan,
    ),
    yield takeEvery(actions.SOTIEPDAN_GET_INIT_REQUEST, getInitData),
  ]);
}
