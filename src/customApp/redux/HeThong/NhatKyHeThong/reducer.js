import actions from './actions';

const initState = {
  NhatKyHeThong: [],
  NhatKyHeThongAll: [],
  TotalRow: 0,
  TableLoading: false,
};

export default function Reducer(state = initState, action) {
  const {type, payload} = action;
  switch (type) {
    case actions.NHATKYHETHONG_GET_LIST_REQUEST:
      return {
        ...state,
        TableLoading: true,
      };
    case actions.NHATKYHETHONG_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        NhatKyHeThong: payload.NhatKyHeThong,
        NhatKyHeThongAll: payload.NhatKyHeThongAll,
        TotalRow: payload.TotalRow,
        TableLoading: false,
      };
    case actions.NHATKYHETHONG_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        NhatKyHeThong: [],
        TotalRow: 0,
        TableLoading: false,
      };
    default:
      return state;
  }
}
