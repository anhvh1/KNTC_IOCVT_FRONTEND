import actions from './fileActions'
const initialData = {
  DanhSachFile : [],
  TotalRow: 0,
  tableLoading : true
}

const reducer = (state = initialData,action) => {
  const {type, payload} = action;
  switch (type) {
    case actions.DANHMUCFILE_GET_LIST_REQUEST:
      return {
        ...state,
        tableLoading : true
      }
    case actions.DANHMUCFILE_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachFile: payload.DanhSachFile,
        TotalRow: payload.TotalRow,
        tableLoading: true
      }
    case actions.DANHMUCFILE_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhSachFile: [],
        TotalRow : 0,
        tableLoading : false
      }
    default :
      return state;
  }
}

export default reducer