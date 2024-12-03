import actions from "./actions";
const initialData = {
  HuongDanSuDung: [],
  TotalRow: 0,
  tableLoading: true,
};

const reducer = (state = initialData, action) => {
  const { type, payload } = action;
  switch (type) {
    case actions.HUONGDANSUDUNG_GET_LIST_REQUEST:
      return {
        ...state,
        tableLoading: true,
      };
    case actions.HUONGDANSUDUNG_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        HuongDanSuDung: payload.HuongDanSuDung,
        TotalRow: payload.TotalRow,
        tableLoading: true,
      };
    case actions.HUONGDANSUDUNG_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        // HuongDanSuDung: [],
        // TotalRow: 0,
        tableLoading: false,
      };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
