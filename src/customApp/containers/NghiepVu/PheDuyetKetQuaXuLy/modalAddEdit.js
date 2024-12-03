import React, {Component, useRef, useState, useEffect} from 'react';
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
  REQUIRED,
  ITEM_LAYOUT_NEW,
  COL_ITEM_LAYOUT_HALF_RIGHT,
  COL_ITEM_LAYOUT_HALF,
  COL_COL_ITEM_LAYOUT_RIGHT,
  ITEM_LAYOUT_HALF,
} from '../../../../settings/constants';
import {Modal} from '../../../../components/uielements/exportComponent';
import moment from 'moment';
import {
  formatDate,
  getValueConfigLocalByKey,
} from '../../../../helpers/utility';
import ModalAddEditHoSoTaiLieu from '../Shared/Modal/ModalAddEditFileTaiLieu';
import {HuongGiaiQuyet} from '../../../../settings/constants';
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
import {StateHoSoTaiLieu} from '../Shared/State/HoSoTaiLieu';
const ModalAddEdit = (props) => {
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

  const [dataChange, setDataChange] = useState({
    QuyetDinh: 1,
    LoaiCoQuan: 1,
  });

  const {QuyetDinh, LoaiCoQuan} = dataChange;

  const formRef = useRef();

  const user = getValueConfigLocalByKey('user');

  useEffect(() => {
    const {dataEdit} = props;
    if (dataEdit && dataEdit.TrangThaiPheDuyet) {
      formRef &&
        formRef.current.setFieldsValue({
          ...dataEdit,
          HanXuLy: dataEdit?.HanXuLy ? dayjs(dataEdit.HanXuLy) : null,
        });
      onChangeHoSoTaiLieu((prevState) => ({
        ...prevState,
        DanhSachHoSoTaiLieu: dataEdit.DanhSachHoSoTaiLieu
          ? dataEdit.DanhSachHoSoTaiLieu
          : [],
      }));
    }
  }, [props]);

  const onOk = async (IsTrinh = false, isCreate) => {
    const {onCreate, dataEdit} = props;

    formRef.current
      .validateFields()
      .then((FormValue) => {
        const value = {
          DanhSachHoSoTaiLieu: DanhSachHoSoTaiLieu ? DanhSachHoSoTaiLieu : [],
          ...FormValue,
          HanXuLy: formatDate(FormValue?.HanXuLy),
        };
        if (props.XuLyDonID) {
          value.XuLyDonID = props.XuLyDonID;
        }
        for (const key in value) {
          if (!value[key]) {
            delete value[key];
          }
        }
        onCreate(value);
      })
      .catch((err) => console.log('errr', err));
  };

  const {
    dataEdit,
    visible,
    fileKey,
    onCancel,
    DanhSachCoQuan,
    loading,
    checkTrangThaiChuyenDon,
  } = props;
  const {HuongGiaiQuyetID, StateID, LanhDaoDuyet2ID} = dataEdit;

  console.log(LanhDaoDuyet2ID, 'LanhDaoDuyet2ID', StateID, 'StateID');

  const isViewDetails = props.dataEdit?.isViewDetails
    ? props.dataEdit.isViewDetails
    : null;

  return (
    <Modal
      title={'Phê duyệt kết quả xử lý đơn'}
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
              onClick={() => {
                onCancel();
              }}
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
      key={fileKey}
    >
      <Wrapper>
        <Form ref={formRef} initialValues={{LoaiCoQuan: 1}}>
          {isViewDetails ? (
            <>
              <p className="item-info">
                Hướng xử lý :{' '}
                <span style={{fontWeight: 600}}>{dataEdit?.HuongXuLy}</span>
              </p>
              <p className="item-info">
                Nội dung xử lý :{' '}
                <span style={{fontWeight: 600}}>
                  {dataEdit?.NoiDungPheDuyet}
                </span>
              </p>
              <p className="item-info">Hồ sơ, tài liệu</p>
            </>
          ) : null}

          {!isViewDetails ? (
            <>
              <Item
                label="Quyết định"
                name="TrangThaiPheDuyet"
                rules={[REQUIRED]}
                initialValue={1}
              >
                <Radio.Group
                  onChange={(e) =>
                    setDataChange((prevState) => ({
                      ...prevState,
                      QuyetDinh: e.target.value,
                    }))
                  }
                >
                  <Radio value={1}>Phê duyệt</Radio>
                  <Radio value={2}>Yêu cầu xử lý lại</Radio>
                </Radio.Group>
              </Item>

              {QuyetDinh === 2 ? (
                <Item
                  label="Hạn xử lý"
                  name="HanXuLy"
                  rules={[REQUIRED]}
                  className="ant-form-title__left"
                >
                  <DatePicker placeholder="" format={'DD/MM/YYYY'} />
                </Item>
              ) : null}
              {
                // HuongGiaiQuyetID === HuongGiaiQuyet.ChuyenDon &&
                QuyetDinh !== 2 &&
                // LanhDaoDuyet2ID === user?.CanBoID &&
                // user?.ChanhThanhTra === 1 &&
                user?.SuDungQuyTrinhPhucTap === true &&
                checkTrangThaiChuyenDon ? (
                  <>
                    <Item
                      label="Chọn loại cơ quan"
                      // {...ITEM_LAYOUT_SMALL}
                      name="LoaiCoQuan"
                    >
                      <Radio.Group
                        value={LoaiCoQuan}
                        onChange={(e) =>
                          setDataChange((prevState) => ({
                            ...prevState,
                            LoaiCoQuan: e.target.value,
                          }))
                        }
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
                                <Option value={item.CoQuanID}>
                                  {item.TenCoQuan}
                                </Option>
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
                      className="ant-form-title__left"
                    >
                      <Input />
                    </Item>

                    {/* <Item
                    label="Nội dung xử lý"
                    name="NoiDungHuongDan"
                    className="ant-form-title__left"
                  >
                    <TextArea></TextArea>
                  </Item> */}
                  </>
                ) : null
              }
              <Item
                label="Nội dung phê duyệt"
                name="NoiDungPheDuyet"
                className="ant-form-title__left"
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
