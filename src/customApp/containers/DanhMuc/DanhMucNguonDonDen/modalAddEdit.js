import React, {useEffect, useState} from 'react';
import {ITEM_LAYOUT, REQUIRED} from '../../../../settings/constants';
import {Form, Radio} from 'antd';
import {
  Button,
  Modal,
  Input,
  InputFormatSpecific,
  Textarea,
} from '../../../../components/uielements/exportComponent';
import {checkInputNumber} from '../../../../helpers/utility';

const {Item, useForm} = Form;

export default (props) => {
  const [form] = useForm();
  const [isFormSuccess, setIsFormSuccess] = useState(true);
  const {dataEdit, loading, visible, action} = props;

  useEffect(() => {
    if (dataEdit && dataEdit.NguonDonDenID) {
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

  const handleChangedFields = (changedValue, allValues) => {
    const {MaNguonDonDen, TenNguonDonDen} = allValues;

    if (MaNguonDonDen && TenNguonDonDen) setIsFormSuccess(false);
    else setIsFormSuccess(true);
  };

  return (
    <Modal
      title={`${action === 'edit' ? 'Sửa' : 'Thêm'} thông tin nguồn đơn đến`}
      width={450}
      open={visible}
      onCancel={props.onCancel}
      footer={[
        <Button key="back" onClick={props.onCancel}>
          Hủy
        </Button>,
        <Button
          key="submit"
          htmlType="submit"
          type="primary"
          form="formnguondonden"
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
        name={'formnguondonden'}
        initialValues={{
          TrangThai: 1,
        }}
        onValuesChange={handleChangedFields}
      >
        {action === 'edit' ? <Item name={'NguonDonDenID'} hidden /> : ''}

        <Item
          label="Mã nguồn đơn đến"
          name={'MaNguonDonDen'}
          {...ITEM_LAYOUT}
          rules={[REQUIRED]}
        >
          <InputFormatSpecific form={form} nameField="MaNguonDonDen" />
        </Item>
        <Item
          label="Tên nguồn đơn đến"
          name={'TenNguonDonDen'}
          {...ITEM_LAYOUT}
          rules={[REQUIRED]}
        >
          <Input />
        </Item>
        <Item label="Ghi chú" name={'GhiChu'} {...ITEM_LAYOUT}>
          <Textarea />
        </Item>
        <Item label="Đang sử dụng" name={'TrangThai'} {...ITEM_LAYOUT}>
          <Radio.Group>
            <Radio value={1}>Có</Radio>
            <Radio value={0}>Không</Radio>
          </Radio.Group>
        </Item>
      </Form>
    </Modal>
  );
};
