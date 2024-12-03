import { Modal, Table, Tooltip, message, Switch } from "antd";
import actions from "../../../redux/DanhMuc/DMKyNghiLe/actions";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import EditIcon from "../../../../components/utility/EditIcon";
import DeleteIcon from "../../../../components/utility/DeleteIcon";
import LayoutWrapper from "../../../../components/utility/layoutWrapper";
import PageHeader from "../../../../components/utility/pageHeader";
import PageAction from "../../../../components/utility/pageAction";
import Box from "../../../../components/utility/box";
import BoxFilter from "../../../../components/utility/boxFilter";
import BoxTable from "../../../../components/utility/boxTable";
import {
  Button,
  InputSearch,
  Select,
} from "../../../../components/uielements/exportComponent";
import Checkbox from "../../../../components/uielements/checkbox";
import Switches from "../../../../components/uielements/switch";
import {
  changeUrlFilter,
  exportExcel,
  getDefaultPageSize,
  getFilterData,
  getRoleByKey,
} from "../../../../helpers/utility";
import { useKey } from "../../../CustomHook/useKey";
import queryString from "query-string";
import api from "./config";
import moment from "moment";
import ModalAddEdit from "./modalAddEdit";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import PageWrap from "../../../../components/utility/PageWrap";
import dayjs from "dayjs";
import AddIcon from "../../../../components/utility/AddIcon";
import BreadCrumb from "../../NghiepVu/Shared/Component/BreadCumb";
const DMKyNghiLe = (props) => {
  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search)
  );
  const [dataModalAddEdit, setDataModalAddEdit] = useState({});
  const [visibleModalAddEdit, setVisibleModalAddEdit] = useState(false);
  const [action, setAction] = useState("");
  const [modalKey, inceaseModalKey] = useKey();
  const [selectedRowsKey, setSelectedRowsKey] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);

  document.title = "Danh Mục Kỳ Nghỉ Lễ";

  useEffect(() => {
    changeUrlFilter(filterData);
    props.getList(filterData);
  }, [filterData]);

  useEffect(() => {
    props.getList(filterData);
  }, []);

  const onTableChange = (pagination, filters, sorter) => {
    let oldFilterData = filterData;
    let onOrder = { pagination, filters, sorter };
    let newFilterData = getFilterData(oldFilterData, null, onOrder);

    setFilterData(newFilterData);
    setSelectedRowsKey([]);
  };

  const onFilter = (value, property) => {
    let oldFilterData = filterData;
    let onFilter = { value, property };
    let newfilterData = getFilterData(oldFilterData, onFilter, null);
    //get filter data
    setFilterData(newfilterData);
    setSelectedRowsKey([]);
  };

  const showModalAdd = () => {
    setAction("add");
    setDataModalAddEdit({});
    inceaseModalKey();
    setVisibleModalAddEdit(true);
  };

  const deleteModalAddEdit = (LeId) => {
    Modal.confirm({
      title: "Xóa Dữ Liệu",
      content: "Bạn có muốn xóa chức vụ này không?",
      cancelText: "Không",
      okText: "Có",
      onOk: () => {
        setConfirmLoading(true);
        api
          .XoaKyNghiLe({ LeId: LeId })
          .then((res) => {
            if (res.data.Status > 0) {
              setConfirmLoading(false);
              props.getList({
                ...filterData,
                PageNumber:
                  Math.ceil((TotalRow - 1) / filterData.PageSize) <
                  filterData.PageNumber
                    ? Math.ceil((TotalRow - 1) / filterData.PageSize)
                    : filterData.PageNumber,
              });
              message.destroy();
              message.success(res.data.Message);
              setFilterData({
                ...filterData,
                PageNumber:
                  Math.ceil((TotalRow - 1) / filterData.PageSize) <
                  filterData.PageNumber
                    ? Math.ceil((TotalRow - 1) / filterData.PageSize)
                    : filterData.PageNumber,
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
      },
    });
  };

  const showModalEdit = (leId) => {
    setAction("edit");
    api
      .ChiTietKyNghiLe(leId)
      .then((res) => {
        if (res.data.Status > 0) {
          setDataModalAddEdit(res.data.Data);
          inceaseModalKey();
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
    setSelectedRowsKey([]);
    setDataModalAddEdit({});
    setVisibleModalAddEdit(false);
  };

  const submitModalAddEdit = (data) => {
    setConfirmLoading(true);
    if (action === "add") {
      api
        .ThemKyNghiLe(data)
        .then((res) => {
          setConfirmLoading(false);
          if (res.data.Status > 0) {
            message.destroy();
            message.success(res.data.Message);
            hideModalAddEdit();
            props.getList(filterData);
          } else {
            setConfirmLoading(false);
            message.destroy();
            message.error(res.data.Message);
          }
        })
        .catch((error) => {
          setConfirmLoading(false);
          message.destroy();
          message.error(error.toString());
        });
    }
    if (action === "edit") {
      api
        .SuaKyNghiLe(data)
        .then((res) => {
          if (res.data.Status > 0) {
            setConfirmLoading(false);
            message.destroy();
            message.success(res.data.Message);
            hideModalAddEdit();
            props.getList(filterData);
          } else {
            setConfirmLoading(false);
            message.destroy();
            message.error(res.data.Message);
          }
        })
        .catch((error) => {
          setConfirmLoading(false);
          message.destroy();
          message.error(error.toString());
        });
    }
  };
  const handleStatusChange = (checked, record) => {
    const updatedData = {
      LeId: record.LeId,
      TenNgayNghi: record.TenNgayNghi,
      TuNgay: record.TuNgay,
      DenNgay: record.DenNgay,
      TrangThai: checked, // The new status
    };
    setConfirmLoading(true);
    api
      .SuaKyNghiLe(updatedData)
      .then((res) => {
        if (res.data.Status > 0) {
          message.destroy();
          message.success(res.data.Message);
          props.getList(filterData); // Refresh the list after successful update
        } else {
          message.destroy();
          message.error(res.data.Message);
        }
        setConfirmLoading(false);
      })
      .catch((error) => {
        message.destroy();
        message.error(error.toString());
        setConfirmLoading(false);
      });
  };

  const { DanhSachKyNghiLe, TotalRow, role } = props;
  const PageNumber = filterData.PageNumber
    ? parseInt(filterData.PageNumber)
    : 1;
  const PageSize = filterData.PageSize
    ? parseInt(filterData.PageSize)
    : getDefaultPageSize();

  const columns = [
    {
      title: "STT",
      width: "5%",
      align: "center",
      render: (text, record, index) => (
        <span>{(PageNumber - 1) * PageSize + (index + 1)}</span>
      ),
    },
    {
      title: "Tên ngày nghỉ",
      dataIndex: "TenNgayNghi",
      align: "left",
      width: "25%",
    },
    {
      title: "Số ngày nghỉ",
      dataIndex: "SoNgayNghi",
      align: "center",
      width: "15%",
    },
    {
      title: "Từ Ngày",
      dataIndex: "TuNgay",
      align: "center",
      width: "15%",
      render: (text) => dayjs(text).format("DD/MM/YYYY"),
    },
    {
      title: "Đến Ngày",
      dataIndex: "DenNgay",
      align: "center",
      width: "15%",
      render: (text) => dayjs(text).format("DD/MM/YYYY"),
    },
    {
      title: "Trạng thái sử dụng",
      dataIndex: "TrangThai",
      align: "center",
      width: "10%",
      render: (text, record) => (
        <Switch
          checked={text}
          onChange={(checked) => handleStatusChange(checked, record)} // Use the handler here
        />
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
            <EditIcon onClick={() => showModalEdit(record.LeId)} />
          </Tooltip>
        ) : (
          ""
        )}
        {role && role.delete ? (
          <Tooltip title={"Xóa"}>
            <DeleteIcon onClick={() => deleteModalAddEdit(record.LeId)} />
          </Tooltip>
        ) : (
          ""
        )}
      </div>
    );
  };
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
            defaultValue={filterData.Keyword}
            placeholder={"Nhập tên ngày nghỉ"}
            style={{ width: 300 }}
            onSearch={(value) => onFilter(value, "Keyword")}
            allowClear
          />
        </div>
      </PageAction>
      <Box>
        <BoxTable
          columns={columns}
          dataSource={DanhSachKyNghiLe}
          onChange={onTableChange}
          pagination={{
            showSizeChanger: true,
            showTotal: (total, range) =>
              `Từ ${range[0]} đến ${range[1]} trên ${total} kết quả`,
            total: TotalRow,
            current: PageNumber,
            pageSize: PageSize,
          }}
          rowKey={(record) => record.ID}
        />
      </Box>
      <ModalAddEdit
        visible={visibleModalAddEdit}
        dataEdit={dataModalAddEdit}
        action={action}
        loading={confirmLoading}
        key={modalKey}
        onCreate={submitModalAddEdit}
        onCancel={hideModalAddEdit}
      />
    </LayoutWrapper>
  );
};

function mapStateToProps(state) {
  return {
    ...state.DMKyNghiLe,
    role: getRoleByKey(state.Auth.role, "danh-muc-ky-nghi-le"),
  };
}

export default connect(mapStateToProps, actions)(DMKyNghiLe);
