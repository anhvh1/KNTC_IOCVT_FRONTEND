import actions from './actions'
const initialData = {
  DanhSachPhanTichKQ : [],
  TotalRow: 0,
  tableLoading : true
}

const reducer = (state = initialData,action) => {
  const {type, payload} = action;
  switch (type) {
    case actions.DANHMUCPHANTICHKQ_GET_LIST_REQUEST:
      return {
        ...state,
        tableLoading : true
      }
    case actions.DANHMUCPHANTICHKQ_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachPhanTichKQ: payload.DanhSachPhanTichKQ,
        TotalRow: payload.TotalRow,
        tableLoading: true
      }
    case actions.DANHMUCPHANTICHKQ_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhSachPhanTichKQ: [],
        TotalRow : 0,
        tableLoading : false
      }
    default :
      return state;
  }
}

export default reducer