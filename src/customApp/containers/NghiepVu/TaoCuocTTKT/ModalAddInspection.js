import React, { useState, useEffect } from "react";
import {
  Modal,
  Input,
  TreeSelect,
} from "../../../../components/uielements/exportComponent";
import {
  Row,
  Col,
  Typography,
  Space,
  Form as FormAntd,
  Input as InputAntd,
  message,
  Spin,
} from "antd";
import QuestionIcon from "../../../../components/utility/QuestionIcon";

import {
  SearchOutlined,
  PlusOutlined,
  DeleteOutlined,
  SendOutlined,
  SaveOutlined,
  CloseSquareFilled,
  SaveFilled,
  CheckOutlined,
  CloudUploadOutlined,
} from "@ant-design/icons";
import moment from "moment";
import { customizeItemValidator as Item } from "../../../../components/uielements/itemValidator";
import {
  customizeFormValidator as Form,
  useForm,
} from "../../../../components/uielements/formValidator";
const { TextArea } = InputAntd;
const { Title } = Typography;
import {
  Button,
  InputSearch,
  Select,
  Option,
  DatePicker,
} from "../../../../components/uielements/exportComponent";
import { getValueConfigLocalByKey } from "../../../../helpers/utility";
import Upload from "../../../../components/uielements/upload";
import styled from "styled-components";
import VectorFly from "../../../../image/VectorFly.png";
import api from "./config";
import dayjs from "dayjs";
import { Tooltip } from "antd";
import DeleteIcon from "../../../../components/utility/DeleteIcon";
import {
  DONVIHANHCHINH,
  MAXLENGTHNOIDUNG,
} from "../../../../settings/constants";
import { _debounce } from "../../../../helpers/utility";
import { CarryOutOutlined } from "@ant-design/icons";
import { Tree } from "antd";
import { StyleTree } from "./index.styled";
import { useTransition } from "react";
import HiddenVector from "../../../../image/HiddenVector.png";
import {
  MODAL_NORMAL,
  ITEM_LAYOUT,
  ITEM_LAYOUT2,
  REQUIRED,
} from "../../../../settings/constants";
import CustomizeTooltip from "../../../../components/uielements/tooltip";
import CloudUploadIcon from "../../../../components/utility/CloudUploadIcon";
const Wrapper = styled.div`
  .name-agency {
    max-width: 80%;
    /* white-space: nowrap;f
    overflow: hidden;
    text-overflow: ellipsis; */
    word-break: break-word;
  }
  .title-required {
    display: flex;
    align-items: center;
    gap: 2px;
  }
  .note {
    height: 17px;
    width: 17px;
    border-radius: 50%;
    border: 1px solid #fff;
    color: #fff;
    display: inline-block;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 11px;
    margin-left: 8px;
    position: absolute;
    top: 4px;
    right: 10px;
    cursor: pointer;
    background: rgb(111 178 234);
  }
  .tax {
    width: 100%;
  }
  .title {
    margin-bottom: 5px;
  }
  .wrapper-item__disabled {
    p {
      color: rgba(0, 0, 0, 0.25);
    }
  }
  .wrapper-item {
    display: flex;
    justify-content: space-between;
    padding: 5px 10px;
    /* height: 50px; */
    /* margin-bottom: 10px; */
    align-items: flex-start;
    position: relative;
    .selected-item {
      display: flex;
      gap: 3px;
      flex-direction: column;

      .tax .count {
        position: absolute;
        right: 35px;
        top: 2px;
        /* top: 50%;
        transform: translateY(-50%); */
      }
    }

    .tax,
    .wrap-remove {
      display: flex;
      gap: 10px;
      align-items: center;
      svg {
        fill: #fff !important;
      }
      .count {
        color: #fff;
        background: rgba(76, 153, 227, 1);
        width: 20px;
        height: 20px;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    button {
      width: 55px;
      min-width: 55px;
      height: 20px;

      color: #fff;
      display: flex;
      gap: 5px;
      align-items: center;
      font-size: 11px;
    }
    .icon-send {
      cursor: pointer;
    }
    .btn-remove {
      background: red;
      color: #fff;
    }
    .btn-add {
      background: #09b109;
      color: #fff;
      .ant-btn-icon {
        background: #fff;
        color: #09b109;
      }
    }
  }
  .wrapper-item:nth-child(odd) {
    background: #fff;
  }
  .wrapper-item:nth-child(even) {
    background: rgba(244, 246, 249, 1);
  }

  .wrapper-agency,
  .wrapper-agency_selected {
    /* margin-top: 10px; */
    border: 1px solid #ccc;
    max-height: 505px;
    overflow: auto;
    min-height: 505px;
  }
  .wrapper-col {
    position: relative;
  }
  .wrapper-agency {
    .loading-antd {
      position: absolute;
      width: 100%;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
      top: 50%;
      left: 50%;
      background: rgba(255, 255, 255, 0.7);
      transform: translate(-50%, -50%);
    }
  }
  .input-search {
    input,
    button {
      border-radius: 0 !important;
    }
    input {
      height: 35px;
      /* padding: 10px 15px; */
    }
    button {
      /* height: 30px; */
      padding: 20px;
    }
  }
`;

