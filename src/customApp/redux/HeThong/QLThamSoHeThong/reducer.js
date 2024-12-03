import actions from './actions'
const initialData = {
  DanhSachThamSoHeThong: [],
  TotalRow: 0,
  tableLoading : true
}

const reducer = (state = initialData,action) => {
  const {type, payload} = action;
  switch (type) {
    case actions.QUANLYTHAMSOHETHONG_GET_LIST_REQUEST:
      return {
        ...state,
        tableLoading : true
      }
    case actions.QUANLYTHAMSOHETHONG_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachThamSoHeThong: payload.DanhSachThamSoHeThong,
        TotalRow: payload.TotalRow,
        tableLoading: true
      }
    case actions.QUANLYTHAMSOHETHONG_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhSachThamSoHeThong: [],
        TotalRow : 0,
        tableLoading : false
      }
    default :
      return state;
  }
}

export default reducer