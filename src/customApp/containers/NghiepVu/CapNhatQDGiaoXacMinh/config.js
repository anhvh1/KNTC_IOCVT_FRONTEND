import Axios from 'axios';
import {apiGetAuth, apiPostAuth} from '../../../../api';
import {getDefaultPageSize} from '../../../../helpers/utility';
import server from '../../../../settings';

const apiUrl = {
  DanhSachQDGiaoXacMinh: server.v2Url + 'GiaoXacMinh/GetListPaging',
  chitetgiaoxacminh: server.v2Url + 'GiaoXacMinh/GetByID',
  banhanh: server.v2Url + 'XuLyDon/Save',
  capnhatquyetdinhgiaoxacminh:
    server.v2Url + 'GiaoXacMinh/CapNhatQuyetDinhGiaoXacMinh',

  xoadonthu: server.v2Url + 'XuLyDon/Delete',
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
  ketquaxulydon: server.v2Url + 'XuLyDon/GetByID',
  getcoquangq: server.v2Url + 'GiaoXacMinh/GetCoQuanGQ',
  chitietdonthu2: server.v2Url + 'ChiTietDonThu/GetChiTietDonThu',
};
// lay danh sach
const api = {
  DanhSachQDGiaoXacMinh: (param) => {
    return apiGetAuth(apiUrl.DanhSachQDGiaoXacMinh, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  CapNhatQuyetDinhGiaoXacMinh: (param) => {
    return apiPostAuth(apiUrl.capnhatquyetdinhgiaoxacminh, {
      ...param,
    });
  },
  ChiTietDonThu2: (params) => {
    return apiGetAuth(apiUrl.chitietdonthu2, {...params});
  },
  GetCoQuanGQ: (params) => {
    return apiGetAuth(apiUrl.getcoquangq);
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
  GetAllCap: (params) => {
    return apiGetAuth(apiUrl.getallcap);
  },
  GetSTTHoSo: (params) => {
    return apiGetAuth(apiUrl.getstthoso);
  },
  KetQuaXuLyDon: (param) => {
    return apiGetAuth(apiUrl.ketquaxulydon, {
      ...param,
    });
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
  ChiTietGiaoXacMinh: (param) => {
    return apiGetAuth(apiUrl.chitetgiaoxacminh, {
      ...param,
    });
  },
  TrinhDuyet: (param) => {
    return apiPostAuth(apiUrl.trinhduyet, {
      ...param,
    });
  },

  BanHanh: (param) => {
    return apiPostAuth(apiUrl.banhanh, param);
  },

  UploadFile: (params) => {
    return apiPostAuth(apiUrl.uploadfile, params);
  },

  CapNhatBanHanh: (param) => {
    return apiPostAuth(apiUrl.capnhatbanhanh, {
      ...param,
    });
  },

  XoaDonThu: (param) => {
    return apiPostAuth(apiUrl.xoadonthu, param);
  },
};

export default api;
