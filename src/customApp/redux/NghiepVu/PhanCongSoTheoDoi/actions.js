import {getRoleByKey} from '../../../../helpers/utility';

const actions = {
  PHANCONGSOTHEODOI_GET_INIT_DATA_REQUEST: 'PHANCONGSOTHEODOI_GET_INIT_DATA_REQUEST',
  PHANCONGSOTHEODOI_GET_INIT_DATA_REQUEST_SUCCESS: 'PHANCONGSOTHEODOI_GET_INIT_DATA_REQUEST_SUCCESS',
  PHANCONGSOTHEODOI_GET_INIT_DATA_REQUEST_ERROR: 'PHANCONGSOTHEODOI_GET_INIT_DATA_REQUEST_ERROR',
  getInitData: (filterData) => {
    return (disPatch, getState) => {
      //get role
      let listRole = getState().Auth.role;
      let role = getRoleByKey(listRole, 'bao-vat-quoc-gia');
      //-------
      disPatch({
        type: actions.PHANCONGSOTHEODOI_GET_INIT_DATA_REQUEST,
        payload: {filterData, role},
      });
    };
  },

  PHANCONGSOTHEODOI_GET_LIST_REQUEST: 'PHANCONGSOTHEODOI_GET_LIST_REQUEST',
  PHANCONGSOTHEODOI_GET_LIST_REQUEST_SUCCESS: 'PHANCONGSOTHEODOI_GET_LIST_REQUEST_SUCCESS',
  PHANCONGSOTHEODOI_GET_LIST_REQUEST_ERROR: 'PHANCONGSOTHEODOI_GET_LIST_REQUEST_ERROR',
  getList: (filterData) => ({
    type: actions.PHANCONGSOTHEODOI_GET_LIST_REQUEST,
    payload: {filterData},
  }),
  //get notification
  getGuild: () => ({type: 'GET_NOTIFICATION_REQUEST_TO_APP_SAGA'}),
};
export default actions;
