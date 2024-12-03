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
  DatePicker,
  Row,
  Col,
} from "antd";
import Upload from "../../../../components/uielements/upload";
import { Button } from "../../../../components/uielements/exportComponent";
import BoxTable from "../../../../components/utility/boxTable";
import Select, { Option } from "../../../../components/uielements/select";
import Modal from "../../../../components/uielements/modal";
import DeleteIcon from "../../../../components/utility/DeleteIcon";
import {
  MinusCircleOutlined,
  PlusOutlined,
  CloudUploadOutlined,
} from "@ant-design/icons";
import { getValueConfigLocalByKey } from "../../../../helpers/utility";
import { useDispatch, useSelector } from "react-redux";
import { customizeItemValidator as Item } from "../../../../components/uielements/itemValidator";
import {
  customizeFormValidator as Form,
  useForm,
} from "../../../../components/uielements/formValidator";
import api from "./config";
import { DONVIHANHCHINH, DOANHNGHIEP } from "../../../../settings/constants";
import dayjs from "dayjs";
import { CloseSquareFilled, SaveFilled } from "@ant-design/icons";
import CloudUploadIcon from "../../../../components/utility/CloudUploadIcon";
const { List } = FormAnt;
const { TextArea } = Input;
const ModalAddEdit = (props) => {
  const [loading, setLoading] = useState(false);
  const [ListFileDinhKem, setListFileDinhKem] = useState([]);
  const [fileID, setFileID] = useState([]);
  const [form] = useForm();

  useEffect(() => {
    const { dataModalAddEdit } = props;
    if (dataModalAddEdit && dataModalAddEdit.BanHanhKHID) {
      form &&
        form.setFieldsValue({
          ...dataModalAddEdit,
          NgayBanHanh: dataModalAddEdit.NgayBanHanh
            ? dayjs(dataModalAddEdit.NgayBanHanh)
            : null,
        });
      if (
        dataModalAddEdit?.ListFiles &&
        dataModalAddEdit.ListFiles.length > 0
      ) {
        const files = dataModalAddEdit.ListFiles.map((file) => ({
          TenFile: file.TenFile,
          UrlFile: file.UrlFile,
          FileID: file.FileID,
        }));
        setListFileDinhKem(files);
      }
    }
  }, []);
  const onOk = (e) => {
    e.preventDefault();

    form.validateFields().then((values) => {
      const newValue = {
        ...values,
        FileDeleteIds: fileID,
        NamBanHanh: defaultNamThanhTra,
        NgayBanHanh: values.NgayBanHanh
          ? values.NgayBanHanh.format("YYYY-MM-DD")
          : null,
        BanHanhKHID: action === "add" ? 0 : values.BanHanhKHID,
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
    const newListFileDinhKem = [...ListFileDinhKem, ...listFile];
    setListFileDinhKem(newListFileDinhKem);
  };
  const beforeUploadFile = (file, callback, listFile) => {
    const FileLimit = getValueConfigLocalByKey("data_config")?.fileLimit;
    const isLt2M = file.size / 1024 / 1024 < FileLimit;

    if (!isLt2M) {
      message.error(`File đính kèm phải nhỏ hơn ${FileLimit}MB`);
    } else {
      getBase64(file, callback, listFile);
    }
    return false;
  };
  // const handleFileUpload = (info) => {
  //   const { fileList } = info;
  //   const validFiles = fileList.filter(file => file.size / 1024 / 1024 < FileLimit);

  //   if (validFiles.length !== fileList.length) {
  //     message.error(`Một số file vượt quá giới hạn ${FileLimit}MB và đã bị loại bỏ.`);
  //   }

  //   setListFileDinhKem(validFiles);
  // };
  const { visible, onCancel, action, defaultNamThanhTra } = props;
  return (
    <Modal
      title={`Ban hành thủ tục`}
      width={"600px"}
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
        <Item name="BanHanhKHID" hidden {...REQUIRED}></Item>
        <Row gutter={16}>
          <Col span={12}>
            <Item
              label="Số văn bản"
              name="SoVanBan"
              rules={[REQUIRED]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input />
            </Item>
          </Col>
          <Col span={12}>
            <Item
              label="Ngày ban hành"
              name="NgayBanHanh"
              rules={[REQUIRED]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <DatePicker
                placeholder="Chọn ngày ban hành"
                style={{ width: "100%" }}
                format="DD/MM/YYYY"
              />
            </Item>
          </Col>
        </Row>
        <Item
          label="Đơn vị, cơ quan ban hành"
          name="DonVi"
          rules={[REQUIRED]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Input />
        </Item>
        <Item
          label="Trích yếu"
          name="TrichYeu"
          // rules={[REQUIRED]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Input />
        </Item>
        <Row gutter={16}>
          <Col span={12}>
            <Item
              label="Người ký"
              name="NguoiKy"
              rules={[REQUIRED]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input />
            </Item>
          </Col>
          <Col span={12}>
            <Item
              label="Chức vụ người ký"
              name="ChucVu"
              rules={[REQUIRED]}
              labelCol={{ span: 24 }}
              wrapperCol={{ span: 24 }}
            >
              <Input />
            </Item>
          </Col>
        </Row>
        <Item
          label="Tệp đính kèm"
          name=""
          {...ITEM_LAYOUT}
          style={{ marginBottom: "20px" }}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px", // Add spacing between the button and file list
              flexWrap: "wrap", // Wrap files to next line if necessary
            }}
          >
            <div
              style={{ display: "flex", alignItems: "flex-start", gap: "15px" }}
            >
              <Upload
                multiple={true}
                showUploadList={false}
                beforeUpload={(file, fileList) => {
                  fileList.forEach((file) => {
                    beforeUploadFile(file, genDataFileDinhKem, fileList);
                  });
                  return false;
                }}
                disabled={loading}
              >
                <button
                  type="primary"
                  icon={<CloudUploadIcon />}
                  size="large"
                  style={{
                    backgroundColor: "white",
                    borderRadius: "10px",
                    fontWeight: "400",
                    fontSize: "14px",
                    border: "1px solid #E5E5E5",
                    width: "197px",
                    height: "40px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                  }}
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
                  <span>Tải tệp từ máy lên</span>
                </button>
              </Upload>
              {ListFileDinhKem && ListFileDinhKem.length > 0 && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "10px",
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
                        justifyContent: "space-between",
                        maxWidth: "500px",
                        overflow: "hidden",
                        whiteSpace: "nowrap",
                        textOverflow: "ellipsis",
                      }}
                    >
                      <a
                        target="_blank"
                        href={item?.UrlFile}
                        style={{
                          color: "#007BFF",
                          fontWeight: "400",
                          fontSize: "14px",
                          textDecoration: "none",
                          overflow: "hidden",
                          whiteSpace: "nowrap",
                          textOverflow: "ellipsis",
                          maxWidth: "250px",
                        }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "#1890ff")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = "#007BFF")
                        }
                      >
                        {item?.name || item?.TenFile}
                      </a>
                      <button
                        onClick={() => {
                          if (item.FileID) {
                            setFileID((prevFileIDs) => [
                              ...prevFileIDs,
                              item.FileID,
                            ]);
                          }
                          setListFileDinhKem((prevFiles) =>
                            prevFiles.filter((_, i) => i !== index)
                          );
                        }}
                        style={{
                          background: "none",
                          border: "none",
                          cursor: "pointer",
                          color: "red",
                          fontSize: "16px",
                        }}
                      >
                        <DeleteIcon />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Item>
      </Form>
    </Modal>
  );
};
export { ModalAddEdit };
