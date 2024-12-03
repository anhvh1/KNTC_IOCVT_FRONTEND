import actions from './nhomFileActions'
const initialData = {
  DanhSachNhomFile : [],
  TotalRow: 0,
  tableLoading : true
}

const reducer = (state = initialData,action) => {
  const {type, payload} = action;
  switch (type) {
    case actions.DANHMUCNHOMFILE_GET_LIST_REQUEST:
      return {
        ...state,
        tableLoading : true
      }
    case actions.DANHMUCNHOMFILE_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachNhomFile: payload.DanhSachNhomFile,
        TotalRow: payload.TotalRow,
        tableLoading: true
      }
    case actions.DANHMUCNHOMFILE_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhSachNhomFile: [],
        TotalRow : 0,
        tableLoading : false
      }
    default :
      return state;
  }
}

export default reducer