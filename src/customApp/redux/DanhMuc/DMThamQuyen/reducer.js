import actions from './actions'
const initialData = {
  DanhSachThamQuyen : [],
  TotalRow: 0,
  tableLoading : true
}

const reducer = (state = initialData,action) => {
  const {type, payload} = action;
  switch (type) {
    case actions.DANHMUCTHAMQUYEN_GET_LIST_REQUEST:
      return {
        ...state,
        tableLoading : true
      }
    case actions.DANHMUCTHAMQUYEN_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachThamQuyen: payload.DanhSachThamQuyen,
        TotalRow: payload.TotalRow,
        tableLoading: true
      }
    case actions.DANHMUCTHAMQUYEN_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhSachThamQuyen: [],
        TotalRow : 0,
        tableLoading : false
      }
    default :
      return state;
  }
}

export default reducer