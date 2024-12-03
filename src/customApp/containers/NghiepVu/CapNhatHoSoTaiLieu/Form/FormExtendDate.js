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
import dayjs from "dayjs";
const FormExtendDate = ({
  form,
  title,
  onRemove,
  dataFields,
  onOk,
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
      name: "SoVanBan",
      label: "Số văn bản",
      type: FORM.Input,
      required: true,
      col: FORMCOL.Col1P2,
    },
    {
      name: "NgayBanHanh",
      label: "Ngày ban hành",
      type: FORM.DatePicker,
      required: true,
      col: FORMCOL.Col1P2,
    },
    {
      name: "SoNgay",
      label: "Số ngày gia hạn (Số ngày làm việc)",
      type: FORM.InputNumber,
      required: true,
      col: FORMCOL.Col1P2,
    },
    {
      name: "CoQuanBanHanh",
      label: "Đơn vị, cơ quan ban hành",
      type: FORM.Input,
      required: true,
      col: FORMCOL.Col1P2,
    },
    {
      name: "TrichYeu",
      label: "Trích yếu",
      type: FORM.InputTextArea,
    },
    {
      name: "NguoiKy",
      label: "Người ký",
      type: FORM.Input,
      required: true,
      col: FORMCOL.Col1P2,
    },
    {
      name: "ChucVuNguoiKy",
      label: "Chức vụ người ký",
      type: FORM.Input,
      required: true,
      col: FORMCOL.Col1P2,
    },
    {
      name: "ListFiles",
      label: "File đính kèm",
      type: FORM.Upload,
      required: true,
      col: FORMCOL.Col1P2,
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
      title: "Số văn bản",
      dataIndex: "SoVanBan",
      key: "SoVanBan",
      width: "20%",
    },
    {
      title: "Số ngày gia hạn",
      dataIndex: "SoNgay",
      key: "SoNgay",
      width: "30%",
    },
    {
      title: "Người ký",
      dataIndex: "NguoiKy",
      key: "NguoiKy",
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
        title={
          stateModal.data?.index
            ? "Cập nhật gia hạn thời gian thanh tra, kiểm tra"
            : "Gia hạn thời gian thanh tra, kiểm tra"
        }
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

export default FormExtendDate;
