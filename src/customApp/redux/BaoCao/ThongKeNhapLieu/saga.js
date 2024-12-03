import {message} from 'antd';
import {all, takeEvery, put, call} from 'redux-saga/effects';
import api from '../../../containers/BaoCao/ThongKeNhapLieu/config';
import apiCoQuan from '../../../containers/DanhMuc/DMCoQuan/config';
import actions from './action';

function* getThongTinBaoCao({payload}) {
  try {
    const response = yield call(api.ThongTinBaoCao, payload.filterData);
    yield put({
      type: actions.NHAPLIEUPHANMEM_INIT_REQUEST_SUCCESS,
      payload: {
        ThongTinBaoCao: response.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.NHAPLIEUPHANMEM_INIT_REQUEST_ERROR,
    });
  }
}

function* getDanhSachCoQuan({payload}) {
  try {
    const response = yield call(apiCoQuan.AllCoQuan, payload.filterData);
    yield put({
      type: actions.GETCOQUANNHAPLIEU_INIT_REQUEST_SUCCESS,
      payload: {
        DanhSachCoQuan: response.data.Data,
      },
    });
  } catch (e) {
    yield put({
      type: actions.GETCOQUANNHAPLIEU_INIT_REQUEST_ERROR,
    });
  }
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.NHAPLIEUPHANMEM_INIT_REQUEST, getThongTinBaoCao),
    yield takeEvery(actions.GETCOQUANNHAPLIEU_INIT_REQUEST, getDanhSachCoQuan),
  ]);
}
