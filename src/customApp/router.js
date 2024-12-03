import asyncComponent from "../helpers/AsyncFunc";

const routes = [
  {
    path: "dashboard",
    component: asyncComponent(() => import("./containers/DashBoash")),
  },
  // Danh Mục
  {
    path: "danh-muc-doanh-nghiep",
    component: asyncComponent(() =>
      import("./containers/DanhMuc/DMDoanhNghiep")
    ),
  },
  {
    path: "danh-muc-co-quan-don-vi",
    component: asyncComponent(() => import("./containers/DanhMuc/DMCoQuan")),
  },
  {
    path: "danh-muc-phan-loai-thanh-tra",
    component: asyncComponent(() =>
      import("./containers/DanhMuc/DMPhanLoaiThanhTraKiemTra")
    ),
  },
  {
    path: "danh-muc-linh-vuc",
    component: asyncComponent(() => import("./containers/DanhMuc/DMLinhVuc")),
  },

  {
    path: "quan-ly-thu-tuc",
    component: asyncComponent(() =>
      import("./containers/NghiepVu/QLThuTucTienHanhCuocTTKT")
    ),
  },
  {
    path: "danh-muc-ky-nghi-le",
    component: asyncComponent(() => import("./containers/DanhMuc/DMKyNghiLe")),
  },
  {
    path: "quan-ly-ke-hoach-du-kien",
    component: asyncComponent(() =>
      import("./containers/NghiepVu/QLKeHoachDuKienTTKT")
    ),
  },
  {
    path: "tao-cuoc-thanh-tra-kiem-tra",
    component: asyncComponent(() =>
      import("./containers/NghiepVu/TaoCuocTTKT")
    ),
  },
  {
    path: "phan-cong-thuc-hien-kl",
    component: asyncComponent(() =>
      import("./containers/NghiepVu/PhanCongCNSL")
    ),
  },
  {
    path: "don-doc-thuc-hien-kl",
    component: asyncComponent(() => import("./containers/NghiepVu/QLDonDoc")),
  },
  {
    path: "phan-cong-so-theo-doi",
    component: asyncComponent(() =>
      import("./containers/NghiepVu/PhanCongSoTheoDoi")
    ),
  },
  {
    path: "ban-hanh-kh-tt",
    component: asyncComponent(() =>
      import("./containers/NghiepVu/BanHanhKeHoachTTKT")
    ),
  },
  {
    path: "noi-dung-thanh-tra-kiem-tra",
    component: asyncComponent(() =>
      import("./containers/DanhMuc/DMNoiDungThanhTraKiemTra")
    ),
  },
  {
    path: "danh-muc-tinh-huyen-xa",
    component: asyncComponent(() => import("./containers/DanhMuc/DMDiaGioi")),
  },

  //

  // Hệ Thống
  {
    path: "phan-quyen",
    component: asyncComponent(() => import("./containers/HeThong/QLPhanQuyen")),
  },
  {
    path: "nhat-ky-he-thong",
    component: asyncComponent(() =>
      import("./containers/HeThong/NhatKyHeThong")
    ),
  },
  {
    path: "quan-ly-loi-ky-thuat",
    component: asyncComponent(() => import("./containers/HeThong/LoiKyThuat")),
  },
  {
    path: "huong-dan-su-dung",
    component: asyncComponent(() =>
      import("./containers/HeThong/QLHuongDanSuDung")
    ),
  },
  // {
  //   path: "sao-luu-hoi-phuc-du-lieu",
  //   component: asyncComponent(() =>
  //     import("./containers/HeThong/QuanTriDuLieu")
  //   ),
  // },
  {
    path: "quan-ly-nguoi-dung",
    component: asyncComponent(() =>
      import("./containers/HeThong/UserManagement")
    ),
  },

  {
    path: "quan-ly-chuc-nang",
    component: asyncComponent(() => import("./containers/HeThong/QLChucNang")),
  },
  // {
  //   path: "dong-bo-du-lieu",
  //   component: asyncComponent(() =>
  //     import("./containers/HeThong/DongBoDuLieu")
  //   ),
  // },

  {
    path: "tham-so-he-thong",
    component: asyncComponent(() =>
      import("./containers/HeThong/QuanLyThamSoHeThong")
    ),
  },
  {
    path: "bc-kq-thkl-tt-hc",
    component: asyncComponent(() => import("./containers/BaoCao/BaoCaoChung")),
  },
  {
    path: "bc-kq-tt-hc-xd",
    component: asyncComponent(() => import("./containers/BaoCao/BaoCaoChung")),
  },
  {
    path: "bc-kq-tt-hc-tcns",
    component: asyncComponent(() => import("./containers/BaoCao/BaoCaoChung")),
  },
  {
    path: "bc-kq-tt-hc-dd",
    component: asyncComponent(() => import("./containers/BaoCao/BaoCaoChung")),
  },
  {
    path: "bc-kq-tt-kt-cn",
    component: asyncComponent(() => import("./containers/BaoCao/BaoCaoChung")),
  },
  {
    path: "bc-kq-thkl-dq-xp",
    component: asyncComponent(() => import("./containers/BaoCao/BaoCaoChung")),
  },
  {
    path: "bc-kq-tt-hc",
    component: asyncComponent(() => import("./containers/BaoCao/BaoCaoChung")),
  },
  {
    path: "tk-th-tt-kt",
    component: asyncComponent(() => import("./containers/BaoCao/BaoCaoChung")),
  },

  {
    path: "lap-ke-hoach-thanh-tra",
    component: asyncComponent(() =>
      import("./containers/NghiepVu/LapKeHoachDuKienThanhTra")
    ),
  },
  {
    path: "lap-ke-hoach-thanh-tra-kiem-tra-trung-uong",
    component: asyncComponent(() =>
      import("./containers/NghiepVu/LapKeHoachDuKienThanhTra")
    ),
  },
  {
    path: "tong-hop-ra-soat-chong-cheo",
    component: asyncComponent(() =>
      import("./containers/NghiepVu/TongHopRaSoatChongCheo")
    ),
  },
  {
    path: "tra-cuu",
    component: asyncComponent(() => import("./containers/NghiepVu/TraCuu")),
  },
  {
    path: "cap-nhat-ho-so-tai-lieu",
    component: asyncComponent(() =>
      import("./containers/NghiepVu/CapNhatHoSoTaiLieu")
    ),
  },

  // {
  //   path: "cap-nhat-ho-so-tai-lieu",
  //   component: asyncComponent(() =>
  //     import("./containers/NghiepVu/Shared/Component/Table")
  //   ),
  // },

  {
    path: "cap-nhap-so-lieu",
    component: asyncComponent(() =>
      import("./containers/NghiepVu/CapNhatSoLieu")
    ),
  },
  {
    path: "cap-nhap-so-theo-doi",
    component: asyncComponent(() =>
      import("./containers/NghiepVu/CapNhatSoTheoDoi")
    ),
  },
];
export default routes;
