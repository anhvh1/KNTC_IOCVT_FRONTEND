import {apiGetAuth, apiPostAuth} from '../../../../api';
import server from '../../../../settings';
import {getDefaultPageSize} from '../../../../helpers/utility';

const apiUrl = {
  danhsachchiatachsapnhap:
    server.v2Url + 'QuanLyChiaTachSapNhapCoQuan/GetListPaging',
  danhsachcauhinhlichsu:
    server.v2Url + 'QuanLyChiaTachSapNhapCoQuan/DanhSachLichSu',
  chitietchiatachsapnhap: server.v2Url + 'QuanLyChiaTachSapNhapCoQuan/Save',
  capnhatchiatachsapnhap: server.v2Url + 'QuanLyChiaTachSapNhapCoQuan/Save',
  xoachiatachsapnhap: server.v2Url + 'QuanLyChiaTachSapNhapCoQuan/Delete',
  danhsachcoquancu: server.v2Url + 'QuanLyChiaTachSapNhapCoQuan/GetAll',
};
const api = {
  DanhSachChiaTachSapNhap: (param) => {
    return apiGetAuth(apiUrl.danhsachchiatachsapnhap, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  DanhSachCauHinhLichSu: (param) => {
    return apiGetAuth(apiUrl.danhsachcauhinhlichsu, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  DanhSachCoQuanCu: (param) => {
    return apiGetAuth(apiUrl.danhsachcoquancu, {
      ...param,
    });
  },
  ChiTietChiaTachSapNhap: (param) => {
    return apiGetAuth(apiUrl.chitietchiatachsapnhap, {
      ...param,
    });
  },
  CapNhatChiaTachSapNhap: (param) => {
    return apiPostAuth(apiUrl.capnhatchiatachsapnhap, {
      ...param,
    });
  },
  XoaChiaTachSapNhap: (param) => {
    return apiPostAuth(apiUrl.xoachiatachsapnhap, param);
  },
};

export default api;
