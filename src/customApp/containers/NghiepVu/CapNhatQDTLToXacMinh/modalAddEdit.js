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

const {Item} = Form;
class ModalAddEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DanhSachHoSoTaiLieu: [],
      dataModalHoSoTaiLieu: {},
      keyModalHoSoTaiLieu: 0,
      visibleModalHoSoTaiLieu: false,
      fileView: {},
      fileKey: 0,
      loading: false,
      QuyetDinh: 1,
      isFile: false,
      currentKey: 1,
      NoiDungQuyetDinh: [],
    };
    this.formRef = React.createRef();
  }

  componentDidMount() {
    const {dataEdit} = this.props;
    const CapID = getLocalKey('user')?.CapID;
    const CoQuanID = getLocalKey('user')?.CoQuanID;
    const BanTiepDan = getLocalKey('user')?.BanTiepDan;
    const {DanhSachCoQuan} = this.props;
    if (dataEdit && dataEdit.DanhSachHoSoTaiLieu) {
      this.setState({
        DanhSachHoSoTaiLieu: dataEdit.DanhSachHoSoTaiLieu
          ? dataEdit.DanhSachHoSoTaiLieu
          : [],
      });
    }
    if (this.formRef.current) {
      if ((CapID === 2 || CapID === 4) && BanTiepDan) {
        const CoQuanChaID = DanhSachCoQuan.find(
          (item) => item.CoQuanID === CoQuanID,
        )?.CoQuanChaID;
        if (CoQuanChaID) {
          this.formRef.current.setFieldsValue({
            CoQuanBanHanh: CoQuanChaID,
          });
        }
      } else {
        this.formRef.current.setFieldsValue({
          CoQuanBanHanh: CoQuanID,
        });
      }
    }
  }

  deteleFile = (item, index) => {
    const {DanhSachHoSoTaiLieu} = this.state;
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
          this.setState({
            DanhSachHoSoTaiLieu: newArr,
            isFalseFile: false,
            messErr: '',
          });
        },
      });
    } else {
      DanhSachHoSoTaiLieu.splice(index, 1);
      this.setState({
        DanhSachHoSoTaiLieu,
        isFalseFile: false,
        messErr: '',
      });
    }
  };

  onOk = async () => {
    const {DanhSachHoSoTaiLieu, currentKey} = this.state;
    const {onCreate, dataEdit} = this.props;
    if (!(DanhSachHoSoTaiLieu && DanhSachHoSoTaiLieu.length)) {
      this.setState({isFile: true});
      message.destroy();
      message.warning('Vui lòng đính kèm văn bản quyết định');
      return;
    }
    this.formRef.current
      .validateFields()
      .then((value) => {
        const newValue = {
          ...value,
          DanhSachHoSoTaiLieu: DanhSachHoSoTaiLieu,
          LoaiKetQuaID: currentKey,
          ThoiHanThiHanh: formatDate(value?.ThoiHanThiHanh),
          NgayQuyetDinh: formatDate(value?.NgayQuyetDinh),
        };
        if (this.props.XuLyDonID) {
          newValue.XuLyDonID = this.props.XuLyDonID;
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

  showModalHoSoTaiLieu = (index) => {
    if (index || index === 0) {
      const {DanhSachHoSoTaiLieu, keyModalHoSoTaiLieu} = this.state;
      const newKey = keyModalHoSoTaiLieu + 1;
      this.setState({
        keyModalHoSoTaiLieu: newKey,
        visibleModalHoSoTaiLieu: true,
        dataModalHoSoTaiLieu: {...DanhSachHoSoTaiLieu[index], index},
      });
    } else {
      const {DanhSachHoSoTaiLieu, keyModalHoSoTaiLieu} = this.state;
      const newKey = keyModalHoSoTaiLieu + 1;
      this.setState({
        keyModalHoSoTaiLieu: newKey,
        visibleModalHoSoTaiLieu: true,
        // dataModalHoSoTaiLieu: DanhSachHoSoTaiLieu[index],
      });
    }
  };

  closeModalHoSoTaiLieu = (index) => {
    this.setState({
      visibleModalHoSoTaiLieu: false,
      dataModalHoSoTaiLieu: {},
    });
  };

  deleteHoSoTaiLieu = (index) => {
    ModalAnt.confirm({
      title: 'Xóa Dữ Liệu',
      content: 'Bạn có muốn xóa Hồ sơ, tài liệu này không?',
      cancelText: 'Không',
      okText: 'Có',
      onOk: () => {
        const {DanhSachHoSoTaiLieu, keyModalHoSoTaiLieu} = this.state;
        DanhSachHoSoTaiLieu.splice(index, 1);
        message.destroy();
        message.success('Xóa thành công');
      },
    });
  };

  submitModalHoSoTaiLieu = (value) => {
    const {index} = value;
    if (index || index === 0) {
      const {DanhSachHoSoTaiLieu} = this.state;
      const newDanhSachHoSoTaiLieu = [...DanhSachHoSoTaiLieu];
      newDanhSachHoSoTaiLieu.splice(index, 1, value);
      this.setState({
        visibleModalHoSoTaiLieu: false,
        DanhSachHoSoTaiLieu: newDanhSachHoSoTaiLieu,
      });
      message.destroy();
      message.success('Cập nhật hồ sơ tài liệu thành công');
    } else {
      const {DanhSachHoSoTaiLieu, keyModalHoSoTaiLieu} = this.state;
      const newDanhSachHoSoTaiLieu = [...DanhSachHoSoTaiLieu];
      newDanhSachHoSoTaiLieu.push(value);
      this.setState({
        visibleModalHoSoTaiLieu: false,
        DanhSachHoSoTaiLieu: newDanhSachHoSoTaiLieu,
        // dataModalHoSoTaiLieu: DanhSachHoSoTaiLieu[index],
      });
      message.destroy();
      message.success('Thêm mới hồ sơ tài liệu thành công');
    }
  };

  handleChecked = (e, value) => {
    if (e.target.checked) {
      const newArrNoiDungQuyetDinh = [...this.state.NoiDungQuyetDinh];
      newArrNoiDungQuyetDinh.push(value);
      this.setState({
        NoiDungQuyetDinh: newArrNoiDungQuyetDinh,
      });
    } else {
      const newArrNoiDungQuyetDinh = [...this.state.NoiDungQuyetDinh];
      const index = newArrNoiDungQuyetDinh.indexOf(value);
      newArrNoiDungQuyetDinh.splice(index, 1);
      this.setState({
        NoiDungQuyetDinh: newArrNoiDungQuyetDinh,
      });
    }
  };

  handleRenderContentKhieuNai = (tab) => {
    const isViewDetails = this.props?.dataEdit?.isViewDetails;
    const {dataEdit} = this.props;
    if (tab == 1) {
      return !isViewDetails ? (
        <>
          <Checkbox onChange={(e) => this.handleChecked(e, 1)}>
            Cập nhật nội dung{' '}
            <span style={{fontWeight: 600}}>
              "Kiến nghị thu hồi cho nhà nước"
            </span>
          </Checkbox>
          <div
            className="line-break"
            style={{marginLeft: '-22px', width: '115%'}}
          />
          {this.state.NoiDungQuyetDinh.includes(1) ? (
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
        </>
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
          <Checkbox onChange={(e) => this.handleChecked(e, 2)}>
            Cập nhật nội dung{' '}
            <span style={{fontWeight: 600}}>
              "Trả lại cho tổ chức, cá nhân"
            </span>
          </Checkbox>
          <div
            className="line-break"
            style={{marginLeft: '-22px', width: '115%'}}
          />
          {this.state.NoiDungQuyetDinh.includes(2) ? (
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
          <Checkbox onChange={(e) => this.handleChecked(e, 3)}>
            Cập nhật nội dung{' '}
            <span style={{fontWeight: 600}}>"Kiến nghị xử lý hành chính"</span>
          </Checkbox>
          <div
            className="line-break"
            style={{marginLeft: '-22px', width: '115%'}}
          />
          {this.state.NoiDungQuyetDinh.includes(3) ? (
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
          <Checkbox onChange={(e) => this.handleChecked(e, 4)}>
            Cập nhật nội dung{' '}
            <span style={{fontWeight: 600}}>"Chuyển cơ quan điều tra"</span>
          </Checkbox>
          <div
            className="line-break"
            style={{marginLeft: '-22px', width: '115%'}}
          />
          {this.state.NoiDungQuyetDinh.includes(4) ? (
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

  handleRenderPhanTichKetQua = (LoaiPhanTichKetQua) => {
    const {ItemLoaiKhieuTo} = this.props;
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

  render() {
    const {
      dataEdit,
      visible,
      fileKey,
      onCancel,
      DanhSachCoQuan,
      ItemLoaiKhieuTo,
      loading,
    } = this.props;
    const Lan2 = dataEdit?.Lan2;
    const {ListFileDinhKem, isFile, DanhSachHoSoTaiLieu, currentKey} =
      this.state;
    const isViewDetails = this.props.dataEdit?.isViewDetails
      ? this.props.dataEdit.isViewDetails
      : null;

    const itemsTabs = [
      {
        key: '1',
        label: (
          <div className="ant-tabs__title">Kiến nghị thu hồi cho nhà nước</div>
        ),
        children: <>{this.handleRenderContentKhieuNai(1)}</>,
      },
      {
        key: '2',
        label: (
          <div className="ant-tabs__title">Trả lại cho tổ chức, cá nhân</div>
        ),
        children: <>{this.handleRenderContentKhieuNai(2)}</>,
      },
      {
        key: '3',
        label: (
          <div className="ant-tabs__title">Kiến nghị xử lý hành chính</div>
        ),
        children: <>{this.handleRenderContentKhieuNai(3)}</>,
      },
      {
        key: '4',
        label: <div className="ant-tabs__title">Chuyển cơ quan điều tra</div>,
        children: <>{this.handleRenderContentKhieuNai(4)}</>,
      },
    ];

    const SubTitle =
      ItemLoaiKhieuTo === LoaiKhieuTo.KhieuNai
        ? 'khiếu nại'
        : ItemLoaiKhieuTo === LoaiKhieuTo.ToCao
        ? 'tố cáo'
        : ItemLoaiKhieuTo === LoaiKhieuTo.KienNghiPhanAnh
        ? 'kiến nghị, phản ánh'
        : '';

    return (
      <Modal
        title={`Cập nhật quyết định giải quyết ${SubTitle} `}
        visible={visible}
        className="center-modal__footer"
        padding={0}
        footer={
          !isViewDetails ? (
            <>
              <Button
                type="primary"
                onClick={() => this.onOk()}
                loading={loading}
              >
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
        key={fileKey}
      >
        <Wrapper>
          <Form ref={this.formRef}>
            {!isViewDetails ? (
              <>
                <p className="title" style={{padding: ' 0 22px'}}>
                  Thông tin chung:{' '}
                </p>
                <Row gutter={[10, 10]} style={{padding: ' 0 22px'}}>
                  <Col md={12} span={24}>
                    <Item
                      label="Số quyết định"
                      name="SoQuyetDinh"
                      className="ant-form-title__left"
                    >
                      <Input />
                    </Item>
                  </Col>
                  <Col md={12} span={24}>
                    <Item
                      label="Ngày ra quyết định"
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
                      label="Tóm tắt nội dung giải quyết"
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
                    Văn bản quyết định <span style={{color: 'red'}}>(*)</span>
                  </p>
                  <Button
                    type={'primary'}
                    onClick={() => this.showModalHoSoTaiLieu()}
                  >
                    Thêm hồ sơ, tài liệu
                  </Button>
                </div>
                <div className="line-break" />
              </>
            ) : null}
            {isViewDetails ? (
              <div style={{padding: ' 0 22px'}}>
                <p className="title">Thông tin chung: </p>
                <div className="group-info">
                  <p>Số quyết định: {dataEdit?.SoQuyetDinh}</p>
                  <p>Ngày ra quyết định: {dataEdit?.NgayQuyetDinhStr}</p>
                  <p>Cơ quan ban hành: {dataEdit?.TenCoQuanBanHanh}</p>
                  <p>
                    Thời hạn thi hành:{' '}
                    {dataEdit?.ThoiHanThiHanh
                      ? dayjs(dataEdit.ThoiHanThiHanh).format('DD/MM/YYYY')
                      : null}
                  </p>
                </div>
                <p className="summary-content">
                  Tóm tắt nội dung giải quyết: {dataEdit.TomTatNoiDungGQ}
                </p>
                <p className="title">Văn bản quyết định</p>
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
                                <Tooltip title={'Sửa Hồ sơ, tài liệu'}>
                                  <EditOutlined
                                    onClick={() =>
                                      this.showModalHoSoTaiLieu(index)
                                    }
                                  />
                                </Tooltip>
                                <Tooltip title={'Xóa Hồ sơ, tài liệu'}>
                                  <DeleteOutlined
                                    onClick={() => this.deteleFile(item, index)}
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
                    {this.handleRenderPhanTichKetQua(dataEdit?.PhanTichKetQua)}
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
            <div className="line-break" />
            {ItemLoaiKhieuTo !== 9 ? (
              <div style={{padding: ' 0 22px'}}>
                <p className="title">
                  Nội dung quyết định giải quyết và phân công thi hành quyết
                  định
                </p>
                <Tabs
                  items={itemsTabs}
                  value={currentKey}
                  onChange={(key) =>
                    this.setState({
                      currentKey: key,
                    })
                  }
                />
              </div>
            ) : null}
            <ModalAddEditHoSoTaiLieu
              visible={this.state.visibleModalHoSoTaiLieu}
              dataEdit={this.state.dataModalHoSoTaiLieu}
              key={this.state.keyModalHoSoTaiLieu}
              onCancel={this.closeModalHoSoTaiLieu}
              onCreate={this.submitModalHoSoTaiLieu}
            />
          </Form>
        </Wrapper>
      </Modal>
    );
  }
}

export default ModalAddEdit;
