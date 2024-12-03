import Axios from 'axios';
import {apiGetAuth, apiPostAuth} from '../../../../api';
import {getDefaultPageSize} from '../../../../helpers/utility';
import server from '../../../../settings';

const apiUrl = {
  danhsachhosodonthu: server.v2Url + 'QuanLyHoSoDonThu/GetListPaging',
  uploadfile: server.v2Url + 'FileDinhKem/Insert',
  chitietdonthu2: server.v2Url + 'ChiTietDonThu/GetChiTietDonThu',
  danhsachthongtinbosung: server.v2Url + 'QuanLyHoSoDonThu/ThongTinBoSung',
  exportexcel: server.v2Url + 'QuanLyHoSoDonThu/ExportExcel',
};
// lay danh sach
const api = {
  DanhSachHoSoDonThu: (param) => {
    return apiGetAuth(apiUrl.danhsachhosodonthu, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  DanhSachThongTinBoSung: (param) => {
    return apiGetAuth(apiUrl.danhsachthongtinbosung, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  ChuyenDon: (param) => {
    return apiPostAuth(apiUrl.chuyendon, {
      ...param,
    });
  },
  DanhSachCoQuanChuyenDon: (param) => {
    return apiGetAuth(apiUrl.danhsachcoquanchuyendon, {
      ...param,
    });
  },
  DanhSachLanhDao: (param) => {
    return apiGetAuth(apiUrl.danhsachlanhdao);
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

  ExportExcel: (param) => {
    return apiGetAuth(apiUrl.exportexcel, {
      ...param,
    });
  },

  CapNhatVBDonDoc: (param) => {
    return apiPostAuth(apiUrl.capnhatvbdondoc, param);
  },

  UploadFile: (params) => {
    return apiPostAuth(apiUrl.uploadfile, params);
  },

  SuaDonThu: (param) => {
    return apiPostAuth(apiUrl.suadonthu, {
      ...param,
    });
  },

  XoaDonThu: (param) => {
    return apiPostAuth(apiUrl.xoadonthu, param);
  },
};

export default api;
