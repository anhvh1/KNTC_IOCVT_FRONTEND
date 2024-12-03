import {all} from 'redux-saga/effects';
import DanhMucDanToc from './DanhMuc/DanhMucDanToc/saga';
import DanhMucQuocTich from './DanhMuc/DanhMucQuocTich/saga';
import DanhMucDiaGioi from './DanhMuc/DMDiaGioi/saga';
import ReducerChucVu from './DanhMuc/DMChucVu/saga';
import DanhMucHuongGiaiQuyet from './DanhMuc/DanhMucHuongGiaiQuyet/saga';
import DanhMucLoaiVanBanKemTheo from './DanhMuc/DanhMucLoaiVanBanKemTheo/saga';
import DanhMucNguonDonDen from './DanhMuc/DanhMucNguonDonDen/saga';
import DanhMucNhomFile from './DanhMuc/DanhMucFileDinhKem/nhomFileSaga';
import DanhMucThamQuyen from './DanhMuc/DMThamQuyen/saga';
import DanhMucBuocXacMinh from './DanhMuc/DMBuocXacMinh/saga';
import DanhMucLoaiKetQua from './DanhMuc/DMLoaiKetQua/saga';
import DanhMucPhanTichKQ from './DanhMuc/DMPhanTichKetQua/saga';
import DMCoQuan from './DanhMuc/DMCoQuan/saga';
import DanhMucTrangThaiDon from './DanhMuc/DanhMucTrangThaiDon/saga';
import DanhMucPhongBan from './DanhMuc/DMPhongBan/saga';
import DanhMucLoaiKhieuTo from './DanhMuc/DMLoaiKhieuTo/saga';
import NhatKyHeThong from './HeThong/NhatKyHeThong/saga';
// import BaoCaoTongHopKetQuaThanhTraHanhChinh from './BaoCao/THKetQuaThanhTraHanhChinh/saga';
import DanhMucBieuMau from './DanhMuc/DanhMucBieuMau/saga';
import DanhMucChiaTachSapNhap from './DanhMuc/DMChiaTachSapNhap/saga';

// Hệ Thống
import QuyetDinhGiaiQuyet from './HeThong/QuyetDinhGiaiQuyet/saga';
import QLPhanQuyen from './HeThong/QLPhanQuyen/saga';
import ListSideBar from './HeThong/Sidebar/saga';
import QLNguoiDung from './HeThong/QLNguoiDung/saga';
import QLChucNang from './HeThong/QLChucNang/saga';
import QuanLyThamSoHeThong from './HeThong/QLThamSoHeThong/saga';
import XoaDonThuLoi from './HeThong/XoaDonThuLoi/saga';
import DongBoDuLieu from './HeThong/DongBoDuLieu/saga';
import QLHuongDanSuDung from './HeThong/QLHuongDanSuDung/saga';
import QuanLyEmail from './HeThong/QLEmail/saga';
import TraCuuQuyetDinhGiaiQuyet from './HeThong/TraCuuQuyetDinhGiaiQuyet/saga';
import TraCuuHoSoDonThu from './HeThong/TraCuuHoSoDonThu/saga';
// Dashboard
import DashBoard from './DashBoard/saga';

