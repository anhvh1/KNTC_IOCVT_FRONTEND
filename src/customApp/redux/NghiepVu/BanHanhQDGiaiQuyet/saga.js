import {all, takeEvery, put, call} from 'redux-saga/effects';
import api from '../../../containers/NghiepVu/BanHanhQDGiaiQuyet/config';
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
    const response = yield call(api.DanhSachQDThihanh, newFilterData);
    const huongxuly = yield call(api.GetAllHuongXuLy);
    const danhsachcoquan = yield call(api.GetAllCoQuan);
    yield put({
      type: actions.QDTHIHANH_GET_LIST_REQUEST_SUCCESS,
      payload: {
        DanhSachQDThiHanh: response.data.Data,
        DanhSachHuongXuLy: huongxuly.data.Data,
        DanhSachCoQuan: danhsachcoquan.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.QDTHIHANH_GET_LIST_REQUEST_ERROR,
    });
  }
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(
      actions.QDTHIHANH_GET_LIST_REQUEST,
      getDanhSachSoTiepCongDan,
    ),
    // yield takeEvery(actions.QDTHIHANH_GET_INIT_REQUEST, getInitData),
  ]);
}
