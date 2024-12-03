import ReducerDanToc from '../redux/DanhMuc/DanhMucDanToc/reducer';
import NhatKyHeThong from './HeThong/NhatKyHeThong/reducer';
import DanhMucQuocTich from './DanhMuc/DanhMucQuocTich/reducer';
import DanhMucDiaGioi from './DanhMuc/DMDiaGioi/reducer';
import DanhMucChucVu from './DanhMuc/DMChucVu/reducer';
import DanhMucHGQ from './DanhMuc/DanhMucHuongGiaiQuyet/reducer';
import DanhMucLoaiVanBanKemTheo from './DanhMuc/DanhMucLoaiVanBanKemTheo/reducer';
import DanhMucNguonDonDen from './DanhMuc/DanhMucNguonDonDen/reducer';
import DanhMucNhomFile from './DanhMuc/DanhMucFileDinhKem/nhomFileReducer';
import DanhMucThamQuyen from './DanhMuc/DMThamQuyen/reducer';
import DanhMucBuocXacMinh from './DanhMuc/DMBuocXacMinh/reducer';
import DanhMucLoaiKetQua from './DanhMuc/DMLoaiKetQua/reducer';
import DanhMucPhanTichKQ from './DanhMuc/DMPhanTichKetQua/reducer';
import DMCoQuan from './DanhMuc/DMCoQuan/reducer';
import DanhMucTrangThaiDon from './DanhMuc/DanhMucTrangThaiDon/reducer';
import DanhMucPhongBan from './DanhMuc/DMPhongBan/reducer';
// import BaoCaoTongHopKetQuaThanhTraHanhChinh from './BaoCao/THKetQuaThanhTraHanhChinh/reducer';
import DanhMucLoaiKhieuTo from './DanhMuc/DMLoaiKhieuTo/reducer';
import DanhMucBieuMau from './DanhMuc/DanhMucBieuMau/reducer';
import DanhMucChiaTachSapNhap from './DanhMuc/DMChiaTachSapNhap/reducer';
// Hệ Thống
import QLPhanQuyen from './HeThong/QLPhanQuyen/reducer';
import ListSideBar from './HeThong/Sidebar/reducer';
import QLNguoiDung from './HeThong/QLNguoiDung/reducer';
import QLChucNang from './HeThong/QLChucNang/reducer';
import QuanLyThamSoHeThong from './HeThong/QLThamSoHeThong/reducer';
import XoaDonThuLoi from './HeThong/XoaDonThuLoi/reducer';
import HuongDanSuDung from './HeThong/HuongDanSuDung/reducer';
import DongBoDuLieu from './HeThong/DongBoDuLieu/reducer';
import QuanLyEmail from './HeThong/QLEmail/reducer';
import QuyetDinhGiaiQuyet from './HeThong/QuyetDinhGiaiQuyet/reducer';
import TraCuuQuyetDinhGiaiQuyet from './HeThong/TraCuuQuyetDinhGiaiQuyet/reducer';
import TraCuuHoSoDonThu from './HeThong/TraCuuHoSoDonThu/reducer';
// Dashboard
import DashBoard from './DashBoard/reducer';

