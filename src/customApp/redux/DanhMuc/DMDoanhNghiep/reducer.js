import actions from './actions';

const initState = {
  role: {view: 0, add: 0, edit: 0, delete: 0},
  DanhSachDoanhNghiep: [],
  TotalRow: 0,
  TableLoading: false,
};

export default function Reducer(state = initState, action) {
  const {type, payload} = action;
  switch (type) {
    //get initData
    case actions.DOANHNGHIEP_GET_INIT_DATA_REQUEST:
      return {
        ...state,
        TableLoading: true,
        role: payload.role,
      };
    case actions.DOANHNGHIEP_GET_INIT_DATA_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachDoanhNghiep: payload.DanhSachDoanhNghiep,
        // AllHuongDan: payload.AllHuongDan,
        TotalRow: payload.TotalRow,
        TableLoading: false,
      };
    case actions.DOANHNGHIEP_GET_INIT_DATA_REQUEST_ERROR:
      return {
        ...state,
        DanhSachDoanhNghiep: [],
        TotalRow: 0,
        TableLoading: false,
      };
    //get list
    case actions.DOANHNGHIEP_GET_LIST_REQUEST:
      return {
        ...state,
        TableLoading: true,
      };
    case actions.DOANHNGHIEP_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachDoanhNghiep: payload.DanhSachDoanhNghiep,
        // AllHuongDan: payload.AllHuongDan,
        TotalRow: payload.TotalRow,
        TableLoading: false,
      };
    case actions.DOANHNGHIEP_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhSachDoanhNghiep: [],
        TotalRow: 0,
        TableLoading: false,
      };
    default:
      return state;
  }
}
