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
      isFile: false,
    };
    this.formRef = React.createRef();
  }

  componentDidMount() {
    const {dataEdit} = this.props;
    if (
      (dataEdit && dataEdit.NgayHetHan) ||
      (dataEdit && dataEdit.DanhSachHoSoTaiLieu)
    ) {
      this.formRef &&
        this.formRef.current.setFieldsValue({
          ...dataEdit,
          NgayHetHan: dataEdit.NgayHetHan ? dayjs(dataEdit.NgayHetHan) : null,
        });
      this.setState({DanhSachHoSoTaiLieu: dataEdit.DanhSachHoSoTaiLieu});
    }
  }

  beforeUploadFile = (file, callback, listFile) => {
    const FileLimit = getValueConfigLocalByKey('data_config')?.fileLimit;
    const isLt2M = file.size / 1024 / 1024 < FileLimit;
    const {ListFileDinhKem} = this.state;
    const ListFileExist = [];
    listFile.forEach((file) => {
      const ExistFile = ListFileDinhKem.filter(
        (item) => item.TenFileGoc === file.name,
      );
      if (ExistFile.length) {
        ListFileExist.push(file);
      }
    });
    if (!isLt2M) {
      message.error(`File đính kèm phải nhỏ hơn ${FileLimit}MB`);
    } else {
      this.getBase64(file, callback);
    }
    // }
    return false;
  };

  getBase64 = (file, callback, listFile) => {
    // listFile.forEach(file => {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result, file));
    reader.readAsDataURL(file);
    // })
  };

  genDataFileDinhKem = (base64, file) => {
    const {ListFileDinhKem} = this.state;
    const {KeKhaiID} = this.props;
    const newListFileDinhKem = [...ListFileDinhKem];
    //Thay thế file đã thêm trước đó chưa lưu
    const indexFile = newListFileDinhKem.findIndex(
      (item) => item.TrangThai && !item.FileID,
    );
    newListFileDinhKem.push(file);
    this.setState({ListFileDinhKem: newListFileDinhKem, isFile: false});
  };

  deteleFile = (item, index) => {
    const {ListFileDinhKem} = this.state;
    if (item.FileDinhKemID) {
      ModalAnt.confirm({
        title: 'Thông báo',
        content: 'Bạn có muốn xóa file đính kèm này không ?',
        okText: 'Có',
        cancelText: 'Không',
        onOk: () => {
          item.TrangThai = 0;
          const newArr = [...ListFileDinhKem];
          const index = newArr.indexOf(item);
          newArr.splice(index, 1);
          // ListFileDinhKem[index] = item;
          this.setState({
            ListFileDinhKem: newArr,
            isFalseFile: false,
            messErr: '',
          });
        },
      });
    } else {
      ListFileDinhKem.splice(index, 1);
      this.setState({
        ListFileDinhKem,
        isFalseFile: false,
        messErr: '',
      });
    }
  };

  onOk = async () => {
    const {DanhSachHoSoTaiLieu} = this.state;
    const {onCreate, dataEdit} = this.props;
    if (!(DanhSachHoSoTaiLieu && DanhSachHoSoTaiLieu.length)) {
      this.setState({isFile: true});
    }
    this.formRef.current
      .validateFields()
      .then((FormValue) => {
        const value = {
          DanhSachHoSoTaiLieu: DanhSachHoSoTaiLieu,
          NgayHetHan: formatDate(FormValue.NgayHetHan),
          CanBoID: FormValue.CanBoID,
          GhiChu: FormValue.GhiChu,
          XuLyDonID: this.props.XuLyDonID ? this.props.XuLyDonID : null,
        };
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
    const {dataEdit, visible, fileKey, onCancel, DanhSachCanBoXuLy, loading} =
      this.props;
    const {DanhSachHoSoTaiLieu} = this.state;
    const isViewDetails = dataEdit?.isViewDetails
      ? dataEdit.isViewDetails
      : null;
    return (
      <Modal
        title={'Phân xử lý đơn'}
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
              <div className="view-wrapper">
                <p>
                  Hạn xử lý đơn:{' '}
                  <span style={{fontWeight: 600}}>
                    {dataEdit?.NgayHetHan
                      ? dayjs(dataEdit?.NgayHetHan).format('DD/MM/YYYY')
                      : ''}
                  </span>
                </p>
                <p>
                  Cán bộ được phân xử lý:{' '}
                  <span style={{fontWeight: 600}}>
                    {dataEdit?.CanBoID
                      ? DanhSachCanBoXuLy.find(
                          (item) => item.CanBoID === dataEdit?.CanBoID,
                        )?.TenCanBo
                      : ''}
                  </span>
                </p>
                <p>
                  Ghi chú:{' '}
                  <span style={{fontWeight: 600}}>{dataEdit?.GhiChu}</span>
                </p>
                {/* <p>Hồ sơ, tài liệu</p> */}
              </div>
            ) : null}

            {!isViewDetails ? (
              <>
                <Row gutter={[10, 10]}>
                  <Col lg={12} span={24}>
                    <Item hidden name="PhanXuLyID"></Item>
                    <Item
                      label="Hạn xử lý đơn"
                      name="NgayHetHan"
                      rules={[REQUIRED]}
                      className="ant-form-title__left"
                    >
                      <DatePicker
                        placeholder=""
                        format={'DD/MM/YYYY'}
                        style={{width: '100%', height: 30}}
                      />
                    </Item>
                  </Col>
                  <Col lg={12} span={24}>
                    <Item
                      label="Phân cho cán bộ xử lý"
                      name="CanBoID"
                      rules={[REQUIRED]}
                      className="ant-form-title__left"
                    >
                      <Select>
                        {DanhSachCanBoXuLy
                          ? DanhSachCanBoXuLy.map((item) => (
                              <Option value={item.CanBoID}>
                                {item.TenCanBo}
                              </Option>
                            ))
                          : null}
                      </Select>
                    </Item>
                  </Col>
                </Row>
                <Item
                  label="Ghi chú"
                  name="GhiChu"
                  className="ant-form-title__left"
                >
                  <TextArea></TextArea>
                </Item>
              </>
            ) : null}
            <div className="file">
              <p>Hồ sơ, tài liệu</p>
              {!dataEdit.isViewDetails ? (
                <Button
                  type={'primary'}
                  onClick={() => this.showModalHoSoTaiLieu()}
                >
                  Thêm hồ sơ, tài liệu
                </Button>
              ) : null}
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
