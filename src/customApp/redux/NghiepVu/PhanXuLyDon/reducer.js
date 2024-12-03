import actions from './actions';
const initialData = {
  DanhSachCanBoXuLy: [],
  DanhSachPhanXuLy: [],
  DanhSachTenFile: [],
  DanhSachLoaiKhieuTo: [],
  TotalRow: 0,
  tableLoading: true,
};

const reducer = (state = initialData, action) => {
  const {type, payload} = action;
  switch (type) {
    case actions.PHANXULYDON_GET_INIT_REQUEST:
      return {
        ...state,
        tableLoading: true,
      };
    case actions.PHANXULYDON_GET_INIT_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachCanBoXuLy: payload.DanhSachCanBoXuLy,
        DanhSachTenFile: payload.DanhSachTenFile,
        DanhSachLoaiKhieuTo: payload.DanhSachLoaiKhieuTo,
        tableLoading: false,
      };
    case actions.PHANXULYDON_GET_INIT_REQUEST_ERROR:
      return {
        ...state,
        DanhSachCanBoXuLy: [],
        DanhSachTenFile: [],
        tableLoading: false,
      };
    case actions.PHANXULYDON_GET_LIST_REQUEST:
      return {
        ...state,
        tableLoading: true,
      };
    case actions.PHANXULYDON_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachPhanXuLy: payload.DanhSachPhanXuLy,
        TotalRow: payload.TotalRow,
        tableLoading: false,
      };
    case actions.PHANXULYDON_GET_LIST_REQUEST_ERROR:
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
