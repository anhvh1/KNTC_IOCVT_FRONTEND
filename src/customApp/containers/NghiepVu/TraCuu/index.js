import React, { useState, useEffect, useRef } from "react";
import {
  Layout,
  Typography,
  Input,
  Table,
  Tooltip,
  Space,
  Tabs,
  message,
  Modal,
  Upload,
} from "antd";
import {
  Button,
  InputSearch,
  Select,
  Option,
  DatePicker,
} from "../../../../components/uielements/exportComponent";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  EyeOutlined,
  ImportOutlined,
  ExportOutlined,
  CloudUploadOutlined,
  SendOutlined,
  CloudDownloadOutlined,
} from "@ant-design/icons";
import EditIcon from "../../../../components/utility/EditIcon";
import FlyIcon from "../../../../components/utility/FlyIcon";
import LayoutWrapper from "../../../../components/utility/layoutWrapper";
import PageHeader from "../../../../components/utility/pageHeader";
import PageAction from "../../../../components/utility/pageAction";
import Box from "../../../../components/utility/box";
import BoxFilter from "../../../../components/utility/boxFilter";
import BoxTable from "../../../../components/utility/boxTable";
import ModalInspectionDetail from "./ModalInspectionDetail";
import queryString from "query-string";
import { saveAs } from "file-saver";
const { Content } = Layout;
const { Title } = Typography;
const { Search } = Input;
const { TabPane } = Tabs;
import api from "./config";
import { useDispatch, useSelector } from "react-redux";
import {
  exportExcel,
  formatNoiDung,
  getDefaultPageSize,
  handleRenderTrangThai,
  renderTrangThaiColor,
} from "../../../../helpers/utility";

