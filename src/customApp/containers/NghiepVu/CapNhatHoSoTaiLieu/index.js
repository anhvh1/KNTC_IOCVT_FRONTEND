import React, { useState, useEffect } from "react";
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
  Radio,
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
import LayoutWrapper from "../../../../components/utility/layoutWrapper";
import PageHeader from "../../../../components/utility/pageHeader";
import PageAction from "../../../../components/utility/pageAction";
import Box from "../../../../components/utility/box";
import BoxFilter from "../../../../components/utility/boxFilter";
import BoxTable from "../../../../components/utility/boxTable";
import ModalCheck from "./ModalCheck";
import queryString from "query-string";
const { Content } = Layout;
const { Title } = Typography;
const { Search } = Input;
const { TabPane } = Tabs;
import api from "./config";
import { useDispatch, useSelector } from "react-redux";
import {
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
import actions from "../../../../customApp/redux/NghiepVu/ReportDocument/actions";
import Wrapper from "./index.styled";
import {
  getConfigValueByKey,
  getValueConfigLocalByKey,
} from "../../../../helpers/utility";
import axios from "axios";
import { apiUrl } from "./config";
import { convertToRoman } from "../../../../helpers/utility";
import { useModal } from "../../../../customApp/CustomHook/useModal";
import ModalInspectionDetail from "./ModalInspectionDetail";
import ModalImportPlan from "./ModalImportPlan";
import { DONVIHANHCHINH, DOANHNGHIEP } from "../../../../settings/constants";
import { useLocation } from "react-router-dom";
import { getListYear } from "../../../../helpers/utility";
import { formDataCaller } from "../../../../api/formDataCaller";
import EditIcon from "../../../../components/utility/EditIcon";
import { useRef } from "react";
import { saveAs } from "file-saver"; // Thêm import này
import * as XLSX from "xlsx"; // Thêm import này
import html2canvas from "html2canvas"; // Thêm import này
import { exportExcel } from "../../../../helpers/utility";
import { styleWrapper } from "./index.styled";
import TableExport from "./TableExport";
import BreadCrumb from "../Shared/Component/BreadCumb";
import { useGetApi } from "../../../CustomHook/useGetApi";
const PlanningScreen = (props) => {
  document.title = "Cập nhật hồ sơ, tài liệu";
  const {
    TotalRow,
    TableLoading,
    ListInspection,
    ListHinhThuc,
    ListTruongPhong,
    ListThanhVien,
  } = useSelector((state) => state.ReportDocument);

  const tableRef = useRef();
  const tableRef2 = useRef();
  const { role } = props;
  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search)
  );
  const [loadingDowload, setLoadingDowload] = useState(false);
  const [loading, setLoading] = useState(false);
  const [stateModalCheck, setStateModalCheck] = useState({
    visible: false,
    data: {},
    loading: false,
    key: 0,
  });
  const [stateModalImportPlan, setStateModalImportPlan] = useState({
    visible: false,
    data: {},
    loading: false,
    key: 0,
  });
  const [stateModalInspectionDetail, setStateModalInspectionDetail] = useState({
    visible: false,
    data: {},
    loading: false,
    key: 0,
  });
  const ListYear = getListYear();
  const ListFields = useGetApi(apiUrl.listfield);
  const dispatch = useDispatch();
  const defaultYear = ListYear ? ListYear[ListYear.length - 1].id : null;
  const defaultTypeKeHoach = filterData.TypeKeHoach
    ? filterData.TypeKeHoach
    : "0";
  const defaultNamThanhTra = filterData.NamThanhTra
    ? filterData.NamThanhTra
    : defaultYear;
  const defaultDoiTuongTT = filterData.DoiTuongTT
    ? filterData.DoiTuongTT
    : DONVIHANHCHINH;
  useEffect(() => {
    dispatch(actions.getInit());
  }, []);

  const refreshList = () => {
    dispatch(
      actions.getList({
        ...filterData,
        DoiTuongTT: defaultDoiTuongTT,
        NamThanhTra: defaultNamThanhTra,
        TypeKeHoach: defaultTypeKeHoach,
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

  const showModalCheck = (record) => {
    setStateModalCheck({
      ...stateModalCheck,
      visible: true,
      action: "check",
      data: { ...record },
      key: stateModalCheck.key + 1,
    });
  };

  const hideModalCheck = () => {
    setStateModalCheck({
      ...stateModalCheck,
      visible: false,

      data: {},
      action: null,
    });
  };

  const handleChangeStateInspection = (value) => {
    setStateModalCheck({
      ...stateModalCheck,
      ...value,
    });
  };

  const submitModalCheck = (value) => {
    handleChangeStateInspection({ loading: true });
    api
      .UpdateChongCheo(value)
      .then((response) => {
        handleChangeStateInspection({ loading: false });
        if (response.data.Status > 0) {
          message.destroy();
          message.success(response.data.Message);
          hideModalCheck();
          refreshList();
        } else {
          message.destroy();
          message.error(response.data.Message);
        }
      })
      .catch((error) => {
        handleChangeStateInspection({ loading: false });
        message.destroy();
        message.error(error.toString());
      });
  };

  const renderThaoTac = (record) => {
    return (
      <div className={"action-btn"}>
        <EditIcon onClick={() => showModalCheck(record)} />
      </div>
    );
  };

  const PageNumber = filterData.PageNumber
    ? parseInt(filterData.PageNumber)
    : 1;

  const PageSize = filterData.PageSize
    ? parseInt(filterData.PageSize)
    : getDefaultPageSize();

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
            {" "}
            {(PageNumber - 1) * PageSize + (index + 1)}
          </p>
        );
      },
    },
    {
      title: "Đối tượng thanh tra, kiểm tra",
      dataIndex: "CoQuanBiThanhTra",
      width: "20%",
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
      title: "Nội dung thanh tra, kiểm tra",
      dataIndex: "NoiDung",
      width: "20%",
      key: "NoiDung",
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
      width: "8%",
      key: "LinhVuc",
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
      title: "Lĩnh vực thanh tra",
      dataIndex: "LinhVucPhuIDs",
      key: "LinhVucPhuIDs",
      width: "12%",
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
      title: "Thời hạn thanh tra (ngày)",
      dataIndex: "ThoiHanThanhTra",
      width: "12%",
      key: "ThoiHanThanhTra",
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
      title: "Thời gian triển khai thanh tra",
      dataIndex: "ThoiGianTienHanh",
      key: "ThoiGianTienHanh",
      width: "12%",
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
    {
      title: "Thao tác",
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
        return renderThaoTac(record);
      },
    },
  ];

  return (
    <LayoutWrapper>
      <PageHeader>
        <BreadCrumb />
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
            placeholder="Hình thức"
            style={{ width: 200 }}
            onChange={(value) => onFilter(value, "PhanLoaiThanhTraID1")}
            value={
              filterData.PhanLoaiThanhTraID1
                ? Number(filterData.PhanLoaiThanhTraID1)
                : null
            }
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
          <Radio.Group
            onChange={(e) => onFilter(e.target.value, "TypeKeHoach")}
            value={defaultTypeKeHoach}
            style={{ marginLeft: 50 }}
          >
            <Radio value={"0"}>Theo kế hoạch</Radio>
            <Radio value={"2"}>Đột xuất</Radio>
          </Radio.Group>
        </div>
      </PageAction>
      <Wrapper>
        <Box>
          <Tabs
            activeKey={String(defaultDoiTuongTT)}
            onChange={(value) => onFilter(value, "DoiTuongTT")}
          >
            <TabPane tab="Đơn vị hành chính, sự nghiệp" key="1"></TabPane>
            <TabPane tab="Doanh nghiệp" key="2"></TabPane>
          </Tabs>
          <div>
            <BoxTable
              className="custom-expandable-table"
              columns={columns}
              dataSource={ListInspection}
              expandable={{
                // childrenColumnName : 'children',
                defaultExpandAllRows: true,
                expandIcon: ({ expanded, onExpand, record }) => false,
                expandIconColumnIndex: -1,
              }}
              pagination={false}
            />
          </div>
        </Box>
      </Wrapper>

      <ModalCheck
        visible={stateModalCheck.visible}
        onCancel={hideModalCheck}
        loading={stateModalCheck.loading}
        key={stateModalCheck.key}
        ListHinhThuc={ListHinhThuc}
        onCreate={submitModalCheck}
        dataEdit={stateModalCheck.data}
        action={stateModalCheck.action}
        ListYear={ListYear}
        ListTruongPhong={ListTruongPhong}
        ListThanhVien={ListThanhVien}
      />
    </LayoutWrapper>
  );
};

export default PlanningScreen;
