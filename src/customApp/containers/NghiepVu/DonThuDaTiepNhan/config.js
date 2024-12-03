import Axios from 'axios';
import {apiGetAuth, apiPostAuth} from '../../../../api';
import {getDefaultPageSize} from '../../../../helpers/utility';
import server from '../../../../settings';
import {getLocalKey} from '../../../../helpers/utility';
const user = getLocalKey('user', {});
const isBanTiepDan = user?.BanTiepDan
  ? user.BanTiepDan && user?.CapID === 4
  : false;

const apiUrl = {
  danhsachsotiepdan: server.v2Url + 'TiepDan/DanhSachDonThuDaTiepNhan',
  chitietdonthu: server.v2Url + 'TiepDan/GetByID',
  themmoidonthu: server.v2Url + 'TiepDan/Save',
  chitietdonthubantiepdan: server.v2Url + 'TiepDan/TiepDanDinhKy_GetByID',
  themmoidonthubantiepdan: server.v2Url + 'TiepDan/SaveTiepDanDinhKy',
  suadonthubantiepdan: server.v2Url + 'TiepDan/SaveTiepDanDinhKy',
  xoadonthubantiepdan: server.v2Url + 'TiepDan/DeleteTiepDanDinhKy',
  xoavuviecbantiepdan: server.v2Url + 'TiepDan/DeleteVuViec',
  suadonthu: server.v2Url + 'TiepDan/Save',
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
  getallphongxuly: server.v2Url + 'TiepDan/GetPhongXuLy',
  getalltenfile: server.v2Url + 'TiepDan/DanhMucTenFile',
  getallcoquan: server.v2Url + 'TiepDan/GetAllCoQuan',
  getallcap: server.v2Url + 'TiepDan/GetAllCap',
  getstthoso: server.v2Url + 'TiepDan/GetSTTHoSo',
  uploadfile: server.v2Url + 'FileDinhKem/Insert',
  getallcanbolanhdao: server.v2Url + 'TiepDan/GetDanhSachLanhDao',
  chitietdonthu2: server.v2Url + 'ChiTietDonThu/GetChiTietDonThu',
  danhsachtiepcongdandinhkybantiepdan:
    server.v2Url + 'TiepDan/TiepDanDinhKy_GetListPaging',
  danhsachbieumau: server.v2Url + 'TiepDan/DanhSachBieuMau',
  chitietbieumau: server.v2Url + 'TiepDan/InPhieu',
  inphieupdf: server.v2Url + 'TiepDan/InPhieuPDF',
  tiepdankhongden: server.v2Url + 'TiepDan/SaveTiepCongDan_DanKhongDen',
  getbyiddankhongden: server.v2Url + 'TiepDan/TiepDan_DanKhongDen_GetByID',
  chuyendonsangtiepdanthuongxuyen: server.v2Url + 'TiepNhanDon/ChuyenDonSangTiepDanThuongXuyen',
};
// lay danh sach
const api = {
  DanhSachSoTiepDan: (param) => {
    return apiGetAuth(apiUrl.danhsachsotiepdan, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  GetByIDDanKhongDen: (params) => {
    return apiGetAuth(apiUrl.getbyiddankhongden, params);
  },
  GetPrevewPDF: (param) => {
    return apiGetAuth(apiUrl.inphieupdf, {...param});
  },
  TiepDanKhongDen: (params) => {
    return apiPostAuth(apiUrl.tiepdankhongden, params);
  },
  DanhSachBieuMau: (param) => {
    return apiGetAuth(apiUrl.danhsachbieumau);
  },
  getChiTietBieuMau: (param) => {
    return apiGetAuth(apiUrl.chitietbieumau, {...param});
  },
  DanhSachTiepCongDanDinhKyBanTiepDan: (param) => {
    return apiGetAuth(apiUrl.danhsachtiepcongdandinhkybantiepdan, {
      ...param,
      LoaiTiepDanID: 2,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  DanhSachTiepCongDanDotXuatBanTiepDan: (param) => {
    return apiGetAuth(apiUrl.danhsachtiepcongdandinhkybantiepdan, {
      ...param,
      LoaiTiepDanID: 3,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
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
  ChiTietDonThuBanTiepDan: (param) => {
    return apiGetAuth(apiUrl.chitietdonthubantiepdan, {
      ...param,
    });
  },
  GetAllCanBoLanhDao: (param) => {
    return apiGetAuth(apiUrl.getallcanbolanhdao);
  },

  ThemMoiDonThuBanTiepDan: (param) => {
    return apiPostAuth(apiUrl.themmoidonthubantiepdan, {
      ...param,
    });
  },

  SuaDonThuBanTiepDan: (param) => {
    return apiPostAuth(apiUrl.suadonthubantiepdan, {
      ...param,
    });
  },

  XoaDonThuBanTiepDan: (param) => {
    return apiPostAuth(apiUrl.xoadonthubantiepdan, {
      ...param,
    });
  },
  ChiTietDonThu: (param) => {
    return apiGetAuth(apiUrl.chitietdonthu, {
      ...param,
    });
  },

  ThemMoiDonThu: (param) => {
    return apiPostAuth(apiUrl.themmoidonthu, {
      ...param,
      //  LoaiTiepDanID: 3
    });
  },

  SuaDonThu: (param) => {
    return apiPostAuth(apiUrl.suadonthu, {
      ...param,
    });
  },

  XoaDonThu: (param) => {
    return apiPostAuth(apiUrl.xoadonthu, param);
  },

  XoaVuViec: (param) => {
    return apiPostAuth(apiUrl.xoavuviecbantiepdan, param);
  },
  ChuyenDonSangTiepDanThuongXuyen: (xuLyDonIDIdS, donThuIDIDs, param) => {
    const url = `${apiUrl.chuyendonsangtiepdanthuongxuyen}?xuLyDonIDIdS=${xuLyDonIDIdS}&donThuIDIDs=${donThuIDIDs}`;
    return apiPostAuth(url, param);
  },
};

export default api;
