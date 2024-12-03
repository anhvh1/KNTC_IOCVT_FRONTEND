import React, {useEffect} from 'react';
import {ITEM_LAYOUT_HALF, REQUIRED} from '../../../../settings/constants';
import {Form, Radio, Row, Col} from 'antd';
import {
  Button,
  Modal,
  Input,
  Select,
  Option,
} from '../../../../components/uielements/exportComponent';
import {checkInputNumber} from '../../../../helpers/utility';
import TextArea from 'antd/lib/input/TextArea';
import {InputFormatSpecific} from '../../../../components/uielements/exportComponent';
const {Item, useForm} = Form;

export default (props) => {
  const [form] = useForm();
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
          form="formquoctich"
          loading={loading}
          onClick={onOk}
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
      >
        {action === 'edit' ? <Item name={'DanTocID'} hidden /> : ''}
        <Item
          label="Mã dân tộc"
          name={'MaDanToc'}
          {...ITEM_LAYOUT_HALF}
          rules={[REQUIRED]}
        >
          <InputFormatSpecific />
        </Item>
        <Item
          label="Tên dân tộc"
          name={'TenDanToc'}
          {...ITEM_LAYOUT_HALF}
          rules={[REQUIRED]}
        >
          <Input />
        </Item>
        <Item label="Ghi Chú" name={'GhiChu'} {...ITEM_LAYOUT_HALF}>
          <TextArea />
        </Item>
        <Item label="Đang sử dụng" name={'TrangThai'} {...ITEM_LAYOUT_HALF}>
          <Radio.Group name="radiogroup">
            <Radio value={1}>Có</Radio>
            <Radio value={0}>Không</Radio>
          </Radio.Group>
        </Item>
      </Form>
    </Modal>
  );
};
