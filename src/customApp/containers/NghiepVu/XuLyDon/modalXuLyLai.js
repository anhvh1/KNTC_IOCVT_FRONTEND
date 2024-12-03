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
import {Collapse} from '../../../../components/uielements/exportComponent';
import ModalAddEditHoSoTaiLieu from '../Shared/Modal/ModalAddEditFileTaiLieu';
import ModalTrinhDuyet from './modalTrinhDuyet';
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
class ModalXuLyLai extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DanhSachHoSoTaiLieu: [],
      dataModalHoSoTaiLieu: {},
      keyModalHoSoTaiLieu: 0,
      visibleModalHoSoTaiLieu: false,
      keyModalTrinhDuyet: 0,
      visibleModalTrinhDuyet: false,
      currentKey: [1, 2],
      fileView: {},
      fileKey: 0,
      loading: false,
      isFile: false,
    };
    this.formRef = React.createRef();
  }

  componentDidMount() {
    const {dataEdit} = this.props;
    if (dataEdit && dataEdit.DanhSachHoSoTaiLieu) {
      this.setState({DanhSachHoSoTaiLieu: dataEdit.DanhSachHoSoTaiLieu});
      // this.formRef &&
      //   this.formRef.current.setFieldsValue({
      //     ...dataEdit,
      //   });
      // this.setState({DanhSachHoSoTaiLieu: dataEdit.DanhSachHoSoTaiLieu});
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

  onOk = async (IsTrinh = false) => {
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
          // index: dataEdit.index,
          HuongGiaiQuyetID: FormValue.HuongGiaiQuyetID,
          NoiDungHuongDan: FormValue.NoiDungHuongDan,
        };
        if (this.props.XuLyDonID) {
          value.XuLyDonID = this.props.XuLyDonID;
        }
        onCreate(value, IsTrinh);
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
    } = this.props;
    const {
      ListFileDinhKem,
      loading,
      isFile,
      DanhSachHoSoTaiLieu,
      visibleModalTrinhDuyet,
    } = this.state;
    const isViewDetails = this.props.dataEdit?.isViewDetails
      ? this.props.dataEdit.isViewDetails
      : null;
    return (
      <Modal
        title={
          dataEdit && dataEdit.HuongXuLy ? 'Kết quả xử lý đơn' : 'Xử lý đơn'
        }
        visible={visible}
        className="center-modal__footer"
        footer={
          !isViewDetails ? (
            <>
              <Button type="primary" onClick={() => this.onOk()}>
                <SaveOutlined /> Lưu
              </Button>
              {/* <Button type="primary" onClick={() => this.onOk(true)}>
                <SaveOutlined /> Lưu và trình
              </Button> */}
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
          <Form ref={this.formRef}>
            <Collapse
              activeKey={this.state.currentKey}
              onChange={(key) => this.setState({currentKey: key})}
              expandIconPosition="end"
              bordered={false}
            >
              <Collapse.Panel
                header={'Thông tin duyệt của lãnh đạo'}
                key={1}
                forceRender
              >
                <div className="wrapper-content">
                  <p>
                    Hạn xử lý : <span>{dataEdit.HanXuLy}</span>
                  </p>
                  <p>
                    Nội dung : <span>{dataEdit.NoiDungHuongDan}</span>
                  </p>
                  <p>Hồ sơ, tài liệu</p>
                  {dataEdit?.DanhSachHoSoTaiLieu &&
                  dataEdit?.DanhSachHoSoTaiLieu?.length ? (
                    <div style={{marginTop: '10px'}} className={'box-file'}>
                      <table>
                        <thead>
                          <tr>
                            <th style={{width: '5%'}}>STT</th>
                            <th style={{width: '30%'}}>Tên hồ sơ, tài liệu</th>
                            <th style={{width: '25%'}}>Ngày cập nhật</th>
                            <th style={{width: '25%'}}>Người cập nhật</th>
                            <th style={{width: '30%'}}>File đính kèm</th>
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
                                <td rowspan={item.FileDinhKem.length}>
                                  <p>
                                    {item.NgayCapNhat
                                      ? dayjs(item.NgayCapNhat).format(
                                          'DD/MM/YYYY',
                                        )
                                      : null}
                                  </p>
                                </td>
                                <td rowspan={item.FileDinhKem.length}>
                                  <p>{item.NguoiCapNhat}</p>
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
              </Collapse.Panel>
              <Collapse.Panel header={'Xử lý lại'} key={2} forceRender>
                <>
                  <Item
                    label="Hướng xử lý"
                    name="HuongGiaiQuyetID"
                    rules={[REQUIRED]}
                    className="ant-form-title__left"
                  >
                    <Select>
                      {DanhSachHuongXuLy
                        ? DanhSachHuongXuLy.map((item) => (
                            <Option
                              value={item.HuongGiaiQuyetID}
                              key={item.HuongGiaiQuyetID}
                            >
                              {item.TenHuongGiaiQuyet}
                            </Option>
                          ))
                        : null}
                    </Select>
                  </Item>
                  <Item
                    label="Nội dung xử lý"
                    name="NoiDungHuongDan"
                    className="ant-form-title__left"
                  >
                    <TextArea></TextArea>
                  </Item>
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
              </Collapse.Panel>
            </Collapse>

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

export default ModalXuLyLai;