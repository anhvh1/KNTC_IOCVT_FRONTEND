import { Modal, Table, Tooltip, message } from "antd";
import actions from "../../../redux/DanhMuc/DMDoanhNghiep/actions";
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
import { formDataCaller } from "../../../../api/formDataCaller";
import {
  changeUrlFilter,
  exportExcel,
  getDefaultPageSize,
  getFilterData,
  getRoleByKey,
} from "../../../../helpers/utility";
import { useKey } from "../../../CustomHook/useKey";
import queryString from "query-string";
import api, { apiUrl } from "./config";
import moment from "moment";
import ModalAddEdit from "./modalAddEdit";
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  EyeOutlined,
} from "@ant-design/icons";
import { useSelector } from "react-redux";
import PageWrap from "../../../../components/utility/PageWrap";
import { saveAs } from "file-saver";
import axios from "axios";
import AddIcon from "../../../../components/utility/AddIcon";
import BreadCrumb from "../../NghiepVu/Shared/Component/BreadCumb";
const DMDoanhNghiep = (props) => {
  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search)
  );
  const [dataModalAddEdit, setDataModalAddEdit] = useState({});
  const [dataModalEdit, setDataModalEdit] = useState({});
  const [visibleModalAddEdit, setVisibleModalAddEdit] = useState(false);
  const [action, setAction] = useState("");
  const [modalKey, inceaseModalKey] = useKey();
  const [selectedRowsKey, setSelectedRowsKey] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const access_token = localStorage.getItem("access_token");
  document.title = "Danh Mục Doanh Nghiệp";

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
  const AddFile = (file) => {
    const formSave = new FormData();
    formSave.append("file", file); // The key name 'file' should match the backend expects

    axios
      .post(apiUrl.ImportFile, formSave, {
        headers: {
          Authorization: `Bearer ${access_token}`,
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.data.Status > 0) {
          message.success(response.data.Message);
          props.getList(filterData);
        } else {
          message.error(response.data.Message);
        }
      })
      .catch((error) => {
        message.error("Upload failed: " + error.toString());
      });
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file) {
      AddFile(file); // Call AddFile immediately after file selection

      // Reset the file input so the same file can be uploaded again
      event.target.value = null;
    } else {
      message.error("No file selected");
    }
  };
  const DownloadFile = async () => {
    try {
      const response = await axios.get(apiUrl.downloadFile, {
        responseType: "blob", // Important: responseType as blob
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      if (response.status === 200) {
        const blob = new Blob([response.data], {
          type: response.headers["content-type"],
        });
        saveAs(blob, "TemplateImportDoanhNghiep.xlsx");
      } else {
        console.error("Error downloading the file:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const DownloadDanhSach = async () => {
    try {
      const response = await axios.get(apiUrl.downloadDanhSach, {
        responseType: "blob", // Important: responseType as blob
        headers: {
          Authorization: `Bearer ${access_token}`,
        },
      });
      if (response.status === 200) {
        const blob = new Blob([response.data], {
          type: response.headers["content-type"],
        });
        saveAs(blob, "Danh Sách Doanh Nghiệp.xlsx");
      } else {
        console.error("Error downloading the file:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };
  const deleteModalAddEdit = (DoanhNghiepID) => {
    Modal.confirm({
      title: "Xóa Dữ Liệu",
      content: "Bạn có muốn xóa doanh nghiệp này không?",
      cancelText: "Không",
      okText: "Có",
      onOk: () => {
        setConfirmLoading(true);
        api
          .xoaDoanhNghiep(DoanhNghiepID)
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

  const showModalEdit = (coQuanID) => {
    setAction("edit");
    api
      .chiTietDoanhNghiep({ coQuanID })
      .then((res) => {
        if (res.data.Status > 0) {
          setDataModalAddEdit(res.data.Data.Data.DoanhNghiep);
          setDataModalEdit(res.data.Data.Data.CoQuan);
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
    setDataModalEdit({});
    setVisibleModalAddEdit(false);
  };

  const submitModalAddEdit = (data) => {
    setConfirmLoading(true);
    if (action === "add") {
      api
        .themDoanhNghiep(data)
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
        .suaDoanhNghiep(data)
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
  const { DanhSachDoanhNghiep, TotalRow, role } = props;
  const PageNumber = filterData.PageNumber
    ? parseInt(filterData.PageNumber)
    : 1;
  const PageSize = filterData.PageSize
    ? parseInt(filterData.PageSize)
    : getDefaultPageSize();

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
      title: "Mã số thuế",
      dataIndex: "MaSoThue",
      width: "10%",
    },
    {
      title: "Tên doanh nghiệp",
      dataIndex: "NameDoanhNghiep",
      width: "20%",
      align: "center",
    },
    {
      title: "Địa chỉ",
      dataIndex: "DiaChi",
      width: "30%",
    },
    // {
    //   title: "Lĩnh vực",
    //   dataIndex: "DanhSachLinhVuc",
    //   width: "15%",
    //   render: (DanhSachLinhVuc) => (
    //     <div
    //       dangerouslySetInnerHTML={{
    //         __html: DanhSachLinhVuc.map((item) => item.TenLinhVuc).join(
    //           ".<br/>"
    //         ),
    //       }}
    //     />
    //   ),
    // },
    {
      title: "Phân loại",
      dataIndex: "PhanLoaiStr",
      width: "10%",
    },
    {
      title: "Thao tác",
      width: "10%",
      align: "center",
      margin: "10px",
      render: (text, record) => renderThaoTac(record),
    },
  ];
  const renderThaoTac = (record) => {
    return (
      <div className={"action-btn"}>
        {role.edit ? (
          <Tooltip title={"Sửa"}>
            <EditIcon onClick={() => showModalEdit(record.IDCoQuanChild)} />
          </Tooltip>
        ) : (
          ""
        )}
        <Tooltip title={"Xem chi tiết"}>
          <EyeOutlined onClick={() => showModalView(record.IDCoQuanChild)} />
        </Tooltip>
        {role.delete ? (
          <Tooltip title={"Xóa"}>
            <DeleteIcon
              onClick={() => deleteModalAddEdit(record.IDCoQuanChild)}
            />
          </Tooltip>
        ) : (
          ""
        )}
      </div>
    );
  };
  const showModalView = (coQuanID) => {
    setAction("view");
    api
      .chiTietDoanhNghiep({ coQuanID })
      .then((res) => {
        if (res.data.Status > 0) {
          setDataModalAddEdit(res.data.Data.Data.DoanhNghiep);
          setDataModalEdit(res.data.Data.Data.CoQuan);
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
  return (
    <LayoutWrapper>
      <PageHeader>
        <BreadCrumb />
        <div className="filter-right">
          {role.add ? (
            <Button type="add" icon={<AddIcon />} onClick={showModalAdd}>
              Thêm
            </Button>
          ) : null}

          <div>
            <input
              type="file"
              onChange={handleFileChange}
              style={{ display: "none" }}
              id="fileInput"
              accept=".xlsx" // Limiting the file selection to Excel files
            />
            <Button
              type="import"
              onClick={() => document.getElementById("fileInput").click()}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M7.646 5.146a.5.5 0 0 1 .708 0l2 2a.5.5 0 0 1-.708.708L8.5 6.707V10.5a.5.5 0 0 1-1 0V6.707L6.354 7.854a.5.5 0 1 1-.708-.708z"
                />
                <path d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383m.653.757c-.757.653-1.153 1.44-1.153 2.056v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12h8.906C13.98 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1z" />
              </svg>
              Import
            </Button>
          </div>

          <Button type="primary" onClick={DownloadFile}>
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
            Tải file mẫu
          </Button>
          <Button type="dowloadlist" onClick={DownloadDanhSach}>
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
            Tải danh sách
          </Button>
        </div>
      </PageHeader>
      <PageAction className="filter-action">
        <div className="filter-left">
          <InputSearch
            defaultValue={filterData.Keyword}
            placeholder={"Nhập tên doanh nghiệp"}
            style={{ width: 300 }}
            onSearch={(value) => onFilter(value, "Keyword")}
            allowClear
          />
        </div>
      </PageAction>
      <Box>
        <BoxTable
          columns={columns}
          dataSource={DanhSachDoanhNghiep}
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
        dataModalEdit={dataModalEdit}
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
    ...state.DMDoanhNghiep,
    role: getRoleByKey(state.Auth.role, "danh-muc-doanh-nghiep"),
  };
}
export default connect(mapStateToProps, actions)(DMDoanhNghiep);
