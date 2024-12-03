import Axios from 'axios';
import {apiGetAuth, apiPostAuth} from '../../../../api';
import {getDefaultPageSize} from '../../../../helpers/utility';
import server from '../../../../settings';

const apiUrl = {
  danhsachtiepcongdandinhky: server.v2Url + 'TiepNhanDon/GetListPaging',
  chitietdonthu: server.v2Url + 'TiepNhanDon/GetByID',
  themmoidonthu: server.v2Url + 'TiepNhanDon/Save',
  suadonthu: server.v2Url + 'TiepNhanDon/Save',
  xoadonthu: server.v2Url + 'TiepNhanDon/Delete',
  getallhuonngxuly: server.v2Url + 'TiepDan/GetAllHuongXuLy',
  getallloaikhieuto: server.v2Url + 'TiepDan/DanhMucLoaiKhieuTo',
  getallquoctich: server.v2Url + 'TiepDan/DanhMucQuocTich',
  getalldantoc: server.v2Url + 'TiepDan/DanhMucDanToc',
  getalltinh: server.v2Url + 'TiepDan/DanhMucTinh',
  getallhuyen: server.v2Url + 'TiepDan/DanhMucHuyen',
  getallxa: server.v2Url + 'TiepDan/DanhMucXa',
  getallchucvu: server.v2Url + 'TiepDan/DanhMucChucVu',
  getallhinhthucdagiaiquyet: server.v2Url + 'TiepDan/HinhThucDaGiaiQuyet',
  getallcanboxuly: server.v2Url + 'TiepDan/GetCanBoXuLy',
  kiemtratrung: server.v2Url + 'TiepDan/GetDonTrung',
  khieutolan2: server.v2Url + 'TiepDan/KiemTraKhieuToLan2',
  getallphongxuly: server.v2Url + 'TiepDan/GetPhongXuLy',
  getalltenfile: server.v2Url + 'TiepDan/DanhMucTenFile',
  getallcoquan: server.v2Url + 'TiepDan/GetAllCoQuan',
  getallcap: server.v2Url + 'TiepDan/GetAllCap',
  getstthoso: server.v2Url + 'TiepDan/GetSTTHoSo',
  uploadfile: server.v2Url + 'FileDinhKem/Insert',
  getallcanbolanhdao: server.v2Url + 'TiepDan/GetDanhSachLanhDao',
  chitietdonthu2: server.v2Url + 'ChiTietDonThu/GetChiTietDonThu',
};
// lay danh sach
const api = {
  DanhSachTiepNhanDon: (param) => {
    return apiGetAuth(apiUrl.danhsachtiepcongdandinhky, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  GetAllCanBoLanhDao: (param) => {
    return apiGetAuth(apiUrl.getallcanbolanhdao);
  },
  ChiTietDonThu2: (params) => {
    return apiGetAuth(apiUrl.chitietdonthu2, {...params});
  },
  GetAllHuongXuLy: (params) => {
    return apiGetAuth(apiUrl.getallhuonngxuly);
  },
  GetAllCap: (params) => {
    return apiGetAuth(apiUrl.getallcap);
  },
  UploadFile: (params) => {
    return apiPostAuth(apiUrl.uploadfile, params);
  },
  GetSTTHoSo: (params) => {
    return apiGetAuth(apiUrl.getstthoso);
  },
  KiemTraTrung: (params) => {
    return apiGetAuth(apiUrl.kiemtratrung, params);
  },
  KhieuToTan2: (params) => {
    return apiGetAuth(apiUrl.khieutolan2, params);
  },
  // GetAllCanBo: (params) => {
  //   return apiGetAuth(apiUrl.getallhuonngxuly);
  // },
  GetAllCanBoXuLy: (params) => {
    return apiGetAuth(apiUrl.getallcanboxuly);
  },
  GetAllQuocTich: (params) => {
    return apiGetAuth(apiUrl.getallquoctich);
  },
  GetAllHinhThucDaGiaiQuyet: (params) => {
    return apiGetAuth(apiUrl.getallhinhthucdagiaiquyet);
  },
  GetAllDanhMucLoaiKhieuTo: (params) => {
    return apiGetAuth(apiUrl.getallloaikhieuto, {...params});
  },
  GetAllDanToc: (params) => {
    return apiGetAuth(apiUrl.getalldantoc);
  },
  GetAllCoQuan: (params) => {
    return apiGetAuth(apiUrl.getallcoquan);
  },
  GetAllTinh: (params) => {
    return apiGetAuth(apiUrl.getalltinh);
  },
  GetAllHuyen: (params) => {
    return apiGetAuth(apiUrl.getallhuyen, {...params});
  },
  GetAllXa: (params) => {
    return apiGetAuth(apiUrl.getallxa, {...params});
  },
  GetAllChucVu: (params) => {
    return apiGetAuth(apiUrl.getallchucvu);
  },
  GetAllCanBoXuLy: (params) => {
    return apiGetAuth(apiUrl.getallcanboxuly);
  },
  GetAllPhongXuLy: (params) => {
    return apiGetAuth(apiUrl.getallphongxuly);
  },
  GetAllDanhMucTenFile: (params) => {
    return apiGetAuth(apiUrl.getalltenfile);
  },
  ChiTietDonThu: (param) => {
    return apiGetAuth(apiUrl.chitietdonthu, {
      ...param,
    });
  },

  ThemMoiDonThu: (param) => {
    return apiPostAuth(apiUrl.themmoidonthu, {...param});
  },

  SuaDonThu: (param) => {
    return apiPostAuth(apiUrl.suadonthu, {
      ...param,
    });
  },

  XoaDonThu: (param) => {
    return apiPostAuth(apiUrl.xoadonthu, {...param});
  },
};

export default api;
