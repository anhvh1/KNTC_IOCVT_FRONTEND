import React, { useEffect, useState } from 'react';
import { ITEM_LAYOUT, REQUIRED } from '../../../../settings/constants';
import { Radio, Row, Col, Input } from 'antd';
import {
  DONVIHANHCHINH,
  MAXLENGTHNOIDUNG,
} from "../../../../settings/constants";
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
import DatePickerFormat from '../../../../components/uielements/datePickerFormat';
const { TextArea } = Input;
import dayjs from 'dayjs';
export default (props) => {
  const [form] = useForm();

  const { dataEdit, loading, visible, action } = props;

  useEffect(() => {
    if (dataEdit && dataEdit.DonDocId) {
      const NgayDonDoc = dayjs(dataEdit.NgayDonDoc).format("DD/MM/YYYY");
      form &&
        form.setFieldsValue({
          ...dataEdit,
          NgayDonDoc: NgayDonDoc ? dayjs(NgayDonDoc, "DD/MM/YYYY") : null,
        });
    }
  }, []);

  const onOk = async (e) => {
    e.preventDefault();
    const value = await form.validateFields();
    props.onCreate({
      ...value,
    });
  };
  return (
    <Modal
      title={`${action === "edit" ? "Cập nhật thông tin" : "Thêm mới"} đôn đốc`}
      width={"70%"}
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
        {action === "edit" ? <Item name={"DonDocId"} hidden /> : ""}

        <Row gutter={16}>
          <Col span={12}>
            <Item label="Người đôn đốc" name={"NguoiDonDoc"} rules={[REQUIRED]}>
              <Input />
            </Item>
          </Col>
          <Col span={12}>
            <Item label="Ngày đôn đốc" name={"NgayDonDoc"} rules={[REQUIRED]}>
              <DatePickerFormat />
            </Item>
          </Col>
        </Row>
        <Item
          label="Nội dung đôn đốc"
          name={"NoiDungDonDoc"}
          maxLength={MAXLENGTHNOIDUNG}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
        >
          <TextArea rows={4} />
        </Item>
      </Form>
    </Modal>
  );
};
