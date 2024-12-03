import actions from "./action";
const initialData = {
  DanhSachHuongGiaiQuyet: [],
  TotalRow: 0,
  tableLoading: true,
};

const DanhMucHGQ = (state = initialData, action) => {
  const { type, payload } = action;
  switch (type) {
    case actions.DANHMUCHUONGGIAIQUYET_GET_LIST_REQUEST:
      return {
        ...state,
        tableLoading: true,
      };
    case actions.DANHMUCHUONGGIAIQUYET_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachHuongGiaiQuyet: payload.DanhSachHuongGiaiQuyet,
        TotalRow: payload.TotalRow,
        tableLoading: true,
      };
    case actions.DANHMUCHUONGGIAIQUYET_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhSachHuongGiaiQuyet: [],
        TotalRow: 0,
        tableLoading: false,
      };
    default:
      return state;
  }
};

export default DanhMucHGQ;
