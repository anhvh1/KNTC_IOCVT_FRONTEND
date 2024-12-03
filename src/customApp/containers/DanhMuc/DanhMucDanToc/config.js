import Axios from "axios";
import { apiGetAuth, apiPostAuth } from "../../../../api";
import { getDefaultPageSize } from "../../../../helpers/utility";
import server from "../../../../settings";

const apiUrl = {
  getDantoc: server.v2Url + "DanhMucDanToc/DanhSachDanToc",
  getDetailDantoc: server.v2Url + "DanhMucDanToc/ChiTietDanToc",
  postDantoc: server.v2Url + "DanhMucDanToc/ThemMoiDanToc",
  updateDantoc: server.v2Url + "DanhMucDanToc/CapNhatDanToc",
  deleteDantoc: server.v2Url + "DanhMucDanToc/XoaDanToc",
};
// lay danh sach
const api = {
  DanhSachDanToc: (param) => {
    return apiGetAuth(apiUrl.getDantoc, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  ChiTietDanToc: (param) => {
    return apiGetAuth(apiUrl.getDetailDantoc, {
      ...param,
    });
  },

  ThemDanToc: (param) => {
    return apiPostAuth(apiUrl.postDantoc, {
      ...param,
    });
  },

  SuaDanToc: (param) => {
    return apiPostAuth(apiUrl.updateDantoc, {
      ...param,
    });
  },

  XoaDanToc: (param) => {
    return apiPostAuth(apiUrl.deleteDantoc, param);
  },
};

export default api;
