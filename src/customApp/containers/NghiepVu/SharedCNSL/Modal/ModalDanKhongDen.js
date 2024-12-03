import React, {Component, useEffect, useState} from 'react';
import {
  MODAL_NORMAL,
  ITEM_LAYOUT,
  REQUIRED,
} from '../../../../../settings/constants';
import {Form, Input, Button, Upload, message, Modal as ModalAnt} from 'antd';
import Modal from '../../../../../components/uielements/modal';
import {getValueConfigLocalByKey} from '../../../../../helpers/utility';
import DatePickerFormat from '../../../../../components/uielements/datePickerFormat';
import {formatDate} from '../../../../../helpers/utility';
import dayjs from 'dayjs';
import moment from 'moment';

const {Item} = Form;

const ModalDanKhongDen = (props) => {
  const [ListFileDinhKem, setListFileDinhKem] = useState([]);
  const {useForm} = Form;
  const [form] = useForm();

  useEffect(() => {
    const {dataEdit} = props;
    if (dataEdit) {
      form &&
        form.setFieldsValue({
          ...dataEdit,
          NgayTruc: dataEdit.NgayTruc ? dayjs(dataEdit.NgayTruc) : null,
        });
    }
  }, []);

  const onOk = (e) => {
    e.preventDefault();
    form.validateFields().then((value) => {
      const newValue = {
        ...value,
      };
      newValue.NgayTruc = formatDate(newValue.NgayTruc);
      const {onCreate} = props;
      if (!(newValue.DanKhongDenID > 0)) {
        delete newValue.DanKhongDenID;
      }
      onCreate(newValue);
    });
  };

  const {confirmLoading, visible, onCancel, onPrint} = props;

  return (
    <Modal
      title={'Dân không đến'}
      width={MODAL_NORMAL}
      visible={visible}
      onCancel={onCancel}
      footer={[
        <Button key="back" onClick={onCancel}>
          Hủy
        </Button>,
        <Button loading={confirmLoading} onClick={onPrint} type="primary">
          Lưu và In
        </Button>,
        <Button loading={confirmLoading} onClick={onOk} type="primary">
          Lưu
        </Button>,
      ]}
    >
      <Form form={form}>
        <Item name="DanKhongDenID" hidden>
          <Input />
        </Item>
        <Item label="Ngày tiếp" name="NgayTruc" {...REQUIRED} {...ITEM_LAYOUT}>
          <DatePickerFormat style={{width: '100%'}} />
        </Item>
        <Item
          label="Tên lãnh đạo tiếp dân"
          name="TenCanBo"
          {...REQUIRED}
          {...ITEM_LAYOUT}
        >
          <Input />
        </Item>
        <Item label="Chức vụ" name="ChucVu" {...ITEM_LAYOUT}>
          <Input />
        </Item>
      </Form>
    </Modal>
  );
};
export default ModalDanKhongDen;
