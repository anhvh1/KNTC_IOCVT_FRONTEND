import {getRoleByKey} from '../../../../helpers/utility';

const actions = {
  NOIDUNGTHANHTRAKIEMTRA_GET_INIT_DATA_REQUEST: 'NOIDUNGTHANHTRAKIEMTRA_GET_INIT_DATA_REQUEST',
  NOIDUNGTHANHTRAKIEMTRA_GET_INIT_DATA_REQUEST_SUCCESS: 'NOIDUNGTHANHTRAKIEMTRA_GET_INIT_DATA_REQUEST_SUCCESS',
  NOIDUNGTHANHTRAKIEMTRA_GET_INIT_DATA_REQUEST_ERROR: 'NOIDUNGTHANHTRAKIEMTRA_GET_INIT_DATA_REQUEST_ERROR',
  getInitData: (filterData) => {
    return (disPatch, getState) => {
      //get role
      let listRole = getState().Auth.role;
      let role = getRoleByKey(listRole, 'danh-muc-noi-dung-thanh-tra-kiem-tra');
      //-------
      disPatch({
        type: actions.NOIDUNGTHANHTRAKIEMTRA_GET_INIT_DATA_REQUEST,
        payload: {filterData, role},
      });
    };
  },

  NOIDUNGTHANHTRAKIEMTRA_GET_LIST_REQUEST: 'NOIDUNGTHANHTRAKIEMTRA_GET_LIST_REQUEST',
  NOIDUNGTHANHTRAKIEMTRA_GET_LIST_REQUEST_SUCCESS: 'NOIDUNGTHANHTRAKIEMTRA_GET_LIST_REQUEST_SUCCESS',
  NOIDUNGTHANHTRAKIEMTRA_GET_LIST_REQUEST_ERROR: 'NOIDUNGTHANHTRAKIEMTRA_GET_LIST_REQUEST_ERROR',
  getList: (filterData) => ({
    type: actions.NOIDUNGTHANHTRAKIEMTRA_GET_LIST_REQUEST,
    payload: {filterData},
  }),
  //get notification
  getGuild: () => ({type: 'GET_NOTIFICATION_REQUEST_TO_APP_SAGA'}),
};
export default actions;
