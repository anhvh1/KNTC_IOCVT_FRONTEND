import React, {useEffect, useState} from 'react';
import {ITEM_LAYOUT, REQUIRED} from '../../../../settings/constants';
import {Form, Radio} from 'antd';
import Select, {Option} from '../../../../components/uielements/select';
import Inputnumber from '../../../../components/uielements/InputNumber';
import {
  Button,
  Modal,
  Input,
} from '../../../../components/uielements/exportComponent';

const {Item, useForm} = Form;

export default (props) => {
  const [form] = useForm();
  const {dataEdit, loading, visible, action, NhomFileID} = props;
  const [isFormSuccess, setIsFormSuccess] = useState(true);

  useEffect(() => {
    if (dataEdit && dataEdit.FileID) {
      form &&
        form.setFieldsValue({
          ...dataEdit,
          ChucNangApDungID: dataEdit.ChucNangApDung.map(
            (item) => item.ChucNangID,
          ),
          TrangThaiSuDung: dataEdit.TrangThaiSuDung ? 1 : 0,
        });
    }
    if (!dataEdit.FileID) {
      form && form.setFieldValue('NhomFileID', NhomFileID);
    }
  }, []);

  const onOk = async (e) => {
    e.preventDefault();
    const value = await form.validateFields();
    props.onCreate({
      ...value,
      TrangThaiSuDung: Boolean(value.TrangThaiSuDung),
    });
  };

  const handleChangedFields = (changedValues, allValues) => {
    const {NhomFileID, TenFile, ChucNangApDungID, ThuTuHienThi} = allValues;

    if (NhomFileID && TenFile && ChucNangApDungID && ThuTuHienThi)
      setIsFormSuccess(false);
    else setIsFormSuccess(true);
  };

  return (
    <Modal
      title={`${action === 'edit' ? 'Sửa' : 'Thêm'} tên file đính kèm`}
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
          form="formtep"
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
        name={'formtep'}
        initialValues={{
          TrangThaiSuDung: 1,
          ThuTuHienThi: 1,
        }}
        onValuesChange={handleChangedFields}
      >
        {action === 'edit' ? <Item name={'FileID'} hidden /> : ''}

        <Item
          label="Nhóm file"
          name={'NhomFileID'}
          {...ITEM_LAYOUT}
          rules={[REQUIRED]}
        >
          <Select
            allowClear
            style={{width: '100%'}}
            placeholder={'Nhóm file'}
            name={'NhomFile'}
            notFoundContent={false}
            // disabled={true}
          >
            {props.DanhSachNhomFile.map((item, index) => (
              <Option key={index} value={item.NhomFileID}>
                {item.TenNhomFile}
              </Option>
            ))}
          </Select>
        </Item>
        <Item
          label="Tên file"
          name={'TenFile'}
          {...ITEM_LAYOUT}
          rules={[REQUIRED]}
        >
          <Input placeholder="Nhập tên file" />
        </Item>
        <Item
          label="Chức năng áp dụng"
          name={'ChucNangApDungID'}
          {...ITEM_LAYOUT}
          rules={[REQUIRED]}
        >
          <Select
            allowClear
            mode="multiple"
            style={{width: '100%'}}
            placeholder={'Chọn chức năng áp dụng'}
            name={'ChucNang'}
          >
            {props.DanhSachChucNangFile.map((item, index) => (
              <Option key={index} value={item.ChucNangID}>
                {item.TenChucNang}
              </Option>
            ))}
          </Select>
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
            placeholder="Nhập thứ tự hiển thị"
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