import {
  changeUrlFilter,
  getConfigLocal,
  getFilterData,
  getRoleByKey,
} from "../../../../helpers/utility";
import dayjs from "dayjs";
import actions from "../../../../customApp/redux/NghiepVu/Lookup/actions";
import Wrapper from "./index.styled";
import {
  getConfigValueByKey,
  getValueConfigLocalByKey,
} from "../../../../helpers/utility";
import axios from "axios";
import { apiUrl } from "./config";
import { convertToRoman } from "../../../../helpers/utility";
import {
  DONVIHANHCHINH,
  DOANHNGHIEP,
  STATENGHIEPVU,
} from "../../../../settings/constants";
import { useLocation } from "react-router-dom";
import { formDataCaller } from "../../../../api/formDataCaller";
import { getListYear, getLocalKey } from "../../../../helpers/utility";
import AddIcon from "../../../../components/utility/AddIcon";
import EyeIcon from "../../../../components/utility/EyeIcon";
import DeleteIcon from "../../../../components/utility/DeleteIcon";
import { TableExport } from "./TableExport";
import { styleWrapper } from "../TongHopRaSoatChongCheo/index.styled";
import { TreeSelect } from "../../../../components/uielements/exportComponent";
import CloudDownloadIcon from "../../../../components/utility/CloudDownloadIcon";
import CloudUploadIcon from "../../../../components/utility/CloudUploadIcon";
import BreadCrumb from "../Shared/Component/BreadCumb";
const PlanningScreen = (props) => {
  const {
    TotalRow,
    TableLoading,
    DataLookup,
    ListHinhThuc,
    ListAgencyTw,
    DataLookupAll,
    ListFields,
  } = useSelector((state) => state.Lookup);
  const { role } = props;
  const location = useLocation();
  const route = location.pathname.split("/")[2];
  const title = "Tra cứu";
  document.title = title;
  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search)
  );
  const [loadingDowload, setLoadingDowload] = useState(false);
  const excelRef = useRef();
  const [stateModalInspectionDetail, setStateModalInspectionDetail] = useState({
    visible: false,
    data: {},
    loading: false,
    key: 0,
  });

  const ListLookup = DataLookup ? DataLookup.ListCuocThanhTraResponse : [];
  const ListLookupAll = DataLookupAll
    ? DataLookupAll.ListCuocThanhTraResponse
    : [];

  const ListYear = getListYear();
  // const [ListAgency, setListAgency] = useState([]);
  const dispatch = useDispatch();
  const defaultYear = ListYear ? ListYear[ListYear.length - 1].id : null;
  const defaultNamThanhTra = filterData?.NamThanhTra
    ? filterData.NamThanhTra
    : defaultYear;
  const defaultDoiTuongTT = filterData?.DoiTuongTT
    ? Number(filterData?.DoiTuongTT)
    : DONVIHANHCHINH;
  const dataConfig = getLocalKey("data_config");

  useEffect(() => {
    dispatch(actions.getInit());
  }, []);

  const refreshList = () => {
    dispatch(
      actions.getList({
        ...filterData,
        DoiTuongTT: defaultDoiTuongTT,
        NamThanhTra: defaultNamThanhTra,
      })
    );
  };

  useEffect(() => {
    changeUrlFilter(filterData);
    refreshList();
  }, [filterData]);

  const onFilter = (value, property) => {
    //get filter data
    let oldFilterData = { ...filterData };
    let onFilter = { value, property };
    let newFilterData = getFilterData(oldFilterData, onFilter, null);
    setFilterData(newFilterData);
  };
  //order, paging --------------------------------------------

  const showModalInspectionDetail = (ID) => {
    api
      .DetailsInspection({ ID })
      .then((res) => {
        if (res.data.Status > 0) {
          setStateModalInspectionDetail({
            ...stateModalInspectionDetail,
            visible: true,
            data: res.data.Data,
            key: stateModalInspectionDetail.key + 1,
          });
        } else {
          message.destroy();
          message.error(res.data.Message);
        }
      })
      .catch((error) => {
        message.destroy();
        message.error(error.toString());
      });
  };

  const hideModalInspectionDetail = () => {
    setStateModalInspectionDetail({
      ...stateModalInspectionDetail,
      visible: false,
      key: stateModalInspectionDetail.key + 1,
    });
  };

  const dowloadInspection = async (DoiTuongTT = null) => {
    exportExcel(
      excelRef.current.innerHTML,
      "danh sách kế hoạch dự kiến thanh tra, kiểm tra",
      styleWrapper
    );
  };

  const PageNumber = filterData.PageNumber
    ? parseInt(filterData.PageNumber)
    : 1;

  const PageSize = filterData.PageSize
    ? parseInt(filterData.PageSize)
    : getDefaultPageSize();

  const removeCharacterSpecial = (text) => {
    if (text) {
      let result = text.replace(/^\d+ \* /, "");
      return result;
    }
  };

  const handleNameSplit = (text) => {
    if (text) {
      return text.split("|").map((item, index) => {
        const TrangThaiThucHien = item.slice(0, item.indexOf("*")).trim();
        const name =
          TrangThaiThucHien === "1"
            ? "Đã hủy"
            : TrangThaiThucHien === "2"
            ? "Đã chuyển"
            : "";
        return (
          <Tooltip
            title={name}
            overlayInnerStyle={{
              backgroundColor: "rgba(222, 240, 255, 1)",
              // color: "#000000",
              border: "1px solid rgba(76, 153, 227, 1)",
              borderRadius: "3px",
              minHeight: "16px",
              padding: "0 5px",
              color: TrangThaiThucHien === "2" ? "red" : "inherit",
            }}
            placement="right"
            arrow={false}
          >
            <span
              className="tax-tooltip"
              key={index}
              style={{
                marginBottom: "5px",
                textDecoration:
                  TrangThaiThucHien === "2" ? "line-through" : "none",
                textDecorationColor:
                  TrangThaiThucHien === "2" ? "red" : "inherit",
              }}
            >
              {item.includes("-") ? (
                <>
                  <strong>
                    {removeCharacterSpecial(item.split("-")[0].trim())}
                  </strong>
                  {" - " +
                    removeCharacterSpecial(
                      item.split("-").slice(1).join("-").trim()
                    )}
                </>
              ) : (
                item
              )}
              {index < text.split("|").length - 1 && <br />}
            </span>
          </Tooltip>
        );
      });
    }
  };

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
        return (
          <p style={{ textAlign: "center" }}>
            {(PageNumber - 1) * PageSize + (record.index + 1)}
          </p>
        );
      },
    },
    {
      title: "Đối tượng",
      dataIndex: "CoQuanBiThanhTra",
      key: "CoQuanBiThanhTra",
      width: "19%",
      render: (text, record) => {
        if (record.isParent) {
          return {
            props: {
              colSpan: 0,
            },
          };
        }

        return handleNameSplit(text);
      },
    },
    {
      title: "Nội dung",
      dataIndex: "NoiDung",
      key: "NoiDung",
      width: "22%",

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
      title: "Thời hạn thanh tra",
      dataIndex: "ThoiHanThanhTra",
      key: "ThoiHanThanhTra",
      width: "8%",
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
      title: "Thời gian triển khai thanh tra",
      dataIndex: "ThoiGianTienHanh",
      key: "ThoiGianTienHanh",
      width: "8%",
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
      align: "center",
      width: "180px",
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
      title: "Đơn vị chủ trì",
      dataIndex: "DonViChuTri",
      key: "DonViChuTri",
      width: "15%",
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
      title: "Đơn vị phối hợp",
      dataIndex: "DonViPhoiHop",
      key: "DonViPhoiHop",
      width: "15%",
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
      title: "Thao tác",
      key: "action",
      align: "center",
      width: "10%",

      render: (_, record) => {
        return (
          <Space
            size="middle"
            style={{ flexWrap: "wrap", justifyContent: "center" }}
          >
            <Tooltip title="Xem">
              <EyeIcon
                style={{ fontSize: 16 }}
                onClick={() =>
                  showModalInspectionDetail(record?.CuocThanhTraID)
                }
              />
            </Tooltip>
          </Space>
        );
      },
    },
  ];

  const formatDataRender = (ListLookup) => {
    const dataGroup = [...ListHinhThuc]
      .map((item, index) => {
        return {
          TenPhanLoaiThanhTra: `Danh sách các dự thảo ${item?.TenPhanLoaiThanhTra}`,
          idx: convertToRoman(index + 1),
          data: ListLookup
            ? ListLookup?.filter(
                (item2) => item2.PhanLoaiThanhTraID1 === item.PhanLoaiThanhTraID
              ).map((item3, index2) => {
                return {
                  ...item3,
                  index: index2,
                  isParent: false,
                  key: `child-${index}-${index2}`,
                };
              })
            : [],
        };
      })
      ?.filter((item) => item?.data?.length > 0);

    const restructuredData =
      dataGroup &&
      dataGroup.flatMap((group, index) => [
        { ...group, isParent: true, key: `parent-${index}` },
        ...group.data,
      ]);
    return restructuredData;
  };

  const newListLookup = formatDataRender(ListLookup);
  const newListLookupAll = formatDataRender(ListLookupAll);

  return (
    <LayoutWrapper>
      <PageHeader>
        <BreadCrumb />
        <div className="filter-right">
          <Button
            type="dowloadlist"
            icon={<CloudDownloadIcon />}
            loading={loadingDowload}
            onClick={() => dowloadInspection()}
          >
            Tải danh sách
          </Button>
        </div>
      </PageHeader>
      <PageAction className="filter-action">
        <div className="filter-left">
          <Select
            placeholder="Chọn năm"
            style={{ width: 100 }}
            onChange={(value) => onFilter(value, "NamThanhTra")}
            value={defaultNamThanhTra}
            allowClear={false}
          >
            {ListYear &&
              ListYear.map((item) => (
                <Option value={item.id}>{item.name}</Option>
              ))}
          </Select>

          <Select
            placeholder="Chọn cơ quan thanh tra"
            style={{ width: 300 }}
            onChange={(value) => onFilter(value, "CoQuanLapID")}
            value={
              filterData.CoQuanLapID ? Number(filterData.CoQuanLapID) : null
            }
            allowClear
          >
            {ListAgencyTw &&
              ListAgencyTw.map((item) => (
                <Option value={item.CoQuanID} key={item.CoQuanID}>
                  {item.TenCoQuan}
                </Option>
              ))}
          </Select>
          <Select
            placeholder="Hình thức"
            style={{ width: 200 }}
            onChange={(value) => onFilter(value, "HinhThucID")}
            value={filterData.HinhThucID ? Number(filterData.HinhThucID) : null}
            allowClear
          >
            {ListHinhThuc &&
              ListHinhThuc.map((item) => (
                <Option value={item.PhanLoaiThanhTraID}>
                  {item.TenPhanLoaiThanhTra}
                </Option>
              ))}
          </Select>
          <Search
            placeholder="Nhập đối tượng, nội dung để tìm kiếm"
            style={{ width: 300 }}
            onSearch={(value) => onFilter(value, "keyword")}
            defaultValue={filterData.Keyword}
            allowClear
          />
        </div>
      </PageAction>
      <Wrapper>
        <Box>
          <div className="info">
            {DataLookup.TongHanhChinh ? (
              <div className="info-item">
                <p className="info-name">Hành chính</p>
                <p className="info-circle">{DataLookup.TongHanhChinh}</p>
              </div>
            ) : null}
            {DataLookup.TongDoanhNghiep ? (
              <div className="info-item">
                <p className="info-name">Doanh nghiệp</p>
                <p className="info-circle">{DataLookup.TongDoanhNghiep}</p>
              </div>
            ) : null}
          </div>
          <Tabs
            activeKey={filterData?.DoiTuongTT}
            onChange={(value) => onFilter(value, "DoiTuongTT")}
          >
            <TabPane tab="Đơn vị hành chính, sự nghiệp" key="1">
              <BoxTable
                key="1"
                className="custom-expandable-table"
                columns={columns}
                dataSource={newListLookup}
                loading={TableLoading}
                expandable={{
                  // dataColumnName: "data",
                  defaultExpandAllRows: true,
                  expandIcon: ({ expanded, onExpand, record }) => false,
                  expandIconColumnIndex: -1,
                }}
                pagination={{
                  showSizeChanger: true,
                  showTotal: (total, range) =>
                    `Từ ${range[0]} đến ${range[1]} trên ${total} kết quả`,
                  total: TotalRow,
                  current: PageNumber,
                  pageSize: PageSize,
                }}
              />
            </TabPane>
            <TabPane tab="Doanh nghiệp" key="2">
              <BoxTable
                key="2"
                className="custom-expandable-table"
                columns={columns}
                dataSource={newListLookup}
                loading={TableLoading}
                expandable={{
                  // dataColumnName : 'data',
                  defaultExpandAllRows: true,
                  expandIcon: ({ expanded, onExpand, record }) => false,
                  expandIconColumnIndex: -1,
                }}
                pagination={{
                  showSizeChanger: true,
                  showTotal: (total, range) =>
                    `Từ ${range[0]} đến ${range[1]} trên ${total} kết quả`,
                  total: TotalRow,
                  current: PageNumber,
                  pageSize: PageSize,
                }}
              />
            </TabPane>
          </Tabs>
        </Box>
      </Wrapper>

      <TableExport
        data={newListLookupAll}
        excelRef={excelRef}
        DoiTuongTT={defaultDoiTuongTT}
        year={defaultNamThanhTra}
        onRemove={handleNameSplit}
      />

      <ModalInspectionDetail
        visible={stateModalInspectionDetail.visible}
        onCancel={hideModalInspectionDetail}
        loading={stateModalInspectionDetail.loading}
        data={stateModalInspectionDetail.data}
        key={stateModalInspectionDetail.key}
        dataEdit={stateModalInspectionDetail.data}
        ListHinhThuc={ListHinhThuc}
        ListFields={ListFields}
        DoiTuongTT={defaultDoiTuongTT}
        defaultNamThanhTra={defaultNamThanhTra}
      />
    </LayoutWrapper>
  );
};

export default PlanningScreen;
