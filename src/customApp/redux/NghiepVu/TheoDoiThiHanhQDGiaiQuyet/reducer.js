import actions from './actions';
const initialData = {
  DanhSachThiHanhQDGiaiQuyet: [],
  DanhSachHuongXuLy: [],
  DanhSachLoaiKhieuTo: [],
  DanhSachCoQuan: [],
  TotalRow: 0,
  tableLoading: true,
};

const reducer = (state = initialData, action) => {
  const {type, payload} = action;
  switch (type) {
    case actions.TheoDoiThiHanhQDGiaiQuyet_GET_INIT_REQUEST:
      return {
        ...state,
      };
    case actions.TheoDoiThiHanhQDGiaiQuyet_GET_INIT_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachHuongXuLy: payload.DanhSachHuongXuLy,
        DanhSachCoQuan: payload.DanhSachCoQuan,
        DanhSachLoaiKhieuTo: payload.DanhSachLoaiKhieuTo,
      };
    case actions.TheoDoiThiHanhQDGiaiQuyet_GET_INIT_REQUEST_ERROR:
      return {
        ...state,
        DanhSachHuongXuLy: [],
        DanhSachCoQuan: [],
        DanhSachLoaiKhieuTo: [],
      };
    case actions.TheoDoiThiHanhQDGiaiQuyet_GET_LIST_REQUEST:
      return {
        ...state,
        tableLoading: true,
      };
    case actions.TheoDoiThiHanhQDGiaiQuyet_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachThiHanhQDGiaiQuyet: payload.DanhSachThiHanhQDGiaiQuyet,
        TotalRow: payload.TotalRow,
        tableLoading: false,
      };
    case actions.TheoDoiThiHanhQDGiaiQuyet_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhSachThiHanhQDGiaiQuyet: [],
        TotalRow: 0,
        tableLoading: false,
      };
    default:
      return state;
  }
};

export default reducer;
