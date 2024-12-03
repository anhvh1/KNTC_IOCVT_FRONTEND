import {all, takeEvery, put, call} from 'redux-saga/effects';
import api from '../../../containers/NghiepVu/TheoDoiGiaiQuyetKNTC/config';
import actions from './actions';
import dayjs from 'dayjs';
import {getLocalKey} from '../../../../helpers/utility';
import {CapHanhChinh} from '../../../../settings/constants';
import apiQDGiaoXacMinh from '../../../containers/NghiepVu/CapNhatQDGiaoXacMinh/config';
import {useSelector} from 'react-redux';
function* getInitData({payload}) {
  const user = JSON?.parse(localStorage.getItem('user'));
  const checkCTHuyen =
    user.ChuTichUBND === 1 && user.CapHanhChinh === CapHanhChinh.CapUBNDHuyen;
  try {
    const danhsachloaikhieuto = yield call(api.GetAllDanhMucLoaiKhieuTo);
    const huongxuly = yield call(api.GetAllHuongXuLy);
    const danhsachcoquan = yield call(api.GetAllCoQuan);
    const danhsachcoquanqd = checkCTHuyen
      ? yield call(apiQDGiaoXacMinh.GetCoQuanGQ)
      : [];
    yield put({
      type: actions.THEOGIOIGIAIQUYET_GET_INIT_REQUEST_SUCCESS,
      payload: {
        DanhSachLoaiKhieuTo: danhsachloaikhieuto.data.Data,
        DanhSachHuongXuLy: huongxuly.data.Data,
        DanhSachCoQuan: danhsachcoquan.data.Data,
        DanhSachCoQuanQDGiaoXacMinh: checkCTHuyen
          ? danhsachcoquanqd?.data?.Data
          : [],
      },
    });
  } catch (e) {
    yield put({
      type: actions.THEOGIOIGIAIQUYET_GET_INIT_REQUEST_ERROR,
    });
  }
}

function* getDanhSachSoTiepCongDan({payload}) {
  try {
    // if(payload.filterData.)
    const newFilterData = {
      ...payload.filterData,
    };
    const response = yield call(api.DanhSachTheoDoiGiaiQuyet, newFilterData);
    yield put({
      type: actions.THEOGIOIGIAIQUYET_GET_LIST_REQUEST_SUCCESS,
      payload: {
        DanhSachTheoDoiGiaiQuyet: response.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.THEOGIOIGIAIQUYET_GET_LIST_REQUEST_ERROR,
    });
  }
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(
      actions.THEOGIOIGIAIQUYET_GET_LIST_REQUEST,
      getDanhSachSoTiepCongDan,
    ),
    yield takeEvery(actions.THEOGIOIGIAIQUYET_GET_INIT_REQUEST, getInitData),
  ]);
}
