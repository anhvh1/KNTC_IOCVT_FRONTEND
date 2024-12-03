import React, { useEffect, useState } from "react";
import { Form } from "antd";
import ModalForm from "../../../../../customApp/containers/NghiepVu/Shared/Modal/ModalForm";
import FormDynamic from "../../../../../customApp/containers/NghiepVu/Shared/Component/Form";
import { useModal } from "../../../../CustomHook/useModal";
import BoxTable from "../../../../../components/utility/boxTable";
import { FORM, FORMCOL } from "../../../../../settings/constants";
import { Button } from "../../../../../components/uielements/exportComponent";
import AddIcon from "../../../../../components/utility/AddIcon";
import DeleteIcon from "../../../../../components/utility/DeleteIcon";
import EditIcon from "../../../../../components/utility/EditIcon";
import { useForm } from "../../../../../components/uielements/formValidator";
import { Tooltip, message } from "antd";
const FormImplementation = ({ form, title }) => {
  const [listDocument, setListDocument] = useState([]);
  const { showModal, hideModal, stateModal } = useModal();
  const [formRef] = useForm();
  useEffect(() => {
    if (form) {
      form.setFieldsValue({
        listDocument: listDocument,
      });
    }
  }, [listDocument]);

  const handleRemoveDocument = (index) => {
    const newListDocument = listDocument.filter((_, i) => i !== index);
    setListDocument(newListDocument);
  };

  const updateDocument = () => {
    formRef.validateFields().then((values) => {
      const { index } = values;
      const newListDocument = [...listDocument];
      if (index >= 0) {
        newListDocument[index] = values;
      } else {
        newListDocument.push(values);
      }
      setListDocument(newListDocument);
      hideModal();
    });
  };

  const dowloadFile = (file) => {
    if (file.url) {
      const a = document.createElement("a");
      a.href = file.url;
      a.download = file.name;
      a.click();
      a.remove();
    } else {
      message.error("File không tồn tại");
    }
  };

  const showModalEditDocument = (data) => {
    showModal(data);
  };

  const listFields = [
    {
      name: "index",
      label: "",
      type: FORM.Input,
      hidden: true,
    },
    {
      name: "TieuDe",
      label: "Tiêu đề/Nội dung",
      type: FORM.Input,
      required: true,
    },
    {
      name: "MoTa",
      label: "Mô tả",
      type: FORM.Input,
    },
    {
      name: "ListFileDinhKem",
      label: "File đính kèm",
      type: FORM.Upload,
      required: true,
    },
  ];

  const columns = [
    {
      title: "STT",
      dataIndex: "stt",
      key: "stt",
      width: "5%",
      align: "left",
      render: (text, record, index) => {
        return <p style={{ textAlign: "center" }}>{index + 1}</p>;
      },
    },
    {
      title: "Tiêu đề/ Nội dung",
      dataIndex: "TieuDe",
      key: "TieuDe",
      width: "20%",
    },
    {
      title: "Mô tả",
      dataIndex: "MoTa",
      key: "MoTa",
      width: "30%",
    },
    {
      title: "File đính kèm",
      dataIndex: "FileDinhKem",
      key: "FileDinhKem",
      width: "30%",
      render: (text, record, index) => {
        return (
          <>
            {record.ListFileDinhKem &&
              record.ListFileDinhKem?.length > 0 &&
              record.ListFileDinhKem.map((item, index) => {
                return (
                  <p>
                    <a key={index} onClick={() => dowloadFile(item)}>
                      {item.name || item.TenFileGoc}
                    </a>
                  </p>
                );
              })}
          </>
        );
      },
    },
    {
      title: "Thao tác",
      dataIndex: "action",
      key: "action",
      width: "10%",
      render: (text, record, index) => {
        return (
          <div className="btn-action">
            <Tooltip title="Sửa">
              <EditIcon
                onClick={() => showModalEditDocument({ ...record, index })}
              />
            </Tooltip>
            <Tooltip title="Xóa">
              <DeleteIcon onClick={() => handleRemoveDocument(index)} />
            </Tooltip>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <p className="title">{title}</p>
      <div className="btn-top">
        <Button type="add" icon={<AddIcon />} onClick={() => showModal()}>
          Thêm
        </Button>
      </div>

      <BoxTable
        columns={columns}
        dataSource={listDocument}
        pagination={false}
      />
      <ModalForm
        visible={stateModal.visible}
        onCancel={hideModal}
        onOk={updateDocument}
        title={
          stateModal.data?.index
            ? "Thêm mới tài liệu, nội dung đã thu thập"
            : "Cập nhật tài liệu, nội dung đã thu thập"
        }
        key={stateModal.key}
      >
        <FormDynamic
          form={formRef}
          listFields={listFields}
          data={stateModal.data}
          keyRef={stateModal.key}
        />
      </ModalForm>
    </>
  );
};

export default FormImplementation;
