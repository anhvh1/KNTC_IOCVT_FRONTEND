import actions from "./actions";

const initState = {
  role: { view: 0, add: 0, edit: 0, delete: 0 },
  DanhSachBanHanh: [],
  DanhSachBanHanhAll: [],
  DanhSachBaoTang: [],
  //   AllHuongDan: [],
  TotalRow: 0,
  TotalUnit: 0,
  TableLoading: false,
};

export default function Reducer(state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    //get initData
    case actions.BANHANH_GET_INIT_DATA_REQUEST:
      return {
        ...state,
        TableLoading: true,
        role: payload.role,
      };
    case actions.BANHANH_GET_INIT_DATA_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachBaoTang: payload.DanhSachBaoTang,
        // AllHuongDan: payload.AllHuongDan,
        TotalRow: payload.TotalRow,
        TotalUnit: payload.TotalUnit,
        TableLoading: false,
      };
    case actions.BANHANH_GET_INIT_DATA_REQUEST_ERROR:
      return {
        ...state,
        DanhSachBaoTang: [],
        TotalRow: 0,
        TotalUnit: 0,
        TableLoading: false,
      };
    //get list
    case actions.BANHANH_GET_LIST_REQUEST:
      return {
        ...state,
        TableLoading: true,
      };
    case actions.BANHANH_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachBanHanh: payload.DanhSachBanHanh,
        DanhSachBanHanhAll: payload.DanhSachBanHanhAll,
        // AllHuongDan: payload.AllHuongDan,
        TotalRow: payload.TotalRow,
        TotalUnit: payload.TotalUnit,
        TableLoading: false,
      };
    case actions.BANHANH_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhSachBanHanh: [],
        DanhSachBanHanhAll: [],
        TotalRow: 0,
        TotalUnit: 0,
        TableLoading: false,
      };
    default:
      return state;
  }
}
