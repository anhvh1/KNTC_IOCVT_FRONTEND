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
  CapHanhChinh,
} from '../../../../settings/constants';
import {
  Modal,
  Textarea,
} from '../../../../components/uielements/exportComponent';
import ModalAddEditHoSoTaiLieu from '../Shared/Modal/ModalAddEditFileTaiLieu';
import {formatDate, getLocalKey} from '../../../../helpers/utility';
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
      fileView: {},
      fileKey: 0,
      loading: false,
      QuyetDinh: 1,
      isFile: false,
      DanhSachCanBoGQ: [],
    };
    this.formRef = React.createRef();
  }

  componentDidMount() {
    const {dataEdit} = this.props;
    if (dataEdit && dataEdit.TrangThaiPheDuyet) {
      this.formRef &&
        this.formRef.current.setFieldsValue({
          ...dataEdit,
          HanXuLy: dataEdit?.HanXuLy ? dayjs(dataEdit.HanXuLy) : null,
        });
      this.setState({
        DanhSachHoSoTaiLieu: dataEdit.DanhSachHoSoTaiLieu
          ? dataEdit.DanhSachHoSoTaiLieu
          : [],
      });
    }
    this.handleAddCanBoXacMinh();
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
    const {DanhSachHoSoTaiLieu, DanhSachCanBoXacMinh} = this.state;
    const {onCreate, dataEdit, isTLDTGiaoXacMinh} = this.props;
    console.log(isTLDTGiaoXacMinh, 'isTLDTGiaoXacMinh');
    this.formRef.current.validateFields().then((FormValue) => {
      const value = {
        DanhSachHoSoTaiLieu: DanhSachHoSoTaiLieu,
        ...FormValue,
        HanGiaiQuyet: formatDate(FormValue?.HanGiaiQuyet),
      };
      if (type === 1) {
        value.ToXacMinh = DanhSachCanBoXacMinh;
      }
      if (this.props.XuLyDonID) {
        value.XuLyDonID = this.props.XuLyDonID;
      }
      const newValue = {...value};
      for (const key in newValue) {
        if (!newValue[key]) {
          delete newValue[key];
        }
      }
      if (!isTLDTGiaoXacMinh && type === 1) {
        // nếu là trưởng phòng tiến hành cập nhật đoàn tổ xác minh thì mới required vai trò trưởng đoàn/tổ trưởng
        const checkTruongDoan = newValue.ToXacMinh?.find(
          (item) => item?.VaiTro === 1,
        );
        const checkCanBo = newValue.ToXacMinh?.find((item) => item?.CanBoID);
        if (checkTruongDoan && checkCanBo) {
          onCreate(newValue, type);
        } else {
          message.destroy();
          message.warning(
            'Thông tin đoàn/tổ xác minh ít nhất phải có một cán bộ với vai trò Trưởng đoàn/tổ trưởng',
          );
        }
      } else {
        onCreate(newValue, type);
      }
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
    const CoQuanID = getLocalKey('user')?.CoQuanID;
    const newDanhSachCanBoGQ = [];
    const newDanhSachTruongPhong = [];
    const ListCanBoSelected = [];
    const ListCoQuanSelected = [];
    const DanhSachCanBoGQ = await this.GetNguoiDungByCoQuanID(CoQuanID);

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
    DanhSachTruongPhong.forEach((item) => {
      if (!ListCanBoSelected.includes(item.CanBoID)) {
        newDanhSachTruongPhong.push(item);
      }
    });
    if (isTruongDoan && isPhoPhong) {
      newDanhSachCanBoXacMinh.push({
        DanhSachVaiTro: DanhSachVaiTro.filter(
          (item) => item.key !== 1 && item.key !== 2,
        ),
        DanhSachCanBoGQ: newDanhSachCanBoGQ,
        DanhSachCanBo: DanhSachCanBoGQ,
        DanhSachCoQuan: DanhSachCoQuan,
        CoQuanID,
      });
    } else if (isTruongDoan) {
      newDanhSachCanBoXacMinh.push({
        DanhSachVaiTro: DanhSachVaiTro.filter((item) => item.key !== 1),
        DanhSachCanBoGQ: newDanhSachCanBoGQ,
        DanhSachCanBo: DanhSachCanBoGQ,
        DanhSachCoQuan: DanhSachCoQuan,
        CoQuanID,
      });
    } else if (isPhoPhong) {
      newDanhSachCanBoXacMinh.push({
        DanhSachVaiTro: DanhSachVaiTro.filter((item) => item.key !== 2),
        DanhSachCanBoGQ: newDanhSachCanBoGQ,
        DanhSachCanBo: DanhSachCanBoGQ,
        DanhSachCoQuan: DanhSachCoQuan,
        CoQuanID,
      });
    } else {
      newDanhSachCanBoXacMinh.push({
        DanhSachVaiTro,
        DanhSachCanBoGQ: newDanhSachCanBoGQ,
        DanhSachCanBo: DanhSachCanBoGQ,
        DanhSachCoQuan: DanhSachCoQuan,
        CoQuanID,
      });
    }
    this.setState({DanhSachCanBoXacMinh: newDanhSachCanBoXacMinh});
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
        newDanhSachCanBoXacMinh[index]['CanBoID'] = value;
        const otherCanBo = newDanhSachCanBoXacMinh.filter(
          (item, indexFilter) => index !== indexFilter,
        );
        const ListCoQuanSelected = newDanhSachCanBoXacMinh
          .filter((item) => item.CanBoID)
          .map((item) => ({CanBoID: item.CanBoID}));
        otherCanBo.forEach((itemOther) => {
          const ListOther = ListCoQuanSelected.filter(
            (item) => item.CanBoID !== itemOther.CanBoID,
          );
          const ListIDCoQuan = [];
          ListOther.forEach((item) => ListIDCoQuan.push(item.CanBoID));
          if (itemOther.DanhSachCanBo) {
            itemOther.DanhSachCanBoGQ = itemOther.DanhSachCanBo.filter(
              (item) => {
                return !ListIDCoQuan.includes(item.CanBoID);
              },
            );
          }
        });
      }

      // newDanhSachCanBoXacMinh[index].isNotChange = true;
      this.setState({DanhSachCanBoXacMinh: newDanhSachCanBoXacMinh});
    }
  };

  deleteCanBoXacMinh = (index, item) => {
    const {DanhSachCanBoXacMinh} = this.state;
    const newDanhSachCanBoXacMinh = [...DanhSachCanBoXacMinh];

    // newDanhSachCanBoXacMinh[index][key] = value;
    if (item.VaiTro === 1) {
      const otherList = newDanhSachCanBoXacMinh.filter(
        (item) => item.VaiTro !== 1,
      );
      otherList.forEach((item, index) => {
        const obj =
          newDanhSachCanBoXacMinh[newDanhSachCanBoXacMinh.indexOf(item)];
        const newDanhSachVaiTro = [...obj.DanhSachVaiTro];
        newDanhSachVaiTro.unshift(
          DanhSachVaiTro.find((item) => item.key === 1),
        );
        obj.DanhSachVaiTro = newDanhSachVaiTro;
      });
    } else if (item.VaiTro === 2) {
      const otherList = newDanhSachCanBoXacMinh.filter(
        (item) => item.VaiTro !== 2,
      );
      otherList.forEach((item, index) => {
        const obj =
          newDanhSachCanBoXacMinh[newDanhSachCanBoXacMinh.indexOf(item)];
        const newDanhSachVaiTro = [...obj.DanhSachVaiTro];
        newDanhSachVaiTro.splice(
          1,
          0,
          DanhSachVaiTro.find((item) => item.key === 2),
        );
        obj.DanhSachVaiTro = newDanhSachVaiTro;
      });
    }

    const CanBoID = item?.CanBoID;
    const CoQuanID = item?.CoQuanID;
    const ListCanBoCungCoQuan = newDanhSachCanBoXacMinh.filter(
      (item, indexFilter) => {
        return index !== indexFilter && item.CoQuanID === CoQuanID;
      },
    );

    if (CanBoID) {
      ListCanBoCungCoQuan.forEach((itemCanBo, index) => {
        const newDanhSachCanBo = itemCanBo.DanhSachCanBoGQ;
        newDanhSachCanBo.push({
          ...item.DanhSachCanBo.find((item) => item.CanBoID === CanBoID),
        });
      });
    }

    newDanhSachCanBoXacMinh.splice(index, 1);
    this.setState({DanhSachCanBoXacMinh: newDanhSachCanBoXacMinh});
  };

  render() {
    const {
      dataEdit,
      visible,
      fileKey,
      onCancel,
      DanhSachTruongPhong,
      loading,
      SuDungQuyTrinhGQPhucTap,
    } = this.props;
    const {DanhSachHoSoTaiLieu, DanhSachCanBoXacMinh} = this.state;
    const isViewDetails = this.props.dataEdit?.isViewDetails
      ? this.props.dataEdit.isViewDetails
      : null;
    const type = dataEdit?.type;

    return (
      <Modal
        title={
          !SuDungQuyTrinhGQPhucTap
            ? 'Cập nhật quyết định thành lập tổ/đoàn xác minh'
            : 'Giao xác minh'
        }
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
            <Button
              className="btn-danger"
              onClick={() => onCancel()}
              loading={loading}
            >
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
            {type === 1 ? (
              <>
                <p className="title">
                  Thông tin đoàn/tổ xác minh
                  <span style={{color: 'red', marginLeft: '5px'}}>(*)</span>
                </p>
                <Row gutter={[10, 10]}>
                  <Col span={7} className="center-middle">
                    <p>Tên cơ quan</p>
                  </Col>
                  <Col span={7} className="center-middle">
                    <p>Tên cán bộ</p>
                  </Col>
                  <Col span={7} className="center-middle">
                    <p>Vai trò</p>
                  </Col>
                  <Col span={3}>
                    <div className="btns-end center-middle">
                      <Button
                        type="primary"
                        onClick={this.handleAddCanBoXacMinh}
                      >
                        Thêm
                      </Button>
                    </div>
                  </Col>
                  {DanhSachCanBoXacMinh &&
                    DanhSachCanBoXacMinh.map((item, index) => (
                      <>
                        <Col span={7} className="center-middle ">
                          <Select
                            style={{width: '100%'}}
                            onChange={(value) =>
                              this.changedCanBoXacMinh(index, 'CoQuanID', value)
                            }
                            value={item.CoQuanID}
                          >
                            {item?.DanhSachCoQuan &&
                              item?.DanhSachCoQuan?.map((item) => (
                                <Option value={item.CoQuanID}>
                                  {item.TenCoQuan}
                                </Option>
                              ))}
                          </Select>
                        </Col>
                        <Col span={7} className="center-middle select-canbo">
                          <Select
                            style={{width: '100%'}}
                            onChange={(value) =>
                              this.changedCanBoXacMinh(index, 'CanBoID', value)
                            }
                            value={item?.CanBoID}
                          >
                            {item?.DanhSachCanBoGQ &&
                              item?.DanhSachCanBoGQ?.map((item) => (
                                <Option value={item?.CanBoID}>
                                  {item?.TenCanBo}
                                </Option>
                              ))}
                          </Select>
                        </Col>
                        <Col span={7} className="center-middle select-vaitro">
                          <Select
                            style={{width: '100%'}}
                            onChange={(value) =>
                              this.changedCanBoXacMinh(index, 'VaiTro', value)
                            }
                            value={item.VaiTro}
                          >
                            {item?.DanhSachVaiTro?.map((item) => (
                              <Option value={item.key}>{item.value}</Option>
                            ))}
                          </Select>
                        </Col>
                        <Col span={3}>
                          <div className="btns-end">
                            <Button
                              className="btn-danger"
                              onClick={() =>
                                this.deleteCanBoXacMinh(index, item)
                              }
                            >
                              Xóa
                            </Button>
                          </div>
                        </Col>
                      </>
                    ))}
                </Row>
                <Row gutter={[10, 10]}>
                  <Col lg={8}>
                    <Item
                      label="Hạn giải quyết"
                      name="HanGiaiQuyet"
                      className="ant-form-title__left"
                    >
                      <DatePicker placeholder="" format={'DD/MM/YYYY'} />
                    </Item>
                  </Col>
                  <Col lg={16}>
                    <Item
                      label="Ghi chú"
                      name="GhiChu"
                      className="ant-form-title__left"
                    >
                      <Input />
                    </Item>
                  </Col>
                </Row>
              </>
            ) : type === 2 ? (
              <>
                <Row gutter={[10, 10]}>
                  <Col md={12} span={24}>
                    <Item
                      label="Giao cho"
                      rules={[REQUIRED]}
                      name="TruongPhongID"
                      className="ant-form-title__left"
                    >
                      <Select>
                        {DanhSachTruongPhong &&
                          DanhSachTruongPhong.map((item) => (
                            <Option value={item.CanBoID}>
                              {item.TenCanBo}
                            </Option>
                          ))}
                      </Select>
                    </Item>
                  </Col>
                  <Col md={12} span={24}>
                    <Item
                      label="Ngày hết hạn"
                      name="HanGiaiQuyet"
                      rules={[REQUIRED]}
                      className="ant-form-title__left"
                    >
                      <DatePicker placeholder="" format={'DD/MM/YYYY'} />
                    </Item>
                  </Col>
                </Row>
              </>
            ) : null}
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
