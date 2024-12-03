module.exports = Object.freeze({
  TINH: "1",
  HUYEN: "2",
  XA: "3",
  MODAL_LARGE: 900,
  MODAL_NORMAL: 600,
  MODAL_SMALL: 416,
  DONVIHANHCHINH: 1,
  TYPEKEHOACH:0,
  DOANHNGHIEP: 2,
  ITEM_LAYOUT: {
    labelAlign: "left",
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  },
  CapNhatHoSoTaiLieu: {
    ThongTinCuocThanhTra: 1,
    QuyetDinhThanhTra: 2,
    ThanhVienDoanThanhTra: 3,
    TaiLieuNoiDungDaThuThap: 4,
    BienBanCongBoQuyetDinh: 5,
    ThanhVienDoanGiamSat: 6,
    NhatKyDoanThanhTra: 7,
    BaoCaoGiaiTrinhDoanThanhTra: 8,
    BaoCaoKetQuaThucHien: 9,
    GiaHanThoiGianThanhTra: 10,
    TamNgungCuocThanhTra: 11,
    ThongBaoKetThucThanhTra: 12,
    KetLuanThanhTra: 13,
    CongBoKetLuanThanhTra: 14,
    DTTT: 15, // Đối tượng thanh tra
    DTSP: 16, // Đối tượng sai phạm
    BanGiaoSoLieuSauThanhTra: 17,
  },

  EnumLoaiSoLieu: {
    QuanLyKienNghiXuLyThuHoiTienDat: 1, // Quản lý kiến nghị xử lý thu hồi tiền & đất - Thu hồi về NSNN
    QuanLyXuLyKhacVeTienDat: 2, // Quản lý xử lý khác về tiền & đất - khác về kinh tế
    QuanLyKienNghiXuLyHanhChinhKyLuat: 3, // Quản lý kiến nghị xử lý hành chính – xử lý kỷ luật
    QuanLyKienNghiXuLyHanhChinhKiemDiem: 4, // Quản lý kiến nghị xử lý hành chính – xử lý kiểm điểm rút kinh nghiệm - không đưa vào báo cáo
    QuanLyKienNghiXuLyChuyenCoQuanDieuTra: 5, // Quản lý kiến nghị xử lý chuyển cơ quan điều tra
    QuanLyKienNghiXuLyHoanThienCoCheChinh: 6, // Quản lý kiến nghị xử lý hoàn thiện cơ chế chính sách
    QuanLyKienNghiXuLyHoanThienNgoaiCoChe: 7, // Quản lý kiến nghị xử lý hoàn thiện ngoài cơ chế chính sách - không đưa vào báo cáo
    QuanLyKienNghiXuLyViPhamKinhTe: 8, // Quản lý kiến nghị xử lý vi phạm về kinh tế (thanh tra, kiểm tra chuyên ngành). Số tiền kiến nghị thu hồi (tiền và tài sản quy thành tiền)
    QuanLyKienNghiXuLyViPhamHanhChinh: 9, // Quản lý kiến nghị xử lý vi phạm về hành chính (thanh tra, kiểm tra chuyên ngành) - Xử phạt vi phạm hành chính
  },

  SoLieuDoiTuongTT: {
    ToChuc: 1, // Tổ chức
    CaNhan: 2, // Cá nhân
  },
  ITEM_LAYOUT2: {
    labelAlign: "left",
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  },

  ITEM_LAYOUT_NEW: {
    labelAlign: "left",
    labelCol: { span: 6 },
    wrapperCol: { span: 18 },
  },

  ITEM_LAYOUT_HALF: {
    labelAlign: "left",
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
  },

  ITEM_LAYOUT_HALF2: {
    labelAlign: "left",
    labelCol: { lg: 10, xs: 5 },
    wrapperCol: { lg: 14, xs: 19 },
  },

  ITEM_LAYOUT_SMALL: {
    labelAlign: "left",
    labelCol: { span: 5 },
    wrapperCol: { span: 19 },
  },

  ITEM_LAYOUT_SMALL_2: {
    labelAlign: "left",
    labelCol: { span: 7 },
    wrapperCol: { span: 17 },
  },

  ITEM_LAYOUT_HALF_SMALL: {
    labelAlign: "left",
    labelCol: { span: 10 },
    wrapperCol: { span: 12 },
  },

  ITEM_LAYOUT_HALF_SMALL_2: {
    labelAlign: "left",
    labelCol: { span: 12 },
    wrapperCol: { span: 10 },
  },

  ITEM_LAYOUT_HALF_SMALL_RIGHT_2: {
    labelAlign: "left",
    labelCol: { span: 10 },
    wrapperCol: { span: 14 },
  },

  ITEM_LAYOUT_ROW: {
    labelAlign: "left",
    labelCol: { span: 24 },
    wrapperCol: { span: 24 },
  },

  COL_ITEM_LAYOUT_HALF: {
    xs: { span: 24 },
    lg: { span: 12 },
  },

  COL_COL_ITEM_LAYOUT_RIGHT: {
    xs: { span: 24 },
    lg: { span: 24 },
  },

  COL_ITEM_LAYOUT: {
    xs: { span: 24 },
    lg: { span: 24 },
  },

  REQUIRED: {
    required: true,
    message: "Thông tin bắt buộc",
  },

  API_ERROR: {
    title: "Không thể cập nhật",
    content: "Đã có lỗi xảy ra ...",
  },

  fileUploadLimit: 10, //MB

  NhomTaiSan: {
    NhaO: 1,
    CongTrinhXayDung: 11,
    NhaOCongTrinhXayDung: 4,
    DatO: 12,
    DatKhac: 13,
    Tien: 6,
    PhuongTien: 3,
    KimLoai: 2,
    NuocNgoai: 10,
    TaiSanKhac: 8,
    KhoanNo: 7,
    TongThuNhap: 9,
    GanLienVoiDat: 14,
    CoPhieu: 15,
    TaiKhoanNuocNgoai: 16,
  },

  LoaiTaiSan: {
    NhaO: {
      CanHo: 18,
      NhaORiengLe: 19,
      BietThu: 20,
    },
    CongTrinhXayDung: {
      CongTrinhDanDung: 21,
      CongTrinhCongNghiep: 22,
    },
    Tien: {
      TienMat: 8,
      TienChoVay: 9,
      TienTraTruoc: 10,
      TienGuiCaNhan: 11,
    },
    KimLoai: {
      Vang: 4,
      KimCuong: 5,
      BachKim: 6,
      KimLoaiKhac: 7,
    },
    TaiSanKhac: {
      TaiSanDangKy: 16,
      TaiSanKhac: 17,
    },
    GanLienVoiDat: {
      CayLauNam: 1,
      RungSanXuat: 2,
      VatKienTruc: 3,
    },
    CoPhieu: {
      CoPhieu: 12,
      TraiPhieu: 13,
      VonGop: 14,
      GiayToKhac: 15,
    },
  },

  CanBoNghiHuu: 2,

  STYLE: {
    tableToXls: {
      border: "none",
      fontSize: "14pt",
      fontFamily: "Times New Roman",
    },
    tableToXls_td: { border: "none" },
    tableToXls_tableTd: { border: "1px solid #333" },
    tableToXls_provincial: {
      verticalAlign: "top",
      display: "inline-block",
      float: "left",
      textAlign: "center",
    },
    tableToXls_country: {
      display: "inline-block",
      float: "right",
      textAlign: "center",
    },
    tableToXls_title: { textAlign: "center" },
    tableToXls_sign: {
      display: "inline-block",
      float: "right",
      textAlign: "center",
      width: 300,
      paddingBottom: 40,
    },

    tableData: {
      border: "1px solid #333",
      fontSize: "13pt",
      fontFamily: "Times New Roman",
    },
    tableData_td: { border: "1px solid #333" },
    tableData_th: { border: "1px solid #333" },
  },
  STYLE2: {
    tableToXls: { border: "none" },
    tableToXls_td: { border: "none" },
    tableToXls_tableTd: { border: "none" },
    tableToXls_provincial: {
      verticalAlign: "top",
      display: "inline-block",
      float: "left",
      textAlign: "center",
    },
    tableToXls_country: {
      display: "inline-block",
      float: "right",
      textAlign: "center",
    },
    tableToXls_title: { textAlign: "center" },
    tableToXls_sign: {
      display: "inline-block",
      float: "right",
      textAlign: "center",
      width: 300,
      paddingBottom: 40,
    },

    tableData: {},
    tableData_td: {},
    tableData_th: { textAlign: "center" },
  },
  DangLamViec: 1,

  FORMLAYOUTV4: {
    labelCol: { span: 6 },
    wrapperCol: { span: 16 },
    labelAlign: "left",
  },
  ITEMLAYOUT4: {
    labelCol: { lg: 3, xs: 6 },
    wrapperCol: { lg: 20, xs: 16 },
    labelAlign: "left",
  },
  LoaiKhieuTo: {
    TranhChap: 71,
    KienNghiPhanAnh: 9,
    ToCao: 8,
    KhieuNai: 1,
  },
  LoaiTiepDan: {
    ThuongXuyen: 1,
    DinhKy: 2,
    DotXuat: 3,
  },
  LoaiMaIn: {
    BienBanTiepCongDan: "TCD_20",
  },
  HuongGiaiQuyet: {
    DeXuatThuLy: 31,
    ChuyenDon: 32,
    TraDon: 33,
    HuongDan: 30,
  },
  DATACONFIG: {
    QuocTichID: 1,
  },
  CapID: {
    CapSoNganh: 1,
    CapUBNDHuyen: 2,
    CapUBNDXa: 3,
    CapUBNDTinh: 4,
    CapTrungUong: 5,
    ToanHuyen: 6,
    CapPhong: 11,
    CapToanTinh: 12,
    ToanHuyenChiTiet: 13,
    CapUBNDXaChiTiet: 14,
    CapUBNDHuyenChiTiet: 15,
    CapUBNDTinhChiTiet: 16,
    CapSoNganhChiTiet: 17,
    CapPhongThuocTinh: 21,
    CapPhongThuocSo: 31,
    CapPhongThuocHuyen: 41,
    CapPhongThuocXa: 51,
  },
  CapHanhChinh: {
    CapTrungUong: 10,
    CapUBNDTinh: 20,
    CapPhongThuocTinh: 21,
    CapSoNganh: 30,
    CapPhongThuocSo: 31,
    CapUBNDHuyen: 40,
    CapPhongThuocHuyen: 41,
    CapUBNDXa: 50,
    CapPhongThuocXa: 51,
  },
  ThongTinChung: {
    ThongTinHoTro: "0962 155 297;0211.3846.488;thanhtra@vinhphuc.gov.vn",
    TenDonVi: "UBND Tỉnh",
    SSO_LOGIN_URL: "https://lgsp-sso.vinhphuc.gov.vn/oauth2/authorize",
    SSO_LOGIN:
      "seyHFfrAhiTtij238DRM7cxgPLka;3u5M38yHVPrZiIqigUfx30rLtaka;https://kntcv2dev.gosol.com.vn",
  },
  MAXLENGTH: 255,
  MAXLENGTHNOIDUNG: 2048,
  LoaiFileDinhKem: {
    FileHoSo: 1,
    FileKQXL: 2,
    FileCapNhatGiaoXacMinh: 3,
    FileBanHanhQD: 4,
    FileTheoDoi: 5,
    FileYKienXuLy: 6,
    //FileHSDS : 7,
    FileBuocXacMinh: 8,
    FileGiaiQuyet: 8,
    FileKetQuaTranhChap: 9,
    FileRutDon: 10,
    FileThiHanh: 11,
    FilePhanXuLy: 12,
    FileVBDonDoc: 13,
    FileDTCDGQ: 14,
    FileBCXM: 15, //File báo cáo xác minh
    FileDMBXM: 16,
    FileGiaHanGiaiQuyet: 17,
    XuLyDon: 6,
    PheDuyetKetQuaXuLy: 2,
    FileTrinhDuThao: 20,
    BanHanhQDGiaoXacMinh: 21,
    BanHanhQDGiaoGiaiQuyet: 22,
    FileThumbnail: 23,
    FileTrinhTuThuTuc: 24,
    FileCQGiaiQuyet: 26,
    FileKQTiep: 27,
    FileKQGiaiQuyet: 28,
    FileDBCXM: 29,
  },
  NGUONDONDEN: {
    TrucTiep: 21,
    BuuChinh: 26,
    CoQuanKhac: 22,
    TraoTay: 28,
  },
  ITEMLAYOUTHALF4: {
    labelCol: { lg: 3, xs: 6 },
    wrapperCol: { lg: 8, xs: 16 },
    labelAlign: "left",
  },
  IMAGECROP: {
    grid: true,
    rotate: true,
    modalOk: "Cắt ảnh",
    modalCancel: "Hủy",
    modalTitle: "Chỉnh sửa hình ảnh",
    shape: "round",
    maxZoom: 5,
    minZoom: 1,
  },
  MODALCONFIRM: {
    title: "Thông báo",
    okText: "Có",
    cancelText: "Không",
  },
  RoleID: {
    LanhDao: 1,
    LanhDaoPhong: 2,
    ChuyenVien: 3,
  },
  TYPEEDIT: {
    String: 1,
    Number: 2,
  },
  Private: {
    Token:
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJSZWFkIjoiLDksIiwiQ3JlYXRlIjoiLCwiLCJFZGl0IjoiLCwiLCJEZWxldGUiOiIsLCIsIkZ1bGxBY2Nlc3MiOiIsLCIsIkNhbkJvSUQiOiI4ODg2IiwiTmd1b2lEdW5nSUQiOiI5NzMwIiwiQ29RdWFuSUQiOiIxIiwiUGhvbmdCYW5JRCI6IjAiLCJDYXBJRCI6IjQiLCJSb2xlSUQiOiIzIiwiVGluaElEIjoiNzUiLCJIdXllbklEIjoiMzEyIiwiWGFJRCI6IjAiLCJUZW5IdXllbiI6IlbEqW5oIFnDqm4iLCJUZW5YYSI6IiIsIkNhcENvUXVhbiI6IjAiLCJWYWlUcm8iOiIwIiwiZXhwaXJlc19hdCI6IjEyLzMvMjAyNiA2OjE2OjMyIEFNIiwiVGVuQ2FuQm8iOiJLaMOhY2ggbeG7nWkiLCJRdWFuTHlUaGFuTmhhbiI6IjAiLCJNYUNvUXVhbiI6IlVCTkRETiIsIlN1RHVuZ1F1eVRyaW5oUGh1Y1RhcCI6IlRydWUiLCJTdUR1bmdRdXlUcmluaEdRUGh1Y1RhcCI6IlRydWUiLCJTdUR1bmdRVFZhblRodVRpZXBEYW4iOiJGYWxzZSIsIlN1RHVuZ1FUVmFuVGh1VGllcE5oYW5Eb24iOiJGYWxzZSIsIkNhcFVCTkQiOiIwIiwiUXV5VHJpbmhHaWFuVGllcCI6IjAiLCJCYW5UaWVwRGFuIjoiRmFsc2UiLCJDYXBUaGFuaFRyYSI6IlRydWUiLCJDaHVUaWNoVUJORCI6IjAiLCJDaGFuaFRoYW5oVHJhIjoiMCIsImlzQWRtaW4iOiJGYWxzZSIsIlRyYW5nVGhhaUdpYW9YYWNNaW5oIjoiMCIsIm5iZiI6MTcwOTg3ODU5MiwiZXhwIjoxNzk2Mjc4NTkyLCJpYXQiOjE3MDk4Nzg1OTJ9.w-wBI85ahau9tdPOlGOfl8ImBDRcZNSGwWF_mTeozmU",
  },
  LoaiQuyTrinh: {
    SoBanNganh: 1,
    Huyen: 2,
    Xa: 3,
    Tinh: 4,
    PhongThuocHuyenThuocSo: 11,
  },
  TrangThaiMoi: {
    ChuaTrinh: 100,
    DaXuLy: 101,
    XuLyLai: 102,
    ChuaDuyetLan1: 103,
    DaDuyetLan1: 104,
    DaTrinhLan1: 105,
    ChuaDuyetLan2: 105,
    DaTrinhDuyetLan2: 106,
    DaBanHanhQuyetDinhGiaoXacMinh: 200,
    ChuaCapNhapVBGXM: 200,
    DaCapNhapVBGXM: 201,
    GiaoXacMinhLan1: 202,
    GiaoXacMinhLan2: 203,
    ChuaXacMinhLan1: 204,
    DaXacMinhLan1: 205,
    TrinhXacMinhLan1: 206,
    DuyetVaTrinhXacMinhLan2: 207,
    DuyetLan2VaTrinhXacMinhLan3: 208,
    DuyetLan3: 209,
    BanHanhQuyetDinh: 300,
    CapNhapBCQDKL: 301,
    RutDon: 406,
  },
  FORM: {
    Input: 1,
    InputTextArea: 2,
    Select: 3,
    DatePicker: 4,
    Upload: 5,
    FromTimeToTime: 6,
    Checkbox: 7,
    Radio: 8,
    InputNumber: 9,
  },
  FORMCOL: {
    Col1P2: { span: 24, md: 12 },
  },
  LoaiQuyTrinhDonThu: {
    SBN: 1, // : SBN, phòng thuộc huyện
    BTDHuyen: 2, // : BTD Huyện
    Xa: 3, // : Xã
    BTDTinh: 4, // : BTD Tỉnh
    PhongThuocSo: 5, // : phòng thuộc sở
    QuyTrinhNoiBoPhongThuocHuyen: 6, // Quy trình nội bộ phòng thuộc huyện
  },

  STATENGHIEPVU: {
    LapKeHoach: 100,
    Bosung: 101,
    DaLapKeHoach: 200,
    DaChuyenTongHop: 300,
    DaRaSoat: 400,
    BanHanhKeHoachThanhTra: 500,
  },
});
