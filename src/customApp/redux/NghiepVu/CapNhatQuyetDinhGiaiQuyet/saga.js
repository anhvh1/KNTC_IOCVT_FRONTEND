import {all, takeEvery, put, call} from 'redux-saga/effects';
import api from '../../../containers/NghiepVu/CapNhatQDGiaiQuyet/config';
import {getLocalKey} from '../../../../helpers/utility';
import actions from './actions';
import dayjs from 'dayjs';

function* getInitData({payload}) {
  try {
    const huongxuly = yield call(api.GetAllHuongXuLy);
    const danhsachcoquan = yield call(api.GetAllCoQuan);
    const danhsachcoquancaphuyen = yield call(api.DanhSachCoQuanCapHuyen);
    const danhsachloaikhieuto = yield call(api.GetAllDanhMucLoaiKhieuTo);
    yield put({
      type: actions.CAPNHATQDGIAIQUYET_GET_INIT_REQUEST_SUCCESS,
      payload: {
        DanhSachHuongXuLy: huongxuly.data.Data,
        DanhSachCoQuan: danhsachcoquan.data.Data,
        DanhSachCoQuanCapHuyen: danhsachcoquancaphuyen.data.Data,
        DanhSachLoaiKhieuTo: danhsachloaikhieuto.data.Data,
      },
    });
  } catch (e) {
    yield put({
      type: actions.CAPNHATQDGIAIQUYET_GET_INIT_REQUEST_ERROR,
    });
  }
}

function* getDanhSachSoTiepCongDan({payload}) {
  try {
    // if(payload.filterData.)
    const newFilterData = {
      ...payload.filterData,
    };

    // const user = getLocalKey('user', {});
    // const isBanTiepDan = user?.BanTiepDan ? user.BanTiepDan && user?.CapID === 4  : false;
    // if (!isBanTiepDan) {
    //   delete newFilterData[`LoaiKhieuToID`];
    // }

    const response = yield call(
      api.DanhSachBanHanhQuyetDinhGiaiQuyet,
      newFilterData,
    );
    const huongxuly = yield call(api.GetAllHuongXuLy);
    const danhsachcoquan = yield call(api.GetAllCoQuan);
    yield put({
      type: actions.CAPNHATQDGIAIQUYET_GET_LIST_REQUEST_SUCCESS,
      payload: {
        DanhSachQDGiaiQuyet: response.data.Data,
        DanhSachHuongXuLy: huongxuly.data.Data,
        DanhSachCoQuan: danhsachcoquan.data.Data,
        TotalRow: response.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.CAPNHATQDGIAIQUYET_GET_LIST_REQUEST_ERROR,
    });
  }
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(
      actions.CAPNHATQDGIAIQUYET_GET_LIST_REQUEST,
      getDanhSachSoTiepCongDan,
    ),
    yield takeEvery(actions.CAPNHATQDGIAIQUYET_GET_INIT_REQUEST, getInitData),
  ]);
}
