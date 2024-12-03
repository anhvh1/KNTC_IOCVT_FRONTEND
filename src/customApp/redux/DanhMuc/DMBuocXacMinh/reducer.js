import actions from './actions'
const initialData = {
  DanhSachBuocXacMinh : [],
  TotalRow: 0,
  tableLoading : true
}

const reducer = (state = initialData,action) => {
  const {type, payload} = action;
  switch (type) {
    case actions.DANHMUCBUOCXACMINH_GET_LIST_REQUEST:
      return {
        ...state,
        tableLoading : true
      }
    case actions.DANHMUCBUOCXACMINH_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachBuocXacMinh: payload.DanhSachBuocXacMinh,
        TotalRow: payload.TotalRow,
        tableLoading: true
      }
    case actions.DANHMUCBUOCXACMINH_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhSachBuocXacMinh: [],
        TotalRow : 0,
        tableLoading : false
      }
    default :
      return state;
  }
}

export default reducer