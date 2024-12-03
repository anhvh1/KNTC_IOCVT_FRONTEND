import {getRoleByKey} from '../../../helpers/utility';

const actions = {
  DASHBOARD_GET_INIT_DATA_REQUEST: 'DASHBOARD_GET_INIT_DATA_REQUEST',
  DASHBOARD_GET_INIT_DATA_REQUEST_SUCCESS: 'DASHBOARD_GET_INIT_DATA_REQUEST_SUCCESS',
  DASHBOARD_GET_INIT_DATA_REQUEST_ERROR: 'DASHBOARD_GET_INIT_DATA_REQUEST_ERROR',
  getInitData: (filterData) => {
    return (disPatch, getState) => {
      //get role
      let listRole = getState().Auth.role;
      let role = getRoleByKey(listRole, 'danh-muc-DashBoard');
      //-------
      disPatch({
        type: actions.DASHBOARD_GET_INIT_DATA_REQUEST,
        payload: {filterData, role},
      });
    };
  },

  DASHBOARD_GET_LIST_REQUEST: 'DASHBOARD_GET_LIST_REQUEST',
  DASHBOARD_GET_LIST_REQUEST_SUCCESS: 'DASHBOARD_GET_LIST_REQUEST_SUCCESS',
  DASHBOARD_GET_LIST_REQUEST_ERROR: 'DASHBOARD_GET_LIST_REQUEST_ERROR',
  getList: (filterData) => ({
    type: actions.DASHBOARD_GET_LIST_REQUEST,
    payload: {filterData},
  }),
  //get notification
  getGuild: () => ({type: 'GET_NOTIFICATION_REQUEST_TO_APP_SAGA'}),
};
export default actions;
