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

  const { dataModalAddEdit, loading, visible, CuocThanhTraID, action, selectedYear, CanBoIDs } = props;
  useEffect(() => {
    if (CanBoIDs) {
      form &&
        form.setFieldsValue({
          CanBoIDs: CanBoIDs,
        });
    }
  }, []);
  const onOk = async (e) => {
    e.preventDefault();
    try {
      const values = await form.validateFields();
      const payload = {
        ...values,
        CuocThanhTraID: CuocThanhTraID,
      };
      props.onCreate(payload);
    } catch (error) {
      console.error("Validation failed:", error);
    }
  };
  return (
    <Modal
      title={`Phân công cập nhật số liệu`}
      width={450}
      visible={visible}
      onCancel={props.onCancel}
      footer={[
        <Button
          type="danger"
          icon={<CloseSquareFilled />}
          key="back"
          onClick={props.onCancel}>
          Hủy
        </Button>,
        <Button
          key="submit"
          type="primary"
          icon={<SaveFilled />}
          loading={loading}
          onClick={onOk}
        >
          Lưu
        </Button>,
      ]}
    >
      <Form
        form={form}
        name={"formHuyCuoc"}
      >
        <Item
          label="Thành viên"
          name={'CanBoIDs'}
          {...ITEM_LAYOUT}
          rules={[REQUIRED]}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <Select mode="multiple">
            {Array.isArray(dataModalAddEdit) ? dataModalAddEdit.map((item) => (
              <Option key={item.CanBoID} value={item.CanBoID}>
                {item.TenCanBo}
              </Option>
            )) : null}
          </Select>
        </Item>
      </Form>
    </Modal>
  );
};
