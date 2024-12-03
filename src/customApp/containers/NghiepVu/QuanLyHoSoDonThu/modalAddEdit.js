import React, {Component, useEffect, useRef, useState} from 'react';
import {
  Col,
  Form,
  Icon,
  Input,
  message,
  Row,
  Upload,
  Checkbox,
  Radio,
  DatePicker,
  Modal as ModalAnt,
  TimePicker,
  Tooltip,
} from 'antd';
import Button from '../../../../components/uielements/button';
import Select, {Option} from '../../../../components/uielements/select';
import Wrapper from './modalAddEdit.styled';
import {
  ITEMLAYOUT4,
  ITEM_LAYOUT,
  ITEM_LAYOUT2,
  REQUIRED,
  ITEM_LAYOUT_NEW,
  COL_ITEM_LAYOUT_HALF_RIGHT,
  COL_ITEM_LAYOUT_HALF,
  COL_COL_ITEM_LAYOUT_RIGHT,
  ITEM_LAYOUT_HALF,
} from '../../../../settings/constants';
import {Modal} from '../../../../components/uielements/exportComponent';
import moment from 'moment';
import {getValueConfigLocalByKey} from '../../../../helpers/utility';
import ModalAddEditHoSoTaiLieu from '../Shared/Modal/ModalAddEditFileTaiLieu';
import {
  DeleteOutlined,
  EditOutlined,
  FileOutlined,
  PlusOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import dayjs from 'dayjs';
import DatePickerFormat from '../../../../components/uielements/datePickerFormat';

const {Item} = Form;
const ModalAddEdit = (props) => {
  const [stateModalHoSoTaiLieu, setStateModalHoSoTaiLieu] = useState({
    DanhSachHoSoTaiLieu: [],
    dataModalHoSoTaiLieu: {},
    keyModalHoSoTaiLieu: 0,
    visibleModalHoSoTaiLieu: false,
  });
  const formRef = useRef();

  const {
    DanhSachHoSoTaiLieu,
    dataModalHoSoTaiLieu,
    keyModalHoSoTaiLieu,
    visibleModalHoSoTaiLieu,
  } = stateModalHoSoTaiLieu;

  useEffect(() => {
    const {dataEdit} = props;
    if (dataEdit && dataEdit.DanhSachHoSoTaiLieu) {
      setStateModalHoSoTaiLieu((prevState) => ({
        ...prevState,
        DanhSachHoSoTaiLieu: dataEdit.DanhSachHoSoTaiLieu,
      }));
    }
  }, []);

  const deteleFile = (item, index) => {
    if (item.FileDinhKemID) {
      ModalAnt.confirm({
        title: 'Thông báo',
        content: 'Bạn có muốn xóa file đính kèm này không ?',
        okText: 'Có',
        cancelText: 'Không',
        onOk: () => {
          item.TrangThai = 0;
          const newArr = [...DanhSachHoSoTaiLieu];
          const index = newArr.indexOf(item);
          newArr.splice(index, 1);
          setStateModalHoSoTaiLieu((prevState) => ({
            ...prevState,
            DanhSachHoSoTaiLieu: newArr,
          }));
        },
      });
    } else {
      DanhSachHoSoTaiLieu.splice(index, 1);
      setStateModalHoSoTaiLieu((prevState) => ({
        ...prevState,
        DanhSachHoSoTaiLieu: DanhSachHoSoTaiLieu,
      }));
    }
  };

  const onOk = async (IsTrinh = false) => {
    const {onCreate} = props;
    formRef.current
      .validateFields()
      .then((FormValue) => {
        const value = {
          DanhSachHoSoTaiLieu: DanhSachHoSoTaiLieu,
          ...FormValue,
        };
        onCreate(value);
      })
      .catch((err) => console.log('errr', err));
  };

  const showModalHoSoTaiLieu = (index) => {
    if (index || index === 0) {
      const newKey = keyModalHoSoTaiLieu + 1;
      setStateModalHoSoTaiLieu((prevState) => ({
        ...prevState,
        keyModalHoSoTaiLieu: newKey,
        visibleModalHoSoTaiLieu: true,
        dataModalHoSoTaiLieu: {...DanhSachHoSoTaiLieu[index], index},
      }));
    } else {
      const newKey = keyModalHoSoTaiLieu + 1;
      setStateModalHoSoTaiLieu((prevState) => ({
        ...prevState,
        keyModalHoSoTaiLieu: newKey,
        visibleModalHoSoTaiLieu: true,
      }));
    }
  };

  const closeModalHoSoTaiLieu = (index) => {
    setStateModalHoSoTaiLieu((prevState) => ({
      ...prevState,
      visibleModalHoSoTaiLieu: false,
      dataModalHoSoTaiLieu: {},
    }));
  };

  const submitModalHoSoTaiLieu = (value) => {
    const {index} = value;
    const newDanhSachHoSoTaiLieu = [...DanhSachHoSoTaiLieu];
    if (index || index === 0) {
      newDanhSachHoSoTaiLieu.splice(index, 1, value);
      message.destroy();
      message.success('Cập nhật hồ sơ tài liệu thành công');
    } else {
      newDanhSachHoSoTaiLieu.push(value);
      message.destroy();
      message.success('Thêm mới hồ sơ tài liệu thành công');
    }
    setStateModalHoSoTaiLieu((prevState) => ({
      ...prevState,
      visibleModalHoSoTaiLieu: false,
      DanhSachHoSoTaiLieu: newDanhSachHoSoTaiLieu,
    }));
  };

  const {visible, fileKey, onCancel, DanhSachThongTinBoSung, loading} = props;
  return (
    <Modal
      title={'Cập nhật tài liệu'}
      visible={visible}
      className="center-modal__footer"
      footer={
        <>
          <Button type="primary" onClick={() => onOk()} loading={loading}>
            <SaveOutlined /> Lưu
          </Button>
          <Button className="btn-danger" onClick={() => onCancel()}>
            Hủy
          </Button>
        </>
      }
      width={700}
      onCancel={() => onCancel()}
      key={fileKey}
    >
      <Wrapper>
        <Form ref={formRef}>
          <>
            <Item
              label="Thông tin bổ sung"
              name="LoaiFile"
              className="ant-form-title__left"
            >
              <Select>
                {DanhSachThongTinBoSung
                  ? DanhSachThongTinBoSung.map((item) => (
                      <Option value={item.LoaiFile}>{item.TenBuoc}</Option>
                    ))
                  : null}
              </Select>
            </Item>

            <div className="file">
              <p>Hồ sơ, tài liệu</p>
              <Button type={'primary'} onClick={() => showModalHoSoTaiLieu()}>
                Thêm hồ sơ, tài liệu
              </Button>
            </div>
          </>

          {DanhSachHoSoTaiLieu && DanhSachHoSoTaiLieu?.length ? (
            <div style={{marginTop: '10px'}} className={'box-file'}>
              <table>
                <thead>
                  <tr>
                    <th style={{width: '5%'}}>STT</th>
                    <th style={{width: '30%'}}>Tên hồ sơ, tài liệu</th>
                    <th style={{width: '30%'}}>File đính kèm</th>
                    <th style={{width: '25%'}}>Ngày cập nhật</th>

                    <th style={{width: '15%', textAlign: 'center'}}>
                      Thao tác
                    </th>
                  </tr>
                </thead>
                {DanhSachHoSoTaiLieu.map((item, index) => {
                  return (
                    <tbody>
                      <tr>
                        <td
                          rowspan={item.FileDinhKem.length}
                          style={{textAlign: 'center'}}
                        >
                          {index + 1}
                        </td>
                        <td rowspan={item.FileDinhKem.length}>
                          {item?.name || item?.TenFile}
                        </td>
                        <td>
                          <div className="group-file">
                            {item.FileDinhKem[0] ? (
                              <p className="file-item">
                                <a
                                  href={item.FileDinhKem[0].FileUrl}
                                  target="_blank"
                                >
                                  {item.FileDinhKem[0].name ||
                                    item.FileDinhKem[0]?.TenFile}
                                </a>
                              </p>
                            ) : null}
                          </div>
                        </td>
                        <td rowspan={item.FileDinhKem.length}>
                          <p>{dayjs().format('DD/MM/YYYY')}</p>
                        </td>

                        <td
                          rowspan={item.FileDinhKem.length}
                          style={{textAlign: 'center'}}
                        >
                          <div className="action-btn">
                            <Tooltip title={'Sửa Hồ sơ, tài liệu'}>
                              <EditOutlined
                                onClick={() => showModalHoSoTaiLieu(index)}
                              />
                            </Tooltip>
                            <Tooltip title={'Xóa Hồ sơ, tài liệu'}>
                              <DeleteOutlined
                                onClick={() => deteleFile(item, index)}
                              />
                            </Tooltip>
                          </div>
                        </td>
                      </tr>
                      {item.FileDinhKem
                        ? item.FileDinhKem.map((item, index) => {
                            if (index > 0) {
                              return (
                                <tr>
                                  <td>
                                    <p className="file-item">
                                      <a href={item.FileUrl} target="_blank">
                                        {item.name || item.TenFile}
                                      </a>
                                    </p>
                                  </td>
                                </tr>
                              );
                            }
                          })
                        : null}
                    </tbody>
                  );
                })}
              </table>
            </div>
          ) : (
            ''
          )}
          <ModalAddEditHoSoTaiLieu
            visible={visibleModalHoSoTaiLieu}
            dataEdit={dataModalHoSoTaiLieu}
            key={keyModalHoSoTaiLieu}
            onCancel={closeModalHoSoTaiLieu}
            onCreate={submitModalHoSoTaiLieu}
          />
        </Form>
      </Wrapper>
    </Modal>
  );
};

export default ModalAddEdit;
