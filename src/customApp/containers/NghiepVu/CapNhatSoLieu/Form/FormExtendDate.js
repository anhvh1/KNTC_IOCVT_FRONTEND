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
const FormExtendDate = ({ form, title }) => {
  const [listExtendDate, setListExtendDate] = useState([]);
  const { showModal, hideModal, stateModal } = useModal();
  const [formRef] = useForm();
  useEffect(() => {
    if (form) {
      form.setFieldsValue({
        listExtendDate: listExtendDate,
      });
    }
  }, [listExtendDate]);

  const handleRemoveDocument = (index) => {
    const newlistExtendDate = listExtendDate.filter((_, i) => i !== index);
    setListExtendDate(newlistExtendDate);
  };

  const updateDocument = () => {
    formRef.validateFields().then((values) => {
      const { index } = values;
      const newlistExtendDate = [...listExtendDate];
      if (index >= 0) {
        newlistExtendDate[index] = values;
      } else {
        newlistExtendDate.push(values);
      }
      setListExtendDate(newlistExtendDate);
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
      name: "SoNgayGiaHan",
      label: "Số ngày gia hạn (Số ngày làm việc)",
      type: FORM.InputNumber,
      required: true,
      col: FORMCOL.Col1P2,
    },
    {
      name: "DonViCoQuanBanHanh",
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
      name: "ListFileDinhKem",
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
      dataIndex: "SoNgayGiaHan",
      key: "SoNgayGiaHan",
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
        dataSource={listExtendDate}
        pagination={false}
      />
      <ModalForm
        visible={stateModal.visible}
        onCancel={hideModal}
        onOk={updateDocument}
        title={
          stateModal.data?.index
            ? "Cập nhật gia hạn thời gian thanh tra, kiểm tra"
            : "Gia hạn thời gian thanh tra, kiểm tra"
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

export default FormExtendDate;
