import React, { useEffect, useRef, useState } from "react";
import {
  ITEM_LAYOUT,
  ITEM_LAYOUT_SMALL_2,
  REQUIRED,
  ITEM_LAYOUT_HALF,
} from "../../../../../settings/constants";
import {
  Option,
  Select,
} from "../../../../../components/uielements/exportComponent";
import moment from "moment";
import { Checkbox, Form, Radio } from "antd";
import {
  Button,
  Modal,
  InputFormatSpecific,
  Input,
  DatePicker,
} from "../../../../../components/uielements/exportComponent";
import DatePickerFormat from "../../../../../components/uielements/datePickerFormat";
import {
  checkInputNumber,
  formatDate,
  formatValueSendRequest,
} from "../../../../../helpers/utility";
import TextArea from "antd/lib/input/TextArea";
import CloudUploadIcon from "../../../../../components/utility/CloudUploadIcon";
const { Item, useForm } = Form;

export default (props) => {
  const [isFormSuccess, setIsFormSuccess] = useState(true);
  const [form] = useForm();
  const { dataEdit, loading, visible, action, DanhSachLoaiEmail } = props;

  useEffect(() => {
    if (dataEdit && dataEdit.EmailID) {
      form &&
        form.setFieldsValue({
          ...dataEdit,
        });
    }
  }, []);

  const onOk = async (e) => {
    e.preventDefault();
    const value = await form.validateFields();
    const newValue = {
      ...value,
    };
    formatValueSendRequest(newValue);
    props.onCreate(newValue);
  };

  const handleChangedFields = async (changedValues, allValues) => {
    const value = await form.getFieldsValue();
    const { ConfigKey, ConfigValue } = value;
    if (ConfigKey && ConfigValue) {
      setIsFormSuccess(false);
    } else {
      setIsFormSuccess(true);
    }
  };

  return (
    <Modal
      title={`${
        action === "edit" ? "Sửa thông tin email" : "Thêm mới thông tin email"
      }`}
      width={600}
      visible={visible}
      onCancel={props.onCancel}
      footer={[
        <Button key="back" onClick={props.onCancel}>
          Hủy
        </Button>,
        <Button
          key="submit"
          htmlType="submit"
          type="primary"
          form="formthutuc"
          loading={loading}
          onClick={onOk}
        >
          Lưu
        </Button>,
      ]}
    >
      <Form form={form} name={"formthutuc"} onChange={handleChangedFields}>
        {action === "edit" ? <Item name={"EmailID"} hidden /> : ""}
        <Item
          label="Tên thủ tục"
          name={"TenThuTuc"}
          {...ITEM_LAYOUT}
          rules={[REQUIRED]}
        >
          <Input />
        </Item>
        <Item label="Các bước thực hiện" name={"NoiDungEmail"} {...ITEM_LAYOUT}>
          <TextArea />
        </Item>
        <Item label="Tệp đính kèm">
          <CloudUploadIcon />
        </Item>
        <Item label="Duyệt thủ tục" name={"DuyetThuTuc"} {...ITEM_LAYOUT}>
          <Switch />
        </Item>
      </Form>
    </Modal>
  );
};
