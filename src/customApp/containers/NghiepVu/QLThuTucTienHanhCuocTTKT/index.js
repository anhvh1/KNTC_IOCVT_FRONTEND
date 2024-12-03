import React, { Component, useEffect, useState } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import axios from "axios";
import queryString from "query-string";
import actions from "../../../redux/NghiepVu/QLThuTucTienHanhCuocTTKT/actions";
import api, { apiUrl } from "./config";
import Constants from "../../../../settings/constants";
import { Link } from "react-router-dom";
import moment from "moment";
import EditIcon from "../../../../components/utility/EditIcon";
import DeleteIcon from "../../../../components/utility/DeleteIcon";
import LayoutWrapper from "../../../../components/utility/layoutWrapper";
import PageHeader from "../../../../components/utility/pageHeader";
import PageAction from "../../../../components/utility/pageAction";
import Box from "../../../../components/utility/box";
import BoxFilter from "../../../../components/utility/boxFilter";
import BoxTable from "../../../../components/utility/boxTable";
import actionsSidebar from "../../../redux/HeThong/Sidebar/actions";
import { ModalAddEdit } from "./modalAddEdit";
import { Modal, message, Input, Switch, Tooltip } from "antd";
import Button from "../../../../components/uielements/button";
import Select, { Option } from "../../../../components/uielements/select";
import {
  changeUrlFilter,
  getFilterData,
  getDefaultPageSize,
  getConfigLocal,
  getRoleByKey,
} from "../../../../helpers/utility";
import { formDataCaller } from "../../../../api/formDataCaller";
import BreadCrumb from "../Shared/Component/BreadCumb";
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
import AddIcon from "../../../../components/utility/AddIcon";

const QLThuTucTienHanhCuocTTKT = (props) => {
  document.title = "Quản lý tiến hành cuộc TTKT";
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
  useEffect(() => {
    dispatch(actions.getInitData(filterData));
    dispatch(actionsSidebar.getList());
  }, []);

  useEffect(() => {
    changeUrlFilter(filterData); //change url
    props.getList(filterData); //get list
  }, [filterData]);

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

  //Delete-----------------------------------------------------
  const deleteModalAddEdit = (ThuTucId) => {
    Modal.confirm({
      title: "Xóa dữ liệu",
      content: " Bạn có muốn xóa file thủ tục này không?",
      cancelText: "Không",
      okText: "Có",

      onOk: () => {
        api
          .xoaTienHanh({ ThuTucId: ThuTucId })
          .then((response) => {
            if (response.data.Status > 0) {
              //message success
              message.success("Xóa thành công");
              //reset page
              dispatch(actions.getList(filterData));
              dispatch(actions.getGuild());
            } else {
              Modal.error({
                title: "Lỗi",
                content: response.data.Message,
              });
            }
          })
          .catch((error) => {
            Modal.error(Constants.API_ERROR);
          });
      },
    });
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
  const downloadData = async (record) => {
    try {
      const baovatquocgia = await api.downloadFile({
        ID: record.ThuTucId,
      });

      if (baovatquocgia && baovatquocgia.data.Status > 0) {
        const Data = baovatquocgia.data.Data;
        if (Data.UrlFile && Data.UrlFile !== "") {
          const link = document.createElement("a");
          link.href = Data.UrlFile;
          link.download = Data.TenFileGoc;
          link.target = "_blank";
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
        }
      } else {
        message.error("Không có dữ liệu");
      }
    } catch (error) {}
  };
  const showModalEdit = (ThuTucId) => {
    setAction("edit");
    api
      .chiTietTienHanh(ThuTucId)
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
  const hideModalAddEdit = () => {
    setVisibleModalAddEdit(false);
    setDataModalAddEdit({});
  };
  const { DanhSachTienHanh, TotalRow, role } = props;

  //paging info
  const PageNumber = filterData.PageNumber
    ? parseInt(filterData.PageNumber)
    : 1;
  const PageSize = filterData.PageSize
    ? parseInt(filterData.PageSize)
    : getDefaultPageSize();
  //format table
  const iconStyle = { fontSize: 20, cursor: "pointer", margin: "0 10px" };
  const iconStyleDisable = {
    fontSize: 20,
    cursor: "default",
    margin: "0 10px",
    color: "grey",
  };
  const columns = [
    {
      title: "STT",
      align: "center",
      width: "5%",
      render: (text, record, index) => (
        <span>{(PageNumber - 1) * PageSize + (index + 1)}</span>
      ),
    },
    {
      title: "Tên thủ tục",
      dataIndex: "TenThuTuc",
      width: "20%",
    },
    {
      title: "Các bước thực hiện",
      dataIndex: "ListBuocThuTuc",
      width: "20%",
      render: (text, record) => (
        <ul>
          {record.ListBuocThuTuc.map((step) => (
            <li key={step.BuocId}>
              {step.TenBuoc}
              <br></br> {step.NoiDung}
            </li>
          ))}
        </ul>
      ),
    },

    {
      title: "Tệp đính kèm",
      dataIndex: "TenFile",
      width: "15%",
      render: (text, record) => (
        <a href={record.UrlFile} target="_blank" rel="noopener noreferrer">
          {record.TenFile}
        </a>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "TrangThai",
      width: "180px",
      render: (text, record) => (
        <span>{record.TrangThai ? "Đã duyệt" : "Chưa duyệt"}</span>
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
        {role && role.edit ? (
          <Tooltip title={"Sửa"}>
            <EditIcon onClick={() => showModalEdit(record.ThuTucId)} />
          </Tooltip>
        ) : (
          ""
        )}
        {role && role.delete ? (
          <Tooltip title={"Xóa"}>
            <DeleteIcon onClick={() => deleteModalAddEdit(record.ThuTucId)} />
          </Tooltip>
        ) : (
          ""
        )}
      </div>
    );
  };

  const { FileLimit } = props;
  return (
    <LayoutWrapper>
      <PageHeader>
        <BreadCrumb />
        <div className="filter-right">
          {role.add ? (
            <Button type="add" icon={<AddIcon />} onClick={showModalAdd}>
              Thêm mới
            </Button>
          ) : null}
        </div>
      </PageHeader>
      <PageAction className="filter-action">
        <div className="filter-left">
          <InputSearch
            allowClear={true}
            defaultValue={filterData.Keyword}
            placeholder="Nhập thủ tục muốn tìm kiếm"
            onSearch={(value) => onFilter(value, "Keyword")}
            style={{ width: 300 }}
          />
        </div>
      </PageAction>
      <Box>
        <BoxTable
          columns={columns}
          // rowKey="HuongDanSuDungID"
          dataSource={DanhSachTienHanh}
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
        key={modalKey}
        FileLimit={FileLimit}
        action={action}
      />
    </LayoutWrapper>
  );
};
function mapStateToProps(state) {
  return {
    ...state.QLThuTucTienHanhCuocTTKT,
    FileLimit: getConfigLocal("fileLimit", 10),
    role: getRoleByKey(state.Auth.role, "quan-ly-thu-tuc"),
  };
}
export default connect(mapStateToProps, actions)(QLThuTucTienHanhCuocTTKT);
