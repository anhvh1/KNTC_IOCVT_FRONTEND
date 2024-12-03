import {all, takeEvery, put, call} from 'redux-saga/effects';
import api from '../../../containers/HeThong/HoSoDonThu/config';
import actions from './actions';
import dayjs from 'dayjs';

function* getInitData({payload}) {
  try {
    const response = yield call(api.GetAllDanhMucLoaiKhieuTo);
    const huongxuly = yield call(api.GetAllHuongXuLy);
    const coquan = yield call(api.GetAllCoQuan);
    yield put({
      type: actions.HOSODONTHU_GET_INIT_REQUEST_SUCCESS,
      payload: {
        DanhSachHuongXuLy: huongxuly.data.Data,
        DanhSachLoaiKhieuTo: response.data.Data,
        DanhSachCoQuan: coquan.data.Data,
      },
    });
  } catch (e) {
    yield put({
      type: actions.HOSODONTHU_GET_INIT_REQUEST_ERROR,
    });
  }
}
function* getList({payload}) {
  try {
    const newFilterData = {
      ...payload.filterData,
    };
    let response =
      Number(payload.filterData.tabsKey) === 2
        ? yield call(api.DanhSachLichSuTraCuu, newFilterData)
        : yield call(api.DanhSachHoSoTraCuu, newFilterData);
    yield put({
      type: actions.HOSODONTHU_GET_LIST_REQUEST_SUCCESS,
      payload: {
        DanhSachHoSoDonThu: response.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.HOSODONTHU_GET_LIST_REQUEST_ERROR,
    });
  }
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.HOSODONTHU_GET_LIST_REQUEST, getList),
    yield takeEvery(actions.HOSODONTHU_GET_INIT_REQUEST, getInitData),
  ]);
}
