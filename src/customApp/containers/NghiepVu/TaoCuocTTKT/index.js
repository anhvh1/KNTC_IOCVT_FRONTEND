import React, { Component, useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import axios from "axios";
import EditIcon from "../../../../components/utility/EditIcon";
import DeleteIcon from "../../../../components/utility/DeleteIcon";
import SettingPass from "../../../../components/utility/SettingPass";
import {
  convertToRoman,
  formatNoiDung,
  handleRenderTrangThai,
  renderTrangThaiColor,
} from "../../../../helpers/utility";
import queryString from "query-string";
import actions from "../../../redux/NghiepVu/TaoCuocTTKT/actions";
import api, { apiUrl } from "./config";
import { getListYear } from "../../../../helpers/utility";
import LayoutWrapper from "../../../../components/utility/layoutWrapper";
import PageHeader from "../../../../components/utility/pageHeader";
import PageAction from "../../../../components/utility/pageAction";
import Box from "../../../../components/utility/box";
import BoxFilter from "../../../../components/utility/boxFilter";
import BoxTable from "../../../../components/utility/boxTable";
import actionsSidebar from "../../../redux/HeThong/Sidebar/actions";
import { ModalAddEdit } from "./modalAddEdit";
import {
  Modal,
  message,
  Input,
  Switch,
  Tooltip,
  Checkbox,
  DatePicker,
  Radio,
} from "antd";
import Select, { Option } from "../../../../components/uielements/select";
import ModalAddInspection from "./ModalAddInspection";
import ModalHuyCuoc from "./modalHuyCuoc";
import BreadCrumb from "../Shared/Component/BreadCumb";
import AddIcon from "../../../../components/utility/AddIcon";
import { Button } from "../../../../components/uielements/exportComponent";
import {
  changeUrlFilter,
  getFilterData,
  getConfigLocal,
} from "../../../../helpers/utility";
import { formDataCaller } from "../../../../api/formDataCaller";
import { useKey } from "../../../CustomHook/useKey";
import { InputSearch } from "../../../../components/uielements/input";
import dayjs from "dayjs";
import { saveAs } from "file-saver";
import {
  DONVIHANHCHINH,
  DOANHNGHIEP,
  TYPEKEHOACH,
} from "../../../../settings/constants";
import * as XLSX from "xlsx";
const TaoCuocThanhTraKiemTra = (props) => {
  document.title = "Quản lý kế hoạch thanh tra, kiểm tra";
  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search)
  );
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalKey, increaseKey] = useKey();
  const [visibleModalAddEdit, setVisibleModalAddEdit] = useState(false);
  const [visibleHuyCuoc, setVisibleHuyCuoc] = useState(false);

  const { ListSideBar } = useSelector((state) => state.ListSideBar);
  const [dataModalAddEdit, setDataModalAddEdit] = useState({});
  const [action, setAction] = useState("");
  const dispatch = useDispatch();
  const [ListAgency, setListAgency] = useState([]);
  const route = location.pathname.split("/")[2];
  const isTTTrungUong = route === "tao-cuoc-thanh-tra-kiem-tra" ? false : true;
  const ListYear = getListYear();
  const defaultYear = ListYear ? ListYear[ListYear.length - 1].id : null;
  const defaultTypeKeHoach = filterData?.TypeKeHoach
    ? Number(filterData?.TypeKeHoach)
    : TYPEKEHOACH;
  const defaultDoiTuongTT = filterData?.DoiTuongTT
    ? Number(filterData?.DoiTuongTT)
    : DONVIHANHCHINH;
  const defaultNamThanhTra = filterData?.NamThanhTra
    ? filterData.NamThanhTra
    : defaultYear;
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
  const currentYear = dayjs().year();
  useEffect(() => {
    dispatch(actions.getInitData());
    dispatch(actionsSidebar.getList());
  }, []);
  useEffect(() => {
    changeUrlFilter(filterData); //change url
    // props.getList(filterData); //get list
    dispatch(
      actions.getList({
        ...filterData,
        TypeKeHoach: defaultTypeKeHoach,
        NamThanhTra: defaultNamThanhTra,
        DoiTuongTT: defaultDoiTuongTT,
      })
    );
    getListAgency();
  }, [filterData]);
  // useEffect(() => {
  //   const currentYear = dayjs().year();
  //   setFilterData({ NamThanhTra: currentYear, DoiTuongTT: 1, TypeKeHoach: 0 });
  // }, []);
  const onFilter = (value, property) => {
    let oldFilterData = { ...filterData };
    let onFilter = { value, property };
    let newFilterData = getFilterData(oldFilterData, onFilter, null);
    setFilterData(newFilterData);
    if (property === "NamThanhTra") {
      setSelectedYear(value); // Store the selected year
    }
  };
  const onTableChange = (pagination, filters, sorter) => {
    let oldFilterData = { ...filterData };
    let onOrder = { pagination, filters, sorter };
    let newFilterData = getFilterData(oldFilterData, null, onOrder);
    setFilterData(newFilterData);
  };
  const showModalAdd = () => {
    setDataModalAddEdit({});
    setVisibleModalAddEdit(true);
    increaseKey();
    setAction("add");
  };

  const submitModalAddEdit = (data, FileDataThanhTra, FileDataGiamSat) => {
    setConfirmLoading(true);
    if (action === "add") {
      const formSave = new FormData();
      formSave.append("taoCuocThanhTraKiemTraStr", JSON.stringify(data));
      if (FileDataThanhTra) {
        if (Array.isArray(FileDataThanhTra)) {
          FileDataThanhTra.forEach((file) => {
            formSave.append("fileQuyetDinhThanhTra", file);
          });
        } else {
          formSave.append("fileQuyetDinhThanhTra", FileDataThanhTra);
        }
      }
      if (FileDataGiamSat) {
        if (Array.isArray(FileDataGiamSat)) {
          FileDataGiamSat.forEach((file) => {
            formSave.append("fileQuyetDinhGiamSat", file);
          });
        } else {
          formSave.append("fileQuyetDinhGiamSat", FileDataGiamSat);
        }
      }
      formDataCaller(apiUrl.themTaoCuoc, formSave)
        .then((response) => {
          setConfirmLoading(false);
          if (response.data.Status > 0) {
            message.success("Thêm thành công");
            hideModalAddEdit();
            dispatch(
              actions.getList({
                ...filterData,
                TypeKeHoach: defaultTypeKeHoach,
                NamThanhTra: defaultNamThanhTra,
                DoiTuongTT: defaultDoiTuongTT,
              })
            );
            dispatch(actions.getGuild());
          } else {
            message.destroy();
            message.error(response.data.Message);
          }
        })
        .catch((error) => {
          message.destroy();
          message.error(error.toString());
        });
    } else if (action === "edit") {
      const formSave = new FormData();
      formSave.append("taoCuocThanhTraKiemTraStr", JSON.stringify(data));
      if (FileDataThanhTra) {
        if (Array.isArray(FileDataThanhTra)) {
          FileDataThanhTra.forEach((file) => {
            formSave.append("fileQuyetDinhThanhTra", file);
          });
        } else {
          formSave.append("fileQuyetDinhThanhTra", FileDataThanhTra);
        }
      }
      if (FileDataGiamSat) {
        if (Array.isArray(FileDataGiamSat)) {
          FileDataGiamSat.forEach((file) => {
            formSave.append("fileQuyetDinhGiamSat", file);
          });
        } else {
          formSave.append("fileQuyetDinhGiamSat", FileDataGiamSat);
        }
      }
      formDataCaller(apiUrl.suaTaoCuoc, formSave)
        .then((response) => {
          setConfirmLoading(false);
          if (response.data.Status > 0) {
            message.success("Cập nhật thành công");
            hideModalAddEdit();
            dispatch(
              actions.getList({
                ...filterData,
                TypeKeHoach: defaultTypeKeHoach,
                NamThanhTra: defaultNamThanhTra,
                DoiTuongTT: defaultDoiTuongTT,
              })
            );
            dispatch(actions.getGuild());
          } else {
            message.destroy();
            message.error(response.data.Message);
          }
        })
        .catch((error) => {
          message.destroy();
          message.error(error.toString());
        });
    }
  };

  const [DoiTuongTT, setDoiTuongTT] = useState(1);
  const [TypeKeHoach, setTypeKeHoach] = useState(0);
  const [PhanLoaiThanhTraID1, setPhanLoaiThanhTraID1] = useState({});
  const [PhanLoaiThanhTraID2, setPhanLoaiThanhTraID2] = useState({});
  const submitModalAddInspection = (
    data,
    FileDataThanhTra,
    FileDataGiamSat
  ) => {
    setConfirmLoading(true);
    if (stateModalAddInspection.action === "add") {
      const formSave = new FormData();
      formSave.append("thanhTraInsertRequest", JSON.stringify(data));
      if (FileDataThanhTra) {
        if (Array.isArray(FileDataThanhTra)) {
          FileDataThanhTra.forEach((file) => {
            formSave.append("fileQuyetDinhThanhTra", file);
          });
        } else {
          formSave.append("fileQuyetDinhThanhTra", FileDataThanhTra);
        }
      }
      if (FileDataGiamSat) {
        if (Array.isArray(FileDataGiamSat)) {
          FileDataGiamSat.forEach((file) => {
            formSave.append("fileQuyetDinhGiamSat", file);
          });
        } else {
          formSave.append("fileQuyetDinhGiamSat", FileDataGiamSat);
        }
      }
      formDataCaller(apiUrl.themTaoCuocDotXuat, formSave)
        .then((response) => {
          setConfirmLoading(false);
          if (response.data.Status > 0) {
            message.success("Thêm thành công");
            hideModalAddInspection();

            dispatch(
              actions.getList({
                ...filterData,
                TypeKeHoach: defaultTypeKeHoach,
                NamThanhTra: defaultNamThanhTra,
                DoiTuongTT: defaultDoiTuongTT,
              })
            );
            dispatch(actions.getGuild());
          } else {
            message.destroy();
            message.error(response.data.Message);
          }
        })
        .catch((error) => {
          message.destroy();
          message.error(error.toString());
        });
    } else if (stateModalAddInspection.action === "edit") {
      const formSave = new FormData();
      formSave.append("thanhTraInsertRequest", JSON.stringify(data));
      if (FileDataThanhTra) {
        if (Array.isArray(FileDataThanhTra)) {
          FileDataThanhTra.forEach((file) => {
            formSave.append("fileQuyetDinhThanhTra", file);
          });
        } else {
          formSave.append("fileQuyetDinhThanhTra", FileDataThanhTra);
        }
      }
      if (FileDataGiamSat) {
        if (Array.isArray(FileDataGiamSat)) {
          FileDataGiamSat.forEach((file) => {
            formSave.append("fileQuyetDinhGiamSat", file);
          });
        } else {
          formSave.append("fileQuyetDinhGiamSat", FileDataGiamSat);
        }
      }
      formDataCaller(apiUrl.suaTaoCuocDotXuat, formSave)
        .then((response) => {
          setConfirmLoading(false);
          if (response.data.Status > 0) {
            message.success("Cập nhật thành công");
            hideModalAddInspection();
            dispatch(
              actions.getList({
                ...filterData,
                TypeKeHoach: defaultTypeKeHoach,
                NamThanhTra: defaultNamThanhTra,
                DoiTuongTT: defaultDoiTuongTT,
              })
            );
            dispatch(actions.getGuild());
          } else {
            message.destroy();
            message.error(response.data.Message);
          }
        })
        .catch((error) => {
          message.destroy();
          message.error(error.toString());
        });
    }
  };
  const showModalEditInspection = (CuocThanhTraID) => {
    api
      .chiTietTaoCuoc(CuocThanhTraID)
      .then((res) => {
        if (res.data.Status > 0) {
          setStateModalAddInspection({
            ...stateModalAddInspection,
            visible: true,
            data: res.data.Data.CuocThanhTraReponse,
            key: stateModalAddInspection.key + 1,
            action: "edit",
          });
          setDataModalAddEdit(res.data.Data);
          setPhanLoaiThanhTraID1(
            res.data.Data.CuocThanhTraReponse.PhanLoaiThanhTraID1
          );
          setPhanLoaiThanhTraID2(
            res.data.Data.CuocThanhTraReponse.PhanLoaiThanhTraID2
          );
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
  const showModalEdit = (CuocThanhTraID) => {
    api
      .chiTietTaoCuoc(CuocThanhTraID)
      .then((res) => {
        if (res.data.Status > 0) {
          setDataModalAddEdit(res.data.Data);
          setDanhSachDoiTuongThanhTra(
            res.data.Data.CuocThanhTraReponse.DanhSachDoiTuongThanhTra.filter(
              (item) => !item.BiHuy
            )
          );
          setPhanLoaiThanhTraID1(
            res.data.Data.CuocThanhTraReponse.PhanLoaiThanhTraID1
          );
          setPhanLoaiThanhTraID2(
            res.data.Data.CuocThanhTraReponse.PhanLoaiThanhTraID2
          );
          increaseKey();
          setVisibleModalAddEdit(true);

          if (res.data.Data.CuocThanhTraReponse.Status < 20) {
            setAction("add");
          } else {
            setAction("edit");
          }
        } else {
          message.destroy();
          increaseKey();
          setVisibleModalAddEdit(true);
        }
      })
      .catch((error) => {
        message.destroy();
        message.error(error.toString());
      });
  };
  const [DanhSachDoiTuongThanhTra, setDanhSachDoiTuongThanhTra] = useState([]);
  const [CuocThanhTraID, setCuocThanhTraID] = useState("");
  const showModalHuyCuoc = (CuocThanhTraID) => {
    api
      .chiTietTaoCuoc(CuocThanhTraID)
      .then((res) => {
        if (res.data.Status > 0) {
          setDanhSachDoiTuongThanhTra(
            res.data.Data.CuocThanhTraReponse.DanhSachDoiTuongThanhTra.filter(
              (item) => item.BiHuy === false
            )
          );
          setCuocThanhTraID(res.data.Data.CuocThanhTraID);
          increaseKey();
          setVisibleHuyCuoc(true);
        } else {
          message.destroy();
          increaseKey();
          setVisibleHuyCuoc(true);
        }
      })
      .catch((error) => {
        message.destroy();
        message.error(error.toString());
      });
  };
  const HuyCuoc = (data) => {
    setConfirmLoading(true);
    if (action === "add") {
      api
        .HuyCuoc(data)
        .then((res) => {
          if (res.data.Status > 0) {
            setConfirmLoading(false);
            dispatch(
              actions.getList({
                ...filterData,
                TypeKeHoach: defaultTypeKeHoach,
                NamThanhTra: defaultNamThanhTra,
                DoiTuongTT: defaultDoiTuongTT,
              })
            );
            hideModalAddEdit();
            dispatch(
              actions.getList({
                ...filterData,
                TypeKeHoach: defaultTypeKeHoach,
                NamThanhTra: defaultNamThanhTra,
                DoiTuongTT: defaultDoiTuongTT,
              })
            );
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
    }
    if (action === "edit") {
      api
        .ChuyenCuoc(data)
        .then((res) => {
          if (res.data.Status > 0) {
            setConfirmLoading(false);
            dispatch(
              actions.getList({
                ...filterData,
                TypeKeHoach: defaultTypeKeHoach,
                NamThanhTra: defaultNamThanhTra,
                DoiTuongTT: defaultDoiTuongTT,
              })
            );
            hideModalAddEdit();
            dispatch(
              actions.getList({
                ...filterData,
                TypeKeHoach: defaultTypeKeHoach,
                NamThanhTra: defaultNamThanhTra,
                DoiTuongTT: defaultDoiTuongTT,
              })
            );
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
    }
  };
  const hideModalAddEdit = () => {
    setVisibleModalAddEdit(false);
    setDataModalAddEdit({});
    setCuocThanhTraID("");
    setDanhSachDoiTuongThanhTra({});
    setVisibleHuyCuoc(false);
  };
  const deleteModalAddEdit = (CuocThanhTraID) => {
    Modal.confirm({
      title: "Xóa Dữ Liệu",
      content: "Bạn có muốn xóa chức vụ này không?",
      cancelText: "Không",
      okText: "Có",
      onOk: () => {
        setConfirmLoading(true);
        api
          .deleteCuocDotXuat(CuocThanhTraID)
          .then((res) => {
            if (res.data.Status > 0) {
              setConfirmLoading(false);
              dispatch(
                actions.getList({
                  ...filterData,
                  TypeKeHoach: defaultTypeKeHoach,
                  NamThanhTra: defaultNamThanhTra,
                  DoiTuongTT: defaultDoiTuongTT,
                })
              );
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
  const BoHuy = (CuocThanhTraID) => {
    Modal.confirm({
      title: "Thông báo",
      content: "Bạn có chắc chắn muốn bỏ hủy cuộc thanh tra này không?",
      cancelText: "Không",
      okText: "Có",
      onOk: () => {
        setConfirmLoading(true);
        api
          .BoHuy(CuocThanhTraID)
          .then((res) => {
            if (res.data.Status > 0) {
              setConfirmLoading(false);
              dispatch(
                actions.getList({
                  ...filterData,
                  TypeKeHoach: defaultTypeKeHoach,
                  NamThanhTra: defaultNamThanhTra,
                  DoiTuongTT: defaultDoiTuongTT,
                })
              );
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
  const ChuyenCuoc = (CuocThanhTraID) => {
    Modal.confirm({
      title: "Chuyển kế hoạch sang năm sau",
      content: `Bạn có chắc chắn muốn chuyển cuộc thanh tra này sang năm ${
        parseInt(selectedYear) + 1
      } không?`,
      cancelText: "Không",
      okText: "Có",
      onOk: () => {
        setConfirmLoading(true);
        api
          .ChuyenCuoc({
            CuocThanhTraID: CuocThanhTraID,
            NamThanhTra: parseInt(selectedYear),
          })
          .then((res) => {
            if (res.data.Status > 0) {
              setConfirmLoading(false);
              dispatch(
                actions.getList({
                  ...filterData,
                  TypeKeHoach: defaultTypeKeHoach,
                  NamThanhTra: defaultNamThanhTra,
                  DoiTuongTT: defaultDoiTuongTT,
                })
              );
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
  const BoChuyenCuoc = (CuocThanhTraID) => {
    Modal.confirm({
      title: "Thông báo",
      content: `Bạn có chắc chắn muốn bỏ chuyển cuộc thanh tra này không?`,
      cancelText: "Không",
      okText: "Có",
      onOk: () => {
        setConfirmLoading(true);
        api
          .BoChuyenCuoc(CuocThanhTraID)
          .then((res) => {
            if (res.data.Status > 0) {
              setConfirmLoading(false);
              dispatch(
                actions.getList({
                  ...filterData,
                  TypeKeHoach: defaultTypeKeHoach,
                  NamThanhTra: defaultNamThanhTra,
                  DoiTuongTT: defaultDoiTuongTT,
                })
              );
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
  const { DanhSachTaoCuoc, role, ListHinhThuc, ListFields, ListAgencyTw } =
    props;
  console.log("ListFields", ListFields);
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
        return text
          .split("|")
          .map((item, index) => {
            if (item.includes("*")) {
              const parts = item.split("*");
              if (parts.length > 1) {
                item = parts[1].trim();
                if (parts[0].trim() === "2") {
                  return (
                    <React.Fragment key={index}>
                      <Tooltip title="Đã chuyển">
                        <span
                          style={{
                            textDecoration: "line-through",
                            textDecorationColor: "red",
                          }}
                        >
                          {item}
                        </span>
                      </Tooltip>
                      {index < text.split("|").length - 1 && <br />}
                    </React.Fragment>
                  );
                } else if (parts[0].trim() === "1") {
                  return (
                    <React.Fragment key={index}>
                      <Tooltip title="Đã hủy">
                        <span
                          style={{
                            textDecoration: "line-through",
                            textDecorationColor: "red",
                          }}
                        >
                          {item}
                        </span>
                      </Tooltip>
                      {index < text.split("|").length - 1 && <br />}
                    </React.Fragment>
                  );
                }
              } else {
                return null;
              }
            }
            return (
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
            );
          })
          .filter(Boolean);
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
      width: "12%",
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
      width: "12%",
      key: "LinhVuc",
      render: (text, record) => {
        if (record.isParent) {
          return {
            props: {
              colSpan: 0,
            },
          };
        }
        const linhVucIds = text ? text.split(",").map((id) => id.trim()) : [];
        const tenPhanLoaiThanhTra = linhVucIds
          .map((id) => {
            const found = ListFields.find(
              (field) => field.PhanLoaiThanhTraID === Number(id)
            );
            return found ? found.TenPhanLoaiThanhTra : null;
          })
          .filter(Boolean);
        return (
          <>
            {tenPhanLoaiThanhTra.map((item, index) => (
              <div key={index}>
                {item}
                {index < tenPhanLoaiThanhTra.length - 1 && ", "}{" "}
              </div>
            ))}
          </>
        );
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
      dataIndex: "TenTrangThai",
      key: "StateName",
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

  const renderThaoTac = (record) => {
    return (
      <div className={"action-btn"}>
        {defaultTypeKeHoach === 0 ? (
          <>
            {record.TypeBiHuy === 1 && record.Status < 20 ? (
              <>
                <Tooltip title={"Bỏ hủy cuộc"}>
                  <svg
                    onClick={() => BoHuy(record.CuocThanhTraID)}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-arrow-counterclockwise"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2z"
                    />
                    <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466" />
                  </svg>
                </Tooltip>
                {record.Status < 20 && record.DuocTaoCuocTT === 1 && (
                  <Tooltip title={"Tạo cuộc thanh tra "}>
                    <svg
                      onClick={() => showModalEdit(record.CuocThanhTraID)}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      // fill="currentColor"
                      className="bi bi-arrow-up-circle-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0m-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z" />
                    </svg>
                  </Tooltip>
                )}
                {record.Status === 20 && record.DuocTaoCuocTT === 1 && (
                  <Tooltip title={"Cập nhật cuộc thanh tra "}>
                    <svg
                      onClick={() => showModalEdit(record.CuocThanhTraID)}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-arrow-up-circle-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0m-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z" />
                    </svg>
                  </Tooltip>
                )}
                {record.Status < 20 && record.DuocTaoCuocTT != 0 && (
                  <>
                    {/* <Tooltip title={"Chuyển sang năm sau"}>
                      <svg onClick={() => showModalHuyCuoc(record.CuocThanhTraID, setAction('edit'))} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-forward-fill" viewBox="0 0 16 16">
                        <path d="m9.77 12.11 4.012-2.953a.647.647 0 0 0 0-1.114L9.771 5.09a.644.644 0 0 0-.971.557V6.65H2v3.9h6.8v1.003c0 .505.545.808.97.557" />
                      </svg>
                    </Tooltip> */}

                    <Tooltip title={"Hủy cuộc"}>
                      <svg
                        onClick={() =>
                          showModalHuyCuoc(
                            record.CuocThanhTraID,
                            setAction("add")
                          )
                        }
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-x-lg"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                      </svg>
                    </Tooltip>
                  </>
                )}
              </>
            ) : record.TypeBiHuy === 2 && record.Status < 20 ? (
              <>
                <Tooltip title={"Bỏ chuyển cuộc"}>
                  <svg
                    onClick={() => BoChuyenCuoc(record.CuocThanhTraID)}
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-arrow-counterclockwise"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 3a5 5 0 1 1-4.546 2.914.5.5 0 0 0-.908-.417A6 6 0 1 0 8 2z"
                    />
                    <path d="M8 4.466V.534a.25.25 0 0 0-.41-.192L5.23 2.308a.25.25 0 0 0 0 .384l2.36 1.966A.25.25 0 0 0 8 4.466" />
                  </svg>
                </Tooltip>
                {record.Status < 20 && record.DuocTaoCuocTT === 1 && (
                  <Tooltip title={"Tạo cuộc thanh tra "}>
                    <svg
                      onClick={() => showModalEdit(record.CuocThanhTraID)}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      // fill="currentColor"
                      className="bi bi-arrow-up-circle-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0m-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z" />
                    </svg>
                  </Tooltip>
                )}
                {record.Status === 20 && record.DuocTaoCuocTT === 1 && (
                  <Tooltip title={"Cập nhật cuộc thanh tra "}>
                    <svg
                      onClick={() => showModalEdit(record.CuocThanhTraID)}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-arrow-up-circle-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0m-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z" />
                    </svg>
                  </Tooltip>
                )}
                {record.Status < 20 && record.DuocTaoCuocTT != 0 && (
                  <>
                    <Tooltip title={"Chuyển sang năm sau"}>
                      <svg
                        onClick={() =>
                          showModalHuyCuoc(
                            record.CuocThanhTraID,
                            setAction("edit")
                          )
                        }
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-forward-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="m9.77 12.11 4.012-2.953a.647.647 0 0 0 0-1.114L9.771 5.09a.644.644 0 0 0-.971.557V6.65H2v3.9h6.8v1.003c0 .505.545.808.97.557" />
                      </svg>
                    </Tooltip>

                    {/* <Tooltip title={"Hủy cuộc"}>
                      <svg
                        onClick={() => showModalHuyCuoc(record.CuocThanhTraID, setAction('add'))}
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-x-lg"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                      </svg>
                    </Tooltip> */}
                  </>
                )}
              </>
            ) : (
              <>
                {record.Status < 20 && record.DuocTaoCuocTT === 1 && (
                  <Tooltip title={"Tạo cuộc thanh tra "}>
                    <svg
                      onClick={() => showModalEdit(record.CuocThanhTraID)}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      // fill="currentColor"
                      className="bi bi-arrow-up-circle-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0m-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z" />
                    </svg>
                  </Tooltip>
                )}
                {record.Status === 20 && record.DuocTaoCuocTT === 1 && (
                  <Tooltip title={"Cập nhật cuộc thanh tra "}>
                    <svg
                      onClick={() => showModalEdit(record.CuocThanhTraID)}
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      fill="currentColor"
                      className="bi bi-arrow-up-circle-fill"
                      viewBox="0 0 16 16"
                    >
                      <path d="M16 8A8 8 0 1 0 0 8a8 8 0 0 0 16 0m-7.5 3.5a.5.5 0 0 1-1 0V5.707L5.354 7.854a.5.5 0 1 1-.708-.708l3-3a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 5.707z" />
                    </svg>
                  </Tooltip>
                )}
                {record.Status < 20 && (
                  <>
                    <Tooltip title={"Chuyển sang năm sau"}>
                      <svg
                        onClick={() =>
                          showModalHuyCuoc(
                            record.CuocThanhTraID,
                            setAction("edit")
                          )
                        }
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-forward-fill"
                        viewBox="0 0 16 16"
                      >
                        <path d="m9.77 12.11 4.012-2.953a.647.647 0 0 0 0-1.114L9.771 5.09a.644.644 0 0 0-.971.557V6.65H2v3.9h6.8v1.003c0 .505.545.808.97.557" />
                      </svg>
                    </Tooltip>
                    <Tooltip title={"Hủy cuộc"}>
                      <svg
                        onClick={() =>
                          showModalHuyCuoc(
                            record.CuocThanhTraID,
                            setAction("add")
                          )
                        }
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-x-lg"
                        viewBox="0 0 16 16"
                      >
                        <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
                      </svg>
                    </Tooltip>
                  </>
                )}
              </>
            )}
          </>
        ) : defaultTypeKeHoach === 2 ? (
          <>
            <Tooltip title={"Sửa"}>
              <EditIcon
                onClick={() => showModalEditInspection(record.CuocThanhTraID)}
              />
            </Tooltip>
            <Tooltip title={"Xóa"}>
              <DeleteIcon
                onClick={() => deleteModalAddEdit(record.CuocThanhTraID)}
              />
            </Tooltip>
          </>
        ) : null}
      </div>
    );
  };
  const { FileLimit } = props;
  const [selectedYear, setSelectedYear] = useState(dayjs().format("YYYY"));
  const [selected, setSelected] = useState(defaultDoiTuongTT);
  const [DoiTuongTTDotXuat, setDoiTuongTTDotXuat] = useState(1);

  const handleClick = (id) => {
    setSelected(id);
  };
  const prepareData = () => {
    return DanhSachTaoCuoc.map((record) => {
      if (record.Cap < 4) {
        return [
          `${record.STT}.${record.TenCoQuan}`,
          null,
          null,
          null,
          null,
          null,
          null,
          null,
        ];
      } else {
        return [
          record.STT,
          record.TenCoQuan,
          record.NoiDung,
          record.ThoiHanThanhTra,
          record.ThoiGianTienHanh,
          record.DonViChuTri,
          record.DonViPhoiHop,
          record.GhiChu,
        ];
      }
    });
  };
  const exportToExcel = () => {
    const dataToExport = prepareData();
    const header = [
      [
        "STT",
        "Đối tượng thanh tra, kiểm tra",
        "Nội dung thanh tra, kiểm tra",
        "Thời hạn thanh tra (ngày)",
        "Thời gian triển khai thanh tra",
        "Đơn vị chủ trì",
        "Đơn vị phối hợp",
        "Ghi chú",
      ],
    ];
    const worksheetData = header.concat(dataToExport);
    const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "DataSheet");
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "DanhSachTaoCuoc.xlsx");
  };
  const [stateModalAddInspection, setStateModalAddInspection] = useState({
    visible: false,
    data: {},
    loading: false,
    key: 0,
  });
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
  const hideModalAddInspection = () => {
    setDataModalAddEdit({});
    setStateModalAddInspection({
      ...stateModalAddInspection,
      visible: false,

      data: {},
      action: null,
    });
  };
  const handleChangeStateInspection = (value) => {
    setStateModalAddInspection({
      ...stateModalAddInspection,
      ...value,
    });
  };

  useEffect(() => {
    fetchData();
  }, []);
  const [listHinhThuc, setListHinhThuc] = useState([]);
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
  // const dataGroup = [...listHinhThuc]
  //   .map((item, index) => {
  //     return {
  //       TenPhanLoaiThanhTra: `Danh sách các dự thảo ${item?.TenPhanLoaiThanhTra}`,
  //       idx: convertToRoman(index + 1),
  //       children: Array.isArray(DanhSachTaoCuoc)
  //         ? DanhSachTaoCuoc
  //           .filter(
  //             (item2) => item2.PhanLoaiThanhTraID1 === item.PhanLoaiThanhTraID
  //           )
  //           .map((item3, index2) => ({
  //             ...item3,
  //             index: index2,
  //           }))
  //         : [], // fallback to empty array if dataModalAddEdit is not an array
  //     };
  //   })
  //   .filter((item) => item?.children?.length > 0);

  // const restructuredData = dataGroup.flatMap((group, index) => [
  //   { ...group, isParent: true, key: `parent-${index}` },
  //   ...group.children.map((child, childIndex) => ({
  //     ...child,
  //     isParent: false,

  //     key: `child-${index}-${childIndex}`,
  //   })),
  // ]);
  const dataGroup = [...listHinhThuc]
    .map((item, index) => {
      return {
        TenPhanLoaiThanhTra: `Danh sách các dự thảo ${item?.TenPhanLoaiThanhTra}`,
        idx: convertToRoman(index + 1),
        data: DanhSachTaoCuoc
          ? DanhSachTaoCuoc?.filter(
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
  return (
    <LayoutWrapper>
      <PageHeader>
        <BreadCrumb />
        {defaultTypeKeHoach === 2 && (
          <div className="filter-right">
            <Button
              type="add"
              icon={<AddIcon />}
              onClick={() => showModalAddInspection(false, isTTTrungUong)}
            >
              Thêm
            </Button>
            <button
              type="dowloadlist"
              onClick={exportToExcel}
              style={{
                height: "35px",
                borderRadius: "5px",
                border: "1px solid #E5E5E5",
                background: "white",
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  marginTop: "2px",
                }}
              >
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-cloud-arrow-down"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M7.646 10.854a.5.5 0 0 0 .708 0l2-2a.5.5 0 0 0-.708-.708L8.5 9.293V5.5a.5.5 0 0 0-1 0v3.793L6.354 8.146a.5.5 0 1 0-.708.708z"
                    />
                    <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383m.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
                  </svg>
                </span>
                <span
                  style={{
                    fontFamily: "Roboto",
                    fontSize: "15px",
                    fontWeight: 500,
                    lineHeight: "16.41px",
                    marginLeft: "8px",
                  }}
                >
                  Tải danh sách
                </span>
              </div>
            </button>
          </div>
        )}
      </PageHeader>
      <PageAction className="filter-action">
        <div className="filter-left">
          <Select
            placeholder="Chọn năm"
            allowClear={false}
            value={defaultNamThanhTra}
            onChange={(value) => onFilter(value, "NamThanhTra")}
            style={{ width: 120 }}
          >
            {getListYear().map((year) => (
              <Option key={year.id} value={year.id}>
                {year.name}
              </Option>
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
          <InputSearch
            allowClear={true}
            defaultValue={filterData.Keyword}
            placeholder="Nhập đối tượng, nội dung để tìm kiếm"
            onSearch={(value) => onFilter(value, "Keyword")}
            style={{ width: 300 }}
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
      </PageAction>
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
          Danh sách cuộc thanh tra, kiểm tra chính thức
        </div>
        <div style={{ marginTop: "10px" }}>
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
                borderTopLeftRadius: "5px",
                borderTopRightRadius: "5px",
                fontSize: "16px",
                backgroundColor:
                  selected === 1 ? "rgb(33, 111, 202)" : "transparent",
                fontWeight: selected === "unit" ? 500 : 400,
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
                borderTopLeftRadius: "5px",
                borderTopRightRadius: "5px",
                fontSize: "16px",
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
            onChange={onTableChange}
            pagination={false}
          />
        </div>
      </Box>
      <ModalAddEdit
        confirmLoading={confirmLoading}
        visible={visibleModalAddEdit}
        onCancel={hideModalAddEdit}
        onCreate={submitModalAddEdit}
        dataModalAddEdit={dataModalAddEdit}
        DanhSachTaoCuoc={DanhSachTaoCuoc}
        key={modalKey}
        filterData={filterData}
        FileLimit={FileLimit}
        action={action}
        selectedYear={selectedYear}
        setDoiTuongTT={setDoiTuongTT}
        DoiTuongTT={defaultDoiTuongTT}
        PhanLoaiThanhTraID1={PhanLoaiThanhTraID1}
        PhanLoaiThanhTraID2={PhanLoaiThanhTraID2}
        DanhSachDoiTuongThanhTra={DanhSachDoiTuongThanhTra}
      />
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
        defaultNamThanhTra={
          filterData.NamThanhTra ? filterData.NamThanhTra : defaultNamThanhTra
        }
        DoiTuongTT={defaultDoiTuongTT}
        ListAgencyTw={ListAgencyTw}
        DoiTuongTTDotXuat={DoiTuongTTDotXuat}
        dataModalAddEdit={dataModalAddEdit}
        DanhSachDoiTuongThanhTra={DanhSachDoiTuongThanhTra}
      />
      <ModalHuyCuoc
        confirmLoading={confirmLoading}
        visible={visibleHuyCuoc}
        onCancel={hideModalAddEdit}
        onCreate={HuyCuoc}
        DanhSachDoiTuongThanhTra={DanhSachDoiTuongThanhTra}
        key={modalKey}
        CuocThanhTraID={CuocThanhTraID}
        action={action}
        defaultNamThanhTra={defaultNamThanhTra}
        ListHinhThuc={ListHinhThuc}
      />
    </LayoutWrapper>
  );
};
function mapStateToProps(state) {
  return {
    ...state.TaoCuocThanhTraKiemTra,
    FileLimit: getConfigLocal("fileLimit", 10),
  };
}
export default connect(mapStateToProps, actions)(TaoCuocThanhTraKiemTra);
