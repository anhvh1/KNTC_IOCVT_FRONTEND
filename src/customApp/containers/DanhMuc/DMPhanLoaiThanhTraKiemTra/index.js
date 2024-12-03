import { Modal, Table, Tooltip, message } from "antd";
import actions from "../../../redux/DanhMuc/DMPhanLoaiThanhTraKiemTra/actions";
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
import BreadCrumb from "../../NghiepVu/Shared/Component/BreadCumb";
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
import AddIcon from "../../../../components/utility/AddIcon";
const DMPhanLoaiThanhTra = (props) => {
  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search)
  );
  const [dataModalAddEdit, setDataModalAddEdit] = useState({});
  const [visibleModalAddEdit, setVisibleModalAddEdit] = useState(false);
  const [action, setAction] = useState("");
  const [modalKey, inceaseModalKey] = useKey();
  const [selectedRowsKey, setSelectedRowsKey] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);

  document.title = "Danh mục phân loại thanh tra, kiểm tra";

  useEffect(() => {
    changeUrlFilter(filterData);
    props.getList(filterData);
    PhanLoai();
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

  const deleteModalAddEdit = (PhanLoaiThanhTraID) => {
    Modal.confirm({
      title: "Xóa Dữ Liệu",
      content: "Bạn có muốn xóa chức vụ này không?",
      cancelText: "Không",
      okText: "Có",
      onOk: () => {
        setConfirmLoading(true);
        api
          .XoaPhanLoai({ ListID: [PhanLoaiThanhTraID] })
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
      .ChiTietPhanLoai(id)
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
  const [thanhTra, setThanhTra] = useState({});
  const PhanLoai = () => {
    Promise.all([
      api.GetByKey("ID_PHANLOAI_KIEMTRA"),
      api.GetByKey("ID_PHANLOAI_THANHTRA"),
    ])
      .then(([resKiemTra, resThanhTra]) => {
        if (resKiemTra.data.Status > 0 && resThanhTra.data.Status > 0) {
          setThanhTra({
            kiemTra: resKiemTra.data.Data.ConfigValue,
            thanhTra: resThanhTra.data.Data.ConfigValue,
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
  const hideModalAddEdit = () => {
    setSelectedRowsKey([]);
    setDataModalAddEdit({});
    setVisibleModalAddEdit(false);
  };

  const submitModalAddEdit = (data) => {
    setConfirmLoading(true);
    if (action === "add") {
      api
        .ThemPhanLoai(data)
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
        .SuaPhanLoai(data)
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
  const { DanhSachPhanLoai, TotalRow, role } = props;

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
      title: "Tên phân loại thanh tra",
      dataIndex: "TenPhanLoaiThanhTra",
      align: "left",
      width: "40%",
    },
    {
      title: "Tên phân loại cha",
      dataIndex: "ChucNangChaString",
      align: "left",
      width: "40%",
    },
    {
      title: "Thao tác",
      width: "15%",
      align: "center",
      render: (text, record) => {
        if (
          record.PhanLoaiThanhTraID.toString() === thanhTra.kiemTra ||
          record.PhanLoaiThanhTraID.toString() === thanhTra.thanhTra
        ) {
          return <span> </span>;
        }
        return renderThaoTac(record);
      },
    },
  ];
  const renderThaoTac = (record) => {
    return (
      <div className={"action-btn"}>
        {/* {role && role.edit ? ( */}
        <Tooltip title={"Sửa"}>
          <EditIcon onClick={() => showModalEdit(record.PhanLoaiThanhTraID)} />
        </Tooltip>
        {/* ) : ( */}
        {/* ""
        )} */}
        {/* {role && role.delete ? ( */}
        <Tooltip title={"Xóa"}>
          <DeleteIcon
            onClick={() => deleteModalAddEdit(record.PhanLoaiThanhTraID)}
          />
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
          <Button type="add" onClick={showModalAdd} icon={<AddIcon />}>
            Thêm mới
          </Button>
          {/* ) : null} */}
        </div>
      </PageHeader>
      <PageAction className="filter-action">
        <div className="filter-left">
          <InputSearch
            defaultValue={filterData.Keyword}
            placeholder={"Nhập tên loại thanh tra"}
            style={{ width: 300 }}
            onSearch={(value) => onFilter(value, "Keyword")}
            allowClear
          />
        </div>
      </PageAction>
      <Box>
        <BoxTable
          columns={columns}
          dataSource={DanhSachPhanLoai}
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
    ...state.DMPhanLoaiThanhTra,
    role: getRoleByKey(
      state.Auth.role,
      "danh-muc-phan-loai-thanh-tra-kiem-tra"
    ),
  };
}

export default connect(mapStateToProps, actions)(DMPhanLoaiThanhTra);
