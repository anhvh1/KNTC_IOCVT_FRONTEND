import React, {useEffect, useRef, useState} from 'react';
import {
  ITEM_LAYOUT_SMALL_2,
  ITEM_LAYOUT_HALF,
  REQUIRED,
  ITEM_LAYOUT,
  ITEM_LAYOUT2,
  ITEM_LAYOUT3,
} from '../../../../settings/constants';
import {
  Checkbox,
  Radio,
  Row,
  Col,
  message,
  Upload,
  Tooltip,
  Popconfirm,
} from 'antd';
import {
  UploadOutlined,
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  SaveOutlined,
  CloseSquareOutlined,
  DownloadOutlined,
} from '@ant-design/icons';
import {Form} from 'antd';
import {
  Button,
  Select,
  Option,
  Textarea,
  InputFormatSpecific,
  Input,
  DatePicker,
  Modal,
} from '../../../../components/uielements/exportComponent';

import Inputnumber from '../../../../components/uielements/InputNumber';
import {
  CheckboxStyled,
  Label,
  Scroll,
  Table,
  Td,
  Thead,
  Tittle,
  Tr,
} from './styled';
import LayoutWrapper from '../../../../components/utility/layoutWrapper';
import api from './config';
import moment, {now} from 'moment';
import ModalTest from './modalTest';
import {transform} from 'lodash';

const {Item, useForm} = Form;

