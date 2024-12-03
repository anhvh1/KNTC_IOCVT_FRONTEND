import actions from './actions';
const initialData = {
  DanhMucBieuMau: [],
  DanhSachBieuMauAll: [],
  TotalRow: 0,
  tableLoading: true,
};

const DanhMucBieuMau = (state = initialData, action) => {
  const {type, payload} = action;
  switch (type) {
    // case actions.DANHMUCBIEUMAU_GET_INIT_REQUEST:
    //   return {
    //     ...state,
    //   };
    // case actions.DANHMUCBIEUMAU_GET_INIT_REQUEST_SUCCESS:
    //   return {
    //     ...state,
    //   };
    // case actions.DANHMUCBIEUMAU_GET_INIT_REQUEST_ERROR:
    //   return {
    //     ...state,
    //   };
    case actions.DANHMUCBIEUMAU_GET_LIST_REQUEST:
      return {
        ...state,
        tableLoading: true,
      };
    case actions.DANHMUCBIEUMAU_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhMucBieuMau: payload.DanhMucBieuMau,
        DanhSachBieuMauAll: payload.DanhSachBieuMauAll,
        TotalRow: payload.TotalRow,
        tableLoading: true,
      };
    case actions.DANHMUCBIEUMAU_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhMucBieuMau: [],
        TotalRow: 0,
        tableLoading: false,
        DanhSachBieuMauAll: [],
      };
    default:
      return state;
  }
};

export default DanhMucBieuMau;
