import {getRoleByKey} from '../../../../helpers/utility';

const actions = {
  DIAGIOI_GET_INIT_DATA_REQUEST: 'DIAGIOI_GET_INIT_DATA_REQUEST',
  DIAGIOI_GET_INIT_DATA_REQUEST_SUCCESS:
    'DIAGIOI_GET_INIT_DATA_REQUEST_SUCCESS',
  DIAGIOI_GET_INIT_DATA_REQUEST_ERROR: 'DIAGIOI_GET_INIT_DATA_REQUEST_ERROR',
  getInitData: (filterData) => {
    return (disPatch, getState) => {
      //get role
      let listRole = getState().Auth.role;
      let role = getRoleByKey(listRole, 'danh-muc-tinh-huyen-xa');
      //-------
      disPatch({
        type: actions.DIAGIOI_GET_INIT_DATA_REQUEST,
        payload: {filterData, role},
      });
    };
  },

  DIAGIOI_GET_LIST_REQUEST: 'DIAGIOI_GET_LIST_REQUEST',
  DIAGIOI_GET_LIST_REQUEST_SUCCESS: 'DIAGIOI_GET_LIST_REQUEST_SUCCESS',
  DIAGIOI_GET_LIST_REQUEST_ERROR: 'DIAGIOI_GET_LIST_REQUEST_ERROR',
  getList: (filterData) => ({
    type: actions.DIAGIOI_GET_LIST_REQUEST,
    payload: {filterData},
  }),

  DIAGIOI_DELETE_DATA_REQUEST: 'DIAGIOI_DELETE_DATA_REQUEST',
  DIAGIOI_DELETE_DATA_REQUEST_SUCCESS: 'DIAGIOI_DELETE_DATA_REQUEST_SUCCESS',
  DIAGIOI_DELETE_DATA_REQUEST_ERROR: 'DIAGIOI_DELETE_DATA_REQUEST_ERROR',
  deleteData: (idArray) => {
    return (disPatch, getState) => {
      const oldAdTemplateList = getState().AdTemplate.adTemplateList;
      const adTemplateList = oldAdTemplateList.filter(
        (record) => !idArray.includes(record.id),
      );
      disPatch({
        type: actions.DIAGIOI_DELETE_DATA_REQUEST,
        payload: {adTemplateList},
      });
    };
  },
};
export default actions;
