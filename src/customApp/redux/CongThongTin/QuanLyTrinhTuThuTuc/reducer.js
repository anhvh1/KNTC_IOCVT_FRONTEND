import actions from './actions';
const initialData = {
  DanhSachTrinhTuThuTuc: [],
  TotalRow: 0,
  tableLoading: true,
};

const reducer = (state = initialData, action) => {
  const {type, payload} = action;
  switch (type) {
    case actions.QLTRINHTUTHUTUC_GET_LIST_REQUEST:
      return {
        ...state,
        tableLoading: true,
      };
    case actions.QLTRINHTUTHUTUC_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachTrinhTuThuTuc: payload.DanhSachTrinhTuThuTuc,
        TotalRow: payload.TotalRow,
        tableLoading: true,
      };
    case actions.QLTRINHTUTHUTUC_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhSachTrinhTuThuTuc: [],
        TotalRow: 0,
        tableLoading: false,
      };
    default:
      return state;
  }
};

export default reducer;
