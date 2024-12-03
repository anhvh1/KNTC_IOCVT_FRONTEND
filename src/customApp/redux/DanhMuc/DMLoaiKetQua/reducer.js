import actions from './actions'
const initialData = {
  DanhSachLoaiKetQua : [],
  TotalRow: 0,
  tableLoading : true
}

const reducer = (state = initialData,action) => {
  const {type, payload} = action;
  switch (type) {
    case actions.DANHMUCLOAIKETQUA_GET_LIST_REQUEST:
      return {
        ...state,
        tableLoading : true
      }
    case actions.DANHMUCLOAIKETQUA_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachLoaiKetQua: payload.DanhSachLoaiKetQua,
        TotalRow: payload.TotalRow,
        tableLoading: true
      }
    case actions.DANHMUCLOAIKETQUA_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhSachLoaiKetQua: [],
        TotalRow : 0,
        tableLoading : false
      }
    default :
      return state;
  }
}

export default reducer