import React, {Component, useRef} from 'react';
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
import {useEffect} from 'react';
import {useState} from 'react';
import styled from 'styled-components';

const {Item} = Form;
const ModalKetQuaXacMinh = (props) => {
  const [DanhSachQuyTrinhXacMinh, setDanhSachQuyTrinhXacMinh] = useState([]);
  useEffect(() => {
    const {dataEdit} = props;
    if (dataEdit && dataEdit.BuocXacMinh) {
      setDanhSachQuyTrinhXacMinh(dataEdit.BuocXacMinh);
    }
  }, []);

  const {visible, fileKey, onCancel} = props;

  return (
    <Modal
      title={'Kết quả xác minh'}
      visible={visible}
      className="center-modal__footer"
      footer={
        <Button className="btn-danger" onClick={() => onCancel()}>
          Đóng
        </Button>
      }
      width={800}
      //   padding={0}
      onCancel={() => onCancel()}
      key={fileKey}
    >
      <Wrapper>
        <div className="wrapper-content__main">
          <div style={{marginTop: '10px'}} className={'box-file'}>
            <table>
              <thead>
                <th style={{width: '10%'}}>Bước</th>
                <th style={{width: '40%'}}>Trình tự thủ tục giải quyết</th>
                <th style={{width: '15%'}}>Hồ sơ, tài liệu</th>
                <th style={{width: '15%'}}>Ngày cập nhật</th>
                <th style={{width: '10%'}}>Cán bộ cập nhật</th>
                <th style={{width: '10%'}}>Trạng thái</th>
                {/* <th>Thao tác</th> */}
              </thead>
              {DanhSachQuyTrinhXacMinh.map((item, index) => {
                return (
                  <tbody>
                    <tr>
                      <td
                        rowspan={item?.DanhSachHoSoTaiLieu?.length}
                        style={{textAlign: 'center'}}
                      >
                        {item.OrderBy}
                      </td>
                      <td rowspan={item?.DanhSachHoSoTaiLieu?.length}>
                        {item?.TenBuoc}
                      </td>
                      <td>
                        <div className="group-file">
                          {item.DanhSachHoSoTaiLieu &&
                          item.DanhSachHoSoTaiLieu[0] ? (
                            <p className="file-item">
                              {item.DanhSachHoSoTaiLieu[0] &&
                              item.DanhSachHoSoTaiLieu[0].FileDinhKem
                                ? item.DanhSachHoSoTaiLieu[0].FileDinhKem.map(
                                    (item, index) => (
                                      <a href={item.FileUrl} target="_blank">
                                        {item.name || item?.TenFile}
                                      </a>
                                    ),
                                  )
                                : null}
                            </p>
                          ) : null}
                        </div>
                      </td>
                      <td rowspan={item?.DanhSachHoSoTaiLieu?.length}>
                        <p>
                          {item?.NgayCapNhat
                            ? dayjs(item.NgayCapNhat).format('DD/MM/YYYY')
                            : null}
                        </p>
                      </td>
                      <td rowspan={item?.DanhSachHoSoTaiLieu?.length}>
                        <p>{item?.TenCanBo}</p>
                      </td>
                      <td rowspan={item?.DanhSachHoSoTaiLieu?.length}>
                        <p>{item?.TenTrangThai}</p>
                      </td>
                    </tr>
                    {item.DanhSachHoSoTaiLieu
                      ? item.DanhSachHoSoTaiLieu.map((item, index) => {
                          if (index > 0) {
                            return (
                              <tr>
                                <td>
                                  <p className="file-item">
                                    {item.FileDinhKem
                                      ? item.FileDinhKem.map((item, index) => (
                                          <a
                                            target="_blank"
                                            href={item.FileUrl}
                                          >
                                            {item.name || item?.TenFile}
                                          </a>
                                        ))
                                      : null}
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
              {/* {DanhSachQuyTrinhXacMinh.map((item, index) => {
                return (
                  <tbody>
                    <tr>
                      <td
                        rowspan={item.DanhSachHoSoTaiLieu?.length}
                        style={{textAlign: 'center'}}
                      >
                        {item?.OrderBy}
                      </td>
                      <td rowspan={item.DanhSachHoSoTaiLieu?.length}>
                        {item?.TenBuoc}
                      </td>
                      <td>
                        <div className="group-file">
                          {item?.DanhSachHoSoTaiLieu ? (
                            <p className="file-item">
                              <a href={item?.DanhSachHoSoTaiLieu[0]?.FileUrl}>
                                {item?.DanhSachHoSoTaiLieu[0]?.name ||
                                  item?.DanhSachHoSoTaiLieu[0]?.TenFile}
                              </a>
                            </p>
                          ) : null}
                        </div>
                      </td>
                      <td rowspan={item.DanhSachHoSoTaiLieu?.length}>
                        <p>
                          {item?.NgayCapNhat
                            ? dayjs(item.NgayCapNhat).format('DD/MM/YYYY')
                            : ''}
                        </p>
                      </td>
                      <td>{item?.TenCanBo}</td>
                      <td>
                        {item?.TenTrangThai
                          ? item?.TenTrangThai
                          : 'Chưa cập nhật'}
                      </td>
                    </tr>
                    {item?.DanhSachHoSoTaiLieu
                      ? item.DanhSachHoSoTaiLieu.map((item, index) => {
                          if (index > 0) {
                            return (
                              <tr>
                                <td>
                                  <p className="file-item">
                                    <a href={item.FileUrl} target = "_blank">
                                      {item.name || item?.TenFile}
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
              })} */}
            </table>
          </div>
        </div>
      </Wrapper>
    </Modal>
  );
};

export default ModalKetQuaXacMinh;
