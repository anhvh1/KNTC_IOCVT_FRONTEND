import actions from './actions';

const initState = {
  role: {view: 0, add: 0, edit: 0, delete: 0},
  DanhSachNoiDungThanhTraKiemTra: [],
  TotalRow: 0,
  TableLoading: false,
};

export default function Reducer(state = initState, action) {
  const {type, payload} = action;
  switch (type) {
    //get initData
    case actions.NOIDUNGTHANHTRAKIEMTRA_GET_INIT_DATA_REQUEST:
      return {
        ...state,
        TableLoading: true,
        role: payload.role,
      };
    case actions.NOIDUNGTHANHTRAKIEMTRA_GET_INIT_DATA_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachNoiDungThanhTraKiemTra: payload.DanhSachNoiDungThanhTraKiemTra,
        // AllHuongDan: payload.AllHuongDan,
        TotalRow: payload.TotalRow,
        TableLoading: false,
      };
    case actions.NOIDUNGTHANHTRAKIEMTRA_GET_INIT_DATA_REQUEST_ERROR:
      return {
        ...state,
        DanhSachNoiDungThanhTraKiemTra: [],
        TotalRow: 0,
        TableLoading: false,
      };
    //get list
    case actions.NOIDUNGTHANHTRAKIEMTRA_GET_LIST_REQUEST:
      return {
        ...state,
        TableLoading: true,
      };
    case actions.NOIDUNGTHANHTRAKIEMTRA_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachNoiDungThanhTraKiemTra: payload.DanhSachNoiDungThanhTraKiemTra,
        // AllHuongDan: payload.AllHuongDan,
        TotalRow: payload.TotalRow,
        TableLoading: false,
      };
    case actions.NOIDUNGTHANHTRAKIEMTRA_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhSachNoiDungThanhTraKiemTra: [],
        TotalRow: 0,
        TableLoading: false,
      };
    default:
      return state;
  }
}
