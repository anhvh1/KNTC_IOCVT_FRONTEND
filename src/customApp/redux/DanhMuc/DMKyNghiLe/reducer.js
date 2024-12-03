import actions from './actions';

const initState = {
  role: {view: 0, add: 0, edit: 0, delete: 0},
  DanhSachKyNghiLe: [],
  TotalRow: 0,
  TableLoading: false,
};

export default function Reducer(state = initState, action) {
  const {type, payload} = action;
  switch (type) {
    //get initData
    case actions.KYNGHILE_GET_INIT_DATA_REQUEST:
      return {
        ...state,
        TableLoading: true,
        role: payload.role,
      };
    case actions.KYNGHILE_GET_INIT_DATA_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachKyNghiLe: payload.DanhSachKyNghiLe,
        // AllHuongDan: payload.AllHuongDan,
        TotalRow: payload.TotalRow,
        TableLoading: false,
      };
    case actions.KYNGHILE_GET_INIT_DATA_REQUEST_ERROR:
      return {
        ...state,
        DanhSachKyNghiLe: [],
        TotalRow: 0,
        TableLoading: false,
      };
    //get list
    case actions.KYNGHILE_GET_LIST_REQUEST:
      return {
        ...state,
        TableLoading: true,
      };
    case actions.KYNGHILE_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachKyNghiLe: payload.DanhSachKyNghiLe,
        // AllHuongDan: payload.AllHuongDan,
        TotalRow: payload.TotalRow,
        TableLoading: false,
      };
    case actions.KYNGHILE_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhSachKyNghiLe: [],
        TotalRow: 0,
        TableLoading: false,
      };
    default:
      return state;
  }
}
