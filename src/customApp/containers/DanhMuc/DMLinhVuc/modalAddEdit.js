import React, { useEffect, useState } from 'react';
import { ITEM_LAYOUT, REQUIRED } from '../../../../settings/constants';
import { Radio, Row, Col, Input } from 'antd';

import {
  Button,
  Modal,
  Select,
  Option,
  Textarea,
} from '../../../../components/uielements/exportComponent';
import { checkInputNumber } from '../../../../helpers/utility';
import { InputFormatSpecific } from '../../../../components/uielements/exportComponent';
import { customizeItemValidator as Item } from '../../../../components/uielements/itemValidator';
import {
  customizeFormValidator as Form,
  useForm,
} from '../../../../components/uielements/formValidator';
import {
  CloseSquareFilled,
  SaveFilled
} from "@ant-design/icons";
export default (props) => {
  const [form] = useForm();

  const { dataEdit, loading, visible, action } = props;

  useEffect(() => {
    if (dataEdit && dataEdit.LinhVucID) {
      form &&
        form.setFieldsValue({
          ...dataEdit,
        });
    }
  }, []);

  const onOk = async (e) => {
    e.preventDefault();
    const value = await form.validateFields();
    props.onCreate({
      ...value,
      CoQuanTao: 0,
    });
  };
  return (
    <Modal
      title={`${action === "edit" ? "Sửa" : "Thêm"} lĩnh vực`}
      width={450}
      visible={visible}
      onCancel={props.onCancel}
      footer={[
        <Button type="danger"
          icon={<CloseSquareFilled />}
          key="back" onClick={props.onCancel}>
          Hủy
        </Button>,
        <Button
          key="submit"
          type="primary"
          icon={<SaveFilled />}
          form="formLinhVuc"
          loading={loading}
          onClick={onOk}
        >
          Lưu
        </Button>,
      ]}
    >
      <Form
        form={form}
        name={"formLinhVuc"}
        initialValues={{
          TrangThai: 1,
        }}
      >
        {action === "edit" ? <Item name={"LinhVucID"} hidden /> : ""}

        <Item
          label="Tên lĩnh vực"
          name={"TenLinhVuc"}
          {...ITEM_LAYOUT}
          rules={[REQUIRED]}
        >
          <Input />
        </Item>
      </Form>
    </Modal>
  );
};
