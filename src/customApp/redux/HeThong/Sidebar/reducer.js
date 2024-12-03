import actions from './actions'

const initialState = {
  ListSideBar : []
}
const reducer = (state = initialState,action) => {
  const {type,payload} = action
  switch(type){
    case actions.SIDEBAR_GET_LIST_REQUEST :
      return {
        ...state,
      }
    case actions.SIDEBAR_GET_LIST_SUCCESS :
      return {
        ...state,
        ListSideBar: payload.ListSideBar
      }
    case actions.SIDEBAR_GET_LIST_ERROR :
      return {
        ...state
      }
    default :
      return {
        ...state
      }
  }
}

export default reducer