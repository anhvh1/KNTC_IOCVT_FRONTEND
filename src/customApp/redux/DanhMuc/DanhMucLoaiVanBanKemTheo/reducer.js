import actions from "./actions";
const initialData = {
  DanhMucLoaiVanBanKemTheo: [],
  TotalRow: 0,
  tableLoading: true,
};

const DanhMucLoaiVanBanKemTheo = (state = initialData, action) => {
  const { type, payload } = action;
  switch (type) {
    case actions.DANHMUClOAIVANBANKEMTHEO_GET_LIST_REQUEST:
      return {
        ...state,
        tableLoading: true,
      };
    case actions.DANHMUClOAIVANBANKEMTHEO_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhMucLoaiVanBanKemTheo: payload.DanhMucLoaiVanBanKemTheo,
        TotalRow: payload.TotalRow,
        tableLoading: true,
      };
    case actions.DANHMUClOAIVANBANKEMTHEO_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhMucLoaiVanBanKemTheo: [],
        TotalRow: 0,
        tableLoading: false,
      };
    default:
      return state;
  }
};

export default DanhMucLoaiVanBanKemTheo;
