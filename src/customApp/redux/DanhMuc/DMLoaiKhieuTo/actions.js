import {getRoleByKey} from '../../../../helpers/utility';
const actions = {
  KHIEUTO_GET_INIT_DATA_REQUEST: 'KHIEUTO_GET_INIT_DATA_REQUEST',
  KHIEUTO_GET_INIT_DATA_REQUEST_SUCCESS:
    'KHIEUTO_GET_INIT_DATA_REQUEST_SUCCESS',
  KHIEUTO_GET_INIT_DATA_REQUEST_ERROR: 'KHIEUTO_GET_INIT_DATA_REQUEST_ERROR',
  getInitData: (filterData) => {
    return (disPatch, getState) => {
      //get role
      let listRole = getState().Auth.role;
      let role = getRoleByKey(listRole, 'danh-muc-loai-khieu-to');
      // -------
      disPatch({
        type: actions.KHIEUTO_GET_INIT_DATA_REQUEST,
        payload: {filterData, role},
      });
    };
  },

  KHIEUTO_GET_LIST_REQUEST: 'KHIEUTO_GET_LIST_REQUEST',
  KHIEUTO_GET_LIST_REQUEST_SUCCESS: 'KHIEUTO_GET_LIST_REQUEST_SUCCESS',
  KHIEUTO_GET_LIST_REQUEST_ERROR: 'KHIEUTO_GET_LIST_REQUEST_ERROR',
  getList: (filterData) => ({
    type: actions.KHIEUTO_GET_LIST_REQUEST,
    payload: {filterData},
  }),

  KHIEUTO_DELETE_DATA_REQUEST: 'KHIEUTO_DELETE_DATA_REQUEST',
  KHIEUTO_DELETE_DATA_REQUEST_SUCCESS: 'KHIEUTO_DELETE_DATA_REQUEST_SUCCESS',
  KHIEUTO_DELETE_DATA_REQUEST_ERROR: 'KHIEUTO_DELETE_DATA_REQUEST_ERROR',
  deleteData: (idArray) => {
    return (disPatch, getState) => {
      const oldAdTemplateList = getState().AdTemplate.adTemplateList;
      const adTemplateList = oldAdTemplateList.filter(
        (record) => !idArray.includes(record.id),
      );
      disPatch({
        type: actions.KHIEUTO_DELETE_DATA_REQUEST,
        payload: {adTemplateList},
      });
    };
  },
};
export default actions;
