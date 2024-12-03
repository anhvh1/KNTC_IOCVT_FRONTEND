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
import { handleRenderFileDinhKem } from "./common";
const FormDocumentCollect = ({
  form,
  title,
  onOk,
  onRemove,
  dataFields,
  showModal,
  hideModal,
  stateModal,
  onChangeForm,
  onEdit,
}) => {
  const listFields = [
    {
      name: "ListXoaFileIds",
      label: "",
      hidden: true,
    },
    {
      name: "ID",
      label: "",
      type: FORM.Input,
      hidden: true,
    },
    {
      name: "index",
      label: "",
      type: FORM.Input,
      hidden: true,
    },
    {
      name: "NoiDung",
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
      name: "ListFiles",
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
      dataIndex: "NoiDung",
      key: "NoiDung",
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
            {handleRenderFileDinhKem(
              record?.ListFiles || record?.FileDinhKem?.listFile
            )}
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
              <EditIcon onClick={() => onEdit({ ...record, index })} />
            </Tooltip>
            <Tooltip title="Xóa">
              <DeleteIcon onClick={() => onRemove(record, index)} />
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

      <BoxTable columns={columns} dataSource={dataFields} pagination={false} />
      <ModalForm
        visible={stateModal.visible}
        onCancel={hideModal}
        onOk={onOk}
        title="Thêm mới tài liệu thu thập"
        key={stateModal.key}
      >
        <FormDynamic
          onChangeForm={onChangeForm}
          form={form}
          listFields={listFields}
          data={stateModal.data}
          keyRef={stateModal.key}
        />
      </ModalForm>
    </>
  );
};

export default FormDocumentCollect;
