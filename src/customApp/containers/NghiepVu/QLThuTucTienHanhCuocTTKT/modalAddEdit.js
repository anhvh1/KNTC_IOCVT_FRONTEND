import React, { Component, useEffect, useState } from "react";
import {
  MODAL_NORMAL,
  ITEM_LAYOUT,
  REQUIRED,
} from "../../../../settings/constants";
import {
  Form as FormAnt,
  Input,
  message,
  Radio,
  Modal as ModalAnt,
  Switch,
} from "antd";
import Upload from "../../../../components/uielements/upload";
import BoxTable from "../../../../components/utility/boxTable";
import Select, { Option } from "../../../../components/uielements/select";
import Modal from "../../../../components/uielements/modal";
import {
  MinusCircleOutlined,
  PlusOutlined,
  CloudUploadOutlined,
} from "@ant-design/icons";
import { Button } from "../../../../components/uielements/exportComponent";
import { getValueConfigLocalByKey } from "../../../../helpers/utility";
import { useDispatch, useSelector } from "react-redux";
import { customizeItemValidator as Item } from "../../../../components/uielements/itemValidator";
import {
  customizeFormValidator as Form,
  useForm,
} from "../../../../components/uielements/formValidator";
import api from "./config";
import AddIcon from "../../../../components/utility/AddIcon";
import CloudUploadIcon from "../../../../components/utility/CloudUploadIcon";
import { CloseSquareFilled, SaveFilled } from "@ant-design/icons";
const { List } = FormAnt;
const { TextArea } = Input;
const ModalAddEdit = (props) => {
  const [loading, setLoading] = useState(false);
  const [ListFileDinhKem, setListFileDinhKem] = useState([]);
  const [form] = useForm();

  useEffect(() => {
    const { dataModalAddEdit } = props;
    setStatus(dataModalAddEdit.TrangThai);
    if (dataModalAddEdit && dataModalAddEdit.ThuTucId) {
      form && form.setFieldsValue({ ...dataModalAddEdit });
      if (dataModalAddEdit?.TenFile) {
        const file = {
          TenFile: dataModalAddEdit?.TenFile,
          UrlFile: dataModalAddEdit?.UrlFile,
        };
        setListFileDinhKem([file]);
      }
    }
    if (action !== "edit") {
      handleAdd();
    }
  }, []);
  const [status, setStatus] = useState(false);
  const handleSwitchChange = (checked) => {
    setStatus(checked);
  };
  const onOk = (e) => {
    e.preventDefault();

    form.validateFields().then((values) => {
      const listBuocThuTuc = form
        .getFieldValue("ListBuocThuTuc")
        .map((item, index) => ({
          ...item,
          ThuTu: index + 1,
        }));
      const listThemThuTuc = listBuocThuTuc.filter((item) => !item.BuocId);
      const newValue = {
        ...values,
        TrangThai: status,
        // TenFile: ListFileDinhKem[0].name,
        BuocThuTucs: listBuocThuTuc,
        ListSuaThuTuc: listBuocThuTuc,
        ListThemThuTuc: listThemThuTuc,
        ListXoaThuTuc: buocId,
      };
      const { onCreate } = props;
      onCreate(newValue, ListFileDinhKem);
    });
  };
  const getBase64 = (file, callback, listFile) => {
    const reader = new FileReader();
    reader.addEventListener("load", () =>
      callback(reader.result, file, listFile)
    );
    reader.readAsDataURL(file);
  };

  const genDataFileDinhKem = (base64, file, listFile) => {
    const newListFileDinhKem = [...listFile];
    setListFileDinhKem(newListFileDinhKem);
  };
  const beforeUploadFile = (file, callback, listFile) => {
    const FileLimit = getValueConfigLocalByKey("data_config")?.fileLimit;
    const isLt2M = file.size / 1024 / 1024 < FileLimit;
    const ListFileExist = [];
    listFile?.forEach((file) => {
      const ExistFile = ListFileDinhKem.filter(
        (item) => item.TenFile === file.name
      );
      if (ExistFile.length) {
        ListFileExist.push(file);
      }
    });
    if (!isLt2M) {
      message.error(`File đính kèm phải nhỏ hơn ${FileLimit}MB`);
    } else {
      getBase64(file, callback, listFile);
    }
    return false;
  };
  const { visible, onCancel, action } = props;
  const columns = [
    {
      title: "Tên bước",
      dataIndex: "TenBuoc",
      width: "45%",
      render: (text, _, index) => (
        <Item name={[index, "TenBuoc"]} required={[REQUIRED]}>
          <TextArea
            placeholder="Tên bước"
            style={{
              marginTop: "15px",
              border: "none", // Removes the border
              backgroundColor: index % 2 === 0 ? "white" : "rgb(250, 250, 250)", // Even index ->
              padding: "10px",
              borderRadius: "8px",
              boxShadow: "none", // Removes any shadow (focus effect)
            }}
            autoSize={{
              minRows: 1,
              maxRows: 3,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.border = "none"; // Remove border on hover
              e.currentTarget.style.boxShadow = "none"; // Remove shadow on hover
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.border = "none"; // Maintain no border after hover
              e.currentTarget.style.boxShadow = "none"; // Maintain no shadow after hover
            }}
            onFocus={(e) => {
              e.currentTarget.style.border = "none"; // Remove border when focused
              e.currentTarget.style.boxShadow = "none"; // Remove shadow when focused
            }}
            onBlur={(e) => {
              e.currentTarget.style.border = "none"; // No border after losing focus
              e.currentTarget.style.boxShadow = "none"; // No shadow after losing focus
            }}
          />
        </Item>
      ),
    },
    {
      title: "Nội dung",
      dataIndex: "NoiDung",
      width: "45%",
      render: (text, _, index) => (
        <Item name={[index, "NoiDung"]} required={[REQUIRED]}>
          <TextArea
            placeholder="Nội dung"
            style={{
              marginTop: "15px",
              border: "none", // Removes the border
              backgroundColor: index % 2 === 0 ? "white" : "rgb(250, 250, 250)", // Even index ->
              padding: "10px",
              borderRadius: "8px",
              boxShadow: "none", // Removes any shadow (focus effect)
            }}
            autoSize={{
              minRows: 1,
              maxRows: 3,
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.border = "none"; // Remove border on hover
              e.currentTarget.style.boxShadow = "none"; // Remove shadow on hover
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.border = "none"; // Maintain no border after hover
              e.currentTarget.style.boxShadow = "none"; // Maintain no shadow after hover
            }}
            onFocus={(e) => {
              e.currentTarget.style.border = "none"; // Remove border when focused
              e.currentTarget.style.boxShadow = "none"; // Remove shadow when focused
            }}
            onBlur={(e) => {
              e.currentTarget.style.border = "none"; // No border after losing focus
              e.currentTarget.style.boxShadow = "none"; // No shadow after losing focus
            }}
          />
        </Item>
      ),
    },
    {
      title: "Thao tác",
      width: "10%",
      align: "center",
      dataIndex: "actions",
      render: (_, record, index) => (
        <Button
          icon={<MinusCircleOutlined />}
          onClick={() => handleRemove(index)}
          danger
        >
          Xóa
        </Button>
      ),
    },
  ];
  const [buocId, setBuocId] = useState([]); // Tạo state để lưu BuocId
  const handleRemove = (index) => {
    const listBuocThuTuc = form.getFieldValue("ListBuocThuTuc");
    const removedBuoc = listBuocThuTuc[index]; // Lấy ra dòng bị xóa
    if (removedBuoc.BuocId) {
      // Thêm BuocId vào mảng nếu có
      setBuocId((prev) => [...prev, removedBuoc.BuocId]);
    }

    const updatedList = listBuocThuTuc.filter((_, i) => i !== index);
    form.setFieldsValue({
      ListBuocThuTuc: updatedList,
    });
  };
  const handleAdd = () => {
    const list = form.getFieldValue("ListBuocThuTuc") || [];
    form.setFieldsValue({
      ListBuocThuTuc: [...list, { TenBuoc: "", NoiDung: "" }],
    });
  };
  return (
    <Modal
      title={`${action === "edit" ? "Sửa" : "Thêm"} mới thủ tục`}
      width={"100%"}
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button
          type="danger"
          icon={<CloseSquareFilled />}
          key="back"
          onClick={onCancel}
        >
          Hủy
        </Button>,
        <Button
          onClick={onOk}
          key="submit"
          type="primary"
          icon={<SaveFilled />}
        >
          Lưu
        </Button>,
      ]}
    >
      <Form form={form}>
        {action !== "add" ? (
          <Item name="ThuTucId" hidden {...REQUIRED}></Item>
        ) : null}
        <Item
          label="Tên thủ tục"
          name="TenThuTuc"
          required={[REQUIRED]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Input />
        </Item>
        <Item
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          label="Các bước thực hiện"
        >
          <List name="ListBuocThuTuc">
            {(fields) => (
              <>
                <BoxTable
                  dataSource={fields}
                  columns={columns}
                  pagination={false}
                  rowKey="key"
                />
                <Button
                  style={{ width: "100%", marginTop: 16 }}
                  icon={<AddIcon />}
                  onClick={handleAdd}
                  type="primary"
                >
                  Thêm bước
                </Button>
              </>
            )}
          </List>
        </Item>
        <Item
          label="Tệp đính kèm"
          {...ITEM_LAYOUT}
          style={{ marginBottom: "20px" }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px", // Add spacing between the button and file list
              flexWrap: "wrap", // Wrap files to next line if necessary
            }}
          >
            {/* Upload button */}
            <Upload
              showUploadList={false}
              beforeUpload={(file, listFile) => {
                beforeUploadFile(file, genDataFileDinhKem, listFile);
              }}
              disabled={loading}
            >
              <Button
                type="primary"
                icon={<CloudUploadIcon />}
                size="large"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "#4CAF50",
                  borderRadius: "12px",
                  // height: '55px',
                  fontWeight: "600",
                  fontSize: "18px",
                  boxShadow: "0 6px 12px rgba(0, 0, 0, 0.1)",
                  border: "none",
                  transition: "background-color 0.3s ease",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = "#45a049")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = "#4CAF50")
                }
              >
                Tải lên tệp
              </Button>
            </Upload>

            {/* Uploaded files list */}
            {ListFileDinhKem && ListFileDinhKem.length > 0 ? (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "15px", // Space between each file
                  flexWrap: "wrap", // Wrap to next line if too many files
                }}
              >
                {ListFileDinhKem.map((item, index) => (
                  <div
                    key={index}
                    style={{
                      padding: "8px 12px",
                      borderRadius: "8px",
                      backgroundColor: "#f5f5f5",
                      display: "flex",
                      alignItems: "center",
                      maxWidth: "500px", // Control file width
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                      textOverflow: "ellipsis",
                    }}
                  >
                    <a
                      target="_blank"
                      href={item?.UrlFile}
                      style={{
                        color: "#333",
                        fontWeight: "500",
                        fontSize: "16px",
                        textDecoration: "none",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                        // maxWidth: '150px',
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#1890ff")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "#333")
                      }
                    >
                      {item?.name || item?.TenFile}
                    </a>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        </Item>
        <Item label="Duyệt thủ tục" name={"TrangThai"} {...ITEM_LAYOUT}>
          <Switch
            // checked={status}
            onChange={handleSwitchChange}
          />
        </Item>
      </Form>
    </Modal>
  );
};
export { ModalAddEdit };
