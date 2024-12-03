import {all, takeEvery, put, call} from 'redux-saga/effects';
import api from '../../../containers/HeThong/DongBoDuLieu/config';
import actions from './actions';

function* getInit({payload}) {
  try {
    const response = yield call(api.DanhSachAnhXa, payload.filterData);
    yield put({
      type: actions.DONGBODULIEU_GET_INIT_REQUEST_SUCCESS,
      payload: {
        DanhSachAnhXa: response.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.DONGBODULIEU_GET_INIT_REQUEST_ERROR,
    });
  }
}
function* getList({payload}) {
  try {
    const response = yield call(api.GetDuLieuDongBo, payload.filterData);
    yield put({
      type: actions.DONGBODULIEU_GET_LIST_REQUEST_SUCCESS,
      payload: {
        DanhSachDonThu: response.data.Data.DanhSachDonThu,
        DanhSachLichSuDongBo: response.data.Data.LichSuDongBo,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.DONGBODULIEU_GET_LIST_REQUEST_ERROR,
    });
  }
}

function* getDanhMucKNTCQuocGia({payload}) {
  try {
    const response = yield call(api.DanhSachKNTCQuocGia, payload.filterData);
    const response2 = yield call(api.DanhSachMapping, payload.filterData);
    yield put({
      type: actions.DONGBODULIEU_GET_DANHMUCKNTCQUOCGIA_REQUEST_SUCCESS,
      payload: {
        DanhSachKNTCQuocGia: response.data.Data,
        DanhSachMapping: response2.data.Data,
        TotalRow: response.data.TotalRow,
        TotalRowMapping: response2.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.DONGBODULIEU_GET_DANHMUCKNTCQUOCGIA_REQUEST_ERROR,
    });
  }
}

export default function* rootSaga() {
  yield all([yield takeEvery(actions.DONGBODULIEU_GET_INIT_REQUEST, getInit)]);
  yield all([yield takeEvery(actions.DONGBODULIEU_GET_LIST_REQUEST, getList)]);

  yield all([
    yield takeEvery(
      actions.DONGBODULIEU_GET_DANHMUCKNTCQUOCGIA_REQUEST,
      getDanhMucKNTCQuocGia,
    ),
  ]);
}
