import actions from './actions';
const initialData = {
  DanhSachDonThuDonDoc: [],
  DanhSachHuongXuLy: [],
  DanhSachLoaiKhieuTo: [],
  TotalRow: 0,
  tableLoading: true,
};

const reducer = (state = initialData, action) => {
  const {type, payload} = action;
  switch (type) {
    case actions.QUANLYDONTHUDONDOC_GET_INIT_REQUEST:
      return {
        ...state,
      };
    case actions.QUANLYDONTHUDONDOC_GET_INIT_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachHuongXuLy: payload.DanhSachHuongXuLy,
        DanhSachLoaiKhieuTo: payload.DanhSachLoaiKhieuTo,
      };
    case actions.QUANLYDONTHUDONDOC_GET_INIT_REQUEST_ERROR:
      return {
        ...state,
        DanhSachHuongXuLy: [],
        DanhSachLoaiKhieuTo: [],
      };
    case actions.QUANLYDONTHUDONDOC_GET_LIST_REQUEST:
      return {
        ...state,
        tableLoading: true,
      };
    case actions.QUANLYDONTHUDONDOC_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachDonThuDonDoc: payload.DanhSachDonThuDonDoc,
        TotalRow: payload.TotalRow,
        tableLoading: false,
      };
    case actions.QUANLYDONTHUDONDOC_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhSachDonThuDonDoc: [],
        TotalRow: 0,
        tableLoading: false,
      };
    default:
      return state;
  }
};

export default reducer;
