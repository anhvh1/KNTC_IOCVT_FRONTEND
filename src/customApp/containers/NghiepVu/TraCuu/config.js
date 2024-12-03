import { apiGetAuth, apiPostAuth } from "../../../../api";
import server from "../../../../settings";
import { getDefaultPageSize } from "../../../../helpers/utility";

const apiUrl = {
  listlookup: server.v2Url + "TraCuu/TraCuu",
  listagency: server.v2Url + "CoQuan/GetCoQuanOrDoanhNghiepByPhanLoai",
  listform: server.v2Url + "PhanLoaiThanhTra/GetHinhThuc",
  listfield: server.v2Url + "PhanLoaiThanhTra/GetLinhVuc",
  detailsinspection: server.v2Url + "CuocThanhTra/GetByID",
};
const api = {
  GetListLookup: (param) => {
    return apiGetAuth(apiUrl.listlookup, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  DetailsInspection: (params) => {
    return apiGetAuth(apiUrl.detailsinspection, { ...params });
  },
  GetListAgency: (params) => {
    return apiGetAuth(apiUrl.listagency, {
      ...params,
      PageSize: params.PageSize ? params.PageSize : getDefaultPageSize(),
    });
  },
  GetListForm: (params) => {
    return apiGetAuth(apiUrl.listform, { ...params });
  },
  GetListField: (params) => {
    return apiGetAuth(apiUrl.listfield, { ...params });
  },
};
export { apiUrl };
export default api;
