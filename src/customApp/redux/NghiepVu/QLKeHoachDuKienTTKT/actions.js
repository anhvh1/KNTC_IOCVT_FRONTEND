import {getRoleByKey} from '../../../../helpers/utility';

const actions = {
  KHDUKIEN_GET_INIT_DATA_REQUEST: 'KHDUKIEN_GET_INIT_DATA_REQUEST',
  KHDUKIEN_GET_INIT_DATA_REQUEST_SUCCESS: 'KHDUKIEN_GET_INIT_DATA_REQUEST_SUCCESS',
  KHDUKIEN_GET_INIT_DATA_REQUEST_ERROR: 'KHDUKIEN_GET_INIT_DATA_REQUEST_ERROR',
  getInitData: (filterData) => {
    return (disPatch, getState) => {
      //get role
      let listRole = getState().Auth.role;
      let role = getRoleByKey(listRole, 'bao-vat-quoc-gia');
      //-------
      disPatch({
        type: actions.KHDUKIEN_GET_INIT_DATA_REQUEST,
        payload: {filterData, role},
      });
    };
  },

  KHDUKIEN_GET_LIST_REQUEST: 'KHDUKIEN_GET_LIST_REQUEST',
  KHDUKIEN_GET_LIST_REQUEST_SUCCESS: 'KHDUKIEN_GET_LIST_REQUEST_SUCCESS',
  KHDUKIEN_GET_LIST_REQUEST_ERROR: 'KHDUKIEN_GET_LIST_REQUEST_ERROR',
  getList: (filterData) => ({
    type: actions.KHDUKIEN_GET_LIST_REQUEST,
    payload: {filterData},
  }),
  //get notification
  getGuild: () => ({type: 'GET_NOTIFICATION_REQUEST_TO_APP_SAGA'}),
};
export default actions;
