import React, {useEffect, useState} from 'react';
import {
  ITEM_LAYOUT_HALF,
  REQUIRED,
  ITEM_LAYOUT,
} from '../../../../settings/constants';
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
import {values} from 'lodash';
import TextArea from 'antd/lib/input/TextArea';
import {removeAscent2} from '../../../../helpers/utility';

const {Item, useForm} = Form;

export default (props) => {
  const [form] = useForm();
  const [isFormSuccess, setIsFormSuccess] = useState(true);
  const {dataEdit, loading, visible, action} = props;

  useEffect(() => {
    if (dataEdit && dataEdit.QuocTichID) {
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
    const ArrError = form.getFieldsError();
    const checkError = ArrError.filter((item) => item.errors.length > 0);
    if (checkError.length > 0) {
      setIsFormSuccess(true);
    } else {
      setIsFormSuccess(false);
    }
  };

  const handleChangedInput = ({target}) => {
    const {id, value} = target;
    form.setFieldsValue({[id]: removeAscent2(value)});
  };

  return (
    <Modal
      title={`${action === 'edit' ? 'Sửa' : 'Thêm'} thông tin quốc tịch`}
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
          disabled={isFormSuccess}
        >
          Lưu
        </Button>,
      ]}
    >
      <Form
        // onValuesChange  = {handleChangedFields}
        form={form}
        // name={"formquoctich"}
        initialValues={{
          TrangThai: 1,
        }}
        onFieldsChange={handleChangedFields}
      >
        {action === 'edit' ? <Item name={'QuocTichID'} hidden /> : ''}
        <Item
          label="Mã Quốc Tịch"
          name={'MaQuocTich'}
          {...ITEM_LAYOUT}
          rules={[{...REQUIRED}]}
        >
          {/* <Input onChange = {e => form.setFieldsValue({MaQuocTich : removeAscent2(e.target.value)})}/> */}
          <InputFormatSpecific />
          {/* <Input onChange = {handleChangedInput} /> */}
        </Item>
        <Item
          label="Tên Quốc Tịch"
          name={'TenQuocTich'}
          {...ITEM_LAYOUT}
          rules={[{...REQUIRED}]}
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
