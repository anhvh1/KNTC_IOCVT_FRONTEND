import React, {useEffect, useState} from 'react';
import {ITEM_LAYOUT3, REQUIRED} from '../../../../settings/constants';
import {Form, Radio, Row, Col} from 'antd';
import {
  Button,
  Modal,
  Input,
  Select,
  Option,
  Textarea,
} from '../../../../components/uielements/exportComponent';
import {checkInputNumber} from '../../../../helpers/utility';
import {InputFormatSpecific} from '../../../../components/uielements/exportComponent';

const {Item, useForm} = Form;

export default (props) => {
  const [form] = useForm();
  const [isFormSuccess, setIsFormSuccess] = useState(true);

  const {dataEdit, loading, visible, action} = props;

  useEffect(() => {
    if (dataEdit && dataEdit.HuongGiaiQuyetID) {
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
  const handleChangedFields = async (changedValues, allValues) => {
    const value = await form.getFieldsValue();
    const {MaHuongGiaiQuyet, TenHuongGiaiQuyet} = value;
    if (MaHuongGiaiQuyet && TenHuongGiaiQuyet) {
      setIsFormSuccess(false);
    } else {
      setIsFormSuccess(true);
    }
  };

  return (
    <Modal
      title={`${action === 'edit' ? 'Sửa' : 'Thêm'} thông tin hướng giải quyết`}
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
          form="formhuonggiaiquyet"
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
        name={'formhuonggiaiquyet'}
        initialValues={{
          TrangThai: 1,
        }}
        onChange={handleChangedFields}
      >
        {action === 'edit' ? <Item name={'HuongGiaiQuyetID'} hidden /> : ''}

        <Item
          label="Mã hướng giải quyết"
          name={'MaHuongGiaiQuyet'}
          {...ITEM_LAYOUT3}
          rules={[REQUIRED]}
        >
          <InputFormatSpecific />
        </Item>

        <Item
          label="Tên hướng giải quyết"
          name={'TenHuongGiaiQuyet'}
          {...ITEM_LAYOUT3}
          rules={[REQUIRED]}
        >
          <Input />
        </Item>

        <Item label="Ghi Chú" name={'GhiChu'} {...ITEM_LAYOUT3}>
          <Textarea />
        </Item>

        <Item label="Sử dụng" name={'TrangThai'} {...ITEM_LAYOUT3}>
          <Radio.Group name="radiogroup">
            <Radio value={1}>Có</Radio>
            <Radio value={0}>Không</Radio>
          </Radio.Group>
        </Item>
      </Form>
    </Modal>
  );
};
