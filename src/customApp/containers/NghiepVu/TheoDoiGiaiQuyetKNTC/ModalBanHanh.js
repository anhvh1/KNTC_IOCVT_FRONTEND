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
  InputNumber,
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
  ITEM_LAYOUT_SMALL_2,
} from '../../../../settings/constants';
import {
  Modal,
  Textarea,
} from '../../../../components/uielements/exportComponent';
import moment from 'moment';
import {_debounce, getValueConfigLocalByKey} from '../../../../helpers/utility';
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
class ModalAddEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DanhSachHoSoTaiLieu: [],
      dataModalHoSoTaiLieu: {},
      DanhSachQuyetDinhGiaiQuyet: [],
      keyModalHoSoTaiLieu: 0,
      // DanhSachQuyetDinhGiaiQuyet: [],
      visibleModalHoSoTaiLieu: false,
      keyModalTrinhDuyet: 0,
      visibleModalTrinhDuyet: false,
      fileView: {},
      fileKey: 0,
      loading: false,
      isFile: false,
    };
    this.formRef = React.createRef();
  }

  componentDidMount() {
    const {dataEdit} = this.props;
    if (dataEdit && dataEdit.HuongGiaiQuyetID) {
      this.formRef &&
        this.formRef.current.setFieldsValue({
          ...dataEdit,
        });
      this.setState({DanhSachHoSoTaiLieu: dataEdit.DanhSachHoSoTaiLieu});
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
    const {DanhSachHoSoTaiLieu, FileDinhKemDelete} = this.state;
    const {onCreate, dataEdit} = this.props;
    // if (!(DanhSachHoSoTaiLieu && DanhSachHoSoTaiLieu.length)) {
    //   this.setState({isFile: true});
    // }
    this.formRef.current
      .validateFields()
      .then((FormValue) => {
        const user = getLocalKey('user', {});
        const value = {
          DanhSachHoSoTaiLieu: DanhSachHoSoTaiLieu,
          HuongGiaiQuyetID: FormValue.HuongGiaiQuyetID,
          NoiDungHuongDan: FormValue.NoiDungHuongDan,
          type: dataEdit.type,
        };
        if (this.props.XuLyDonID) {
          value.XuLyDonID = this.props.XuLyDonID;
        }
        const newKey = this.state.keyModalTrinhDuyet + 1;
        if (IsTrinh) {
          this.setState({
            visibleModalTrinhDuyet: true,
            keyModalTrinhDuyet: newKey,
          });
        } else if (isCreate) {
          this.setState({
            visibleModalTrinhDuyet: false,
          });
          onCreate(value, true);
        } else {
          onCreate(value);
        }
      })
      .catch((err) => console.log('errr', err));
  };

  TrinhKetQua = () => {
    const newKey = this.state.keyModalTrinhDuyet + 1;
    this.setState({
      visibleModalTrinhDuyet: true,
      keyModalTrinhDuyet: newKey,
    });
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

  closeModalTrinhDuyet = () => {
    this.setState({
      visibleModalTrinhDuyet: false,
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
        dataModalHoSoTaiLieu: newDanhSachHoSoTaiLieu,
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

  handleChangeQuyetDinhGiaiQuyet = _debounce((value, index, key, index2) => {
    const {DanhSachQuyetDinhGiaiQuyet} = this.state;
    const newDanhSachQuyetDinhGiaiQuyet = [...DanhSachQuyetDinhGiaiQuyet];
    if (index2) {
      newDanhSachQuyetDinhGiaiQuyet[index][index2][key] = value;
      this.setState({
        DanhSachQuyetDinhGiaiQuyet: newDanhSachQuyetDinhGiaiQuyet,
      });
    } else {
      newDanhSachQuyetDinhGiaiQuyet[index][key] = value;
      this.setState({
        DanhSachQuyetDinhGiaiQuyet: newDanhSachQuyetDinhGiaiQuyet,
      });
    }
  });

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
      DanhSachLoaiKetQua,
      DanhSachCoQuan,
    } = this.props;
    const {
      ListFileDinhKem,
      loading,
      isFile,
      DanhSachHoSoTaiLieu,
      visibleModalTrinhDuyet,
      DanhSachQuyetDinhGiaiQuyet,
    } = this.state;
    const isViewDetails = this.props.dataEdit?.isViewDetails
      ? this.props.dataEdit.isViewDetails
      : null;
    return (
      <Modal
        title={
          dataEdit && dataEdit.type === 1
            ? 'Ban hành quyết định giao xác minh'
            : dataEdit.type === 2
            ? 'Ban hành quyết định giải quyết'
            : ''
        }
        visible={visible}
        className="center-modal__footer"
        footer={[
          <>
            <Button type="primary" onClick={() => this.onOk(true)}>
              <SaveOutlined /> Ban hành
            </Button>
            <Button className="btn-danger" onClick={() => onCancel()}>
              Hủy
            </Button>
          </>,
        ]}
        width={1200}
        onCancel={() => onCancel()}
        key={fileKey}
      >
        <Wrapper>
          <Form ref={this.formRef}>
            <div className="content-wrapper">
              <p className="tile-content">Thông tin quyết định giải quyết</p>
              <Row gutter={[30, 0]}>
                <Col md={12} span={24}>
                  <Item
                    label="Nội dung ban hành"
                    name="NoiDungBanHanh"
                    className="ant-form-title__left"
                  >
                    <Textarea />
                  </Item>
                </Col>
              </Row>
              <div className="file">
                <p>Hồ sơ, tài liệu</p>
                <Button
                  type={'primary'}
                  loading={loading}
                  onClick={() => this.showModalHoSoTaiLieu()}
                >
                  Thêm hồ sơ, tài liệu
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
            </div>

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
