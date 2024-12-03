import actions from './actions';

const initState = {
  DanhSachTraCuuPubLic: [],
  DanhSachLichTiepDan: [],
  DanhSachTrinhTuThuTuc: [],
  DanhSachCoQuan: [],
  TotalRow: 0,
  TotalRowLichTiepDan: 0,
  TotalRowTrinhTuThuTuc: 0,
  TableLoading: false,
};

export default function Reducer(state = initState, action) {
  const {type, payload} = action;
  switch (type) {
    case actions.LICHTIEPDAN_CLEAR:
      return {
        ...state,
        TotalRow: 0,
        DanhSachTraCuuPubLic: [],
      };
    case actions.LICHTIEPDAN_GET_LIST_REQUEST:
      return {
        ...state,
      };
    case actions.LICHTIEPDAN_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachLichTiepDan: payload.DanhSachLichTiepDan,
        TotalRowLichTiepDan: payload.TotalRowLichTiepDan,
      };
    case actions.LICHTIEPDAN_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhSachLichTiepDan: [],
        TotalRowLichTiepDan: 0,
      };
    case actions.TRINHTUTHUTUC_GET_LIST_REQUEST:
      return {
        ...state,
      };
    case actions.TRINHTUTHUTUC_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachTrinhTuThuTuc: payload.DanhSachTrinhTuThuTuc,
        TotalRowTrinhTuThuTuc: payload.TotalRowTrinhTuThuTuc,
      };
    case actions.TRINHTUTHUTUC_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhSachTrinhTuThuTuc: [],
        TotalRowTrinhTuThuTuc: 0,
      };
    case actions.TRACUU_GET_INIT_REQUEST:
      return {
        ...state,
        TableLoading: true,
      };
    case actions.TRACUU_GET_INIT_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachCoQuan: payload.DanhSachCoQuan,
        TableLoading: false,
      };
    case actions.TRACUU_GET_INIT_REQUEST_ERROR:
      return {
        ...state,
        DanhSachCoQuan: [],
        TableLoading: false,
      };
    //public
    case actions.TRACUU_PUBLIC_GET_LIST_REQUEST:
      return {
        ...state,
        TableLoading: true,
      };
    case actions.TRACUU_PUBLIC_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachTraCuuPubLic: payload.DanhSachTraCuuPubLic,
        TotalRow: payload.TotalRow,
        TableLoading: false,
      };
    case actions.TRACUU_PUBLIC_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhSachTraCuuPubLic: [],
        TotalRow: 0,
        TableLoading: false,
      };
    default:
      return state;
  }
}
