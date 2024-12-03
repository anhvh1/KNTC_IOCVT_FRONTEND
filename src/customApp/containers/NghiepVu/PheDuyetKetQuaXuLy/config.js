import Axios from 'axios';
import {apiGetAuth, apiPostAuth} from '../../../../api';
import {getDefaultPageSize} from '../../../../helpers/utility';
import server from '../../../../settings';

const apiUrl = {
  danhsachpheduyetketquaxuly: server.v2Url + 'PheDuyetKetQuaXuLy/GetListPaging',
  ketquaxulydon: server.v2Url + 'XuLyDon/GetByID',
  trinhdonthu: server.v2Url + 'PheDuyetKetQuaXuLy/TrinhDuThao',
  trinhlanhdao: server.v2Url + 'PheDuyetKetQuaXuLy/TrinhLanhDao',
  suadonthu: server.v2Url + 'PheDuyetKetQuaXuLy/PheDuyetKetQuaXuLy',
  xoadonthu: server.v2Url + 'PheDuyetKetQuaXuLy/Delete',
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
  chitiettrinhduyet: server.v2Url + 'PheDuyetKetQuaXuLy/GetByID',
  luuduthao: server.v2Url + 'PheDuyetKetQuaXuLy/LuuDuThao',
  duyetduthao: server.v2Url + 'PheDuyetKetQuaXuLy/DuyetDuThao',
  pheduyetketquaxuly: server.v2Url + 'PheDuyetKetQuaXuLy/PheDuyetKetQuaXuLy',
  chitietdonthu2: server.v2Url + 'ChiTietDonThu/GetChiTietDonThu',
  chuyendon: server.v2Url + 'PheDuyetKetQuaXuLy/ChuyenDon',
  danhsachcoquanchuyendon:
    server.v2Url + 'PheDuyetKetQuaXuLy/GetCoQuanChuyenDon',
  danhsachlanhdao: server.v2Url + 'XuLyDon/GetDanhSachLanhDao',
  danhsachlanhdaopheduyet:
    server.v2Url + 'PheDuyetKetQuaXuLy/GetDanhSachLanhDao',
};
// lay danh sach
const api = {
  DanhSachPheDuyetKetQuaXuLy: (param) => {
    return apiGetAuth(apiUrl.danhsachpheduyetketquaxuly, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  DanhSachLanhDao: (param) => {
    return apiGetAuth(apiUrl.danhsachlanhdao);
  },
  DanhSachLanhDaoPheDuyet: (param) => {
    return apiGetAuth(apiUrl.danhsachlanhdaopheduyet);
  },
  ChiTietDonThu2: (params) => {
    return apiGetAuth(apiUrl.chitietdonthu2, {...params});
  },
  ChiTietTrinhDuyet: (params) => {
    return apiGetAuth(apiUrl.chitiettrinhduyet, {...params});
  },
  LuuDuThao: (params) => {
    return apiPostAuth(apiUrl.luuduthao, {...params});
  },
  DuyetDuThao: (params) => {
    return apiPostAuth(apiUrl.duyetduthao, {...params});
  },
  GetAllHuongXuLy: (params) => {
    return apiGetAuth(apiUrl.getallhuonngxuly);
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
  KetQuaXuLyDon: (param) => {
    return apiGetAuth(apiUrl.ketquaxulydon, {
      ...param,
    });
  },
  UploadFile: (params) => {
    return apiPostAuth(apiUrl.uploadfile, params);
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

  TrinhDonThu: (param) => {
    return apiPostAuth(apiUrl.trinhdonthu, param);
  },
  TrinhLanhDao: (param) => {
    return apiPostAuth(apiUrl.trinhlanhdao, param);
  },
  PheDuyetKetQuaXuLy: (param) => {
    return apiPostAuth(apiUrl.pheduyetketquaxuly, {
      ...param,
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
};

export default api;
