import React, {useEffect, useState} from 'react';
import {ITEM_LAYOUT, REQUIRED} from '../../../../settings/constants';
import {Form, message, Space, Table, Tag, Upload, Tooltip} from 'antd';
import axios from 'axios';
import {
  Button,
  Modal,
  Input,
  Select,
  Option,
  Textarea,
  InputNumberFormat,
} from '../../../../components/uielements/exportComponent';
import {FileAddOutlined, UploadOutlined} from '@ant-design/icons';

import {checkInputNumber} from '../../../../helpers/utility';
import styled from 'styled-components';
import Checkbox from '../../../../components/uielements/checkbox';
import modal from '../../../../components/uielements/modal';
import {InputFormatSpecific} from '../../../../components/uielements/exportComponent';
import {getValueConfigLocalByKey} from '../../../../helpers/utility';
import {DeleteOutlined} from '@ant-design/icons';

import api from './config';
const {Item, useForm} = Form;
export default (props) => {
  const [form] = useForm();
  const [upload, setUpload] = useState();
  const {dataEdit, loading, visible, action, DanhSachLoaiThuTuc} = props;
  const [ListFileDinhKem, setListFileDinhKem] = useState([]);
  const [DanhSachThumbnail, setDanhSachThumbnail] = useState([]);
  const [isFile, setisFile] = useState(false);
  const handleChange = (value) => {};

  useEffect(() => {
    if (dataEdit && dataEdit.TrinhTuThuTucID) {
      form &&
        form.setFieldsValue({
          ...dataEdit,
        });
    }
    if (dataEdit && dataEdit.DanhSachFileDinhKem) {
      setListFileDinhKem(dataEdit.DanhSachFileDinhKem);
    }
  }, []);

  const onOk = async (e) => {
    e.preventDefault();
    form.validateFields().then((value) => {
      const newValue = {...value};
      newValue.DanhSachHoSoTaiLieu = ListFileDinhKem;
      newValue.DanhSachThumbnail = DanhSachThumbnail;
      props.onCreate(newValue);
    });
  };

  const beforeUploadFile = (file, callback, listFile) => {
    const FileLimit = getValueConfigLocalByKey('data_config')?.fileLimit;
    const isLt2M = file.size / 1024 / 1024 < FileLimit;
    const ListFileExist = [];
    listFile.forEach((file) => {
      const ExistFile = ListFileDinhKem.filter(
        (item) => item.TenFileGoc === file.name,
      );
      if (ExistFile.length) {
        ListFileExist.push(file);
      }
    });

    if (!isLt2M) {
      message.error(`File đính kèm phải nhỏ hơn ${FileLimit}MB`);
    } else {
      getBase64(file, callback, listFile);
    }
    // }
    return false;
  };

  const getBase64 = (file, callback, listFile) => {
    // listFile.forEach(file => {
    const reader = new FileReader();
    reader.addEventListener('load', () =>
      callback(reader.result, file, listFile),
    );
    reader.readAsDataURL(file);
    // })
  };

  const genDataFileDinhKem = (base64, file, listFile) => {
    const newListFileDinhKem = [...ListFileDinhKem, ...listFile];
    // newListFileDinhKem.push(file);\
    setListFileDinhKem(newListFileDinhKem);
    setisFile(false);
  };

  const genDataFileDinhKemThumnail = (base64, file, listFile) => {
    const FileType = file.name.slice(file.name.lastIndexOf('.') + 1);
    const arrType = ['png', 'jpg', 'jpeg'];
    if (arrType.includes(FileType)) {
      const newDanhSachThumbnail = [file];
      // newDanhSachThumbnail.push(file);
      setDanhSachThumbnail(newDanhSachThumbnail);
    } else {
      message.destroy();
      message.warning('Vui lòng đính kèm file ảnh');
    }
  };

  const deleteFileThumbnail = (index) => {
    const newDanhSachThumbnail = [...DanhSachThumbnail];
    newDanhSachThumbnail.splice(index, 1);
    setDanhSachThumbnail(newDanhSachThumbnail);
  };

  return (
    <Modal
      title={`${action === 'edit' ? 'Cập nhật' : 'Thêm'}  trình tự thủ tục`}
      width={600}
      visible={visible}
      onCancel={props.onCancel}
      footer={[
        <Button key="back" onClick={props.onCancel} loading={loading}>
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
        name={'formbieumau'}
        initialValues={{
          TrangThai: 1,
          CapID: 4,
          DuocSuDung: true,
        }}
      >
        {action === 'edit' ? <Item name={'TrinhTuThuTucID'} hidden /> : ''}
        <Item
          label="Tiêu đề "
          name={'TieuDe'}
          {...ITEM_LAYOUT}
          rules={[REQUIRED]}
        >
          <Input />
        </Item>
        <Item
          label="Nội dung thủ tục"
          name={'NoiDung'}
          {...ITEM_LAYOUT}
          rules={[REQUIRED]}
        >
          <Textarea />
        </Item>
        <Item label="File Thumbnail" {...ITEM_LAYOUT} rules={[REQUIRED]}>
          <Upload
            showUploadList={false}
            beforeUpload={(file, listFile) =>
              beforeUploadFile(file, genDataFileDinhKemThumnail, listFile)
            }
            // accept="image/png, image/jpeg"
            accept={'.png, .jpeg'}
            disabled={loading}
          >
            <Button loading={loading} className="btn-upload">
              <UploadOutlined /> Upload
            </Button>
          </Upload>
          {DanhSachThumbnail
            ? DanhSachThumbnail.map((item, index) => (
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  <p>
                    <a>{item.name}</a>
                  </p>
                  <DeleteOutlined onClick={() => deleteFileThumbnail(index)} />
                </div>
              ))
            : null}
        </Item>
        <Item
          label="Hiển thị"
          name={'Public'}
          {...ITEM_LAYOUT}
          valuePropName="checked"
        >
          <Checkbox defaultChecked={dataEdit?.Public} />
        </Item>

        <div className="wrapper-file">
          <Upload
            showUploadList={false}
            multiple={true}
            beforeUpload={(file, listFile) =>
              beforeUploadFile(file, genDataFileDinhKem, listFile)
            }
            // accept={".pdf, .doc, .docx"}
            disabled={loading}
          >
            <Button type={'primary'} loading={loading} className="btn-upload">
              Chọn file từ liệu từ máy tính
            </Button>
          </Upload>
        </div>
        {ListFileDinhKem && ListFileDinhKem?.length ? (
          <div style={{marginTop: '10px'}} className={'box-file'}>
            <table>
              <thead>
                <tr>
                  <th style={{width: '5%'}}>STT</th>
                  <th style={{width: '30%'}}>File đính kèm</th>
                  <th style={{width: '10%', textAlign: 'center'}}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {ListFileDinhKem.map((item, index) => (
                  <tr>
                    <td style={{textAlign: 'center'}}>{index + 1}</td>
                    <td>{item?.name || item?.TenFile}</td>
                    <td style={{textAlign: 'center'}}>
                      <span>
                        <Tooltip title={'Xóa file'}>
                          <DeleteOutlined
                            onClick={() => deteleFile(item, index)}
                          />
                        </Tooltip>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          ''
        )}
        {isFile ? (
          <span style={{color: 'red', marginLeft: '5px'}}>
            Vui lòng chọn file đính kèm
          </span>
        ) : (
          ''
        )}
      </Form>
    </Modal>
  );
};
