import actions from './action';
const initState = {
  role: {view: 0, add: 0, edit: 0, delete: 0},
  DanhSachDashBoard: [],
  TotalRow: 0,
  TableLoading: false,
};

export default function Reducer(state = initState, action) {
  const {type, payload} = action;
  switch (type) {
    //get initData
    case actions.DASHBOARD_GET_INIT_DATA_REQUEST:
      return {
        ...state,
        TableLoading: true,
        role: payload.role,
      };
    case actions.DASHBOARD_GET_INIT_DATA_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachDashBoard: payload.DanhSachDashBoard,
        // AllHuongDan: payload.AllHuongDan,
        TotalRow: payload.TotalRow,
        TableLoading: false,
      };
    case actions.DASHBOARD_GET_INIT_DATA_REQUEST_ERROR:
      return {
        ...state,
        DanhSachDashBoard: [],
        TotalRow: 0,
        TableLoading: false,
      };
    //get list
    case actions.DASHBOARD_GET_LIST_REQUEST:
      return {
        ...state,
        TableLoading: true,
      };
    case actions.DASHBOARD_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachDashBoard: payload.DanhSachDashBoard,
        // AllHuongDan: payload.AllHuongDan,
        TotalRow: payload.TotalRow,
        TableLoading: false,
      };
    case actions.DASHBOARD_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhSachDashBoard: [],
        TotalRow: 0,
        TableLoading: false,
      };
    default:
      return state;
  }
}