// Report
import Report from './BaoCao/Report/saga';
import ThongKeNhapLieu from './BaoCao/ThongKeNhapLieu/saga';
import BaoCaoChung from './BaoCao/BaoCaoChung/saga';
// NghiepVu
import DonThuDaTiepNhan from './NghiepVu/DonThuDaTiepNhan/saga';
// import TiepDanDinhKy from './NghiepVu/TiepCongDanDinhKy/saga';
// import TiepDanDotXuat from './NghiepVu/TiepCongDanDotXuat/saga';
import TiepDanThuongXuyen from './NghiepVu/TiepCongDanThuongXuyen/saga';
import XuLyDon from './NghiepVu/XuLyDon/saga';
import PhanXuLyDon from './NghiepVu/PhanXuLyDon/saga';
import PheDuyetKetQuaXuLy from './NghiepVu/PheDuyetKetQuaXuLy/saga';
import GiaoXacMinh from './NghiepVu/GiaoXacMinh/saga';
import TiepNhanDon from './NghiepVu/TiepNhanDon/saga';
import ThiHanh from './NghiepVu/GiaiQuyetDonThu/saga';
import TheoGioiGiaiQuyet from './NghiepVu/TheoGioiGiaiQuyetKNTC/saga';
import CapNhatQDGiaoXacMinh from './NghiepVu/CapNhatQDGiaoXacMinh/saga';
import CapNhatQuyetDinhGiaiQuyet from './NghiepVu/CapNhatQuyetDinhGiaiQuyet/saga';
import TheoDoiThiHanhQDGiaiQuyet from './NghiepVu/TheoDoiThiHanhQDGiaiQuyet/saga';
import SoTiepDan from './NghiepVu/SoTiepDan/saga';
import PhanXuLyDonCT from './NghiepVu/PhanXuLyDonCT/saga';
import QLVuViecPhucTap from './NghiepVu/QuanLyVuViecPhucTap/saga';
import CapNhatQDTLToXacMinh from './NghiepVu/CapNhatQDTLToXacMinh/saga';
import TraCuu from './Public/TraCuu/saga';
import QLLichTiepDan from './CongThongTin/QuanLyLichTiepDan/saga';
import QLTrinhTuThuTuc from './CongThongTin/QuanLyTrinhTuThuTuc/saga';
import KKDLDauKy from './BaoCao/GetDuLieuDauKy/saga';
import QLHoSoDonThu from './NghiepVu/QuanLyHoSoDonThu/saga';
import KetQuaTranhChap from './NghiepVu/KetQuaTranhChap/saga';
import QuanLyDonThuCanDonDoc from './NghiepVu/QuanLyDonThuCanDonDoc/saga';

export default function* devSaga() {
  yield all([
    NhatKyHeThong(),
    QLHuongDanSuDung(),
    DanhMucDanToc(),
    DanhMucQuocTich(),
    DMCoQuan(),
    DanhMucDiaGioi(),
    ReducerChucVu(),
    DanhMucHuongGiaiQuyet(),
    DanhMucLoaiVanBanKemTheo(),
    DanhMucNguonDonDen(),
    DanhMucNhomFile(),
    DanhMucThamQuyen(),
    DanhMucBuocXacMinh(),
    DanhMucPhanTichKQ(),
    QLPhanQuyen(),
    DanhMucLoaiKetQua(),
    DashBoard(),
    DongBoDuLieu(),
    // BaoCaoTongHopKetQuaThanhTraHanhChinh(),
    DanhMucTrangThaiDon(),
    DanhMucPhongBan(),
    DanhMucLoaiKhieuTo(),
    DanhMucBieuMau(),
    QLNguoiDung(),
    ListSideBar(),
    QLChucNang(),
    QuanLyThamSoHeThong(),
    XoaDonThuLoi(),
    QuanLyEmail(),
    DanhMucChiaTachSapNhap(),
    QuyetDinhGiaiQuyet(),
    TraCuuQuyetDinhGiaiQuyet(),
    TraCuuHoSoDonThu(),

    Report(),
    KKDLDauKy(),
    ThongKeNhapLieu(),
    BaoCaoChung(),
    DonThuDaTiepNhan(),
    // TiepDanDinhKy(),
    // TiepDanDotXuat(),
    TiepDanThuongXuyen(),
    XuLyDon(),
    PhanXuLyDon(),
    PheDuyetKetQuaXuLy(),
    GiaoXacMinh(),
    TiepNhanDon(),
    ThiHanh(),
    TheoGioiGiaiQuyet(),
    CapNhatQDGiaoXacMinh(),
    CapNhatQuyetDinhGiaiQuyet(),
    TheoDoiThiHanhQDGiaiQuyet(),
    SoTiepDan(),
    PhanXuLyDonCT(),
    QLVuViecPhucTap(),
    CapNhatQDTLToXacMinh(),

    TraCuu(),
    QLLichTiepDan(),
    QLTrinhTuThuTuc(),
    QLHoSoDonThu(),
    KetQuaTranhChap(),
    QuanLyDonThuCanDonDoc(),
  ]);
}
