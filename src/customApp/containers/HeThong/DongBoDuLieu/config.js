import Axios from 'axios';
import {apiGetAuth, apiPostAuth} from '../../../../api';
import {getDefaultPageSize} from '../../../../helpers/utility';
import server from '../../../../settings';

const apiUrl = {
  dulieudongbo: server.v2Url + 'DongBoDuLieu/GetDuLieuDongBo',
  danhsachanhxa: server.v2Url + 'DongBoDuLieu/GetLoaiDanhMucAnhXa',
  danhsachlichsudongbo: server.v2Url + 'DongBoDuLieu/LichSuDongBo',
  danhsachkntcquocgia: server.v2Url + 'DongBoDuLieu/DanhSachKNTCQuocGia',
  danhsachmapping: server.v2Url + 'DongBoDuLieu/DanhSachMapping',
  taidulieucallapi: server.v2Url + 'DongBoDuLieu/TaiDuLieuVaCallAPI',
  danhdaudongbo: server.v2Url + 'DongBoDuLieu/DanhDauDongBo',
  capnhattrangthaidon: server.v2Url + 'DongBoDuLieu/CapNhatTrangThaiDon',
  capnhatdulieumapping: server.v2Url + 'DongBoDuLieu/CapNhatDuLieuMapping',
};
// lay danh sach
const api = {
  GetDuLieuDongBo: (param) => {
    return apiGetAuth(apiUrl.dulieudongbo, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  TaiDuLieuCallApi: (param) => {
    return apiGetAuth(apiUrl.taidulieucallapi, {
      ...param,
    });
  },
  DanhDauDongBo: (param) => {
    return apiPostAuth(apiUrl.danhdaudongbo, {
      ...param,
    });
  },
  CapNhatTrangThaiDon: (param) => {
    return apiPostAuth(apiUrl.capnhattrangthaidon, {
      ...param,
    });
  },
  CapNhatDuLieuMapping: (param) => {
    return apiPostAuth(apiUrl.capnhatdulieumapping, {
      ...param,
    });
  },
  DanhSachAnhXa: (param) => {
    return apiGetAuth(apiUrl.danhsachanhxa, {
      ...param,
    });
  },
  DanhSachLichSuDongBo: (param) => {
    return apiGetAuth(apiUrl.danhsachlichsudongbo, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  DanhSachKNTCQuocGia: (param) => {
    return apiGetAuth(apiUrl.danhsachkntcquocgia, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  DanhSachMapping: (param) => {
    return apiGetAuth(apiUrl.danhsachmapping, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
};

export default api;
