import {all, takeEvery, put, call} from 'redux-saga/effects';
import api from '../../../containers/NghiepVu/ThiHanh/config';
import actions from './actions';
import dayjs from 'dayjs';

function* getDanhSachSoTiepCongDan({payload}) {
  try {
    // if(payload.filterData.)
    const newFilterData = {
      ...payload.filterData,
      LoaiKhieuToID: payload.filterData?.tabsKey
        ? payload.filterData?.tabsKey
        : 1,
    };
    const response = yield call(api.DanhSachThiHanh, newFilterData);
    const huongxuly = yield call(api.GetAllHuongXuLy);
    const trangthaixuly = yield call(api.GetTrangThaiXuLy);
    yield put({
      type: actions.THIHANH_GET_LIST_REQUEST_SUCCESS,
      payload: {
        DanhSachThiHanh: response.data.Data,
        DanhSachHuongXuLy: huongxuly.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.THIHANH_GET_LIST_REQUEST_ERROR,
    });
  }
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.THIHANH_GET_LIST_REQUEST, getDanhSachSoTiepCongDan),
    // yield takeEvery(actions.THIHANH_GET_INIT_REQUEST, getInitData),
  ]);
}
