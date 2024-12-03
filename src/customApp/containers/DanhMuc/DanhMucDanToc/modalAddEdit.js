import React, {useEffect, useState} from 'react';
import {ITEM_LAYOUT, REQUIRED} from '../../../../settings/constants';
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
    if (dataEdit && dataEdit.DanTocID) {
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
    // const {TenQuocTich,MaQuocTich}
    const value = await form.getFieldsValue();
    const {MaDanToc, TenDanToc} = value;
    if (MaDanToc && TenDanToc) {
      setIsFormSuccess(false);
    } else {
      setIsFormSuccess(true);
    }
  };

  return (
    <Modal
      title={`${action === 'edit' ? 'Sửa' : 'Thêm'} thông tin dân tộc`}
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
          form="formdantoc"
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
        name={'formdantoc'}
        initialValues={{
          TrangThai: 1,
        }}
        onChange={handleChangedFields}
      >
        {action === 'edit' ? <Item name={'DanTocID'} hidden /> : ''}
        <Item
          label="Mã dân tộc"
          name={'MaDanToc'}
          {...ITEM_LAYOUT}
          rules={[REQUIRED]}
        >
          <InputFormatSpecific />
        </Item>
        <Item
          label="Tên dân tộc"
          name={'TenDanToc'}
          {...ITEM_LAYOUT}
          rules={[REQUIRED]}
        >
          <Input />
        </Item>
        <Item label="Ghi Chú" name={'GhiChu'} {...ITEM_LAYOUT}>
          <Textarea />
        </Item>
        <Item label="Đang sử dụng" name={'TrangThai'} {...ITEM_LAYOUT}>
          <Radio.Group name="radiogroup">
            <Radio value={1}>Có</Radio>
            <Radio value={0}>Không</Radio>
          </Radio.Group>
        </Item>
      </Form>
    </Modal>
  );
};
