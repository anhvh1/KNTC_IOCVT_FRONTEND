import NhatKyHeThong from "./HeThong/NhatKyHeThong/reducer";
import DanhMucDiaGioi from "./DanhMuc/DMDiaGioi/reducer";
import DanhMucChucVu from "./DanhMuc/DMChucVu/reducer";
import DMCoQuan from "./DanhMuc/DMCoQuan/reducer";
import DMDoanhNghiep from "./DanhMuc/DMDoanhNghiep/reducer";
import DMLinhVuc from "./DanhMuc/DMLinhVuc/reducer";
import DMKyNghiLe from "./DanhMuc/DMKyNghiLe/reducer";
import DMPhanLoaiThanhTra from "./DanhMuc/DMPhanLoaiThanhTraKiemTra/reducer";
import DMNoiDungThanhTraKiemTra from "./DanhMuc/DMNoiDungThanhTraKiemTra/reducer";
import DanhMucPhongBan from "./DanhMuc/DMPhongBan/reducer";
import QLThuTucTienHanhCuocTTKT from "./NghiepVu/QLThuTucTienHanhCuocTTKT/reducer";
import QLKeHoachDuKienTTKT from "./NghiepVu/QLKeHoachDuKienTTKT/reducer";
import BanHanhKeHoachTTKT from "./NghiepVu/BanHanhKeHoachTTKT/reducer";
import TaoCuocThanhTraKiemTra from "./NghiepVu/TaoCuocTTKT/reducer";
import PhanCongSoTheoDoi from "./NghiepVu/PhanCongSoTheoDoi/reducer";
import PhanCongCNSL from "./NghiepVu/PhanCongCNSL/reducer";
import QLDonDoc from "./NghiepVu/QLDonDoc/reducer";

import CapNhatSoLieu from "./NghiepVu/CapNhatSoLieu/reducer";
import CapNhatSoTheoDoi from "./NghiepVu/CapNhatSoTheoDoi/reducer";

// Hệ Thống
import QLPhanQuyen from "./HeThong/QLPhanQuyen/reducer";
import ListSideBar from "./HeThong/Sidebar/reducer";
import QLNguoiDung from "./HeThong/QLNguoiDung/reducer";
import HuongDanSuDung from "./HeThong/HuongDanSuDung/reducer";
import QuanLyThamSoHeThong from "./HeThong/QLThamSoHeThong/reducer";
// Dashboard
import DashBoard from "./DashBoard/reducer";
// Report
import Report from "./BaoCao/Report/reducer";
import ThongKeNhapLieu from "./BaoCao/ThongKeNhapLieu/reducer";
import BaoCaoChung from "./BaoCao/BaoCaoChung/reducer";
import TraCuu from "./Public/TraCuu/reducer";
import KKDLDauKy from "./BaoCao/GetDuLieuDauKy/reducer";
import QLHuongDanSuDung from "./HeThong/QLHuongDanSuDung/reducer";
import Inspection from "./NghiepVu/Inspection/reducer";
import LoiKyThuat from "./HeThong/LoiKyThuat/reducer";
import SyntheticPlan from "./NghiepVu/SyntheticPlan/reducer";
import ReportDocument from "./NghiepVu/ReportDocument/reducer";
import Lookup from "./NghiepVu/Lookup/reducer";
export default {
  NhatKyHeThong,
  QLHuongDanSuDung,
  DMCoQuan,
  DanhMucDiaGioi,
  DanhMucChucVu,
  TaoCuocThanhTraKiemTra,
  // DongBoDuLieu,
  DMDoanhNghiep,
  DMLinhVuc,
  DMKyNghiLe,
  DMPhanLoaiThanhTra,
  DMNoiDungThanhTraKiemTra,
  QLPhanQuyen,
  QLKeHoachDuKienTTKT,
  DashBoard,
  DanhMucPhongBan,
  ListSideBar,
  QLNguoiDung,
  QLThuTucTienHanhCuocTTKT,
  QuanLyThamSoHeThong,
  HuongDanSuDung,
  BanHanhKeHoachTTKT,
  Report,
  KKDLDauKy,
  ThongKeNhapLieu,
  BaoCaoChung,
  TraCuu,
  Inspection,
  LoiKyThuat,
  SyntheticPlan,
  ReportDocument,
  PhanCongCNSL,
  PhanCongSoTheoDoi,
  CapNhatSoLieu,

  Lookup,

  CapNhatSoTheoDoi,
  QLDonDoc,
};
