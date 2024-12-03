import { apiGetAuth, apiPostAuth } from "../../../../api";
import server from "../../../../settings";
import { getDefaultPageSize } from "../../../../helpers/utility";

const apiUrl = {
  listagency: server.v2Url + "CoQuan/GetCoQuanThanhTra",
  listsyntheticplan:
    server.v2Url + "PhanCongSoTheoDoi/GetListPaging_By_CanBoID",
  listform: server.v2Url + "PhanLoaiThanhTra/GetHinhThuc",
  GetListDoiTuong: server.v2Url + "CapNhapSoLieu/GetListDoiTuong",
  GetListPagingSoLieuByLoaiSoLieu:
    server.v2Url + "CapNhapSoLieu/GetListPagingSoLieuByLoaiSoLieu",
  Insert: server.v2Url + "CapNhapSoLieu/Insert",
  Update: server.v2Url + "CapNhapSoLieu/Update",
  DeLete: server.v2Url + "CapNhapSoLieu/DeLete",
  GetCongBoKL: server.v2Url + "CapNhapSoLieu/GetCongBoKL",
  InsertSoLieu: server.v2Url + "CapNhapSoLieu/InsertSoLieu",
  InsertCapNhapLoaiSoLieu:
    server.v2Url + "CapNhapSoLieu/InsertCapNhapLoaiSoLieu",
  UpdateCapNhapLoaiSoLieu:
    server.v2Url + "CapNhapSoLieu/UpdateCapNhapLoaiSoLieu",
  GetChiTietSoLieuByCapNhapLoaiSoLieuID:
    server.v2Url + "CapNhapSoLieu/GetChiTietSoLieuByCapNhapLoaiSoLieuID",
  GetSoLieuByCapNhapLoaiSoLieuID:
    server.v2Url + "CapNhapSoLieu/GetSoLieuByCapNhapLoaiSoLieuID",
  GetCapNhapSoLieuByID: server.v2Url + "CapNhapSoLieu/GetCapNhapSoLieuByID",
  GetThongTinQuyetDinh: server.v2Url + "CapNhapSoLieu/GetThongTinQuyetDinh",
  UpdateCapNhapLoaiSoLieu:
    server.v2Url + "CapNhapSoLieu/UpdateCapNhapLoaiSoLieu",
  UpdateChiTietSoLieu: server.v2Url + "CapNhapSoLieu/UpdateChiTietSoLieu",
  DeleteCapNhapSoLieu: server.v2Url + "CapNhapSoLieu/DeleteCapNhapSoLieu",
  UploadFileBeforeAction: server.v2Url + "CapNhapSoLieu/UploadFileBeforeAction",
  InsertChiTietSoLieu: server.v2Url + "CapNhapSoLieu/InsertChiTietSoLieu",
  getchitietrasoat: server.v2Url + "NV_Chung/GetByID",
  gechitietid: server.v2Url + "NV_Chung/GetChiTietByID",
  InsertRaSoat: server.v2Url + "NV_Chung/Insert",
  UpdateRaSoat: server.v2Url + "NV_Chung/Update",
  DeLeteRaSoat: server.v2Url + "NV_Chung/Delete",
  listfield: server.v2Url + "PhanLoaiThanhTra/GetLinhVuc",
};
const api = {
  GetListSyntheticPlan: (param) => {
    return apiGetAuth(apiUrl.listsyntheticplan, {
      ...param,
      // PageNumber: param.PageNumber ? param.PageNumber : 1,
      // PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  InsertRaSoat: (param) => {
    return apiPostAuth(apiUrl.InsertRaSoat, {
      ...param,
    });
  },
  UpdateRaSoat: (param) => {
    return apiPostAuth(apiUrl.UpdateRaSoat, param);
  },
  getchitietrasoat: (cuocThanhTraID) => {
    return apiGetAuth(
      `${apiUrl.getchitietrasoat}?cuocThanhTraID=${cuocThanhTraID}&type=19`,
      {}
    );
  },
  gechitietid: (cuocThanhTraID, ID) => {
    return apiGetAuth(
      `${apiUrl.gechitietid}?cuocThanhTraID=${cuocThanhTraID}&type=19&ID=${ID}`,
      {}
    );
  },
  GetListAgency: (params) => {
    return apiGetAuth(apiUrl.listagency, { ...params });
  },
  GetListForm: (params) => {
    return apiGetAuth(apiUrl.listform, { ...params });
  },
  GetListDoiTuong: (cuocThanhTraID, typeChucNang) => {
    return apiGetAuth(
      `${apiUrl.GetListDoiTuong}?cuocThanhTraID=${cuocThanhTraID}&typeChucNang=${typeChucNang}`,
      {}
    );
  },
  UploadFileBeforeAction: (typeChucNang) => {
    return apiPostAuth(
      `${apiUrl.UploadFileBeforeAction}?type=${typeChucNang}`,
      {}
    );
  },
  GetListPagingSoLieuByLoaiSoLieu: (cuocThanhTraID, LoaiSoLieu) => {
    return apiGetAuth(
      `${apiUrl.GetListPagingSoLieuByLoaiSoLieu}?cuocThanhTraID=${cuocThanhTraID}&LoaiSoLieu=${LoaiSoLieu}`,
      {}
    );
  },
  GetCongBoKL: (cuocThanhTraID) => {
    return apiGetAuth(
      `${apiUrl.GetCongBoKL}?cuocThanhTraID=${cuocThanhTraID}`,
      {}
    );
  },
  Insert: (params) => {
    return apiPostAuth(apiUrl.Insert, { ...params });
  },
  InsertSoLieu: (type, params) => {
    return apiPostAuth(`${apiUrl.InsertSoLieu}?type=${type}`, { ...params });
  },
  InsertCapNhapLoaiSoLieu: (params) => {
    return apiPostAuth(apiUrl.InsertCapNhapLoaiSoLieu, { ...params });
  },
  UpdateCapNhapLoaiSoLieu: (params) => {
    return apiPostAuth(apiUrl.UpdateCapNhapLoaiSoLieu, { ...params });
  },
  UpdateChiTietSoLieu: (params) => {
    return apiPostAuth(apiUrl.UpdateChiTietSoLieu, { ...params });
  },
  UpdateCapNhapLoaiSoLieu: (params) => {
    return apiPostAuth(apiUrl.UpdateCapNhapLoaiSoLieu, { ...params });
  },
  Update: (params) => {
    return apiPostAuth(apiUrl.Update, { ...params });
  },
  DeLete: (params) => {
    return apiPostAuth(apiUrl.DeLete, { ...params });
  },
  GetChiTietSoLieuByCapNhapLoaiSoLieuID: (capNhapLoaiSoLieuID) => {
    return apiGetAuth(
      `${apiUrl.GetChiTietSoLieuByCapNhapLoaiSoLieuID}?capNhapLoaiSoLieuID=${capNhapLoaiSoLieuID}`,
      {}
    );
  },
  GetSoLieuByCapNhapLoaiSoLieuID: (capNhapLoaiSoLieuID) => {
    return apiGetAuth(
      `${apiUrl.GetSoLieuByCapNhapLoaiSoLieuID}?capNhapLoaiSoLieuID=${capNhapLoaiSoLieuID}`,
      {}
    );
  },
  GetCapNhapSoLieuByID: (capNhapLoaiSoLieuID) => {
    return apiGetAuth(
      `${apiUrl.GetCapNhapSoLieuByID}?id=${capNhapLoaiSoLieuID}`,
      {}
    );
  },
  GetThongTinQuyetDinh: (capNhapLoaiSoLieuID, LoaiSoLieu) => {
    return apiGetAuth(
      `${apiUrl.GetThongTinQuyetDinh}?capNhapLoaiSoLieuID=${capNhapLoaiSoLieuID}&LoaiSoLieu=${LoaiSoLieu}`,
      {}
    );
  },
  DeleteCapNhapSoLieu: (params) => {
    return apiPostAuth(apiUrl.DeleteCapNhapSoLieu, { ...params });
  },
};
export { apiUrl };
export default api;
