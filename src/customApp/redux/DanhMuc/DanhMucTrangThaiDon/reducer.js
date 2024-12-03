import actions from './actions'
const initialData = {
  DanhSachTrangThaiDon : [],
  TotalRow: 0,
  tableLoading : true
}

const reducer = (state = initialData,action) => {
  const {type, payload} = action;
  switch (type) {
    case actions.DANHMUCTRANGTHAIDON_GET_LIST_REQUEST:
      return {
        ...state,
        tableLoading : true
      }
    case actions.DANHMUCTRANGTHAIDON_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachTrangThaiDon: payload.DanhSachTrangThaiDon,
        TotalRow: payload.TotalRow,
        tableLoading: true
      }
    case actions.DANHMUCTRANGTHAIDON_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhSachTrangThaiDon: [],
        TotalRow : 0,
        tableLoading : false
      }
    default :
      return state;
  }
}

export default reducer