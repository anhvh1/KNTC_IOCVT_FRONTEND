import React, { Component, useEffect, useState } from "react";
import {
  MODAL_NORMAL,
  ITEM_LAYOUT,
  ITEM_LAYOUT2,
  REQUIRED,
} from "../../../../settings/constants";
import {
  Form as FormAnt,
  Input,
  message,
  Radio,
  Modal as ModalAnt,
  Switch,
  DatePicker,
  Row,
  Col,
} from "antd";
import Upload from "../../../../components/uielements/upload";
import { Button } from "../../../../components/uielements/exportComponent";
import {
  DONVIHANHCHINH,
  MAXLENGTHNOIDUNG,
} from "../../../../settings/constants";
import BoxTable from "../../../../components/utility/boxTable";
import Select, { Option } from "../../../../components/uielements/select";
import Modal from "../../../../components/uielements/modal";
import {
  MinusCircleOutlined,
  PlusOutlined,
  CloudUploadOutlined,
  CloseSquareFilled,
  SaveFilled,
} from "@ant-design/icons";
import DeleteIcon from "../../../../components/utility/DeleteIcon";

import { getValueConfigLocalByKey } from "../../../../helpers/utility";
import { useDispatch, useSelector } from "react-redux";
import { customizeItemValidator as Item } from "../../../../components/uielements/itemValidator";
import {
  customizeFormValidator as Form,
  useForm,
} from "../../../../components/uielements/formValidator";
import api from "./config";
import dayjs from "dayjs";
const { List } = FormAnt;
const { TextArea } = Input;
const ModalAddEdit = (props) => {
  const [loading, setLoading] = useState(false);
  const [
    ListFileDinhKemQuyetDinhThanhTra,
    setListFileDinhKemQuyetDinhThanhTra,
  ] = useState([]);
  const [ListFileDinhKemQuyetDinhGiamSat, setListFileDinhKemQuyetDinhGiamSat] =
    useState([]);
  const [CuocThanhTraID, setCuocThanhTraID] = useState("");
  const {
    visible,
    onCancel,
    action,
    selectedYear,
    DanhSachDoiTuongThanhTra,
    dataModalAddEdit,
    ListHinhThuc,
  } = props;
  const [form] = useForm();
  console.log("dataModalAddEdit", dataModalAddEdit);
  // const [PhanLoai, setPhanLoai] = useState([]);
  // const [phanLoai2, setPhanLoai2] = useState([]);
  const [fileID, setFileID] = useState([]);
  const [listLinhVuc, setListLinhVuc] = useState([]);
  // const chitietPhanLoai = async () => {
  //   const { PhanLoaiThanhTraID1, PhanLoaiThanhTraID2 } = props;

  //   try {
  //     const res1 = await api.chitietPhanLoai(PhanLoaiThanhTraID1);
  //     if (res1.data.Status > 0) {
  //       setPhanLoai(res1.data.Data);
  //     }
  //   } catch (error) {
  //     console.error("Error fetching PhanLoai1:", error);
  //   }

  //   try {
  //     const res2 = await api.chitietPhanLoai(PhanLoaiThanhTraID2);
  //     if (res2.data.Status > 0) {
  //       setPhanLoai2(res2.data.Data); // Assuming you have a separate state for the second data
  //     }
  //   } catch (error) {
  //     console.error("Error fetching PhanLoai2:", error);
  //   }
  // };
  const fetchData = async () => {
    try {
      const res = await api.danhSachListLinhVuc(/* Tham số */);
      if (res.data.Status > 0) {
        setListLinhVuc(res.data.Data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách cấp xếp hạng:", error);
    }
  };
  // const [DanhSachCanBoTruongDoan, setDanhSachCanBoTruongDoan] = useState([]);
  // const [DanhSachCanBoPhoDoan, setDanhSachCanBoPhoDoan] = useState([]);

  // const fetchDanhSachCanBo = async (type) => {
  //   try {
  //     const res = await api.danhsachCanBo(type);
  //     if (res.data.Status > 0) {
  //       if (type === 1) {
  //         setDanhSachCanBoTruongDoan(res.data.Data);
  //       } else if (type === 0) {
  //         setDanhSachCanBoPhoDoan(res.data.Data);
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Lỗi khi lấy danh sách cán bộ:", error);
  //   }
  // };
  useEffect(() => {
    if (dataModalAddEdit && dataModalAddEdit.CuocThanhTraID) {
      // const doanThanhTra = dataModalAddEdit.QuyetDinhThanhTra?.DoanThanhTra || [];

      // // Find specific roles based on VaiTroID
      // const truongDoanQuyetDinhThanhTra = doanThanhTra.find(member => member.VaiTroID === 1); // Trưởng đoàn
      // const phoDoanQuyetDinhThanhTra = doanThanhTra.find(member => member.VaiTroID === 2); // Phó đoàn
      // const thanhVienQuyetDinhThanhTra = doanThanhTra.filter(member => member.VaiTroID === 3).map(member => member.CanBoID); // Thành viên

      // const doanGiamSat = dataModalAddEdit.QuyetDinhGiamSat?.DoanThanhTra || [];

      // // Find specific roles based on VaiTroID
      // const truongDoanQuyetDinhGiamSat = doanGiamSat.find(member => member.VaiTroID === 1); // Trưởng đoàn
      // const phoDoanQuyetDinhGiamSat = doanGiamSat.find(member => member.VaiTroID === 2); // Phó đoàn
      // const thanhVienQuyetDinhGiamSat = doanGiamSat.filter(member => member.VaiTroID === 3).map(member => member.CanBoID); // Thành viên
      const NgayBanHanhQuyetDinhThanhTra = dataModalAddEdit.QuyetDinhThanhTra
        ?.NgayBanHanh
        ? dayjs(dataModalAddEdit.QuyetDinhThanhTra.NgayBanHanh).format(
            "DD/MM/YYYY"
          )
        : "";
      const NgayBanHanhQuyetDinhGiamSat = dataModalAddEdit.QuyetDinhGiamSat
        ?.NgayBanHanh
        ? dayjs(dataModalAddEdit.QuyetDinhGiamSat.NgayBanHanh).format(
            "DD/MM/YYYY"
          )
        : "";
      const ThoiGianTTStart = dataModalAddEdit.QuyetDinhThanhTra
        ?.ThoiGianTTStart
        ? dayjs(dataModalAddEdit.QuyetDinhThanhTra.ThoiGianTTStart).format(
            "DD/MM/YYYY"
          )
        : "";
      const ThoiGianTTEnd = dataModalAddEdit.QuyetDinhThanhTra?.ThoiGianTTEnd
        ? dayjs(dataModalAddEdit.QuyetDinhThanhTra.ThoiGianTTEnd).format(
            "DD/MM/YYYY"
          )
        : "";
      setCuocThanhTraID(dataModalAddEdit.CuocThanhTraID);
      form &&
        form.setFieldsValue({
          ...dataModalAddEdit.CuocThanhTraReponse,
          // ...dataModalAddEdit.QuyetDinhGiamSat,
          // ...dataModalAddEdit.QuyetDinhThanhTra,
          //Quyết định thanh tra
          CuocThanhTraID: dataModalAddEdit.CuocThanhTraID,
          SoVanBanQuyetDinhThanhTra:
            dataModalAddEdit.QuyetDinhThanhTra.SoVanBan,
          CoQuanBanHanhQuyetDinhThanhTra:
            dataModalAddEdit.QuyetDinhThanhTra.CoQuanBanHanh,
          NguoiKyQuyetDinhThanhTra: dataModalAddEdit.QuyetDinhThanhTra.NguoiKy,
          TrichYeuQuyetDinhThanhTra:
            dataModalAddEdit.QuyetDinhThanhTra.TrichYeu,
          ChucVuNguoiKyQuyetDinhThanhTra:
            dataModalAddEdit.QuyetDinhThanhTra.ChucVuNguoiKy,
          TruongDoanStrThanhTra:
            dataModalAddEdit.QuyetDinhThanhTra.TruongDoanStr,
          PhoDoanStrThanhTra: dataModalAddEdit.QuyetDinhThanhTra.PhoDoanStr,
          ThanhVienStrThanhTra: dataModalAddEdit.QuyetDinhThanhTra.ThanhVienStr,
          NguoiGiamSatStrThanhTra:
            dataModalAddEdit.QuyetDinhThanhTra.NguoiGiamSatStr,
          // TruongDoanNguoiKyQuyetDinhThanhTra: truongDoanQuyetDinhThanhTra?.CanBoID || null,
          // PhoDoanNguoiKyQuyetDinhThanhTra: phoDoanQuyetDinhThanhTra?.CanBoID || null,
          // ThanhVienNguoiKyQuyetDinhThanhTra: thanhVienQuyetDinhThanhTra || null,
          NgayBanHanhQuyetDinhThanhTra: NgayBanHanhQuyetDinhThanhTra
            ? dayjs(NgayBanHanhQuyetDinhThanhTra, "DD/MM/YYYY")
            : null,
          ThoiGianTTStart: ThoiGianTTStart
            ? dayjs(ThoiGianTTStart, "DD/MM/YYYY")
            : null,
          ThoiGianTTEnd: ThoiGianTTEnd
            ? dayjs(ThoiGianTTEnd, "DD/MM/YYYY")
            : null,
          //Quyết định giám sát
          SoVanBanQuyetDinhGiamSat: dataModalAddEdit.QuyetDinhGiamSat.SoVanBan,
          CoQuanBanHanhQuyetDinhGiamSat:
            dataModalAddEdit.QuyetDinhGiamSat.CoQuanBanHanh,
          NguoiKyQuyetDinhGiamSat: dataModalAddEdit.QuyetDinhGiamSat.NguoiKy,
          TrichYeuQuyetDinhGiamSat: dataModalAddEdit.QuyetDinhGiamSat.TrichYeu,
          ChucVuNguoiKyQuyetDinhGiamSat:
            dataModalAddEdit.QuyetDinhGiamSat.ChucVuNguoiKy,
          TruongDoanStrGiamSat: dataModalAddEdit.QuyetDinhGiamSat.TruongDoanStr,
          PhoDoanStrGiamSat: dataModalAddEdit.QuyetDinhGiamSat?.PhoDoanStr,
          ThanhVienStrGiamSat: dataModalAddEdit.QuyetDinhGiamSat?.ThanhVienStr,

          // TruongDoanNguoiKyQuyetDinhGiamSat: truongDoanQuyetDinhGiamSat?.CanBoID || null,
          // PhoDoanNguoiKyQuyetDinhGiamSat: phoDoanQuyetDinhGiamSat?.CanBoID || null,
          // ThanhVienNguoiKyQuyetDinhGiamSat: thanhVienQuyetDinhGiamSat || null,
          NgayBanHanhQuyetDinhGiamSat: NgayBanHanhQuyetDinhGiamSat
            ? dayjs(NgayBanHanhQuyetDinhGiamSat, "DD/MM/YYYY")
            : null,
        });
      if (
        dataModalAddEdit?.QuyetDinhThanhTra?.ListFile &&
        dataModalAddEdit.QuyetDinhThanhTra.ListFile.length > 0
      ) {
        const files = dataModalAddEdit.QuyetDinhThanhTra.ListFile.map(
          (file) => ({
            TenFile: file.TenFile,
            UrlFile: file.UrlFile,
            FileID: file.FileID,
          })
        );
        setListFileDinhKemQuyetDinhThanhTra(files);
      }
      if (
        dataModalAddEdit?.QuyetDinhGiamSat?.ListFile &&
        dataModalAddEdit.QuyetDinhGiamSat.ListFile.length > 0
      ) {
        const files = dataModalAddEdit.QuyetDinhGiamSat.ListFile.map(
          (file) => ({
            TenFile: file.TenFile,
            UrlFile: file.UrlFile,
            FileID: file.FileID,
          })
        );
        setListFileDinhKemQuyetDinhGiamSat(files);
      }
    }

    // fetchDanhSachCanBo(0);
    // fetchDanhSachCanBo(1);
    fetchData();
  }, []);
  const onOk = (e) => {
    e.preventDefault();

    form.validateFields().then((values) => {
      const newValue = {
        // ...values,
        // // NamBanHanh: selectedYear,
        // // NgayBanHanh: values.NgayBanHanh ? values.NgayBanHanh.format('YYYY-MM-DD') : null,
        // // BanHanhKHID: action === 'add' ? 0 : values.BanHanhKHID,
        CuocThanhTraID: CuocThanhTraID,
        LisXoaFileIds: action === "edit" ? fileID : [],
        QuyetDinhThanhTra: {
          SoVanBan: values.SoVanBanQuyetDinhThanhTra || "",
          CoQuanBanHanh: values.CoQuanBanHanhQuyetDinhThanhTra || "",
          NguoiKy: values.NguoiKyQuyetDinhThanhTra || "",
          NgayBanHanh: values.NgayBanHanhQuyetDinhThanhTra
            ? values.NgayBanHanhQuyetDinhThanhTra.format("YYYY-MM-DD")
            : null,
          ThoiGianTTStart: values.ThoiGianTTStart
            ? values.ThoiGianTTStart.format("YYYY-MM-DD")
            : null,
          ThoiGianTTEnd: values.ThoiGianTTEnd
            ? values.ThoiGianTTEnd.format("YYYY-MM-DD")
            : null,
          TrichYeu: values.TrichYeuQuyetDinhThanhTra || "",
          ChucVuNguoiKy: values.ChucVuNguoiKyQuyetDinhThanhTra || "",
          TruongDoanStr: values.TruongDoanStrThanhTra || "",
          PhoDoanStr: values.PhoDoanStrThanhTra || "",
          ThanhVienStr: values.ThanhVienStrThanhTra || "",
          NguoiGiamSatStr: values.NguoiGiamSatStrThanhTra || "",
          // DoanThanhTra: [
          //   {
          //     CanBoID: values.TruongDoanNguoiKyQuyetDinhThanhTra,
          //     VaiTroID: 1 // Assuming 1 is the ID for Trưởng đoàn
          //   },
          //   {
          //     CanBoID: values.PhoDoanNguoiKyQuyetDinhThanhTra,
          //     VaiTroID: 2 // Assuming 2 is the ID for Phó đoàn
          //   },
          //   ...(Array.isArray(values.ThanhVienNguoiKyQuyetDinhThanhTra)
          //     ? values.ThanhVienNguoiKyQuyetDinhThanhTra.map(canBoID => ({
          //       CanBoID: canBoID,
          //       VaiTroID: 3 // Assuming 3 is the ID for Thành viên
          //     }))
          //     : [])
          // ]
        },
        QuyetDinhGiamSat: {
          SoVanBan: values.SoVanBanQuyetDinhGiamSat || undefined,
          CoQuanBanHanh: values.CoQuanBanHanhQuyetDinhGiamSat || undefined,
          NguoiKy: values.NguoiKyQuyetDinhGiamSat || undefined,
          NgayBanHanh: values.NgayBanHanhQuyetDinhGiamSat
            ? values.NgayBanHanhQuyetDinhGiamSat.format("YYYY-MM-DD")
            : undefined,
          TrichYeu: values.TrichYeuQuyetDinhGiamSat || undefined,
          ChucVuNguoiKy: values.ChucVuNguoiKyQuyetDinhGiamSat || undefined,
          TruongDoanStr: values.TruongDoanStrGiamSat || undefined,
          PhoDoanStr: values.PhoDoanStrGiamSat || undefined,
          ThanhVienStr: values.ThanhVienStrGiamSat || undefined,
          // DoanThanhTra:
          //   [
          //     values.TruongDoanNguoiKyQuyetDinhGiamSat && {
          //       CanBoID: values.TruongDoanNguoiKyQuyetDinhGiamSat,
          //       VaiTroID: 1 // Assuming 1 is the ID for Trưởng đoàn
          //     },
          //     values.PhoDoanNguoiKyQuyetDinhGiamSat && {
          //       CanBoID: values.PhoDoanNguoiKyQuyetDinhGiamSat,
          //       VaiTroID: 2 // Assuming 2 is the ID for Phó đoàn
          //     },
          //     ...(Array.isArray(values.ThanhVienNguoiKyQuyetDinhGiamSat)
          //       ? values.ThanhVienNguoiKyQuyetDinhGiamSat.map(canBoID => ({
          //         CanBoID: canBoID,
          //         VaiTroID: 3 // Assuming 3 is the ID for Thành viên
          //       }))
          //       : [])
          //   ].filter(Boolean)
        },
      };

      const { onCreate } = props;
      onCreate(
        newValue,
        ListFileDinhKemQuyetDinhThanhTra,
        ListFileDinhKemQuyetDinhGiamSat
      );
    });
  };
  const getBase64ThanhTra = (file, callback, listFile) => {
    const reader = new FileReader();
    reader.addEventListener("load", () =>
      callback(reader.result, file, listFile)
    );
    reader.readAsDataURL(file);
  };

  const genDataFileDinhKemThanhTra = (base64, file, listFile) => {
    const newListFileDinhKemQuyetDinhThanhTra = [
      ...ListFileDinhKemQuyetDinhThanhTra,
      ...listFile,
    ];
    setListFileDinhKemQuyetDinhThanhTra(newListFileDinhKemQuyetDinhThanhTra);
  };
  const beforeUploadFileThanhTra = (file, callback, listFile) => {
    const FileLimit = getValueConfigLocalByKey("data_config")?.fileLimit;
    const isLt2M = file.size / 1024 / 1024 < FileLimit;

    if (!isLt2M) {
      message.error(`File đính kèm phải nhỏ hơn ${FileLimit}MB`);
    } else {
      getBase64ThanhTra(file, callback, listFile);
    }
    return false;
  };
  const getBase64GiamSat = (file, callback, listFile) => {
    const reader = new FileReader();
    reader.addEventListener("load", () =>
      callback(reader.result, file, listFile)
    );
    reader.readAsDataURL(file);
  };

  const genDataFileDinhKemGiamSat = (base64, file, listFile) => {
    const newListFileDinhKemQuyetDinhGiamSat = [
      ...ListFileDinhKemQuyetDinhGiamSat,
      ...listFile,
    ];
    setListFileDinhKemQuyetDinhGiamSat(newListFileDinhKemQuyetDinhGiamSat);
  };
  const beforeUploadFileGiamSat = (file, callback, listFile) => {
    const FileLimit = getValueConfigLocalByKey("data_config")?.fileLimit;
    const isLt2M = file.size / 1024 / 1024 < FileLimit;

    if (!isLt2M) {
      message.error(`File đính kèm phải nhỏ hơn ${FileLimit}MB`);
    } else {
      getBase64GiamSat(file, callback, listFile);
    }
    return false;
  };
  // const [selectedPhoDoanThanhTra, setSelectedPhoDoanThanhTra] = useState(null);
  // const [selectedThanhVienThanhTra, setSelectedThanhVienThanhTra] = useState(
  //   []
  // );
  // const [selectedPhoDoanGiamSat, setSelectedPhoDoanGiamSat] = useState(null);
  // const [selectedThanhVienGiamSat, setSelectedThanhVienGiamSat] = useState([]);
  // useEffect(() => {
  //   // Initialize values from form when component mounts
  //   const phoDoanThanhTra = form.getFieldValue(
  //     "PhoDoanNguoiKyQuyetDinhThanhTra"
  //   );
  //   const thanhVienThanhTra =
  //     form.getFieldValue("ThanhVienNguoiKyQuyetDinhThanhTra") || [];
  //   setSelectedPhoDoanThanhTra(phoDoanThanhTra);
  //   setSelectedThanhVienThanhTra(thanhVienThanhTra);
  //   const phoDoanGiamSat = form.getFieldValue("PhoDoanNguoiKyQuyetDinhGiamSat");
  //   const thanhVienGiamSat =
  //     form.getFieldValue("ThanhVienNguoiKyQuyetDinhGiamSat") || [];
  //   setSelectedPhoDoanGiamSat(phoDoanGiamSat);
  //   setSelectedThanhVienGiamSat(thanhVienGiamSat);
  // }, []);

  // const handlePhoDoanChangeThanhTra = (value) => {
  //   setSelectedPhoDoanThanhTra(value);
  //   form.setFieldsValue({
  //     ThanhVienNguoiKyQuyetDinhThanhTra: selectedThanhVienThanhTra.filter(
  //       (id) => id !== value
  //     ),
  //   });
  //   setSelectedThanhVienThanhTra((prev) => prev.filter((id) => id !== value));
  // };

  // const handleThanhVienChangeThanhTra = (values) => {
  //   setSelectedThanhVienThanhTra(values);
  //   if (selectedPhoDoanThanhTra && values.includes(selectedPhoDoanThanhTra)) {
  //     form.setFieldsValue({ PhoDoanNguoiKyQuyetDinhThanhTra: undefined });
  //     setSelectedPhoDoanThanhTra(null);
  //   }
  // };

  // const filteredPhoDoanOptionsThanhTra = DanhSachCanBoPhoDoan?.filter(
  //   (item) => !selectedThanhVienThanhTra.includes(item.CanBoID)
  // );

  // const filteredThanhVienOptionsThanhTra = DanhSachCanBoPhoDoan?.filter(
  //   (item) => item.CanBoID !== selectedPhoDoanThanhTra
  // );
  // const handlePhoDoanChangeGiamSat = (value) => {
  //   setSelectedPhoDoanGiamSat(value);
  //   form.setFieldsValue({
  //     ThanhVienNguoiKyQuyetDinhGiamSat: selectedThanhVienGiamSat.filter(
  //       (id) => id !== value
  //     ),
  //   });
  //   setSelectedThanhVienGiamSat((prev) => prev.filter((id) => id !== value));
  // };

  // const handleThanhVienChangeGiamSat = (values) => {
  //   setSelectedThanhVienGiamSat(values);
  //   if (selectedPhoDoanGiamSat && values.includes(selectedPhoDoanGiamSat)) {
  //     form.setFieldsValue({ PhoDoanNguoiKyQuyetDinhGiamSat: undefined });
  //     setSelectedPhoDoanGiamSat(null);
  //   }
  // };

  // const filteredPhoDoanOptionsGiamSat = DanhSachCanBoPhoDoan?.filter(
  //   (item) => !selectedThanhVienGiamSat.includes(item.CanBoID)
  // );

  // const filteredThanhVienOptionsGiamSat = DanhSachCanBoPhoDoan?.filter(
  //   (item) => item.CanBoID !== selectedPhoDoanGiamSat
  // );
  const LabelContent = ({ label, content }) => (
    <div style={{ display: "flex", alignItems: "flex-start" }}>
      <span style={{ width: "200px", flexShrink: 0 }}>{label}:</span>
      <span>{content}</span>
    </div>
  );
  return (
    <Modal
      title={`${
        action === "add" ? "Thêm" : "Cập nhật"
      } cuộc thanh tra, kiểm tra`}
      width={"100%"}
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button
          key="back"
          type="danger"
          icon={<CloseSquareFilled />}
          onClick={onCancel}
        >
          Hủy
        </Button>,
        <Button
          key="submit"
          type="primary"
          icon={<SaveFilled />}
          onClick={onOk}
        >
          Lưu
        </Button>,
      ]}
    >
      <Form form={form}>
        <div style={{ borderBottom: "1px solid #007BFF" }}>
          <div
            style={{
              fontFamily: "Roboto",
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: "18.75px",
              textAlign: "left",
              color: "#409CFF",
              marginBottom: "20px",
            }}
          >
            Thông tin cuộc thanh tra, kiểm tra
          </div>
          <Item name="BanHanhKHID" hidden {...REQUIRED}></Item>
          <Row gutter={16}>
            <Col span={6}>
              <Item label="Kế hoạch năm" name="NamThanhTra">
                {form.getFieldValue("NamThanhTra")}
              </Item>
            </Col>
            <Col span={6}>
              <Item label="Hình thức" name="PhanLoaiThanhTraID1">
                <div style={{ marginLeft: "50px" }}>
                  {ListHinhThuc &&
                    ListHinhThuc.find(
                      (item) =>
                        item.PhanLoaiThanhTraID ===
                        form.getFieldValue("PhanLoaiThanhTraID1")
                    )?.TenPhanLoaiThanhTra}
                </div>
              </Item>
            </Col>
            <Col span={6}>
              <LabelContent
                label="Lĩnh vực chính"
                content={
                  listLinhVuc &&
                  listLinhVuc.find(
                    (item) =>
                      item.PhanLoaiThanhTraID ===
                      form.getFieldValue("PhanLoaiThanhTraID2")
                  )?.TenPhanLoaiThanhTra
                }
              />
            </Col>
          </Row>
          {/* <Row gutter={16}>
            <Col span={12}>
              <Item
                label="Đối tượng"
                name="DoiTuongTTIds"
                {...ITEM_LAYOUT2}
              >
                <div>
                  {Array.isArray(DanhSachDoiTuongThanhTra)
                    ? DanhSachDoiTuongThanhTra.map((item) => item.TenCoQuan).join(', ')
                    : null}
                </div>
              </Item>
            </Col>
            <Col span={12}>
              <Item
                label="Nội dung"
                name="NoiDung"
                {...ITEM_LAYOUT2}
                maxLength={MAXLENGTHNOIDUNG}
              >
                {form.getFieldValue('NoiDung')}
              </Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Item
                label="Thời hạn thanh tra (ngày)"
                name="ThoiHanThanhTra"
              >
                <div style={{ marginLeft: '10px' }}>
                  {form.getFieldValue('ThoiHanThanhTra')}
                </div>
              </Item>
            </Col>
            <Col span={12}>
              <Item
                label="Thời gian thanh tra"
                name="ThoiGianTienHanh"
              >
                <div style={{ marginLeft: '50px' }}>
                  {form.getFieldValue('ThoiGianTienHanh')}
                </div>
              </Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Item
                label="Đơn vị phối hợp"
                rules={[REQUIRED]}
              >
                <div style={{ marginLeft: '50px' }}>
                  {form.getFieldValue('DonViChuTri')}
                </div>
              </Item>
            </Col>
            <Col span={12}>
              <Item
                label="Đơn vị phối hợp"
                name="DonViPhoiHop"
              >
                <div style={{ marginLeft: '50px' }}>
                  {form.getFieldValue('DonViPhoiHop')}
                </div>
              </Item>
            </Col>
          </Row> */}
          <Row gutter={16}>
            <Col span={12}>
              <LabelContent
                label="Đối tượng"
                content={
                  Array.isArray(DanhSachDoiTuongThanhTra)
                    ? DanhSachDoiTuongThanhTra.map((item) => (
                        <div key={item.TenCoQuan}>{item.TenCoQuan}</div>
                      ))
                    : null
                }
              />
            </Col>
            <Col span={12}>
              <LabelContent
                label="Nội dung"
                content={form.getFieldValue("NoiDung")}
              />
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <LabelContent
                label="Thời hạn thanh tra (ngày)"
                content={form.getFieldValue("ThoiHanThanhTra")}
              />
            </Col>
            <Col span={12}>
              <LabelContent
                label="Thời gian thanh tra"
                content={form.getFieldValue("ThoiGianTienHanh")}
              />
            </Col>
          </Row>
          <br></br>
          <Row gutter={16}>
            <Col span={12}>
              <LabelContent
                label="Đơn vị chủ trì"
                content={form.getFieldValue("DonViChuTri")}
              />
            </Col>
            <Col span={12}>
              <LabelContent
                label="Đơn vị phối hợp"
                content={form.getFieldValue("DonViPhoiHop")}
              />
            </Col>
          </Row>
          <br></br>
        </div>
        <div style={{ borderBottom: "1px solid #007BFF" }}>
          <div
            style={{
              fontFamily: "Roboto",
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: "18.75px",
              textAlign: "left",
              color: "#409CFF",
              marginBottom: "20px",
              marginTop: "20px",
            }}
          >
            Quyết định thanh tra
          </div>
          <Item name="BanHanhKHID" hidden {...REQUIRED}></Item>
          <Row gutter={16}>
            <Col span={12}>
              <Item
                label="Số văn bản"
                name="SoVanBanQuyetDinhThanhTra"
                rules={[REQUIRED]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input />
              </Item>
            </Col>
            <Col span={12}>
              <Item
                label="Ngày ban hành"
                name="NgayBanHanhQuyetDinhThanhTra"
                rules={[REQUIRED]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <DatePicker placeholder="Chọn ngày" format="DD/MM/YYYY" />
              </Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Item
                label="Đơn vị, cơ quan ban hành"
                name="CoQuanBanHanhQuyetDinhThanhTra"
                rules={[REQUIRED]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input />
              </Item>
            </Col>
            <Col span={12}>
              <Item
                label="Trích yếu"
                name="TrichYeuQuyetDinhThanhTra"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input />
              </Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Item
                label="Người ký"
                name="NguoiKyQuyetDinhThanhTra"
                rules={[REQUIRED]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input />
              </Item>
            </Col>
            <Col span={12}>
              <Item
                label="Chức vụ người ký"
                name="ChucVuNguoiKyQuyetDinhThanhTra"
                rules={[REQUIRED]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input />
              </Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Item
                label="Trưởng đoàn"
                name="TruongDoanStrThanhTra"
                rules={[REQUIRED]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input></Input>
              </Item>
            </Col>
            <Col span={12}>
              <Item
                label="Phó đoàn"
                name="PhoDoanStrThanhTra"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input></Input>
              </Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Item
                label="Thành viên"
                name="ThanhVienStrThanhTra"
                mode="multiple"
                rules={[REQUIRED]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input></Input>
              </Item>
            </Col>
            <Col span={12}>
              <Item
                label="Người giám sát"
                name="NguoiGiamSatStrThanhTra"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input></Input>
              </Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Item
                label="Thời gian thanh tra trực tiếp"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
                required={[REQUIRED]}
              >
                <Row gutter={16} align="middle">
                  <Col span={6}>
                    <Item name="ThoiGianTTStart" rules={[REQUIRED]}>
                      <DatePicker
                        placeholder="Thời gian bắt đầu"
                        format="DD/MM/YYYY"
                      />
                    </Item>
                  </Col>
                  <Col span={11}>
                    <Item
                      name="ThoiGianTTEnd"
                      rules={[
                        REQUIRED,
                        {
                          validator: (_, value) => {
                            const startDate =
                              form.getFieldValue("ThoiGianTTStart");
                            if (
                              value &&
                              startDate &&
                              value.isBefore(startDate)
                            ) {
                              return Promise.reject(
                                new Error(
                                  "Thời gian kết thúc không được nhỏ hơn thời gian bắt đầu!"
                                )
                              );
                            }
                            return Promise.resolve();
                          },
                        },
                      ]}
                    >
                      <DatePicker
                        placeholder="Thời gian kết thúc"
                        format="DD/MM/YYYY"
                      />
                    </Item>
                  </Col>
                </Row>
              </Item>
            </Col>
            <Col span={12}>
              <Item
                label="Tệp đính kèm"
                name=""
                {...ITEM_LAYOUT}
                style={{ marginBottom: "20px" }}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px", // Add spacing between the button and file list
                    flexWrap: "wrap", // Wrap files to next line if necessary
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "15px",
                    }}
                  >
                    <Upload
                      multiple={true}
                      showUploadList={false}
                      beforeUpload={(file, fileList) => {
                        fileList.forEach((file) => {
                          beforeUploadFileThanhTra(
                            file,
                            genDataFileDinhKemThanhTra,
                            fileList
                          );
                        });
                        return false;
                      }}
                      disabled={loading}
                    >
                      <button
                        type="primary"
                        icon={<CloudUploadOutlined />}
                        size="large"
                        style={{
                          backgroundColor: "white",
                          borderRadius: "10px",
                          fontWeight: "400",
                          fontSize: "14px",
                          border: "1px solid #E5E5E5",
                          width: "197px",
                          height: "40px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "8px",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708z"
                          />
                          <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383m.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
                        </svg>
                        <span>Tải tệp từ máy lên</span>
                      </button>
                    </Upload>
                    {ListFileDinhKemQuyetDinhThanhTra &&
                      ListFileDinhKemQuyetDinhThanhTra.length > 0 && (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                          }}
                        >
                          {ListFileDinhKemQuyetDinhThanhTra.map(
                            (item, index) => (
                              <div
                                key={index}
                                style={{
                                  padding: "8px 12px",
                                  borderRadius: "8px",
                                  backgroundColor: "#f5f5f5",
                                  display: "flex",
                                  alignItems: "center",
                                  maxWidth: "500px",
                                  overflow: "hidden",
                                  whiteSpace: "nowrap",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                <a
                                  target="_blank"
                                  href={item?.UrlFile}
                                  style={{
                                    color: "#007BFF",
                                    fontWeight: "400",
                                    fontSize: "14px",
                                    textDecoration: "none",
                                    overflow: "hidden",
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis",
                                    maxWidth: "250px",
                                  }}
                                  onMouseEnter={(e) =>
                                    (e.currentTarget.style.color = "#1890ff")
                                  }
                                  onMouseLeave={(e) =>
                                    (e.currentTarget.style.color = "#007BFF")
                                  }
                                >
                                  {item?.name || item?.TenFile}
                                </a>
                                <button
                                  onClick={() => {
                                    if (item.FileID) {
                                      setFileID((prevFileIDs) => [
                                        ...prevFileIDs,
                                        item.FileID,
                                      ]);
                                    }
                                    setListFileDinhKemQuyetDinhThanhTra(
                                      (prevFiles) =>
                                        prevFiles.filter((_, i) => i !== index)
                                    );
                                  }}
                                  style={{
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    color: "red",
                                    fontSize: "16px",
                                  }}
                                >
                                  <DeleteIcon />
                                </button>
                              </div>
                            )
                          )}
                        </div>
                      )}
                  </div>
                </div>
              </Item>
            </Col>
          </Row>
        </div>
        <div>
          <div
            style={{
              fontFamily: "Roboto",
              fontSize: "16px",
              fontWeight: 500,
              lineHeight: "18.75px",
              textAlign: "left",
              color: "#409CFF",
              marginBottom: "20px",
              marginTop: "20px",
            }}
          >
            Quyết định giám sát
          </div>
          <Item name="BanHanhKHID" hidden {...REQUIRED}></Item>
          <Row gutter={16}>
            <Col span={12}>
              <Item
                label="Số văn bản"
                name="SoVanBanQuyetDinhGiamSat"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input />
              </Item>
            </Col>
            <Col span={12}>
              <Item
                label="Ngày ban hành"
                name="NgayBanHanhQuyetDinhGiamSat"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <DatePicker placeholder="Chọn ngày" format="DD/MM/YYYY" />
              </Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Item
                label="Đơn vị, cơ quan ban hành"
                name="CoQuanBanHanhQuyetDinhGiamSat"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input />
              </Item>
            </Col>
            <Col span={12}>
              <Item
                label="Trích yếu"
                name="TrichYeuQuyetDinhGiamSat"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input />
              </Item>
            </Col>
          </Row>

          <Row gutter={16}>
            <Col span={12}>
              <Item
                label="Người ký"
                name="NguoiKyQuyetDinhGiamSat"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input />
              </Item>
            </Col>
            <Col span={12}>
              <Item
                label="Chức vụ người ký"
                name="ChucVuNguoiKyQuyetDinhGiamSat"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input />
              </Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Item
                label="Trưởng đoàn"
                name="TruongDoanStrGiamSat"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input></Input>
              </Item>
            </Col>
            <Col span={12}>
              <Item
                label="Phó đoàn"
                name="PhoDoanStrGiamSat"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input></Input>
              </Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Item
                label="Thành viên"
                name="ThanhVienStrGiamSat"
                mode="multiple"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <Input></Input>
              </Item>
            </Col>
            <Col span={12}>
              <Item
                label="Tệp đính kèm"
                name=""
                {...ITEM_LAYOUT}
                style={{ marginBottom: "20px" }}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "20px", // Add spacing between the button and file list
                    flexWrap: "wrap", // Wrap files to next line if necessary
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "flex-start",
                      gap: "15px",
                    }}
                  >
                    <Upload
                      multiple={true}
                      showUploadList={false}
                      beforeUpload={(file, fileList) => {
                        fileList.forEach((file) => {
                          beforeUploadFileGiamSat(
                            file,
                            genDataFileDinhKemGiamSat,
                            fileList
                          );
                        });
                        return false;
                      }}
                      disabled={loading}
                    >
                      <button
                        type="primary"
                        icon={<CloudUploadOutlined />}
                        size="large"
                        style={{
                          backgroundColor: "white",
                          borderRadius: "10px",
                          fontWeight: "400",
                          fontSize: "14px",
                          border: "1px solid #E5E5E5",
                          width: "197px",
                          height: "40px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          gap: "8px",
                        }}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="18"
                          height="18"
                          fill="currentColor"
                          viewBox="0 0 16 16"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708z"
                          />
                          <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383m.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
                        </svg>
                        <span>Tải tệp từ máy lên</span>
                      </button>
                    </Upload>
                    {ListFileDinhKemQuyetDinhGiamSat &&
                      ListFileDinhKemQuyetDinhGiamSat.length > 0 && (
                        <div
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            gap: "10px",
                          }}
                        >
                          {ListFileDinhKemQuyetDinhGiamSat.map(
                            (item, index) => (
                              <div
                                key={index}
                                style={{
                                  padding: "8px 12px",
                                  borderRadius: "8px",
                                  backgroundColor: "#f5f5f5",
                                  display: "flex",
                                  alignItems: "center",
                                  maxWidth: "500px",
                                  overflow: "hidden",
                                  whiteSpace: "nowrap",
                                  textOverflow: "ellipsis",
                                }}
                              >
                                <a
                                  target="_blank"
                                  href={item?.UrlFile}
                                  style={{
                                    color: "#007BFF",
                                    fontWeight: "400",
                                    fontSize: "14px",
                                    textDecoration: "none",
                                    overflow: "hidden",
                                    whiteSpace: "nowrap",
                                    textOverflow: "ellipsis",
                                    maxWidth: "250px",
                                  }}
                                  onMouseEnter={(e) =>
                                    (e.currentTarget.style.color = "#1890ff")
                                  }
                                  onMouseLeave={(e) =>
                                    (e.currentTarget.style.color = "#007BFF")
                                  }
                                >
                                  {item?.name || item?.TenFile}
                                </a>
                                <button
                                  onClick={() => {
                                    if (item.FileID) {
                                      setFileID((prevFileIDs) => [
                                        ...prevFileIDs,
                                        item.FileID,
                                      ]);
                                    }
                                    setListFileDinhKemQuyetDinhGiamSat(
                                      (prevFiles) =>
                                        prevFiles.filter((_, i) => i !== index)
                                    );
                                  }}
                                  style={{
                                    background: "none",
                                    border: "none",
                                    cursor: "pointer",
                                    color: "red",
                                    fontSize: "16px",
                                  }}
                                >
                                  <DeleteIcon />
                                </button>
                              </div>
                            )
                          )}
                        </div>
                      )}
                  </div>
                </div>
              </Item>
            </Col>
          </Row>
        </div>
      </Form>
    </Modal>
  );
};
export { ModalAddEdit };
