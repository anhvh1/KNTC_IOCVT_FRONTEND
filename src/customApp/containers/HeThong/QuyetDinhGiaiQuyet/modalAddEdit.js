import React, {useEffect, useRef, useState} from 'react';
import {
  ITEM_LAYOUT,
  ITEM_LAYOUT_SMALL_2,
  REQUIRED,
  ITEM_LAYOUT_HALF,
} from '../../../../settings/constants';
import {
  Option,
  Select,
} from '../../../../components/uielements/exportComponent';
import moment from 'moment';
import {Checkbox, Form, Radio} from 'antd';
import {
  Button,
  Modal,
  InputFormatSpecific,
  Input,
  DatePicker,
} from '../../../../components/uielements/exportComponent';
import DatePickerFormat from '../../../../components/uielements/datePickerFormat';
import {
  checkInputNumber,
  formatDate,
  formatValueSendRequest,
} from '../../../../helpers/utility';
import TextArea from 'antd/lib/input/TextArea';

const {Item, useForm} = Form;

export default (props) => {
  const [isFormSuccess, setIsFormSuccess] = useState(true);
  const [form] = useForm();
  const [Active, setActive] = useState(true);
  const {dataEdit, loading, visible, action, DanhSachLoaiEmail} = props;

  useEffect(() => {
    if (dataEdit && dataEdit.EmailID) {
      form &&
        form.setFieldsValue({
          ...dataEdit,
          Active: dataEdit.Active ? 1 : 0,
          NgayTao: dataEdit.NgayTao ? moment(dataEdit.NgayTao) : null,
        });
      setActive(dataEdit.Active);
    }
  }, []);
  const onOk = async (e) => {
    e.preventDefault();
    const value = await form.validateFields();
    value.NgayTao = formatDate(value.NgayTao);
    formatValueSendRequest(value);
    props.onCreate({
      ...value,
      Active: Active,
    });
  };

  const handleChangedFields = async (changedValues, allValues) => {
    const value = await form.getFieldsValue();
    const {ConfigKey, ConfigValue} = value;
    if (ConfigKey && ConfigValue) {
      setIsFormSuccess(false);
    } else {
      setIsFormSuccess(true);
    }
  };

  return (
    <Modal
      title={`${
        action === 'edit' ? 'Sửa thông tin email' : 'Thêm mới thông tin email'
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
          form="formthamsohethong"
          loading={loading}
          onClick={onOk}
          // disabled={isFormSuccess}
        >
          Lưu
        </Button>,
      ]}
    >
      <Form
        form={form}
        name={'formthamsohethong'}
        // initialValues={{Active: 1}}
        onChange={handleChangedFields}
      >
        {action === 'edit' ? <Item name={'EmailID'} hidden /> : ''}
        <Item
          label="Ngày tạo"
          name={'NgayTao'}
          {...ITEM_LAYOUT}
          rules={[REQUIRED]}
        >
          <DatePickerFormat format="DD/MM/YYYY" />
        </Item>
        <Item
          label="Loại Email"
          name={'LoaiEmailID'}
          {...ITEM_LAYOUT}
          rules={[REQUIRED]}
        >
          <Select>
            {DanhSachLoaiEmail
              ? DanhSachLoaiEmail.map((item) => (
                  <Option value={item.LoaiEmailID}>{item.TenEmail}</Option>
                ))
              : null}
          </Select>
        </Item>
        <Item label="Nội dung" name={'NoiDungEmail'} {...ITEM_LAYOUT}>
          <TextArea />
        </Item>
        <Item label="Sử dụng" name={'Active'} {...ITEM_LAYOUT}>
          <Checkbox
            checked={Active}
            onChange={(e) => setActive(e.target.checked)}
          >
            Sử dụng
          </Checkbox>
        </Item>
      </Form>
    </Modal>
  );
};
