import React, {useEffect, useRef, useState} from 'react';
import {
  ITEM_LAYOUT2,
  ITEM_LAYOUT,
  ITEM_LAYOUT_SMALL_2,
  REQUIRED,
} from '../../../../settings/constants';
import {Form} from 'antd';
import {
  Button,
  Modal,
  InputFormatSpecific,
  Input,
  Radio,
} from '../../../../components/uielements/exportComponent';
import {checkInputNumber} from '../../../../helpers/utility';
import TextArea from 'antd/lib/input/TextArea';

const {Item, useForm} = Form;

export default (props) => {
  const [form] = useForm();
  const [isFormSuccess, setIsFormSuccess] = useState(true);
  const {dataEdit, loading, visible, action} = props;

  const [value1, setValue1] = useState();

  useEffect(() => {
    if (dataEdit && dataEdit.ChucVuID) {
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
    if (action === 'edit') {
      props.onCreate({
        ...value,
        TrangThai: value1 || value.TrangThai,
      });
    }
    if (action === 'add') {
      props.onCreate({
        ...value,
        TrangThai: value1 === undefined ? true : value1,
      });
    }
  };
  const handleChangedFields = async (changedValues, allValues) => {
    const value = await form.getFieldsValue();
    const {MaChucVu, TenChucVu, TrangThai, GhiChu} = value;
    if (
      MaChucVu &&
      TenChucVu &&
      (MaChucVu !== dataEdit.MaChucVu ||
        TenChucVu !== dataEdit.TenChucVu ||
        TrangThai !== dataEdit.TrangThai ||
        GhiChu !== dataEdit.GhiChu)
    ) {
      setIsFormSuccess(false);
    } else {
      setIsFormSuccess(true);
    }
  };

  return (
    <Modal
      title={`${action === 'edit' ? 'Sửa' : 'Thêm'} thông tin chức vụ`}
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
          form="formmonhoc"
          loading={loading}
          onClick={onOk}
          disabled={isFormSuccess}
        >
          Lưu
        </Button>,
      ]}
    >
      <Form form={form} name={'formmonhoc'} onChange={handleChangedFields}>
        {action === 'edit' ? <Item name={'ChucVuID'} hidden /> : ''}
        <Item
          label="Mã chức vụ"
          name={'MaChucVu'}
          {...ITEM_LAYOUT}
          rules={[REQUIRED]}
        >
          <InputFormatSpecific />
        </Item>
        <Item
          label="Tên chức vụ"
          name={'TenChucVu'}
          {...ITEM_LAYOUT}
          rules={[REQUIRED]}
        >
          <Input />
        </Item>
        <Item label="Ghi chú" name={'GhiChu'} {...ITEM_LAYOUT}>
          <TextArea />
        </Item>
        <Item label="Đang sử dụng" name={'TrangThai'} {...ITEM_LAYOUT}>
          <Radio.Group onChange={onChange1} value={value1} defaultValue={true}>
            <Radio value={true}>Có</Radio>
            <Radio value={false}>Không</Radio>
          </Radio.Group>
        </Item>
      </Form>
    </Modal>
  );
};
