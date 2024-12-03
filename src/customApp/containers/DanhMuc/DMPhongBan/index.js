import { Modal, Table, Tooltip, message, Checkbox, Row, Col, Tree } from "antd";
import actions from "../../../redux/DanhMuc/DMPhongBan/actions";
import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import LayoutWrapper from "../../../../components/utility/layoutWrapper";
import PageHeader from "../../../../components/utility/pageHeader";
import PageAction from "../../../../components/utility/pageAction";
import Box from "../../../../components/utility/box";
import BoxFilter from "../../../../components/utility/boxFilter";
import BoxTable from "../../../../components/utility/boxTable";
import {
  Button,
  InputSearch,
  Option,
  Select,
} from "../../../../components/uielements/exportComponent";
import {
  changeUrlFilter,
  exportExcel,
  formatDataTreeKhieuTo,
  getDefaultPageSize,
  getFilterData,
  getRoleByKey,
} from "../../../../helpers/utility";
import { useKey } from "../../../CustomHook/useKey";
import queryString from "query-string";
import api from "./config";
import constantCoQuan from "../../../redux/DanhMuc/DMCoQuan/actions";
import moment from "moment";
import ModalAddEdit from "./modalAddEdit";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { HeaderCQ, TreeCustom } from "./styled";
import DMCoQuan from "../DMCoQuan";
import PageWrap from "../../../../components/utility/PageWrap";
import EditIcon from "../../../../components/utility/EditIcon";
import DeleteIcon from "../../../../components/utility/DeleteIcon";
import AddIcon from "../../../../components/utility/AddIcon";

const DMPhongBan = (props) => {
  document.title = "Danh Mục Phòng Ban";
  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search)
  );
  const [dataModalAddEdit, setDataModalAddEdit] = useState({});
  const [visibleModalAddEdit, setVisibleModalAddEdit] = useState(false);
  const [action, setAction] = useState("");
  const [modalKey, inceaseModalKey] = useKey();
  const [selectedRowsKey, setSelectedRowsKey] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [parent, setParent] = useState("");
  const DanhSachCoQuan = useSelector((state) => state.DMCoQuan.DanhSachCoQuan);

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

  const findParentFromTree = (list, ParentID) => {
    list.forEach((item) => {
      if (item.Children) {
        if (item.ID === ParentID) {
          setParent(item);
        } else {
          findParentFromTree(item.Children, ParentID);
        }
      } else {
        if (item.ID === ParentID) {
          setParent(item);
        }
      }
    });
  };
  const onFilter = (value, property) => {
    let oldFilterData = filterData;
    let onFilter = { value, property };
    let newfilterData = getFilterData(oldFilterData, onFilter, null);
    //get filter data
    setFilterData(newfilterData);
    setSelectedRowsKey([]);

    findParentFromTree(DanhSachCoQuan, value);
  };
  useEffect(() => {
    findParentFromTree(DanhSachCoQuan, parseInt(filterData.CoQuanID));
  }, [DanhSachCoQuan]);
  const showModalAdd = () => {
    if (filterData.CoQuanID) {
      setAction("add");
      setDataModalAddEdit({ props });
      inceaseModalKey();
      setVisibleModalAddEdit(true);
    } else {
      message.error("Chưa chọn cơ quan đơn vị.");
    }
  };

  const deleteModalAddEdit = (PhongBanID) => {
    Modal.confirm({
      title: "Xóa Dữ Liệu",
      content: "Bạn có muốn xóa phòng ban này không?",
      cancelText: "Không",
      okText: "Có",
      onOk: () => {
        setConfirmLoading(true);
        api
          .XoaPhongBan(PhongBanID)
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
    const PhongBanID = id;
    setAction("edit");
    api
      .ChiTietPhongBan({ PhongBanID })
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
    setConfirmLoading(true);
    if (action === "add") {
      api
        .ThemPhongBan(data)
        .then((res) => {
          setConfirmLoading(false);
          if (res.data.Status > 0) {
            message.destroy();
            message.success(res.data.Message);
            onFilter(filterData.CoQuanID, "CoQuanID");
            hideModalAddEdit();
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
        .CapNhatPhongBan(data)
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
            <EditIcon onClick={() => showModalEdit(record.PhongBanID)} />
          </Tooltip>
        ) : (
          ""
        )}
        {role.delete ? (
          <Tooltip title={"Xóa"}>
            <DeleteIcon onClick={() => deleteModalAddEdit(record.PhongBanID)} />
          </Tooltip>
        ) : (
          ""
        )}
      </div>
    );
  };

  const { DanhSachPhongBan, TotalRow, role } = props;
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
      title: "Tên Phòng Ban",
      dataIndex: "TenPhongBan",
      align: "left",
      width: 30,
    },
    {
      title: "Số Điện Thoại",
      dataIndex: "SoDienThoai",
      align: "left",
      width: 15,
    },
    {
      title: "Ghi Chú",
      dataIndex: "GhiChu",
      align: "left",
      width: 30,
    },
    {
      title: "Thao tác",
      width: "15%",
      align: "center",
      render: (text, record) => renderThaoTac(record),
    },
  ];
  const getData = (ID) => {
    onFilter(ID, "CoQuanID");
  };

  return (
    <LayoutWrapper>
      <PageWrap>
        <PageHeader>Danh Mục Phòng Ban</PageHeader>
        <PageAction>
          {role.add ? (
            <Button
              type="add"
              onClick={showModalAdd}
              disabled={filterData.CoQuanID ? false : true}
            >
              <AddIcon />
              Thêm mới
            </Button>
          ) : null}
        </PageAction>
      </PageWrap>
      <Box>
        <Row gutter={[40, 0]}>
          <Col xl={7} md={7} xs={24}>
            <BoxFilter></BoxFilter>
            {/* <Tree showLine treeData={formatDataTreeKhieuTo(dataCoQuan)} height={height} /> */}
            <TreeCustom>
              <DMCoQuan
                dispatch={getData}
                {...props}
                styled={parseInt(filterData.CoQuanID)}
              />
            </TreeCustom>
          </Col>
          <Col xl={17} md={17} xs={24}>
            <HeaderCQ>
              {" "}
              {parent.Ten ? `Danh sách các phòng ban thuộc ${parent.Ten}` : ""}
            </HeaderCQ>
            <BoxTable
              columns={columns}
              dataSource={DanhSachPhongBan}
              onChange={onTableChange}
              pagination={{
                showSizeChanger: true,
                showTotal: (total, range) =>
                  `Từ ${range[0]} đến ${range[1]} trên ${total} kết quả`,
                total: TotalRow,
                current: PageNumber,
                pageSize: PageSize,
              }}
              rowKey={(record) => record.PhongBanID}
            />
          </Col>
        </Row>
      </Box>
      <ModalAddEdit
        visible={visibleModalAddEdit}
        dataEdit={dataModalAddEdit}
        action={action}
        loading={confirmLoading}
        key={modalKey}
        onCreate={submitModalAddEdit}
        onCancel={hideModalAddEdit}
        DanhSachPhongBan={DanhSachPhongBan}
        IDmodal={filterData.CoQuanID}
        CoQuanDonVi={parent.Ten}
      />
    </LayoutWrapper>
  );
};

function mapStateToProps(state) {
  return {
    ...state.DanhMucPhongBan,
    role: getRoleByKey(state.Auth.role, "danh-muc-phong-ban"),
  };
}

export default connect(mapStateToProps, actions)(DMPhongBan);
