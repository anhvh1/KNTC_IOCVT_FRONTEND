import {
  Row,
  Col,
  Modal,
  message,
  Tooltip,
  Layout,
  Typography,
  Switch,
  Input,
  Select,
} from "antd";
import PageHeader from "../../../../components/utility/pageHeader";
import PageAction from "../../../../components/utility/pageAction";
import {
  Button,
  InputSearch,
  Option,
} from "../../../../components/uielements/exportComponent";
// import Menu from "../../../../components/uielements/menu";
import actions from "../../../redux/HeThong/QLNguoiDung/actions";
import actionsCoQuan from "../../../redux/DanhMuc/DMCoQuan/actions";
import actionsChuvVu from "../../../redux/DanhMuc/DMChucVu/actions";
import BreadCrumb from "../../NghiepVu/Shared/Component/BreadCumb";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  PlusCircleOutlined,
  ReloadOutlined,
  UserAddOutlined,
  UpOutlined,
  RollbackOutlined,
} from "@ant-design/icons";
import Box from "../../../../components/utility/box";
import BoxFilter from "../../../../components/utility/boxFilter";
import BoxTable from "../../../../components/utility/boxTable";
import LayoutWrapper from "../../../../components/utility/layoutWrapper";
import { TreeSelect } from "../../../../components/uielements/exportComponent";
import React, { useEffect, useState } from "react";
import EditIcon from "../../../../components/utility/EditIcon";
import DeleteIcon from "../../../../components/utility/DeleteIcon";
import SettingPass from "../../../../components/utility/SettingPass";
import EyeIcon from "../../../../components/utility/EyeIcon";
import {
  changeUrlFilter,
  getConfigLocal,
  getDefaultPageSize,
  getFilterData,
  getRoleByKey,
} from "../../../../helpers/utility";
import queryString from "query-string";
// import queryString from "query-string";
import ModalAddEditUser from "./ModalAddEditUser";
import { useKey } from "../../../CustomHook/useKey";
import Wrapper from "./device.styled";
import { Link } from "react-router-dom";
import { connect, useDispatch, useSelector } from "react-redux";
import apiChucVu from "../../DanhMuc/DMChucVu/config";
import api from "./config";
import moment from "moment";
import PageWrap from "../../../../components/utility/PageWrap";
import AddIcon from "../../../../components/utility/AddIcon";
const { Sider } = Layout;
const { Search } = Input;

