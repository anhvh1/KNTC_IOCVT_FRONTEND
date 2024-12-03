import Axios from 'axios';
import {apiGetAuth, apiGetToken, apiPostAuth} from '../../../../api';
import {getDefaultPageSize} from '../../../../helpers/utility';
import server from '../../../../settings';

const apiUrl = {
  danhsachphanxuly: server.v2Url + 'PhanXuLyDon/GetListPaging',
  chitietdonthu: server.v2Url + 'PhanXuLyDon/GetByID',
  themmoidonthu: server.v2Url + 'PhanXuLyDon/SavePhanXuLy',
  suadonthu: server.v2Url + 'PhanXuLyDon/SavePhanXuLy',
  xoadonthu: server.v2Url + 'PhanXuLyDon/Delete',
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
  getallphongxuly: server.v2Url + 'TiepDan/GetPhongXuLy',
  getalltenfile: server.v2Url + 'TiepDan/DanhMucTenFile',
  getallcoquan: server.v2Url + 'TiepDan/GetAllCoQuan',
  getallcap: server.v2Url + 'TiepDan/GetAllCap',
  getstthoso: server.v2Url + 'TiepDan/GetSTTHoSo',
  uploadfile: server.v2Url + 'FileDinhKem/Insert',
  chitietbieumau: server.v2Url + 'TiepDan/InPhieu',
  inphieupdf: server.v2Url + 'TiepDan/InPhieuPDF',
  ctdontrung: server.v2Url + 'TiepDan/CTDonTrung',
  ctdonthukhieutolan2: server.v2Url + 'TiepDan/CTDonKhieuToLan2',
  chitietdonthu2: server.v2Url + 'ChiTietDonThu/GetChiTietDonThu',
  kiemtratrung: server.v2Url + 'TiepDan/GetDonTrung',
  khieutolan2: server.v2Url + 'TiepDan/KiemTraKhieuToLan2',
};
// lay danh sach
const api = {
  DanhSachPhanXuLy: (param) => {
    return apiGetAuth(apiUrl.danhsachphanxuly, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  KhieuToTan2: (params) => {
    return apiGetAuth(apiUrl.khieutolan2, params);
  },
  KiemTraTrung: (params) => {
    return apiGetAuth(apiUrl.kiemtratrung, params);
  },
  GetAllHuongXuLy: (params) => {
    return apiGetAuth(apiUrl.getallhuonngxuly);
  },
  GetAllCap: (params) => {
    return apiGetAuth(apiUrl.getallcap);
  },
  GetSTTHoSo: (params) => {
    return apiGetAuth(apiUrl.getstthoso, {...params});
  },
  getChiTietBieuMau: (param) => {
    return apiGetAuth(apiUrl.chitietbieumau, {...param});
  },
  GetPrevewPDF: (param) => {
    return apiGetAuth(apiUrl.inphieupdf, {...param});
  },
  CTDonTrung: (params) => {
    return apiGetAuth(apiUrl.ctdontrung, {...params});
  },
  CTDonKhieuToLan2: (params) => {
    return apiGetAuth(apiUrl.ctdonthukhieutolan2, {...params});
  },
  ChiTietDonThu2: (params) => {
    return apiGetAuth(apiUrl.chitietdonthu2, {...params});
  },
  // GetAllCanBo: (params) => {
  //   return apiGetAuth(apiUrl.getallhuonngxuly);
  // },
  GetAllCanBoXuLy: (params) => {
    return apiGetAuth(apiUrl.getallcanboxuly);
  },
  GetAllQuocTich: (params) => {
    return params.isPublic
      ? apiGetToken(apiUrl.getallquoctich)
      : apiGetAuth(apiUrl.getallquoctich);
  },
  GetAllHinhThucDaGiaiQuyet: (params) => {
    return apiGetAuth(apiUrl.getallhinhthucdagiaiquyet);
  },
  UploadFile: (params) => {
    return apiPostAuth(apiUrl.uploadfile, params);
  },
  GetAllDanhMucLoaiKhieuTo: (params) => {
    return apiGetAuth(apiUrl.getallloaikhieuto, {...params});
  },
  GetAllDanToc: (params) => {
    return params.isPublic
      ? apiGetToken(apiUrl.getalldantoc)
      : apiGetAuth(apiUrl.getalldantoc);
  },
  GetAllCoQuan: (params) => {
    return params?.isPublic
      ? apiGetToken(apiUrl.getallcoquan)
      : apiGetAuth(apiUrl.getallcoquan);
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
};

export default api;
