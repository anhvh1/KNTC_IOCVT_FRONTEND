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
import ModalAddInspection from "./ModalAddInspection";
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
import actions from "../../../../customApp/redux/NghiepVu/Inspection/actions";
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
import ModalViewImport from "./ModalViewImport";
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
    ListInspection,
    ListHinhThuc,
    ListFields,
    ListAgencyTw,
    InfoPlan,
    ListInspectionAll,
  } = useSelector((state) => state.Inspection);
  const { role } = props;
  const location = useLocation();
  const route = location.pathname.split("/")[2];
  const isTTTrungUong = route === "lap-ke-hoach-thanh-tra" ? false : true;
  const title = isTTTrungUong
    ? "Quản lý kế hoạch Thanh tra của cơ quan Trung Ương"
    : "Lập kế hoạch dự kiến thanh tra, kiểm tra";
  document.title = title;
  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search)
  );
  const [loadingDowload, setLoadingDowload] = useState(false);
  const [loadingDownloadDoiTuongTT, setLoadingDownloadDoiTuongTT] =
    useState(false);
  const [ListFileDinhKem, setListFileDinhKem] = useState([]);
  const [loading, setLoading] = useState(false);
  const excelRef = useRef();
  const [stateModalAddInspection, setStateModalAddInspection] = useState({
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
  const [stateModalViewImport, setStateModalViewImport] = useState({
    visible: false,
    data: {},
    loading: false,
    key: 0,
  });
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
  const SONGAYSAURS = dataConfig ? dataConfig.SONGAYSAURS : 0;
  const NgayRaSoat = InfoPlan ? InfoPlan.NgayRaSoat : null;
  console.log(InfoPlan, "InfoPlan");
  const currentDate = dayjs();

  // Calculate the date by adding SONGAYSAURS to NgayRaSoat
  const comparisonDate = NgayRaSoat
    ? dayjs(NgayRaSoat).add(SONGAYSAURS, "day")
    : null;

  // Check if the current date is greater
  const isCurrentDateGreater = comparisonDate
    ? currentDate.isAfter(comparisonDate)
    : false;

  useEffect(() => {
    dispatch(actions.getInit({ isTTTrungUong }));
  }, []);

  const refreshList = () => {
    dispatch(
      actions.getList({
        ...filterData,
        DoiTuongTT: defaultDoiTuongTT,
        NamThanhTra: defaultNamThanhTra,
        isTTTrungUong,
      })
    );
  };

  useEffect(() => {
    changeUrlFilter(filterData);
    refreshList();
  }, [filterData]);

  const hideModalInspectionDetail = () => {
    setStateModalInspectionDetail({
      ...stateModalInspectionDetail,
      visible: false,
      key: stateModalInspectionDetail.key + 1,
    });
  };

  const onFilter = (value, property) => {
    //get filter data
    let oldFilterData = { ...filterData };
    let onFilter = { value, property };
    let newFilterData = getFilterData(oldFilterData, onFilter, null);
    setFilterData(newFilterData);
  };
  //order, paging --------------------------------------------
  const onTableChange = (pagination, filters, sorter) => {
    //get filter data
    let oldFilterData = { ...filterData };
    let onOrder = { pagination, filters, sorter };
    let newFilterData = getFilterData(oldFilterData, null, onOrder);
    //get filter data
    setFilterData(newFilterData);
  };

  const showModalImportPlan = () => {
    setStateModalImportPlan({
      ...stateModalImportPlan,
      visible: true,
      key: stateModalImportPlan.key + 1,
    });
  };

  const hideModalImportPlan = () => {
    setStateModalImportPlan({
      ...stateModalImportPlan,
      visible: false,
      loading: false,
    });
  };

  const showModalAddInspection = (
    LaBoSung = false,
    LaQuanLyKeHoachTrungUong = false
  ) => {
    setStateModalAddInspection({
      ...stateModalAddInspection,
      data: { LaBoSung, LaQuanLyKeHoachTrungUong },
      visible: true,
      action: "add",
      key: stateModalAddInspection.key + 1,
    });
  };

  const submitModalImportPlan = (formData, values) => {
    setStateModalImportPlan({ ...stateModalImportPlan, loading: true });
    formDataCaller(
      isTTTrungUong ? apiUrl.importfiletw : apiUrl.importfile,
      formData,
      { ...values }
    )
      .then((res) => {
        if (res.data.Status > 0) {
          message.success(res.data.Message);
          hideModalImportPlan();
          refreshList();
          showModalViewImport({
            ...res.data.Data,
            FileContentBase64: res?.data?.FileContentBase64,
            FileName: res?.data?.FileName,
          });
        } else {
          setStateModalImportPlan({ ...stateModalImportPlan, loading: false });
          message.destroy();
          message.error(res.data.Message);
        }
      })
      .catch((err) => {
        message.destroy();
        message.warning(err.toString());
      });
  };

  const hideModalAddInspection = () => {
    setStateModalAddInspection({
      ...stateModalAddInspection,
      visible: false,

      data: {},
      action: null,
    });
  };

  const handleDeleteInspection = (ID, LaBoSung = false) => {
    Modal.confirm({
      title: "Xóa Dữ Liệu",
      content: "Bạn có muốn xóa kế hoạch này không?",
      cancelText: "Không",
      okText: "Có",
      onOk: () => {
        api
          .DeleteInspection({ ListID: [ID], LaBoSung })
          .then((res) => {
            if (res.data.Status > 0) {
              refreshList();
              message.destroy();
              message.success(res.data.Message);
            } else {
              message.destroy();
              message.error(res.data.Message);
            }
          })
          .catch((error) => {
            message.destroy();
            message.error(error.toString());
          });
      },
    });
  };

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

  const showModalEditInspection = (ID) => {
    api
      .DetailsInspection({ ID })
      .then((res) => {
        if (res.data.Status > 0) {
          setStateModalAddInspection({
            ...stateModalAddInspection,
            visible: true,
            data: res.data.Data,
            key: stateModalAddInspection.key + 1,
            action: "edit",
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

  const handleChangeStateInspection = (value) => {
    setStateModalAddInspection({
      ...stateModalAddInspection,
      ...value,
    });
  };

  const showModalViewImport = (data) => {
    setStateModalViewImport({
      data: data,
      visible: true,
      key: stateModalViewImport.key + 1,
    });
  };

  const hideModalViewImport = () => {
    setStateModalViewImport({
      data: {},
      visible: false,
    });
  };

  const dowloadInspection = async (DoiTuongTT = null) => {
    exportExcel(
      excelRef.current.innerHTML,
      "danh sách kế hoạch dự kiến thanh tra, kiểm tra",
      styleWrapper
    );
    // setLoadingDowload(true);
    // try {
    //   const access_token = localStorage.getItem("access_token");
    //   const response = await axios.get(apiUrl.exportlistinspection, {
    //     responseType: "blob", // Important: responseType as blob
    //     headers: {
    //       Authorization: `Bearer ${access_token}`,
    //     },
    //     params: {
    //       DoiTuongTT: DoiTuongTT ? DoiTuongTT : defaultDoiTuongTT,
    //     },
    //   });
    //   if (response.status === 200) {
    //     const blob = new Blob([response.data], {
    //       type: response.headers["content-type"],
    //     });
    //     saveAs(blob, "Danh sách kế hoạch.xlsx");
    //     setLoadingDowload(false);
    //   } else {
    //     message.destroy();
    //     message.error("Có lỗi khi tải file");
    //   }
    // } catch (error) {
    //   setLoadingDowload(false);
    //   message.destroy();
    //   message.error(error.toString());
    // }
  };

  const dowloadListDoiTuongTT = async (DoiTuongTT = null) => {
    setLoadingDownloadDoiTuongTT(true);
    try {
      const access_token = localStorage.getItem("access_token");
      const response = await axios.get(apiUrl.exportlistdoituongttt, {
        responseType: "blob", // Important: responseType as blob
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        params: {
          DoiTuongTT: DoiTuongTT ? DoiTuongTT : defaultDoiTuongTT,
        },
      });
      if (response.status === 200) {
        const blob = new Blob([response.data], {
          type: response.headers["content-type"],
        });
        saveAs(blob, "Danh sách đối tượng thanh tra.xlsx");
        setLoadingDownloadDoiTuongTT(false);
      } else {
        message.destroy();
        message.error("Có lỗi khi tải file");
      }
    } catch (error) {
      setLoadingDownloadDoiTuongTT(false);
      message.destroy();
      message.error(error.toString());
    }
  };

  const dowloadFileImport = async (DoiTuongTT = null) => {
    setLoadingDowload(true);
    try {
      const access_token = localStorage.getItem("access_token");
      const response = await axios.get(apiUrl.exportlistinspection, {
        responseType: "blob", // Important: responseType as blob
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
        params: {
          DoiTuongTT: DoiTuongTT ? DoiTuongTT : defaultDoiTuongTT,
        },
      });
      if (response.status === 200) {
        const blob = new Blob([response.data], {
          type: response.headers["content-type"],
        });
        if (DoiTuongTT === 1) {
          saveAs(blob, "Mẫu kế hoạch TTKT đơn vị hành chính, sự nghiệp.xlsm");
        } else {
          saveAs(blob, "Mẫu kế hoạch TTKT doanh nghiệp.xlsm");
        }

        setLoadingDowload(false);
      } else {
        message.destroy();
        message.error("Có lỗi khi tải file");
      }
    } catch (error) {
      setLoadingDowload(false);
      message.destroy();
      message.error(error.toString());
    }
  };

  const genDataFileDinhKem = (base64, file, listFile) => {
    const newListFileDinhKem = [...listFile];
    setListFileDinhKem(newListFileDinhKem);
  };

  const beforeUploadFile = (file, callback, listFile) => {
    const FileLimit = getValueConfigLocalByKey("data_config")?.fileLimit;
    const isLt2M = file.size / 1024 / 1024 < FileLimit;
    const ListFileExist = [];
    listFile?.forEach((file) => {
      const ExistFile = ListFileDinhKem.filter(
        (item) => item.TenFileGoc === file.name
      );
      if (ExistFile.length) {
        ListFileExist.push(file);
      }
    });
    if (!isLt2M) {
      message.error(`File đính kèm phải nhỏ hơn ${FileLimit}MB`);
    } else {
      getBase64(file, callback, listFile);
    }
    // }
    return false;
  };

  const handleSendPlan = () => {
    Modal.confirm({
      title: "Gửi kế hoạch",
      content: `Bạn có chắc chắn muốn gửi kế hoạch năm ${defaultNamThanhTra} này không?`,
      cancelText: "Không",
      okText: "Có",
      onOk: () => {
        const NamThanhTra = defaultNamThanhTra;
        if (NamThanhTra) {
          api.SubmitPlan(NamThanhTra).then((res) => {
            if (res.data.Status > 0) {
              refreshList();
              message.destroy();
              message.success(res.data.Message);
            } else {
              message.destroy();
              message.error(res.data.Message);
            }
          });
        } else {
          message.destroy();
          message.warning("Vui lòng chọn năm thanh tra");
        }
      },
    });
  };

  const submitModalAddInspection = (value) => {
    const { action } = stateModalAddInspection;
    handleChangeStateInspection({ loading: true });
    value.DoiTuongTT = defaultDoiTuongTT;
    if (action === "add") {
      api
        .AddInspection({ ...value })
        .then((response) => {
          handleChangeStateInspection({ loading: false });
          if (response.data.Status > 0) {
            message.destroy();
            message.success(response.data.Message);
            hideModalAddInspection();
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
    } else if (action === "edit") {
      api
        .EditInspection(value)
        .then((response) => {
          handleChangeStateInspection({ loading: false });
          if (response.data.Status > 0) {
            message.destroy();
            message.success(response.data.Message);
            //
            hideModalAddInspection();
            //
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
    }
  };

  // < 200 được phép thêm, sửa, xóa
  // lớn hơn 200 không được phép thêm, sửa, xóa
  //  === 400 và là kế hoạch bổ sung thì được thêm sửa xóa, xác định kệ hoạch bổ sung khi Status = 2
  // lớn hơn hoặc bằng 500 thì không được thao tác gì nữa bất kể trường hợp nào

  const checkAction = !InfoPlan
    ? true
    : InfoPlan?.StateID < STATENGHIEPVU.BanHanhKeHoachThanhTra
    ? InfoPlan?.StateID === STATENGHIEPVU.DaRaSoat ||
      InfoPlan?.StateID < STATENGHIEPVU.DaLapKeHoach
    : false;
  const checkBoSung = InfoPlan?.StateID !== STATENGHIEPVU.DaRaSoat;

  const checkAdd = !InfoPlan
    ? false
    : InfoPlan?.StateID < STATENGHIEPVU.BanHanhKeHoachThanhTra
    ? !(InfoPlan?.StateID < STATENGHIEPVU.DaLapKeHoach)
    : true;

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

  const handleRenderNameSplit = (text) => {
    if (text) {
      return text.split("|")?.map((item, index) => {
        const TrangThaiThucHien = item.slice(0, item.indexOf("*")).trim();
        const TenCoQuan = item.slice(item.indexOf("#") + 1).trim();
        const name =
          TrangThaiThucHien === "1"
            ? "Được thực hiện"
            : TrangThaiThucHien === "2"
            ? "Không được thực hiện"
            : "";
        const rawData = item?.split("-")?.slice(1)?.join("-");

        return (
          <Tooltip
            title={`${name} ${
              TrangThaiThucHien === "2" ? `: ${TenCoQuan}` : ""
            }`}
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
                      rawData
                        ?.slice(
                          0,
                          rawData?.indexOf("#") > 0
                            ? rawData?.indexOf("#")
                            : rawData?.length + 1
                        )
                        .trim()
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
              colSpan: 11,
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
      width: "20%",
      render: (text, record) => {
        if (record.isParent) {
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
      title: "Nội dung",
      dataIndex: "NoiDung",
      key: "NoiDung",
      width: "30%",

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
      title: "Thời hạn thanh tra",
      dataIndex: "ThoiHanThanhTra",
      key: "ThoiHanThanhTra",
      width: "10%",
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
      width: "10%",
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
        // < 200 được phép thêm, sửa, xóa
        // lớn hơn 200 không được phép thêm, sửa, xóa
        //  === 400 và là kế hoạch bổ sung thì được thêm sửa xóa, xác định kệ hoạch bổ sung khi Status = 2
        // lớn hơn hoặc bằng 500 thì không được thao tác gì nữa bất kể trường hợp nào
        const isAction = record.Status === 2;
        // const checkBoSung = record.Status === 400 &&

        if (record.isParent) {
          return {
            props: {
              colSpan: 0,
            },
          };
        }
        const checkRender =
          checkAction || isTTTrungUong
            ? InfoPlan?.StateID === STATENGHIEPVU.DaRaSoat
              ? record?.StateID === STATENGHIEPVU.DaRaSoat &&
                record.Status === 2
              : true
            : false;
        const checkEdit = checkAction || isTTTrungUong;

        const checkDelete =
          checkAction || isTTTrungUong
            ? InfoPlan?.StateID === STATENGHIEPVU.DaRaSoat
              ? record?.StateID === STATENGHIEPVU.DaRaSoat &&
                record.DTChongCheo !== true
              : true
            : false;
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

            {checkEdit ? (
              <Tooltip title="Sửa">
                <EditIcon
                  style={{ fontSize: 16 }}
                  onClick={() =>
                    showModalEditInspection(record?.CuocThanhTraID)
                  }
                />
              </Tooltip>
            ) : null}
            {checkDelete ? (
              <Tooltip title="Xóa">
                <DeleteIcon
                  style={{ fontSize: 16 }}
                  onClick={() =>
                    handleDeleteInspection(
                      record?.CuocThanhTraID,
                      record?.StateID === STATENGHIEPVU.DaRaSoat
                    )
                  }
                />
              </Tooltip>
            ) : null}
          </Space>
        );
      },
    },
  ];

  if (isTTTrungUong) {
    columns.splice(columns.length - 1, 0, {
      title: "Cơ quan chủ trì",
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
    });
  }

  const formatDataRender = (ListInspection) => {
    if (ListInspection) {
      const dataGroup = [...ListHinhThuc]
        ?.map((item, index) => {
          return {
            TenPhanLoaiThanhTra: `Danh sách các dự thảo ${item?.TenPhanLoaiThanhTra}`,
            idx: convertToRoman(index + 1),
            data: ListInspection
              ? ListInspection?.filter(
                  (item2) =>
                    item2.PhanLoaiThanhTraID1 === item.PhanLoaiThanhTraID
                )?.map((item3, index2) => {
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
        dataGroup?.flatMap((group, index) => [
          { ...group, isParent: true, key: `parent-${index}` },
          ...group.data,
        ]);
      return restructuredData;
    }
  };

  const newListInspection = formatDataRender(ListInspection);
  const newListInspectionAll = formatDataRender(ListInspectionAll);

  return (
    <LayoutWrapper>
      <PageHeader>
        <BreadCrumb />
        <div className="filter-right">
          {role.add && isTTTrungUong ? (
            <Button
              type="add"
              icon={<AddIcon />}
              onClick={() => showModalAddInspection(false, isTTTrungUong)}
            >
              Thêm
            </Button>
          ) : (
            <Button
              type="add"
              icon={<AddIcon />}
              onClick={() => showModalAddInspection(false, isTTTrungUong)}
              disabled={checkAdd}
            >
              Thêm
            </Button>
          )}
          {role.add && !isTTTrungUong ? (
            <Button
              type="import"
              icon={<CloudUploadIcon />}
              loading={loading}
              onClick={showModalImportPlan}
              disabled={checkAdd}
              // disabled={!(InfoPlan?.StateID < 200) && InfoPlan}
            >
              Import
            </Button>
          ) : (
            <Button
              type={isTTTrungUong ? "checked" : "import"}
              icon={<CloudUploadIcon />}
              loading={loading}
              onClick={showModalImportPlan}
            >
              Import
            </Button>
          )}
          {!isTTTrungUong ? (
            role.add ? (
              <Button
                type="add"
                icon={<EditOutlined />}
                disabled={!NgayRaSoat || isCurrentDateGreater || checkBoSung}
                onClick={() => showModalAddInspection(true)}
              >
                Bổ sung
              </Button>
            ) : null
          ) : null}

          {!isTTTrungUong ? (
            role.add ? (
              <Button
                type="secondary"
                icon={<FlyIcon />}
                onClick={handleSendPlan}
                disabled={
                  (!(InfoPlan?.StateID < 200) && InfoPlan) ||
                  ListInspection?.length === 0
                }
              >
                Gửi kế hoạch
              </Button>
            ) : null
          ) : null}

          {!isTTTrungUong ? (
            role.view ? (
              <Button
                type="dowloadlist"
                icon={<CloudDownloadIcon />}
                loading={loadingDowload}
                onClick={() => dowloadInspection()}
                disabled={!ListInspection?.length}
              >
                {defaultDoiTuongTT === DONVIHANHCHINH || !defaultDoiTuongTT
                  ? "Tải kế hoạch TTKT đơn vị hành chính, sự nghiệp"
                  : "Tải kế hoạch TTKT doanh nghiệp"}
              </Button>
            ) : null
          ) : null}
          {/* {!isTTTrungUong ? (
            role.view ? ( */}
          <Button
            type="dowloadlist"
            icon={<CloudDownloadIcon />}
            loading={loadingDownloadDoiTuongTT}
            onClick={() => dowloadListDoiTuongTT()}
          >
            Danh sách đối tượng thanh tra
          </Button>
          {/* ) : null
          ) : null} */}
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
              ListYear?.map((item) => (
                <Option value={item.id}>{item.name}</Option>
              ))}
          </Select>

          {isTTTrungUong && (
            <TreeSelect
              showSearch
              treeData={ListAgencyTw}
              onChange={(value) => onFilter(value, "CoQuanLapID")}
              value={filterData.CoQuanLapID ? filterData.CoQuanLapID : null}
              style={{ width: 400 }}
              dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
              placeholder="Chọn đơn vị"
              allowClear
              treeDefaultExpandAll
              notFoundContent={"Không có dữ liệu"}
              treeNodeFilterProp={"title"}
            />
          )}

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
          {InfoPlan && InfoPlan?.NgayRaSoat && !isTTTrungUong ? (
            <p className="info-plan info">
              Danh sách các cuộc thanh tra, kiểm tra dự kiến thực hiện năm{" "}
              {filterData.NamThanhTra
                ? filterData.NamThanhTra
                : defaultNamThanhTra}
              <span className="complete">
                {InfoPlan?.NgayRaSoat && InfoPlan?.StateID < 500
                  ? ` - Hoàn tất rà soát chồng chéo`
                  : " - Đã ban hành"}
              </span>
              <span className="date">
                {InfoPlan?.NgayRaSoat && InfoPlan?.StateID < 500
                  ? ` (Hạn bổ sung kế hoạch: ${
                      comparisonDate
                        ? dayjs(comparisonDate).format("DD/MM/YYYY")
                        : ""
                    })`
                  : ""}
              </span>
            </p>
          ) : null}
          <Tabs
            activeKey={filterData?.DoiTuongTT}
            onChange={(value) => onFilter(value, "DoiTuongTT")}
          >
            <TabPane tab="Đơn vị hành chính, sự nghiệp" key="1">
              <BoxTable
                key="1"
                className="custom-expandable-table"
                columns={columns}
                dataSource={newListInspection}
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
                dataSource={newListInspection}
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
      <ModalAddInspection
        visible={stateModalAddInspection.visible}
        onCancel={hideModalAddInspection}
        loading={stateModalAddInspection.loading}
        key={stateModalAddInspection.key}
        ListHinhThuc={ListHinhThuc}
        ListFields={ListFields}
        onCreate={submitModalAddInspection}
        dataEdit={stateModalAddInspection.data}
        action={stateModalAddInspection.action}
        isTTTrungUong={isTTTrungUong}
        ListYear={ListYear}
        defaultNamThanhTra={defaultYear}
        DoiTuongTT={defaultDoiTuongTT}
        ListAgencyTw={ListAgencyTw}
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

      <ModalImportPlan
        visible={stateModalImportPlan.visible}
        onCancel={hideModalImportPlan}
        loading={stateModalImportPlan.loading}
        data={stateModalImportPlan.data}
        key={stateModalImportPlan.key}
        onImport={submitModalImportPlan}
        onDowload={dowloadFileImport}
        loadingDowload={loadingDowload}
        isTTTrungUong={isTTTrungUong}
        ListAgencyTw={ListAgencyTw}
        DoiTuongTT={defaultDoiTuongTT}
        defaultNamThanhTra={defaultYear}
        ListYear={ListYear}
      />

      <ModalViewImport
        visible={stateModalViewImport.visible}
        onCancel={hideModalViewImport}
        loading={stateModalViewImport.loading}
        data={stateModalViewImport.data}
        key={stateModalViewImport.key}
        ListHinhThuc={ListHinhThuc}
      />

      <TableExport
        data={newListInspectionAll}
        excelRef={excelRef}
        DoiTuongTT={defaultDoiTuongTT}
        year={defaultNamThanhTra}
        onRemove={handleRenderNameSplit}
      />
    </LayoutWrapper>
  );
};

export default PlanningScreen;
