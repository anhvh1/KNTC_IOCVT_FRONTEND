import actions from './actions'
const initialData = {
  DanhSachFileDinhKem : [],
  TotalRow: 0,
  tableLoading : true
}

const reducer = (state = initialData,action) => {
  const {type, payload} = action;
  switch (type) {
    case actions.DANHMUCFILEDINHKEM_GET_LIST_REQUEST:
      return {
        ...state,
        tableLoading : true
      }
    case actions.DANHMUCFILEDINHKEM_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachFileDinhKem: payload.DanhSachFileDinhKem,
        TotalRow: payload.TotalRow,
        tableLoading: true
      }
    case actions.DANHMUCFILEDINHKEM_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhSachFileDinhKem: [],
        TotalRow : 0,
        tableLoading : false
      }
    default :
      return state;
  }
}

export default reducer