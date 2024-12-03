import actions from "./actions";

const initState = {
  DanhSachHuongDan: [],
  //   AllHuongDan: [],
  TotalRow: 0,
  TableLoading: false,
};

export default function Reducer(state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    //get initData
    case actions.QLHDSD_GET_INIT_DATA_REQUEST:
      return {
        ...state,
        TableLoading: true,
      };
    case actions.QLHDSD_GET_INIT_DATA_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachHuongDan: payload.DanhSachHuongDan,
        // AllHuongDan: payload.AllHuongDan,
        TotalRow: payload.TotalRow,
        TableLoading: false,
      };
    case actions.QLHDSD_GET_INIT_DATA_REQUEST_ERROR:
      return {
        ...state,
        DanhSachHuongDan: [],
        TotalRow: 0,
        TableLoading: false,
      };
    //get list
    case actions.QLHDSD_GET_LIST_REQUEST:
      return {
        ...state,
        TableLoading: true,
      };
    case actions.QLHDSD_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachHuongDan: payload.DanhSachHuongDan,
        // AllHuongDan: payload.AllHuongDan,
        TotalRow: payload.TotalRow,
        TableLoading: false,
      };
    case actions.QLHDSD_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhSachHuongDan: [],
        TotalRow: 0,
        TableLoading: false,
      };
    default:
      return state;
  }
}
