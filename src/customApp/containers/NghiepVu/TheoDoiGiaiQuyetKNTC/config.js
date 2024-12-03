import Axios from 'axios';
import {apiGetAuth, apiPostAuth} from '../../../../api';
import {getDefaultPageSize} from '../../../../helpers/utility';
import server from '../../../../settings';

const apiUrl = {
  danhsachtheodoigiaiquyet: server.v2Url + 'TheoDoiGiaiQuyet/GetListPaging',
  chitietdonthu: server.v2Url + 'TheoDoiGiaiQuyet/GetByID',
  banhanh: server.v2Url + 'TheoDoiGiaiQuyet/BanHanhQuyetDinhGiaoXacMinh',
  capnhatbanhanh: server.v2Url + 'TheoDoiGiaiQuyet/BanHanhQuyetDinhGiaoXacMinh',
  banhanhquyetdinhgiaiquyet:
    server.v2Url + 'TheoDoiGiaiQuyet/BanHanhQuyetDinhGiaiQuyet',
  capnhatbanhanhquyetdinhgiaiquyet:
    server.v2Url + 'TheoDoiGiaiQuyet/BanHanhQuyetDinhGiaiQuyet',
  xoadonthu: server.v2Url + 'TheoDoiGiaiQuyet/Delete',
  banhanhuyetdinhgiaoxacminh:
    server.v2Url + 'TheoDoiGiaiQuyet/BanHanhQuyetDinhGiaoXacMinh',
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
  capnhatquyetdinhgiaoxacminh:
    server.v2Url + 'GiaoXacMinh/CapNhatQuyetDinhGiaoXacMinh_CTH',
};
// lay danh sach
const api = {
  DanhSachTheoDoiGiaiQuyet: (param) => {
    return apiGetAuth(apiUrl.danhsachtheodoigiaiquyet, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  ChiTietDonThu2: (params) => {
    return apiGetAuth(apiUrl.chitietdonthu2, {...params});
  },
  CapNhatQuyetDinhGiaoXacMinhCTH: (param) => {
    return apiPostAuth(apiUrl.capnhatquyetdinhgiaoxacminh, {
      ...param,
    });
  },
  GetAllHuongXuLy: (params) => {
    return apiGetAuth(apiUrl.getallhuonngxuly);
  },
  BanHanhQuyetDinhGiaoXacMinh: (params) => {
    return apiPostAuth(apiUrl.banhanhuyetdinhgiaoxacminh, {...params});
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
  TrinhDuyet: (param) => {
    return apiPostAuth(apiUrl.trinhduyet, {
      ...param,
    });
  },

  BanHanh: (param) => {
    return apiPostAuth(apiUrl.banhanh, param);
  },

  BanHanhQuyetDinhGiaiQuyet: (param) => {
    return apiPostAuth(apiUrl.banhanhquyetdinhgiaiquyet, param);
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
