import Axios from 'axios';
import {apiGetAuth, apiPostAuth} from '../../../../api';
import {getDefaultPageSize} from '../../../../helpers/utility';
import server from '../../../../settings';
import {LoaiTiepDan} from '../../../../settings/constants';

const apiUrl = {
  danhsachtiepcongdanthuongxuyen: server.v2Url + 'TiepDan/GetListPaging',
  chitietdonthu: server.v2Url + 'TiepDan/GetByID',
  themmoidonthu: server.v2Url + 'TiepDan/Save',
  suadonthu: server.v2Url + 'TiepDan/Save',
  xoadonthu: server.v2Url + 'TiepDan/Delete',
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
  chitietdonthu2: server.v2Url + 'ChiTietDonThu/GetChiTietDonThu',
  kiemtratrung: server.v2Url + 'TiepDan/GetDonTrung',
  khieutolan2: server.v2Url + 'TiepDan/KiemTraKhieuToLan2',
  ctdontrung: server.v2Url + 'TiepDan/CTDonTrung',
  ctdonthukhieutolan2: server.v2Url + 'TiepDan/CTDonKhieuToLan2',
  tiepdankhongden: server.v2Url + 'TiepDan/SaveTiepCongDan_DanKhongDen',
  rutdon: server.v2Url + 'TiepDan/RutDon',
};
// lay danh sach
const api = {
  DanhSachTiepCongDanThuongXuyen: (param) => {
    return apiGetAuth(apiUrl.danhsachtiepcongdanthuongxuyen, {
      ...param,
      // LoaiTiepDanID: LoaiTiepDan.ThuongXuyen,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  TiepDanKhongDen: (params) => {
    return apiPostAuth(apiUrl.tiepdankhongden, params);
  },
  KiemTraTrung: (params) => {
    return apiGetAuth(apiUrl.kiemtratrung, params);
  },
  KhieuToTan2: (params) => {
    return apiGetAuth(apiUrl.khieutolan2, params);
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
      // LoaiTiepDanID: LoaiTiepDan.ThuongXuyen,
    });
  },

  ThemMoiDonThu: (param) => {
    return apiPostAuth(apiUrl.themmoidonthu, {
      ...param,
      // LoaiTiepDanID: LoaiTiepDan.ThuongXuyen,
    });
  },

  SuaDonThu: (param) => {
    return apiPostAuth(apiUrl.suadonthu, {
      ...param,
      // LoaiTiepDanID: LoaiTiepDan.ThuongXuyen,
    });
  },

  XoaDonThu: (param) => {
    return apiPostAuth(apiUrl.xoadonthu, {
      ...param,
      // LoaiTiepDanID: LoaiTiepDan.ThuongXuyen,
    });
  },

  RutDon: (param) => {
    return apiPostAuth(apiUrl.rutdon, {
      ...param,
    });
  },
};

export default api;
