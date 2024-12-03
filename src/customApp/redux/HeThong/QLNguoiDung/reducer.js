import actions from "./actions";
const initState = {
  ListNguoiDung: [],
  DanhSachChucVu: [],
  DanhSachCoQuan: [],
  defaultExpandedKeys: [],
  TotalRow: 0,
  tableLoading: false,
};

const reducer = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actions.USERMANAGERMENT_GET_LIST_REQUEST:
      return {
        ...state,
        tableLoading: true,
      };
    case actions.USERMANAGERMENT_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        tableLoading: false,
        TotalRow: payload.TotalRow,
        ListNguoiDung: payload.ListNguoiDung,
      };
    case actions.USERMANAGERMENT_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        ListNguoiDung: [],
        TotalRow: 0,
        tableLoading: false,
      };

    case actions.USERMANAGERMENT_GET_INIT_REQUEST:
      return {
        ...state,
      };
    case actions.USERMANAGERMENT_GET_INIT_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachChucVu: payload.DanhSachChucVu,
        DanhSachCoQuan: payload.DanhSachCoQuan,
      };
    case actions.USERMANAGERMENT_GET_INIT_REQUEST_ERROR:
      return {
        ...state,
        DanhSachChucVu: [],
        DanhSachCoQuan: [],
      };
    default:
      return state;
  }
};

export default reducer;
