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
import KEY_MENU from "../../CapNhatHoSoTaiLieu/constant";
import apiChung from "../../CapNhatHoSoTaiLieu/config";
import { styles } from "./style";
const FormResult = ({ form, title, dataFields }) => {
  const listFields = [
    {
      name: "ID",
      label: "",
      type: FORM.Input,
      hidden: true,
      // col: FORMCOL.Col1P2,
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
    <div style={styles.formImportContainer}>
      <h2 style={styles.title}>{title}</h2>
      <FormDynamic form={form} listFields={listFields} data={dataFields} />
    </div>
  );
};

export default FormResult;
