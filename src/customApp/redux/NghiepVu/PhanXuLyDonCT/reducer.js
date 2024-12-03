import actions from './actions';
const initialData = {
  DanhSachCanBoXuLy: [],
  DanhSachPhanXuLy: [],
  DanhSachTenFile: [],
  DanhSachCoQuanPhanXuLy: [],
  DanhSachLoaiKhieuTo: [],
  TotalRow: 0,
  tableLoading: true,
};

const reducer = (state = initialData, action) => {
  const {type, payload} = action;
  switch (type) {
    case actions.PHANXULYDONCT_GET_INIT_REQUEST:
      return {
        ...state,
        tableLoading: true,
      };
    case actions.PHANXULYDONCT_GET_INIT_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachCanBoXuLy: payload.DanhSachCanBoXuLy,
        DanhSachTenFile: payload.DanhSachTenFile,
        DanhSachLoaiKhieuTo: payload.DanhSachLoaiKhieuTo,
        DanhSachCoQuanPhanXuLy: payload.DanhSachCoQuanPhanXuLy,
        tableLoading: false,
      };
    case actions.PHANXULYDONCT_GET_INIT_REQUEST_ERROR:
      return {
        ...state,
        DanhSachCanBoXuLy: [],
        DanhSachCoQuanPhanXuLy: [],
        DanhSachTenFile: [],
        tableLoading: false,
      };
    case actions.PHANXULYDONCT_GET_LIST_REQUEST:
      return {
        ...state,
        tableLoading: true,
      };
    case actions.PHANXULYDONCT_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachPhanXuLy: payload.DanhSachPhanXuLy,
        TotalRow: payload.TotalRow,
        tableLoading: false,
      };
    case actions.PHANXULYDONCT_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhSachPhanXuLy: [],
        TotalRow: 0,
        tableLoading: false,
      };
    default:
      return state;
  }
};

export default reducer;
