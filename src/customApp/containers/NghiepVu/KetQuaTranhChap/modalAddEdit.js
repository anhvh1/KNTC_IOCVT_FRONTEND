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
import api from './config';
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
import {
  Modal,
  Textarea,
} from '../../../../components/uielements/exportComponent';
import moment from 'moment';
import {getValueConfigLocalByKey} from '../../../../helpers/utility';
import ModalAddEditHoSoTaiLieu from '../Shared/Modal/ModalAddEditFileTaiLieu';
import {getLocalKey} from '../../../../helpers/utility';
import {
  DeleteOutlined,
  EditOutlined,
  FileOutlined,
  PlusOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import dayjs from 'dayjs';

const DanhSachVaiTro = [
  {
    key: 1,
    value: 'Trưởng đoàn/tổ trưởng',
    visible: true,
  },
  {
    key: 2,
    value: 'Phó trưởng đoàn/tổ phó',
    visible: true,
  },
  {
    key: 3,
    value: 'Thành viên',
    visible: true,
  },
];

const CoQuanID = getLocalKey('user')?.CoQuanID;
const {Item} = Form;
class ModalGiaoXacMinh extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      DanhSachHoSoTaiLieu: [],
      dataModalHoSoTaiLieu: {},
      keyModalHoSoTaiLieu: 0,
      visibleModalHoSoTaiLieu: false,
      DanhSachCanBoXacMinh: [],
      DanhSachCanBoSelected: [],
      DanhSachThanhVienHoiDong: [],
      DanhSachCanBoGQ: [],
    };
    this.formRef = React.createRef();
  }

  componentDidMount() {
    const {dataEdit} = this.props;
    if (dataEdit && dataEdit.KetQuaTranhChapID) {
      this.formRef &&
        this.formRef.current.setFieldsValue({
          ...dataEdit,
        });
    }
    if (dataEdit && dataEdit.DanhSachHoSoTaiLieu) {
      this.setState({DanhSachHoSoTaiLieu: dataEdit.DanhSachHoSoTaiLieu});
    }
    if (dataEdit && dataEdit.lstHoiDong) {
      this.setState({DanhSachThanhVienHoiDong: dataEdit.lstHoiDong});
    } else {
      this.handleAddThanhVienHoiDong();
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

  onOk = async (type) => {
    const {
      DanhSachHoSoTaiLieu,
      DanhSachCanBoXacMinh,
      DanhSachThanhVienHoiDong,
    } = this.state;
    const {onCreate, dataEdit} = this.props;
    this.formRef.current.validateFields().then((FormValue) => {
      const user = getLocalKey('user', {});
      const NguoiSuaID = user && user.CanBoID ? user.CanBoID : null;
      const value = {
        ...FormValue,
        DanhSachHoSoTaiLieu: DanhSachHoSoTaiLieu,
        lstHoiDong: DanhSachThanhVienHoiDong,
      };
      const newValue = {...value};
      for (const key in newValue) {
        if (!newValue[key]) {
          delete newValue[key];
        }
      }
      onCreate(newValue, type);
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

  handleAddCanBoXacMinh = async () => {
    const {DanhSachCanBoXacMinh} = this.state;
    const {DanhSachTruongPhong, DanhSachCoQuan} = this.props;
    const newDanhSachCanBoXacMinh = [...DanhSachCanBoXacMinh];
    const isTruongDoan = DanhSachCanBoXacMinh.find((item) => item.VaiTro === 1);
    const isPhoPhong = DanhSachCanBoXacMinh.find((item) => item.VaiTro === 2);
    const newDanhSachCanBoGQ = [];
    const newDanhSachCoQuan = [];
    const ListCanBoSelected = [];
    const ListCoQuanSelected = [];
    const DanhSachCanBoGQ = await this.GetNguoiDungByCoQuanID(426);

    DanhSachCanBoXacMinh.forEach((item) => {
      if (item.CanBoID) ListCoQuanSelected.push(item.CoQuanID);
    });
    DanhSachCanBoXacMinh.forEach((item) => {
      if (item.CanBoID) ListCanBoSelected.push(item.CanBoID);
    });
    DanhSachCanBoGQ.forEach((item) => {
      if (!ListCanBoSelected.includes(item.CanBoID)) {
        newDanhSachCanBoGQ.push(item);
      }
    });
    if (isTruongDoan && isPhoPhong) {
      newDanhSachCanBoXacMinh.push({
        DanhSachCanBoGQ: newDanhSachCanBoGQ,
        DanhSachCoQuan: DanhSachCoQuan,
        CoQuanID,
      });
    } else if (isTruongDoan) {
      newDanhSachCanBoXacMinh.push({
        DanhSachCanBoGQ: newDanhSachCanBoGQ,
        DanhSachCoQuan: DanhSachCoQuan,
        CoQuanID,
      });
    } else if (isPhoPhong) {
      newDanhSachCanBoXacMinh.push({
        DanhSachCanBoGQ: newDanhSachCanBoGQ,
        DanhSachCoQuan: DanhSachCoQuan,
        CoQuanID,
      });
    } else {
      newDanhSachCanBoXacMinh.push({
        DanhSachCanBoGQ: newDanhSachCanBoGQ,
        DanhSachCoQuan: DanhSachCoQuan,
        CoQuanID,
      });
    }
    this.setState({DanhSachCanBoXacMinh: newDanhSachCanBoXacMinh});
  };

  handleAddThanhVienHoiDong = async () => {
    const {DanhSachThanhVienHoiDong} = this.state;
    const newDanhSachThanhVienHoiDong = [...DanhSachThanhVienHoiDong];
    newDanhSachThanhVienHoiDong.push({});
    this.setState({DanhSachThanhVienHoiDong: newDanhSachThanhVienHoiDong});
  };

  GetNguoiDungByCoQuanID = async (value) => {
    let DanhSachCoQuan;
    await api
      .GetNguoiDungByCoQuanID({CoQuanID: value ? value : null})
      .then((res) => {
        if (res.data.Status > 0) {
          DanhSachCoQuan = res.data.Data;
        }
      });
    return DanhSachCoQuan;
  };

  changedCanBoXacMinh = (index, key, value) => {
    if (key) {
      const {DanhSachCanBoXacMinh} = this.state;
      let newDanhSachCanBoXacMinh = [...DanhSachCanBoXacMinh];
      if (key === 'VaiTro') {
        newDanhSachCanBoXacMinh[index][key] = value;
        const PhoPhong = newDanhSachCanBoXacMinh.find(
          (item) => item?.VaiTro === 2,
        );
        const TruongPhong = newDanhSachCanBoXacMinh.find(
          (item) => item?.VaiTro === 1,
        );
        if (TruongPhong && PhoPhong) {
          const otherList = newDanhSachCanBoXacMinh.filter(
            (item) => item.VaiTro !== 2 && item.VaiTro !== 1,
          );

          otherList.forEach((item, index) => {
            const obj =
              newDanhSachCanBoXacMinh[newDanhSachCanBoXacMinh.indexOf(item)];
            obj.DanhSachVaiTro = DanhSachVaiTro.filter(
              (item) => item.key !== 2 && item.key !== 1,
            );
          });
        } else if (TruongPhong) {
          const otherList = newDanhSachCanBoXacMinh.filter(
            (item) => item.VaiTro !== 1,
          );
          otherList.forEach((item, index) => {
            const obj =
              newDanhSachCanBoXacMinh[newDanhSachCanBoXacMinh.indexOf(item)];
            obj.DanhSachVaiTro = DanhSachVaiTro.filter(
              (item) => item.key !== 1,
            );
          });
        } else if (PhoPhong) {
          const otherList = newDanhSachCanBoXacMinh.filter(
            (item) => item.VaiTro !== 2,
          );
          otherList.forEach((item, index) => {
            const obj =
              newDanhSachCanBoXacMinh[newDanhSachCanBoXacMinh.indexOf(item)];
            obj.DanhSachVaiTro = DanhSachVaiTro.filter(
              (item) => item.key !== 2,
            );
          });
        }
      } else if (key === 'CoQuanID') {
        newDanhSachCanBoXacMinh[index][key] = value;
        api
          .GetNguoiDungByCoQuanID({CoQuanID: value ? value : null})
          .then((res) => {
            if (res.data.Status > 0) {
              const DanhSachCanBoGQ = [];
              const ListCanBoSelected = [];
              newDanhSachCanBoXacMinh.forEach((item) => {
                if (item.CanBoID) {
                  ListCanBoSelected.push(item.CanBoID);
                }
              });
              res.data.Data.forEach((item) => {
                if (!ListCanBoSelected.includes(item.CanBoID)) {
                  DanhSachCanBoGQ.push(item);
                }
              });
              newDanhSachCanBoXacMinh[index]['CanBoID'] = null;
              newDanhSachCanBoXacMinh[index]['DanhSachCanBoGQ'] =
                DanhSachCanBoGQ;
              this.setState({DanhSachCanBoXacMinh: newDanhSachCanBoXacMinh});
            }
          });
        return true;
      } else if (key === 'CanBoID') {
        newDanhSachCanBoXacMinh[index][key] = value;

        let DanhSachCanBoSelected = [...this.state.DanhSachCanBoSelected];
        const CanBoID = newDanhSachCanBoXacMinh[index].CanBoID;
        const CoQuanID = DanhSachCanBoXacMinh[index]?.CoQuanID;

        if (value && !DanhSachCanBoSelected.includes(value)) {
          DanhSachCanBoSelected.push(value);
          this.setState({DanhSachCanBoSelected: DanhSachCanBoSelected});
        } else if (!value && CanBoID) {
          DanhSachCanBoSelected = DanhSachCanBoSelected.filter(
            (item) => item !== CanBoID,
          );
          this.setState({DanhSachCanBoSelected: DanhSachCanBoSelected});
        }
        newDanhSachCanBoXacMinh
          .filter((item) => item.CanBoID !== value || !item.CanBoID)
          .filter((item) => item.CoQuanID === CoQuanID)
          .forEach((item) => {
            item.DanhSachCanBoGQ = item.DanhSachCanBo.filter(
              (itemFilter) => itemFilter.CanBoID !== value,
            );
          });
      }

      this.setState({DanhSachCanBoXacMinh: newDanhSachCanBoXacMinh});
    }
  };

  changeThanhVienHoiDong = (index, key, value) => {
    const {DanhSachThanhVienHoiDong} = this.state;
    let newDanhSachThanhVienHoiDong = [...DanhSachThanhVienHoiDong];
    newDanhSachThanhVienHoiDong[index][key] = value;
    this.setState({DanhSachThanhVienHoiDong: newDanhSachThanhVienHoiDong});
  };

  deleteThanhVienHoiDong = (index, item) => {
    const {DanhSachThanhVienHoiDong} = this.state;
    const newDanhSachThanhVienHoiDong = [...DanhSachThanhVienHoiDong];
    newDanhSachThanhVienHoiDong.splice(index, 1);

    // const value = item.CanBoID;

    // newDanhSachThanhVienHoiDong
    //   .filter((item) => item.CanBoID !== value || !item?.CanBoID)
    //   .forEach((itemFor) => {
    //     const newDanhSachCanBoGq = [...itemFor.DanhSachCanBoGQ];
    //     newDanhSachCanBoGq.push(
    //       item.DanhSachCanBoGQ.find(
    //         (itemFilter) => itemFilter.CanBoID === value,
    //       ),
    //     );
    //     itemFor.DanhSachCanBoGQ = newDanhSachCanBoGq.sort(
    //       (a, b) => a.CanBoID - b.CanBoID,
    //     );
    //   });
    this.setState({DanhSachThanhVienHoiDong: newDanhSachThanhVienHoiDong});
  };

  deleteCanBoXacMinh = (index, item) => {
    const {DanhSachCanBoXacMinh} = this.state;
    const newDanhSachCanBoXacMinh = [...DanhSachCanBoXacMinh];
    newDanhSachCanBoXacMinh.splice(index, 1);

    const value = item.CanBoID;

    newDanhSachCanBoXacMinh
      .filter((item) => item.CanBoID !== value || !item?.CanBoID)
      .forEach((itemFor) => {
        const newDanhSachCanBoGq = [...itemFor.DanhSachCanBoGQ];
        newDanhSachCanBoGq.push(
          item.DanhSachCanBoGQ.find(
            (itemFilter) => itemFilter.CanBoID === value,
          ),
        );
        itemFor.DanhSachCanBoGQ = newDanhSachCanBoGq.sort(
          (a, b) => a.CanBoID - b.CanBoID,
        );
      });
    this.setState({DanhSachCanBoXacMinh: newDanhSachCanBoXacMinh});
  };

  render() {
    const {
      dataEdit,
      title,
      visible,
      onCreate,
      fileKey,
      onCancel,
      DanhSachCanBoGQ,
      SuDungQuyTrinhGQPhucTap,
      loading,
    } = this.props;
    const {
      ListFileDinhKem,
      isFile,
      DanhSachHoSoTaiLieu,
      DanhSachThanhVienHoiDong,
      DanhSachCanBoXacMinh,
    } = this.state;
    const isViewDetails = this.props.dataEdit?.isViewDetails
      ? this.props.dataEdit.isViewDetails
      : null;
    const type = dataEdit?.type;
    return (
      <Modal
        title={'Cập nhật thông tin tranh chấp'}
        visible={visible}
        className="center-modal__footer"
        footer={
          <>
            <Button
              type="primary"
              onClick={() => this.onOk(type)}
              loading={loading}
            >
              <SaveOutlined /> Lưu
            </Button>
            <Button className="btn-danger" onClick={() => onCancel()}>
              Hủy
            </Button>
          </>
        }
        width={1200}
        onCancel={() => onCancel()}
        key={fileKey}
      >
        <Wrapper>
          <Form ref={this.formRef}>
            <Item hidden name="KetQuaTranhChapID"></Item>
            <>
              <p className="title">
                Thông tin hội đồng tranh chấp
                <span style={{color: 'red', marginLeft: '5px'}}>(*)</span>
              </p>
              <Row gutter={[10, 10]}>
                <Col span={11} className="center-middle">
                  <p>Tên cán bộ</p>
                </Col>
                <Col span={10} className="center-middle">
                  <p>Nhiệm vụ</p>
                </Col>
                <Col span={3}>
                  <div className="btns-end center-middle">
                    <Button
                      type="primary"
                      onClick={this.handleAddThanhVienHoiDong}
                    >
                      Thêm
                    </Button>
                  </div>
                </Col>
                {DanhSachThanhVienHoiDong &&
                  DanhSachThanhVienHoiDong.map((item, index) => (
                    <>
                      <Col span={11} className="center-middle">
                        <Input
                          style={{width: '100%'}}
                          onChange={(e) =>
                            this.changeThanhVienHoiDong(
                              index,
                              'TenCanBo',
                              e.target.value,
                            )
                          }
                          value={item.TenCanBo}
                        />
                      </Col>
                      <Col span={10} className="center-middle">
                        <Input
                          style={{width: '100%'}}
                          onChange={(e) =>
                            this.changeThanhVienHoiDong(
                              index,
                              'NhiemVu',
                              e.target.value,
                            )
                          }
                          value={item.NhiemVu}
                        />
                      </Col>
                      <Col span={3}>
                        <div className="btns-end">
                          <Button
                            className="btn-danger"
                            onClick={() =>
                              this.deleteThanhVienHoiDong(index, item)
                            }
                          >
                            Xóa
                          </Button>
                        </div>
                      </Col>
                    </>
                  ))}
              </Row>
              <Item
                label="Nội dung tranh chấp"
                name="NDHoaGiai"
                className="ant-form-title__left"
              >
                <Input.TextArea />
              </Item>
              <Item
                label="Kết quả tranh chấp"
                name="KetQuaHoaGiai"
                className="ant-form-title__left"
              >
                <Input.TextArea />
              </Item>
            </>

            <div className="file">
              <p>Hồ sơ, tài liệu</p>
              <Button
                type={'primary'}
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

export default ModalGiaoXacMinh;
