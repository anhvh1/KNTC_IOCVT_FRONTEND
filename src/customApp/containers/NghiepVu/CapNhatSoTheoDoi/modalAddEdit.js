import React, { useEffect, useState } from 'react';
import { ITEM_LAYOUT, REQUIRED } from '../../../../settings/constants';
import { Radio, Row, Col, Input, DatePicker } from 'antd';

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
import dayjs from 'dayjs';
const { TextArea } = Input;
export default (props) => {
  const [form] = useForm();

  const { dataEdit, loading, visible, action, CuocThanhTraID } = props;

  useEffect(() => {
    if (dataEdit && dataEdit.ID) {
      const ThoiGian = dayjs(dataEdit.ThoiGian).format("DD/MM/YYYY");
      form &&
        form.setFieldsValue({
          ...dataEdit,
          ThoiGian: ThoiGian ? dayjs(ThoiGian, "DD/MM/YYYY") : null,
        });
    }
  }, []);

  const onOk = async (e) => {
    e.preventDefault();
    const value = await form.validateFields();
    props.onCreate({
      ...value,
      CuocThanhTraID: CuocThanhTraID,
    });
  };
  return (
    <Modal
      title={`${action === "edit" ? "Sửa" : "Thêm"} nội dung rà soát`}
      width={"50%"}
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
        {action === "edit" ? <Item name={"ID"} hidden /> : ""}

        <Item
          label="Ngày có kết quả rà soát"
          name={"ThoiGian"}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          rules={[REQUIRED]}
        >
          <DatePicker placeholder="Chọn ngày" format={"DD/MM/YYYY"} />
        </Item>
        <Item
          label="Nội dung rà soát"
          name={"NoiDung"}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <TextArea rows={4} />
        </Item>
      </Form>
    </Modal>
  );
};
