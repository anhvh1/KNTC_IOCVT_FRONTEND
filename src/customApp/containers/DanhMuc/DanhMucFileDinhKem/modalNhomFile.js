import React, {useEffect, useState} from 'react';
import {ITEM_LAYOUT, REQUIRED} from '../../../../settings/constants';
import {Form, Radio} from 'antd';
import Inputnumber from '../../../../components/uielements/InputNumber';
import {
  Button,
  Modal,
  Input,
} from '../../../../components/uielements/exportComponent';

const {Item, useForm} = Form;

export default (props) => {
  const [form] = useForm();
  const {dataEdit, loading, visible, action} = props;
  const [isFormSuccess, setIsFormSuccess] = useState(true);

  useEffect(() => {
    if (dataEdit && dataEdit.NhomFileID) {
      form &&
        form.setFieldsValue({
          ...dataEdit,
          TrangThaiSuDung: dataEdit.TrangThaiSuDung ? 1 : 0,
        });
    }
  }, []);

  const onOk = async (e) => {
    e.preventDefault();
    const value = await form.validateFields();
    props.onCreate({
      ...value,
      ThuTuHienThi: parseInt(value.ThuTuHienThi),
      TrangThaiSuDung: Boolean(value.TrangThaiSuDung),
    });
  };

  const handleChangedFields = (changedValues, allValues) => {
    const {TenNhomFile, ThuTuHienThi} = allValues;

    if (TenNhomFile && ThuTuHienThi) setIsFormSuccess(false);
    else setIsFormSuccess(true);
  };

  return (
    <Modal
      title={`${action === 'edit' ? 'Sửa' : 'Thêm'} nhóm file`}
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
          form="formnhomfile"
          // loading={loading}
          onClick={onOk}
          // disabled={isFormSuccess}
        >
          Lưu
        </Button>,
      ]}
    >
      <Form
        form={form}
        name={'formnhomfile'}
        initialValues={{
          TrangThaiSuDung: 1,
          ThuTuHienThi: 1,
        }}
        onValuesChange={handleChangedFields}
      >
        {action === 'edit' ? <Item name={'NhomFileID'} hidden /> : ''}

        <Item
          label="Tên nhóm"
          name={'TenNhomFile'}
          {...ITEM_LAYOUT}
          rules={[REQUIRED]}
        >
          <Input placeholder={'Nhập tên nhóm'} />
        </Item>
        <Item
          label="Thứ tự hiển thị"
          name={'ThuTuHienThi'}
          {...ITEM_LAYOUT}
          rules={[
            REQUIRED,
            {
              message: 'Vui lòng nhập số nguyên',
              pattern: new RegExp(/^[0-9]+$/),
            },
          ]}
        >
          <Inputnumber
            min={1}
            max={100000}
            placeholder={'Nhập thứ tự hiển thị'}
          />
        </Item>
        <Item label="Sử dụng" name={'TrangThaiSuDung'} {...ITEM_LAYOUT}>
          <Radio.Group>
            <Radio value={1}>Có</Radio>
            <Radio value={0}>Không</Radio>
          </Radio.Group>
        </Item>
      </Form>
    </Modal>
  );
};
