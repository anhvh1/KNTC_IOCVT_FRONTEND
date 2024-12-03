import {getRoleByKey} from '../../../../helpers/utility';

const actions = {
  PHANCONGCNSL_GET_INIT_DATA_REQUEST: 'PHANCONGCNSL_GET_INIT_DATA_REQUEST',
  PHANCONGCNSL_GET_INIT_DATA_REQUEST_SUCCESS: 'PHANCONGCNSL_GET_INIT_DATA_REQUEST_SUCCESS',
  PHANCONGCNSL_GET_INIT_DATA_REQUEST_ERROR: 'PHANCONGCNSL_GET_INIT_DATA_REQUEST_ERROR',
  getInitData: (filterData) => {
    return (disPatch, getState) => {
      //get role
      let listRole = getState().Auth.role;
      let role = getRoleByKey(listRole, 'bao-vat-quoc-gia');
      //-------
      disPatch({
        type: actions.PHANCONGCNSL_GET_INIT_DATA_REQUEST,
        payload: {filterData, role},
      });
    };
  },

  PHANCONGCNSL_GET_LIST_REQUEST: 'PHANCONGCNSL_GET_LIST_REQUEST',
  PHANCONGCNSL_GET_LIST_REQUEST_SUCCESS: 'PHANCONGCNSL_GET_LIST_REQUEST_SUCCESS',
  PHANCONGCNSL_GET_LIST_REQUEST_ERROR: 'PHANCONGCNSL_GET_LIST_REQUEST_ERROR',
  getList: (filterData) => ({
    type: actions.PHANCONGCNSL_GET_LIST_REQUEST,
    payload: {filterData},
  }),
  //get notification
  getGuild: () => ({type: 'GET_NOTIFICATION_REQUEST_TO_APP_SAGA'}),
};
export default actions;
