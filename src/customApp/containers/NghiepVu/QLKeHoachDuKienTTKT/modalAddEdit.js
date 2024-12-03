import React, { Component, useEffect, useState } from "react";
import {
  MODAL_NORMAL,
  ITEM_LAYOUT,
  REQUIRED,
} from "../../../../settings/constants";
import {
  Form,
  Input,
  Upload,
  message,
  Radio,
  Modal as ModalAnt,
  Switch,
  Space,
  Tooltip,
} from "antd";
import { Button } from "../../../../components/uielements/exportComponent";
import BoxTable from "../../../../components/utility/boxTable";
import Select, { Option } from "../../../../components/uielements/select";
import Modal from "../../../../components/uielements/modal";
import { CloseSquareFilled, SaveFilled } from "@ant-design/icons";
import {
  formatNoiDung,
  getValueConfigLocalByKey,
  handleRenderTrangThai,
  renderTrangThaiColor,
} from "../../../../helpers/utility";
import { useDispatch, useSelector } from "react-redux";
import LayoutWrapper from "../../../../components/utility/layoutWrapper";
import Box from "../../../../components/utility/box";
import api from "./config";
import { backgrounds } from "polished";
import PageWrap from "../../../../components/utility/PageWrap";
import PageHeader from "../../../../components/utility/pageHeader";
import actions from "../../../../customApp/redux/NghiepVu/Inspection/actions";
import { convertToRoman } from "../../../../helpers/utility";
import { useGetApi } from "../../../CustomHook/useGetApi";
const { Item } = Form;
import { apiUrl } from "./config";
const { TextArea } = Input;
const ModalAddEdit = (props) => {
  const [ListHinhThuc, setListHinhThuc] = useState([]);
  const [loading, setLoading] = useState(false);
  const [ListFileDinhKem, setListFileDinhKem] = useState([]);
  const { ListSideBar } = useSelector((state) => state.ListSideBar);
  const { useForm } = Form;
  const [form] = useForm();
  const ListFields = useGetApi(apiUrl.listfield);
  const dispatch = useDispatch();
  const {
    visible,
    onCancel,
    action,
    dataModalAddEdit,
    DanhSachTienHanh,
    showModalEdit,
    defaultNamThanhTra,
    setDoiTuongTT,
    CoQuanLapID,
    DoiTuongTT,
    TenCoQuan,
  } = props;
  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: "5%",
      align: "left",
      render: (text, record, index) => {
        if (record.isParent) {
          return {
            children: (
              <p
                style={{
                  fontWeight: "bold",
                  marginLeft: "10px",
                  fontSize: "15px",
                }}
              >
                {record.idx}. {record.TenPhanLoaiThanhTra}
              </p>
            ),
            props: {
              colSpan: columns.length,
              style: { backgroundColor: "#f0f0f0" },
            },
          };
        }
        return <p style={{ textAlign: "center" }}>{record.index + 1}</p>;
      },
    },
    {
      title: "Đối tượng",
      dataIndex: "CoQuanBiThanhTra",
      width: "10%",
      key: "CoQuanBiThanhTra",
      render: (text, record) => {
        if (record.isParent) {
          return {
            props: {
              colSpan: 0,
            },
          };
        }
        return text.split("|").map((item, index) => (
          <React.Fragment key={index}>
            {item.includes("-") ? (
              <>
                <strong>{item.split("-")[0].trim()}</strong>
                {" - " + item.split("-").slice(1).join("-").trim()}
              </>
            ) : (
              item
            )}
            {index < text.split("|").length - 1 && <br />}
          </React.Fragment>
        ));
      },
    },
    {
      title: "Nội dung",
      dataIndex: "NoiDung",
      key: "NoiDung",
      width: "25%",
      render: (text, record) => {
        if (record.isParent) {
          return {
            props: {
              colSpan: 0,
            },
          };
        }
        return formatNoiDung(text);
      },
    },
    {
      title: "Lĩnh vực chính",
      dataIndex: "LinhVuc",
      key: "LinhVuc",
      width: "10%",
      align: "center",
      render: (text, record) => {
        if (record.isParent) {
          return {
            props: {
              colSpan: 0,
            },
          };
        }
        return (
          <p type="primary" size="small">
            {text}
          </p>
        );
      },
    },
    {
      title: "Lĩnh vực thanh tra",
      dataIndex: "LinhVucPhuIDs",
      key: "LinhVucPhuIDs",
      width: "10%",
      render: (text, record) => {
        if (record.isParent) {
          return {
            props: {
              colSpan: 0,
            },
          };
        }

        return record.LinhVucPhuIDs ? (
          <>
            {record.LinhVucPhuIDs.split(",").map((id) => {
              const data = ListFields.find(
                (item) => item.PhanLoaiThanhTraID === Number(id)
              );
              return data ? <p>{data.TenPhanLoaiThanhTra}</p> : null;
            })}
          </>
        ) : null;
      },
    },
    {
      title: "Thời hạn thanh tra",
      dataIndex: "ThoiHanThanhTra",
      key: "ThoiHanThanhTra",
      width: "8%",
      align: "center",

      render: (text, record) => {
        if (record.isParent) {
          return {
            props: {
              colSpan: 0,
            },
          };
        }
        return text;
      },
    },
    {
      title: "Thời gian thanh tra",
      dataIndex: "ThoiGianTienHanh",
      key: "ThoiGianTienHanh",
      width: "8%",
      align: "center",

      render: (text, record) => {
        if (record.isParent) {
          return {
            props: {
              colSpan: 0,
            },
          };
        }
        return text;
      },
    },
    {
      title: "Trạng thái",
      dataIndex: "StateName",
      key: "StateName",
      width: "180px",
      align: "center",
      render: (text, record) => {
        if (record.isParent) {
          return {
            props: {
              colSpan: 0,
            },
          };
        }
        return <div className="wrap-state">{renderTrangThaiColor(text)}</div>;
      },
    },
    {
      title: "Đơn vị phối hợp",
      dataIndex: "DonViPhoiHop",
      key: "DonViPhoiHop",
      width: "11%",
      align: "center",
      render: (text, record) => {
        if (record.isParent) {
          return {
            props: {
              colSpan: 0,
            },
          };
        }
        return text;
      },
    },
  ];
  const [selected, setSelected] = useState("unit");
  const handleClick = (id) => {
    setSelected(id);
    if (id === "unit") {
      // setDoiTuongTT(1);
      showModalEdit(1, defaultNamThanhTra, CoQuanLapID);
    } else if (id === "business") {
      // setDoiTuongTT(2);
      showModalEdit(2, defaultNamThanhTra, CoQuanLapID);
    }
  };
  const dataGroup = [...ListHinhThuc]
    .map((item, index) => {
      return {
        TenPhanLoaiThanhTra: `Danh sách các dự thảo ${item?.TenPhanLoaiThanhTra}`,
        idx: convertToRoman(index + 1),
        listChild: Array.isArray(dataModalAddEdit)
          ? dataModalAddEdit
              .filter(
                (item2) => item2.PhanLoaiThanhTraID1 === item.PhanLoaiThanhTraID
              )
              .map((item3, index2) => ({
                ...item3,
                index: index2,
              }))
          : [], // fallback to empty array if dataModalAddEdit is not an array
      };
    })
    .filter((item) => item?.listChild?.length > 0);

  const restructuredData = dataGroup.flatMap((group, index) => [
    { ...group, isParent: true, key: `parent-${index}` },
    ...group.listChild.map((child, childIndex) => ({
      ...child,
      isParent: false,

      key: `child-${index}-${childIndex}`,
    })),
  ]);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const res = await api.danhSachListHinhThuc(/* Tham số */);
      if (res.data.Status > 0) {
        setListHinhThuc(res.data.Data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách cấp xếp hạng:", error);
    }
  };

  return (
    <Modal
      title={`Chi tiết kế hoạch dự kiến thanh tra, kiểm tra`}
      width={"100%"}
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button
          type="danger"
          icon={<CloseSquareFilled />}
          key="back"
          onClick={onCancel}
        >
          Đóng
        </Button>,
      ]}
    >
      <div
        style={{
          fontFamily: "Roboto",
          fontSize: "16px",
          fontWeight: 400,
          lineHeight: "18.75px",
        }}
      >
        Kế hoạch dư kiến năm {defaultNamThanhTra} của {TenCoQuan}
      </div>

      <div style={{ marginTop: "10px" }}>
        <div style={{ display: "flex" }}>
          <div
            onClick={() => handleClick("unit")}
            style={{
              border: "1px solid",
              borderColor:
                selected === "unit" ? "rgb(33, 111, 202)" : "#E5E5E5",
              padding: "10px 0px 10px 0px",
              textAlign: "center",
              width: "210px",
              borderTopLeftRadius: "5px",
              borderTopRightRadius: "5px",
              backgroundColor:
                selected === "unit" ? "rgb(33, 111, 202)" : "transparent",
              fontWeight: selected === "unit" ? 500 : 400,
              cursor: "pointer",
              transition: "background-color 0.3s, border-color 0.3s",
              color: selected === "unit" ? "white" : "#000000",
            }}
          >
            Đơn vị hành chính, sự nghiệp
          </div>
          <div
            onClick={() => handleClick("business")}
            style={{
              border: "1px solid",
              borderColor:
                selected === "business" ? "rgb(33, 111, 202)" : "#E5E5E5",
              padding: "10px 0px 10px 0px",
              textAlign: "center",
              width: "210px",
              borderTopLeftRadius: "5px",
              borderTopRightRadius: "5px",
              backgroundColor:
                selected === "business" ? "rgb(33, 111, 202)" : "transparent",
              cursor: "pointer",
              transition: "background-color 0.3s, border-color 0.3s",
              color: selected === "business" ? "white" : "#000000",
              fontWeight: selected === "business" ? 500 : 400,
            }}
          >
            Doanh Nghiệp
          </div>
        </div>

        <BoxTable
          columns={columns}
          dataSource={restructuredData}
          expandable={{
            // childrenColumnName : 'children',
            defaultExpandAllRows: true,
            expandIcon: ({ expanded, onExpand, record }) => false,
            expandIconColumnIndex: -1,
            expandedRowRender: (record) => {},
          }}
          pagination={false}
        />
      </div>
    </Modal>
  );
};
export { ModalAddEdit };
