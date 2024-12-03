import asyncComponent from '../helpers/AsyncFunc';

const routes = [
  {
    path: '',
    component: asyncComponent(() => import('./containers/DashBoash')),
  },
  // Danh Mục
  {
    path: 'danh-muc-dan-toc',
    component: asyncComponent(() =>
      import('./containers/DanhMuc/DanhMucDanToc'),
    ),
  },
  {
    path: 'danh-muc-quoc-tich',
    component: asyncComponent(() =>
      import('./containers/DanhMuc/DanhMucQuocTich'),
    ),
  },
  {
    path: 'danh-muc-tinh-huyen-xa',
    component: asyncComponent(() => import('./containers/DanhMuc/DMDiaGioi')),
  },
  {
    path: 'danh-muc-co-quan',
    component: asyncComponent(() => import('./containers/DanhMuc/DMCoQuan')),
  },
  {
    path: 'danh-muc-tham-quyen',
    component: asyncComponent(() =>
      import('./containers/DanhMuc/DMThamQuyen/index'),
    ),
  },
  {
    path: 'danh-muc-phong-ban',
    component: asyncComponent(() =>
      import('./containers/DanhMuc/DMPhongBan/index'),
    ),
  },
  {
    path: 'danh-muc-chuc-vu',
    component: asyncComponent(() =>
      import('./containers/DanhMuc/DMChucVu/index'),
    ),
  },
  {
    path: 'danh-muc-loai-khieu-to',
    component: asyncComponent(() =>
      import('./containers/DanhMuc/DMLoaiKhieuTo'),
    ),
  },
  {
    path: 'chia-tach-sap-nhap',
    component: asyncComponent(() =>
      import('./containers/DanhMuc/DMChiaTachSapNhap/index'),
    ),
  },
  {
    path: 'danh-muc-huong-giai-quyet',
    component: asyncComponent(() =>
      import('./containers/DanhMuc/DanhMucHuongGiaiQuyet/index'),
    ),
  },
  {
    path: 'dm-bieu-mau',
    component: asyncComponent(() =>
      import('./containers/DanhMuc/DanhMucBieuMau/index'),
    ),
  },
  {
    path: 'danh-muc-loai-vb',
    component: asyncComponent(() =>
      import('./containers/DanhMuc/DanhMucLoaiVanBanKemTheo/index'),
    ),
  },
  {
    path: 'danh-muc-nguon-don-den',
    component: asyncComponent(() =>
      import('./containers/DanhMuc/DanhMucNguonDonDen'),
    ),
  },
  {
    path: 'danh-muc-file-dinh-kem',
    component: asyncComponent(() =>
      import('./containers/DanhMuc/DanhMucFileDinhKem'),
    ),
  },
  {
    path: 'danh-muc-buoc-xac-minh',
    component: asyncComponent(() =>
      import('./containers/DanhMuc/DMBuocXacMinh'),
    ),
  },
  {
    path: 'danh-muc-loai-ket-qua',
    component: asyncComponent(() =>
      import('./containers/DanhMuc/DMLoaiKetQua'),
    ),
  },
  {
    path: 'danh-muc-phan-tich-kq',
    component: asyncComponent(() =>
      import('./containers/DanhMuc/DMPhanTichKQ'),
    ),
  },
  //
  {
    path: 'danh-muc-trang-thai-don',
    component: asyncComponent(() =>
      import('./containers/DanhMuc/DMTrangThaiDon/index'),
    ),
  },
  //

  // Hệ Thống
  {
    path: 'phan-quyen',
    component: asyncComponent(() => import('./containers/HeThong/QLPhanQuyen')),
  },
  {
    path: 'nhat-ky-he-thong',
    component: asyncComponent(() =>
      import('./containers/HeThong/NhatKyHeThong'),
    ),
  },
  {
    path: 'tai-lieu-huong-dan',
    component: asyncComponent(() =>
      import('./containers/HeThong/QLHuongDanSuDung'),
    ),
  },
  {
    path: 'sao-luu-du-lieu',
    component: asyncComponent(() =>
      import('./containers/HeThong/QuanTriDuLieu'),
    ),
  },
  {
    path: 'quan-ly-nguoi-dung',
    component: asyncComponent(() =>
      import('./containers/HeThong/UserManagement'),
    ),
  },
  {
    path: 'tiep-dinh-ky',
    component: asyncComponent(() =>
      import('./containers/NghiepVu/TiepCongDanThuongXuyen'),
    ),
  },
  {
    path: 'tiep-dot-xuat',
    component: asyncComponent(() =>
      import('./containers/NghiepVu/TiepCongDanThuongXuyen'),
    ),
  },
  {
    path: 'tiep-thuong-xuyen',
    component: asyncComponent(() =>
      import('./containers/NghiepVu/TiepCongDanThuongXuyen'),
    ),
  },
  // {
  //   path: 'tiep-thuong-xuyen/:id',
  //   component: asyncComponent(() =>
  //     import('./containers/NghiepVu/TiepCongDanThuongXuyen'),
  //   ),
  // },
  {
    path: 'so-tiep-dan',
    component: asyncComponent(() =>
      import('./containers/NghiepVu/SoTiepDanGroup'),
    ),
  },
  {
    path: 'don-thu-da-tiep-nhan',
    component: asyncComponent(() =>
      import('./containers/NghiepVu/DonThuDaTiepNhan'),
    ),
  },
  {
    path: 'quan-ly-chuc-nang',
    component: asyncComponent(() => import('./containers/HeThong/QLChucNang')),
  },
  {
    path: 'dong-bo-du-lieu',
    component: asyncComponent(() =>
      import('./containers/HeThong/DongBoDuLieu'),
    ),
  },
  {
    path: 'ql-email',
    component: asyncComponent(() => import('./containers/HeThong/QuanLyEmail')),
  },
  {
    path: 'tham-so-he-thong',
    component: asyncComponent(() =>
      import('./containers/HeThong/QuanLyThamSoHeThong'),
    ),
  },
  {
    path: 'delete',
    component: asyncComponent(() =>
      import('./containers/HeThong/XoaDonThuLoi'),
    ),
  },
  {
    path: 'quy-trinh-he-thong',
    component: asyncComponent(() =>
      import('./containers/HeThong/QuyTrinhNghiepVu'),
    ),
  },
  {
    path: 'tra-cuu-trang-thai-hs',
    component: asyncComponent(() => import('./containers/HeThong/HoSoDonThu')),
  },
  {
    path: 'tra-cuu-qd-gq',
    component: asyncComponent(() =>
      import('./containers/HeThong/TraCuuQuyetDinhGiaiQuyet'),
    ),
  },
  {
    path: 'cau-hinh-quy-trinh',
    component: asyncComponent(() =>
      import('./containers/HeThong/CauHinhQuyTrinh'),
    ),
  },
  {
    path: 'quyet-dinh-giai-quyet',
    component: asyncComponent(() =>
      import('./containers/HeThong/QuyetDinhGiaiQuyet'),
    ),
  },
  {
    path: 'ql-ho-so-don-thu',
    component: asyncComponent(() =>
      import('./containers/NghiepVu/QuanLyHoSoDonThu'),
    ),
  },

  // Báo Cáo
  {
    path: 'ke-khai-du-lieu-dau-ky-tcd01',
    component: asyncComponent(() => import('./containers/BaoCao/KKDLDauKy')),
  },
  {
    path: 'ke-khai-du-lieu-dau-ky-tcd02',
    component: asyncComponent(() => import('./containers/BaoCao/KKDLDauKy')),
  },
  {
    path: 'ke-khai-du-lieu-dau-ky-xld01',
    component: asyncComponent(() => import('./containers/BaoCao/KKDLDauKy')),
  },
  {
    path: 'ke-khai-du-lieu-dau-ky-xld02',
    component: asyncComponent(() => import('./containers/BaoCao/KKDLDauKy')),
  },
  {
    path: 'ke-khai-du-lieu-dau-ky-xld03',
    component: asyncComponent(() => import('./containers/BaoCao/KKDLDauKy')),
  },
  {
    path: 'ke-khai-du-lieu-dau-ky-xld04',
    component: asyncComponent(() => import('./containers/BaoCao/KKDLDauKy')),
  },
  {
    path: 'ke-khai-du-lieu-dau-ky-kqgq01',
    component: asyncComponent(() => import('./containers/BaoCao/KKDLDauKy')),
  },
  {
    path: 'ke-khai-du-lieu-dau-ky-kqgq02',
    component: asyncComponent(() => import('./containers/BaoCao/KKDLDauKy')),
  },
  {
    path: 'ke-khai-du-lieu-dau-ky-kqgq03',
    component: asyncComponent(() => import('./containers/BaoCao/KKDLDauKy')),
  },
  {
    path: 'ke-khai-du-lieu-dau-ky-kqgq04',
    component: asyncComponent(() => import('./containers/BaoCao/KKDLDauKy')),
  },
  {
    path: 'TCD01',
    component: asyncComponent(() => import('./containers/BaoCao/BaoCaoChung')),
  },
  {
    path: 'TCD02',
    component: asyncComponent(() => import('./containers/BaoCao/BaoCaoChung')),
  },
  {
    path: 'XLD01',
    component: asyncComponent(() => import('./containers/BaoCao/BaoCaoChung')),
  },
  {
    path: 'XLD02',
    component: asyncComponent(() => import('./containers/BaoCao/BaoCaoChung')),
  },
  {
    path: 'XLD03',
    component: asyncComponent(() => import('./containers/BaoCao/BaoCaoChung')),
  },
  {
    path: 'XLD04',
    component: asyncComponent(() => import('./containers/BaoCao/BaoCaoChung')),
  },
  {
    path: 'KQGQ01',
    component: asyncComponent(() => import('./containers/BaoCao/BaoCaoChung')),
  },
  {
    path: 'KQGQ02',
    component: asyncComponent(() => import('./containers/BaoCao/BaoCaoChung')),
  },
  {
    path: 'KQGQ03',
    component: asyncComponent(() => import('./containers/BaoCao/BaoCaoChung')),
  },
  {
    path: 'KQGQ04',
    component: asyncComponent(() => import('./containers/BaoCao/BaoCaoChung')),
  },
  {
    path: 'bc-kien-nghi-phan-anh',
    component: asyncComponent(() => import('./containers/BaoCao/BaoCaoChung')),
  },
  {
    path: 'bc-loai-khieu-to',
    component: asyncComponent(() => import('./containers/BaoCao/BaoCaoChung')),
  },
  {
    path: 'bc-cq-chuyen-don',
    component: asyncComponent(() => import('./containers/BaoCao/BaoCaoChung')),
  },
  {
    path: 'bc-dia-chi-chu-don',
    component: asyncComponent(() => import('./containers/BaoCao/BaoCaoChung')),
  },
  {
    path: 'bc-noi-phat-sinh',
    component: asyncComponent(() => import('./containers/BaoCao/BaoCaoChung')),
  },
  {
    path: 'bc-vu-viec-dong-nguoi',
    component: asyncComponent(() => import('./containers/BaoCao/BaoCaoChung')),
  },
  {
    path: 'bc-rut-don',
    component: asyncComponent(() => import('./containers/BaoCao/BaoCaoChung')),
  },
  {
    path: 'bc-td-xld-gqd',
    component: asyncComponent(() => import('./containers/BaoCao/BaoCaoChung')),
  },
  {
    path: 'bc-xu-ly-cong-viec',
    component: asyncComponent(() => import('./containers/BaoCao/BaoCaoChung')),
  },
  {
    path: 'bc-don-chuyen-giai-quyet',
    component: asyncComponent(() => import('./containers/BaoCao/BaoCaoChung')),
  },

  // {
  //   path: "bao-cao-tong-hop-ket-qua-thanh-tra-hanh-chinh",
  //   component: asyncComponent(() =>
  //     import("./containers/BaoCao/BCThnhTraHanhChinh")
  //   ),
  // },
  {
    path: 'bao-cao-tinh-hinh-TD_XL_GQ',
    component: asyncComponent(() =>
      import('./containers/BaoCao/TinhHinhTD_XL_GQ'),
    ),
  },
  // Nghiệp vụ
  // {
  //   path: 'tiep-dan-truc-tiep',
  //   component: asyncComponent(() =>
  //     import('./containers/NghiepVu/TiepDanTrucTiep'),
  //   ),
  // },
  {
    path: 'xu-ly-don-thu',
    component: asyncComponent(() => import('./containers/NghiepVu/XuLyDon')),
  },
  {
    path: 'don-doc',
    component: asyncComponent(() =>
      import('./containers/NghiepVu/QuanLyDonThuCanDonDoc'),
    ),
  },
  {
    path: 'phe-duyet-ket-qua-xu-ly',
    component: asyncComponent(() =>
      import('./containers/NghiepVu/PheDuyetKetQuaXuLy'),
    ),
  },
  {
    path: 'giao-xac-minh',
    component: asyncComponent(() =>
      import('./containers/NghiepVu/CapNhatQDGiaoXacMinh'),
    ),
  },
  {
    path: 'phan-xu-ly-don',
    component: asyncComponent(() =>
      import('./containers/NghiepVu/PhanXuLyDon'),
    ),
  },
  {
    path: 'phan-xu-ly-don-chu-tich',
    component: asyncComponent(() =>
      import('./containers/NghiepVu/PhanXuLyDonCT'),
    ),
  },
  {
    path: 'tiep-nhan-don',
    component: asyncComponent(() =>
      import('./containers/NghiepVu/TiepNhanDon'),
    ),
  },
  {
    path: 'thi-hanh',
    component: asyncComponent(() =>
      import('./containers/NghiepVu/TheoDoiThiHanhQDGiaiQuyet'),
    ),
  },
  {
    path: 'ban-hanh-qd',
    component: asyncComponent(() =>
      import('./containers/NghiepVu/CapNhatQDGiaiQuyet'),
    ),
  },
  {
    path: 'giai-quyet-don-thu',
    component: asyncComponent(() =>
      import('./containers/NghiepVu/GiaiQuyetDonGroup'),
    ),
  },
  {
    path: 'ql-lich-tiep-dan',
    component: asyncComponent(() =>
      import('./containers/CongThongTin/QuanLyLichTiepDan'),
    ),
  },
  {
    path: 'ql-trinh-tu-thu-tuc',
    component: asyncComponent(() =>
      import('./containers/CongThongTin/QuanLyTrinhTuThuTuc'),
    ),
  },
  {
    path: 'vu-viec-phuc-tap',
    component: asyncComponent(() =>
      import('./containers/NghiepVu/QuanLyVuViecPhucTap'),
    ),
  },
  {
    path: 'cap-nhat-qdtl-to-xac-minh',
    component: asyncComponent(() =>
      import('./containers/NghiepVu/CapNhatQDTLToXacMinh'),
    ),
  },
  {
    path: 'ket-qua-tranh-chap',
    component: asyncComponent(() =>
      import('./containers/NghiepVu/KetQuaTranhChap'),
    ),
  },
  {
    path: 'thong-ke-nhap-lieu',
    component: asyncComponent(() =>
      import('./containers/BaoCao/ThongKeNhapLieu'),
    ),
  },

  // {
  //   path: 'tra-cuu-don-thu',
  //   component: asyncComponent(() =>
  //     import('./containers/NghiepVu/TraCuuDonThuTest'),
  //   ),
  // },
];
export default routes;