const ModalAddInspection = ({
  visible,
  onCancel,
  onCreate,
  defaultNamThanhTra,
  ListHinhThuc,
  ListFields,
  dataEdit,
  action,
  isTTTrungUong,
  ListYear,
  DoiTuongTT,
  ListAgencyTw,
  dataModalAddEdit,
  DoiTuongTTDotXuat,
}) => {
  const [form] = useForm();
  const [listAgecnySelected, setlistAgecnySelected] = useState([]);
  const [NamThanhTra, setNamThanhTra] = useState(defaultNamThanhTra);
  const [listAgency, setListAgency] = useState([]);
  const [listFields, setlistFields] = useState([]);
  const [pageNumber, setpageNumber] = useState(1);
  const [keyWord, setKeyWord] = useState("");
  const [loadingAgency, setLoadingAgency] = useState(false);
  const [initLoading, setInitLoading] = useState(false);
  const defaultPageNumber = 1;
  const [loading, setLoading] = useState(false);
  const [expandedKeys, setExpandedKeys] = useState([]);

  const getListAgency = (Keyword, isSearch, initLoading = false) => {
    setLoadingAgency(true);
    api
      .getListAgency({
        PhanLoai: DoiTuongTT ? Number(DoiTuongTT) : DONVIHANHCHINH,
        PageNumber: isSearch ? defaultPageNumber : pageNumber,
        Keyword,
        NamThanhTra,
      })
      .then((res) => {
        if (res.data.Status > 0) {
          const data = res.data.Data ? res.data.Data : [];
          const defaultExpandKey = [];
          transformData(data, defaultExpandKey || []);
          setExpandedKeys(defaultExpandKey);
          if (initLoading) {
            setInitLoading(initLoading);
          }
          const viewData = data
            ? data.map((agency) => ({ ...agency, isView: true }))
            : [];
          setLoadingAgency(false);
          if (isSearch) {
            const data = [...viewData].map((item) => {
              if (
                listAgecnySelected.find(
                  (itemFind) => itemFind.CoQuanID === item.CoQuanID
                )
              ) {
                return { ...item, isView: false };
              } else {
                return { ...item, isView: true };
              }
            });
            setListAgency(data);
            setpageNumber(defaultPageNumber);
          } else {
            const data = [...viewData].map((item) => {
              if (
                listAgecnySelected.find(
                  (itemFind) => itemFind.CoQuanID === item.CoQuanID
                )
              ) {
                return { ...item, isView: false };
              } else {
                return { ...item, isView: true };
              }
            });
            setListAgency(data);
          }
        } else {
          message.destroy();
          message.warning(res.data.Message);
        }
      });
  };
  useEffect(() => {
    getListAgency(keyWord, false, true); // Gọi API khi pageSize thay đổi
  }, [NamThanhTra]);
  const [fileID, setFileID] = useState([]);
  const handleDeleteFile = (index, type) => {
    let removedFile; // Declare a variable to hold the removed file
    if (type === "ThanhTra") {
      setListFileDinhKemQuyetDinhThanhTra((prev) => {
        const newList = prev.filter((_, i) => i !== index);
        removedFile = prev[index]; // Store the removed file
        return newList;
      });
    } else if (type === "GiamSat") {
      setListFileDinhKemQuyetDinhGiamSat((prev) => {
        const newList = prev.filter((_, i) => i !== index);
        removedFile = prev[index]; // Store the removed file
        return newList;
      });
    }
    // Store the FileID if it exists
    if (removedFile && removedFile.FileID) {
      setFileID((prev) => [...prev, removedFile.FileID]);
    }
  };
  useEffect(() => {
    if (dataEdit.PhanLoaiThanhTraID1 && form) {
      // form.setFieldsValue({
      //   ...dataEdit,
      //   PhanLoaiThanhTraID1: dataEdit?.PhanLoaiThanhTraID1
      //     ? dataEdit.PhanLoaiThanhTraID1
      //     : null,
      //   PhanLoaiThanhTraID2: dataEdit?.PhanLoaiThanhTraID2
      //     ? dataEdit.PhanLoaiThanhTraID2
      //     : null,
      //   NamThanhTra: dataEdit.NamThanhTra ? String(dataEdit.NamThanhTra) : null,
      // });

      if (dataEdit.PhanLoaiThanhTraID1) {
        getListFields(dataEdit.PhanLoaiThanhTraID1);
      } else {
        setlistFields(ListFields);
      }
      const DoiTuongTTIds = dataEdit.DoiTuongTTIds;
      if (DoiTuongTTIds) {
        if (DoiTuongTT === DONVIHANHCHINH) {
          const ListItemSelected = [];
          const newListAgency = [...listAgency];
          const mappingSelected = (data, ListCoQuanID) => {
            if (data) {
              data.forEach((item) => {
                if (ListCoQuanID.includes(item.CoQuanID)) {
                  ListItemSelected.push({ ...item, isView: true });
                  item.isView = false;
                }
                if (item.Children && item.Children?.length) {
                  mappingSelected(item.Children, ListCoQuanID);
                }
              });
            }
          };
          mappingSelected(newListAgency, DoiTuongTTIds);
          setListAgency(newListAgency);

          setlistAgecnySelected(ListItemSelected);
        } else {
          const listAgecnySelected = listAgency
            .filter((agency) => DoiTuongTTIds.includes(agency.CoQuanID))
            .map((item) => ({ ...item, isView: true }));
          setlistAgecnySelected(listAgecnySelected);
          const lisstAgency = listAgency.map((item) => {
            if (
              listAgecnySelected.find(
                (itemFind) => itemFind.CoQuanID === item.CoQuanID
              )
            ) {
              return { ...item, isView: false };
            } else {
              return { ...item, isView: true };
            }
          });
          setListAgency(lisstAgency);
        }
      }
      //  else {
      //   setListAgency(
      //     listAgency.map((agency) => ({ ...agency, isView: true }))
      //   );
      // }
    } else {
      form &&
        form.setFieldsValue({
          ...dataEdit,
          NamThanhTra: defaultNamThanhTra,
        });
    }
    // fetchDanhSachCanBo(0);
    // fetchDanhSachCanBo(1);
  }, [initLoading]);
  const [CuocThanhTraID, setCuocThanhTraID] = useState("");
  useEffect(() => {
    if (dataModalAddEdit && dataModalAddEdit.CuocThanhTraID) {
      // const doanThanhTra =
      //   dataModalAddEdit.QuyetDinhThanhTra?.DoanThanhTra || [];

      // // Find specific roles based on VaiTroID
      // const truongDoanQuyetDinhThanhTra = doanThanhTra.find(
      //   (member) => member.VaiTroID === 1
      // ); // Trưởng đoàn
      // const phoDoanQuyetDinhThanhTra = doanThanhTra.find(
      //   (member) => member.VaiTroID === 2
      // ); // Phó đoàn
      // const thanhVienQuyetDinhThanhTra = doanThanhTra
      //   .filter((member) => member.VaiTroID === 3)
      //   .map((member) => member.CanBoID); // Thành viên

      // const doanGiamSat = dataModalAddEdit.QuyetDinhGiamSat?.DoanThanhTra || [];

      // // Find specific roles based on VaiTroID
      // const truongDoanQuyetDinhGiamSat = doanGiamSat.find(
      //   (member) => member.VaiTroID === 1
      // ); // Trưởng đoàn
      // const phoDoanQuyetDinhGiamSat = doanGiamSat.find(
      //   (member) => member.VaiTroID === 2
      // ); // Phó đoàn
      // const thanhVienQuyetDinhGiamSat = doanGiamSat
      //   .filter((member) => member.VaiTroID === 3)
      //   .map((member) => member.CanBoID); // Thành viên

      const NgayBanHanhQuyetDinhThanhTra = dataModalAddEdit.QuyetDinhThanhTra
        ?.NgayBanHanh
        ? dayjs(dataModalAddEdit.QuyetDinhThanhTra.NgayBanHanh).format(
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
      const NgayBanHanhQuyetDinhGiamSat = dataModalAddEdit.QuyetDinhGiamSat
        ?.NgayBanHanh
        ? dayjs(dataModalAddEdit.QuyetDinhGiamSat.NgayBanHanh).format(
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
          LinhVucPhuIDs1:
            dataModalAddEdit.CuocThanhTraReponse.LinhVucPhuIDs.split(",").map(
              (id) => Number(id.trim())
            ),
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
          // TruongDoanNguoiKyQuyetDinhThanhTra:
          //   truongDoanQuyetDinhThanhTra?.CanBoID || null,
          // PhoDoanNguoiKyQuyetDinhThanhTra:
          //   phoDoanQuyetDinhThanhTra?.CanBoID || null,
          // ThanhVienNguoiKyQuyetDinhThanhTra: thanhVienQuyetDinhThanhTra || null,
          TruongDoanStrThanhTra:
            dataModalAddEdit.QuyetDinhThanhTra.TruongDoanStr,
          PhoDoanStrThanhTra: dataModalAddEdit.QuyetDinhThanhTra.PhoDoanStr,
          ThanhVienStrThanhTra: dataModalAddEdit.QuyetDinhThanhTra.ThanhVienStr,
          NguoiGiamSatStrThanhTra:
            dataModalAddEdit.QuyetDinhThanhTra.NguoiGiamSatStr,

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
          PhoDoanStrGiamSat: dataModalAddEdit.QuyetDinhGiamSat.PhoDoanStr,
          ThanhVienStrGiamSat: dataModalAddEdit.QuyetDinhGiamSat.ThanhVienStr,
          // TruongDoanNguoiKyQuyetDinhGiamSat:
          //   truongDoanQuyetDinhGiamSat?.CanBoID || null,
          // PhoDoanNguoiKyQuyetDinhGiamSat:
          //   phoDoanQuyetDinhGiamSat?.CanBoID || null,
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
  }, []);
  const handleScroll = (e) => {
    const { scrollTop, scrollHeight, clientHeight } = e.target;
    if (scrollHeight - scrollTop <= clientHeight) {
      // Tăng pageNumber khi cuộn đến cuối
      getListAgency(); // Gọi API để lấy dữ liệu mới
    }
  };

  const addObject = (object, index) => {
    setlistAgecnySelected([...listAgecnySelected, { ...object, isView: true }]);
    const newListAgency = [...listAgency]; // Tạo bản sao của listAgency
    newListAgency[index].isView = false; // Cập nhật isView
    setListAgency(newListAgency); // Cập nhật state
  };

  const removeObject = (index, object) => {
    if (DoiTuongTT === DONVIHANHCHINH) {
      const newObjects = [...listAgecnySelected];
      newObjects.splice(index, 1);
      const newListAgency = [...listAgency];
      assignPropertyAgency(newListAgency, "isView", object.CoQuanID, true);
      setListAgency(newListAgency);
      setlistAgecnySelected(newObjects);
    } else {
      const newObjects = [...listAgecnySelected];
      const objectRemoved = newObjects[index];
      newObjects.splice(index, 1);
      setlistAgecnySelected(newObjects);
      const agency = listAgency.find(
        (itemFind) => itemFind.CoQuanID === objectRemoved.CoQuanID
      );
      const newListAgency = [...listAgency];
      if (agency) {
        const index = newListAgency.indexOf(agency);
        const target = newListAgency[index];
        target.isView = true;
        setListAgency(newListAgency);
      }
    }
  };
  const onOk = (e) => {
    e.preventDefault();
    form.validateFields().then((values) => {
      if (listAgecnySelected.length) {
        const newValues = {
          LisXoaFileIds: fileID,
          // ...values,
          [action === "add"
            ? "CuocThanhTraDotXuat"
            : "CuocThanhTraDotXuat_Update"]: {
            DoiTuongTTIds: listAgecnySelected.map((item) => item.CoQuanID),
            CuocThanhTraID: CuocThanhTraID,
            DoiTuongTT: DoiTuongTT,
            LoaiKeHoach: 2,
            DonViPhoiHop: values.DonViPhoiHop,
            GhiChu: values.GhiChu,
            LaBoSung: values.LaBoSung,
            LoaiKeHoach: 2,
            LaQuanLyKeHoachTrungUong: values.LaQuanLyKeHoachTrungUong,
            NamThanhTra: values.NamThanhTra,
            NoiDung: values.NoiDung,
            PhanLoaiThanhTraID1: values.PhanLoaiThanhTraID1,
            PhanLoaiThanhTraID2: values.PhanLoaiThanhTraID2,
            LinhVucPhuIDs: values.LinhVucPhuIDs1.join(", "),
            ThoiGianTienHanh: values.ThoiGianTienHanh,
            ThoiHanThanhTra: values.ThoiHanThanhTra,
          },
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
            //     VaiTroID: 1, // Assuming 1 is the ID for Trưởng đoàn
            //   },
            //   {
            //     CanBoID: values.PhoDoanNguoiKyQuyetDinhThanhTra,
            //     VaiTroID: 2, // Assuming 2 is the ID for Phó đoàn
            //   },
            //   ...(Array.isArray(values.ThanhVienNguoiKyQuyetDinhThanhTra)
            //     ? values.ThanhVienNguoiKyQuyetDinhThanhTra.map((canBoID) => ({
            //       CanBoID: canBoID,
            //       VaiTroID: 3, // Assuming 3 is the ID for Thành viên
            //     }))
            //     : []),
            // ],
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
            // DoanThanhTra: [
            //   values.TruongDoanNguoiKyQuyetDinhGiamSat && {
            //     CanBoID: values.TruongDoanNguoiKyQuyetDinhGiamSat,
            //     VaiTroID: 1, // Assuming 1 is the ID for Trưởng đoàn
            //   },
            //   values.PhoDoanNguoiKyQuyetDinhGiamSat && {
            //     CanBoID: values.PhoDoanNguoiKyQuyetDinhGiamSat,
            //     VaiTroID: 2, // Assuming 2 is the ID for Phó đoàn
            //   },
            //   ...(Array.isArray(values.ThanhVienNguoiKyQuyetDinhGiamSat)
            //     ? values.ThanhVienNguoiKyQuyetDinhGiamSat.map((canBoID) => ({
            //       CanBoID: canBoID,
            //       VaiTroID: 3, // Assuming 3 is the ID for Thành viên
            //     }))
            //     : []),
            // ].filter(Boolean),
          },
        };

        onCreate(
          newValues,
          ListFileDinhKemQuyetDinhThanhTra,
          ListFileDinhKemQuyetDinhGiamSat
        );
      } else {
        message.destroy();
        message.warning("Vui lòng chọn đối tượng được thanh tra, kiểm tra");
      }
    });
  };

  const FilterAgency = _debounce((value, generate = 1) => {
    const strValue = String(value);

    if (generate === 1) {
      getListAgency(value, true);
      // const filterList = listAgency.map((agency) => {
      //   if (
      //     agency?.TenCoQuan?.toLowerCase()
      //       ?.trim()
      //       ?.includes(strValue?.toLowerCase()?.trim()) ||
      //     agency?.MaCoQuan?.toLowerCase()
      //       ?.trim()
      //       ?.includes(strValue?.toLowerCase()?.trim())
      //   ) {
      //     return { ...agency, isView: true };
      //   }
      //   else {
      //     return { ...agency, isView: false };
      //   }
      // });
      // if (!value) {
      //   setListAgency(
      //     listAgency.map((agency) => ({ ...agency, isView: true }))
      //   );
      // } else {
      //   setListAgency(filterList);
      // }
    } else {
      const filterList = listAgecnySelected.map((agency) => {
        if (
          agency?.TenCoQuan?.toLowerCase()
            ?.trim()
            ?.includes(strValue?.toLowerCase()?.trim()) ||
          agency?.MaCoQuan?.toLowerCase()
            ?.trim()
            ?.includes(strValue?.toLowerCase()?.trim())
        ) {
          return { ...agency, isView: true };
        } else {
          return { ...agency, isView: false };
        }
      });
      if (!value) {
        setlistAgecnySelected(
          listAgecnySelected.map((agency) => ({ ...agency, isView: true }))
        );
      } else {
        setlistAgecnySelected(filterList);
      }
    }
  }, 50);

  const getListFields = (HinhThucID) => {
    const filteredFields = ListFields.filter(
      (field) => field.ParrentID === HinhThucID
    );
    setlistFields(filteredFields);
  };

  const rowCustom = {
    lg: 6,
    span: 24,
  };

  const transformData = (data, defaultExpandKey) => {
    if (data) {
      return data.map((item) => {
        defaultExpandKey.push(item.CoQuanID);
        return {
          title: item.TenCoQuan,
          key: item.CoQuanID,
          children: transformData(item.Children, defaultExpandKey),
          rawData: item,
          disabled: item.isView === false ? true : false,
        };
      });
    }
  };

  const assignPropertyAgency = (data, property, CoQuanID, value) => {
    if (data) {
      data.forEach((item) => {
        if (item.CoQuanID === CoQuanID) {
          item[property] = value;
        }
        if (item.Children) {
          assignPropertyAgency(item.Children, property, CoQuanID, value);
        }
      });
    }
  };

  const handleAddItemTree = (data) => {
    data.isView = false;
    setlistAgecnySelected([...listAgecnySelected, { ...data, isView: true }]);
  };

  const customTitleRender = (node) => {
    const { rawData } = node;
    return (
      <div
        className={`selected-item ${
          rawData.isView === false || rawData.Type === 1
            ? "selected-item__disabled"
            : ""
        }`}
      >
        <div className="tax">
          <p className="name-agency">{rawData.TenCoQuan}</p>
          {rawData.Count ? (
            <Tooltip
              className="tax-tooltip"
              title={rawData?.NamThanhTra}
              placement="right"
              arrow={false}
              overlayInnerStyle={{
                backgroundColor: "rgba(222, 240, 255, 1)",
                color: "#000000",
                border: "1px solid rgba(76, 153, 227, 1)",
                borderRadius: "3px",
                minHeight: "16px",
                padding: "0 5px",
              }}
            >
              <p className="count">
                {rawData.Count ? (rawData.Count > 0 ? rawData.Count : "") : ""}
              </p>
            </Tooltip>
          ) : null}
        </div>
        <div className="fly-icon">
          {rawData.isView === false || rawData.Type === 1 ? (
            <img src={HiddenVector} alt="Send" className="icon-send" />
          ) : (
            <img
              src={VectorFly}
              alt="Send"
              onClick={() =>
                rawData.isView === false || rawData.Type === 1
                  ? null
                  : handleAddItemTree(rawData)
              }
              className="icon-send"
            />
          )}
        </div>
      </div>
    );
  };
  const removeDiacritics = (str) => {
    return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
  };
  const filterTreeData = (data, keyword) => {
    if (keyword) {
      let expandedKeys = []; // Danh sách keys cho các node sẽ được mở rộng

      const filteredData = data.reduce((acc, node) => {
        // Kiểm tra xem node.title có chứa keyword hay không
        const isTitleMatched = removeDiacritics(
          node.title?.toLowerCase()
        )?.includes(removeDiacritics(keyword.toLowerCase()));

        // Đệ quy qua children
        const childrenResult = filterTreeData(node.children || [], keyword);
        const { filteredData: children, expandedKeys: newExpandedKeys } =
          childrenResult;

        // Nếu node.title hoặc children chứa keyword, giữ lại node
        if (isTitleMatched || children.length > 0) {
          expandedKeys.push(node.key); // Thêm key của node cha vào danh sách
          acc.push({
            ...node,
            children, // Giữ lại children đã được lọc
            rawData: node.rawData, // Giữ lại rawData
          });
        }

        // Thêm các expandedKeys của children vào danh sách
        expandedKeys = [...expandedKeys, ...newExpandedKeys];

        return acc;
      }, []);

      return { filteredData, expandedKeys: [...new Set(expandedKeys)] }; // Trả về danh sách key duy nhất
    }
    return { filteredData: data, expandedKeys: [] }; // Trả về dữ liệu gốc nếu không có keyword
  };
  const changeKeyWord = (value) => {
    if (value) {
      const { filteredData, expandedKeys: newExpandedKeys } = filterTreeData(
        data,
        value
      );
      setExpandedKeys(newExpandedKeys); // Cập nhật expandedKeys với các key đã lọc
    } else {
      const defaultExpandKey = [];
      const data = isDonViHanhChinh
        ? transformData(listAgency, defaultExpandKey || [])
        : listAgency;
      setExpandedKeys(defaultExpandKey);
    }
    setKeyWord(value);
  };
  const defaultExpandKey = [];
  const isDonViHanhChinh = DoiTuongTT === DONVIHANHCHINH;
  const data = isDonViHanhChinh
    ? transformData(listAgency, defaultExpandKey || [])
    : listAgency;
  const dataFilter = filterTreeData(data, keyWord);
  const filteredData =
    dataFilter.filteredData && dataFilter.filteredData?.length > 0
      ? dataFilter.filteredData
      : data;
  const debouncedChangeKeyWord = _debounce(changeKeyWord, 50);

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
  const [
    ListFileDinhKemQuyetDinhThanhTra,
    setListFileDinhKemQuyetDinhThanhTra,
  ] = useState([]);
  const [ListFileDinhKemQuyetDinhGiamSat, setListFileDinhKemQuyetDinhGiamSat] =
    useState([]);
  // const handleChange = ({ fileList }) => {
  //   const uploadedFiles = fileList.map((file) => file.originFileObj);
  //   // Combine new files with existing files
  //   setListFileDinhKemQuyetDinhThanhTra(prevFiles => [...prevFiles, ...uploadedFiles]);
  // };
  // const handleChange = (base64, file, listFile) => {
  //   const newListFileDinhKemQuyetDinhThanhTra = [
  //     ...ListFileDinhKemQuyetDinhThanhTra,
  //     ...listFile,
  //   ];
  //   setListFileDinhKemQuyetDinhThanhTra(newListFileDinhKemQuyetDinhThanhTra);
  // };
  // const handleChangeGiamSat = (base64, file, listFile) => {
  //   const newListFileDinhKemQuyetDinhGiamSat = [
  //     ...ListFileDinhKemQuyetDinhThanhTra,
  //     ...listFile,
  //   ];
  //   setListFileDinhKemQuyetDinhGiamSat(newListFileDinhKemQuyetDinhGiamSat);
  // };
  // const handleChangeGiamSat = ({ fileList }) => {
  //   const uploadedFiles = fileList.map((file) => file.originFileObj);
  //   // Update to spread the uploadedFiles instead of wrapping in an array
  //   setListFileDinhKemQuyetDinhGiamSat(...ListFileDinhKemQuyetDinhGiamSat, ...uploadedFiles);
  // };
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
  return (
    <Modal
      visible={visible}
      title={
        dataEdit?.LaBoSung
          ? "Bổ sung cuộc thanh tra"
          : dataEdit.PhanLoaiThanhTraID1
          ? "Cập nhật cuộc thanh tra"
          : "Thêm cuộc thanh tra"
      }
      onCancel={onCancel}
      width={1800}
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
      <Form form={form} layout="vertical">
        <Wrapper style={{ borderBottom: "1px solid #007BFF" }}>
          <Item name="LaBoSung" hidden></Item>
          <Item name="LaQuanLyKeHoachTrungUong" hidden></Item>
          {action === "edit1" && (
            <Item name="CuocThanhTraID" hidden>
              <Input />
            </Item>
          )}
          <Row gutter={16}>
            <Col
              lg={12}
              md={24}
              style={{ maxHeight: "615px", overflow: "auto" }}
            >
              <Title level={5}>Thông tin cuộc thanh tra/kiểm tra</Title>
              <Row gutter={[16, 16]}>
                <Col {...rowCustom}>
                  <Item
                    name="NamThanhTra"
                    label="Kế hoạch năm"
                    rules={[REQUIRED]}
                  >
                    <Select
                      defaultValue={defaultNamThanhTra}
                      onChange={(value) => {
                        setNamThanhTra(value);
                        setlistAgecnySelected([]);
                      }}
                      allowClear={false}
                      disabled
                    >
                      {ListYear &&
                        ListYear.map((item) => (
                          <Option value={item.id}>{item.name}</Option>
                        ))}
                    </Select>
                    {/* <DatePicker
                      picker="year"
                      format="YYYY"
                      style={{ width: "100%" }}
                    /> */}
                  </Item>
                </Col>
                {isTTTrungUong && (
                  <>
                    <Col {...rowCustom}>
                      <Item
                        name="CoQuanID"
                        label="Cơ quan TW"
                        rules={[REQUIRED]}
                      >
                        <TreeSelect
                          showSearch
                          treeData={ListAgencyTw}
                          style={{ width: "100%" }}
                          dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
                          placeholder="Chọn đơn vị"
                          treeDefaultExpandAll
                          notFoundContent={"Không có dữ liệu"}
                          treeNodeFilterProp={"title"}
                        />
                      </Item>
                    </Col>
                  </>
                )}
                <Col {...rowCustom}>
                  <Item
                    name="PhanLoaiThanhTraID1"
                    label="Hình thức"
                    rules={[REQUIRED]}
                  >
                    <Select
                      onChange={(value) => {
                        getListFields(value);
                        form.setFieldsValue({
                          PhanLoaiThanhTraID2: null,
                        });
                      }}
                    >
                      {ListHinhThuc &&
                        ListHinhThuc.length > 0 &&
                        ListHinhThuc.map((item) => (
                          <Option value={item.PhanLoaiThanhTraID}>
                            {item.TenPhanLoaiThanhTra}
                          </Option>
                        ))}
                    </Select>
                  </Item>
                </Col>
                <Col {...rowCustom}>
                  <Item
                    name="PhanLoaiThanhTraID2"
                    label={<p className="title-required">Lĩnh vực chính</p>}
                    rules={[REQUIRED]}
                  >
                    <Select>
                      {listFields &&
                        listFields.length > 0 &&
                        listFields.map((item) => (
                          <Option value={item.PhanLoaiThanhTraID}>
                            {item.TenPhanLoaiThanhTra}
                          </Option>
                        ))}
                    </Select>
                  </Item>
                  <CustomizeTooltip title="Phục vụ báo cáo">
                    <span className="note" style={{ marginLeft: 8 }}>
                      ?
                    </span>
                  </CustomizeTooltip>
                </Col>
                <Col {...rowCustom}>
                  <Item
                    name="LinhVucPhuIDs1"
                    label="Lĩnh vực thanh tra/kiểm tra"
                    rules={[REQUIRED]}
                  >
                    <Select mode="multiple">
                      {listFields &&
                        listFields.length > 0 &&
                        listFields.map((item) => (
                          <Option value={item.PhanLoaiThanhTraID}>
                            {item.TenPhanLoaiThanhTra}
                          </Option>
                        ))}
                    </Select>
                  </Item>
                  <CustomizeTooltip
                    maxWidth={250}
                    title="Chọn các lĩnh vực có liên quan đến nội dung cuộc thanh tra"
                  >
                    <span className="note" style={{ marginLeft: 8 }}>
                      ?
                    </span>
                  </CustomizeTooltip>
                </Col>
              </Row>
              <Item
                name="NoiDung"
                label="Nội dung"
                rules={[REQUIRED]}
                maxLength={MAXLENGTHNOIDUNG}
              >
                <TextArea rows={4} />
              </Item>
              <Row gutter={[16, 16]}>
                <Col md={12} span={24}>
                  <Item
                    name="ThoiHanThanhTra"
                    label="Thời hạn thanh tra/kiểm tra (ngày)"
                  >
                    <Input />
                  </Item>
                </Col>
                <Col md={12} span={24}>
                  <Item
                    name="ThoiGianTienHanh"
                    label="Thời gian triển khai thanh tra/kiểm tra"
                  >
                    <Input />
                  </Item>
                </Col>
              </Row>

              <Item
                name="DonViPhoiHop"
                label="Đơn vị phối hợp"
                maxLength={MAXLENGTHNOIDUNG}
              >
                <TextArea rows={4} />
              </Item>
              <Item name="GhiChu" label="Ghi chú" maxLength={MAXLENGTHNOIDUNG}>
                <TextArea rows={4} />
              </Item>
            </Col>
            <Col lg={12} md={24}>
              <Title level={5}>Đối tượng thanh tra/kiểm tra</Title>
              <Space direction="vertical" style={{ width: "100%" }}>
                <Row gutter={[16, 16]}>
                  <Col md={12} span={24}>
                    <div className="wrapper-col">
                      <Title className="title" level={5}>
                        Chọn đối tượng thanh tra/kiểm tra
                      </Title>
                      <InputSearch
                        style={{ width: "100%" }}
                        className="input-search"
                        placeholder="Nhập mã hoặc tên đối tượng"
                        onChange={(e) => {
                          if (DoiTuongTT === DONVIHANHCHINH) {
                            debouncedChangeKeyWord(e.target.value);
                          } else {
                            FilterAgency(e.target.value);
                          }
                        }}
                        onSearch={(value) => {
                          if (DoiTuongTT === DONVIHANHCHINH) {
                            debouncedChangeKeyWord(value);
                          } else {
                            FilterAgency(value);
                          }
                        }}
                      />
                      <div
                        className="wrapper-agency"
                        style={{ padding: !isDonViHanhChinh ? "" : "10px 5px" }}
                        onScroll={(e) => {
                          if (!isDonViHanhChinh) {
                            handleScroll(e);
                          }
                        }}
                      >
                        {!isDonViHanhChinh ? (
                          listAgency.map(
                            (object, index) =>
                              object && (
                                <div
                                  className={`wrapper-item ${
                                    object.isView === false || object.Type === 1
                                      ? "wrapper-item__disabled"
                                      : ""
                                  }`}
                                  key={index}
                                >
                                  <div className="selected-item">
                                    <div className="tax">
                                      <p style={{ fontWeight: "bold" }}>
                                        {object.MaSoThue}
                                      </p>
                                      {object.Count ? (
                                        <Tooltip
                                          className="tax-tooltip"
                                          title={object?.NamThanhTra}
                                          placement="right"
                                          arrow={false}
                                          overlayInnerStyle={{
                                            backgroundColor:
                                              "rgba(222, 240, 255, 1)",
                                            color: "#000000",
                                            border:
                                              "1px solid rgba(76, 153, 227, 1)",
                                            borderRadius: "3px",
                                            minHeight: "16px",
                                            padding: "0 5px",
                                          }}
                                        >
                                          <p className="count">
                                            {object.Count
                                              ? object.Count > 0
                                                ? object.Count
                                                : ""
                                              : ""}
                                          </p>
                                        </Tooltip>
                                      ) : null}
                                    </div>
                                    <p className="name-agency">
                                      {object.TenCoQuan}
                                    </p>
                                    <p
                                      style={{
                                        color: "rgba(177, 175, 175, 1)",
                                        fontSize: "12px",
                                      }}
                                    >
                                      {object.DiaChi
                                        ? `Địa chỉ: ${object.DiaChi}`
                                        : ""}
                                    </p>
                                  </div>
                                  {object.isView === false ||
                                  object.Type === 1 ? (
                                    <img
                                      src={HiddenVector}
                                      alt="Send"
                                      className="icon-send"
                                    />
                                  ) : (
                                    <img
                                      src={VectorFly}
                                      alt="Send"
                                      onClick={() =>
                                        object.isView === false ||
                                        object.Type === 1
                                          ? null
                                          : addObject(object, index)
                                      }
                                      className="icon-send"
                                    />
                                  )}
                                </div>
                              )
                          )
                        ) : (
                          <StyleTree>
                            <Tree
                              treeData={filteredData}
                              showIcon={true}
                              showLine={true}
                              titleRender={customTitleRender}
                              blockNode={true}
                              defaultExpandAll={true}
                              defaultExpandedKeys={defaultExpandKey}
                              expandedKeys={expandedKeys}
                              onExpand={(expandedKeys) => {
                                setExpandedKeys(expandedKeys);
                              }}
                              filterTreeNode={(node) =>
                                keyWord
                                  ? removeDiacritics(
                                      node.title?.toLowerCase()
                                    )?.includes(
                                      removeDiacritics(keyWord.toLowerCase())
                                    )
                                  : false
                              }
                              // ... other props if needed ...
                            />
                          </StyleTree>
                        )}
                        {loadingAgency ? (
                          <Spin className="loading-antd" />
                        ) : null}
                      </div>
                    </div>
                  </Col>

                  <Col md={12} span={24}>
                    <div className="title-list__object">
                      <Title className="title" level={5}>
                        Danh sách đối tượng thanh tra/kiểm tra{" "}
                        <span style={{ color: "red" }}>*</span>{" "}
                      </Title>
                    </div>
                    <InputSearch
                      style={{ width: "100%" }}
                      placeholder="Nhập mã hoặc tên đối tượng"
                      className="input-search"
                      onChange={(e) => {
                        FilterAgency(e.target.value, 2);
                      }}
                      onSearch={(value) => {
                        FilterAgency(value, 2);
                      }}
                    />
                    <div className="wrapper-agency_selected">
                      {listAgecnySelected.map(
                        (object, index) =>
                          object &&
                          object.isView && (
                            <div className="wrapper-item" key={index}>
                              <div className="selected-item">
                                <p style={{ fontWeight: "bold" }}>
                                  {object.MaSoThue}
                                </p>
                                <p>{object.TenCoQuan}</p>
                                <p
                                  style={{
                                    color: "rgba(177, 175, 175, 1)",
                                    fontSize: "12px",
                                  }}
                                >
                                  {object.DiaChi
                                    ? `Địa chỉ: ${object.DiaChi}`
                                    : ""}
                                </p>
                              </div>
                              <div className="wrap-remove">
                                {object.Count ? (
                                  <Tooltip
                                    className="tax-tooltip"
                                    title={object?.NamThanhTra}
                                    placement="left"
                                    arrow={false}
                                    overlayInnerStyle={{
                                      backgroundColor: "rgba(222, 240, 255, 1)",
                                      color: "#000000",
                                      border: "1px solid rgba(76, 153, 227, 1)",
                                      borderRadius: "3px",
                                      minHeight: "16px",
                                      padding: "0 5px",
                                    }}
                                  >
                                    <p className="count">
                                      {object.Count
                                        ? object.Count > 0
                                          ? object.Count
                                          : ""
                                        : ""}
                                    </p>
                                  </Tooltip>
                                ) : null}
                                <Button
                                  type="text"
                                  icon={<DeleteIcon />}
                                  onClick={() => removeObject(index, object)}
                                  className="btn-remove"
                                >
                                  Xóa
                                </Button>
                              </div>
                            </div>
                          )
                      )}
                    </div>
                  </Col>
                </Row>
              </Space>
            </Col>
          </Row>
        </Wrapper>
        <Wrapper style={{ borderBottom: "1px solid #007BFF" }}>
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
            Quyết định thanh tra/kiểm tra
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
                <DatePicker format="DD/MM/YYYY" />
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
                {/* <Select
                  allowClear
                  listHeight={100}
                >
                  {DanhSachCanBoTruongDoan?.map((item) => (
                    <Option key={item.CanBoID} value={item.CanBoID}>
                      {item.TenCanBo}
                    </Option>
                  ))}
                </Select> */}
                <Input />
              </Item>
            </Col>
            <Col span={12}>
              <Item
                label="Phó đoàn"
                name="PhoDoanStrThanhTra"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                {/* <Select
                  allowClear
                  listHeight={100}
                  onChange={handlePhoDoanChangeThanhTra}
                >
                  {filteredPhoDoanOptionsThanhTra?.map((item) => (
                    <Option key={item.CanBoID} value={item.CanBoID}>
                      {item.TenCanBo}
                    </Option>
                  ))}
                </Select> */}
                <Input />
              </Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Item
                label="Thành viên"
                name="ThanhVienStrThanhTra"
                mode="multiple"
                required={[REQUIRED]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                {/* <Select
                  allowClear
                  listHeight={100}
                  mode="multiple"
                  onChange={handleThanhVienChangeThanhTra}
                >
                  {filteredThanhVienOptionsThanhTra?.map((item) => (
                    <Option key={item.CanBoID} value={item.CanBoID}>
                      {item.TenCanBo}
                    </Option>
                  ))}
                </Select> */}
                <Input />
              </Item>
            </Col>
            <Col span={12}>
              <Item
                label="Người giám sát"
                name="NguoiGiamSatStrThanhTra"
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
                        icon={<CloudUploadIcon />}
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
                                {/* <Button
                                  type="text"
                                  icon={<DeleteOutlined />}
                                  onClick={() => handleDeleteFile(index, 'ThanhTra')}
                                  style={{ color: "red" }}
                                /> */}
                                <button
                                  onClick={() =>
                                    handleDeleteFile(index, "ThanhTra")
                                  }
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
        </Wrapper>
        <Wrapper>
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
                <DatePicker format="DD/MM/YYYY" />
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
                {/* <Select
                  allowClear
                  listHeight={100}
                >
                  {DanhSachCanBoTruongDoan?.map((item) => (
                    <Option key={item.CanBoID} value={item.CanBoID}>
                      {item.TenCanBo}
                    </Option>
                  ))}
                </Select> */}
                <Input />
              </Item>
            </Col>
            <Col span={12}>
              <Item
                label="Phó đoàn"
                name="PhoDoanStrGiamSat"
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                {/* <Select
                  allowClear
                  listHeight={100}
                  onChange={handlePhoDoanChangeGiamSat}
                >
                  {filteredPhoDoanOptionsGiamSat?.map((item) => (
                    <Option key={item.CanBoID} value={item.CanBoID}>
                      {item.TenCanBo}
                    </Option>
                  ))}
                </Select> */}
                <Input />
              </Item>
            </Col>
          </Row>
          <Row gutter={16}>
            <Col span={12}>
              <Item
                label="Thành viên"
                name="ThanhVienStrGiamSat"
                mode="multiple"
                // required={[REQUIRED]}
                labelCol={{ span: 24 }}
                wrapperCol={{ span: 24 }}
              >
                {/* <Select
                  allowClear
                  listHeight={100}
                  mode="multiple"
                  onChange={handleThanhVienChangeGiamSat}
                >
                  {filteredThanhVienOptionsGiamSat?.map((item) => (
                    <Option key={item.CanBoID} value={item.CanBoID}>
                      {item.TenCanBo}
                    </Option>
                  ))}
                </Select> */}
                <Input />
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
                        icon={<CloudUploadIcon />}
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
                                {/* <Button
                                  type="text"
                                  icon={<DeleteOutlined />}
                                  onClick={() => handleDeleteFile(index, 'GiamSat')}
                                  style={{ color: "red" }}
                                /> */}
                                <button
                                  onClick={() =>
                                    handleDeleteFile(index, "GiamSat")
                                  }
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
        </Wrapper>
      </Form>
    </Modal>
  );
};
export default ModalAddInspection;
