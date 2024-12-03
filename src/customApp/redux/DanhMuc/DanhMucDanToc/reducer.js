import actions from "./action";

const initState = {
  DanhSachDanToc: [],
  TotalRow: 0,
  tableLoading: true,
};

const ReducerDanToc = (state = initState, action) => {
  const { type, payload } = action;
  switch (type) {
    case actions.GET_DATA_DANTOC:
      return {
        ...state,
        tableLoading: true,
      };
    case actions.GET_DATA_DANTOC_SUCCESS:
      return {
        ...state,
        DanhSachDanToc: payload.DanhSachDanToc,
        TotalRow: payload.TotalRow,
        tableLoading: true,
      };
    case actions.GET_DATA_DANTOC_ERROR:
      return {
        ...state,
        DanhSachDanToc: [],
        TotalRow: 0,
        tableLoading: false,
      };
    default:
      return {
        ...state,
      };
  }
};

export default ReducerDanToc;
