import actions from './actions';

const initState = {
  DanhSachNhom: [],
  DanhSachCanBo: [],
  TotalRow: 0,
  TableLoading: false,
};

export default function Reducer(state = initState, action) {
  const {type, payload} = action;
  switch (type) {
    //get initData
    case actions.PHANQUYEN_GET_INIT_DATA_REQUEST:
      return {
        ...state,
        TableLoading: true
      };
    case actions.PHANQUYEN_GET_INIT_DATA_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachCanBo: payload.DanhSachCanBo
      };
    case actions.PHANQUYEN_GET_INIT_DATA_REQUEST_ERROR:
      return {
        ...state,
        DanhSachCanBo: []
      };
    //get list
    case actions.PHANQUYEN_GET_LIST_REQUEST:
      return {
        ...state,
        TableLoading: true
      };
    case actions.PHANQUYEN_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachNhom: payload.DanhSachNhom,
        TotalRow: payload.TotalRow,
        TableLoading: false
      };
    case actions.PHANQUYEN_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhSachNhom: [],
        TotalRow: 0,
        TableLoading: false
      };
    default:
      return state;
  }
}