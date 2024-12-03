import {message} from 'antd';
import {all, takeEvery, put, call} from 'redux-saga/effects';
import api from '../../containers/DashBoash/config';
import actions from './action';

function* getBaoCao({payload}) {
  try {
    const response = yield call(api.DanhSachData, payload.filterData);
    // const responsecanhbao = yield call(api.DanhSachCanhBao, payload.filterData);
    const loaikhieuto = yield call(api.GetAllDanhMucLoaiKhieuTo);
    yield put({
      type: actions.DASHBOARD_GET_LIST_SUCCESS,
      payload: {
        DuLieuChart: response.data.Data,
        DanhSachCanhBao: response.data.Data,
        DanhSachLoaiKhieuTo: loaikhieuto.data.Data,
        SoLieuCanhBao: response.data.Data,
      },
    });
  } catch (e) {
    yield put({
      type: actions.DASHBOARD_GET_LIST_ERROR,
    });
  }
}

function* getInit({payload}) {
  try {
    const response = yield call(api.DanhSachPhanLoaiVuViec, payload.filterData);
    yield put({
      type: actions.DASHBOARD_GET_INIT_SUCCESS,
      payload: {
        DanhSachPhanLoaiVuViec: response.data.Data,
      },
    });
  } catch (e) {
    yield put({
      type: actions.DASHBOARD_GET_INIT_ERROR,
    });
  }
}

function* getListSoLieu({payload}) {
  try {
    const response = yield call(api.DanhSachCanhBaoV2, payload.filterData);
    yield put({
      type: actions.SOLIEUCANHBAO_GET_LIST_SUCCESS,
      payload: {
        SoLieuCanhBao: response.data.Data.SoLieuCanhBao,
      },
    });
  } catch (e) {
    yield put({
      type: actions.SOLIEUCANHBAO_GET_LIST_ERROR,
    });
  }
}

export default function* get() {
  yield all([yield takeEvery(actions.DASHBOARD_GET_LIST, getBaoCao)]);
  yield all([yield takeEvery(actions.DASHBOARD_GET_INIT, getInit)]);
  yield all([yield takeEvery(actions.SOLIEUCANHBAO_GET_LIST, getListSoLieu)]);
}
