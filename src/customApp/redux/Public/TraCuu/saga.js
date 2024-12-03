import {all, takeEvery, put, call} from 'redux-saga/effects';
import axios from 'axios';

import actions from './actions';
// ../../../../../helpers/utility"
import {getDefaultPageSize} from '../../../../helpers/utility';
import api, {apiUrl} from '../../../containers/Public/TraCuuPublic/config';

let cancelTokenSourcePublic = axios.CancelToken.source();
let cancelTokenSource = axios.CancelToken.source();

export function handleCancelledApiTraCuuPublic() {
  cancelTokenSourcePublic.cancel('cancelled call very low');
  cancelTokenSourcePublic = axios.CancelToken.source();
}

export function handleCancelledApiTraCuu() {
  cancelTokenSource.cancel('cancelled call very low');
  cancelTokenSource = axios.CancelToken.source();
}

function* getInitData({payload}) {
  try {
    const danhsachcoquan = yield call(api.GetAllCoQuan);
    yield put({
      type: actions.TRACUU_GET_INIT_REQUEST_SUCCESS,
      payload: {
        DanhSachCoQuan: danhsachcoquan.data.Data,
      },
    });
  } catch (e) {
    yield put({
      type: actions.TRACUU_GET_INIT_REQUEST_ERROR,
    });
  }
}

function* getListTraCuuPubLic({payload}) {
  try {
    const filterData = payload?.filterData;
    const callapi =
      Number(filterData?.tabsKey) === 2
        ? apiUrl.tracuutrangthaixulyhoso
        : apiUrl.tracuuquyetdinhgiaiquyet;
    const tracuu = yield axios.get(
      callapi,
      {
        params: {
          ...filterData,
          PageNumber: filterData?.PageNumber ? filterData.PageNumber : 1,
          PageSize: filterData?.PageSize
            ? filterData.PageSize
            : getDefaultPageSize(),
        },
      },
      {cancelToken: cancelTokenSourcePublic.token},
    );
    yield put({
      type: actions.TRACUU_PUBLIC_GET_LIST_REQUEST_SUCCESS,
      payload: {
        DanhSachTraCuuPubLic: tracuu.data.Data,
        TotalRow: tracuu.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.TRACUU_PUBLIC_GET_LIST_REQUEST_ERROR,
    });
  }
}

function* getLichTiepDan({payload}) {
  try {
    const lichtiepdan = yield call(api.GetDanhSachLichTiepDan);
    yield put({
      type: actions.LICHTIEPDAN_GET_LIST_REQUEST_SUCCESS,
      payload: {
        DanhSachLichTiepDan: lichtiepdan.data.Data,
        TotalRowLichTiepDan: lichtiepdan.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.LICHTIEPDAN_GET_LIST_REQUEST_ERROR,
    });
  }
}

function* getTrinhTuThuTuc({payload}) {
  try {
    const trinhtuthutuc = yield call(api.GetTrinhTuThuTuc);
    yield put({
      type: actions.TRINHTUTHUTUC_GET_LIST_REQUEST_SUCCESS,
      payload: {
        DanhSachTrinhTuThuTuc: trinhtuthutuc.data.Data,
        TotalRowTrinhTuThuTuc: trinhtuthutuc.data.TotalRow,
      },
    });
  } catch (e) {
    yield put({
      type: actions.TRINHTUTHUTUC_GET_LIST_REQUEST_ERROR,
    });
  }
}

export default function* rootSaga() {
  yield all([yield takeEvery(actions.TRACUU_GET_INIT_REQUEST, getInitData)]);
  yield all([
    yield takeEvery(
      actions.TRACUU_PUBLIC_GET_LIST_REQUEST,
      getListTraCuuPubLic,
    ),
  ]);
  yield all([
    yield takeEvery(actions.LICHTIEPDAN_GET_LIST_REQUEST, getLichTiepDan),
  ]);
  yield all([
    yield takeEvery(actions.TRINHTUTHUTUC_GET_LIST_REQUEST, getTrinhTuThuTuc),
  ]);
}
