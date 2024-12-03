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
  Modal as ModalAnt,
  TimePicker,
  Tooltip,
} from 'antd';
import Button from '../../../../../components/uielements/button';
import ModalAddEditHoSoTaiLieu from './ModalAddEditFileTaiLieu';
import {
  DeleteOutlined,
  EditOutlined,
  FileOutlined,
  PlusOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';

const {Item} = Form;
const ModalHoSoTaiLieu = (props) => {
  const {DanhSachHoSoTaiLieu, setDanhSachHoSoTaiLieu} = props;
  const [messErr, setMessErr] = useState('');
  const [stateModalHoSoTaiLieu, setStateModalHoSoTaiLieu] = useState({
    visibleModalHoSoTaiLieu: false,
    dataModalHoSoTaiLieu: {},
    keyModalHoSoTaiLieu: 0,
  });

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
          // DanhSachHoSoTaiLieu[index] = item;
          setDanhSachHoSoTaiLieu(newArr);
          setMessErr('');
        },
      });
    } else {
      const newDanhSachHoSoTaiLieu = [...DanhSachHoSoTaiLieu];
      newDanhSachHoSoTaiLieu.splice(index, 1);
      setDanhSachHoSoTaiLieu(newDanhSachHoSoTaiLieu);
      setMessErr('');
    }
  };

  const showModalHoSoTaiLieu = (index) => {
    const {keyModalHoSoTaiLieu} = stateModalHoSoTaiLieu;
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
    if (index || index === 0) {
      const newDanhSachHoSoTaiLieu = [...DanhSachHoSoTaiLieu];
      newDanhSachHoSoTaiLieu.splice(index, 1, value);
      setStateModalHoSoTaiLieu((prevState) => ({
        ...prevState,
        visibleModalHoSoTaiLieu: false,
      }));
      setDanhSachHoSoTaiLieu(newDanhSachHoSoTaiLieu);
      message.destroy();
      message.success('Cập nhật hồ sơ tài liệu thành công');
    } else {
      const newDanhSachHoSoTaiLieu = [...DanhSachHoSoTaiLieu];
      newDanhSachHoSoTaiLieu.push(value);
      setStateModalHoSoTaiLieu((prevState) => ({
        ...prevState,
        visibleModalHoSoTaiLieu: false,
      }));
      setDanhSachHoSoTaiLieu(newDanhSachHoSoTaiLieu);
      message.destroy();
      message.success('Thêm mới hồ sơ tài liệu thành công');
    }
  };

  const {isRequired, textTitle} = props;

  return (
    <>
      <div className="file">
        <p>{textTitle ? textTitle : 'Hồ sơ, tài liệu'}</p>
        <Button type={'primary'} onClick={() => showModalHoSoTaiLieu()}>
          Thêm{' '}
          <span style={{textTransform: 'lowercase', marginLeft: '2px'}}>
            {textTitle ? textTitle : ' hồ sơ tài liệu'}
          </span>
        </Button>
      </div>
      {DanhSachHoSoTaiLieu && DanhSachHoSoTaiLieu?.length ? (
        <div style={{marginTop: '10px'}} className={'box-file'}>
          <table>
            <thead>
              <tr>
                <th style={{width: '5%'}}>STT</th>
                <th style={{width: '30%'}}>Tên hồ sơ, tài liệu</th>
                <th style={{width: '30%'}}>File đính kèm</th>
                <th style={{width: '25%'}}>Ngày cập nhật</th>

                <th style={{width: '15%', textAlign: 'center'}}>Thao tác</th>
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
        visible={stateModalHoSoTaiLieu.visibleModalHoSoTaiLieu}
        dataEdit={stateModalHoSoTaiLieu.dataModalHoSoTaiLieu}
        key={stateModalHoSoTaiLieu.keyModalHoSoTaiLieu}
        onCancel={closeModalHoSoTaiLieu}
        onCreate={submitModalHoSoTaiLieu}
      />
    </>
  );
};

export default ModalHoSoTaiLieu;
