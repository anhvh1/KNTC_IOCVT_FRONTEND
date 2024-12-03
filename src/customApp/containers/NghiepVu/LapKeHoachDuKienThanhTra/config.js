import { apiGetAuth, apiPostAuth } from "../../../../api";
import server from "../../../../settings";
import { getDefaultPageSize } from "../../../../helpers/utility";

const apiUrl = {
  listinspection: server.v2Url + "CuocThanhTra/GetListPaging",
  listinspectiontw: server.v2Url + "CuocThanhTra/GetListPaging_Tw",
  editinspection: server.v2Url + "CuocThanhTra/Update",
  deleteinspection: server.v2Url + "CuocThanhTra/Delete",
  addinspection: server.v2Url + "CuocThanhTra/insert",
  taifilemau: server.v2Url + "CuocThanhTra/DowloadExel",
  importfile: server.v2Url + "CuocThanhTra/ImportExcel",
  importfiletw: server.v2Url + "CuocThanhTra/ImportExcel_ManTrunUong",
  detailsinspection: server.v2Url + "CuocThanhTra/GetByID",
  exportlistinspection:
    server.v2Url + "CuocThanhTra/DownloadFileImportDoanhNghiep",
  listagency: server.v2Url + "CoQuan/GetCoQuanOrDoanhNghiepByPhanLoai",
  listform: server.v2Url + "PhanLoaiThanhTra/GetHinhThuc",
  listfield: server.v2Url + "PhanLoaiThanhTra/GetLinhVuc",
  submitplan: server.v2Url + "CuocThanhTra/SubmitPlan",
  getinfo: server.v2Url + "CuocThanhTra/GetInfoKeHoachThanhTra",
  exportlistdoituongttt: server.v2Url + "CoQuan/DownloadFileDoiTuongTTKT",
};
const api = {
  GetListInspection: (param) => {
    return apiGetAuth(apiUrl.listinspection, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  GetListInspectionTW: (param) => {
    return apiGetAuth(apiUrl.listinspectiontw, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },

  EditInspection: (params) => {
    return apiPostAuth(apiUrl.editinspection, { ...params });
  },
  DeleteInspection: (params) => {
    return apiPostAuth(apiUrl.deleteinspection, { ...params });
  },
  AddInspection: (params) => {
    return apiPostAuth(apiUrl.addinspection, { ...params });
  },
  DetailsInspection: (params) => {
    return apiGetAuth(apiUrl.detailsinspection, { ...params });
  },
  ImportFile: (params) => {
    return apiPostAuth(apiUrl.importfile, { ...params });
  },
  ImportFileTw: (params) => {
    return apiPostAuth(apiUrl.importfiletw, { ...params });
  },
  ExportListInspection: (params) => {
    return apiGetAuth(apiUrl.exportlistinspection, { ...params });
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
  SubmitPlan: (params) => {
    return apiPostAuth(apiUrl.submitplan, params);
  },
  GetInfo: (params) => {
    return apiGetAuth(apiUrl.getinfo, { ...params });
  },
};
export { apiUrl };
export default api;
