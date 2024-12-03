import { Modal, Table, Tooltip, message } from "antd";
import actions from "../../../redux/NghiepVu/QLDonDoc/actions";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import LayoutWrapper from "../../../../components/utility/layoutWrapper";
import EditIcon from "../../../../components/utility/EditIcon";
import DeleteIcon from "../../../../components/utility/DeleteIcon";
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
  formatNoiDung,
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
import AddIcon from "../../../../components/utility/AddIcon";
import BreadCrumb from "../Shared/Component/BreadCumb";
const QLDonDoc = (props) => {
  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search)
  );
  const [dataModalAddEdit, setDataModalAddEdit] = useState({});
  const [visibleModalAddEdit, setVisibleModalAddEdit] = useState(false);
  const [action, setAction] = useState("");
  const [modalKey, inceaseModalKey] = useKey();
  const [selectedRowsKey, setSelectedRowsKey] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);

  document.title = "Quản lý đôn đốc thực hiện kết luận TTKT";

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

  const deleteModalAddEdit = (DonDocID) => {
    Modal.confirm({
      title: "Xóa Dữ Liệu",
      content: "Bạn có muốn xóa chức vụ này không?",
      cancelText: "Không",
      okText: "Có",
      onOk: () => {
        setConfirmLoading(true);
        api
          .XoaDonDoc({ DonDocID: DonDocID })
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
    setAction("edit");
    api
      .ChiTietDonDoc(id)
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
        .ThemDonDoc(data)
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
        .SuaDonDoc(data)
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
  const { DanhSachDonDoc, TotalRow, role } = props;
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
      render: (text, record, index) => index + 1,
    },
    {
      title: "Người đôn đốc",
      dataIndex: "NguoiDonDoc",
      align: "left",
      width: "20%",
    },
    {
      title: "Nội dung đôn đốc",
      dataIndex: "NoiDungDonDoc",
      align: "left",
      width: "45%",
      render: (text, record, index) => formatNoiDung(text),
    },
    {
      title: "Ngày đôn đốc",
      dataIndex: "NgayDonDoc",
      align: "center",
      width: "20%",
      render: (text) => moment(text).format("DD/MM/YYYY"),
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
        {/* {role && role.edit ? ( */}
        <Tooltip title={"Sửa"}>
          <EditIcon onClick={() => showModalEdit(record.DonDocId)} />
        </Tooltip>
        {/* ) : (
          ""
        )} */}
        {/* {role && role.delete ? ( */}
        <Tooltip title={"Xóa"}>
          <DeleteIcon onClick={() => deleteModalAddEdit(record.DonDocId)} />
        </Tooltip>
        {/* ) : (
          ""
        )} */}
      </div>
    );
  };
  return (
    <LayoutWrapper>
      <PageHeader>
        <BreadCrumb />
        <div className="filter-right">
          {/* {role.add ? ( */}
          <Button type="add" icon={<AddIcon />} onClick={showModalAdd}>
            Thêm mới
          </Button>
          {/* ) : null} */}
        </div>
      </PageHeader>
      <PageAction className="filter-action">
        <div className="filter-left">
          {/* <InputSearch
            defaultValue={filterData.Keyword}
            placeholder={"Nhập tên lĩnh vực"}
            style={{ width: 300 }}
            onSearch={(value) => onFilter(value, "Keyword")}
            allowClear
          /> */}
        </div>
      </PageAction>
      <Box>
        <BoxTable
          columns={columns}
          dataSource={DanhSachDonDoc}
          onChange={onTableChange}
          pagination={false}
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
      {/* <iframe 
      src="https://ai.gosol.com.vn/chatbot/rNsRgFke1YTLcQvfGfQXT9MbMSpG7KIeRUZ7SZke1mAoSPh-6xb8hxWhNvPBAly4sousm7RaSnrMhIhkoSnKqQ" 
      style={{
        border: 'none',
        position: 'fixed',
        bottom: '30px',
        right: '0px',
        width: '480px',
        height: '550px',
        zIndex: 100000
      }}
    ></iframe> */}
    </LayoutWrapper>
  );
};

function mapStateToProps(state) {
  return {
    ...state.QLDonDoc,
    role: getRoleByKey(state.Auth.role, "quan-ly-don-doc"),
  };
}

export default connect(mapStateToProps, actions)(QLDonDoc);
