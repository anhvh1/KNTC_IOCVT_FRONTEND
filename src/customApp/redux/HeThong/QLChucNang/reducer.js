import actions from "./actions";
const initialState = {
  tableLoading: true,
  DanhSachChucNang: [],
  TotalRow: 0,
};

const reducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actions.QLCHUCNANG_GET_LIST_REQUEST:
      return {
        ...state,
        tableLoading: true,
      };
    case actions.QLCHUCNANG_GET_LIST_SUCCESS:
      return {
        ...state,
        tableLoading: true,
        DanhSachChucNang: payload.DanhSachChucNang,
        TotalRow: payload.TotalRow,
      };
    case actions.QLCHUCNANG_GET_LIST_ERROR:
      return {
        ...state,
        tableLoading: false,
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
