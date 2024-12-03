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
      QuyetDinh: 1,
      isFile: false,
    };
    this.formRef = React.createRef();
  }

  componentDidMount() {
    const {dataEdit} = this.props;
    if (dataEdit && dataEdit.TrangThaiPheDuyet) {
      this.formRef &&
        this.formRef.current.setFieldsValue({
          ...dataEdit,
          NgayHetHan: dataEdit?.NgayHetHan ? dayjs(dataEdit.NgayHetHan) : null,
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
    const {DanhSachHoSoTaiLieu, FileDinhKemDelete} = this.state;
    const {onCreate, dataEdit} = this.props;
    this.formRef.current
      .validateFields()
      .then((FormValue) => {
        const value = {
          DanhSachHoSoTaiLieu: DanhSachHoSoTaiLieu,
          ...FormValue,
          NgayHetHan: formatDate(FormValue?.NgayHetHan),
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

  render() {
    const {
      dataEdit,
      visible,
      fileKey,
      onCancel,
      DanhSachCanBoGiaoXacMinh,
      loading,
    } = this.props;
    const {DanhSachHoSoTaiLieu} = this.state;
    const isViewDetails = this.props.dataEdit?.isViewDetails
      ? this.props.dataEdit.isViewDetails
      : null;

    return (
      <Modal
        title={
          dataEdit && dataEdit.FileID
            ? 'Sửa file tài liệu'
            : 'Thêm mới file tài liệu'
        }
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
        width={800}
        onCancel={() => onCancel()}
        key={fileKey}
      >
        <Wrapper>
          <Form ref={this.formRef}>
            {isViewDetails ? (
              <>
                <p className="item-info">
                  Hướng xử lý :{' '}
                  <span style={{fontWeight: 600}}>{dataEdit?.HuongXuLy}</span>
                </p>
                <p className="item-info">
                  Nội dung xử lý :{' '}
                  <span style={{fontWeight: 600}}>
                    {dataEdit?.NoiDungHuongDan}
                  </span>
                </p>
                <p className="item-info">Hồ sơ, tài liệu</p>
              </>
            ) : null}

            {!isViewDetails ? (
              <>
                <Item
                  label="Giao cho"
                  name="CanBoID"
                  rules={[REQUIRED]}
                  initialValue={1}
                >
                  <Select>
                    {DanhSachCanBoGiaoXacMinh &&
                      DanhSachCanBoGiaoXacMinh.map((item) => (
                        <Option value={item.CanBoID}>{item.TenCanBo}</Option>
                      ))}
                  </Select>
                </Item>
                <Item
                  label="Ngày hết hạn"
                  name="NgayHetHan"
                  className="ant-form-title__left"
                >
                  <DatePicker />
                </Item>
                <div className="file">
                  <p>Hồ sơ, tài liệu</p>
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
