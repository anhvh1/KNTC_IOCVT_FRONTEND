import React, { useEffect, useState } from "react";
import { ITEM_LAYOUT, REQUIRED } from "../../../../../../settings/constants";
import { Radio, Row, Col, Input, Table, DatePicker, message } from "antd";
import Upload from "../../../../../../components/uielements/upload";
import {
  DeleteOutlined,
  DownloadOutlined,
  SaveOutlined,
  UploadOutlined,
} from "@ant-design/icons";
import {
  Button,
  Modal,
  Select,
  Option,
  Textarea,
} from "../../../../../../components/uielements/exportComponent";
import { customizeItemValidator as Item } from "../../../../../../components/uielements/itemValidator";
import {
  customizeFormValidator as Form,
  useForm,
} from "../../../../../../components/uielements/formValidator";
import DeleteIcon from "../../../../../../components/utility/DeleteIcon";
import { CloseSquareFilled, SaveFilled } from "@ant-design/icons";
import api, { apiUrl } from "../../config";
import dayjs from "dayjs";
import { formDataCaller } from "../../../../../../api/formDataCaller";
import {
  getBase64,
  getValueConfigLocalByKey,
} from "../../../../../../helpers/utility";

export default (props) => {
  const [form] = useForm();

  const {
    dataModalAddEdit,
    loading,
    visible,
    action,
    CuocThanhTraID,
    CapNhapLoaiSoLieuID,
  } = props;
  console.log("dataModalAddEdit", dataModalAddEdit);
  useEffect(() => {
    if (dataModalAddEdit && dataModalAddEdit.length > 0) {
      const firstItem = dataModalAddEdit[0];
      form.setFieldsValue({
        CongBoKLID: firstItem.CongBoKLID,
        CapNhapSoLieuID: firstItem.CapNhapSoLieuID,
        CapNhapLoaiSoLieuID: firstItem.CapNhapLoaiSoLieuID,
        LoaiSoLieu: firstItem.LoaiSoLieu,
        NoiDung: firstItem.NoiDung,
        // ... other fields as necessary
      });
      if (
        dataModalAddEdit?.FileInfos &&
        dataModalAddEdit.FileInfos.length > 0
      ) {
        const files = Array.isArray(dataModalAddEdit.FileInfos)
          ? dataModalAddEdit.FileInfos.map((file) => ({
              TenFile: file.TenFile,
              UrlFile: file.UrlFile,
              FileID: file.FileID,
            }))
          : [];
        // console.log('Mapped files:', files);
        setListFileDinhKem(files);
      } else {
        // console.log('No valid FileInfos found, setting empty array');
        setListFileDinhKem([]);
      }

      // Set dataSource for the table
      const newDataSource = Array.isArray(dataModalAddEdit)
        ? dataModalAddEdit.map((item, index) => ({
            key: index.toString(),
            NoiDung: item.NoiDung || "",
            FileIDs: Array.isArray(item.FileInfos)
              ? item.FileInfos.map((file) => file.FileID)
              : [],
            FileDinhKem: item.FileInfos || [],
            FileDeleteIDs: [],
            CapNhapSoLieuID: item.CapNhapSoLieuID || 0,
            CapNhapLoaiSoLieuID: item.CapNhapLoaiSoLieuID || 0,
            CongBoKLID: item.CongBoKLID || 0,
          }))
        : [];
      setDataSource([
        {
          key: "",
          NoiDung: "",
          FileIDs: [],
          FileDinhKem: [],
          FileDeleteIDs: [],
          CapNhapSoLieuID: 0,
          CapNhapLoaiSoLieuID: 0,
          CongBoKLID: 0,
        },
        ...newDataSource,
      ]);
      setSoLieu(newDataSource);
    }
  }, [dataModalAddEdit, form]);
  const [CongBoKLID, setCongBoKLID] = useState();
  const [DoiTuong, setDoiTuong] = useState();
  const [IdFile, setIdFile] = useState([]);
  const [DeleteIDs, setDeleteIDs] = useState([]);
  console.log("DeleteIDs", DeleteIDs);
  console.log("IdFile", IdFile);
  useEffect(() => {
    GetCongBoKL();
    GetListDoiTuong();
  }, []);
  const uploadfile = (FileData, recordKey) => {
    return new Promise((resolve, reject) => {
      // Trả về Promise
      const formSave = new FormData();
      if (FileData && Array.isArray(FileData)) {
        FileData.forEach((file) => {
          console.log("Appending file:", file);
          formSave.append("FileUploads", file);
        });
      } else if (FileData) {
        console.log("Appending single file:", FileData);
        formSave.append("FileUploads", FileData);
      }
      formDataCaller(
        `${apiUrl.UploadFileBeforeAction}?type=${
          action === "add" || action === "edit"
            ? 6
            : action === "add7" || action === "edit7"
            ? 7
            : 6
        }`,
        formSave
      )
        .then((response) => {
          if (response.data.Status > 0) {
            setIdFile((prevIdFile) => [...prevIdFile, ...response.data.Data]);
            resolve(response.data.Data); // Resolve Promise với dữ liệu
          } else {
            message.destroy();
            message.error(response.data.Message);
            reject(response.data.Message); // Reject Promise nếu có lỗi
          }
        })
        .catch((error) => {
          message.destroy();
          message.error(error.toString());
          reject(error); // Reject Promise nếu có lỗi
        });
    });
  };
  const GetCongBoKL = () => {
    api
      .GetCongBoKL(CuocThanhTraID) // Fetching data based on CuocThanhTraID and TypeChucNang
      .then((res) => {
        if (res.data.Status > 0) {
          setCongBoKLID(res.data.Data); // Set fetched data
        } else {
          message.destroy();
          message.error(res.data.Message); // Error message if the API response fails
        }
      })
      .catch((error) => {
        message.destroy();
        message.error(error.toString()); // Catch any API errors
      });
  };
  const GetListDoiTuong = () => {
    api
      .GetListDoiTuong(CuocThanhTraID, 16) // Fetching data based on CuocThanhTraID and TypeChucNang
      .then((res) => {
        if (res.data.Status > 0) {
          setDoiTuong(res.data.Data); // Set fetched data
        } else {
          message.destroy();
          message.error(res.data.Message); // Error message if the API response fails
        }
      })
      .catch((error) => {
        message.destroy();
        message.error(error.toString()); // Catch any API errors
      });
  };
  const onOk = async (e) => {
    e.preventDefault();
    const value = await form.validateFields();
    const formattedValue = {
      ...(action === "add" || action === "add7"
        ? {
            ...value,
            CuocThanhTraID: CuocThanhTraID,
            LoaiSoLieu: action === "add" ? 6 : action === "add7" ? 7 : null,
            Child: dataSource
              ? dataSource.slice(1).map((item) => ({
                  CapNhapSoLieuID: 0,
                  CapNhapLoaiSoLieuID: 0,
                  FileIDs: item.FileIDs || null,
                  NoiDung: item.NoiDung || null,
                }))
              : [],
          }
        : {
            ...value,
            CapNhapLoaiSoLieuID: CapNhapLoaiSoLieuID,
            CuocThanhTraID: CuocThanhTraID,
            DeleteIDs: DeleteIDs || [],
            LoaiSoLieu: action === "edit" ? 6 : action === "edit7" ? 7 : null,
            Child: dataSource
              ? dataSource.slice(1).map((item) => ({
                  CapNhapSoLieuID: item.CapNhapSoLieuID,
                  FileDeleteIDs: item.FileDeleteIDs || [],
                  CapNhapLoaiSoLieuID: item.CapNhapLoaiSoLieuID,
                  NoiDung: item.NoiDung || null,
                  DaXuLy: null,
                  NgayXuLy: null,
                  FileIDs: item.FileIDs,
                }))
              : [],
          }),
    };
    props.onCreate(formattedValue);
    console.log("formattedValue", formattedValue);
  };

  const [dataSource, setDataSource] = useState(() => {
    const emptyFirstRow = {
      key: "0",
      NoiDung: "",
      FileIDs: "",
      CongBoKLID: "",
    };

    if (props.dataModalAddEdit && props.dataModalAddEdit.length > 0) {
      return [
        emptyFirstRow,
        ...props.dataModalAddEdit.map((item, index) => ({
          key: (index + 1).toString(),
          NoiDung: item.NoiDung || "",
          CongBoKLID: item.CongBoKLID || "",
        })),
      ];
    } else {
      return [emptyFirstRow];
    }
  });
  console.log("dataSource", dataSource);
  const [soLieu, setSoLieu] = useState();
  console.log("soLieu", soLieu);
  const [ListFileDinhKem, setListFileDinhKem] = useState([]);
  console.log("ListFileDinhKem", ListFileDinhKem);
  // const genDataFileDinhKem = (base64, file, listFile, recordKey) => {

  //   const newDataSource = dataSource.map((item) => {
  //     if (item.key === recordKey) {
  //       const newFiles = listFile.map((f) => ({
  //         TenFile: f.name,
  //         UrlFile: base64,
  //       }));
  //       return {
  //         ...item,
  //         FileDinhKem: [...(item.FileDinhKem || []), ...newFiles],
  //       };
  //     }
  //     return item;
  //   });
  //   setDataSource(newDataSource);
  //   const newListFileDinhKem = [...listFile];
  //   uploadfile(newListFileDinhKem, recordKey);
  //   setListFileDinhKem(newListFileDinhKem);
  // };
  const genDataFileDinhKem = (base64, file, listFile, recordKey) => {
    const newListFileDinhKem = [...listFile];

    // Gọi uploadfile trước để lấy response.data.Data
    uploadfile(newListFileDinhKem, recordKey).then((uploadedFileIDs) => {
      const newDataSource = dataSource.map((item) => {
        if (item.key === recordKey) {
          const newFiles = newListFileDinhKem.map((f) => ({
            TenFile: f.name,
            UrlFile: base64,
          }));
          return {
            ...item,
            FileDinhKem: [...(item.FileDinhKem || []), ...newFiles],
            FileIDs: [...(item.FileIDs || []), ...uploadedFileIDs], // Kết hợp dữ liệu cũ với uploadedFileIDs
          };
        }
        return item;
      });
      setDataSource(newDataSource);
    });
  };
  const beforeUploadFile = (file, callback, listFile, recordKey) => {
    const FileLimit = getValueConfigLocalByKey("data_config")?.fileLimit;
    const isLt2M = file.size / 1024 / 1024 < FileLimit;

    if (!isLt2M) {
      message.error(`File đính kèm phải nhỏ hơn ${FileLimit}MB`);
    } else {
      getBase64(
        file,
        (base64) => callback(base64, file, listFile, recordKey),
        listFile
      );
    }
    return false;
  };

  const columns = [
    {
      title: "Nội dung",
      dataIndex: "NoiDung",
      key: "NoiDung",
      render: (_, record) => (
        <Input
          value={record.NoiDung}
          onChange={(e) => handleChange(record.key, "NoiDung", e.target.value)}
        />
      ),
    },
    {
      title: "File đính kèm",
      dataIndex: "FileDinhKem",
      key: "FileDinhKem",
      render: (_, record) => (
        <div>
          <Upload
            multiple={false}
            showUploadList={false}
            beforeUpload={(file, fileList) => {
              beforeUploadFile(
                file,
                (base64, file, listFile, recordKey) => {
                  genDataFileDinhKem(base64, file, listFile, recordKey);
                },
                fileList,
                record.key
              );
              return false;
            }}
            disabled={loading}
          >
            <Button icon={<UploadOutlined />} type="primary" ghost>
              Thêm tệp
            </Button>
          </Upload>
          {record.FileDinhKem && record.FileDinhKem.length > 0 && (
            <div style={{ marginBottom: 8 }}>
              {record.FileDinhKem.map((file, index) => (
                <div
                  key={index}
                  style={{
                    border: "1px solid #d9d9d9",
                    borderRadius: "2px",
                    padding: "4px 8px",
                    marginBottom: 4,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <a
                    href={file.UrlFile}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ color: "#1890ff", marginRight: "auto" }}
                  >
                    {file.TenFile}
                  </a>
                  <div>
                    <DeleteIcon
                      onClick={() => {
                        handleDeleteFile(record.key, file);
                        setListFileDinhKem((prevFiles) =>
                          prevFiles.filter((_, i) => i !== index)
                        );
                        setIdFile((prevFiles) =>
                          prevFiles.filter((_, i) => i !== index)
                        ); // Thêm dòng này để xóa giá trị tương ứng trong setIdFile
                      }}
                      style={{ cursor: "pointer", color: "#ff4d4f" }}
                    />
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      ),
    },
    {
      title: "Thao tác",
      key: "action",
      align: "center",
      render: (_, record, index) => (
        <>
          {index === 0 ? (
            <svg
              onClick={() => {
                handleSave(record);
              }}
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
          ) : (
            // <Button
            //   style={{ textAlign: "center" }}
            //   icon={<DeleteOutlined />}
            //   onClick={() => {
            //     setDeleteIDs(prev => [...prev, record.CapNhapSoLieuID]); // Lưu CapNhapSoLieuID vào setDeleteIDs
            //     handleDelete(record.key);
            //   }}
            // />
            <button
              onClick={() => {
                setDeleteIDs((prev) => [...prev, record.CapNhapSoLieuID]); // Lưu CapNhapSoLieuID vào setDeleteIDs
                handleDelete(record.key);
              }}
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
          )}
        </>
      ),
    },
  ];

  const handleSave = (record) => {
    const newKey = Date.now().toString();
    const newRow = {
      key: newKey,
      NoiDung: record.NoiDung,
      FileDinhKem: record.FileDinhKem,
      FileIDs: record.FileIDs,
      FileDeleteIDs: [],
      CapNhapSoLieuID: record.CapNhapSoLieuID,
      CongBoKLID: record.CongBoKLID,
    };

    const clearedFirstRow = {
      ...dataSource[0],
      NoiDung: "",
      FileDinhKem: "",
      IdFile: "",
      FileIDs: "",
    };
    const updatedDataSource = [clearedFirstRow, newRow, ...dataSource.slice(1)];
    setDataSource(updatedDataSource);
    setSoLieu(updatedDataSource.slice(1));
    setIdFile([]);
    setListFileDinhKem([]);
  };
  const handleChange = (key, dataIndex, value) => {
    const newData = [...dataSource];
    const target = newData.find((item) => item.key === key);
    if (target) {
      target[dataIndex] = value;
      setDataSource(newData);
    }
  };
  const handleDelete = (key) => {
    const newDataSource = dataSource.filter((item) => item.key !== key);
    setDataSource(newDataSource);
    const newSoLieu = soLieu.filter((item) => item.key !== key);
    setSoLieu(newSoLieu);
  };
  // const handleDeleteFile = (recordKey, fileToDelete) => {
  //   const newDataSource = dataSource.map(item => {
  //     if (item.key === recordKey) {
  //       const fileIndex = item.FileDinhKem.findIndex(file => file === fileToDelete);
  //       if (fileIndex !== -1) {
  //         const newFileDinhKem = item.FileDinhKem.filter((_, index) => index !== fileIndex);
  //         const newFileIDs = Array.isArray(item.FileIDs) ? item.FileIDs.filter((_, index) => index !== fileIndex) : [];
  //         return { ...item, FileDinhKem: newFileDinhKem, FileIDs: newFileIDs };
  //       }
  //     }
  //     return item;
  //   });
  //   setDataSource(newDataSource);
  // };
  const handleDeleteFile = (recordKey, fileToDelete) => {
    const newDataSource = dataSource.map((item) => {
      if (item.key === recordKey) {
        const fileIndex = item.FileDinhKem.findIndex(
          (file) => file === fileToDelete
        );
        if (fileIndex !== -1) {
          const newFileDinhKem = item.FileDinhKem.filter(
            (_, index) => index !== fileIndex
          );
          const newFileIDs = Array.isArray(item.FileIDs)
            ? item.FileIDs.filter((_, index) => index !== fileIndex)
            : [];

          // Thêm FileID vào FileDeleteIDs nếu có
          const fileIDToDelete = item.FileIDs[fileIndex]; // Lấy FileID tương ứng
          const newFileDeleteIDs = [
            ...(item.FileDeleteIDs || []),
            fileIDToDelete,
          ]; // Thêm vào FileDeleteIDs

          return {
            ...item,
            FileDinhKem: newFileDinhKem,
            FileIDs: newFileIDs,
            FileDeleteIDs: newFileDeleteIDs,
          };
        }
      }
      return item;
    });
    setDataSource(newDataSource);
  };
  return (
    <Modal
      title={
        action === "add"
          ? "Thêm mới nội dung kiến nghị xử lý hoàn thiện cơ chế chính sách"
          : action === "edit"
          ? "Cập nhật nội dung kiến nghị xử lý hoàn thiện cơ chế chính sách"
          : action === "add7"
          ? "Thêm mới nội dung kiến nghị xử lý hoàn thiện ngoài cơ chế chính sách"
          : action === "edit7"
          ? "Thêm mới nội dung kiến nghị xử lý hoàn thiện ngoài cơ chế chính sách"
          : "Nội dung kiến nghị xử lý"
      }
      width={"50%"} // Increased width to accommodate more fields
      visible={visible}
      onCancel={props.onCancel}
      footer={[
        <Button
          type="danger"
          icon={<CloseSquareFilled />}
          key="back"
          onClick={props.onCancel}
        >
          Hủy
        </Button>,
        <Button
          key="submit"
          type="primary"
          icon={<SaveFilled />}
          onClick={onOk}
        >
          Lưu
        </Button>,
      ]}
    >
      <Form
        form={form}
        initialValues={{
          TrangThai: 1,
        }}
      >
        <Item
          label="Kết luận"
          name="CongBoKLID"
          rules={[REQUIRED]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Select allowClear name="CongBoKLID" listHeight={100}>
            {CongBoKLID?.map((item) => (
              <Option key={item.ID} value={item.ID}>
                {item.SoVanBan}
              </Option>
            ))}
          </Select>
        </Item>
        <div
          style={{
            fontFamily: "Roboto",
            fontSize: "16px",
            fontWeight: 400,
            lineHeight: "18.75px",
            textAlign: "left",
            color: "#000000",
            margin: "30px 0px",
          }}
        >
          Kiến nghị xử lý
        </div>
        <Table
          dataSource={dataSource}
          columns={columns}
          bordered
          pagination={false}
        />

        {/* You can add action buttons for "Thao tác" here if needed */}
      </Form>
    </Modal>
  );
};
