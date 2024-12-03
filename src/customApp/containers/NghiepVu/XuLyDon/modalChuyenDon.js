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
  Modal as ModalAnt,
  TimePicker,
  Tooltip,
} from 'antd';
import {DatePicker} from '../../../../components/uielements/exportComponent';
import Button from '../../../../components/uielements/button';
import Select, {Option} from '../../../../components/uielements/select';
import Wrapper from './modalAddEdit.styled';
import {
  ITEMLAYOUT4,
  ITEM_LAYOUT,
  ITEM_LAYOUT2,
  ITEM_LAYOUT_SMALL,
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
import {getLocalKey} from '../../../../helpers/utility';
const {Item} = Form;
const ModalChuyenDon = (props) => {
  const [stateHoSoTaiLieu, setStateHoSoTaiLieu] = useState({
    DanhSachHoSoTaiLieu: [],
    dataModalHoSoTaiLieu: {},
    keyModalHoSoTaiLieu: 0,
    visibleModalHoSoTaiLieu: false,
    loading: false,
  });
  const [LoaiCoQuan, setLoaiCoQuan] = useState(1);
  const formRef = useRef();

  useEffect(() => {
    const {dataEdit} = props;
    if (dataEdit && dataEdit.DanhSachHoSoTaiLieu) {
      setStateHoSoTaiLieu((prevState) => ({
        ...prevState,
        DanhSachHoSoTaiLieu: dataEdit.DanhSachHoSoTaiLieu
          ? dataEdit.DanhSachHoSoTaiLieu
          : [],
      }));
    }
  }, []);

  const deteleFile = (item, index) => {
    const {DanhSachHoSoTaiLieu} = stateHoSoTaiLieu;
    if (item.FileDinhKemID) {
      ModalAnt.confirm({
        title: 'Thông báo',
        content: 'Bạn có muốn xóa file đính kèm này không ?',
        okText: 'Có',
        cancelText: 'Không',
        onOk: () => {
          item.TrangThai = 0;
          const newDanhSachHoSoTaiLieu = [...DanhSachHoSoTaiLieu];
          const index = newDanhSachHoSoTaiLieu.indexOf(item);
          newDanhSachHoSoTaiLieu.splice(index, 1);
          setStateHoSoTaiLieu((prevState) => ({
            ...prevState,
            DanhSachHoSoTaiLieu: newDanhSachHoSoTaiLieu,
          }));
        },
      });
    } else {
      const newDanhSachHoSoTaiLieu = [...DanhSachHoSoTaiLieu];
      newDanhSachHoSoTaiLieu.splice(index, 1);
      setStateHoSoTaiLieu((prevState) => ({
        ...prevState,
        DanhSachHoSoTaiLieu: newDanhSachHoSoTaiLieu,
      }));
    }
  };

  const onOk = async (IsTrinh = false, isCreate) => {
    const {DanhSachHoSoTaiLieu} = stateHoSoTaiLieu;
    const {onCreate, dataEdit} = props;

    formRef.current
      .validateFields()
      .then((FormValue) => {
        const user = getLocalKey('user', {});
        const value = {
          DanhSachHoSoTaiLieu: DanhSachHoSoTaiLieu,
          ...FormValue,
        };
        if (props.XuLyDonID) {
          value.XuLyDonID = props.XuLyDonID;
        }
        onCreate(value);
      })
      .catch((err) => console.log('errr', err));
  };

  const showModalHoSoTaiLieu = (index) => {
    const {DanhSachHoSoTaiLieu, keyModalHoSoTaiLieu} = stateHoSoTaiLieu;
    if (index || index === 0) {
      const newKey = keyModalHoSoTaiLieu + 1;
      setStateHoSoTaiLieu((prevState) => ({
        ...prevState,
        keyModalHoSoTaiLieu: newKey,
        visibleModalHoSoTaiLieu: true,
        DanhSachHoSoTaiLieu: {...DanhSachHoSoTaiLieu[index], index},
      }));
    } else {
      const newKey = keyModalHoSoTaiLieu + 1;
      setStateHoSoTaiLieu((prevState) => ({
        ...prevState,
        keyModalHoSoTaiLieu: newKey,
        visibleModalHoSoTaiLieu: true,
      }));
    }
  };

  const closeModalHoSoTaiLieu = (index) => {
    setStateHoSoTaiLieu((prevState) => ({
      ...prevState,
      visibleModalHoSoTaiLieu: false,
      dataModalHoSoTaiLieu: {},
    }));
  };

  const submitModalHoSoTaiLieu = (value) => {
    const {index} = value;
    if (index || index === 0) {
      const {DanhSachHoSoTaiLieu} = stateHoSoTaiLieu;
      const newDanhSachHoSoTaiLieu = [...DanhSachHoSoTaiLieu];
      newDanhSachHoSoTaiLieu.splice(index, 1, value);
      setStateHoSoTaiLieu((prevState) => ({
        ...prevState,
        visibleModalHoSoTaiLieu: false,
        DanhSachHoSoTaiLieu: newDanhSachHoSoTaiLieu,
      }));
      message.destroy();
      message.success('Cập nhật hồ sơ tài liệu thành công');
    } else {
      const {DanhSachHoSoTaiLieu, keyModalHoSoTaiLieu} = stateHoSoTaiLieu;
      const newDanhSachHoSoTaiLieu = [...DanhSachHoSoTaiLieu];
      newDanhSachHoSoTaiLieu.push(value);
      setStateHoSoTaiLieu((prevState) => ({
        ...prevState,
        visibleModalHoSoTaiLieu: false,
        DanhSachHoSoTaiLieu: newDanhSachHoSoTaiLieu,
      }));
      message.destroy();
      message.success('Thêm mới hồ sơ tài liệu thành công');
    }
  };

  const {visible, fileKey, onCancel, DanhSachCoQuan} = props;
  const {
    visibleModalHoSoTaiLieu,
    dataModalHoSoTaiLieu,
    keyModalHoSoTaiLieu,
    DanhSachHoSoTaiLieu,
  } = stateHoSoTaiLieu;

  return (
    <Modal
      title={'Chuyển đơn'}
      visible={visible}
      className="center-modal__footer"
      footer={
        <>
          <Button type="primary" onClick={() => onOk()}>
            <SaveOutlined /> Lưu
          </Button>
          <Button className="btn-danger" onClick={() => onCancel()}>
            Hủy
          </Button>
        </>
      }
      width={800}
      onCancel={() => onCancel()}
      key={fileKey}
    >
      <Wrapper>
        <Form ref={formRef} initialValues={{LoaiCoQuan: 1}}>
          <>
            <Item
              label="Chọn loại cơ quan"
              {...ITEM_LAYOUT_SMALL}
              name="LoaiCoQuan"
            >
              <Radio.Group
                value={LoaiCoQuan}
                onChange={(e) => setLoaiCoQuan(e.target.value)}
              >
                <Radio value={1}>Cơ quan trong hệ thống</Radio>
                <Radio value={2}>Cơ quan ngoài hệ thống</Radio>
              </Radio.Group>
            </Item>
            {LoaiCoQuan === 1 ? (
              <Item
                label="Chuyển cho cơ quan"
                name="CoQuanID"
                rules={[REQUIRED]}
                className="ant-form-title__left"
              >
                <Select>
                  {DanhSachCoQuan
                    ? DanhSachCoQuan.map((item) => (
                        <Option value={item.CoQuanID}>{item.TenCoQuan}</Option>
                      ))
                    : null}
                </Select>
              </Item>
            ) : (
              <Item
                label="Tên cơ quan"
                name="CoQuanNgoaiHeThong"
                className="ant-form-title__left"
                rules={[REQUIRED]}
              >
                <Input />
              </Item>
            )}
            <Item
              label="Cơ quan theo dõi đôn đốc"
              name="CoQuanTheoDoiDonDoc"
              // rules={[REQUIRED]}
              className="ant-form-title__left"
            >
              <Input />
            </Item>
            <div className="file">
              <p>Hồ sơ, tài liệu</p>
              <Button
                type={'primary'}
                loading={stateHoSoTaiLieu.loading}
                onClick={() => showModalHoSoTaiLieu()}
              >
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

export default ModalChuyenDon;
