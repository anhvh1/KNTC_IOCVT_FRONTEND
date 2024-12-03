import React, { useState } from "react";
import { message } from "antd";
import Upload from "../../../../components/uielements/upload";
import {
  UploadOutlined,
  CloudDownloadOutlined,
  CloudUploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  InputSearch,
  Select,
  Option,
  DatePicker,
} from "../../../../components/uielements/exportComponent";
import {
  Modal,
  Input,
  TreeSelect,
} from "../../../../components/uielements/exportComponent";
import { getValueConfigLocalByKey } from "../../../../helpers/utility";
import styled from "styled-components";
import {
  DONVIHANHCHINH,
  DOANHNGHIEP,
  REQUIRED,
} from "../../../../settings/constants";
import ModalViewImport from "./ModalViewImport";
import { customizeItemValidator as Item } from "../../../../components/uielements/itemValidator";
import {
  customizeFormValidator as Form,
  useForm,
} from "../../../../components/uielements/formValidator";
import CloudDownloadIcon from "../../../../components/utility/CloudDownloadIcon";
import CloudUploadIcon from "../../../../components/utility/CloudUploadIcon";
const Wrapper = styled.div`
  .wrap-form {
    display: flex;
    gap: 20px;
    .form-item {
      display: flex;
      align-items: center;
      gap: 20px;
    }
  }
  .dowload-btns {
    display: flex;
    align-items: center;
    gap: 20px;

    p {
      margin: 0;
      span {
        font-weight: 600;
      }
    }
  }
  .dowload-btns + .dowload-btns {
    margin-top: 10px;
  }
  .upload-file {
    display: flex;
    align-items: center;
    gap: 20px;
    /* justify-content: space-between; */
    flex-wrap: wrap;
    .list-file-upload {
      p {
        color: rgba(0, 123, 255, 1);
        text-decoration: underline;
        cursor: pointer;
      }
    }
  }
`;

const ModalImportPlan = ({
  visible,
  onCancel,
  onImport,
  onDowload,
  loadingDowload,
  isTTTrungUong,
}) => {
  const [form] = useForm();
  const [ListFileDinhKem, setListFileDinhKem] = useState([]);
  const [loadingFile, setloadingFile] = useState(false);
  const [stateModalViewImport, setStateModalViewImport] = useState({
    visible: false,
    data: null,
    key: null,
  });
  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        const formData = new FormData();
        console.log(ListFileDinhKem, "ListFileDinhKem");
        formData.append("file", ListFileDinhKem[0]);
        values.NamThanhTra = values.NamThanhTra
          ? values.NamThanhTra.format("YYYY")
          : null;
        onImport(formData, values);
      })
      .catch((info) => {
        console.log("Validate Failed:", info);
      });
  };

  const downloadTemplate = (templateNumber) => {
    // Logic để tải file mẫu
    message.success(`Đang tải file mẫu ${templateNumber}`);
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
    setloadingFile(false);
  };

  const beforeUploadFile = (file, callback, listFile) => {
    try {
      setloadingFile(true);
      const FileLimit = getValueConfigLocalByKey("data_config")?.fileLimit;
      const isLt2M = file.size / 1024 / 1024 < FileLimit;
      const ListFileExist = [];
      listFile?.forEach((file) => {
        const ExistFile = ListFileDinhKem.filter(
          (item) => item.TenFileGoc === file.name
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
    } catch (error) {
      setloadingFile(false);
      console.log(error, "error");
    }
  };

  return (
    <Modal
      visible={visible}
      title="Import kế hoạch"
      onCancel={onCancel}
      width={550}
      footer={[
        <Button key="back" onClick={onCancel}>
          Hủy
        </Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          Lưu
        </Button>,
      ]}
    >
      <Wrapper>
        <Form form={form} layout="vertical">
          <div className="wrap-form">
            <Item
              className="form-item"
              name="NamThanhTra"
              label="Kế hoạch năm"
              rules={[
                { required: true, message: "Vui lòng chọn năm kế hoạch!" },
              ]}
            >
              <DatePicker picker="year" format="YYYY" />
            </Item>

            {isTTTrungUong && (
              <Item
                className="form-item"
                name="CoQuanTrungUongID"
                label="Cơ quan trung ương"
                rules={[REQUIRED]}
              >
                <Select>
                  <Option value={1}>Cơ quan trung ương 1</Option>
                  <Option value={2}>Cơ quan trung ương 2</Option>
                  <Option value={3}>Cơ quan trung ương 3</Option>
                </Select>
              </Item>
            )}
          </div>

          <Item
            name="file"
            label="File import"
            rules={[{ required: true, message: "Vui lòng chọn file import!" }]}
          >
            <div className="upload-file">
              <Upload
                showUploadList={false}
                actions={false}
                // multiple={true}
                beforeUpload={(file, listFile) => {
                  beforeUploadFile(file, genDataFileDinhKem, listFile);
                }}
                disabled={loadingFile}
              >
                <Button
                  type="primary"
                  icon={<CloudUploadIcon />}
                  loading={loadingFile}
                >
                  Chọn tệp từ máy tính
                </Button>
              </Upload>
              <div className="list-file-upload">
                {ListFileDinhKem.length > 0 && (
                  <div>
                    {ListFileDinhKem.map((item, index) => (
                      <p key={index}>{item.name}</p>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Item>

          <Item>
            <div className="dowload-btns">
              <Button
                type="primary"
                icon={<CloudDownloadIcon />}
                onClick={() => onDowload(DONVIHANHCHINH)}
                loading={loadingDowload}
              >
                Tải xuống tệp mẫu 1
              </Button>
              <p>
                (dùng cho loại đối tượng là <span>Đơn vị hành chính</span>)
              </p>
            </div>
            <div className="dowload-btns">
              <Button
                type="primary"
                icon={<CloudDownloadIcon />}
                onClick={() => onDowload(DOANHNGHIEP)}
                loading={loadingDowload}
              >
                Tải xuống tệp mẫu 2
              </Button>
              <p>
                (dùng cho loại đối tượng là <span>Doanh nghiệp</span>)
              </p>
            </div>
          </Item>
        </Form>
      </Wrapper>
      {/* <ModalViewImport visible={true} /> */}
    </Modal>
  );
};

export default ModalImportPlan;
