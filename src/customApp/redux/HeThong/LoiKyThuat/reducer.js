import actions from "./actions";

const initState = {
  LoiKyThuat: [],
  LoiKyThuatAll: [],
  TotalRow: 0,
  TableLoading: false,
};

export default function Reducer(state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case actions.LOIKYTHUAT_GET_LIST_REQUEST:
      return {
        ...state,
        TableLoading: true,
      };
    case actions.LOIKYTHUAT_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        LoiKyThuat: payload.LoiKyThuat,
        LoiKyThuatAll: payload.LoiKyThuatAll,
        TotalRow: payload.TotalRow,
        TableLoading: false,
      };
    case actions.LOIKYTHUAT_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        LoiKyThuat: [],
        TotalRow: 0,
        TableLoading: false,
      };
    default:
      return state;
  }
}
