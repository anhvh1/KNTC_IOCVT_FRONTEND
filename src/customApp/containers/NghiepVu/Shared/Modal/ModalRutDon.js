import React, {Component, useEffect, useRef, useState} from 'react';
import {
  Col,
  Form,
  Input,
  Radio,
  DatePicker,
  Modal as ModalAnt,
  TimePicker,
  Tooltip,
} from 'antd';
import Button from '../../../../../components/uielements/button';
import {REQUIRED, HuongGiaiQuyet} from '../../../../../settings/constants';
import {Modal} from '../../../../../components/uielements/exportComponent';
import moment from 'moment';
import ModalAddEditHoSoTaiLieu from './ModalAddEditFileTaiLieu';
import {DeleteOutlined, EditOutlined, SaveOutlined} from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import dayjs from 'dayjs';
import {StateHoSoTaiLieu} from '../State/HoSoTaiLieu';
const {Item} = Form;
const ModalRutDon = (props) => {
  const [
    visibleModalHoSoTaiLieu,
    dataModalHoSoTaiLieu,
    keyModalHoSoTaiLieu,
    DanhSachHoSoTaiLieu,
    showModalHoSoTaiLieu,
    closeModalHoSoTaiLieu,
    submitModalHoSoTaiLieu,
    deteleFile,
    onChangeHoSoTaiLieu,
  ] = StateHoSoTaiLieu();

  const formRef = useRef();

  useEffect(() => {
    const {dataEdit} = props;
    if (dataEdit && dataEdit.DanhSachHoSoTaiLieu) {
      onChangeHoSoTaiLieu({DanhSachHoSoTaiLieu: dataEdit.DanhSachHoSoTaiLieu});
    }
  }, []);

  const onOk = async (IsTrinh = false) => {
    const {onCreate, dataEdit} = props;
    formRef.current
      .validateFields()
      .then((FormValue) => {
        const value = {
          DanhSachHoSoTaiLieu: DanhSachHoSoTaiLieu,
          ...FormValue,
        };
        onCreate(value, IsTrinh);
      })
      .catch((err) => console.log('errr', err));
  };

  const {dataEdit, visible, onCancel, loading} = props;

  const isViewDetails = props.dataEdit?.isViewDetails
    ? props.dataEdit.isViewDetails
    : null;
  return (
    <Modal
      title={'Cập nhật thông tin rút đơn'}
      visible={visible}
      className="center-modal__footer"
      footer={
        !isViewDetails ? (
          <>
            <Button type="primary" onClick={() => onOk()} loading={loading}>
              <SaveOutlined /> Lưu
            </Button>
            <Button
              className="btn-danger"
              onClick={() => onCancel()}
              loading={loading}
            >
              Hủy
            </Button>
          </>
        ) : (
          <>
            <Button className="btn-danger" onClick={() => onCancel()}>
              Đóng
            </Button>
          </>
        )
      }
      width={800}
      onCancel={() => onCancel()}
    >
      <>
        <Form ref={formRef}>
          <>
            <Item
              label="Lý do rút đơn"
              name="LyDoRutDon"
              className="ant-form-title__left"
              rules={[REQUIRED]}
            >
              <TextArea></TextArea>
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
                    {!isViewDetails ? (
                      <th style={{width: '15%', textAlign: 'center'}}>
                        Thao tác
                      </th>
                    ) : null}
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
                        {!isViewDetails ? (
                          <td
                            rowspan={item.FileDinhKem.length}
                            style={{textAlign: 'center'}}
                          >
                            <div className="action-btn">
                              <Tooltip title={'Sửa hồ sơ,tài liệu'}>
                                <EditOutlined
                                  onClick={() => showModalHoSoTaiLieu(index)}
                                />
                              </Tooltip>
                              <Tooltip title={'Xóa hồ sơ,tài liệu'}>
                                <DeleteOutlined
                                  onClick={() => deteleFile(item, index)}
                                />
                              </Tooltip>
                            </div>
                          </td>
                        ) : null}
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
      </>
    </Modal>
  );
};

export default ModalRutDon;
