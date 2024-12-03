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
import actions from "../../../../customApp/redux/NghiepVu/CapNhatSoLieu/actions";
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
  TYPEKEHOACH,
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
import CloudDownloadIcon from "../../../../components/utility/CloudDownloadIcon";
import BreadCrumb from "../Shared/Component/BreadCumb";
import { useGetApi } from "../../../CustomHook/useGetApi";
const CapNhatSoLieu = (props) => {
  document.title = "Cập nhật số liệu sau TTKT";
  const { TotalRow, TableLoading, ListSyntheticPlan } = useSelector(
    (state) => state.CapNhatSoLieu
  );

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
  const ListFields = useGetApi(apiUrl.listfield);
  const ListYear = getListYear();
  const [ListAgency, setListAgency] = useState([]);
  const dispatch = useDispatch();
  const defaultYear = ListYear ? ListYear[ListYear.length - 1].id : null;
  const defaultTypeKeHoach = filterData?.TypeKeHoach
    ? Number(filterData?.TypeKeHoach)
    : TYPEKEHOACH;
  const defaultDoiTuongTT = filterData?.DoiTuongTT
    ? Number(filterData?.DoiTuongTT)
    : DONVIHANHCHINH;
  useEffect(() => {
    fetchData();
  }, []);
  const [ListHinhThuc, setListHinhThuc] = useState([]);

  const fetchData = async () => {
    try {
      const res = await api.GetListForm(/* Tham số */);
      if (res.data.Status > 0) {
        setListHinhThuc(res.data.Data);
      }
    } catch (error) {
      console.error("Lỗi khi lấy danh sách cấp xếp hạng:", error);
    }
  };
  const dataGroup = [...ListHinhThuc]
    .map((item, index) => {
      return {
        TenPhanLoaiThanhTra: `Danh sách các cuộc ${item?.TenPhanLoaiThanhTra}`,
        idx: convertToRoman(index + 1),
        data: ListSyntheticPlan
          ? ListSyntheticPlan?.filter(
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
  const getListAgency = () => {
    api
      .GetListAgency({
        PhanLoai: filterData.DoiTuongTT
          ? Number(filterData.DoiTuongTT)
          : DONVIHANHCHINH,
      })
      .then((res) => {
        if (res.data.Status > 0) {
          setListAgency(res.data.Data);
        }
      });
  };
  // useEffect(() => {
  //   dispatch(actions.getList());
  //   const currentYear = dayjs().year();
  //   setFilterData({ NamThanhTra: currentYear, DoiTuongTT: 1, TypeKeHoach: 0 });
  // }, []);

  const refreshList = () => {
    dispatch(
      actions.getList({
        ...filterData,
        DoiTuongTT: filterData?.DoiTuongTT
          ? Number(filterData?.DoiTuongTT)
          : DONVIHANHCHINH,
        NamThanhTra: filterData.NamThanhTra
          ? filterData.NamThanhTra
          : defaultYear,
        TypeKeHoach: filterData?.TypeKeHoach
          ? Number(filterData?.TypeKeHoach)
          : TYPEKEHOACH,
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

  const showModalCheck = (CuocThanhTraID) => {
    setStateModalCheck({
      ...stateModalCheck,
      visible: true,
      action: "check",
      key: stateModalCheck.key + 1,
      CuocThanhTraID: CuocThanhTraID,
    });
  };

  const hideModalCheck = () => {
    setStateModalCheck({
      ...stateModalCheck,
      visible: false,

      data: {},
      action: null,
    });
    refreshList();
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
        "Cập nhật số liệu sau TTKT.xlsx",
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

  const completeHandlePlan = () => {
    api.CompletePlan({ NamThanhTra: filterData.NamThanhTra }).then((res) => {
      if (res.data.Status > 0) {
        message.destroy();
        message.success(res.data.Message);
      } else {
        message.destroy();
        message.warning(res.data.Message);
      }
    });
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
        return <p>{index + 1}</p>;
      },
    },
    {
      title: "Đối tượng thanh tra, kiểm tra",
      dataIndex: "CoQuanBiThanhTra",
      width: "23%",
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
      width: "23%",
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
      key: "LinhVuc",
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
      title: "Đơn vị chủ trì",
      dataIndex: "DonViChuTri",
      key: "DonViChuTri",
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
      title: "Trạng thái",
      dataIndex: "TenTrangThai",
      key: "TenTrangThai",
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
      title: "Thao tác",
      width: "5%",
      align: "center",
      render: (text, record) => renderThaoTac(record),
    },
  ];

  const renderThaoTac = (record) => {
    return (
      <div className={"action-btn"}>
        {/* {role && role.edit && ( */}
        <Tooltip title={"Sửa"}>
          <EditIcon onClick={() => showModalCheck(record.CuocThanhTraID)} />
        </Tooltip>
        {/* )} */}
      </div>
    );
  };
  const handleClick = (id) => {
    setSelected(id);
  };
  const [selected, setSelected] = useState(defaultDoiTuongTT);
  const [DoiTuongTTDotXuat, setDoiTuongTTDotXuat] = useState(1);
  const [TypeKeHoach, setTypeKeHoach] = useState(0);
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
            value={
              filterData.NamThanhTra ? filterData.NamThanhTra : defaultYear
            }
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
            style={{ marginLeft: "50px", marginTop: "5px" }}
            defaultValue={defaultTypeKeHoach === 0 ? "kehoach" : "dotxuat"} // Updated to use defaultTypeKeHoach
            onChange={(e) => {
              const value = e.target.value;
              setTypeKeHoach(value);
              onFilter(value === "kehoach" ? 0 : 2, "TypeKeHoach");
            }}
          >
            <Radio
              value="kehoach"
              style={{ marginRight: "10px", fontSize: "16px" }}
            >
              Theo kế hoạch
            </Radio>
            <Radio value="dotxuat" style={{ fontSize: "16px" }}>
              Đột xuất
            </Radio>
          </Radio.Group>
        </div>
        <div className="filter-right">
          {/* <Button
            type="primary"
            icon={<EditIcon />}
            // onClick={showModalCheck}
          >
            Thêm
          </Button>
          <Button
            type="primary"
            icon={<CloudDownloadIcon />}
            loading={loadingDowload}
            onClick={() => dowloadInspection()}
          >
            Tải danh sách
          </Button> */}
        </div>
      </PageAction>
      <Wrapper>
        <Box>
          <div
            style={{
              fontFamily: "Roboto",
              fontSize: "18px",
              fontWeight: 400,
              lineHeight: "18.75px",
              textAlign: "left",
            }}
            className="info"
          >
            Danh sách thành viên được phân công Cập nhật số liệu sau TTKT
          </div>
          <div style={{ marginTop: "10px" }}>
            {/* <div
              style={{
                display: "flex",
                position: "relative",
                marginBottom: "-15px",
                backgroundColor: "#fff",
                zIndex: 0,
              }}
            >
              <div
                onClick={() => {
                  handleClick(1);
                  onFilter(1, "DoiTuongTT");
                  setDoiTuongTTDotXuat(1);
                }}
                style={{
                  border: "1px solid",
                  borderColor: selected === 1 ? "#216FCA" : "#E5E5E5",
                  padding: "15px 0px 30px 0px",
                  textAlign: "center",
                  width: "210px",
                  borderRadius: "15px",
                  backgroundColor:
                    selected === 1 ? "#F4F6F9" : "transparent",
                  fontWeight: selected === 1 ? 500 : 400,
                  cursor: "pointer",
                  transition: "background-color 0.3s, border-color 0.3s",
                  color: selected === 1 ? "#1677ff" : "#000000",
                }}
              >
                Đơn vị hành chính
              </div>
              <div
                onClick={() => {
                  handleClick(2);
                  onFilter(2, "DoiTuongTT");
                  setDoiTuongTTDotXuat(2);
                }}
                style={{
                  border: "1px solid",
                  borderColor: selected === 2 ? "#216FCA" : "#E5E5E5",
                  padding: "15px 0px 30px 0px",
                  textAlign: "center",
                  width: "210px",
                  borderRadius: "15px",
                  backgroundColor:
                    selected === 2 ? "#F4F6F9" : "transparent",
                  cursor: "pointer",
                  transition: "background-color 0.3s, border-color 0.3s",
                  color: selected === 2 ? "#1677ff" : "#000000",
                  fontWeight: selected === 2 ? 500 : 400,
                }}
              >
                Doanh Nghiệp
              </div>
            </div> */}
            <div style={{ display: "flex" }}>
              <div
                onClick={() => {
                  handleClick(1);
                  onFilter(1, "DoiTuongTT");
                }}
                style={{
                  border: "1px solid",
                  borderColor: selected === 1 ? "rgb(33, 111, 202)" : "#E5E5E5",
                  padding: "10px 0px 10px 0px",
                  textAlign: "center",
                  width: "230px",
                  fontSize: "16px",
                  borderTopLeftRadius: "5px",
                  borderTopRightRadius: "5px",
                  backgroundColor:
                    selected === 1 ? "rgb(33, 111, 202)" : "transparent",
                  fontWeight: selected === 1 ? 500 : 400,
                  cursor: "pointer",
                  transition: "background-color 0.3s, border-color 0.3s",
                  color: selected === 1 ? "white" : "#000000",
                }}
              >
                Đơn vị hành chính, sự nghiệp
              </div>
              <div
                onClick={() => {
                  handleClick(2);
                  onFilter(2, "DoiTuongTT");
                }}
                style={{
                  border: "1px solid",
                  borderColor: selected === 2 ? "rgb(33, 111, 202)" : "#E5E5E5",
                  padding: "10px 0px 10px 0px",
                  textAlign: "center",
                  width: "230px",
                  fontSize: "16px",
                  borderTopLeftRadius: "5px",
                  borderTopRightRadius: "5px",
                  backgroundColor:
                    selected === 2 ? "rgb(33, 111, 202)" : "transparent",
                  cursor: "pointer",
                  transition: "background-color 0.3s, border-color 0.3s",
                  color: selected === 2 ? "white" : "#000000",
                  fontWeight: selected === 2 ? 500 : 400,
                }}
              >
                Doanh Nghiệp
              </div>
            </div>
            <BoxTable
              columns={columns}
              dataSource={restructuredData}
              loading={props.TableLoading}
              onChange={onFilter}
              pagination={false}
            />
          </div>
        </Box>
      </Wrapper>
      <TableExport data={ListSyntheticPlan} excelRef={tableRef} />
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
        CuocThanhTraID={stateModalCheck.CuocThanhTraID}
        ListYear={ListYear}
      />
    </LayoutWrapper>
  );
};

export default CapNhatSoLieu;
