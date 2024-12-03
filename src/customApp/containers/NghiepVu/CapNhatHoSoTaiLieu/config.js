import { apiGetAuth, apiPostAuth } from "../../../../api";
import server from "../../../../settings";
import { getDefaultPageSize } from "../../../../helpers/utility";

const apiUrl = {
  listinspection: server.v2Url + "CapNhapHoSoTaiLieu/GetListPaging",
  updatenvchung: server.v2Url + "NV_Chung/Update",
  deletenvchung: server.v2Url + "NV_Chung/Delete",
  addnvchung: server.v2Url + "NV_Chung/Insert",
  getbyidnvchung: server.v2Url + "NV_Chung/GetByID",
  getdetailsinspection:
    server.v2Url + "TaoCuocThanhTra/CapNhatHoSoTaiLieu/GetDetailsInspection",
  listform: server.v2Url + "PhanLoaiThanhTra/GetHinhThuc",
  danhsachcanbo:
    server.v2Url + "TaoCuocThanhTra/DanhSachCanBo_GetBy_CoQuanID_Type",
  thaydoidoanthanhtra: server.v2Url + "CapNhapHoSoTaiLieu/ThayDoiDoanThanhTra",
  getbyid: server.v2Url + "CapNhapHoSoTaiLieu/GetByID",
  gettime: server.v2Url + "CapNhapHoSoTaiLieu/ThoiGianThanhTraTrucTiep",
  listfield: server.v2Url + "PhanLoaiThanhTra/GetLinhVuc",
};
const api = {
  GetListInspection: (param) => {
    return apiGetAuth(apiUrl.listinspection, {
      ...param,
    });
  },
  GetListForm: (params) => {
    return apiGetAuth(apiUrl.listform, { ...params });
  },
  GetDetailsInspection: (param) => {
    return apiGetAuth(apiUrl.getdetailsinspection, {
      ...param,
    });
  },
  UpdateNvChung: (params) => {
    return apiPostAuth(apiUrl.updatenvchung, { ...params });
  },

  DeleteNvChung: (params) => {
    return apiPostAuth(apiUrl.deletenvchung, { ...params });
  },
  AddNvChung: (params) => {
    return apiPostAuth(apiUrl.addnvchung, { ...params });
  },
  GetByIDNvChung: (params) => {
    return apiGetAuth(apiUrl.getbyidnvchung, { ...params });
  },
  GetByID: (params) => {
    return apiGetAuth(apiUrl.getbyid, { ...params });
  },
  GetDanhSachCanBo: (params) => {
    return apiGetAuth(apiUrl.danhsachcanbo, { ...params });
  },
  GetTimeThanhTra: (params) => {
    return apiGetAuth(apiUrl.gettime, { ...params });
  },
};
export { apiUrl };
export default api;
