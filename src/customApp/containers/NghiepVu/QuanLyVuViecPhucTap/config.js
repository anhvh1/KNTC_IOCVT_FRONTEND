import Axios from 'axios';
import {apiGetAuth, apiPostAuth} from '../../../../api';
import {getDefaultPageSize} from '../../../../helpers/utility';
import server from '../../../../settings';

const apiUrl = {
  // danhsachvuviecphuctap: server.v2Url + 'QuanLyVuViecPhucTap/GetListPaging',
  danhsachvuviecphuctap: server.v2Url + 'QuanLyVuViecPhucTap/GetListPaging',
  danhsachvuviecdanggiaiquyet: server.v2Url + 'XuLyDon/GetListPaging',
  chitietdonthu: server.v2Url + 'XuLyDon/GetByID',
  themmoidonthu: server.v2Url + 'XuLyDon/Save',
  suadonthu: server.v2Url + 'XuLyDon/Save',
  danhdauvuviecphuctap:
    server.v2Url + 'QuanLyVuViecPhucTap/DanhDauDonThuLaVuViecPhucTap',
  trinhduyet: server.v2Url + 'XuLyDon/TrinhDuyet',
  getallhuonngxuly: server.v2Url + 'TiepDan/GetAllHuongXuLy',
  gettrangthaixuly: server.v2Url + 'TiepDan/GetAllHuongXuLy',
  getallloaikhieuto: server.v2Url + 'TiepDan/DanhMucLoaiKhieuTo',
  getallquoctich: server.v2Url + 'TiepDan/DanhMucQuocTich',
  getalldantoc: server.v2Url + 'TiepDan/DanhMucDanToc',
  getalltinh: server.v2Url + 'TiepDan/DanhMucTinh',
  getallhuyen: server.v2Url + 'TiepDan/DanhMucHuyen',
  getallxa: server.v2Url + 'TiepDan/DanhMucXa',
  getallchucvu: server.v2Url + 'TiepDan/DanhMucChucVu',
  getallhinhthucdagiaiquyet: server.v2Url + 'TiepDan/HinhThucDaGiaiQuyet',
  getallcanboxuly: server.v2Url + 'TiepDan/GetCanBoXuLy',
  getallphongxuly: server.v2Url + 'TiepDan/GetPhongXuLy',
  getalltenfile: server.v2Url + 'TiepDan/DanhMucTenFile',
  getallcoquan: server.v2Url + 'TiepDan/GetAllCoQuan',
  getallcap: server.v2Url + 'TiepDan/GetAllCap',
  getstthoso: server.v2Url + 'TiepDan/GetSTTHoSo',
  uploadfile: server.v2Url + 'FileDinhKem/Insert',
  chitietdonthu2: server.v2Url + 'ChiTietDonThu/GetChiTietDonThu',
  danhsachbieumau: server.v2Url + 'TiepDan/DanhSachBieuMau',
  chitietbieumau: server.v2Url + 'TiepDan/InPhieu',
  inphieupdf: server.v2Url + 'TiepDan/InPhieuPDF',
  danhsachlanhdao: server.v2Url + 'XuLyDon/GetDanhSachLanhDao',
};
// lay danh sach
const api = {
  DanhSachVuViecPhucTap: (param) => {
    return apiGetAuth(apiUrl.danhsachvuviecphuctap, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  DanhSachVuViecDangGiaiQuyet: (param) => {
    return apiGetAuth(apiUrl.danhsachvuviecdanggiaiquyet, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  DanhSachBieuMau: (param) => {
    return apiGetAuth(apiUrl.danhsachbieumau);
  },
  getChiTietBieuMau: (param) => {
    return apiGetAuth(apiUrl.chitietbieumau, {...param});
  },
  GetPrevewPDF: (param) => {
    return apiGetAuth(apiUrl.inphieupdf, {...param});
  },
  ChiTietDonThu2: (params) => {
    return apiGetAuth(apiUrl.chitietdonthu2, {...params});
  },
  GetAllHuongXuLy: (params) => {
    return apiGetAuth(apiUrl.getallhuonngxuly);
  },
  TrinhDuyet: (params) => {
    return apiPostAuth(apiUrl.trinhduyet, {...params});
  },
  GetTrangThaiXuLy: (params) => {
    return apiGetAuth(apiUrl.gettrangthaixuly);
  },
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
  TrinhDuyet: (param) => {
    return apiPostAuth(apiUrl.trinhduyet, {
      ...param,
    });
  },

  ThemMoiDonThu: (param) => {
    return apiPostAuth(apiUrl.themmoidonthu, param);
  },

  UploadFile: (params) => {
    return apiPostAuth(apiUrl.uploadfile, params);
  },

  SuaDonThu: (param) => {
    return apiPostAuth(apiUrl.suadonthu, {
      ...param,
    });
  },

  DanhDauVuViecPhucTap: (param) => {
    return apiPostAuth(apiUrl.danhdauvuviecphuctap, param);
  },
};

export default api;
