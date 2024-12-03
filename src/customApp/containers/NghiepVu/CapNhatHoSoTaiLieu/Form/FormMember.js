import React, { useState } from "react";
import { UploadOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { FORM, FORMCOL } from "../../../../../settings/constants";
import FormDynamic from "../../../../../customApp/containers/NghiepVu/Shared/Component/Form";
const FormMember = ({ form, title, dataFields, onChangeForm }) => {
  // Define the dynamic fields
  const listFields = [
    {
      name: "ID",
      label: "",
      hidden: true,
    },
    {
      name: "ListXoaFileIds",
      label: "",
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
      name: "CoQuanBanHanh",
      label: "Đơn vị, cơ quan ban hành",
      type: FORM.Input,
      required: true,
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

  return (
    <>
      <p className="title">{title}</p>
      <FormDynamic
        form={form}
        listFields={listFields}
        data={dataFields}
        onChangeForm={onChangeForm}
      />
    </>
  );
};

export default FormMember;
