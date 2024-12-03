import {getRoleByKey} from '../../../../helpers/utility';

const actions = {
  TAOCUOC_GET_INIT_DATA_REQUEST: 'TAOCUOC_GET_INIT_DATA_REQUEST',
  TAOCUOC_GET_INIT_DATA_REQUEST_SUCCESS: 'TAOCUOC_GET_INIT_DATA_REQUEST_SUCCESS',
  TAOCUOC_GET_INIT_DATA_REQUEST_ERROR: 'TAOCUOC_GET_INIT_DATA_REQUEST_ERROR',
  getInitData: (filterData) => {
    return (disPatch, getState) => {
      //get role
      let listRole = getState().Auth.role;
      let role = getRoleByKey(listRole, 'bao-vat-quoc-gia');
      //-------
      disPatch({
        type: actions.TAOCUOC_GET_INIT_DATA_REQUEST,
        payload: {filterData, role},
      });
    };
  },

  TAOCUOC_GET_LIST_REQUEST: 'TAOCUOC_GET_LIST_REQUEST',
  TAOCUOC_GET_LIST_REQUEST_SUCCESS: 'TAOCUOC_GET_LIST_REQUEST_SUCCESS',
  TAOCUOC_GET_LIST_REQUEST_ERROR: 'TAOCUOC_GET_LIST_REQUEST_ERROR',
  getList: (filterData) => ({
    type: actions.TAOCUOC_GET_LIST_REQUEST,
    payload: {filterData},
  }),
  //get notification
  getGuild: () => ({type: 'GET_NOTIFICATION_REQUEST_TO_APP_SAGA'}),
};
export default actions;
