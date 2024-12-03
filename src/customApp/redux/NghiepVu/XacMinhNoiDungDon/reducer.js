import actions from './actions';
const initialData = {
  DanhSachCanBoXuLy: [],
  DanhSachXacMinhNoiDungDon: [],
  DanhSachTenFile: [],
  TotalRow: 0,
  tableLoading: true,
};

const reducer = (state = initialData, action) => {
  const {type, payload} = action;
  switch (type) {
    case actions.XACMINHNOIDUNGDON_GET_INIT_REQUEST:
      return {
        ...state,
        tableLoading: true,
      };
    case actions.XACMINHNOIDUNGDON_GET_INIT_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachCanBoXuLy: payload.DanhSachCanBoXuLy,
        DanhSachTenFile: payload.DanhSachTenFile,
        tableLoading: true,
      };
    case actions.XACMINHNOIDUNGDON_GET_INIT_REQUEST_ERROR:
      return {
        ...state,
        DanhSachCanBoXuLy: [],
        DanhSachTenFile: [],
        tableLoading: false,
      };
    case actions.XACMINHNOIDUNGDON_GET_LIST_REQUEST:
      return {
        ...state,
        tableLoading: true,
      };
    case actions.XACMINHNOIDUNGDON_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachXacMinhNoiDungDon: payload.DanhSachXacMinhNoiDungDon,
        TotalRow: payload.TotalRow,
        tableLoading: true,
      };
    case actions.XACMINHNOIDUNGDON_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhSachXacMinhNoiDungDon: [],
        TotalRow: 0,
        tableLoading: false,
      };
    default:
      return state;
  }
};

export default reducer;
