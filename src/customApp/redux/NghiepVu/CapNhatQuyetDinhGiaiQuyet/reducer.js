import actions from './actions';
const initialData = {
  DanhSachQDGiaiQuyet: [],
  DanhSachHuongXuLy: [],
  DanhSachCoQuan: [],
  DanhSachCoQuanCapHuyen: [],
  DanhSachLoaiKhieuTo: [],
  TotalRow: 0,
  tableLoading: true,
};

const reducer = (state = initialData, action) => {
  const {type, payload} = action;
  switch (type) {
    case actions.CAPNHATQDGIAIQUYET_GET_INIT_REQUEST:
      return {
        ...state,
      };
    case actions.CAPNHATQDGIAIQUYET_GET_INIT_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachHuongXuLy: payload.DanhSachHuongXuLy,
        DanhSachCoQuan: payload.DanhSachCoQuan,
        DanhSachCoQuanCapHuyen: payload.DanhSachCoQuanCapHuyen,
        DanhSachLoaiKhieuTo: payload.DanhSachLoaiKhieuTo,
        TotalRow: payload.TotalRow,
      };
    case actions.CAPNHATQDGIAIQUYET_GET_INIT_REQUEST_ERROR:
      return {
        ...state,
        DanhSachHuongXuLy: [],
        DanhSachCoQuan: [],
        DanhSachCoQuanCapHuyen: [],
        TotalRow: 0,
      };
    case actions.CAPNHATQDGIAIQUYET_GET_LIST_REQUEST:
      return {
        ...state,
        tableLoading: true,
      };
    case actions.CAPNHATQDGIAIQUYET_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachQDGiaiQuyet: payload.DanhSachQDGiaiQuyet,
        TotalRow: payload.TotalRow,
        tableLoading: false,
      };
    case actions.CAPNHATQDGIAIQUYET_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhSachQDGiaiQuyet: [],
        TotalRow: 0,
        tableLoading: false,
      };
    default:
      return state;
  }
};

export default reducer;
