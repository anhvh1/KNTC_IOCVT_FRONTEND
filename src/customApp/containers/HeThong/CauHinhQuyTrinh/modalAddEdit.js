import React, {useEffect, useState} from 'react';
import {REQUIRED, ITEM_LAYOUT} from '../../../../settings/constants';
import {Form, Upload} from 'antd';
import axios from 'axios';
import {
  Button,
  Modal,
  Input,
  Select,
  Option,
} from '../../../../components/uielements/exportComponent';
import {FileAddOutlined} from '@ant-design/icons';
import {handleChangedFields} from '../../../../helpers/utility';
import api from './config';
import styled from 'styled-components';

const StyledColor = styled.div`
  color: red;
`;

const {Item, useForm} = Form;

export default (props) => {
  const [form] = useForm();

  const [upload, setUpload] = useState();
  const {dataEdit, loading, visible, action} = props;

  useEffect(() => {
    if (dataEdit && dataEdit.HuongDanSuDungID) {
      form &&
        form.setFieldsValue({
          ...dataEdit,
        });
    }
  }, []);

  const onOk = async (e) => {
    e.preventDefault();
    if (action === 'edit') {
      const value = await form.validateFields();
      let formData = new FormData();
      formData.append(
        'HuongDanSuDungModelStr',
        JSON.stringify({
          ChucNangID: value.ChucNangID,
          TieuDe: value.TieuDe,
          HuongDanSuDungID: value.HuongDanSuDungID,
        }),
      );
      upload ? formData.append('Files', upload.file.originFileObj) : null;
      props.onCreate(formData);
    } else {
      const value = await form.validateFields();
      let formData = new FormData();
      formData.append(
        'HuongDanSuDungModelStr',
        JSON.stringify({
          ChucNangID: value.ChucNangID,
          TieuDe: value.TieuDe,
          HuongDanSuDungID: value.HuongDanSuDungID,
        }),
      );
      upload ? formData.append('Files', upload.file.originFileObj) : null;
      props.onCreate(formData);
    }
  };

  const StyledBtnUpload = styled.div`
    button {
      background-color: #2878d7;
    }
    .crdzPD.ant-btn {
      color: white;
    }
    button:hover {
      background-color: #2878d7;
    }
    .ant-btn {
      background-color: #2878d7;
    }
    .uploadFile {
      margin-left: 20px;
    }
  `;
  const StyledImport = styled.div`
    .ant-input {
      padding: 0;
      border: none;
    }
  `;
  const [getAllChucNang, setGetAllChucNang] = useState([]);
  useEffect(() => {
    api.GetAllChucNang().then((res) => setGetAllChucNang(res.data.Data));
  }, []);

  const uploadFile = {
    onChange(info) {
      setUpload(info);
    },
  };
  return (
    <Modal
      title={`${action === 'edit' ? 'Sửa' : 'Thêm'} mới hướng dẫn sử dụng`}
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
          form="formquoctich"
          loading={loading}
          onClick={onOk}
        >
          Lưu
        </Button>,
      ]}
    >
      <Form form={form} name={'formhuongdan'}>
        {action === 'edit' ? <Item name={'HuongDanSuDungID'} hidden /> : ''}
        <Item
          label="Chức năng"
          name={'ChucNangID'}
          {...ITEM_LAYOUT}
          rules={[{...REQUIRED}]}
        >
          <Select placeholder="Chọn chức năng">
            {getAllChucNang.map((record, index) => {
              return (
                <Option
                  key={index}
                  disabled={!record.Highlight}
                  value={record.ChucNangID}
                >
                  {record.TenChucNang}
                </Option>
              );
            })}
          </Select>
        </Item>
        <Item
          label="Tiêu đề hướng dẫn"
          name={'TieuDe'}
          {...ITEM_LAYOUT}
          rules={[{...REQUIRED}]}
        >
          <Input />
        </Item>
        {action === 'edit' ? (
          <Item label="File Hướng dẫn" name={'importData'} {...ITEM_LAYOUT}>
            <StyledImport>
              <Upload {...uploadFile}>
                <StyledBtnUpload>
                  <Button icon={<FileAddOutlined />}>Chọn file</Button>
                </StyledBtnUpload>
              </Upload>
            </StyledImport>
          </Item>
        ) : (
          <Item
            label="File Hướng dẫn"
            name={'importData'}
            {...ITEM_LAYOUT}
            rules={[REQUIRED]}
          >
            <StyledImport>
              <Upload {...uploadFile}>
                <StyledBtnUpload>
                  <Button icon={<FileAddOutlined />}>Chọn file</Button>
                </StyledBtnUpload>
              </Upload>
            </StyledImport>
          </Item>
        )}
        <StyledColor>
          <p>
            Lưu ý : File hướng dẫn sử dụng yêu cầu file có định dạng .pdf và có
            dung lượng &#60; 10 MB
          </p>
        </StyledColor>
      </Form>
    </Modal>
  );
};
