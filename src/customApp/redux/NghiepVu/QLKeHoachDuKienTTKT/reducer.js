import actions from './actions';

const initState = {
  role: {view: 0, add: 0, edit: 0, delete: 0},
  DanhSachKHDuKien: [],
  DanhSachBaoTang:[],
  //   AllHuongDan: [],
  TotalRow: 0,
  TotalUnit:0,
  TableLoading: false,
};

export default function Reducer(state = initState, action) {
  const {type, payload} = action;
  switch (type) {
    //get initData
    case actions.KHDUKIEN_GET_INIT_DATA_REQUEST:
      return {
        ...state,
        TableLoading: true,
        role: payload.role,
      };
    case actions.KHDUKIEN_GET_INIT_DATA_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachBaoTang: payload.DanhSachBaoTang,
        // AllHuongDan: payload.AllHuongDan,
        TotalRow: payload.TotalRow,
        TotalUnit:payload.TotalUnit,
        TableLoading: false,
      };
    case actions.KHDUKIEN_GET_INIT_DATA_REQUEST_ERROR:
      return {
        ...state,
        DanhSachBaoTang: [],
        TotalRow: 0,
        TotalUnit:0,
        TableLoading: false,
      };
    //get list
    case actions.KHDUKIEN_GET_LIST_REQUEST:
      return {
        ...state,
        TableLoading: true,
      };
    case actions.KHDUKIEN_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachKHDuKien: payload.DanhSachKHDuKien,
        // AllHuongDan: payload.AllHuongDan,
        TotalRow: payload.TotalRow,
        TotalUnit:payload.TotalUnit,
        TableLoading: false,
      };
    case actions.KHDUKIEN_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhSachKHDuKien: [],
        TotalRow: 0,
        TotalUnit:0,
        TableLoading: false,
      };
    default:
      return state;
  }
}
