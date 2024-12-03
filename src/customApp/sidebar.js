const options = [

  {
    key: 'HeThong',
    label: 'Hệ thống',
    leftIcon: 'ion-network',
    children: [
      {
        key: 'khai-bao-can-bo',
        label: 'Khai báo cán bộ',
        showMenu: true,
        showAdmin: true
      },
      {
        key: 'xoa-don-thu-loi',
        label: 'Xóa đơn thư lỗi',
        showMenu: true,
        showAdmin: true
      },
      {
        key: 'quan-ly-nguoi-dung',
        label: 'Quản lý người dùng',
        showMenu: false,
        showAdmin: true
      },
      {
        key: 'quan-ly-nhom-nguoi-dung',
        label: 'Quản lý nhóm người dùng',
        showMenu: true,
        showAdmin: true
      },
      {
        key: 'phan-quyen',
        label: 'Quản lý chức năng, phân quyền',
        showMenu: true,
        showAdmin: true
      },
      {
        key: 'tham-so-he-thong',
        label: 'Khai báo tham số hệ thống',
        showMenu: true,
        showAdmin: true
      },
      {
        key: 'quan-ly-email',
        label: 'QL Email',
        showMenu: true,
        showAdmin: true
      },
      {
        key: 'quy-trinh-nghiep-vu',
        label: 'Quy trình nghiệp vụ',
        showMenu: true,
        showAdmin: true
      },
      {
        key: 'sao-luu-du-lieu',
        label: 'Sao lưu, đồng bộ dữ liệu',
        showMenu: true,
        showAdmin: true
      },
      {
        key: 'tai-lieu-huong-dan',
        label: 'Tài liệu hướng dẫn',
        showMenu: true,
        showAdmin: true
      },
      {
        key: 'dong-bo-du-lieu',
        label: 'Đồng bộ dữ liệu',
        showMenu: true,
        showAdmin: true
      },
    ]
  },
  {
    key: 'DanhMuc',
    label: 'Danh mục',
    leftIcon: 'ion-ios-paper',
    children: [
      {
        key: 'danh-muc-dan-toc',
        label: 'DM dân tộc',
        showMenu: true,
        showAdmin: true
      },
      {
        key: 'danh-muc-quoc-tich',
        label: 'DM quốc tịch',
        showMenu: true,
        showAdmin: true
      },
      {
        key: 'danh-muc-tinh-huyen-xa',
        label: 'DM tỉnh, huyện, xã',
        showMenu: true,
        showAdmin: true
      },
      {
        key: 'danh-muc-co-quan-don-vi',
        label: 'DM cơ quan, đơn vị',
        showMenu: true,
        showAdmin: true
      },
      {
        key: 'danh-muc-tham-quyen',
        label: 'DM thẩm quyền',
        showMenu: true,
        showAdmin: true
      },
      {
        key: 'danh-muc-phong-ban',
        label: 'DM phòng ban',
        showMenu: true,
        showAdmin: true
      },
      {
        key: 'danh-muc-chuc-vu',
        label: 'DM chức vụ',
        showMenu: true,
        showAdmin: true
      },
      {
        key: 'danh-muc-loai-khieu-to',
        label: 'DM loại khiếu tố',
        showMenu: true,
        showAdmin: true
      },
      {
        key: 'danh-muc-chia-tach-sat-nhap',
        label: 'DM chia tách, sát nhập cơ quan',
        showMenu: true,
        showAdmin: true
      },
      {
        key: 'danh-muc-buoc-xac-minh',
        label: 'DM bước xác minh',
        showMenu: true,
        showAdmin: true
      },
      {
        key: 'danh-muc-phan-tich-ket-qua',
        label: 'DM phân tích KQ',
        showMenu: true,
        showAdmin: true
      },
      {
        key: 'danh-muc-trang-thai-don',
        label: 'DM Trạng thái đơn',
        showMenu: true,
        showAdmin: true
      },
      {
        key: 'danh-muc-loai-ket-qua',
        label: 'DM Loại kết quả',
        showMenu: true,
        showAdmin: true
      },
      {
        key: 'danh-muc-loai-van-bang-kem-theo',
        label: 'DM Loại VB kèm theo',
        showMenu: true,
        showAdmin: true
      },
      {
        key: 'danh-muc-bieu-mau',
        label: 'DM biểu mẫu',
        showMenu: true,
        showAdmin: true
      },
      {
        key: 'danh-muc-huong-dan-giai-quyet',
        label: 'DM hướng dẫn giải quyết',
        showMenu: true,
        showAdmin: true
      },
      {
        key: 'danh-muc-nguon-don-den',
        label: 'DM nguồn đơn đến',
        showMenu: true,
        showAdmin: true
      },

      {
        key: 'danh-muc-tep-dinh-kem',
        label: 'DM file đính kèm',
        showMenu: true,
        showAdmin: true
      },

    ]
  },
  {
    key: 'BaoCao',
    label: 'Báo Cáo',
    leftIcon: 'ion-network',
    children: [
      {
        key: 'bao-cao-2d',
        label: 'Báo cáo 2d',
        showMenu: true,
        showAdmin: true
      },
      {
        key: 'bao-cao-tong-hop-ket-qua-thanh-tra-hanh-chinh',
        label: 'Báo cáo kết quả thanh tra hành chính',
        showMenu: true,
        showAdmin: true
      },
    ]
  },
  {
    key: 'TiepDan',
    label: 'Tiếp Dân',
    leftIcon: 'ion-network',
    children: [
      {
        key: 'tiep-dan-truc-tiep',
        label: 'Tiếp dân trực tiếp',
        showMenu: true,
        showAdmin: true
      },
    ]
  }
 
  
];

export const sidebarCanBo = [
  {
    key: 'thong-tin-can-bo',
    label: 'Thông tin cán bộ',
    leftIcon: 'ion-android-person',
    noRole: true
  },
  {
    key: 'ke-khai-tai-san/ke-khai',
    label: 'Kê khai tài sản',
    leftIcon: 'ion-ios-compose',
    showMenu: true
  },
  {
    key: 'ke-khai-tai-san',
    label: 'Danh sách bản kê khai',
    leftIcon: 'ion-ios-list',
    showMenu: true
  },
  {
    key: 'cong-khai-ban-ke-khai',
    label: 'Công khai bản kê khai',
    leftIcon: 'ion-ios-paper',
    showMenu: true
  },
];

export const listKeyOneOptions = [
  "quan-ly",
  "tong-hop",
  "thong-ke-ban-ke-khai",
  "bc-bien-dong-tai-san",
  "cong-khai-ban-ke-khai",
  "tong-hop-ban-ke-khai",
  "gui-ban-ke-khai",
  "tiep-nhan-ke-khai"
];

export const noRole = ['404'];
export default options;
