import {getRoleByKey} from '../../../../helpers/utility';

const actions = {
  KYNGHILE_GET_INIT_DATA_REQUEST: 'KYNGHILE_GET_INIT_DATA_REQUEST',
  KYNGHILE_GET_INIT_DATA_REQUEST_SUCCESS: 'KYNGHILE_GET_INIT_DATA_REQUEST_SUCCESS',
  KYNGHILE_GET_INIT_DATA_REQUEST_ERROR: 'KYNGHILE_GET_INIT_DATA_REQUEST_ERROR',
  getInitData: (filterData) => {
    return (disPatch, getState) => {
      //get role
      let listRole = getState().Auth.role;
      let role = getRoleByKey(listRole, 'danh-muc-ky-nghi-le');
      //-------
      disPatch({
        type: actions.KYNGHILE_GET_INIT_DATA_REQUEST,
        payload: {filterData, role},
      });
    };
  },

  KYNGHILE_GET_LIST_REQUEST: 'KYNGHILE_GET_LIST_REQUEST',
  KYNGHILE_GET_LIST_REQUEST_SUCCESS: 'KYNGHILE_GET_LIST_REQUEST_SUCCESS',
  KYNGHILE_GET_LIST_REQUEST_ERROR: 'KYNGHILE_GET_LIST_REQUEST_ERROR',
  getList: (filterData) => ({
    type: actions.KYNGHILE_GET_LIST_REQUEST,
    payload: {filterData},
  }),
  //get notification
  getGuild: () => ({type: 'GET_NOTIFICATION_REQUEST_TO_APP_SAGA'}),
};
export default actions;
