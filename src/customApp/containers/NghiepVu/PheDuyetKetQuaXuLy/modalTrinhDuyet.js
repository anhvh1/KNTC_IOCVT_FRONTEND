import React, {Component, useRef, useState} from 'react';
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
  SendOutlined,
} from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import dayjs from 'dayjs';
import {StateHoSoTaiLieu} from '../Shared/State/HoSoTaiLieu';
const {Item} = Form;
const ModalAddEdit = (props) => {
  const {dataEdit} = props;
  const formRef = useRef();
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

  useState(() => {
    if (dataEdit && dataEdit.DanhSachHoSoTaiLieu) {
      onChangeHoSoTaiLieu({
        DanhSachHoSoTaiLieu: dataEdit.DanhSachHoSoTaiLieu
          ? dataEdit.DanhSachHoSoTaiLieu
          : [],
      });
    }
  }, []);

  const onOk = async () => {
    const {onCreate, dataEdit} = props;
    formRef.current
      .validateFields()
      .then((FormValue) => {
        const value = {
          ...FormValue,
          DanhSachHoSoTaiLieu: DanhSachHoSoTaiLieu,
          type: dataEdit?.type,
        };
        if (props.XuLyDonID) {
          value.XuLyDonID = props.XuLyDonID;
        }
        onCreate(value);
      })
      .catch((err) => console.log('errr', err));
  };

  const {visible, fileKey, onCancel, DanhSachLanhDao, isXa, loading} = props;
  const isViewDetails = props.dataEdit?.isViewDetails
    ? props.dataEdit.isViewDetails
    : null;

  return (
    <Modal
      title={
        dataEdit.type === 1 ? 'Trình dự thảo QĐ giao xác minh' : 'Trình duyệt'
      }
      visible={visible}
      className="center-modal__footer"
      footer={
        !isViewDetails ? (
          <>
            <Button type="primary" onClick={() => onOk()} loading={loading}>
              <SendOutlined /> Trình
            </Button>
            <Button className="btn-danger" onClick={() => onCancel()}>
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
      key={fileKey}
    >
      <Wrapper>
        <Form ref={formRef}>
          <Item name="type" hidden></Item>
          {!isXa ? (
            <Item label="Trình Lãnh Đạo" name="LanhDaoID" rules={[REQUIRED]}>
              <Select>
                {DanhSachLanhDao
                  ? DanhSachLanhDao.map((item) => (
                      <Option value={item.CanBoID}>{item.TenCanBo}</Option>
                    ))
                  : null}
              </Select>
            </Item>
          ) : null}
          {dataEdit?.type === 1 ? (
            <div className="file">
              <p>
                Hồ sơ, tài liệu{' '}
                <span
                  style={{
                    color: 'red',
                    marginLeft: 5,
                    fontWeight: 400,
                    fontStyle: 'italic',
                  }}
                >
                  đính kèm dự thảo quyết định giao xác minh
                </span>
              </p>
              <Button type={'primary'} onClick={() => showModalHoSoTaiLieu()}>
                Thêm hồ sơ, tài liệu
              </Button>
            </div>
          ) : null}
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
                                  {item.FileDinhKem[0]?.name ||
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
      </Wrapper>
    </Modal>
  );
};

export default ModalAddEdit;
