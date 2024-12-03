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
  Modal as ModalAntd,
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
import LayoutWrapper from "../../../../components/utility/layoutWrapper";
import PageHeader from "../../../../components/utility/pageHeader";
import PageAction from "../../../../components/utility/pageAction";
import Box from "../../../../components/utility/box";
import BoxFilter from "../../../../components/utility/boxFilter";
import BoxTable from "../../../../components/utility/boxTable";
import CloudDownloadIcon from "../../../../components/utility/CloudDownloadIcon";
import PenIcon from "../../../../components/utility/PenIcon";

import PencilIcon from "../../../../components/utility/PencilIcon";
import CheckSuccessIcon from "../../../../components/utility/CheckSuccessIcon";
import ModalCheck from "./ModalCheck";
import queryString from "query-string";
const { Content } = Layout;
const { Title } = Typography;
const { Search } = Input;
const { TabPane } = Tabs;
import api from "./config";
import { useDispatch, useSelector } from "react-redux";
import { formatNoiDung, getDefaultPageSize } from "../../../../helpers/utility";
import {
  changeUrlFilter,
  getConfigLocal,
  getFilterData,
  getRoleByKey,
} from "../../../../helpers/utility";
import dayjs from "dayjs";
import actions from "../../../../customApp/redux/NghiepVu/SyntheticPlan/actions";
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
import {
  DONVIHANHCHINH,
  DOANHNGHIEP,
  STATENGHIEPVU,
} from "../../../../settings/constants";
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
import ModalComplete from "./ModalComplete";
import EyeIcon from "../../../../components/utility/EyeIcon";
import FlyIcon from "../../../../components/utility/FlyIcon";
import BreadCrumb from "../Shared/Component/BreadCumb";
import { useKey } from "../../../CustomHook/useKey";
const PlanningScreen = (props) => {
  document.title = "Tổng hợp rà soát chồng chéo kế hoạch";
  const {
    TotalRow,
    TableLoading,
    ListSyntheticPlan,
    ListSyntheticPlanAll,
    ListHinhThuc,
    ListFields,
    InfoSyntheticPlan,
  } = useSelector((state) => state.SyntheticPlan);
  const tableRef = useRef();
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
  const [stateModalComplete, setStateModalComplete] = useState({
    visible: false,
    data: {},
    loading: false,
    key: 0,
  });
  const [tableExcelKey, increseKeyExcel] = useKey();
  const ListYear = getListYear();
  const [ListAgency, setListAgency] = useState([]);
  const dispatch = useDispatch();
  const defaultYear = ListYear ? ListYear[ListYear.length - 1].id : null;
  const defaultNamThanhTra = filterData.NamThanhTra
    ? filterData.NamThanhTra
    : defaultYear;
  const defaultDoiTuongTT = filterData?.DoiTuongTT
    ? Number(filterData?.DoiTuongTT)
    : DONVIHANHCHINH;

  const getListAgency = () => {
    api
      .GetListAgency({
        PhanLoai: defaultDoiTuongTT,
      })
      .then((res) => {
        if (res.data.Status > 0) {
          setListAgency(res.data.Data);
        }
      });
  };

  useEffect(() => {
    dispatch(
      actions.getInit({
        ...filterData,
        DoiTuongTT: defaultDoiTuongTT,
        NamThanhTra: defaultNamThanhTra,
      })
    );
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
    getListAgency();
  }, [filterData]);

  const onFilter = (value, property) => {
    //get filter data
    let oldFilterData = { ...filterData };
    let onFilter = { value, property };
    let newFilterData = getFilterData(oldFilterData, onFilter, null);
    setFilterData(newFilterData);
  };

  const showModalCheck = (action = "check") => {
    setStateModalCheck({
      ...stateModalCheck,
      visible: true,
      action: action,
      data: {
        isView: true,
      },
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

  const dowloadInspection = async () => {
    setLoadingDowload(true);
    try {
      exportExcel(
        tableRef.current.innerHTML,
        "Tổng hợp rà soát chồng chéo kế hoạch",
        styleWrapper
      );
      setLoadingDowload(false);
    } catch (error) {
      setLoadingDowload(false);
      message.destroy();
      message.error(error.toString());
    }
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
          // hideModalCheck();
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

  const completeHandlePlan = () => {
    ModalAntd.confirm({
      title: "Hoàn tất xử lý chồng chéo",
      content: `Bạn có chắc chắn muốn hoàn tất xử lý chồng chéo của năm ${defaultNamThanhTra} không?`,
      onOk: () => {
        api.CompletePlan({ NamThanhTra: defaultNamThanhTra }).then((res) => {
          if (res.data.Status > 0) {
            dispatch(
              actions.getList({
                ...filterData,
                DoiTuongTT: defaultDoiTuongTT,
                NamThanhTra: defaultNamThanhTra,
              })
            );
            message.destroy();
            message.success(res.data.Message);
          } else {
            message.destroy();
            message.warning(res.data.Message);
          }
        });
      },
    });
  };

  const removeCharacterSpecial = (text) => {
    if (text) {
      let result = text.replace(/^\d+ \* /, "");
      return result;
    }
  };

  const handleRenderNameSplit = (text) => {
    if (text) {
      return text.split("|").map((item, index) => {
        const TrangThaiThucHien = item.slice(0, item.indexOf("*")).trim();
        const name =
          TrangThaiThucHien === "1"
            ? "Được thực hiện"
            : TrangThaiThucHien === "2"
            ? "Không được thực hiện"
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

  const showModalViewResultPlan = () => {
    // api.GetViewResult({ ...filterData }).then((res) => {
    // });
    setStateModalCheck({
      ...stateModalCheck,
      visible: true,
      action: "view",
      key: stateModalCheck.key + 1,
    });
  };

  const showModalComplete = () => {
    setStateModalComplete({
      ...stateModalComplete,
      visible: true,
    });
  };

  const hideModalComplete = () => {
    setStateModalComplete({
      ...stateModalComplete,
      visible: false,
    });
  };

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: "5%",
      align: "left",
      render: (text, record, index) => {
        if (record.Cap !== 4) {
          return {
            children: (
              <p
                style={{
                  fontWeight: "bold",
                  marginLeft: "10px",
                  fontSize: "15px",
                }}
              >
                {record.STT}. {record.TenCoQuan}
              </p>
            ),
            props: {
              colSpan: columns.length,
              style: {
                backgroundColor:
                  record.Cap <= 2 ? "#f0f0f0" : record.Cap === 3 ? "#fff" : "",
              },
            },
          };
        }
        return <p style={{ textAlign: "center" }}>{record.STT}</p>;
      },
    },
    {
      title: "Đối tượng thanh tra, kiểm tra",
      dataIndex: "TenCoQuan",
      key: "TenCoQuan",
      width: "18%",
      render: (text, record) => {
        if (record.Cap !== 4) {
          return {
            props: {
              colSpan: 0,
            },
          };
        }
        return handleRenderNameSplit(text);
      },
    },
    {
      title: "Nội dung thanh tra, kiểm tra",
      dataIndex: "NoiDung",
      key: "NoiDung",
      width: "30%",
      render: (text, record) => {
        if (record.Cap !== 4) {
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
      render: (text, record) => {
        if (record.Cap !== 4) {
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
      title: "Thời hạn thanh tra (ngày)",
      dataIndex: "ThoiHanThanhTra",
      key: "ThoiHanThanhTra",
      width: "10%",
      render: (text, record) => {
        if (record.Cap !== 4) {
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
      width: "10%",
      render: (text, record) => {
        if (record.Cap !== 4) {
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
      title: "Đơn vị chủ trì",
      dataIndex: "DonViChuTri",
      key: "DonViChuTri",
      align: "center",
      width: "15%",
      render: (text, record) => {
        if (record.Cap !== 4) {
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
      title: "Đơn vị phối hợp",
      dataIndex: "DonViPhoiHop",
      key: "DonViPhoiHop",
      width: "14%",
      render: (text, record) => {
        if (record.Cap !== 4) {
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
      title: "Ghi chú",
      dataIndex: "GhiChu",
      key: "GhiChu",
      width: "10%",
      render: (text, record) => {
        if (record.Cap !== 4) {
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

  const checkAction = InfoSyntheticPlan?.StateID
    ? InfoSyntheticPlan?.StateID !== STATENGHIEPVU.DaChuyenTongHop
    : true;

  return (
    <LayoutWrapper>
      <PageHeader>
        <BreadCrumb />
        <div className="filter-right">
          <Button
            type="add"
            icon={<PencilIcon />}
            onClick={() => showModalCheck()}
            disabled={checkAction}
          >
            Kiểm tra, xử lý chồng chéo
          </Button>

          <Button
            type="checked"
            icon={<CheckSuccessIcon />}
            onClick={completeHandlePlan}
            disabled={checkAction}
          >
            Hoàn tất xử lý chồng chéo
          </Button>
          <Button
            type="add"
            icon={<CloudDownloadIcon />}
            loading={loadingDowload}
            onClick={() => dowloadInspection()}
            disabled={!ListSyntheticPlanAll?.length}
          >
            Tải dự thảo kế hoạch
          </Button>
          <Button
            type="secondary"
            icon={<EyeOutlined />}
            onClick={() => showModalCheck()}
          >
            Xem xử lý chồng chéo
          </Button>
          <Button
            type="dowloadlist"
            icon={<EyeIcon fill="#fff" />}
            loading={loading}
            onClick={() => showModalCheck("showresult")}

            // onClick={showModalViewResultPlan}
          >
            Tải kế hoạch sau xử lý chồng chéo
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
            placeholder="Đơn vị chủ trì"
            style={{ width: 200 }}
            onChange={(value) => onFilter(value, "CoQuanLapID")}
            value={
              filterData.CoQuanLapID ? Number(filterData.CoQuanLapID) : null
            }
            allowClear
          >
            {ListAgency &&
              ListAgency.map((item) => (
                <Option value={item.CoQuanID}>{item.TenCoQuan}</Option>
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

          <Select
            placeholder="Trạng thái thực hiện"
            style={{ width: 200 }}
            onChange={(value) => onFilter(value, "FilterType")}
            value={filterData.FilterType ? filterData.FilterType : null}
            allowClear
          >
            <Option value="0">Tất cả</Option>
            <Option value="1">Được thực hiện</Option>
            <Option value="2">Không được thực hiện</Option>
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
          <Tabs
            activeKey={defaultDoiTuongTT ? String(defaultDoiTuongTT) : "1"}
            onChange={(value) => {
              onFilter(value, "DoiTuongTT");
              increseKeyExcel();
            }}
          >
            <TabPane tab="Đơn vị hành chính, sự nghiệp" key="1"></TabPane>
            <TabPane tab="Doanh nghiệp" key="2"></TabPane>
          </Tabs>
          <div>
            <BoxTable
              className="custom-expandable-table"
              columns={columns}
              dataSource={ListSyntheticPlan}
              expandable={{
                defaultExpandAllRows: true,
                expandIcon: ({ expanded, onExpand, record }) => false,
                expandIconColumnIndex: -1,
              }}
              pagination={false}
            />
          </div>
        </Box>
      </Wrapper>

      <TableExport
        data={[...ListSyntheticPlanAll]}
        excelRef={tableRef}
        year={defaultNamThanhTra}
        DoiTuongTT={defaultDoiTuongTT}
        onRemove={handleRenderNameSplit}
        ListFields={ListFields}
      />
      <ModalCheck
        visible={stateModalCheck.visible}
        onCancel={hideModalCheck}
        loading={stateModalCheck.loading}
        ListAgency={ListAgency}
        key={stateModalCheck.key}
        ListHinhThuc={ListHinhThuc}
        onCreate={submitModalCheck}
        dataEdit={stateModalCheck.data}
        action={stateModalCheck.action}
        ListYear={ListYear}
        onSplit={handleRenderNameSplit}
      />
      <ModalComplete
        visible={stateModalComplete.visible}
        onCancel={hideModalComplete}
        loading={stateModalComplete.loading}
        onCreate={completeHandlePlan}
      />
    </LayoutWrapper>
  );
};

export default PlanningScreen;
