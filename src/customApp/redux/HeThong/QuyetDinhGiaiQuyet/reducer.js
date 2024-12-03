import actions from './actions';
const initialData = {
  DanhSachQuyetDinhGiaiQuyet: [],
  TotalRow: 0,
  tableLoading: true,
};

const reducer = (state = initialData, action) => {
  const {type, payload} = action;
  switch (type) {
    case actions.QUYETDINHGIAIQUYET_GET_LIST_REQUEST:
      return {
        ...state,
        tableLoading: true,
      };
    case actions.QUYETDINHGIAIQUYET_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachQuyetDinhGiaiQuyet: payload.DanhSachQuyetDinhGiaiQuyet,
        TotalRow: payload.TotalRow,
        tableLoading: true,
      };
    case actions.QUYETDINHGIAIQUYET_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhSachQuyetDinhGiaiQuyet: [],
        TotalRow: 0,
        tableLoading: false,
      };
    case actions.QUYETDINHGIAIQUYET_GET_INIT_REQUEST:
      return {
        ...state,
      };
    case actions.QUYETDINHGIAIQUYET_GET_INIT_REQUEST_SUCCESS:
      return {
        ...state,
      };
    case actions.QUYETDINHGIAIQUYET_GET_INIT_REQUEST_ERROR:
      return {
        ...state,
      };
    default:
      return state;
  }
};

export default reducer;
