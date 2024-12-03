import React, {useEffect, useRef, useState} from 'react';
import {
  ITEM_LAYOUT,
  ITEM_LAYOUT_SMALL_2,
  REQUIRED,
  ITEM_LAYOUT_HALF,
} from '../../../../settings/constants';
import {
  Option,
  Select,
} from '../../../../components/uielements/exportComponent';
import moment from 'moment';
import {Checkbox, Form, Radio, Upload, message} from 'antd';
import {getValueConfigLocalByKey} from '../../../../helpers/utility';
import {
  Button,
  Modal,
  InputFormatSpecific,
  Input,
  DatePicker,
} from '../../../../components/uielements/exportComponent';
import DatePickerFormat from '../../../../components/uielements/datePickerFormat';
import {checkInputNumber} from '../../../../helpers/utility';
import TextArea from 'antd/lib/input/TextArea';

const {Item, useForm} = Form;

export default (props) => {
  const [form] = useForm();
  const {dataEdit, loading, visible, action} = props;
  const [ListFileDinhKem, setListFileDinhKem] = useState([]);
  const [isFile, setIsFile] = useState(false);

  useEffect(() => {
    if (dataEdit && dataEdit.QuyTrinhID) {
      form &&
        form.setFieldsValue({
          ...dataEdit,
        });
    }
    if (dataEdit && dataEdit.FileDinhKem) {
      setListFileDinhKem([dataEdit.FileDinhKem]);
    }
  }, []);

  const onOk = async (e) => {
    e.preventDefault();
    const value = await form.validateFields();
    value.File = ListFileDinhKem[0];
    if (ListFileDinhKem[0]) {
      props.onCreate(value);
    } else {
      message.destroy();
      message.warning('Vui lòng đính kèm file tài liệu ');
    }
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
    const newListFileDinhKem = [...listFile];
    // newListFileDinhKem.push(file);
    setListFileDinhKem(newListFileDinhKem);
    setIsFile(true);
  };

  return (
    <Modal
      title={`Cập nhật quy trình`}
      width={600}
      visible={visible}
      onCancel={props.onCancel}
      footer={[
        <Button key="back" onClick={props.onCancel}>
          Hủy
        </Button>,
        <Button type="primary" loading={loading} onClick={onOk}>
          Lưu
        </Button>,
      ]}
    >
      <Form form={form}>
        <Item name={'QuyTrinhID'} hidden />
        <Item
          label="Tên quy tình"
          name={'TenQuyTrinh'}
          {...ITEM_LAYOUT}
          rules={[REQUIRED]}
        >
          <Input />
        </Item>
        <div
          className="wrapper-file"
          style={{display: 'flex', gap: 10, alignItems: 'center'}}
        >
          <Upload
            showUploadList={false}
            // multiple={true}
            beforeUpload={(file, listFile) =>
              beforeUploadFile(file, genDataFileDinhKem, listFile)
            }
            // accept={".pdf, .doc, .docx"}
            disabled={loading}
          >
            <Button type={'primary'} loading={loading} className="btn-upload">
              Chọn file tài liệu từ máy tính
            </Button>
          </Upload>
          {ListFileDinhKem
            ? ListFileDinhKem.map((item) => (
                <a href={item?.FileUrl} target="_blank">
                  <p>{item.name || item.TenFile}</p>
                </a>
              ))
            : null}
        </div>
      </Form>
    </Modal>
  );
};
