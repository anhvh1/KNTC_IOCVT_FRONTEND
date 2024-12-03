import { apiGetAuth, apiPostAuth } from "../../../../api";
import server from "../../../../settings";
import { getDefaultPageSize } from "../../../../helpers/utility";

const apiUrl = {
  listsyntheticplan: server.v2Url + "THRaSoatChongCheo/GetListPaging",
  updateplan: server.v2Url + "THRaSoatChongCheo/UpDateDTKhongChongCheo",
  deletesyntheticplan: server.v2Url + "THRaSoatChongCheo/Delete",
  addsyntheticplan: server.v2Url + "THRaSoatChongCheo/insert",
  taifilemau: server.v2Url + "THRaSoatChongCheo/DowloadExel",
  importfile: server.v2Url + "THRaSoatChongCheo/ImportExcel",
  detailssyntheticplan: server.v2Url + "THRaSoatChongCheo/GetByID",
  exportlistsyntheticplan:
    server.v2Url + "THRaSoatChongCheo/DownloadFileImportDoanhNghiep",
  listagency: server.v2Url + "CoQuan/GetCoQuanThanhTra",
  listform: server.v2Url + "PhanLoaiThanhTra/GetHinhThuc",
  listfield: server.v2Url + "PhanLoaiThanhTra/GetLinhVuc",
  completeplan: server.v2Url + "THRaSoatChongCheo/CompletePlan",
  getlistcheck: server.v2Url + "THRaSoatChongCheo/GetListPaging_CheckChongCheo",
  getviewresult: server.v2Url + "THRaSoatChongCheo/GetListPaging_KetQua",
  getinfo: server.v2Url + "QuanLyKHDuKien/GetInfoKeHoachThanhTraChongCheo",
};
const api = {
  GetListSyntheticPlan: (param) => {
    return apiGetAuth(apiUrl.listsyntheticplan, {
      ...param,
      // PageNumber: param.PageNumber ? param.PageNumber : 1,
      // PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  GetListCheck: (param) => {
    return apiGetAuth(apiUrl.getlistcheck, {
      ...param,
    });
  },
  GetViewResult: (param) => {
    return apiGetAuth(apiUrl.getviewresult, {
      ...param,
    });
  },
  UpdateChongCheo: (params) => {
    return apiPostAuth(apiUrl.updateplan, { ...params });
  },

  DeleteSyntheticPlan: (params) => {
    return apiPostAuth(apiUrl.deletesyntheticplan, { ...params });
  },
  AddSyntheticPlan: (params) => {
    return apiPostAuth(apiUrl.addsyntheticplan, { ...params });
  },
  DetailsSyntheticPlan: (params) => {
    return apiGetAuth(apiUrl.detailssyntheticplan, { ...params });
  },
  ImportFile: (params) => {
    return apiPostAuth(apiUrl.importfile, { ...params });
  },
  ExportListSyntheticPlan: (params) => {
    return apiGetAuth(apiUrl.exportlistsyntheticplan, { ...params });
  },
  GetListAgency: (params) => {
    return apiGetAuth(apiUrl.listagency, { ...params });
  },
  GetListForm: (params) => {
    return apiGetAuth(apiUrl.listform, { ...params });
  },
  GetListField: (params) => {
    return apiGetAuth(apiUrl.listfield, { ...params });
  },
  CompletePlan: (params) => {
    return apiPostAuth(apiUrl.completeplan, params);
  },
  GetInfo: (params) => {
    return apiGetAuth(apiUrl.getinfo, { ...params });
  },
};
export { apiUrl };
export default api;
