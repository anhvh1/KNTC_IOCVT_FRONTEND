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
import dayjs from "dayjs";
import { handleRenderFileDinhKem } from "./common";
import { formatNoiDung } from "../../../../../helpers/utility";
const FormReport = ({
  form,
  title,
  onOk,
  onRemove,
  dataFields,
  showModal,
  hideModal,
  stateModal,
  onEdit,
  onChangeForm,
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
      name: "ThoiGian",
      label: "Ngày báo cáo",
      type: FORM.DatePicker,
      required: true,
    },
    {
      name: "NoiDung",
      label: "Nội dung",
      type: FORM.InputTextArea,
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
      title: "Ngày báo cáo",
      dataIndex: "ThoiGian",
      key: "ThoiGian",
      width: "20%",
      render: (text, record, index) => {
        return <p>{text ? dayjs(text).format("DD/MM/YYYY") : ""}</p>;
      },
    },
    {
      title: "Nội dung",
      dataIndex: "NoiDung",
      key: "NoiDung",
      width: "30%",
      render: (text, record, index) => formatNoiDung(text),
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
              <DeleteIcon onClick={() => onRemove(record)} />
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
        title="Thêm mới báo cáo giải trình đoàn thanh tra"
        key={stateModal.key}
      >
        <FormDynamic
          form={form}
          listFields={listFields}
          data={stateModal.data}
          keyRef={stateModal.key}
          onChangeForm={onChangeForm}
        />
      </ModalForm>
    </>
  );
};

export default FormReport;
