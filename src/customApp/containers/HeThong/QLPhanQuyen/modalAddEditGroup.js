import React, { useEffect } from "react";
import {
  ITEM_LAYOUT_SMALL_2,
  REQUIRED,
  ITEM_LAYOUT_SMALL,
} from "../../../../settings/constants";
import { Input, Button } from "antd";
import Modal from "../../../../components/uielements/modal";
import { customizeItemValidator as Item } from "../../../../components/uielements/itemValidator";
import {
  customizeFormValidator as Form,
  useForm,
} from "../../../../components/uielements/formValidator";
const ModalAddEditGroup = (props) => {
  const [form] = useForm();
  const { dataEdit, confirmLoading, visible, onCancel, NhomNguoiDungSelect } =
    props;

  useEffect(() => {
    if (dataEdit.NhomNguoiDungID) {
      form.setFieldsValue({
        ...dataEdit,
      });
    }
  }, []);

  const onOk = async (e) => {
    e.preventDefault();
    let value = await form.validateFields();
    value.applyType = 1;
    props.onCreate(value);
  };

  return (
    <Modal
      title={`${
        dataEdit.NhomNguoiDungID ? "Sửa" : "Thêm"
      } thông tin nhóm người dùng`}
      width={650}
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Hủy
        </Button>,
        <Button
          key="submit"
          htmlType="submit"
          type="primary"
          form="formAddEditGroup"
          loading={confirmLoading}
          onClick={onOk}
        >
          Lưu
        </Button>,
      ]}
    >
      <Form form={form} name="formAddEditGroup">
        <Item name={"NhomNguoiDungID"} hidden />
        <Item
          label="Tên nhóm người dùng"
          name={"TenNhom"}
          rules={[{ ...REQUIRED }]}
          {...ITEM_LAYOUT_SMALL_2}
        >
          <Input />
        </Item>
        <Item label="Ghi chú" name={"GhiChu"} {...ITEM_LAYOUT_SMALL_2}>
          <Input.TextArea autoSize={{ minRows: 3 }} />
        </Item>
      </Form>
    </Modal>
  );
};

export { ModalAddEditGroup };
