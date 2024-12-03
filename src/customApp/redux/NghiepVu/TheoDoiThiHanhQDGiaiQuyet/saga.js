import {all, takeEvery, put, call} from 'redux-saga/effects';
import api from '../../../containers/NghiepVu/TheoDoiThiHanhQDGiaiQuyet/config';
import actions from './actions';
import dayjs from 'dayjs';

function* getInitData({payload}) {
  try {
    const huongxuly = yield call(api.GetAllHuongXuLy);
    const danhsachcoquan = yield call(api.GetAllCoQuan);
    const danhsachloaikhieuto = yield call(api.GetAllDanhMucLoaiKhieuTo);
    yield put({
      type: actions.TheoDoiThiHanhQDGiaiQuyet_GET_INIT_REQUEST_SUCCESS,
      payload: {
        DanhSachHuongXuLy: huongxuly.data.Data,
        DanhSachCoQuan: danhsachcoquan.data.Data,
        DanhSachLoaiKhieuTo: danhsachloaikhieuto.data.Data,
      },
    });
  } catch (e) {
    yield put({
      type: actions.TheoDoiThiHanhQDGiaiQuyet_GET_INIT_REQUEST_ERROR,
    });
  }
}

function* getDanhSachSoTiepCongDan({payload}) {
  try {
    // if(payload.filterData.)
    const newFilterData = {
      ...payload.filterData,
    };
    const response = yield call(
      api.DanhSachTheoDoiThiHanhQDGiaiQuyet,
      newFilterData,
    );
    yield put({
      type: actions.TheoDoiThiHanhQDGiaiQuyet_GET_LIST_REQUEST_SUCCESS,
      payload: {
        DanhSachThiHanhQDGiaiQuyet: response.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.TheoDoiThiHanhQDGiaiQuyet_GET_LIST_REQUEST_ERROR,
    });
  }
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(
      actions.TheoDoiThiHanhQDGiaiQuyet_GET_LIST_REQUEST,
      getDanhSachSoTiepCongDan,
    ),
    yield takeEvery(
      actions.TheoDoiThiHanhQDGiaiQuyet_GET_INIT_REQUEST,
      getInitData,
    ),
  ]);
}