export default (props) => {
  const [form] = useForm();
  const {
    dataEdit,
    loading,
    visible,
    action,
    options,
    file,
    list,
    getFileMau,
    idDS,
    idFile,
  } = props;
  const [trainForm, setTrainForm] = useState([]);
  const [valueCheckbox, setValueCheckbox] = useState(true);
  const [valueRadio, setValueRadio] = useState(true);
  const [check, setCheck] = useState(false);
  const [addListForm, setAddListForm] = useState([]);
  const [nameFile, setNameFile] = useState();
  const [count, setCount] = useState(1);
  const [fileMauList, setFileMauList] = useState([]);
  useEffect(() => {
    // if (dataEdit && dataEdit.BuocXacMinhID) {
    //   form &&
    //     form.setFieldsValue({
    //       ...dataEdit[0],
    //     });
    // }
    form.setFieldsValue({
      ...dataEdit[0],
    });
    if (action === 'edit') setValueCheckbox(dataEdit[0].IsDinhKemFile);
  }, []);
  const dateFormat = 'DD-MM-YYYY';

  const onSort = (list) => {
    list.sort(function (a, b) {
      var keyA = a.key,
        keyB = b.key;
      // Compare the 2 dates
      if (keyA < keyB) return -1;
      if (keyA > keyB) return 1;
      return 0;
    });
  };

  function blobToFile(theBlob, fileName) {
    return new File([theBlob], fileName, {
      lastModified: new Date().getTime(),
      type: theBlob.type,
    });
  }

  async function getFileByPath(path, callback) {
    let data = await fetch(
      'http://192.168.55.106:7006/api/v2/DanhMucBuocXacMinh/Download?FileName=20_2023-02-24-145444_B%E1%BA%A3ng%20%C4%91i%E1%BB%83m_16022023033012.xlsx',
    )
      .then((res) => res.blob)
      .then((data) => data);

    // let data = res.blob();
    let files = blobToFile(data, 'test');
    callback(files);
  }

  const onOk = async (e) => {
    e.preventDefault();
    const value = await form.validateFields();
    if (action === 'add') {
      const formData = new FormData();
      onSort(fileMauList);
      onSort(trainForm);
      formData.append(
        'DanhMucBuocXacMinhStr',
        JSON.stringify({
          ...value,
          GhiChu: value.GhiChu || '',
          IsDinhKemFile: valueCheckbox,
          SuDung: valueRadio,
          FileMau: fileMauList,
        }),
      );
      for (let i = 0; i < trainForm.length; i++) {
        formData.append('files', trainForm[i].file);
      }
      props.onCreate(formData);
    }

    if (action === 'edit') {
      let listFile = [];
      api.DanhSachFileMau({DMBuocXacMinhID: idDS}).then((res) => {
        let listFileMau = res.data.Data.map((item, index) => ({
          key: index,
          ...item,
          FileID: item.FileDanhMucBuocXacMinhID,
          NgayUp: moment(item.NgayUp).format('YYYY-MM-DD'),
          TenFileGoc: '',
        }));

        let newFileMauList = fileMauList.map((item) => {
          let newData = listFileMau.find((file) => file.key === item.key);
          return {
            ...newData,
            ...item,
          };
        });

        listFileMau.forEach((item, index) => {
          listFile.push({
            key: index,
            file: item.FileURL,
          });
        });

        onSort(newFileMauList);
        onSort(trainForm);

        const formData = new FormData();
        formData.append(
          'DanhMucBuocXacMinhCapNhatStr',
          JSON.stringify({
            ...value,
            BuocXacMinhID: idDS,
            GhiChu: value.GhiChu || '',
            IsDinhKemFile: valueCheckbox,
            SuDung: valueRadio,
            FileMau: newFileMauList,
          }),
        );
        for (let i = 0; i < trainForm.length; i++) {
          formData.append('uploadFiles', trainForm[i].file);
        }

        props.onCreate(formData);
      });
    }
  };

  const onChange2 = (e) => {
    setValueRadio(e.target.value);
  };

  const handleChange = (value) => {};
  const onChange = (e) => {
    setValueCheckbox(e.target.checked);
  };

  const prop = {
    onChange({file, fileList}) {
      if (file.status !== 'uploading') {
        setFileInfor(file.name);
      }
    },
  };

  const handleChangedFields = async (changedValues, allValues) => {
    const value = await form.getFieldsValue();
    const {LoaiDon, TenBuoc, GhiChu} = value;
    if (
      LoaiDon &&
      TenBuoc &&
      (LoaiDon !== dataEdit.LoaiDon ||
        TenBuoc !== dataEdit.TenBuoc ||
        GhiChu !== dataEdit.GhiChu)
    ) {
      // setIsFormSuccess(false);
    } else {
      // setIsFormSuccess(true);
    }
  };

  return (
    <Modal
      title={`${action === 'edit' ? 'Sửa' : 'Thêm'} thông tin xác minh`}
      width={'70%'}
      visible={visible}
      onCancel={props.onCancel}
      style={{color: 'red'}}
      footer={[
        <Button key="back" onClick={props.onCancel}>
          Hủy
        </Button>,
        <Button
          key="submit"
          htmlType="submit"
          type="primary"
          form="formbuocxacminh"
          loading={loading}
          onClick={onOk}
          // disabled={isFormSuccess}
        >
          Lưu
        </Button>,
      ]}
    >
      <Form
        form={form}
        width={'100%'}
        name={'formbuocxacminh'}
        initialValues={{
          OrderBy: 0,
        }}
        onChange={handleChangedFields}
      >
        <Label>
          <Row justify="space-between">
            {action === 'edit' ? <Item name={'BuocXacMinhID'} hidden /> : ''}
            <Col span={11}>
              <Item label="Loại Đơn" name={'LoaiDon'} rules={[REQUIRED]}>
                <Select onChange={handleChange} placeholder="Chọn loại đơn">
                  {options.map((value, index) => (
                    <Option key={index} value={value.LoaiKhieuToID}>
                      {value.TenLoaiKhieuTo}
                    </Option>
                  ))}
                </Select>
              </Item>
            </Col>
            <Col span={11}>
              <Item
                className="buoc"
                label="Tên bước xác minh"
                name={'TenBuoc'}
                rules={[REQUIRED]}
              >
                <Input />
              </Item>
            </Col>
            <Col span={24}>
              <Item label="Nội dung" name={'GhiChu'}>
                <Textarea rows={4} />
              </Item>
            </Col>
            <Col span={1}></Col>
            <Col span={10}>
              <Item name={'IsDinhKemFile'}>
                <Checkbox onChange={onChange} checked={valueCheckbox}>
                  Bắt buộc đính kèm file xác minh
                </Checkbox>
              </Item>
            </Col>

            <Col span={10}>
              <Item label="Thứ tự hiển thị" name={'OrderBy'}>
                <Inputnumber min={0} />
              </Item>
            </Col>

            <Item label="Sử Dụng" name={'SuDung'} hidden>
              <Radio.Group onChange={onChange2} value={valueRadio}>
                <Radio value={true}>Có</Radio>
                <Radio value={false}>Không</Radio>
              </Radio.Group>
            </Item>
          </Row>
        </Label>
      </Form>
      <hr></hr>
      <ModalTest
        file={file}
        list={list}
        action={action}
        idDS={idDS}
        setTrainForm={setTrainForm}
        setFileMauList={setFileMauList}
        idFile={idFile}
      />
    </Modal>
  );
};
