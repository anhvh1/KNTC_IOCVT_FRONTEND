import {all, takeEvery, put, call} from 'redux-saga/effects';
import api from '../../../containers/NghiepVu/TiepNhanDon/config';
import actions from './actions';
import dayjs from 'dayjs';

function* getInitData({payload}) {
  try {
    const loaikhieuto = yield call(api.GetAllDanhMucLoaiKhieuTo);
    const quoctich = yield call(api.GetAllQuocTich);
    const dantoc = yield call(api.GetAllDanToc);
    const tinh = yield call(api.GetAllTinh);
    const huyen = yield call(api.GetAllHuyen);
    const xa = yield call(api.GetAllXa);
    const chucvu = yield call(api.GetAllChucVu);
    const hinhthucdagiaiquyet = yield call(api.GetAllHinhThucDaGiaiQuyet);
    const canboxuly = yield call(api.GetAllCanBoXuLy);
    const tenfile = yield call(api.GetAllDanhMucTenFile);
    const coquan = yield call(api.GetAllCoQuan);
    const danhsachcap = yield call(api.GetAllCap);
    const danhsachcanbolanhdao = yield call(api.GetAllCanBoLanhDao);
    yield put({
      type: actions.TIEPNHANDON_GET_INIT_REQUEST_SUCCESS,
      payload: {
        DanhSachLoaiKhieuTo: loaikhieuto.data.Data,
        DanhSachQuocTich: quoctich.data.Data,
        DanhSachDanToc: dantoc.data.Data,
        DanhSachTinh: tinh.data.Data,
        DanhSachCanBoLanhDao: danhsachcanbolanhdao.data.Data,
        DanhSachHuyen: huyen.data.Data,
        DanhSachXa: xa.data.Data.DanhSachXa,
        DanhSachChucVu: chucvu.data.Data,
        DanhSachHinhThucDaGiaiQuyet: hinhthucdagiaiquyet.data.Data,
        DanhSachCanBoXuLy: canboxuly.data.Data,
        DanhSachTenFile: tenfile.data.Data,
        DanhSachCoQuan: coquan.data.Data,
        DanhSachCap: danhsachcap.data.Data,
      },
    });
  } catch (e) {
    yield put({
      type: actions.TIEPNHANDON_GET_INIT_REQUEST_ERROR,
    });
  }
}

function* getDanhSachSoTiepCongDan({payload}) {
  try {
    // if(payload.filterData.)
    const newFilterData = {
      ...payload.filterData,
    };
    const response = yield call(api.DanhSachTiepNhanDon, newFilterData);
    const huongxuly = yield call(api.GetAllHuongXuLy);

    yield put({
      type: actions.TIEPNHANDON_GET_LIST_REQUEST_SUCCESS,
      payload: {
        DanhSachTiepNhanDon: response.data.Data,
        DanhSachHuongXuLy: huongxuly.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.TIEPNHANDON_GET_LIST_REQUEST_ERROR,
    });
  }
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(
      actions.TIEPNHANDON_GET_LIST_REQUEST,
      getDanhSachSoTiepCongDan,
    ),
    yield takeEvery(actions.TIEPNHANDON_GET_INIT_REQUEST, getInitData),
    // yield takeEvery(actions.TIEPNHANDON_GET_INIT_REQUEST, getInitData),
  ]);
}
