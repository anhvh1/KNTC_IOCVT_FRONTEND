import React, { useEffect, useRef, useState } from "react";
import {
  ITEM_LAYOUT2,
  ITEM_LAYOUT_SMALL_2,
  REQUIRED,
  ITEM_LAYOUT,
} from "../../../../settings/constants";
import { Form, Radio } from "antd";
import {
  Button,
  Modal,
  InputFormatSpecific,
  Input,
} from "../../../../components/uielements/exportComponent";
import { checkInputNumber } from "../../../../helpers/utility";
import TextArea from "antd/lib/input/TextArea";

const { Item, useForm } = Form;

export default (props) => {
  const [form] = useForm();
  const [isFormSuccess, setIsFormSuccess] = useState(true);
  const { dataEdit, loading, visible, action } = props;
  const [value1, setValue1] = useState();

  useEffect(() => {
    if (dataEdit && dataEdit.TrangThaiDonID) {
      form &&
        form.setFieldsValue({
          ...dataEdit,
        });
    }
  }, []);
  const onChange1 = (e) => {
    setValue1(e.target.value);
  };
  const onOk = async (e) => {
    e.preventDefault();
    const value = await form.validateFields();
    if (action === "edit") {
      props.onCreate({
        ...value,
        TrangThai: value1 || value.TrangThai,
      });
    }
    if (action === "add") {
      props.onCreate({
        ...value,
        TrangThai: value1 === undefined ? true : value1,
      });
    }
  };
  const handleChangedFields = async (changedValues, allValues) => {
    const value = await form.getFieldsValue();
    const { MaTrangThaiDon, TenTrangThaiDon, TrangThai, GhiChu } = value;
    if (
      MaTrangThaiDon &&
      TenTrangThaiDon &&
        (MaTrangThaiDon !== dataEdit.MaTrangThaiDon ||
          TenTrangThaiDon !== dataEdit.TenTrangThaiDon ||
            TrangThai !== dataEdit.TrangThai ||
            GhiChu !== dataEdit.GhiChu)
    ) {
        setIsFormSuccess(false);
    } else {
        setIsFormSuccess(true);
    }
};

  const onChange = (e) => {
    setValue1(e.target.value);
  };

  return (
    <Modal
      title={`${action === "edit" ? "Sửa" : "Thêm"} thông tin trạng thái đơn`}
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
          form="formtrangthaidon"
          loading={loading}
          onClick={onOk}
          disabled={isFormSuccess}
        >
          Lưu
        </Button>,
      ]}
    >
      <Form form={form} name={"formtrangthaidon"} onChange={handleChangedFields}>
        {action === "edit" ? <Item name={"TrangThaiDonID"} hidden /> : ""}
        <Item
          label="Mã trạng thái đơn"
          name={"MaTrangThaiDon"}
          {...ITEM_LAYOUT}
          rules={[REQUIRED]}
        >
          <InputFormatSpecific />
        </Item>
        <Item
          label="Tên trạng thái đơn"
          name={"TenTrangThaiDon"}
          {...ITEM_LAYOUT}
          rules={[REQUIRED]}
        >
          <Input />
        </Item>
        <Item label="Ghi chú" name={"GhiChu"} {...ITEM_LAYOUT}>
          <TextArea />
        </Item>
        <Item label="Đang sử dụng" name={"TrangThai"} {...ITEM_LAYOUT}>
          <Radio.Group onChange={onChange1} value={value1} defaultValue={true}>
            <Radio value={true}>Có</Radio>
            <Radio value={false}>Không</Radio>
          </Radio.Group>
        </Item>
      </Form>
    </Modal>
  );
};
