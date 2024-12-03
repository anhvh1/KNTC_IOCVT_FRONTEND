import actions from './action';

const initState = {
  ThongTinBaoCao: {},
  ThongTinBaoCaoChiTiet: {},
  TotalRow: 0,
  tableLoading: false,
};

const reducer = (state = initState, action) => {
  const {type, payload} = action;

  switch (type) {
    case actions.GETBAOCAOTCD02_INIT_REQUEST:
      return {
        ...state,
        tableLoading: true,
      };
    case actions.GETBAOCAOTCD02_INIT_REQUEST_SUCCESS:
      return {
        ...state,
        ThongTinBaoCao: payload.ThongTinBaoCao,
        TotalRow: payload.TotalRow,
        tableLoading: false,
      };
    case actions.GETBAOCAOTCD02_INIT_REQUEST_ERROR:
      return {
        ...state,
        ThongTinBaoCao: {},
        TotalRow: 0,
        tableLoading: false,
      };
    case actions.CLEAR_DATA_BAOCAO:
      return {
        ...state,
        ThongTinBaoCao: {},
        TotalRow: 0,
        tableLoading: false,
      };

    // case actions.GETTHONGTINCHITIETBAOCAO_REQUEST:
    //   return {
    //     ...state,
    //     tableLoading: true,
    //   };
    // case actions.GETTHONGTINCHITIETBAOCAO_REQUEST_SUCCESS:
    //   return {
    //     ...state,
    //     ThongTinBaoCao: payload.ThongTinBaoCao,
    //     TotalRow: payload.TotalRow,
    //     tableLoading: false,
    //   };
    // case actions.GETTHONGTINCHITIETBAOCAO_REQUEST_ERROR:
    //   return {
    //     ...state,
    //     ThongTinBaoCao: {},
    //     TotalRow: 0,
    //     tableLoading: false,
    //   };
    default:
      return {
        ...state,
      };
  }
};

export default reducer;
