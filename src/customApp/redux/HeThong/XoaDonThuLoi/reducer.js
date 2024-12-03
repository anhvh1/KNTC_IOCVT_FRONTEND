import actions from './actions';
const initialData = {
  DanhSachDonThuLoi: [],
  DanhSachLoaiKhieuTo: [],
  TotalRow: 0,
  tableLoading: true,
};

const reducer = (state = initialData, action) => {
  const {type, payload} = action;
  switch (type) {
    case actions.DANHSACHDONTHULOI_GET_INIT_REQUEST:
      return {
        ...state,
        tableLoading: true,
      };
    case actions.DANHSACHDONTHULOI_GET_INIT_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachLoaiKhieuTo: payload.DanhSachLoaiKhieuTo,
      };
    case actions.DANHSACHDONTHULOI_GET_INIT_REQUEST_ERROR:
      return {
        ...state,
        DanhSachLoaiKhieuTo: [],
      };
    case actions.DANHSACHDONTHULOI_GET_LIST_REQUEST:
      return {
        ...state,
        tableLoading: true,
      };
    case actions.DANHSACHDONTHULOI_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachDonThuLoi: payload.DanhSachDonThuLoi,
        TotalRow: payload.TotalRow,
        tableLoading: false,
      };
    case actions.DANHSACHDONTHULOI_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhSachDonThuLoi: [],
        TotalRow: 0,
        tableLoading: false,
      };
    default:
      return state;
  }
};

export default reducer;
