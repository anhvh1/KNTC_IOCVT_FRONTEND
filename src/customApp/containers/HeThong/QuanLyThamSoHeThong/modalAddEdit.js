import React, { useEffect, useRef, useState } from "react";
import {
  ITEM_LAYOUT,
  ITEM_LAYOUT_SMALL_2,
  REQUIRED,
  ITEM_LAYOUT_HALF,
} from "../../../../settings/constants";
import { Radio } from "antd";
import {
  Button,
  Modal,
  InputFormatSpecific,
  Input,
} from "../../../../components/uielements/exportComponent";
import { Form } from "antd";
import { checkInputNumber } from "../../../../helpers/utility";
import TextArea from "antd/lib/input/TextArea";
import { customizeItemValidator as Item } from "../../../../components/uielements/itemValidator";
import {
  customizeFormValidator as FormAntd,
  useForm,
} from "../../../../components/uielements/formValidator";

export default (props) => {
  const [isFormSuccess, setIsFormSuccess] = useState(true);
  const [form] = useForm();
  const { dataEdit, loading, visible, action } = props;

  useEffect(() => {
    if (dataEdit && dataEdit.SystemConfigID) {
      form &&
        form.setFieldsValue({
          ...dataEdit,
          TrangThai: dataEdit.TrangThai ? 1 : 0,
        });
    }
  }, []);

  const onOk = async (e) => {
    e.preventDefault();
    const value = await form.validateFields();
    props.onCreate({
      ...value,
      TrangThai: Boolean(value.TrangThai),
    });
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
        action === "edit" ? "Sửa tham số hệ thống" : "Thêm mới chức năng"
      }`}
      width={450}
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
          form="formthamsohethong"
          loading={loading}
          onClick={onOk}
          disabled={isFormSuccess}
        >
          Lưu
        </Button>,
      ]}
    >
      <Form
        form={form}
        name={"formthamsohethong"}
        initialValues={{ TrangThai: 1 }}
        onChange={handleChangedFields}
      >
        {action === "edit" ? <Item name={"SystemConfigID"} hidden /> : ""}
        <Item
          label="Tham số"
          name={"ConfigKey"}
          {...ITEM_LAYOUT}
          rules={[REQUIRED]}
        >
          <InputFormatSpecific />
        </Item>
        <Form.Item
          label="Giá trị"
          name={"ConfigValue"}
          {...ITEM_LAYOUT}
          rules={[REQUIRED]}
        >
          <Input />
        </Form.Item>
        <Item label="Ghi chú" name={"Description"} {...ITEM_LAYOUT}>
          <TextArea />
        </Item>
        <Item label="Đang sử dụng" name={"TrangThai"} {...ITEM_LAYOUT}>
          <Radio.Group>
            <Radio value={1}>Có</Radio>
            <Radio value={0}>Không</Radio>
          </Radio.Group>
        </Item>
      </Form>
    </Modal>
  );
};
