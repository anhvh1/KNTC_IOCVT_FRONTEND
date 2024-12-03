import actions from './fileActions'
const initialData = {
  DanhSachChucNangFile : [],
  TotalRow: 0,
  tableLoading : true
}

const reducer = (state = initialData,action) => {
  const {type, payload} = action;
  switch (type) {
    case actions.DANHMUCCHUCNANGFILE_GET_LIST_REQUEST:
      return {
        ...state,
        tableLoading : true
      }
    case actions.DANHMUCCHUCNANGFILE_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachChucNangFile: payload.DanhSachChucNangFile,
        TotalRow: payload.TotalRow,
        tableLoading: true
      }
    case actions.DANHMUCCHUCNANGFILE_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhSachChucNangFile: [],
        TotalRow : 0,
        tableLoading : false
      }
    default :
      return state;
  }
}

export default reducer