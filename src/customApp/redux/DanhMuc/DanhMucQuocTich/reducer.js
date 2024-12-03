import actions from './actions'
const initialData = {
  DanhSachChucVuDanhSachChucVu : [],
  TotalRow: 0,
  tableLoading : true
}

const reducer = (state = initialData,action) => {
  const {type, payload} = action;
  switch (type) {
    case actions.DANHMUCQUOCTICH_GET_LIST_REQUEST:
      return {
        ...state,
        tableLoading : true
      }
    case actions.DANHMUCQUOCTICH_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachQuocTich: payload.DanhSachQuocTich,
        TotalRow: payload.TotalRow,
        tableLoading: true
      }
    case actions.DANHMUCQUOCTICH_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhSachQuocTich: [],
        TotalRow : 0,
        tableLoading : false
      }
    default :
      return state;
  }
}

export default reducer