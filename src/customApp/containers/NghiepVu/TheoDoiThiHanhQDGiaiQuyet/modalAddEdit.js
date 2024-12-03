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
import {
  formatDate,
  formatDateTime,
  getLocalKey,
} from '../../../../helpers/utility';
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
import {formatNumberStr} from '../../../../helpers/utility';
import dayjs from 'dayjs';

const {Item} = Form;
class ModalAddEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DanhSachHoSoTaiLieu: [],
      dataModalHoSoTaiLieu: {},
      DanhSachHoSoKhieuNai: [],
      keyModalHoSoTaiLieu: 0,
      visibleModalHoSoTaiLieu: false,
      fileView: {},
      fileKey: 0,
      loading: false,
      QuyetDinh: 1,
      isFile: false,
      currentKey: 1,
      NoiDungQuyetDinh: null,
    };
    this.formRef = React.createRef();
  }

  componentDidMount() {
    const {dataEdit} = this.props;
    const CapID = getLocalKey('user')?.CapID;
    const CoQuanID = getLocalKey('user')?.CoQuanID;
    const BanTiepDan = getLocalKey('user')?.BanTiepDan;
    if (this.formRef.current) {
      if ((CapID === 2 || CapID === 4) && BanTiepDan) {
        const CoQuanChaID = DanhSachCoQuan.find(
          (item) => item.CoQuanID === CoQuanID,
        )?.CoQuanChaID;
        if (CoQuanChaID) {
          this.formRef.current.setFieldsValue({
            CoQuanThiHanh: CoQuanChaID,
          });
        }
      } else {
        this.formRef.current.setFieldsValue({
          CoQuanThiHanh: CoQuanID,
        });
      }
    }
    if (dataEdit && dataEdit.CoQuanThiHanh) {
      this.formRef.current &&
        this.formRef.current.setFieldsValue({
          ...dataEdit,
          NgayThiHanh: dataEdit.NgayThiHanh
            ? dayjs(dataEdit.NgayThiHanh)
            : null,
        });
      this.setState({
        DanhSachHoSoTaiLieu: dataEdit.DanhSachHoSoTaiLieu
          ? dataEdit.DanhSachHoSoTaiLieu
          : [],
      });
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

  onOk = async (IsTrinh = false, isCreate) => {
    const {DanhSachHoSoTaiLieu, currentKey} = this.state;
    const {onCreate, dataEdit} = this.props;
    // if (!(DanhSachHoSoTaiLieu && DanhSachHoSoTaiLieu.length)) {
    //   this.setState({isFile: true});
    //   message.destroy();
    //   message.warning('Vui lòng thêm văn bản quyết định');
    //   return;
    // }
    this.formRef.current
      .validateFields()
      .then((FormValue) => {
        const value = {
          ...FormValue,
          DanhSachHoSoTaiLieu: DanhSachHoSoTaiLieu,
          LoaiKetQuaID: currentKey,
          NgayThiHanh: formatDate(FormValue.NgayThiHanh),
        };
        if (this.props.XuLyDonID) {
          value.XuLyDonID = this.props.XuLyDonID;
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
      this.setState({
        NoiDungQuyetDinh: value,
      });
    } else {
      this.setState({
        NoiDungQuyetDinh: null,
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
              "Kiến nghi thu hồi cho nhà nước"
            </span>
          </Checkbox>
          {this.state.NoiDungQuyetDinh === 1 ? (
            <Row gutter={[10, 10]}>
              <Col md={12} span={24}>
                <Item
                  label={
                    <p>
                      Số tiền <span style={{color: 'red'}}>(Nghìn đồng)</span>
                    </p>
                  }
                  className="ant-form-title__left"
                  name="SoTien"
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
                  name="SoDat"
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
            <p>Số tiền: {formatNumberStr(dataEdit.SoTien)} (đồng)</p>
            <p>Số đất: {formatNumberStr(dataEdit.SoDat)} (m2)</p>
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
          {this.state.NoiDungQuyetDinh === 2 ? (
            <Row gutter={[10, 10]}>
              {ThongTinQuyetDinhGQ?.SoToChuc ? (
                <Col xxl={8} md={12} span={24}>
                  <Item
                    label={'Số tổ chức được trả quyền lợi'}
                    className="ant-form-title__left"
                    name="ToChuc"
                  >
                    <InputNumberFormat />
                  </Item>
                </Col>
              ) : null}
              <Col xxl={8} md={12} span={24}>
                <Item
                  label={
                    <p>
                      Số tiền <span style={{color: 'red'}}>(nghìn đồng)</span>
                    </p>
                  }
                  className="ant-form-title__left"
                  name="SoDat"
                >
                  <InputNumberFormat />
                </Item>
              </Col>
              <Col xxl={8} md={12} span={24}>
                <Item
                  label={
                    <p>
                      Số đất <span style={{color: 'red'}}>(m2)</span>
                    </p>
                  }
                  className="ant-form-title__left"
                  name="SoDat"
                >
                  <InputNumberFormat />
                </Item>
              </Col>
              <Col xxl={8} md={12} span={24}>
                <Item
                  label={'Số cá nhân được trả quyền lợi'}
                  className="ant-form-title__left"
                  name="SoDat"
                >
                  <InputNumberFormat />
                </Item>
              </Col>
              <Col xxl={8} md={12} span={24}>
                <Item
                  label={
                    <p>
                      Số tiền <span style={{color: 'red'}}>(nghìn đồng)</span>
                    </p>
                  }
                  className="ant-form-title__left"
                  name="SoDat"
                >
                  <InputNumberFormat />
                </Item>
              </Col>
              <Col xxl={8} md={12} span={24}>
                <Item
                  label={
                    <p>
                      Số đất <span style={{color: 'red'}}>(m2)</span>
                    </p>
                  }
                  className="ant-form-title__left"
                  name="SoDat"
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
              {formatNumberStr(dataEdit.SoTien)}{' '}
            </p>
            <p>Số tiền: {formatNumberStr(dataEdit.SoDat)} (đồng)</p>
            <p>Số đất: {formatNumberStr(dataEdit.SoDat)} (m2)</p>
            <p>
              Số cá nhân được trả quyền lợi: {formatNumberStr(dataEdit.SoDat)}{' '}
            </p>
            <p>Số tiền: {formatNumberStr(dataEdit.SoDat)} (đồng)</p>
            <p>Số đất: {formatNumberStr(dataEdit.SoDat)} (m2)</p>
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
          {this.state.NoiDungQuyetDinh === 3 ? (
            <Row gutter={[10, 10]}>
              <Col md={12} span={24}>
                <Item
                  label={'Tổng số người bị kiến nghị xử lý'}
                  className="ant-form-title__left"
                  name="SoTien"
                >
                  <InputNumberFormat />
                </Item>
              </Col>
              <Col md={12} span={24}>
                <Item
                  label={'Trong đó số cán bộ, công chức, viên chức'}
                  className="ant-form-title__left"
                  name="SoDat"
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
            <p>Tổng số người bị kiến nghị xử lý: {dataEdit.SoTien} </p>
            <p>Trong đó số cán bộ, công chức, viên chức: {dataEdit.SoDat}</p>
          </div>
        </>
      );
    } else if (tab === 4) {
      return !isViewDetails ? (
        <>
          <Checkbox onChange={(e) => this.handleChecked(e, 2)}>
            Cập nhật nội dung{' '}
            <span style={{fontWeight: 600}}>"Chuyển cơ quan điều tra"</span>
          </Checkbox>
          {this.state.NoiDungQuyetDinh === 4 ? (
            <Row gutter={[10, 10]}>
              <Col md={12} span={24}>
                <Item
                  label={'Tổng số người'}
                  className="ant-form-title__left"
                  name="SoTien"
                >
                  <InputNumberFormat />
                </Item>
              </Col>
              <Col md={12} span={24}>
                <Item
                  label={'Trong đó số cán bộ, công chức, viên chức'}
                  className="ant-form-title__left"
                  name="SoDat"
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
            <p>Tổng số người: {dataEdit.SoTien} </p>
            <p>Trong đó số cán bộ, công chức, viên chức: {dataEdit.SoDat}</p>
          </div>
        </>
      );
    }
  };

  render() {
    const {
      dataEdit,
      title,
      visible,
      onCreate,
      fileKey,
      onCancel,
      DanhSachTenFile,
      DanhSachHuongXuLy,
      DanhSachCanBoXuLy,
      DanhSachCoQuan,
      loading,
      TabsKey,
    } = this.props;
    const {
      ListFileDinhKem,
      isFile,
      DanhSachHoSoTaiLieu,
      currentKey,
      DanhSachHoSoKhieuNai,
    } = this.state;
    const isViewDetails = this.props.dataEdit?.isViewDetails
      ? this.props.dataEdit.isViewDetails
      : null;

    const LoaiKhieuTo1ID = dataEdit?.LoaiKhieuTo1ID;

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

    const {ThongTinQuyetDinhGQ} = dataEdit;

    const SubTitle =
      TabsKey === 1
        ? 'Khiếu nại'
        : TabsKey === 2
        ? 'Tố cáo'
        : TabsKey === 3
        ? 'Kiến nghị, phản ánh'
        : '';
    return (
      <Modal
        title={`Thực hiện Báo cáo, quyết định, kết luận`}
        visible={visible}
        className="center-modal__footer"
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
        width={1700}
        onCancel={() => onCancel()}
        key={fileKey}
      >
        <Wrapper>
          <Row gutter={[30, 10]}>
            <Col lg={12} span={24}>
              <p className="title line-bottom">
                Thông tin Báo cáo, quyết định, kết luận
              </p>
              <div className="group-info">
                <p>Số quyết định: {ThongTinQuyetDinhGQ?.SoQuyetDinh}</p>
                <p>
                  Ngày ra quyết định: {ThongTinQuyetDinhGQ?.NgayQuyetDinhStr}
                </p>
                <p>Cơ quan thi hành: {ThongTinQuyetDinhGQ?.TenCoQuanBanHanh}</p>
                <p>
                  Thời hạn thi hành:{' '}
                  {ThongTinQuyetDinhGQ?.ThoiHanThiHanh
                    ? dayjs(ThongTinQuyetDinhGQ?.ThoiHanThiHanh).format(
                        'DD/MM/YYYY',
                      )
                    : null}
                </p>
              </div>
              <p className="summary-content">
                Tóm tắt nội dung giải quyết:{' '}
                {ThongTinQuyetDinhGQ?.TomTatNoiDungGQ}
              </p>
              <p className="title">Văn bản quyết định</p>
              {ThongTinQuyetDinhGQ?.DanhSachHoSoKhieuNai &&
              ThongTinQuyetDinhGQ?.DanhSachHoSoKhieuNai?.length ? (
                <div style={{marginTop: '10px'}} className={'box-file'}>
                  <table>
                    <thead>
                      <tr>
                        <th style={{width: '5%'}}>STT</th>
                        <th style={{width: '30%'}}>Tên hồ sơ, tài liệu</th>
                        <th style={{width: '30%'}}>File đính kèm</th>
                        <th style={{width: '25%'}}>Ngày cập nhật</th>
                        {/* {!isViewDetails ? (
                          <th style={{width: '15%'}}>Thao tác</th>
                        ) : null} */}
                      </tr>
                    </thead>
                    {ThongTinQuyetDinhGQ?.DanhSachHoSoTaiLieu.map(
                      (item, index) => {
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
                                          item.FileDinhKem[0].TenFile}
                                      </a>
                                    </p>
                                  ) : null}
                                </div>
                              </td>
                              <td rowspan={item.FileDinhKem.length}>
                                <p>{dayjs().format('DD/MM/YYYY')}</p>
                              </td>
                            </tr>
                            {item.FileDinhKem
                              ? item.FileDinhKem.map((item, index) => {
                                  if (index > 0) {
                                    return (
                                      <tr>
                                        <td>
                                          <p className="file-item">
                                            <a
                                              href={item.FileUrl}
                                              target="_blank"
                                            >
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
                      },
                    )}
                  </table>
                </div>
              ) : (
                ''
              )}
              {LoaiKhieuTo1ID !== LoaiKhieuTo.KienNghiPhanAnh ? (
                <>
                  <p className="title">
                    Phân tích kết quả:{' '}
                    <span>
                      {ThongTinQuyetDinhGQ?.PhanTichKetQua === 1
                        ? 'Đúng'
                        : ThongTinQuyetDinhGQ?.PhanTichKetQua === 2
                        ? 'Đúng 1 phần'
                        : ThongTinQuyetDinhGQ?.PhanTichKetQua === 3
                        ? 'Sai'
                        : ''}
                    </span>
                  </p>
                  <p className="title">
                    Quyết định lần 2:{' '}
                    <span>
                      {ThongTinQuyetDinhGQ?.PhanTichKetQua === 1
                        ? 'Công nhận quyết định lần 1'
                        : ThongTinQuyetDinhGQ?.PhanTichKetQua === 2
                        ? 'Hủy, sửa quyết định lần 1'
                        : ''}
                    </span>
                  </p>
                  <p className="title">
                    Nội dung thực hiện báo cáo, quyết định, kết luận và phân
                    công thi hành:
                  </p>
                  <div className="step-title">
                    <p className="title">Kiến nghị thu hồi cho nhà nước</p>
                  </div>
                  <div className="wrapper-content">
                    <p>
                      Số tiền:{' '}
                      {formatNumberStr(ThongTinQuyetDinhGQ?.SoTienThuHoi)}
                      <span>(đồng)</span>
                    </p>
                    <p>
                      Số đẩt:{' '}
                      {formatNumberStr(ThongTinQuyetDinhGQ?.SoDatThuHoi)}{' '}
                      <span>(m2)</span>
                    </p>
                  </div>

                  <div className="step-title">
                    <p className="title">Đã trả lại cho tổ chức, cá nhân</p>
                  </div>
                  <div className="wrapper-content__group">
                    <p>
                      Số tổ chức được trả quyền lợi:{' '}
                      {formatNumberStr(ThongTinQuyetDinhGQ?.SoToChuc)}{' '}
                    </p>
                    <p>
                      Số tiền:{' '}
                      {formatNumberStr(ThongTinQuyetDinhGQ?.SoTienToChucTraLai)}{' '}
                      <span>(Nghìn đồng)</span>
                    </p>
                    <p>
                      Số đất:{' '}
                      {formatNumberStr(ThongTinQuyetDinhGQ?.SoDatToChucTraLai)}{' '}
                      <span>(m2)</span>
                    </p>
                    <p>
                      Số cá nhân được trả quyền lợi:{' '}
                      {formatNumberStr(ThongTinQuyetDinhGQ?.SoCaNhan)}{' '}
                    </p>
                    <p>
                      Số tiền:{' '}
                      {formatNumberStr(ThongTinQuyetDinhGQ?.SoTienCaNhanTraLai)}{' '}
                      <span>(Nghìn đồng)</span>
                    </p>
                    <p>
                      Số đất:{' '}
                      {formatNumberStr(ThongTinQuyetDinhGQ?.SoDatCaNhanTraLai)}{' '}
                      <span>(m2)</span>
                    </p>
                  </div>
                  <div className="step-title">
                    <p className="title">Kiến nghị xử lý hành chính</p>
                  </div>
                  <div className="wrapper-content">
                    <p>
                      Tổng số người bị kiến nghị xử lý:{' '}
                      {formatNumberStr(
                        ThongTinQuyetDinhGQ?.SoNguoiBiKienNghiXuLy,
                      )}{' '}
                    </p>
                    <p>
                      Trong đó số cán bộ, công chức, viên chức:{' '}
                      {formatNumberStr(ThongTinQuyetDinhGQ?.SoCanBoBiXuLy)}{' '}
                    </p>
                  </div>
                  <div className="step-title">
                    <p className="title">Chuyển cơ quan điều tra</p>
                  </div>
                  <div className="wrapper-content">
                    <p>
                      Tổng số người:{' '}
                      {formatNumberStr(
                        ThongTinQuyetDinhGQ?.SoNguoiChuyenCoQuanDieuTra,
                      )}{' '}
                    </p>
                    <p>
                      Trong đó số cán bộ, công chức, viên chức:{' '}
                      {formatNumberStr(
                        ThongTinQuyetDinhGQ?.SoCanBoChuyenCoQuanDieuTra,
                      )}{' '}
                    </p>
                  </div>
                </>
              ) : null}
            </Col>

            <Col lg={12} span={24}>
              <Form ref={this.formRef} initialValues={{NgayThiHanh: dayjs()}}>
                <Item name="ThiHanhID" hidden className="ant-form-title__left">
                  <Input />
                </Item>
                {!isViewDetails ? (
                  <>
                    <p className="title line-bottom">
                      Thông tin thực hiện báo cáo, quyết định, kết luận
                      {/* THÔNG TIN THI HÀNH QUYẾT ĐỊNH GIẢI QUYẾT {SubTitle} */}
                    </p>
                    <Row gutter={[10, 10]}>
                      <Col md={12} span={24}>
                        <Item
                          label="Cơ quan thi hành"
                          name="CoQuanThiHanh"
                          rules={[REQUIRED]}
                          className="ant-form-title__left"
                        >
                          <Select>
                            {DanhSachCoQuan &&
                              DanhSachCoQuan.map((item) => (
                                <Option value={item.CoQuanID}>
                                  {item.TenCoQuan}
                                </Option>
                              ))}
                          </Select>
                        </Item>
                      </Col>
                      <Col md={12} span={24}>
                        <Item
                          label="Ngày thi hành"
                          name="NgayThiHanh"
                          rules={[REQUIRED]}
                          className="ant-form-title__left"
                        >
                          <DatePicker placeholder="" format={'DD/MM/YYYY'} />
                        </Item>
                      </Col>
                      <Col md={24} span={24}>
                        <Item
                          label="Ghi chú"
                          name="GhiChu"
                          className="ant-form-title__left"
                        >
                          <Textarea style={{width: '100%'}} />
                        </Item>
                      </Col>
                    </Row>
                    <div className="file">
                      <p>
                        Văn bản quyết định{' '}
                        {/* <span style={{color: 'red'}}>(*)</span> */}
                      </p>
                      <Button
                        type={'primary'}
                        onClick={() => this.showModalHoSoTaiLieu()}
                      >
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
                                        {item.FileDinhKem[0].name ||
                                          item.FileDinhKem[0].TenFile}
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
                                        onClick={() =>
                                          this.deteleFile(item, index)
                                        }
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
                                            <a
                                              href={item.FileUrl}
                                              target="_blank"
                                            >
                                              {item.name}
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
                {/* {isViewDetails ? (
                  <>
                    <p className="title">Phân tích kết quả: </p>
                    <p className="title">Quyết định lần 2: </p>
                  </>
                ) : null} */}
                {/* Nếu là khiếu nại lần 2 thì k hiện phân tích kết quả, nếu là lần 1 thì k hiện quyết định lần 2  */}
                {ThongTinQuyetDinhGQ?.SoTienThuHoi ||
                ThongTinQuyetDinhGQ?.SoDatThuHoi ? (
                  <p className="title">
                    Nội dung quyết định giải quyết và phân công thi hành quyết
                    định:
                  </p>
                ) : null}
                <div className="wraper-info__return">
                  <Row gutter={[10, 0]}>
                    <Col span={24}>
                      {ThongTinQuyetDinhGQ?.SoTienThuHoi ||
                      ThongTinQuyetDinhGQ?.SoDatThuHoi ? (
                        <div className="step-title">
                          <p className="title">Đã thu hồi cho nhà nước</p>
                        </div>
                      ) : null}
                    </Col>
                    {ThongTinQuyetDinhGQ?.SoTienThuHoi ? (
                      <Col md={12} span={24}>
                        <Item
                          label={
                            <p>
                              Số tiền đã thu{' '}
                              <span style={{color: 'red'}}>(Nghìn đồng)</span>
                            </p>
                          }
                          name="SoTienThuHoi"
                          className="ant-form-title__left"
                        >
                          <InputNumberFormat />
                        </Item>
                      </Col>
                    ) : null}
                    {ThongTinQuyetDinhGQ?.SoDatThuHoi ? (
                      <Col md={12} span={24}>
                        <Item
                          name="SoDatThuHoi"
                          label={
                            <p>
                              Số đất đã thu{' '}
                              <span style={{color: 'red'}}>(m2)</span>
                            </p>
                          }
                          className="ant-form-title__left"
                        >
                          <InputNumberFormat />
                        </Item>
                      </Col>
                    ) : null}
                    <Col span={24}>
                      {ThongTinQuyetDinhGQ?.SoToChuc ||
                      ThongTinQuyetDinhGQ?.SoTienToChucTraLai ||
                      ThongTinQuyetDinhGQ?.SoDatToChucTraLai ||
                      ThongTinQuyetDinhGQ?.SoCaNhan ||
                      ThongTinQuyetDinhGQ?.SoTienCaNhanTraLai ||
                      ThongTinQuyetDinhGQ?.SoDatCaNhanTraLai ? (
                        <div className="step-title">
                          <p className="title">
                            Đã trả lại cho tổ chức, cá nhân
                          </p>
                        </div>
                      ) : null}
                    </Col>
                    {ThongTinQuyetDinhGQ?.SoToChuc ? (
                      <Col xxl={8} md={12} span={24}>
                        <Item
                          label={<p>Số tổ chức đã được trả quyền lợi </p>}
                          className="ant-form-title__left"
                          name="SoToChuc"
                        >
                          <InputNumberFormat />
                        </Item>
                      </Col>
                    ) : null}
                    {ThongTinQuyetDinhGQ?.SoTienToChucTraLai ? (
                      <Col xxl={8} md={12} span={24}>
                        <Item
                          name="SoTienToChucTraLai"
                          label={
                            <p>
                              Số tiền đã trả{' '}
                              <span style={{color: 'red'}}>(Nghìn đồng)</span>
                            </p>
                          }
                          className="ant-form-title__left"
                        >
                          <InputNumberFormat />
                        </Item>
                      </Col>
                    ) : null}
                    {ThongTinQuyetDinhGQ?.SoDatToChucTraLai ? (
                      <Col xxl={8} md={12} span={24}>
                        <Item
                          name="SoDatToChucTraLai"
                          label={
                            <p>
                              Số đất đã trả{' '}
                              <span style={{color: 'red'}}>(m2)</span>
                            </p>
                          }
                          className="ant-form-title__left"
                        >
                          <InputNumberFormat />
                        </Item>
                      </Col>
                    ) : null}
                    {ThongTinQuyetDinhGQ?.SoCaNhan ? (
                      <Col xxl={8} md={12} span={24}>
                        <Item
                          name="SoCaNhan"
                          label={
                            <p>
                              Số cá nhân đã được trả quyền lợi
                              <span style={{color: 'red'}}>m2</span>
                            </p>
                          }
                          className="ant-form-title__left"
                        >
                          <InputNumberFormat />
                        </Item>
                      </Col>
                    ) : null}
                    {ThongTinQuyetDinhGQ?.SoTienCaNhanTraLai ? (
                      <Col xxl={8} md={12} span={24}>
                        <Item
                          name="SoTienCaNhanTraLai"
                          label={
                            <p>
                              Số tiền đã trả
                              <span style={{color: 'red'}}> (Nghìn đồng)</span>
                            </p>
                          }
                          className="ant-form-title__left"
                        >
                          <InputNumberFormat />
                        </Item>
                      </Col>
                    ) : null}
                    {ThongTinQuyetDinhGQ?.SoDatCaNhanTraLai ? (
                      <Col xxl={8} md={12} span={24}>
                        <Item
                          name="SoDatCaNhanTraLai"
                          label={
                            <p>
                              Số đất đã trả{' '}
                              <span style={{color: 'red'}}>(m2)</span>
                            </p>
                          }
                          className="ant-form-title__left"
                        >
                          <InputNumberFormat />
                        </Item>
                      </Col>
                    ) : null}
                    <Col span={24}>
                      {ThongTinQuyetDinhGQ?.SoNguoiBiKienNghiXuLy ||
                      ThongTinQuyetDinhGQ?.SoCanBoBiXuLy ? (
                        <div className="step-title">
                          <p className="title">Đã xử lý hành chính</p>
                        </div>
                      ) : null}
                    </Col>
                    {ThongTinQuyetDinhGQ?.SoNguoiBiKienNghiXuLy ? (
                      <Col md={12} span={24}>
                        <Item
                          label={<p>Tổng số người đã bị kiến nghị xử lý</p>}
                          className="ant-form-title__left"
                          name="SoNguoiBiKienNghiXuLy"
                        >
                          <InputNumberFormat />
                        </Item>
                      </Col>
                    ) : null}
                    {ThongTinQuyetDinhGQ?.SoCanBoBiXuLy ? (
                      <Col md={12} span={24}>
                        <Item
                          label={
                            <p>Trong đó số cán bộ, công chức, viên chức</p>
                          }
                          className="ant-form-title__left"
                          name="SoCanBoBiXuLy"
                        >
                          <InputNumberFormat />
                        </Item>
                      </Col>
                    ) : null}
                    <Col span={24}>
                      {ThongTinQuyetDinhGQ?.SoNguoiChuyenCoQuanDieuTra ||
                      ThongTinQuyetDinhGQ?.SoCanBoChuyenCoQuanDieuTra ? (
                        <div className="step-title">
                          <p className="title">Đã chuyển cơ quan điều tra</p>
                        </div>
                      ) : null}
                    </Col>
                    {ThongTinQuyetDinhGQ?.SoNguoiChuyenCoQuanDieuTra ? (
                      <Col md={12} span={24}>
                        <Item
                          label={<p>Tổng số người</p>}
                          className="ant-form-title__left"
                          name="SoNguoiChuyenCoQuanDieuTra"
                        >
                          <InputNumberFormat />
                        </Item>
                      </Col>
                    ) : null}
                    {ThongTinQuyetDinhGQ?.SoCanBoChuyenCoQuanDieuTra ? (
                      <Col md={12} span={24}>
                        <Item
                          label={
                            <p>Trong đó số cán bộ, công chức, viên chức</p>
                          }
                          className="ant-form-title__left"
                          name="SoCanBoChuyenCoQuanDieuTra"
                        >
                          <InputNumberFormat />
                        </Item>
                      </Col>
                    ) : null}
                  </Row>
                </div>
                <ModalAddEditHoSoTaiLieu
                  visible={this.state.visibleModalHoSoTaiLieu}
                  dataEdit={this.state.dataModalHoSoTaiLieu}
                  key={this.state.keyModalHoSoTaiLieu}
                  onCancel={this.closeModalHoSoTaiLieu}
                  onCreate={this.submitModalHoSoTaiLieu}
                />
              </Form>
            </Col>
          </Row>
        </Wrapper>
      </Modal>
    );
  }
}

export default ModalAddEdit;
