import Axios from "axios";
import { apiGetAuth, apiPostAuth, apiPutAuth } from "../../../api";
import { getDefaultPageSize } from "../../../helpers/utility";
import server from "../../../settings";

const apiUrl = {
  getDashBoard: server.v2Url + "DashBoard/DashBoard",
  getchitietDashBoard: server.v2Url + "DashBoard/GetDashBoardByID",
  postDashBoard: server.v2Url + "DashBoard/InsertByCoQuanTao",
  updateDashBoard: server.v2Url + "DashBoard/Update",
  deleteDashBoard: server.v2Url + "DashBoard/Delete",
};
// lay danh sach
const api = {
  DanhSachDashBoard: (param) => {
    return apiGetAuth(apiUrl.getDashBoard, {
      ...param,
    });
  },
  ChiTietDashBoard: (id) => {
    return apiGetAuth(`${apiUrl.getchitietDashBoard}?id=${id}`, {

    });
  },

  ThemDashBoard: (param) => {
    return apiPostAuth(apiUrl.postDashBoard, {
      ...param,
    });
  },

  SuaDashBoard: (param) => {
    return apiPostAuth(apiUrl.updateDashBoard, {
      ...param,
    });
  },

  XoaDashBoard: (id) => {
    return apiPostAuth(`${apiUrl.deleteDashBoard}?id=${id}`);
  },
};

export default api;
