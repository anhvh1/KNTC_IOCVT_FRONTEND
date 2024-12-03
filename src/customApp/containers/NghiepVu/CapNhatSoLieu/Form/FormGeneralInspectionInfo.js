import React, { useState, useEffect } from "react";
import { Table, Select, Input, Button, message, Space, Tooltip } from "antd";
import { PlusOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import EditIcon from "../../../../../components/utility/EditIcon";
import DeleteIcon from "../../../../../components/utility/DeleteIcon";
import api from "../config";
import BoxTable from "../../../../../components/utility/boxTable";
const { TextArea } = Input;
const { Option } = Select;
import { styles } from "./style";
const FormGeneralInspectionInfo = ({ CuocThanhTraID }) => {
  const [subjects, setSubjects] = useState([
    { key: 1, type: "Tổ chức", name: "" },
    { key: 2, type: "Tổ chức", name: "UBND xã" },
  ]);
  const [data, setData] = useState([]);
  const [editedValues, setEditedValues] = useState({});
  const fetchData = () => {
    api
      .GetListDoiTuong(CuocThanhTraID, 15)
      .then((res) => {
        if (res.data.Status > 0) {
          setData(res.data.Data);
          setEditedValues({});
          setEditingRow(null);
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
  useEffect(() => {
    fetchData();
  }, [CuocThanhTraID]);
  const handleDelete = (ID) => {
    api
      .DeLete({ ListID: [ID] })
      .then((res) => {
        if (res.data.Status > 0) {
          message.success(res.data.Message);
          fetchData();
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
  const [newTen, setNewTen] = useState("");
  const [newLoaiDoiTuong, setNewLoaiDoiTuong] = useState("");
  const handleAddRow = () => {
    if (!newLoaiDoiTuong) {
      message.warning("Vui lòng chọn loại đối tượng");
      return;
    }
    if (!newTen) {
      message.warning("Vui lòng nhập tên đối tượng");
      return;
    }
    api
      .Insert({
        Ten: newTen,
        LoaiDoiTuong: newLoaiDoiTuong,
        TypeChucNang: 15,
        CuocThanhTraID: CuocThanhTraID,
        ListXoaFileIds: [0],
      })
      .then((res) => {
        if (res.data.Status > 0) {
          message.success(res.data.Message);
          fetchData();
          setNewLoaiDoiTuong(null);
          setNewTen("");
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
  const [newTenSua, setNewTenSua] = useState("");
  const [newLoaiDoiTuongSua, setNewLoaiDoiTuongSua] = useState("");
  const handleAddRowSua = (newTenSua1, newLoaiDoiTuongSua1, ID) => {
    const Ten = editedValues[ID]?.Ten || newTenSua1;
    const LoaiDoiTuong = editedValues[ID]?.LoaiDoiTuong || newLoaiDoiTuongSua1;

    api
      .Update({ Ten, LoaiDoiTuong, TypeChucNang: 15, CuocThanhTraID, ID })
      .then((res) => {
        if (res.data.Status > 0) {
          message.success(res.data.Message);
          fetchData();
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
  const [editingRow, setEditingRow] = useState(null);

  const columns = [
    {
      title: "STT",
      key: "index",
      width: "10%",
      align: "center",
      render: (text, record, index) => {
        if (index === 0) {
          return <span style={{ fontWeight: "bold", color: "blue" }}></span>;
        }
        return index;
      },
    },

    {
      title: "Loại đối tượng",
      key: "LoaiDoiTuong",
      width: "20%",

      render: (text, record, index) => {
        if (index === 0) {
          return (
            <Select
              value={newLoaiDoiTuong}
              style={{ width: "100%" }}
              onChange={(value) => setNewLoaiDoiTuong(value)}
              onFocus={() => setEditingRow(null)}
              allowClear
            >
              <Option value="1">Tổ chức</Option>
              <Option value="2">Cá nhân</Option>
            </Select>
          );
        }
        return (
          <Select
            value={editedValues[record.ID]?.LoaiDoiTuong || record.LoaiDoiTuong}
            style={{ width: "100%" }}
            allowClear
            onChange={(value) => {
              setEditedValues({
                ...editedValues,
                [record.ID]: {
                  ...editedValues[record.ID],
                  LoaiDoiTuong: value,
                },
              });
            }}
            onFocus={() => setEditingRow(index)}
          >
            <Option value={1}>Tổ chức</Option>
            <Option value={2}>Cá nhân</Option>
          </Select>
        );
      },
    },
    {
      title: "Tên đối tượng",
      key: "Ten",
      width: "50%",

      render: (text, record, index) => {
        if (index === 0) {
          return (
            <TextArea
              autoSize={{ minRows: 1, maxRows: 3 }}
              value={newTen}
              onChange={(e) => {
                if (e.target.value.length <= 250) {
                  setNewTen(e.target.value);
                } else {
                  message.warning(
                    "Tên đối tượng không được vượt quá 250 ký tự"
                  );
                }
              }}
              onFocus={() => setEditingRow(null)}
              maxLength={250}
            />
          );
        }
        return (
          <TextArea
            autoSize={{ minRows: 1, maxRows: 3 }}
            value={editedValues[record.ID]?.Ten ?? record.Ten}
            onChange={(e) => {
              const value = e.target.value;
              if (value.length <= 250) {
                setEditedValues((prevValues) => ({
                  ...prevValues,
                  [record.ID]: { ...prevValues[record.ID], Ten: value },
                }));
              } else {
                message.warning("Tên đối tượng không được vượt quá 250 ký tự");
              }
            }}
            onFocus={() => setEditingRow(index)}
            maxLength={250}
          />
        );
      },
    },
    {
      title: "Thao tác",
      key: "action",
      align: "center",
      width: "20%",
      render: (_, record, index) => (
        <Space size="middle">
          {index === 0 && (
            <Tooltip title={"Thêm mới"}>
              {/* <svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#5AA8E9" class="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0" />
              </svg> */}
              <svg
                onClick={handleAddRow}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#5AA8E9"
                class="bi bi-floppy"
                viewBox="0 0 16 16"
              >
                <path d="M11 2H9v3h2z" />
                <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z" />
              </svg>
            </Tooltip>
          )}
          {editingRow === index && (
            <Tooltip title={"Sửa"}>
              {/* <svg onClick={() => handleAddRowSua(record.Ten, record.LoaiDoiTuong, record.ID)} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#5AA8E9" class="bi bi-arrow-down-square-fill" viewBox="0 0 16 16">
                <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2zm6.5 4.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 1 1 .708-.708L7.5 10.293V4.5a.5.5 0 0 1 1 0" />
              </svg> */}
              <svg
                onClick={() =>
                  handleAddRowSua(record.Ten, record.LoaiDoiTuong, record.ID)
                }
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="#5AA8E9"
                class="bi bi-floppy"
                viewBox="0 0 16 16"
              >
                <path d="M11 2H9v3h2z" />
                <path d="M1.5 0h11.586a1.5 1.5 0 0 1 1.06.44l1.415 1.414A1.5 1.5 0 0 1 16 2.914V14.5a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 14.5v-13A1.5 1.5 0 0 1 1.5 0M1 1.5v13a.5.5 0 0 0 .5.5H2v-4.5A1.5 1.5 0 0 1 3.5 9h9a1.5 1.5 0 0 1 1.5 1.5V15h.5a.5.5 0 0 0 .5-.5V2.914a.5.5 0 0 0-.146-.353l-1.415-1.415A.5.5 0 0 0 13.086 1H13v4.5A1.5 1.5 0 0 1 11.5 7h-7A1.5 1.5 0 0 1 3 5.5V1H1.5a.5.5 0 0 0-.5.5m3 4a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5V1H4zM3 15h10v-4.5a.5.5 0 0 0-.5-.5h-9a.5.5 0 0 0-.5.5z" />
              </svg>
            </Tooltip>
          )}
          {index !== 0 && (
            <Tooltip title={"Xóa"}>
              <button
                onClick={() => handleDelete(record.ID)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "red",
                  fontSize: "15px",
                }}
              >
                <DeleteIcon />
              </button>
            </Tooltip>
          )}
        </Space>
      ),
    },
  ];

  const customRow = [
    {
      ID: "",
      Ten: "",
      LoaiDoiTuong: "",
    },
  ];
  return (
    <div style={styles.formImportContainer}>
      <h2
        style={{
          fontSize: "24px",
          marginBottom: "20px",
          color: "#333",
        }}
      >
        1. Danh sách đối tượng được thanh tra theo kết luận thanh tra, kiểm tra
      </h2>
      <BoxTable
        columns={columns}
        dataSource={[...customRow, ...(Array.isArray(data) ? data : [])]} // Ensure data is an array
        rowKey="ID"
        pagination={false}
        bordered
      />
    </div>
  );
};

export default FormGeneralInspectionInfo;
