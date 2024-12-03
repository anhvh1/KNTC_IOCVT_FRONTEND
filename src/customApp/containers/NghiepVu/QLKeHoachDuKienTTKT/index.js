import React, { Component, useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import axios from "axios";
import {
  getListYear,
  handleRenderTrangThai,
  renderTrangThaiColor,
} from "../../../../helpers/utility";
import queryString from "query-string";
import actions from "../../../redux/NghiepVu/QLKeHoachDuKienTTKT/actions";
import api, { apiUrl } from "./config";
import Constants from "../../../../settings/constants";
import { Link } from "react-router-dom";
import moment from "moment";
import CloudDownloadIcon from "../../../../components/utility/CloudDownloadIcon";
import FlyIcon from "../../../../components/utility/FlyIcon";
import LayoutWrapper from "../../../../components/utility/layoutWrapper";
import PageHeader from "../../../../components/utility/pageHeader";
import PageAction from "../../../../components/utility/pageAction";
import Box from "../../../../components/utility/box";
import BoxFilter from "../../../../components/utility/boxFilter";
import BoxTable from "../../../../components/utility/boxTable";
import actionsSidebar from "../../../redux/HeThong/Sidebar/actions";
import { ModalAddEdit } from "./modalAddEdit";
import BreadCrumb from "../Shared/Component/BreadCumb";
import {
  Modal,
  message,
  Input,
  Switch,
  Tooltip,
  Checkbox,
  DatePicker,
} from "antd";
import Button from "../../../../components/uielements/button";
import Select, { Option } from "../../../../components/uielements/select";
import {
  changeUrlFilter,
  getFilterData,
  getDefaultPageSize,
  getConfigLocal,
} from "../../../../helpers/utility";
import { formDataCaller } from "../../../../api/formDataCaller";
import {
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  FileAddOutlined,
  PlusOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useKey } from "../../../CustomHook/useKey";
import PageWrap from "../../../../components/utility/PageWrap";
import { InputSearch } from "../../../../components/uielements/input";
import dayjs from "dayjs";
import { saveAs } from "file-saver";
const QLKeHoachDuKienTTKT = (props) => {
  document.title = "Quản lý kế hoạch dự kiến TTKT";
  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search)
  );
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalKey, increaseKey] = useKey();
  const [visibleModalAddEdit, setVisibleModalAddEdit] = useState(false);
  const { ListSideBar } = useSelector((state) => state.ListSideBar);
  const [dataModalAddEdit, setDataModalAddEdit] = useState({});
  const [action, setAction] = useState("");
  const dispatch = useDispatch();
  // useEffect(() => {
  //   // const currentYear = dayjs().year() + 1;
  //   const currentYear = dayjs().year();

  //   setFilterData({ NamThanhTra: currentYear });
  // }, []);
  useEffect(() => {
    // dispatch(actions.getInitData(filterData));
    dispatch(actionsSidebar.getList());
  }, [filterData]);

  useEffect(() => {
    changeUrlFilter(filterData); //change url
    // props.getList(filterData); //get list
    dispatch(
      actions.getList({
        ...filterData,
        // TypeKeHoach: defaultTypeKeHoach,
        NamThanhTra: defaultNamThanhTra,
        // DoiTuongTT: defaultDoiTuongTT,
      })
    );
  }, [filterData]);
  const ListYear = getListYear();
  const defaultYear = ListYear ? ListYear[ListYear.length - 1].id : null;
  const defaultNamThanhTra = filterData?.NamThanhTra
    ? filterData.NamThanhTra
    : defaultYear;
  const onFilter = (value, property) => {
    //get filter data
    let oldFilterData = { ...filterData };
    let onFilter = { value, property };
    let newFilterData = getFilterData(oldFilterData, onFilter, null);
    setFilterData(newFilterData);
    if (property === "NamThanhTra") {
      setSelectedYear(value); // Store the selected year
    }
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
  const showModalAdd = () => {
    setDataModalAddEdit({});
    setVisibleModalAddEdit(true);
    increaseKey();
    setAction("add");
  };

  const submitModalAddEdit = (data, FileData) => {
    setConfirmLoading(true);

    if (action === "add") {
      const formSave = new FormData();
      formSave.append("files", FileData);
      formSave.append("quanlythutucStr", JSON.stringify(data));

      formDataCaller(apiUrl.themTienHanh, formSave)
        .then((response) => {
          setConfirmLoading(false);
          if (response.data.Status > 0) {
            //message success
            message.success("Thêm thành công");
            //hide modal
            hideModalAddEdit();
            //reset page
            dispatch(actions.getList(filterData));
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
      formSave.append("quanlythutucStr", JSON.stringify(data));
      // if (FileData.name) {
      formSave.append("files", FileData);
      // }
      formDataCaller(apiUrl.suaTienHanh, formSave)
        .then((response) => {
          setConfirmLoading(false);
          if (response.data.Status > 0) {
            //message success
            message.success("Cập nhật thành công");
            //hide modal
            hideModalAddEdit();
            //reset page
            dispatch(actions.getList(filterData));
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
  const [CoQuanLapID, setCoQuanLapID] = useState("");
  const [TenCoQuan, setTenCoQuan] = useState("");

  const showModalEdit = (DoiTuongTT, NamThanhTra, CoQuanLapID) => {
    setAction("edit");
    api
      .chiTietKHDuKien(DoiTuongTT, NamThanhTra, CoQuanLapID)
      .then((res) => {
        if (res.data.Status > 0) {
          setDataModalAddEdit(res.data.Data);
          increaseKey();
          setVisibleModalAddEdit(true);
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
  const showModalEdit1 = (DoiTuongTT, NamThanhTra, CoQuanLapID) => {
    setAction("edit");
    api
      .chiTietKHDuKien(DoiTuongTT, NamThanhTra, CoQuanLapID)
      .then((res) => {
        if (res.data.Status > 0) {
          setDataModalAddEdit(res.data.Data);
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
  const hideModalAddEdit = () => {
    setVisibleModalAddEdit(false);
    setDataModalAddEdit({});
  };
  const { DanhSachKHDuKien, TotalRow, role, TotalUnit } = props;
  const PageNumber = filterData.PageNumber
    ? parseInt(filterData.PageNumber)
    : 1;
  const PageSize = filterData.PageSize
    ? parseInt(filterData.PageSize)
    : getDefaultPageSize();
  const EditPlan = (KeHoachThanhTraID) => {
    Modal.confirm({
      title: "Chỉnh sửa dữ liệu",
      content: " Bạn có muốn chỉnh sửa dữ liệu này không?",
      cancelText: "Không",
      okText: "Đồng ý",

      onOk: () => {
        api
          .suaKHDuKien(KeHoachThanhTraID)
          .then((response) => {
            if (response.data.Status > 0) {
              //message success
              message.success(response.data.Message);
              //reset page
              dispatch(actions.getList(filterData));
              dispatch(actions.getGuild());
            } else {
              Modal.error({
                content: response.data.Message,
                okText: "Đóng",
              });
            }
          })
          .catch((error) => {
            Modal.error(Constants.API_ERROR);
          });
      },
    });
  };
  const CheckPBTTChuaGuiKH = (KeHoachThanhTraID) => {
    api
      .CheckPBTTChuaGuiKH(KeHoachThanhTraID)
      .then((response) => {
        if (response.data.Status > 0) {
          // Prepare message with line breaks
          const messageContent = (
            <>
              {response.data.Message.split("|").map((line, index) => (
                <span key={index}>
                  {line}
                  <br />
                </span>
              ))}
              <span>Bạn có muốn chuyển tổng hợp không?</span>
            </>
          );
          Modal.confirm({
            title: "Thông báo",
            content: messageContent,
            cancelText: "Không",
            okText: "Đồng ý",
            width: "550px",
            onOk: () => {
              TransferPlan(selectedKeHoachThanhTraIDs); // Call TransferPlan on OK
            },
          });
        } else {
          Modal.error({
            content: response.data.Message,
            okText: "Đóng",
          });
        }
      })
      .catch((error) => {
        Modal.error(Constants.API_ERROR);
      });
  };
  const TransferPlan = (KeHoachThanhTraID) => {
    Modal.confirm({
      title: "Chuyển cuộc",
      content: " Bạn có muốn chuyển cuộc này không?",
      cancelText: "Không",
      okText: "Đồng ý",
      onOk: () => {
        api
          .chuyencuocKHDuKien(KeHoachThanhTraID)
          .then((response) => {
            if (response.data.Status > 0) {
              //message success
              message.success(response.data.Message);
              //reset page
              dispatch(actions.getList(filterData));
              dispatch(actions.getGuild());
            } else {
              Modal.error({
                content: response.data.Message,
                okText: "Đóng",
              });
            }
          })
          .catch((error) => {
            Modal.error(Constants.API_ERROR);
          });
      },
    });
  };
  const access_token = localStorage.getItem("access_token");
  const DownloadFile = async () => {
    try {
      const response = await axios.get(
        `${apiUrl.downloadfile}?namThanhTra=${defaultNamThanhTra}`,
        {
          responseType: "blob", // Important: responseType as blob
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        }
      );

      if (response.status === 200) {
        const blob = new Blob([response.data], {
          type: response.headers["content-type"],
        });
        saveAs(blob, "ExportCoQuanChuaLKHDT.xlsx");
      } else {
        console.error("Error downloading the file:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const [isSelectAll, setIsSelectAll] = useState(false);
  const [StateID, setStateID] = useState(false);
  const [selectedKeHoachThanhTraIDs, setSelectedKeHoachThanhTraIDs] = useState(
    []
  );
  const handleCheckboxChange = (checked, record) => {
    if (checked) {
      setSelectedKeHoachThanhTraIDs((prev) => [
        ...prev,
        record.KeHoachThanhTraID,
      ]); // Add the ID to the array
    } else {
      setSelectedKeHoachThanhTraIDs(
        (prev) => prev.filter((id) => id !== record.KeHoachThanhTraID) // Remove the ID if unchecked
      );
    }
  };
  const handleSelectAllChange = (checked) => {
    setIsSelectAll(checked);
    if (checked) {
      // Select all IDs
      const allIDs = DanhSachKHDuKien.map((item) => item.KeHoachThanhTraID);
      setSelectedKeHoachThanhTraIDs(allIDs);
    } else {
      // Deselect all
      setSelectedKeHoachThanhTraIDs([]);
    }
  };
  const columns = [
    {
      title: (
        <Checkbox
          checked={isSelectAll}
          onChange={(e) => handleSelectAllChange(e.target.checked)}
        />
      ), // Add checkbox in the table header for selecting all rows
      align: "center",
      width: "5%",
      render: (text, record) => (
        <Checkbox
          checked={selectedKeHoachThanhTraIDs.includes(
            record.KeHoachThanhTraID
          )}
          onChange={(e) => {
            handleCheckboxChange(e.target.checked, record);
            setStateID(record?.StateID);
          }}
        />
      ),
    },
    {
      title: "STT",
      align: "center",
      width: "5%",
      render: (text, record, index) => (
        <span>{(PageNumber - 1) * PageSize + (index + 1)}</span>
      ),
    },
    {
      title: "Đơn vị",
      dataIndex: "TenCoQuan",
      width: "40%",
    },
    {
      title: "Ngày gửi",
      dataIndex: "NgayGui",
      width: "20%",
      align: "center",
      render: (text) => (text ? dayjs(text).format("DD-MM-YYYY") : ""),
    },
    {
      title: "Trạng thái",
      dataIndex: "StateName",
      width: "180px",
      align: "center",
      render: (text) =>
        text ? (
          <div className="wrap-state">{renderTrangThaiColor(text)}</div>
        ) : (
          ""
        ),
    },
    {
      title: "Thao tác",
      width: "10%",
      align: "center",
      render: (text, record) => renderThaoTac(record),
    },
  ];
  const renderThaoTac = (record) => {
    return (
      <div className={"action-btn"}>
        {/* {role.edit ? ( */}
        {record?.StateID <= 300 && (
          <Tooltip title={"Chỉnh sửa"}>
            <svg
              onClick={() => EditPlan(record.KeHoachThanhTraID)}
              color="#3B9EC8"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-reply-all"
              viewBox="0 0 16 16"
            >
              <path d="M8.098 5.013a.144.144 0 0 1 .202.134V6.3a.5.5 0 0 0 .5.5c.667 0 2.013.005 3.3.822.984.624 1.99 1.76 2.595 3.876-1.02-.983-2.185-1.516-3.205-1.799a8.7 8.7 0 0 0-1.921-.306 7 7 0 0 0-.798.008h-.013l-.005.001h-.001L8.8 9.9l-.05-.498a.5.5 0 0 0-.45.498v1.153c0 .108-.11.176-.202.134L4.114 8.254l-.042-.028a.147.147 0 0 1 0-.252l.042-.028zM9.3 10.386q.102 0 .223.006c.434.02 1.034.086 1.7.271 1.326.368 2.896 1.202 3.94 3.08a.5.5 0 0 0 .933-.305c-.464-3.71-1.886-5.662-3.46-6.66-1.245-.79-2.527-.942-3.336-.971v-.66a1.144 1.144 0 0 0-1.767-.96l-3.994 2.94a1.147 1.147 0 0 0 0 1.946l3.994 2.94a1.144 1.144 0 0 0 1.767-.96z" />
              <path d="M5.232 4.293a.5.5 0 0 0-.7-.106L.54 7.127a1.147 1.147 0 0 0 0 1.946l3.994 2.94a.5.5 0 1 0 .593-.805L1.114 8.254l-.042-.028a.147.147 0 0 1 0-.252l.042-.028 4.012-2.954a.5.5 0 0 0 .106-.699" />
            </svg>
          </Tooltip>
        )}
        {record?.StateID < 300 && (
          <Tooltip title={"Chuyển sang tổng hợp"}>
            <svg
              onClick={() => TransferPlan([record.KeHoachThanhTraID])}
              color="#216FCA"
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-cursor-fill"
              viewBox="0 0 16 16"
            >
              <path d="M14.082 2.182a.5.5 0 0 1 .103.557L8.528 15.467a.5.5 0 0 1-.917-.007L5.57 10.694.803 8.652a.5.5 0 0 1-.006-.916l12.728-5.657a.5.5 0 0 1 .556.103z" />
            </svg>
          </Tooltip>
        )}

        <Tooltip title={"Chi tiết"}>
          <svg
            onClick={() => {
              setCoQuanLapID(record.CoQuanLapID); // Save CoQuanLapID
              showModalEdit(DoiTuongTT, defaultNamThanhTra, record.CoQuanLapID);
              setTenCoQuan(record.TenCoQuan);
            }}
            color="#63C6B3"
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            class="bi bi-eye"
            viewBox="0 0 16 16"
          >
            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z" />
            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0" />
          </svg>
        </Tooltip>
        {/* ) : (
          ''
        )} */}
      </div>
    );
  };
  const { FileLimit } = props;
  const [selectedYear, setSelectedYear] = useState(dayjs().format("YYYY"));
  return (
    <LayoutWrapper>
      <PageHeader>
        <BreadCrumb />
        <div className="filter-right">
          <Button
            icon={<FlyIcon />}
            disabled={selectedKeHoachThanhTraIDs.length === 0}
            onClick={() => CheckPBTTChuaGuiKH(selectedKeHoachThanhTraIDs)}
            type="secondary"
          >
            {/* Chuyển kế hoạch */}
            Chuyển tổng hợp
          </Button>
          <Button
            type="dowloadlist"
            icon={<CloudDownloadIcon />}
            onClick={DownloadFile}
          >
            Xuất danh sách đơn vị chưa lập KH
          </Button>
        </div>
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
          <InputSearch
            allowClear={true}
            defaultValue={filterData.Keyword}
            placeholder="Nhập đối tượng, nội dung để tìm kiếm"
            onSearch={(value) => onFilter(value, "Keyword")}
            style={{ width: 300 }}
          />
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
          Danh sách các đơn vị đã gửi kế hoạch thanh tra, kiểm tra năm{" "}
          {defaultNamThanhTra}
        </div>
        <div
          style={{
            fontFamily: "Roboto",
            fontSize: "12px",
            fontWeight: 400,
            lineHeight: "14.06px",
            textAlign: "left",
            color: "#D92626",
            marginTop: "25px",
            marginBottom: "10px",
          }}
        >
          Có {TotalUnit} cơ quan chưa trình dự thảo kế hoạch
        </div>
        <BoxTable
          columns={columns}
          // rowKey="HuongDanSuDungID"
          dataSource={DanhSachKHDuKien}
          loading={props.TableLoading}
          onChange={onTableChange}
          pagination={{
            showSizeChanger: true, //show text: PageSize/page
            showTotal: (total, range) =>
              `Từ ${range[0]} đến ${range[1]} trên ${total} kết quả`,
            total: TotalRow,
            current: PageNumber, //current page
            pageSize: PageSize,
          }}
        />
      </Box>
      <ModalAddEdit
        confirmLoading={confirmLoading}
        visible={visibleModalAddEdit}
        onCancel={hideModalAddEdit}
        onCreate={submitModalAddEdit}
        dataModalAddEdit={dataModalAddEdit}
        DanhSachKHDuKien={DanhSachKHDuKien}
        key={modalKey}
        filterData={filterData}
        FileLimit={FileLimit}
        action={action}
        showModalEdit={showModalEdit1}
        defaultNamThanhTra={defaultNamThanhTra}
        setDoiTuongTT={setDoiTuongTT}
        CoQuanLapID={CoQuanLapID}
        DoiTuongTT={DoiTuongTT}
        TenCoQuan={TenCoQuan}
      />
    </LayoutWrapper>
  );
};

function mapStateToProps(state) {
  return {
    ...state.QLKeHoachDuKienTTKT,
    FileLimit: getConfigLocal("fileLimit", 10),
  };
}

export default connect(mapStateToProps, actions)(QLKeHoachDuKienTTKT);