const UserManagement = (props) => {
  document.title = "Quản lý người dùng";
  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search)
  );
  const [visibleModalUser, setVisibleModalUser] = useState(false);
  const [keyModalUser, increseKeyModalUser] = useKey();
  const [dataModalUser, setDataModalUser] = useState({});
  const [loading, setLoading] = useState(false);
  const [action, setAction] = useState("");
  const role = useSelector((state) =>
    getRoleByKey(state.Auth.role, "quan-ly-nguoi-dung")
  );
  // const {DanhSachChucVu} = useSelector((state) => state.DanhMucChucVu);
  const dispatch = useDispatch();

  const {
    ListNguoiDung,
    TotalRow,
    tableLoading,
    DanhSachCoQuan,
    DanhSachChucVu,
  } = useSelector((state) => state.QLNguoiDung);

  useEffect(() => {
    dispatch(actions.getInit());
    // dispatch(actionsChuvVu.getList({}));
    // api.GetAllChucVu().then((res) => {
    //   if (res.data.Status > 0) {
    //     setDanhSachChucVu(res.data.Data);
    //   }
    // });
  }, []);

  useEffect(() => {
    changeUrlFilter(filterData); //change url

    dispatch(actions.getList(filterData)); //get list
  }, [filterData]);

  const handleDeleteIUser = (ID) => {
    Modal.confirm({
      title: "Xóa Dữ Liệu",
      content: "Bạn có muốn xóa dữ liệu của người dùng này không?",
      cancelText: "Không",
      okText: "Có",
      onOk: () => {
        api
          .DeleteUser({ ListID: [ID] })
          .then((res) => {
            if (res.data.Status > 0) {
              dispatch(actions.getList(filterData));
              // props.getList(filterData)
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

  const showModalEditUser = (CanBoID, isViewDetail = false) => {
    setAction("edit");
    api
      .DetailsUser({ CanBoID })
      .then((res) => {
        if (res.data.Status > 0) {
          setDataModalUser({ ...res.data.Data, isViewDetail });
          setVisibleModalUser(true);
          increseKeyModalUser();
        } else {
          message.destroy();
          message.warning(res.data.Message);
        }
      })
      .catch((err) => {
        message.destroy();
        message.warning(err.toString());
      });
  };

  const showModalAddUser = () => {
    setAction("add");
    setDataModalUser({});
    increseKeyModalUser();
    setVisibleModalUser(true);
  };

  const hideModalAddEditUser = () => {
    setAction("");
    setDataModalUser({});
    setVisibleModalUser(false);
  };

  const onTableChange = (pagination, filters, sorter) => {
    let oldFilterData = filterData;
    let onOrder = { pagination, filters, sorter };
    let newFilterData = getFilterData(oldFilterData, null, onOrder);
    setFilterData(newFilterData);
    // setSelectedRowsKey([])
  };

  const submitModalUser = (value) => {
    setLoading(true);
    if (action === "add") {
      delete value.CanBoID;
      // const formSave = new FormData();
      // const HeThongCanBoStr = JSON.stringify(value);
      // formSave.append('HeThongCanBoStr', HeThongCanBoStr);
      api
        .AddUser({ ...value, MatKhau: "", GhiChu: "" })
        .then((response) => {
          setLoading(false);
          if (response.data.Status > 0) {
            message.destroy();
            message.success("Thêm cán bộ thành công");
            //
            hideModalAddEditUser();
            //
            dispatch(actions.getList(filterData));
          } else {
            message.destroy();
            message.error(response.data.Message);
          }
        })
        .catch((error) => {
          setLoading(false);
          message.destroy();
          message.error(error.toString());
        });
    } else if (action === "edit") {
      api
        .EditUser(value)
        .then((response) => {
          setLoading(false);
          if (response.data.Status > 0) {
            message.destroy();
            message.success("Cập nhật cán bộ thành công");
            //
            hideModalAddEditUser();
            //
            dispatch(actions.getList(filterData));
          } else {
            message.destroy();
            message.error(response.data.Message);
          }
        })
        .catch((error) => {
          setLoading(false);
          message.destroy();
          message.error(error.toString());
        });
    }
  };

  const onSearch = (value, property) => {
    let oldFilterData = filterData;
    let onFilter = { value, property };
    let newFilterData = getFilterData(oldFilterData, onFilter, null);
    setFilterData(newFilterData);
  };

  const handleRoolbackPassword = (NguoiDungID) => {
    Modal.confirm({
      title: "Đặt lại mật khẩu",
      content: "Bạn có muốn đặt lại mật khẩu cho người dùng này không?",
      cancelText: "Không",
      okText: "Có",
      onOk: () => {
        api
          .ResetPassword({ NguoiDungID })
          .then((res) => {
            if (res.data.Status > 0) {
              dispatch(actions.getList(filterData));
              // props.getList(filterData)
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

  const renderThaoTac = (record) => {
    return (
      <div className="action-btn">
        {role && role.edit ? (
          <Tooltip title={"Chi tiết"}>
            <EyeIcon onClick={() => showModalEditUser(record.CanBoID, true)} />
          </Tooltip>
        ) : (
          ""
        )}
        {role && role.edit ? (
          <Tooltip title={"Sửa"}>
            <EditIcon onClick={() => showModalEditUser(record.CanBoID)} />
          </Tooltip>
        ) : (
          ""
        )}
        {role && role.delete ? (
          <Tooltip title={"Xóa"}>
            <DeleteIcon onClick={() => handleDeleteIUser(record.CanBoID)} />
          </Tooltip>
        ) : (
          ""
        )}
        {role && role.edit ? (
          <Tooltip title={"Đặt lại mật khẩu"}>
            <SettingPass
              onClick={() => handleRoolbackPassword(record.NguoiDungID)}
            />
          </Tooltip>
        ) : (
          ""
        )}
      </div>
    );
  };

  const columns = [
    {
      title: "STT",
      align: "center",
      width: 5,
      render: (text, record, index) => (
        <span>{(PageNumber - 1) * PageSize + (index + 1)}</span>
      ),
    },
    {
      title: "Tên cán bộ",
      dataIndex: "TenCanBo",
      width: 14,
    },
    {
      title: "Tên người dùng",
      dataIndex: "TenNguoiDung",
      width: 14,
    },
    {
      title: "Ngày sinh",
      dataIndex: "NgaySinh",
      align: "center",
      width: 14,
      render: (text, record, index) =>
        text ? moment(text).format("DD/MM/YYYY") : "",
    },
    {
      title: "Giới tính",
      dataIndex: "GioiTinh",
      width: 5,
      render: (text, record, index) =>
        record.GioiTinh === 1
          ? "Nam"
          : record.GioiTinh === 2
          ? "Khác"
          : record.GioiTinh === 0
          ? "Nữ"
          : "",
    },
    {
      title: "Địa chỉ",
      dataIndex: "DiaChi",
      align: "center",
      width: 14,
    },
    {
      title: "Cơ quan",
      dataIndex: "TenCoQuan",
      align: "center",
      width: 14,
    },
    {
      title: "Trạng thái",
      dataIndex: "TenNguoiDung",
      align: "center",
      width: 15,
      render: (text, record, index) =>
        record.TrangThaiID === 1
          ? "Đang làm"
          : record.TrangThaiID === 0
          ? "Nghỉ việc"
          : "",
    },
    {
      title: "Thao tác",
      align: "center",
      width: 13,
      render: (text, record) => renderThaoTac(record),
    },
  ];

  const arrTemp = [{}, {}];

  const PageNumber = filterData.PageNumber
    ? parseInt(filterData.PageNumber)
    : 1;
  const PageSize = filterData.PageSize
    ? parseInt(filterData.PageSize)
    : getDefaultPageSize();

  return (
    <Wrapper>
      <LayoutWrapper>
        <PageHeader>
          <BreadCrumb />
          <div className="filter-right">
            {role.add ? (
              <Button onClick={showModalAddUser} type="add">
                <AddIcon />
                Thêm
              </Button>
            ) : null}
          </div>
        </PageHeader>
        <PageAction className="filter-action">
          <div className="filter-left">
            <TreeSelect
              showSearch
              treeData={DanhSachCoQuan}
              style={{ width: "400px" }}
              dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
              onChange={(value) => onSearch(value, "CoQuanID")}
              value={filterData.CoQuanID ? filterData.CoQuanID : null}
              placeholder="Chọn đơn vị"
              allowClear
              treeDefaultExpandAll
              notFoundContent={"Không có dữ liệu"}
              treeNodeFilterProp={"title"}
            />
            {/* <Select
              placeholder={"Chọn cơ quan"}
              style={{ width: 500 }}
              onChange={(value) => onSearch(value, "CoQuanID")}
              allowClear
            >
              {DanhSachCoQuan
                ? DanhSachCoQuan.map((item) => (
                    <Option value={item.CoQuanID}>{item.TenCoQuan}</Option>
                  ))
                : null}
            </Select> */}
            <Search
              placeholder={
                "Nhập tên cán bộ, người dùng hoặc cơ quan cần tìm kiếm"
              }
              onSearch={(value) => onSearch(value, "keyword")}
              style={{ width: 350 }}
              defaultValue={filterData.Keyword}
              allowClear
            ></Search>
          </div>
        </PageAction>
        <Box>
          <BoxTable
            columns={columns}
            //   rowKey="ID"
            dataSource={ListNguoiDung}
            loading={tableLoading}
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
        <ModalAddEditUser
          visible={visibleModalUser}
          onCancel={hideModalAddEditUser}
          key={keyModalUser}
          dataEdit={dataModalUser}
          onCreate={submitModalUser}
          loading={loading}
          action={action}
          DanhSachCoQuan={DanhSachCoQuan}
          DanhSachChucVu={DanhSachChucVu}
        />
      </LayoutWrapper>
    </Wrapper>
  );
};

export default connect(
  (state) => ({
    auth: state.Auth.user,
  })
  //   {...actions}
)(UserManagement);