// Report
import Report from './BaoCao/Report/reducer';
import ThongKeNhapLieu from './BaoCao/ThongKeNhapLieu/reducer';
import BaoCaoChung from './BaoCao/BaoCaoChung/reducer';
// NghiepVu
import DonThuDaTiepNhan from './NghiepVu/DonThuDaTiepNhan/reducer';
// import TiepDanDinhKy from './NghiepVu/TiepCongDanDinhKy/reducer';
// import TiepDanDotXuat from './NghiepVu/TiepCongDanDotXuat/reducer';
import TiepDanThuongXuyen from './NghiepVu/TiepCongDanThuongXuyen/reducer';
import XuLyDon from './NghiepVu/XuLyDon/reducer';
import PhanXuLyDon from './NghiepVu/PhanXuLyDon/reducer';
import PheDuyetKetQuaXuLy from './NghiepVu/PheDuyetKetQuaXuLy/reducer';
import GiaoXacMinh from './NghiepVu/GiaoXacMinh/reducer';
import TiepNhanDon from './NghiepVu/TiepNhanDon/reducer';
import TheoGioiGiaiQuyet from './NghiepVu/TheoGioiGiaiQuyetKNTC/reducer';
import ThiHanh from './NghiepVu/ThiHanh/reducer';
import CapNhatQDGiaoXacMinh from './NghiepVu/CapNhatQDGiaoXacMinh/reducer';
import CapNhatQuyetDinhGiaiQuyet from './NghiepVu/CapNhatQuyetDinhGiaiQuyet/reducer';
import TheoDoiThiHanhQDGiaiQuyet from './NghiepVu/TheoDoiThiHanhQDGiaiQuyet/reducer';
import SoTiepDan from './NghiepVu/SoTiepDan/reducer';
import PhanXuLyDonCT from './NghiepVu/PhanXuLyDonCT/reducer';
import QLVuViecPhucTap from './NghiepVu/QuanLyVuViecPhucTap/reducer';
import CapNhatQDTLToXacMinh from './NghiepVu/CapNhatQDTLToXacMinh/reducer';

import TraCuu from './Public/TraCuu/reducer';
import QLLichTiepDan from './CongThongTin/QuanLyLichTiepDan/reducer';
import KKDLDauKy from './BaoCao/GetDuLieuDauKy/reducer';
import QLTrinhTuThuTuc from './CongThongTin/QuanLyTrinhTuThuTuc/reducer';
import QLHuongDanSuDung from './HeThong/QLHuongDanSuDung/reducer';
import QLHoSoDonThu from './NghiepVu/QuanLyHoSoDonThu/reducer';
import KetQuaTranhChap from './NghiepVu/KetQuaTranhChap/reducer';
import QuanLyDonThuCanDonDoc from './NghiepVu/QuanLyDonThuCanDonDoc/reducer';
export default {
  NhatKyHeThong,
  QLHuongDanSuDung,
  ReducerDanToc,
  DMCoQuan,
  DanhMucQuocTich,
  DanhMucDiaGioi,
  DanhMucChucVu,
  DanhMucHGQ,
  DanhMucLoaiVanBanKemTheo,
  DanhMucNguonDonDen,
  DongBoDuLieu,
  DanhMucNhomFile,
  DanhMucThamQuyen,
  DanhMucBuocXacMinh,
  DanhMucLoaiKetQua,
  DanhMucPhanTichKQ,
  QLPhanQuyen,
  QuanLyEmail,
  DanhMucChiaTachSapNhap,
  // BaoCaoTongHopKetQuaThanhTraHanhChinh,
  DanhMucTrangThaiDon,
  DashBoard,
  DanhMucPhongBan,
  DanhMucLoaiKhieuTo,
  DanhMucBieuMau,
  ListSideBar,
  QLNguoiDung,
  QLChucNang,
  QuanLyThamSoHeThong,
  CapNhatQDTLToXacMinh,
  XoaDonThuLoi,
  HuongDanSuDung,
  QuyetDinhGiaiQuyet,
  TraCuuQuyetDinhGiaiQuyet,
  TraCuuHoSoDonThu,

  Report,
  KKDLDauKy,
  ThongKeNhapLieu,
  BaoCaoChung,
  DonThuDaTiepNhan,
  // TiepDanDinhKy,
  // TiepDanDotXuat,
  TiepDanThuongXuyen,
  XuLyDon,
  PhanXuLyDon,
  PheDuyetKetQuaXuLy,
  GiaoXacMinh,
  TiepNhanDon,
  TheoGioiGiaiQuyet,
  CapNhatQDGiaoXacMinh,
  ThiHanh,
  CapNhatQuyetDinhGiaiQuyet,
  TheoDoiThiHanhQDGiaiQuyet,
  SoTiepDan,
  PhanXuLyDonCT,
  TraCuu,
  QLLichTiepDan,
  QLTrinhTuThuTuc,
  QLVuViecPhucTap,
  QLHoSoDonThu,
  KetQuaTranhChap,
  QuanLyDonThuCanDonDoc,
};
