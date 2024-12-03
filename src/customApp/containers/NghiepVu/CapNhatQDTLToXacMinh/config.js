import Axios from 'axios';
import {apiGetAuth, apiPostAuth} from '../../../../api';
import {getDefaultPageSize} from '../../../../helpers/utility';
import server from '../../../../settings';

const apiUrl = {
  danhsachxulydon: server.v2Url + 'GiaiQuyetDon/GetListPaging_QuyTrinhDonGian',
  chitietxacminhnoidungdon: server.v2Url + 'GiaiQuyetDon/GetByID',
  giaoxacminh: server.v2Url + 'GiaiQuyetDon/GiaoXacMinh_QuyTrinhDonGian',
  suadonthu: server.v2Url + 'GiaiQuyetDon/GiaoXacMinh_QuyTrinhDonGian',
  xoadonthu: server.v2Url + 'GiaiQuyetDon/Delete',
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
  chitietbuocxacminh: server.v2Url + 'TiepDan/GetSTTHoSo',
  trinhbaocaoxacminh: server.v2Url + 'GiaiQuyetDon/TrinhBaoCaoXacMinh',
  duyetbaocaoxacminh: server.v2Url + 'GiaiQuyetDon/DuyetBaoCaoXacMinh',
  ketquaxulydon: server.v2Url + 'XuLyDon/GetByID',
  danhsachtruongphong: server.v2Url + 'GiaiQuyetDon/GetTruongPhong',
  danhsachcanbogq: server.v2Url + 'GiaiQuyetDon/GetCanBoGQ',
  danhsachbuocxacminhbyxulydonid:
    server.v2Url + 'GiaiQuyetDon/DanhSachBuocXacMinhByXuLyDonID',
  capnhatquyetdinhgiaoxacminh:
    server.v2Url + 'GiaiQuyetDon/CapNhatQuyetDinhGiaoXacMinh',
  uploadfile: server.v2Url + 'FileDinhKem/Insert',
  chitietdonthu2: server.v2Url + 'ChiTietDonThu/GetChiTietDonThu',
  banhanhquyetdinhgiaiquyet: server.v2Url + 'BanHanhQuyetDinhGQ/SaveBanHanh',

  rutdon: server.v2Url + 'GiaiQuyetDon/RutDon',
};
// lay danh sach
const api = {
  DanhSachGiaoXacMinh: (param) => {
    return apiGetAuth(apiUrl.danhsachxulydon, {
      ...param,
      PageNumber: param.PageNumber ? param.PageNumber : 1,
      PageSize: param.PageSize ? param.PageSize : getDefaultPageSize(),
    });
  },
  RutDon: (param) => {
    return apiPostAuth(apiUrl.rutdon, param);
  },

  BanHanhQuyetDinhGiaiQuyet: (param) => {
    return apiPostAuth(apiUrl.banhanhquyetdinhgiaiquyet, param);
  },

  DanhSachTruongPhong: (param) => {
    return apiGetAuth(apiUrl.danhsachtruongphong, {
      ...param,
    });
  },
  ChiTietDonThu2: (params) => {
    return apiGetAuth(apiUrl.chitietdonthu2, {...params});
  },
  UploadFile: (params) => {
    return apiPostAuth(apiUrl.uploadfile, params);
  },
  DanhSachCanBoGQ: (param) => {
    return apiGetAuth(apiUrl.danhsachcanbogq, {
      ...param,
    });
  },
  TrinhBaoCaoXacMinh: (params) => {
    return apiPostAuth(apiUrl.trinhbaocaoxacminh, {
      ...params,
    });
  },
  DuyetBaoCaoXacMinh: (params) => {
    return apiPostAuth(apiUrl.duyetbaocaoxacminh, {
      ...params,
    });
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
  ChiTietBuoXacMinh: (params) => {
    return apiPostAuth(apiUrl.chitietbuocxacminh, {
      ...params,
    });
  },
  KetQuaXuLyDon: (param) => {
    return apiGetAuth(apiUrl.ketquaxulydon, {
      ...param,
    });
  },
  GiaoXacMinh: (param) => {
    return apiPostAuth(apiUrl.giaoxacminh, param);
  },
  CapNhatQuyetDinhGiaoXacMinh: (param) => {
    return apiPostAuth(apiUrl.capnhatquyetdinhgiaoxacminh, param);
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
  ChiTietXacMinhNoiDungDon: (param) => {
    return apiGetAuth(apiUrl.chitietxacminhnoidungdon, {
      ...param,
    });
  },
};

export default api;
