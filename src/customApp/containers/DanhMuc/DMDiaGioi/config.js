import { apiGetAuth, apiPostAuth } from "../../../../api";
import server from "../../../../settings";

const apiUrl = {
  danhsachdiagioi:
    server.v2Url +
    "DanhMucDiaGioiHanhChinhController_v2/DanhSachCacCap/Tinh/Huyen/Xa",
  chitietdiagioi:
    server.v2Url +
    "DanhMucDiaGioiHanhChinhController_v2/GetByIDAndCap/Tinh/Huyen/Xa",
  themdiagioi:
    server.v2Url +
    "DanhMucDiaGioiHanhChinhController_v2/InsertDiaGioiHanhChinhNew",
  suadiagioi:
    server.v2Url +
    "DanhMucDiaGioiHanhChinhController_v2/CapNhatDanhMucTheoCap / 1 / 2/ 3",
  xoadiagioi:
    server.v2Url +
    "DanhMucDiaGioiHanhChinhController_v2/XoaDanhMucTheoCap/Tinh/Huyen/Xa",
};

const api = {
  danhSachDiaGioi: (param) => {
    return apiGetAuth(apiUrl.danhsachdiagioi, {
      ...param,
    });
  },
  chiTietDiaGioi: (param) => {
    return apiGetAuth(apiUrl.chitietdiagioi, {
      ...param,
    });
  },
  themDiaGioi: (param) => {
    return apiPostAuth(apiUrl.themdiagioi, {
      ...param,
    });
  },
  suaDiaGioi: (param) => {
    return apiPostAuth(apiUrl.suadiagioi, {
      ...param,
    });
  },
  xoaDiaGioi: (param) => {
    return apiGetAuth(apiUrl.xoadiagioi, {
      ...param,
    });
  },
  // getAll : param => {
  //   return apiGetAuth(apiUrl.getall,{
  //     ...param
  //   })
  // }
};

export const DanhSachLoaiDiaDanh = [
  {
    name: "Tỉnh",
    value: 100,
    children: [
      {
        name: "Tỉnh",
        value: 101,
        children: [],
      },
      {
        name: "Thành Phố",
        value: 102,
        children: [],
      },
      {
        name: "Khác",
        value: 103,
        children: [],
      },
    ],
  },
  {
    name: "Huyện",
    value: 200,
    children: [
      {
        name: "Quận",
        value: 201,
        children: [],
      },
      {
        name: "Huyện",
        value: 202,
        children: [],
      },
      {
        name: "Thị xã",
        value: 203,
        children: [],
      },
      {
        name: "Thành Phố",
        value: 204,
        children: [],
      },
      {
        name: "Khác",
        value: 205,
        children: [],
      },
    ],
  },
  {
    name: "Xã",
    value: 300,
    children: [
      {
        name: "Xã",
        value: 301,
        children: [],
      },
      {
        name: "Phường",
        value: 302,
        children: [],
      },
      {
        name: "Thị trấn",
        value: 303,
        children: [],
      },
      {
        name: "Khác",
        value: 304,
        children: [],
      },
    ],
  },
];

export default api;
