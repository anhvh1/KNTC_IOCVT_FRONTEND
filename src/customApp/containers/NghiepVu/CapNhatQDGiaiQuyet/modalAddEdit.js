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
  Tabs,
} from 'antd';
import {DatePicker} from '../../../../components/uielements/exportComponent';
import Button from '../../../../components/uielements/button';
import Select, {Option} from '../../../../components/uielements/select';
import {Textarea} from '../../../../components/uielements/exportComponent';
import {formatDate, formatNumberStr} from '../../../../helpers/utility';
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
  LoaiKhieuTo,
} from '../../../../settings/constants';
import {
  InputNumberFormat,
  Modal,
} from '../../../../components/uielements/exportComponent';
import moment from 'moment';
import {
  getLocalKey,
  getValueConfigLocalByKey,
} from '../../../../helpers/utility';
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
import {StateHoSoTaiLieu} from '../Shared/State/HoSoTaiLieu';
const {Item} = Form;
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
  const [currentKey, setCurrenKey] = useState(1);
  const [NoiDungQuyetDinh, setNoiDungQuyetDinh] = useState([]);
  const formRef = useRef();

  const {
    dataEdit,
    visible,
    onCancel,
    DanhSachCoQuan,
    ItemLoaiKhieuTo,
    loading,
  } = props;

  useEffect(() => {
    const {dataEdit, DanhSachCoQuan} = props;
    const CapID = getLocalKey('user')?.CapID;
    const CoQuanID = getLocalKey('user')?.CoQuanID;
    const BanTiepDan = getLocalKey('user')?.BanTiepDan;
    if (dataEdit && dataEdit.DanhSachHoSoTaiLieu) {
      onChangeHoSoTaiLieu({
        DanhSachHoSoTaiLieu: dataEdit.DanhSachHoSoTaiLieu
          ? dataEdit.DanhSachHoSoTaiLieu
          : [],
      });
    }

    if (dataEdit) {
      const newArr = [];
      if (dataEdit.SoTienThuHoi || dataEdit?.SoDatThuHoi) {
        newArr.push(1);
      }
      if (
        dataEdit.SoToChuc ||
        dataEdit?.SoTienToChucTraLai ||
        dataEdit?.SoCaNhan ||
        dataEdit?.SoTienCaNhanTraLai ||
        dataEdit?.SoDatCaNhanTraLai ||
        dataEdit?.SoDatToChucTraLai
      ) {
        newArr.push(2);
      }
      if (dataEdit.SoNguoiBiKienNghiXuLy || dataEdit?.SoCanBoBiXuLy) {
        newArr.push(3);
      }
      if (
        dataEdit.SoNguoiChuyenCoQuanDieuTra ||
        dataEdit?.SoCanBoChuyenCoQuanDieuTra
      ) {
        newArr.push(4);
      }
      setNoiDungQuyetDinh(newArr);
    }

    if (formRef.current) {
      const dataSpread = {
        ...dataEdit,
        NgayQuyetDinh: dataEdit?.NgayQuyetDinh
          ? dayjs(dataEdit.NgayQuyetDinh)
          : null,
        ThoiHanThiHanh: dataEdit?.ThoiHanThiHanh
          ? dayjs(dataEdit.ThoiHanThiHanh)
          : null,
      };
      if ((CapID === 2 || CapID === 4) && BanTiepDan) {
        const CoQuanChaID = DanhSachCoQuan.find(
          (item) => item.CoQuanID === CoQuanID,
        )?.CoQuanChaID;
        if (CoQuanChaID) {
          formRef.current.setFieldsValue({
            CoQuanBanHanh: CoQuanChaID,
            ...dataSpread,
          });
        }
      } else {
        formRef.current.setFieldsValue({
          CoQuanBanHanh: CoQuanID,
          ...dataSpread,
        });
      }
    }
  }, []);

  const onOk = async () => {
    const {onCreate, dataEdit} = props;
    // if (!(DanhSachHoSoTaiLieu && DanhSachHoSoTaiLieu.length)) {
    //   message.destroy();
    //   message.warning('Vui lòng đính kèm văn bản quyết định');
    //   return;
    // }
    formRef.current
      .validateFields()
      .then((value) => {
        const newValue = {
          ...value,
          DanhSachHoSoTaiLieu: DanhSachHoSoTaiLieu,
          LoaiKetQuaID: currentKey,
          ThoiHanThiHanh: formatDate(value.ThoiHanThiHanh),
          NgayQuyetDinh: formatDate(value.NgayQuyetDinh),
        };
        if (props.XuLyDonID) {
          newValue.XuLyDonID = props.XuLyDonID;
        }
        for (const key in newValue) {
          if (!newValue[key]) {
            delete newValue[key];
          }
        }
        onCreate(newValue);
      })
      .catch((err) => console.log('errr', err));
  };

  const handleChecked = (e, value) => {
    const newArrNoiDungQuyetDinh = [...NoiDungQuyetDinh];
    if (e.target.checked) {
      newArrNoiDungQuyetDinh.push(value);
    } else {
      const index = newArrNoiDungQuyetDinh.indexOf(value);
      newArrNoiDungQuyetDinh.splice(index, 1);
    }
    setNoiDungQuyetDinh(newArrNoiDungQuyetDinh);
  };

  const handleCheckedCheckBox = (value) => {
    if (NoiDungQuyetDinh) {
      return NoiDungQuyetDinh.find((item) => item === value);
    }
  };

  const handleRenderContentKhieuNai = (tab) => {
    const isViewDetails = props?.dataEdit?.isViewDetails;
    const {dataEdit} = props;
    if (tab == 1) {
      return !isViewDetails ? (
        <div className="wrapper-checked">
          <Checkbox
            onChange={(e) => handleChecked(e, 1)}
            checked={handleCheckedCheckBox(1)}
          >
            Cập nhật nội dung{' '}
            <span style={{fontWeight: 600}}>
              "Kiến nghị thu hồi cho nhà nước"
            </span>
          </Checkbox>
          <div
            className="line-break"
            style={{marginLeft: '-22px', width: '115%'}}
          />
          {NoiDungQuyetDinh.includes(1) ? (
            <Row gutter={[10, 10]}>
              <Col md={12} span={24}>
                <Item
                  label={
                    <p>
                      Số tiền <span style={{color: 'red'}}>(Nghìn đồng)</span>
                    </p>
                  }
                  className="ant-form-title__left"
                  name="SoTienThuHoi"
                >
                  <InputNumberFormat />
                </Item>
              </Col>
              <Col md={12} span={24}>
                <Item
                  label={
                    <p>
                      Số đất <span style={{color: 'red'}}>(m2)</span>
                    </p>
                  }
                  className="ant-form-title__left"
                  name="SoDatThuHoi"
                >
                  <InputNumberFormat />
                </Item>
              </Col>
            </Row>
          ) : null}
        </div>
      ) : (
        <>
          <div className="wrapper-content">
            <p>Số tiền: {formatNumberStr(dataEdit.SoTienThuHoi)} (đồng)</p>
            <p>Số đất: {formatNumberStr(dataEdit.SoDatThuHoi)} (m2)</p>
          </div>
        </>
      );
    } else if (tab === 2) {
      return !isViewDetails ? (
        <>
          <Checkbox
            onChange={(e) => handleChecked(e, 2)}
            checked={handleCheckedCheckBox(2)}
          >
            Cập nhật nội dung{' '}
            <span style={{fontWeight: 600}}>
              "Trả lại cho tổ chức, cá nhân"
            </span>
          </Checkbox>
          <div
            className="line-break"
            style={{marginLeft: '-22px', width: '115%'}}
          />
          {NoiDungQuyetDinh.includes(2) ? (
            <Row gutter={[10, 10]}>
              <Col md={8} span={24}>
                <Item
                  label={'Số tổ chức được trả quyền lợi'}
                  className="ant-form-title__left"
                  name="SoToChuc"
                >
                  <InputNumberFormat />
                </Item>
              </Col>
              <Col md={8} span={24}>
                <Item
                  label={
                    <p>
                      Số tiền <span style={{color: 'red'}}>(nghìn đồng)</span>
                    </p>
                  }
                  className="ant-form-title__left"
                  name="SoTienToChucTraLai"
                >
                  <InputNumberFormat />
                </Item>
              </Col>
              <Col md={8} span={24}>
                <Item
                  label={
                    <p>
                      Số đất <span style={{color: 'red'}}>(m2)</span>
                    </p>
                  }
                  className="ant-form-title__left"
                  name="SoDatToChucTraLai"
                >
                  <InputNumberFormat />
                </Item>
              </Col>
              <Col md={8} span={24}>
                <Item
                  label={'Số cá nhân được trả quyền lợi'}
                  className="ant-form-title__left"
                  name="SoCaNhan"
                >
                  <InputNumberFormat />
                </Item>
              </Col>
              <Col md={8} span={24}>
                <Item
                  label={
                    <p>
                      Số tiền <span style={{color: 'red'}}>(nghìn đồng)</span>
                    </p>
                  }
                  className="ant-form-title__left"
                  name="SoTienCaNhanTraLai"
                >
                  <InputNumberFormat />
                </Item>
              </Col>
              <Col md={8} span={24}>
                <Item
                  label={
                    <p>
                      Số đất <span style={{color: 'red'}}>(m2)</span>
                    </p>
                  }
                  className="ant-form-title__left"
                  name="SoDatCaNhanTraLai"
                >
                  <InputNumberFormat />
                </Item>
              </Col>
            </Row>
          ) : null}
        </>
      ) : (
        <>
          <div className="wrapper-content__group">
            <p>
              Số tổ chức được trả lại quyền lợi:{' '}
              {formatNumberStr(dataEdit.SoToChuc)}{' '}
            </p>
            <p>
              Số tiền: {formatNumberStr(dataEdit.SoTienToChucTraLai)} (đồng)
            </p>
            <p>Số đất: {formatNumberStr(dataEdit.SoDatToChucTraLai)} (m2)</p>
            <p>
              Số cá nhân được trả quyền lợi:{' '}
              {formatNumberStr(dataEdit.SoCaNhan)}{' '}
            </p>
            <p>
              Số tiền: {formatNumberStr(dataEdit.SoTienCaNhanTraLai)} (đồng)
            </p>
            <p>Số đất: {formatNumberStr(dataEdit.SoDatCaNhanTraLai)} (m2)</p>
          </div>
        </>
      );
    } else if (tab === 3) {
      return !isViewDetails ? (
        <>
          <Checkbox
            onChange={(e) => handleChecked(e, 3)}
            checked={handleCheckedCheckBox(3)}
          >
            Cập nhật nội dung{' '}
            <span style={{fontWeight: 600}}>"Kiến nghị xử lý hành chính"</span>
          </Checkbox>
          <div
            className="line-break"
            style={{marginLeft: '-22px', width: '115%'}}
          />
          {NoiDungQuyetDinh.includes(3) ? (
            <Row gutter={[10, 10]}>
              <Col md={12} span={24}>
                <Item
                  label={'Tổng số người bị kiến nghị xử lý'}
                  className="ant-form-title__left"
                  name="SoNguoiBiKienNghiXuLy"
                >
                  <InputNumberFormat />
                </Item>
              </Col>
              <Col md={12} span={24}>
                <Item
                  label={'Trong đó số cán bộ, công chức, viên chức'}
                  className="ant-form-title__left"
                  name="SoCanBoBiXuLy"
                >
                  <InputNumberFormat />
                </Item>
              </Col>
            </Row>
          ) : null}
        </>
      ) : (
        <>
          <div className="wrapper-content">
            <p>
              Tổng số người bị kiến nghị xử lý: {dataEdit.SoNguoiBiKienNghiXuLy}{' '}
            </p>
            <p>
              Trong đó số cán bộ, công chức, viên chức: {dataEdit.SoCanBoBiXuLy}{' '}
            </p>
          </div>
        </>
      );
    } else if (tab === 4) {
      return !isViewDetails ? (
        <>
          <Checkbox
            onChange={(e) => handleChecked(e, 4)}
            checked={handleCheckedCheckBox(4)}
          >
            Cập nhật nội dung{' '}
            <span style={{fontWeight: 600}}>"Chuyển cơ quan điều tra"</span>
          </Checkbox>
          <div
            className="line-break"
            style={{marginLeft: '-22px', width: '115%'}}
          />
          {NoiDungQuyetDinh.includes(4) ? (
            <Row gutter={[10, 10]}>
              <Col md={12} span={24}>
                <Item
                  label={'Tổng số người'}
                  className="ant-form-title__left"
                  name="SoNguoiChuyenCoQuanDieuTra"
                >
                  <InputNumberFormat />
                </Item>
              </Col>
              <Col md={12} span={24}>
                <Item
                  label={'Trong đó số cán bộ, công chức, viên chức'}
                  className="ant-form-title__left"
                  name="SoCanBoChuyenCoQuanDieuTra"
                >
                  <InputNumberFormat />
                </Item>
              </Col>
            </Row>
          ) : null}
        </>
      ) : (
        <>
          <div className="wrapper-content">
            <p>Tổng số người: {dataEdit.SoNguoiChuyenCoQuanDieuTra} </p>
            <p>
              Trong đó số cán bộ, công chức, viên chức:{' '}
              {dataEdit.SoCanBoChuyenCoQuanDieuTra}
            </p>
          </div>
        </>
      );
    }
  };

  const handleRenderPhanTichKetQua = (LoaiPhanTichKetQua) => {
    const {ItemLoaiKhieuTo} = props;
    if (ItemLoaiKhieuTo === 8) {
      if (LoaiPhanTichKetQua === 1) {
        return 'Tố cáo đúng';
      } else if (LoaiPhanTichKetQua === 2) {
        return 'Tố cáo có đúng, có sai';
      } else if (LoaiPhanTichKetQua === 3) {
        return 'Tố cáo sai';
      }
    } else {
      if (LoaiPhanTichKetQua === 1) {
        return 'Khiếu nại đúng';
      } else if (LoaiPhanTichKetQua === 2) {
        return 'Khiếu nại đúng một phần';
      } else if (LoaiPhanTichKetQua === 3) {
        return 'Khiếu nại sai';
      }
    }
  };

  const Lan2 = dataEdit?.Lan2;

  const isViewDetails = props.dataEdit?.isViewDetails
    ? props.dataEdit.isViewDetails
    : null;

  const itemsTabs = [
    {
      key: '1',
      label: (
        <div className="ant-tabs__title">Kiến nghị thu hồi cho nhà nước</div>
      ),
      children: <>{handleRenderContentKhieuNai(1)}</>,
    },
    {
      key: '2',
      label: (
        <div className="ant-tabs__title">Trả lại cho tổ chức, cá nhân</div>
      ),
      children: <>{handleRenderContentKhieuNai(2)}</>,
    },
    {
      key: '3',
      label: <div className="ant-tabs__title">Kiến nghị xử lý hành chính</div>,
      children: <>{handleRenderContentKhieuNai(3)}</>,
    },
    {
      key: '4',
      label: <div className="ant-tabs__title">Chuyển cơ quan điều tra</div>,
      children: <>{handleRenderContentKhieuNai(4)}</>,
    },
  ];

  const {isDetails} = props;

  const SubTitle =
    ItemLoaiKhieuTo === LoaiKhieuTo.KhieuNai
      ? 'Số quyết định, kết luận'
      : ItemLoaiKhieuTo === LoaiKhieuTo.ToCao
      ? 'Văn bản, quyết định'
      : ItemLoaiKhieuTo === LoaiKhieuTo.KienNghiPhanAnh
      ? 'Báo cáo, kết quả'
      : 'Số quyết định';
  const lowerCaseSubtitle = SubTitle ? SubTitle.toString().toLowerCase() : '';
  return (
    <Modal
      title={
        isDetails
          ? `Chi tiết ${lowerCaseSubtitle}`
          : `Cập nhật ${lowerCaseSubtitle} `
      }
      visible={visible}
      className="center-modal__footer"
      padding={0}
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
      width={1000}
      onCancel={() => onCancel()}
    >
      <Wrapper>
        <Form ref={formRef} name="CapNhatQuyetDinhGiaiQuyet">
          {!isViewDetails ? (
            <>
              <p className="title" style={{padding: ' 0 22px'}}>
                Thông tin chung:{' '}
              </p>
              <Row gutter={[10, 10]} style={{padding: ' 0 22px'}}>
                <Col md={12} span={24}>
                  <Item
                    label={SubTitle}
                    name="SoQuyetDinh"
                    className="ant-form-title__left"
                  >
                    <Input />
                  </Item>
                </Col>
                <Col md={12} span={24}>
                  <Item
                    label="Ngày"
                    name="NgayQuyetDinh"
                    rules={[REQUIRED]}
                    className="ant-form-title__left"
                  >
                    <DatePicker placeholder="" format={'DD/MM/YYYY'} />
                  </Item>
                </Col>
                <Col md={12} span={24}>
                  <Item
                    label="Cơ quan ban hành"
                    name="CoQuanBanHanh"
                    rules={[REQUIRED]}
                    className="ant-form-title__left"
                  >
                    <Select>
                      {DanhSachCoQuan &&
                        DanhSachCoQuan.map((item) => (
                          <Option value={item?.CoQuanID}>
                            {item?.TenCoQuan}
                          </Option>
                        ))}
                    </Select>
                  </Item>
                </Col>
                <Col md={12} span={24}>
                  <Item
                    label="Thời hạn thi hành"
                    name="ThoiHanThiHanh"
                    className="ant-form-title__left"
                  >
                    <DatePicker placeholder="" format={'DD/MM/YYYY'} />
                  </Item>
                </Col>
                <Col md={24} span={24}>
                  <Item
                    label={`Tóm tắt nội dung ${lowerCaseSubtitle}`}
                    name="TomTatNoiDungGQ"
                    className="ant-form-title__left"
                  >
                    <Textarea style={{width: '100%'}} />
                  </Item>
                </Col>
              </Row>
              <div className="line-break" />
              <div className="file" style={{padding: ' 0 22px'}}>
                <p>
                  {SubTitle}
                  {/* <span style={{color: 'red'}}>(*)</span> */}
                </p>
                <Button type={'primary'} onClick={() => showModalHoSoTaiLieu()}>
                  Thêm {lowerCaseSubtitle}
                </Button>
              </div>
              <div className="line-break" />
            </>
          ) : null}
          {isViewDetails ? (
            <div style={{padding: ' 0 22px'}}>
              <p className="title">Thông tin chung: </p>
              <div className="group-info">
                <p>
                  {SubTitle}: {dataEdit?.SoQuyetDinh}
                </p>
                <p>Ngày: {dataEdit?.NgayQuyetDinhStr}</p>
                <p>Cơ quan ban hành: {dataEdit?.TenCoQuanBanHanh}</p>
                <p>
                  Thời hạn thi hành:{' '}
                  {dataEdit?.ThoiHanThiHanh
                    ? dayjs(dataEdit.ThoiHanThiHanh).format('DD/MM/YYYY')
                    : null}
                </p>
              </div>
              <p className="summary-content">
                Tóm tắt nội dung {lowerCaseSubtitle}: {dataEdit.TomTatNoiDungGQ}
              </p>
              <p className="title">{SubTitle}</p>
            </div>
          ) : null}
          {DanhSachHoSoTaiLieu && DanhSachHoSoTaiLieu?.length ? (
            <div
              style={{marginTop: '10px', padding: '0 22px'}}
              className={'box-file'}
            >
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
          {isViewDetails ? (
            <div style={{padding: ' 0 22px'}}>
              {Lan2 ? (
                <p className="title">
                  Quyết định lần 2: {dataEdit?.KetQuaGiaiQuyetLan2}
                </p>
              ) : (
                <p className="title">
                  Phân tích kết quả:{' '}
                  {handleRenderPhanTichKetQua(dataEdit?.PhanTichKetQua)}
                </p>
              )}
            </div>
          ) : null}
          {/* Nếu là khiếu nại lần 2 thì k hiện phân tích kết quả, nếu là lần 1 thì k hiện quyết định lần 2  */}
          {!isViewDetails && ItemLoaiKhieuTo !== 9 ? (
            <div style={{padding: ' 0 22px'}}>
              <Item
                label={<p className="title">Phân tích kết quả</p>}
                className="ant-form-title__left"
                name="PhanTichKetQua"
              >
                {ItemLoaiKhieuTo === 8 ? (
                  <Radio.Group>
                    <Radio value={1}>Tố cáo đúng</Radio>
                    <Radio value={2}>Tố cáo có đúng có sai</Radio>
                    <Radio value={3}>Tố cáo sai</Radio>
                  </Radio.Group>
                ) : (
                  <Radio.Group>
                    <Radio value={1}>Khiếu nại đúng</Radio>
                    <Radio value={2}>Khiếu nại 1 phần</Radio>
                    <Radio value={3}>Khiếu nại sai</Radio>
                  </Radio.Group>
                )}
              </Item>
              {Lan2 ? (
                <>
                  <Item
                    label={<p className="title">Quyết định lần 2</p>}
                    className="ant-form-title__left"
                    name="KetQuaGiaiQuyetLan2"
                  >
                    <Radio.Group>
                      <Radio value={1}>Công nhận quyết định lần 1</Radio>
                      <Radio value={2}>Hủy, sửa quyết định lần 1</Radio>
                    </Radio.Group>
                  </Item>
                </>
              ) : null}
            </div>
          ) : null}
          {ItemLoaiKhieuTo !== 9 ? (
            <>
              <div className="line-break" />
              <div style={{padding: ' 0 22px'}}>
                <p className="title">
                  Nội dung {SubTitle} và phân công thi hành quyết định
                </p>
                <Tabs
                  forceRender
                  items={itemsTabs}
                  value={currentKey}
                  onChange={(key) => setCurrenKey(key)}
                />
              </div>
            </>
          ) : null}

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
