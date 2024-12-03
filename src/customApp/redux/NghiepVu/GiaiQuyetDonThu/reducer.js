import actions from './actions';
const initialData = {
  DanhSachGiaiQuyetDonThu: [],
  DanhSachHuongXuLy: [],
  TotalRow: 0,
  tableLoading: true,
};

const reducer = (state = initialData, action) => {
  const {type, payload} = action;
  switch (type) {
    case actions.GIAIQUYETDONTHU_GET_LIST_REQUEST:
      return {
        ...state,
        tableLoading: true,
      };
    case actions.GIAIQUYETDONTHU_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachGiaiQuyetDonThu: payload.DanhSachGiaiQuyetDonThu,
        DanhSachHuongXuLy: payload.DanhSachHuongXuLy,
        TotalRow: payload.TotalRow,
        tableLoading: true,
      };
    case actions.GIAIQUYETDONTHU_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhSachGiaiQuyetDonThu: [],
        DanhSachHuongXuLy: [],
        TotalRow: 0,
        tableLoading: false,
      };
    default:
      return state;
  }
};

export default reducer;
