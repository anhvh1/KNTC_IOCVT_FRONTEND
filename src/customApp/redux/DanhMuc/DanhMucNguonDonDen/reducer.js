import actions from './actions'
const initialData = {
  DanhSachNguonDonDen : [],
  TotalRow: 0,
  tableLoading : true
}

const reducer = (state = initialData,action) => {
  const {type, payload} = action;
  switch (type) {
    case actions.DANHMUCNGUONDONDEN_GET_LIST_REQUEST:
      return {
        ...state,
        tableLoading : true
      }
    case actions.DANHMUCNGUONDONDEN_GET_LIST_REQUEST_SUCCESS:
      return {
        ...state,
        DanhSachNguonDonDen: payload.DanhSachNguonDonDen,
        TotalRow: payload.TotalRow,
        tableLoading: true
      }
    case actions.DANHMUCNGUONDONDEN_GET_LIST_REQUEST_ERROR:
      return {
        ...state,
        DanhSachNguonDonDen: [],
        TotalRow : 0,
        tableLoading : false
      }
    default :
      return state;
  }
}

export default reducer