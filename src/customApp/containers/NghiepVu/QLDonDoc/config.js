import Axios from "axios";
import { apiGetAuth, apiPostAuth, apiPutAuth } from "../../../../api";
import { getDefaultPageSize } from "../../../../helpers/utility";
import server from "../../../../settings";

const apiUrl = {
  getDonDoc: server.v2Url + "NV_DonDocThucHienKL/GetListPaging",
  getchitietDonDoc: server.v2Url + "NV_DonDocThucHienKL/Chitiet",
  postDonDoc: server.v2Url + "NV_DonDocThucHienKL/Insert",
  updateDonDoc: server.v2Url + "NV_DonDocThucHienKL/Update",
  deleteDonDoc: server.v2Url + "NV_DonDocThucHienKL/Delete",
};
// lay danh sach
const api = {
  DanhSachDonDoc: (param) => {
    return apiGetAuth(apiUrl.getDonDoc, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  ChiTietDonDoc: (id) => {
    return apiGetAuth(`${apiUrl.getchitietDonDoc}?donDocId=${id}`, {

    });
  },
  ThemDonDoc: (param) => {
    return apiPostAuth(apiUrl.postDonDoc, {
      ...param,
    });
  },
  SuaDonDoc: (param) => {
    return apiPostAuth(apiUrl.updateDonDoc, {
      ...param,
    });
  },
  XoaDonDoc: (param) => {
    return apiPostAuth(apiUrl.deleteDonDoc, {
      ...param,
    });
  },
};

export default api;
