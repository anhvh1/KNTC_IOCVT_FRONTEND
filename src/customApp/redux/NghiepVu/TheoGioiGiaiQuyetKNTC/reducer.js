import actions from './actions';
const initialData = {
  DanhSachTheoDoiGiaiQuyet: [],
  DanhSachHuongXuLy: [],
  DanhSachCoQuan: [],
  DanhSachLoaiKhieuTo: [],
  DanhSachCoQuanQDGiaoXacMinh: [],
  TotalRow: 0,
  tableLoading: true,
};

const reducer = (state = initialData, action) => {
  const {type, payload} = action;
  switch (type) {
    case actions.THEOGIOIGIAIQUYET_GET_INIT_REQUEST:
      return {
        ...state,
        tableLoading: true,
      };
    case actions.THEOGIOIGIAIQUYET_GET_INIT_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachHuongXuLy: payload.DanhSachHuongXuLy,
        DanhSachCoQuan: payload.DanhSachCoQuan,
        DanhSachCoQuanQDGiaoXacMinh: payload.DanhSachCoQuanQDGiaoXacMinh,
        DanhSachLoaiKhieuTo: payload.DanhSachLoaiKhieuTo,
      };
    case actions.THEOGIOIGIAIQUYET_GET_INIT_REQUEST_ERROR:
      return {
        ...state,
        DanhSachHuongXuLy: [],
        DanhSachCoQuan: [],
        DanhSachLoaiKhieuTo: [],
        DanhSachCoQuanQDGiaoXacMinh: [],
      };
    case actions.THEOGIOIGIAIQUYET_GET_LIST_REQUEST:
      return {
        ...state,
        tableLoading: true,
      };
    case actions.THEOGIOIGIAIQUYET_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachTheoDoiGiaiQuyet: payload.DanhSachTheoDoiGiaiQuyet,
        TotalRow: payload.TotalRow,
        tableLoading: false,
      };
    case actions.THEOGIOIGIAIQUYET_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhSachTheoDoiGiaiQuyet: [],
        TotalRow: 0,
        tableLoading: false,
      };
    default:
      return state;
  }
};

export default reducer;
