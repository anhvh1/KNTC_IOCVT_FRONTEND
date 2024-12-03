import actions from './actions';
const initialData = {
  DanhSachLichTiepDan: [],
  DanhSachCoQuan: [],
  TotalRow: 0,
  tableLoading: true,
};

const reducer = (state = initialData, action) => {
  const {type, payload} = action;
  switch (type) {
    case actions.QLLICHTIEPDAN_GET_INIT_REQUEST:
      return {
        ...state,
        tableLoading: true,
      };
    case actions.QLLICHTIEPDAN_GET_INIT_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachCoQuan: payload.DanhSachCoQuan,
      };
    case actions.QLLICHTIEPDAN_GET_INIT_REQUEST_ERROR:
      return {
        ...state,
        DanhSachCoQuan: [],
      };
    case actions.QLLICHTIEPDAN_GET_LIST_REQUEST:
      return {
        ...state,
        tableLoading: true,
      };
    case actions.QLLICHTIEPDAN_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachLichTiepDan: payload.DanhSachLichTiepDan,
        TotalRow: payload.TotalRow,
        tableLoading: true,
      };
    case actions.QLLICHTIEPDAN_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhSachLichTiepDan: [],
        TotalRow: 0,
        tableLoading: false,
      };

    default:
      return state;
  }
};

export default reducer;
