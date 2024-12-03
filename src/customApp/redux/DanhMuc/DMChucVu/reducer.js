import actions from './actions'
const initialData = {
  DanhSachChucVu : [],
  TotalRow: 0,
  tableLoading : true
}

const reducer = (state = initialData,action) => {
  const {type, payload} = action;
  switch (type) {
    case actions.DANHMUCCHUCVU_GET_LIST_REQUEST:
      return {
        ...state,
        tableLoading : true
      }
    case actions.DANHMUCCHUCVU_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachChucVu: payload.DanhSachChucVu,
        TotalRow: payload.TotalRow,
        tableLoading: true
      }
    case actions.DANHMUCCHUCVU_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhSachChucVu: [],
        TotalRow : 0,
        tableLoading : false
      }
    default :
      return state;
  }
}

export default reducer