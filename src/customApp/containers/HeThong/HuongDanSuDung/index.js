import { Modal, Table, Tooltip, message } from "antd";
import actions from "../../../redux/HeThong/HuongDanSuDung/actions";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import LayoutWrapper from "../../../../components/utility/layoutWrapper";
import PageHeader from "../../../../components/utility/pageHeader";
import PageAction from "../../../../components/utility/pageAction";
import Box from "../../../../components/utility/box";
import BoxFilter from "../../../../components/utility/boxFilter";
import BoxTable from "../../../../components/utility/boxTable";
import Checkbox from "../../../../components/uielements/checkbox";

import Select from "../../../../components/uielements/select";

import {
  Button,
  InputSearch,
} from "../../../../components/uielements/exportComponent";
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
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  DownloadOutlined,
} from "@ant-design/icons";
import PageWrap from "../../../../components/utility/PageWrap";
import EditIcon from "../../../../components/utility/EditIcon";
import DeleteIcon from "../../../../components/utility/DeleteIcon";
import AddIcon from "../../../../components/utility/AddIcon";
const HuongDanSuDung = (props) => {
  document.title = "Hướng dẫn sử dụng";

  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search)
  );
  const [dataModalAddEdit, setDataModalAddEdit] = useState({});
  const [visibleModalAddEdit, setVisibleModalAddEdit] = useState(false);
  const [action, setAction] = useState("");
  const [modalKey, inceaseModalKey] = useKey();
  const [selectedRowsKey, setSelectedRowsKey] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);

  useEffect(() => {
    changeUrlFilter(filterData);
    props.getList(filterData);
  }, [filterData]);
  useEffect(() => {
    props.getList(filterData);
  }, []);

  const onFilter = (value, property) => {
    let oldFilterData = filterData;
    let onFilter = { value, property };
    let newfilterData = getFilterData(oldFilterData, onFilter, null);
    //get filter data
    setFilterData(newfilterData);
    setSelectedRowsKey([]);
  };

  const onTableChange = (pagination, filters, sorter) => {
    let oldFilterData = filterData;
    let onOrder = { pagination, filters, sorter };
    let newFilterData = getFilterData(oldFilterData, null, onOrder);

    setFilterData(newFilterData);
    setSelectedRowsKey([]);
  };
  const showModalAdd = () => {
    setAction("add");
    setDataModalAddEdit({});
    inceaseModalKey();
    setVisibleModalAddEdit(true);
  };

  const deleteModalAddEdit = (HuongDanSuDungID) => {
    Modal.confirm({
      title: "Xóa Dữ Liệu",
      content: "Bạn có muốn xóa hướng dẫn này không?",
      cancelText: "Không",
      okText: "Có",
      onOk: () => {
        setConfirmLoading(true);
        api
          .XoaHuongDanSuDung(HuongDanSuDungID)
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

  const showModalEdit = (id) => {
    const HuongDanSuDungID = id;
    setAction("edit");
    api
      .ChiTietHuongDanSuDung({ HuongDanSuDungID })
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
    setAction("");
    setSelectedRowsKey([]);
    setDataModalAddEdit({});
    setVisibleModalAddEdit(false);
  };

  const submitModalAddEdit = (data) => {
    const formSave = new FormData();
    formSave.append("files", data.files);
    formSave.append("HuongDanSuDungModelStr", data.HuongDanSuDungModelStr);
    setConfirmLoading(true);
    if (action === "add") {
      api
        .ThemHuongDanSuDung(data)
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
        .CapNhatHuongDanSuDung(data)
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

  const renderThaoTac = (record) => {
    return (
      <div className={"action-btn"}>
        {role.edit ? (
          <Tooltip title={"Sửa"}>
            <EditIcon onClick={() => showModalEdit(record.HuongDanSuDungID)} />
          </Tooltip>
        ) : null}
        {role.delete ? (
          <Tooltip title={"Xóa"}>
            <DeleteIcon
              onClick={() => deleteModalAddEdit(record.HuongDanSuDungID)}
            />
          </Tooltip>
        ) : null}
        <Tooltip>
          {record.Link === "" ? (
            <a>
              <DownloadOutlined />
            </a>
          ) : (
            <a
              href={`${record.Link}`}
              style={{ paddingLeft: 10, color: "#4d4d33" }}
            >
              <DownloadOutlined />
            </a>
          )}
        </Tooltip>
      </div>
    );
  };

  const { HuongDanSuDung, TotalRow, role } = props;
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
        <span
          style={record.ChucNangChaID === null ? { fontWeight: "600" } : {}}
        >
          {(PageNumber - 1) * PageSize + (index + 1)}
        </span>
      ),
    },
    {
      title: "Tên chức năng",
      dataIndex: "TenChucNang",
      align: "left",
      width: "20%",
      render: (_, record) => {
        return (
          <span
            style={record.ChucNangChaID === null ? { fontWeight: "600" } : {}}
          >
            {record.TenChucNang}
          </span>
        );
      },
    },
    {
      title: "Tiêu đề hướng dẫn",
      dataIndex: "TieuDe",
      align: "left",
      width: "25%",
      render: (_, record) => {
        return (
          <span
            style={record.ChucNangChaID === null ? { fontWeight: "600" } : {}}
          >
            {record.TieuDe}
          </span>
        );
      },
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "NgayCapNhat",
      align: "left",
      width: "15%",
      render: (_, record) => {
        return (
          <span
            style={record.ChucNangChaID === null ? { fontWeight: "600" } : {}}
          >
            {record.NgayCapNhat}
          </span>
        );
      },
    },
    {
      title: "Thao tác",
      width: "10%",
      align: "center",
      render: (text, record) => renderThaoTac(record),
    },
  ];

  return (
    <LayoutWrapper>
      <PageWrap>
        <PageHeader>hướng dẫn sử dụng</PageHeader>
        <PageAction>
          {role ? (
            role.add ? (
              <Button type="add" onClick={showModalAdd}>
                <AddIcon />
                Thêm mới
              </Button>
            ) : (
              ""
            )
          ) : (
            ""
          )}
        </PageAction>
      </PageWrap>
      <Box>
        <BoxFilter>
          <Select
            allowClear
            showSearch
            onChange={(value) => onFilter(value, "HuongDanSuDungID")}
            value={filterData.HuongDanSuDungID}
            placeholder="Chọn nhóm chức năng"
            style={{ width: 200 }}
          >
            {HuongDanSuDung?.map((value) => (
              <Option
                key={value.HuongDanSuDungID}
                value={value.HuongDanSuDungID.toString()}
              >
                {value.TenChucNang}
              </Option>
            ))}
          </Select>
          <InputSearch
            allowClear
            defaultValue={filterData.KeyWord}
            placeholder={"Tìm kiếm theo tên chức năng"}
            style={{ width: 300 }}
            onSearch={(value) => onFilter(value, "KeyWord")}
          />
        </BoxFilter>
        <BoxTable
          size="large"
          columns={columns}
          dataSource={HuongDanSuDung}
          onChange={onTableChange}
          pagination={{
            showSizeChanger: true,
            showTotal: (total, range) =>
              `Từ ${range[0]} đến ${range[1]} trên ${total} kết quả`,
            total: TotalRow,
            current: PageNumber,
            pageSize: PageSize,
          }}
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
        HuongDanSuDung={HuongDanSuDung}
      />
    </LayoutWrapper>
  );
};

function mapStateToProps(state) {
  return {
    ...state.HuongDanSuDung,
    role: getRoleByKey(state.Auth.role, "tai-lieu-huong-dan"),
  };
}

export default connect(mapStateToProps, actions)(HuongDanSuDung);
