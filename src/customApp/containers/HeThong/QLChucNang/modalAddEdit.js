import React, {useEffect, useState} from 'react';
import Inputnumber from '../../../../components/uielements/InputNumber';
import {
  ITEM_LAYOUT_HALF,
  REQUIRED,
  ITEM_LAYOUT,
} from '../../../../settings/constants';
import {Form, Radio, Row, Col, Checkbox, InputNumber} from 'antd';
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
import styled from 'styled-components';
import api from './config';
const StyledWidth = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .style-select {
    flex-grow: 1;
  }
`;
const {Item, useForm} = Form;

export default (props) => {
  const [form] = useForm();
  const [isFormSuccess, setIsFormSuccess] = useState(true);

  const {dataEdit, loading, visible, action} = props;

  useEffect(() => {
    if (dataEdit && dataEdit.ChucNangID) {
      form &&
        form.setFieldsValue({
          ...dataEdit,
          ChucNangChaID: props.DanhSachChucNang.find(
            (item) => item.ChucNangChaID === dataEdit.ChucNangChaID,
          )?.TenChucNang,
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

  const handleChangedFields = (changedValues, allValues) => {
    form
      .validateFields()
      .then((value) => {
        setIsFormSuccess(false);
      })
      .catch((err) => {
        setIsFormSuccess(true);
        // }
      });
  };

  const [DanhSachChucNangCha, setDanhSachChucNangCha] = useState([]);
  useEffect(() => {
    api.DanhSachCapCha().then((res) => setDanhSachChucNangCha(res.data.Data));
  }, []);

  return (
    <Modal
      title={`${action === 'edit' ? 'Sửa' : 'Thêm'} quản lý chức năng`}
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
          form="fromchucnang"
          loading={loading}
          onClick={onOk}
          disabled={isFormSuccess}
        >
          Lưu
        </Button>,
      ]}
    >
      <Form
        // onValuesChange  = {handle}
        form={form}
        name={'fromchucnang'}
        initialValues={{
          ThuTuSapXep: 1,
          TrangThai: 1,
          HienThiTrenMenu: false,
        }}
        onChange={handleChangedFields}
      >
        {action === 'edit' ? <Item name={'ChucNangID'} hidden /> : ''}
        <Item
          label="Chức năng cha"
          name={'ChucNangChaID'}
          {...ITEM_LAYOUT}
          // rules={[REQUIRED]}
        >
          <Select placeholder="Chọn chức năng cha">
            {DanhSachChucNangCha.map((items) => (
              <Option value={items.ChucNangID}>{items.TenChucNang}</Option>
            ))}
          </Select>
        </Item>
        <Item
          label="Mã chức năng"
          name={'MaChucNang'}
          {...ITEM_LAYOUT}
          rules={[REQUIRED]}
        >
          <Input />
        </Item>
        <Item
          label="Tên chức năng"
          name={'TenChucNang'}
          {...ITEM_LAYOUT}
          rules={[REQUIRED]}
        >
          <Input />
        </Item>
        <Item
          label="Icon trên menu"
          name={'Icon'}
          {...ITEM_LAYOUT}
          rules={[REQUIRED]}
        >
          <Input />
        </Item>
        <Row style>
          <Col flex="auto">
            <Item
              label="Thứ tự hiển thị"
              className="style-select"
              name={'ThuTuSapXep'}
              labelCol={{span: 12}}
              wrapperCol={{span: 12}}
              labelAlign="left"
            >
              <InputNumber style={{width: '100%'}} min={0} max={100000} />
            </Item>
          </Col>
          <Col span={8} style={{textAlign: 'right'}}>
            <Item name="HienThiTrenMenu" valuePropName="checked">
              <Checkbox>Hiển thị trên menu</Checkbox>
            </Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};
