import {all, takeEvery, put, call} from 'redux-saga/effects';
import api from '../../../containers/DanhMuc/DMCoQuan/config';
import actions from './actions';
import {formatTreeDataCoQuan} from '../../../../helpers/utility';

function* getInitData({payload}) {
  try {
    //data co quan
    const response = yield call(api.danhSachCoQuan, payload.filterData);
    let resultData = {
      DanhSachCoQuan: [],
      expandedKeys: [],
    };
    if (response.data.Data) {
      resultData = yield formatTreeDataCoQuan(response.data.Data);
    }

    //data dia gioi
    // const responseDiaGioi = yield call(api.danhSachDiaGioi, { ID: 0, Cap: 1 });
    // const DanhSachDiaGioi = yield responseDiaGioi.data.Data.map((value) => {
    //   return {
    //     ...value,
    //     id: `${value.ID}_${value.Cap}`,
    //     pId: "0",
    //     value: `${value.ID}_${value.Ten}`,
    //     title: value.Ten,
    //     isLeaf: value.TotalChildren < 1,
    //     disabled: true,
    //   };
    // });
    // return action;
    yield put({
      type: actions.COQUAN_GET_INIT_DATA_REQUEST_SUCCESS,
      payload: {
        DanhSachCoQuan: resultData.DanhSachCoQuan,
        // DanhSachDiaGioi,
        expandedKeys: resultData.expandedKeys,
      },
    });
  } catch (e) {
    yield put({
      type: actions.COQUAN_GET_INIT_DATA_REQUEST_ERROR,
    });
  }
}

function* getList({payload}) {
  try {
    const response = yield api.danhSachCoQuan(payload.filterData);
    const resultData = yield formatTreeDataCoQuan(response.data.Data);
    yield put({
      type: actions.COQUAN_GET_LIST_REQUEST_SUCCESS,
      payload: {
        DanhSachCoQuan: resultData.DanhSachCoQuan,
        expandedKeys: resultData.expandedKeys,
      },
    });
  } catch (e) {
    yield put({
      type: actions.COQUAN_GET_LIST_REQUEST_ERROR,
    });
  }
}

export default function* rootSaga() {
  yield all([
    yield takeEvery(actions.COQUAN_GET_INIT_DATA_REQUEST, getInitData),
  ]);
  yield all([yield takeEvery(actions.COQUAN_GET_LIST_REQUEST, getList)]);
}
