import {all, takeEvery, put, call} from 'redux-saga/effects';
import api from '../../../containers/NghiepVu/XacMinhNoiDungDon/config';
import actions from './actions';
import dayjs from 'dayjs';

function* getInitData({payload}) {
  try {
    const canboxuly = yield call(api.GetAllCanBoXuLy);
    const tenfile = yield call(api.GetAllDanhMucTenFile);
    yield put({
      type: actions.XACMINHNOIDUNGDON_GET_INIT_REQUEST_SUCCESS,
      payload: {
        DanhSachCanBoXuLy: canboxuly.data.Data,
        DanhSachTenFile: tenfile.data.Data,
      },
    });
  } catch (e) {
    yield put({
      type: actions.XACMINHNOIDUNGDON_GET_INIT_REQUEST_ERROR,
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
    const response = yield call(api.DanhSachXacMinhNoiDungDon, newFilterData);

    yield put({
      type: actions.XACMINHNOIDUNGDON_GET_LIST_REQUEST_SUCCESS,
      payload: {
        DanhSachXacMinhNoiDungDon: response.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.XACMINHNOIDUNGDON_GET_LIST_REQUEST_ERROR,
    });
  }
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(
      actions.XACMINHNOIDUNGDON_GET_LIST_REQUEST,
      getDanhSachSoTiepCongDan,
    ),
    yield takeEvery(actions.XACMINHNOIDUNGDON_GET_INIT_REQUEST, getInitData),
  ]);
}
