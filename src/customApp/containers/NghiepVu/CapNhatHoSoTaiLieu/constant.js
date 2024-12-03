const KEY_MENU = {
  THONG_TIN_CHUNG_CUOC_THANH_TRA_KIEM_TRA: "1",
  QUYET_DINH_THANH_TRA_KIEM_TRA: "2",
  THANH_VIEN_DOAN_THANH_TRA: "3",
  TAILIEU_NOIDUNG_DA_THU_THAP: "4",
  BIEN_BAN_CONG_BO_QUYET_DINH_THANH_TRA_KIEM_TRA: "5",
  THANH_VIEN_DOAN_GIAM_SAT: "6",
  NHAT_KY_DOAN_THANH_TRA_KIEM_TRA: "7",
  BAO_CAO_GIAI_TRI_DOAN_THANH_TRA_KIEM_TRA: "8",
  BAO_CAO_KET_QUA_THUC_HIEN_NHIEM_VU: "9",
  GIA_HAN_THOI_GIAN_THANH_TRA_KIEM_TRA: "10",
  TAM_NGUNG_CUOC_THANH_TRA_KIEM_TRA: "11",
  THONG_BAO_KET_THUC_THANH_TRA_KIEM_TRA: "12",
  KET_LUAN_THANH_TRA_KIEM_TRA: "13",
  CONG_BO_KET_LUAN_THANH_TRA_KIEM_TRA: "14",
  BAN_GIAO_SO_LIEU_XU_LY_SAU_THANH_TRA: "17",
  BAN_GIAO_SO_LIEU_XU_LY_SAU_THANH_TRA2: "18",
};

const menuItems = [
  {
    key: KEY_MENU.THONG_TIN_CHUNG_CUOC_THANH_TRA_KIEM_TRA,
    label: "Thông tin chung cuộc thanh tra, kiểm tra",
  },
  {
    key: KEY_MENU.QUYET_DINH_THANH_TRA_KIEM_TRA,
    label: "Quyết định thanh tra, kiểm tra",
  },
  {
    key: KEY_MENU.THANH_VIEN_DOAN_THANH_TRA,
    label: "Thành viên đoàn thanh tra",
  },
  {
    key: KEY_MENU.TAILIEU_NOIDUNG_DA_THU_THAP,
    label: "Tài liệu, nội dung đã thu thập",
  },
  {
    key: KEY_MENU.BIEN_BAN_CONG_BO_QUYET_DINH_THANH_TRA_KIEM_TRA,
    label: "Biên bản công bố quyết định thanh tra, kiểm tra",
  },
  {
    key: KEY_MENU.THANH_VIEN_DOAN_GIAM_SAT,
    label: "Người thực hiện giám sát",
  },
  {
    key: KEY_MENU.NHAT_KY_DOAN_THANH_TRA_KIEM_TRA,
    label: "Nhật ký đoàn thanh tra, kiểm tra",
  },
  {
    key: KEY_MENU.BAO_CAO_GIAI_TRI_DOAN_THANH_TRA_KIEM_TRA,
    label: "Báo cáo giải trình đoàn thanh tra, kiểm tra",
  },
  {
    key: KEY_MENU.BAO_CAO_KET_QUA_THUC_HIEN_NHIEM_VU,
    label: "Báo cáo kết quả thực hiện nhiệm vụ",
  },
  {
    key: KEY_MENU.GIA_HAN_THOI_GIAN_THANH_TRA_KIEM_TRA,
    label: "Gia hạn thời gian thanh tra, kiểm tra",
  },
  {
    key: KEY_MENU.TAM_NGUNG_CUOC_THANH_TRA_KIEM_TRA,
    label: "Tạm dừng cuộc thanh tra, kiểm tra",
  },
  {
    key: KEY_MENU.THONG_BAO_KET_THUC_THANH_TRA_KIEM_TRA,
    label: "Thông báo kết thúc tiến hành thanh tra, kiểm tra trực tiếp",
  },
  {
    key: KEY_MENU.KET_LUAN_THANH_TRA_KIEM_TRA,
    label: "Kết luận thanh tra, kiểm tra",
  },
  {
    key: KEY_MENU.CONG_BO_KET_LUAN_THANH_TRA_KIEM_TRA,
    label: "Công bố kết luận thanh tra, kiểm tra",
  },
];

const ListCuocThanhtra = [
  KEY_MENU.THONG_TIN_CHUNG_CUOC_THANH_TRA_KIEM_TRA,
  KEY_MENU.QUYET_DINH_THANH_TRA_KIEM_TRA,
  KEY_MENU.THANH_VIEN_DOAN_GIAM_SAT,
];

const ListMenuForm = [
  KEY_MENU.QUYET_DINH_THANH_TRA_KIEM_TRA,
  KEY_MENU.TAILIEU_NOIDUNG_DA_THU_THAP,
  KEY_MENU.NHAT_KY_DOAN_THANH_TRA_KIEM_TRA,
  KEY_MENU.BAO_CAO_GIAI_TRI_DOAN_THANH_TRA_KIEM_TRA,
  KEY_MENU.BAO_CAO_KET_QUA_THUC_HIEN_NHIEM_VU,
  KEY_MENU.GIA_HAN_THOI_GIAN_THANH_TRA_KIEM_TRA,
  KEY_MENU.TAM_NGUNG_CUOC_THANH_TRA_KIEM_TRA,
];

export { menuItems, ListMenuForm, ListCuocThanhtra };
export default KEY_MENU;
