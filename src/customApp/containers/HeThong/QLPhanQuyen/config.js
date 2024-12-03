import {apiGetAuth, apiGetUser, apiPostAuth} from '../../../../api';
import server from '../../../../settings';
import {getDefaultPageSize} from '../../../../helpers/utility';

const apiUrl = {
  danhsachnhom: server.v2Url + 'PhanQuyen/GetListPaging',
  danhsachcoquan: server.v2Url + 'DanhMucCoQuanDonVi/GetListByUser_FoPhanQuyen',
  danhsachcanbo: server.v2Url + 'hethongcanbo/getlistpaging',

  themnhom: server.v2Url + 'PhanQuyen/NhomNguoiDung_Insert',
  suanhom: server.v2Url + 'PhanQuyen/NhomNguoiDung_Update',
  chitietnhom: server.v2Url + 'PhanQuyen/NhomNguoiDung_GetFoUpdate',
  sieuchitietnhom:
    server.v2Url + 'PhanQuyen/NhomNguoiDung_GetChiTietByNhomNguoiDungID',
  xoanhom: server.v2Url + 'PhanQuyen/NhomNguioDung_Delete',
  //chitietnguoidung: server.v2Url + 'HeThongNguoiDung/GetByIDForPhanQuyen',
  danhsachchucnang:
    server.v2Url + 'PhanQuyen/PhanQuyen_GetQuyenDuocThaoTacTrongNhom',

  danhsachnguoidung:
    server.v2Url +
    'HeThongNguoiDung/HeThong_NguoiDung_GetListBy_NhomNguoiDungID',
  themnguoidung: server.v2Url + 'PhanQuyen/NguoiDung_NhomNguoiDung_Insert',
  themnhieunguoidung:
    server.v2Url + 'PhanQuyen/NguoiDung_NhomNguoiDung_Insert_Multi',
  xoanguoidung: server.v2Url + 'PhanQuyen/NguoiDung_NhomNguoiDung_Delete',

  themchucnang: server.v2Url + 'PhanQuyen/PhanQuyen_InsertMult',
  suachucnang: server.v2Url + 'PhanQuyen/PhanQuyen_Update',
  xoachucnang: server.v2Url + 'PhanQuyen/PhanQuyen_Delete',
};
const api = {
  danhSachNhom: (param) => {
    return apiGetAuth(apiUrl.danhsachnhom, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  danhSachCoQuan: (param) => {
    return apiGetAuth(apiUrl.danhsachcoquan, {
      ...param,
    });
  },
  danhSachCanBo: (param) => {
    return apiGetAuth(apiUrl.danhsachcanbo, {
      ...param,
      PageNumber: 1,
      PageSize: 999999,
    });
  },
  themNhom: (param) => {
    return apiPostAuth(apiUrl.themnhom, {
      ...param,
    });
  },
  suaNhom: (param) => {
    return apiPostAuth(apiUrl.suanhom, {
      ...param,
    });
  },
  danhSachNhomAll: (param) => {
    return apiGetAuth(apiUrl.danhsachnhom, {
      ...param,
      PageNumber: 1,
      PageSize: 99999,
    });
  },
  chiTietNhom: (param) => {
    return apiGetAuth(apiUrl.chitietnhom, {
      ...param,
    });
  },
  sieuChiTietNhom: (param) => {
    return apiGetAuth(apiUrl.sieuchitietnhom, {
      ...param,
    });
  },
  xoaNhom: (param) => {
    return apiPostAuth(apiUrl.xoanhom, {
      ...param,
    });
  },
  // chiTietNguoiDung: (param) => {
  //   return apiGetUser(apiUrl.chitietnguoidung, {
  //     ...param
  //   });
  // },
  danhSachChucNang: (param) => {
    return apiGetAuth(apiUrl.danhsachchucnang, {
      ...param,
    });
  },
  danhSachNguoiDung: (param) => {
    return apiGetAuth(apiUrl.danhsachnguoidung, {
      ...param,
    });
  },
  themNguoiDung: (param) => {
    return apiPostAuth(apiUrl.themnguoidung, {
      ...param,
    });
  },
  themNhieuNguoiDung: (param) => {
    return apiPostAuth(apiUrl.themnhieunguoidung, {
      ...param,
    });
  },
  xoaNguoiDung: (param) => {
    return apiPostAuth(apiUrl.xoanguoidung, {
      ...param,
    });
  },
  themChucNang: (paramArray) => {
    return apiPostAuth(apiUrl.themchucnang, paramArray);
  },
  suaChucNang: (paramArray) => {
    return apiPostAuth(apiUrl.suachucnang, paramArray);
  },
  xoaChucNang: (param) => {
    return apiPostAuth(apiUrl.xoachucnang, {
      ...param,
    });
  },
};

export default api;
