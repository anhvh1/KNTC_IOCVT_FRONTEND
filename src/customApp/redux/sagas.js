import { all } from "redux-saga/effects";
import DanhMucDiaGioi from "./DanhMuc/DMDiaGioi/saga";
import ReducerChucVu from "./DanhMuc/DMChucVu/saga";
import DMCoQuan from "./DanhMuc/DMCoQuan/saga";
import DanhMucPhongBan from "./DanhMuc/DMPhongBan/saga";
import DMLinhVuc from "./DanhMuc/DMLinhVuc/saga";
import DMKyNghiLe from "./DanhMuc/DMKyNghiLe/saga";
import DMDoanhNghiep from "./DanhMuc/DMDoanhNghiep/saga";
import DMPhanLoaiThanhTra from "./DanhMuc/DMPhanLoaiThanhTraKiemTra/saga";
import DMNoiDungThanhTraKiemTra from "./DanhMuc/DMNoiDungThanhTraKiemTra/saga";
import QLThuTucTienHanhCuocTTKT from "./NghiepVu/QLThuTucTienHanhCuocTTKT/saga";
import NhatKyHeThong from "./HeThong/NhatKyHeThong/saga";
import QLKeHoachDuKienTTKT from "./NghiepVu/QLKeHoachDuKienTTKT/saga";
import BanHanhKeHoachTTKT from "./NghiepVu/BanHanhKeHoachTTKT/saga";
import TaoCuocThanhTraKiemTra from "./NghiepVu/TaoCuocTTKT/saga";
import PhanCongSoTheoDoi from "./NghiepVu/PhanCongSoTheoDoi/saga";
import PhanCongCNSL from "./NghiepVu/PhanCongCNSL/saga";
import QLDonDoc from "./NghiepVu/QLDonDoc/saga";

import CapNhatSoLieu from "./NghiepVu/CapNhatSoLieu/saga";
import CapNhatSoTheoDoi from "./NghiepVu/CapNhatSoTheoDoi/saga";
// Hệ Thống
import QLPhanQuyen from "./HeThong/QLPhanQuyen/saga";
import ListSideBar from "./HeThong/Sidebar/saga";
import QLNguoiDung from "./HeThong/QLNguoiDung/saga";
import QLChucNang from "./HeThong/QLChucNang/saga";
import QuanLyThamSoHeThong from "./HeThong/QLThamSoHeThong/saga";
import QLHuongDanSuDung from "./HeThong/QLHuongDanSuDung/saga";
// Dashboard
import DashBoard from "./DashBoard/saga";

// Report
import Report from "./BaoCao/Report/saga";
import ThongKeNhapLieu from "./BaoCao/ThongKeNhapLieu/saga";
import BaoCaoChung from "./BaoCao/BaoCaoChung/saga";

import TraCuu from "./Public/TraCuu/saga";
import KKDLDauKy from "./BaoCao/GetDuLieuDauKy/saga";
import Inspection from "./NghiepVu/Inspection/saga";
import LoiKyThuat from "./HeThong/LoiKyThuat/saga";
import SyntheticPlan from "./NghiepVu/SyntheticPlan/saga";
import ReportDocument from "./NghiepVu/ReportDocument/saga";
import Lookup from "./NghiepVu/Lookup/saga";
export default function* devSaga() {
  yield all([
    NhatKyHeThong(),
    QLHuongDanSuDung(),
    TaoCuocThanhTraKiemTra(),
    DMCoQuan(),
    DanhMucDiaGioi(),
    DMKyNghiLe(),
    ReducerChucVu(),
    QLPhanQuyen(),
    DMPhanLoaiThanhTra(),
    DashBoard(),
    QLThuTucTienHanhCuocTTKT(),
    DanhMucPhongBan(),
    QLNguoiDung(),
    ListSideBar(),
    QLChucNang(),
    QLKeHoachDuKienTTKT(),
    DMDoanhNghiep(),
    DMLinhVuc(),
    DMNoiDungThanhTraKiemTra(),
    Report(),
    KKDLDauKy(),
    ThongKeNhapLieu(),
    BaoCaoChung(),
    TraCuu(),
    QuanLyThamSoHeThong(),
    Inspection(),
    LoiKyThuat(),
    BanHanhKeHoachTTKT(),
    SyntheticPlan(),
    PhanCongCNSL(),
    PhanCongSoTheoDoi(),
    ReportDocument(),
    CapNhatSoLieu(),
    Lookup(),
    CapNhatSoTheoDoi(),
    QLDonDoc(),
  ]);
}
