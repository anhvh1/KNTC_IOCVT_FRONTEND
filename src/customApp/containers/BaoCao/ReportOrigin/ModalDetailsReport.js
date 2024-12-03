import React, {useEffect, useState} from 'react';
import Wrapper from './ModalDetailsReport.styled';
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  SaveOutlined,
  UpOutlined,
  DownOutlined,
  RollbackOutlined,
  PrinterOutlined,
} from '@ant-design/icons';
import PDFIcon from '../../../../image/pdf.png';
import RARIcon from '../../../../image/rar-file-format.png';
import DOCIcon from '../../../../image/doc.png';
import XLSIcon from '../../../../image/xls.png';
import Constants from '../../../../settings/constants';
import {Form, Radio, Row, Col, Tooltip} from 'antd';
import {
  Button,
  Modal,
  Input,
  Select,
  Option,
  Textarea,
  Collapse,
  DatePicker,
  ItemForm as Item,
  // Panel
} from '../../../../components/uielements/exportComponent';
import {checkInputNumber} from '../../../../helpers/utility';
import {InputFormatSpecific} from '../../../../components/uielements/exportComponent';
import ModalPrint from './ModalPrint';
// import { ITEM_LAYOUT3, ITEM_LAYOUT_SMALL,
//   ITEM_LAYOUT_FULL, ITEM_LAYOUT2, ITEM_LAYOUT_HALF ,ITEM_LAYOUT_REPORT
// } from "../../../../settings/constants";
import dayjs from 'dayjs';
import {handleTextLong} from '../../../../helpers/utility';

const {useForm} = Form;

const COL_COL_ITEM_LAYOUT_RIGHT = {
  xs: {span: 24},
  lg: {span: 24},
};

const COL_ITEM_LAYOUT_HALF = {
  xs: {span: 24},
  lg: {span: 12},
};

const ITEM_LAYOUT3 = {
  labelAlign: 'left',
  labelCol: {span: 'auto'},
  wrapperCol: {span: 'auto'},
};

const ITEM_LAYOUT_FULL = {
  labelAlign: 'left',
  labelCol: {span: 3},
  wrapperCol: {span: 'auto'},
};

const ITEM_LAYOUT2 = {
  labelAlign: 'left',
  labelCol: {span: 7},
  wrapperCol: {span: 17},
};

const ITEM_LAYOUT_REPORT = {
  labelAlign: 'left',
  labelCol: {span: 'auto'},
  wrapperCol: {span: 'auto'},
};

const COL_ITEM_LAYOUT_HALF_RIGHT = {
  xs: {span: 24},
  lg: {span: 12},
  // push : 1
};

// const COL_ITEM_LAYOUT_HALF = {
//   xs: { span: 24 },
//     lg: { span: 12 },
// }

const {Panel} = Collapse;

export default (props) => {
  const [form] = useForm();
  const [isFormSuccess, setIsFormSuccess] = useState(true);
  const [isViewDetails, setIsViewDetails] = useState(false);
  const [visibleModalPrint, setVisibleModalPrint] = useState(false);
  const [DanhSachHoSoTaiLieu, setDanhSachHoSoTaiLieu] = useState([]);
  const [keyModalPrint, setKeyModalPrint] = useState(0);
  const [keyCollapse, setKeyCollapse] = useState(['1']);
  const {dataEdit, loading, visible, action, DanhSachTenFile} = props;

  const handleEditHoSoTaiLieu = (type, item, index, indexParent) => {
    const newhHoSoTaiLieuChinh = [...DanhSachHoSoTaiLieu];
    newhHoSoTaiLieuChinh[indexParent].ListFileSameType[index]['isEdit'] = true;
    setDanhSachHoSoTaiLieu(newhHoSoTaiLieuChinh);
  };

  const handleSaveHoSoTaiLieu = (type, item, index, indexParent) => {
    const newhHoSoTaiLieuChinh = [...DanhSachHoSoTaiLieu];
    newhHoSoTaiLieuChinh[indexParent].ListFileSameType[index]['isEdit'] = false;
    setDanhSachHoSoTaiLieu(newhHoSoTaiLieuChinh);
  };

  useEffect(() => {}, []);

  useEffect(() => {
    const value = form.getFieldsValue();
    const {DonThu, FileHoSo} = dataEdit;
    if (DonThu && DonThu.DonThuID) {
      let HoTenKN = '';
      let DiaChiKN = '';
      let GioiTinh = '';
      let TenDanToc = '';
      let NoiPhatSinh = '';
      let TenLoaiKhieuTo = '';
      if (DonThu && DonThu.TenLoaiKhieuTo1) {
        TenLoaiKhieuTo += DonThu.TenLoaiKhieuTo1;
      }
      if (DonThu && DonThu.TenLoaiKhieuTo2) {
        TenLoaiKhieuTo += ' > ' + DonThu.TenLoaiKhieuTo2;
      }
      if (DonThu && DonThu.TenLoaiKhieuTo3) {
        TenLoaiKhieuTo += ' > ' + DonThu.TenLoaiKhieuTo3;
      }
      if (dataEdit && dataEdit.DoiTuongKN) {
        dataEdit.DoiTuongKN.forEach(
          (item, i) => (HoTenKN += (i > 0 ? ', ' : '') + item?.HoTen),
        );
        if (dataEdit.DoiTuongKN[0]) {
          DiaChiKN += dataEdit.DoiTuongKN[0]?.DiaChiCT
            ? dataEdit.DoiTuongKN[0]?.DiaChiCT
            : '';
          GioiTinh +=
            dataEdit.DoiTuongKN[0]?.GioiTinh === 1
              ? 'Nam'
              : dataEdit.DoiTuongKN[0]?.GioiTinh === 0
              ? 'Nữ'
              : '';
          TenDanToc += dataEdit.DoiTuongKN[0]?.TenDanToc
            ? dataEdit.DoiTuongKN[0]?.TenDanToc
            : '';
          NoiPhatSinh += dataEdit.DoiTuongKN[0]?.TenTinh
            ? dataEdit.DoiTuongKN[0]?.TenTinh
            : '';
        }
      }

      form &&
        form.setFieldsValue({
          ...DonThu,
          HanXuLy: dayjs(DonThu.HanXuLy),
          HanGiaiQuyetCu: DonThu?.HanGiaiQuyetCu
            ? dayjs(DonThu.HanGiaiQuyetCu)
            : null,
          HanGiaiQuyetMoi: DonThu?.HanGiaiQuyetMoi
            ? dayjs(DonThu.HanGiaiQuyetMoi)
            : null,
          NgayGiao: DonThu?.NgayGiao ? dayjs(DonThu.NgayGiao) : null,
          NgayXuLy: DonThu?.NgayXuLy ? dayjs(DonThu.NgayXuLy) : null,
          NgayTiepNhan: DonThu?.NgayTiepNhan
            ? dayjs(DonThu.NgayTiepNhan)
            : null,
          NgayPhan: DonThu?.NgayPhan ? dayjs(DonThu.NgayPhan) : null,
          HoVaTenKN: HoTenKN,
          DiaChiKN,
          GioiTinh,
          DanToc: TenDanToc,
          NoiPhatSinh,
          LoaiKhieuTo: TenLoaiKhieuTo,
          // HanXuLy : dayjs(DonThu.HanXuLy),
        });
    }
    if (FileHoSo && FileHoSo.length) {
      // const newhHoSoTaiLieuChinh = FileHoSo.filter(item => item.NhomFileID === 1)
      // const newHoSoTaiLieuLienQuan = FileHoSo.filter(item => item.NhomFileID === 0)
      const DanhSachHoSoTaiLieu = [];
      const arrType = [];
      FileHoSo.forEach((item) => {
        if (!arrType.includes(item.NhomFileID)) {
          arrType.push(item.NhomFileID);
        }
      });
      arrType.forEach((item) => {
        const ListFileSameType = FileHoSo.filter(
          (itemFilter) => itemFilter.NhomFileID === item,
        );
        if (ListFileSameType) {
          DanhSachHoSoTaiLieu.push({
            NhomFileID: item,
            ListFileSameType,
            TenNhomFile:
              ListFileSameType[0] && ListFileSameType[0].TenNhomFile
                ? ListFileSameType[0].TenNhomFile
                : '',
          });
        }
      });
      setDanhSachHoSoTaiLieu(DanhSachHoSoTaiLieu);
    }
  }, []);

  const handleCheckImage = (TenFile) => {
    const indexDot = TenFile.toString().lastIndexOf('.');
    const typeFile = TenFile.toString()
      .slice(indexDot + 1)
      .toLowerCase();

    switch (typeFile) {
      case 'pdf':
        return PDFIcon;
      case 'rar':
        return RARIcon;
      case 'doc':
      case 'docx':
        return DOCIcon;
      case 'xls':
      case 'xlsx':
        return XLSIcon;
      default:
        break;
    }
    return '';
  };

  const handleOpenModalPrint = () => {
    setVisibleModalPrint(true);
    setKeyModalPrint((prevKey) => prevKey + 1);
  };

  const handleCloseModalPrint = () => {
    setVisibleModalPrint(false);
  };

  const handleGetHeaderByNhomFileID = (type) => {
    switch (type) {
      case 1:
        return 'Hồ sơ tài liệu chính';
      case 2:
        return 'Hồ sơ tài liệu chính';
      case 3:
        return 'Hồ sơ tài liệu chính';
      case 4:
        return 'Hồ sơ tài liệu chính';
      default:
        return 'Hồ sơ tài liệu chính';
    }
  };

  const handleChangedKeyCollapse = (key) => {
    setKeyCollapse(key);
  };

  return (
    <Modal
      title={`Chi tiết thông tin đơn thư`}
      className="modal-footer__grey"
      width={'100%'}
      visible={visible}
      padding={0}
      onCancel={props.onCancel}
      footer={[
        <Button key="back" onClick={handleOpenModalPrint} type="primary">
          <PrinterOutlined />
          In phiếu
        </Button>,
        <Button key="back" onClick={props.onCancel} type="primary">
          <EditOutlined />
          Sửa
        </Button>,
        <Button key="back" onClick={props.onCancel} type="danger">
          <DeleteOutlined />
          Xóa
        </Button>,
        <Button key="back" onClick={props.onCancel} type="second">
          <RollbackOutlined /> Hủy
        </Button>,
      ]}
    >
      <Form form={form}>
        <Wrapper>
          <Collapse
            ghost
            expandIconPosition={'end'}
            activeKey={keyCollapse}
            onChange={handleChangedKeyCollapse}
            className="modal-collapse"
            expandIcon={({isActive}) =>
              isActive ? <UpOutlined /> : <DownOutlined />
            }
            // textColor = 'red'
            // iconColor = 'red'
          >
            <Panel header="Thông tin đơn thư" key="1" className="red-panel">
              <Row gutter={15}>
                <Col xxl={6} md={12} xs={24}>
                  <Item
                    label="Số đơn thư:"
                    name={'SoDonThu:'}
                    {...ITEM_LAYOUT_REPORT}
                    type="primary equal"
                  >
                    <Input />
                  </Item>
                </Col>
                <Col xxl={5} md={12} xs={24}>
                  <Item
                    type="primary"
                    label="Ngày tiếp nhận:"
                    name={'NgayTiepNhan'}
                    {...ITEM_LAYOUT_REPORT}
                  >
                    <DatePicker format="DD/MM/YYYY" />
                  </Item>
                </Col>
                <Col xxl={5} md={12} xs={24}>
                  <Item
                    type="primary"
                    label="Họ và tên:"
                    name={'HoVaTenKN'}
                    {...ITEM_LAYOUT_REPORT}
                  >
                    <Input />
                  </Item>
                </Col>
                <Col xxl={8} md={12} xs={24}>
                  <Item
                    type="primary"
                    label="Địa chỉ:"
                    name={'DiaChiKN'}
                    {...ITEM_LAYOUT_REPORT}
                  >
                    <Input />
                  </Item>
                </Col>
              </Row>
              <Row gutter={25}>
                <Col span={24}>
                  <Item
                    type="primary equal"
                    label="Loại khiếu tố:"
                    name={'LoaiKhieuTo'}
                    {...ITEM_LAYOUT_FULL}
                  >
                    <Input />
                  </Item>
                </Col>
                <Col span={24}>
                  <Item
                    type="primary equal textarea"
                    label="Nội dung đơn:"
                    name={'NoiDungDon'}
                    {...ITEM_LAYOUT_FULL}
                  >
                    <Textarea style={{minHeight: 100}} />
                  </Item>
                </Col>
              </Row>
              <Row gutter={10}>
                <Col {...COL_ITEM_LAYOUT_HALF}>
                  <Item
                    type="primary equal"
                    label="Hạn xử lý:"
                    name={'HanXuLy'}
                    {...ITEM_LAYOUT2}
                  >
                    <DatePicker style={{width: '100%'}} format="DD/MM/YYYY" />
                  </Item>
                </Col>
                <Col {...COL_ITEM_LAYOUT_HALF_RIGHT}>
                  <Row>
                    <Col {...COL_COL_ITEM_LAYOUT_RIGHT}>
                      <Item
                        type="primary"
                        label="Trạng thái xử lý:"
                        name={'TrangThaiXuLy'}
                        {...ITEM_LAYOUT2}
                      >
                        <Input />
                      </Item>
                    </Col>
                  </Row>
                </Col>
              </Row>
              <Row gutter={10}>
                <Col {...COL_ITEM_LAYOUT_HALF}>
                  <Item
                    type="primary equal"
                    label="Hạn giải quyết:"
                    name={'HanGiaiQuyetCu'}
                    {...ITEM_LAYOUT2}
                  >
                    <DatePicker style={{width: '100%'}} format="DD/MM/YYYY" />
                  </Item>
                </Col>
                <Col {...COL_ITEM_LAYOUT_HALF_RIGHT}>
                  <Row>
                    <Col {...COL_COL_ITEM_LAYOUT_RIGHT}>
                      <Item
                        type="primary"
                        label="Trạng thái giải quyết:"
                        name={'TrangThaiGiaiQuyet'}
                        {...ITEM_LAYOUT2}
                      >
                        <Input />
                      </Item>
                    </Col>
                  </Row>
                </Col>
              </Row>
              {isViewDetails ? (
                <div className="wrapper">
                  <p className="wrapper-title">1. Thông tin chung: </p>
                  <Row gutter={8}>
                    <Col xxl={6} md={12} xs={24}>
                      <Item
                        type="primary equal"
                        label="Nguồn đơn đến:"
                        name={'NguonDonDen'}
                        {...ITEM_LAYOUT_REPORT}
                      >
                        <Input />
                      </Item>
                    </Col>
                    <Col xxl={6} md={12} xs={24}>
                      <Item
                        type="primary equal"
                        label="Cán bộ tiếp nhận:"
                        name={'CanBoTiepNhan'}
                        {...ITEM_LAYOUT_REPORT}
                      >
                        <Input />
                      </Item>
                    </Col>
                    <Col xxl={6} md={12} xs={24}>
                      <Item
                        type="primary equal"
                        label="Số đơn:"
                        name={'SoDonThu'}
                        {...ITEM_LAYOUT_REPORT}
                      >
                        <Input />
                      </Item>
                    </Col>
                    <Col xxl={6} md={12} xs={24}>
                      <Item
                        type="primary equal"
                        label="Ngày tiếp nhận:"
                        name={'NgayTiepNhan'}
                        {...ITEM_LAYOUT_REPORT}
                      >
                        <DatePicker format="DD/MM/YYYY" />
                      </Item>
                    </Col>
                    <Col span={24}>
                      <Item
                        type="primary"
                        label="Đối tượng khiếu tố:"
                        name={'DoiTuongKhieuTo'}
                        {...ITEM_LAYOUT_FULL}
                      >
                        <Input />
                      </Item>
                    </Col>
                    <Col xxl={6} md={12} xs={24}>
                      <Item
                        type="primary"
                        label="Họ và tên:"
                        name={'HoVaTenKN'}
                        {...ITEM_LAYOUT_REPORT}
                      >
                        <Input />
                      </Item>
                    </Col>
                    <Col xxl={3} md={12} xs={24}>
                      <Item
                        type="primary"
                        label="Giới tính:"
                        name={'GioiTinh'}
                        {...ITEM_LAYOUT_REPORT}
                      >
                        <Input />
                      </Item>
                    </Col>
                    <Col xxl={3} md={12} xs={24}>
                      <Item
                        type="primary"
                        label="Dân tộc:"
                        name={'DanToc'}
                        {...ITEM_LAYOUT_REPORT}
                      >
                        <Input />
                      </Item>
                    </Col>
                    <Col xxl={12} md={12} xs={24}>
                      <Item
                        type="primary equal2"
                        label="Địa chỉ:"
                        name={'DiaChiKN'}
                        {...ITEM_LAYOUT_REPORT}
                      >
                        <Input />
                      </Item>
                    </Col>
                  </Row>
                  <Row gutter={10}>
                    <Col {...COL_ITEM_LAYOUT_HALF}>
                      <Item
                        type="primary"
                        label="Loại khiếu tố:"
                        name={'LoaiKhieuTo'}
                        {...ITEM_LAYOUT_REPORT}
                      >
                        <Input />
                      </Item>
                    </Col>
                    <Col {...COL_ITEM_LAYOUT_HALF_RIGHT}>
                      <Row>
                        <Col {...COL_COL_ITEM_LAYOUT_RIGHT}>
                          <Item
                            type="primary equal2"
                            label="Nơi phát sinh:"
                            name={'NoiPhatSinh'}
                            {...ITEM_LAYOUT_REPORT}
                          >
                            <Input />
                          </Item>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  <Row>
                    <Col span={24}>
                      <Item
                        type="primary textarea"
                        label="Nội dung đơn:"
                        name={'NoiDungDon'}
                        {...ITEM_LAYOUT_FULL}
                      >
                        <Input />
                      </Item>
                    </Col>
                  </Row>

                  <p className="wrapper-title">2. Thông tin xử lý: </p>
                  <Row gutter={20}>
                    <Col xxl={8} md={12} xs={24}>
                      <Item
                        type="primary equal"
                        label="Ngày phân công:"
                        name={'NgayPhan'}
                        {...ITEM_LAYOUT3}
                      >
                        <DatePicker format="DD/MM/YYYY" />
                      </Item>
                    </Col>
                    <Col xxl={8} md={12} xs={24}>
                      <Item
                        type="primary equal"
                        label="Hạn xử lý:"
                        name={'HanXuLy'}
                        {...ITEM_LAYOUT3}
                      >
                        <DatePicker format="DD/MM/YYYY" />
                      </Item>
                    </Col>
                    <Col xxl={8} md={12} xs={24}>
                      <Item
                        type="primary equal"
                        label="Cơ quan xử lý:"
                        name={'TenCoQuanXL'}
                        {...ITEM_LAYOUT3}
                      >
                        <Input />
                      </Item>
                    </Col>
                    <Col xxl={8} md={12} xs={24}>
                      <Item
                        type="primary equal"
                        label="Cán bộ xử lý:"
                        name={'TenCanBoXuLy'}
                        {...ITEM_LAYOUT3}
                      >
                        <Input />
                      </Item>
                    </Col>
                    <Col xxl={8} md={12} xs={24}>
                      <Item
                        type="primary equal"
                        label="Ngày xử lý:"
                        name={'NgayXuLy'}
                        {...ITEM_LAYOUT3}
                      >
                        <DatePicker format="DD/MM/YYYY" />
                      </Item>
                    </Col>
                    <Col xxl={8} md={12} xs={24}>
                      <Item
                        type="primary equal"
                        label="Hướng xử lý:"
                        name={'HuongXuLy'}
                        {...ITEM_LAYOUT3}
                      >
                        <Input />
                      </Item>
                    </Col>
                  </Row>
                  <p className="wrapper-title">3. Thông tin giải quyết: </p>
                  <Row gutter={20}>
                    <Col xxl={8} md={12} xs={24}>
                      <Item
                        type="primary equal"
                        label="Cơ quan giao:"
                        name={'CoQuanGiao'}
                        {...ITEM_LAYOUT3}
                      >
                        <Input />
                      </Item>
                    </Col>
                    <Col xxl={8} md={12} xs={24}>
                      <Item
                        type="primary equal"
                        label="Ngày giao:"
                        name={'NgayGiao'}
                        {...ITEM_LAYOUT3}
                      >
                        <DatePicker format="DD/MM/YYYY" />
                      </Item>
                    </Col>
                    <Col xxl={8} md={12} xs={24}>
                      <Item
                        type="primary equal"
                        label="Cơ quan trị trách:"
                        name={'CoQuanTriTrach'}
                        {...ITEM_LAYOUT3}
                      >
                        <Input />
                      </Item>
                    </Col>
                    <Col xxl={8} md={12} xs={24}>
                      <Item
                        type="primary equal"
                        label="Cơ quan phối hợp:"
                        name={'CoQuanPhoiHop'}
                        {...ITEM_LAYOUT3}
                      >
                        <Input />
                      </Item>
                    </Col>
                    <Col xxl={8} md={12} xs={24}>
                      <Item
                        type="primary equal"
                        label="Hạn giải quyết:"
                        name={'HanGiaiQuyetMoi'}
                        {...ITEM_LAYOUT3}
                      >
                        <DatePicker format="DD/MM/YYYY" />
                      </Item>
                    </Col>
                    <Col xxl={8} md={12} xs={24}>
                      <Item
                        type="primary equal"
                        label="Trạng thái:"
                        name={'TrangThai'}
                        {...ITEM_LAYOUT3}
                      >
                        <Input />
                      </Item>
                    </Col>
                  </Row>
                  <p
                    className="wrapper-title"
                    style={{fontStyle: 'oblique', fontWeight: 400}}
                  >
                    Thông tin tổ xác minh:{' '}
                  </p>
                  <Row gutter={20}>
                    <Col xxl={8} md={12} xs={24}>
                      <Item
                        type="primary equal"
                        label="Cán bộ phụ trách:"
                        name={'CanBoPhuTrach'}
                        {...ITEM_LAYOUT3}
                      >
                        <Input />
                      </Item>
                    </Col>
                    <Col xxl={8} md={12} xs={24}>
                      <Item
                        type="primary equal"
                        label="Cán bộ phối hợp:"
                        name={'CanBoPhoiHop'}
                        {...ITEM_LAYOUT3}
                      >
                        <Input />
                      </Item>
                    </Col>
                    <Col xxl={8} md={24} xs={24}>
                      <Item
                        type="primary equal"
                        label="Cán bộ theo dõi:"
                        name={'CanBoTheoDoi'}
                        {...ITEM_LAYOUT3}
                      >
                        <Input />
                      </Item>
                    </Col>
                  </Row>
                </div>
              ) : null}
              <p
                className="toggle-details"
                onClick={() => setIsViewDetails(!isViewDetails)}
              >
                {!isViewDetails ? 'Xem chi tiết' : 'Ẩn chi tiết'}
                {!isViewDetails ? (
                  <DownOutlined className="down-icon" />
                ) : (
                  <UpOutlined className="up-icon" />
                )}
              </p>
            </Panel>
            <Panel
              header="Thông tin đơn thư"
              key="2"
              className="red-panel panel-wrapper__file"
            >
              <Collapse ghost expandIconPosition={'end'}>
                {DanhSachHoSoTaiLieu &&
                  DanhSachHoSoTaiLieu.map((itemParent, indexParent) => (
                    <Panel
                      className={`${
                        indexParent % 2 === 0 ? 'panel-even' : 'panel-odd'
                      } black-panel panel-file__items`}
                      header={`${itemParent?.TenNhomFile}`}
                      key={indexParent + `${itemParent?.TenNhomFile}` + 10000}
                    >
                      <div className="file-wrapper">
                        {itemParent &&
                          itemParent.ListFileSameType?.map((item, index) => (
                            <div className="file-items">
                              <div className="file-items__image">
                                <img src={handleCheckImage(item?.FileURL)} />
                              </div>
                              <div className="file-items__info">
                                <div className="file-items__type">
                                  <Select
                                    disabled={!item?.isEdit}
                                    defaultValue={
                                      item?.FileID ? item?.FileID : null
                                    }
                                    allowClear
                                  >
                                    {DanhSachTenFile
                                      ? DanhSachTenFile.map((item) => (
                                          <Option key={item?.FileID}>
                                            {item.TenFile}
                                          </Option>
                                        ))
                                      : null}
                                  </Select>
                                  {item?.isEdit ? (
                                    <SaveOutlined
                                      onClick={() =>
                                        handleSaveHoSoTaiLieu(
                                          1,
                                          item,
                                          index,
                                          indexParent,
                                        )
                                      }
                                    />
                                  ) : (
                                    <EditOutlined
                                      onClick={() =>
                                        handleEditHoSoTaiLieu(
                                          2,
                                          item,
                                          index,
                                          indexParent,
                                        )
                                      }
                                    />
                                  )}
                                </div>
                                <div className="file-items__desc">
                                  <p className="user_add">{item?.CANBOTHEM}</p>
                                  <p className="day_add">
                                    {item?.NgayUp
                                      ? dayjs(item?.NgayUp).format('DD/MM/YYYY')
                                      : ''}
                                  </p>
                                  {item?.NDFILE && item?.NDFILE.length > 20 ? (
                                    <Tooltip title={item?.NDFILE}>
                                      <p className="note_add">
                                        {handleTextLong(item?.NDFILE)}
                                      </p>
                                    </Tooltip>
                                  ) : (
                                    <p className="note_add">{item?.NDFILE}</p>
                                  )}
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </Panel>
                  ))}
                {/* <Panel header="Hồ sơ, tài liệu chính" key="3">
                  <div className = "file-wrapper">
                    {HoSoTaiLieuChinh.map((item,index) => (
                      <div className="file-items">
                        <div className="file-items__image">
                          <img src = {handleCheckImage(item?.NhomFileID)}/>
                        </div>
                        <div className="file-items__info">
                          <div className="file-items__type">
                            <Select disabled = {!item?.isEdit}>
                              
                            </Select>  
                            {item?.isEdit ? <SaveOutlined onClick={() => handleSaveHoSoTaiLieu(1,item,index)}/> : <EditOutlined onClick={() => handleEditHoSoTaiLieu(2,item,index)}/>}
                          </div> 
                          <div className="file-items__desc">
                            <p>{item?.CANBOTHEM}</p>
                            <p>{item?.NgayUp ? dayjs(item?.NgayUp).format('DD/MM/YYYY') : ''}</p>
                            <p>{item?.NDFILE}</p>
                          </div> 
                        </div>
                      </div>
                    ))}
                  </div>
                </Panel>
                <Panel header="Hồ sơ, tài liệu liên quan" key="4">
                  <div className = "file-wrapper">
                      {HoSoTaiLienQuan.map((item,index) => (
                        <div className="file-items">
                          <div className="file-items__image">

                          </div>
                          <div className="file-items__info">
                            <div className="file-items__type">
                              <Select disabled = {!item?.isEdit}>
                                
                              </Select>  
                              {item?.isEdit ? <SaveOutlined  onClick={() => handleSaveHoSoTaiLieu(2,item,index)}/> : <EditOutlined onClick={() => handleEditHoSoTaiLieu(2,item,index)}/>}
                            </div> 
                            <div className="file-items__desc">
                              <p>{item?.ThongTin}</p>
                            </div> 
                          </div>
                        </div>
                      ))}
                    </div>
                </Panel> */}
              </Collapse>
            </Panel>
            <Panel className="red-panel" header="Tiến trình xử lý" key="5">
              <div className="wrapper-progress">
                {dataEdit && dataEdit.TienTrinhXuLy
                  ? dataEdit.TienTrinhXuLy.map((item, index) => (
                      <div
                        className={`${
                          index % 2 === 0 ? 'pogress-even' : 'progress-old'
                        } progress-item`}
                      >
                        <div className="progress-circle">{index + 1}</div>
                        <div className="progress-title">
                          {item?.BuocThucHien}
                        </div>
                        {index === 0 ? (
                          <div className="wrapper-top__title">
                            <div
                              className="progress-title"
                              style={{visibility: 'hidden'}}
                            >
                              .
                            </div>
                            <div className="progress-time">
                              <p>Thời gian thực hiện</p>
                            </div>
                            <div className="progress-user__update">
                              <p>Người cập nhật</p>
                            </div>
                            <div className="progress-action">
                              <p>Thao tác</p>
                            </div>
                            <div className="progress-opinion">
                              <p>Ý kiến của cán bộ thực hiện</p>
                            </div>
                          </div>
                        ) : null}
                        <div className="wrapper-progress__main">
                          <div className="progress-time">
                            <p>Thời gian thực hiện</p>
                            <p className="time">
                              {dayjs(item?.ThoiGianThucHien).format(
                                'DD/MM/YYYY',
                              )}
                            </p>
                          </div>
                          <div className="progress-user__update">
                            <p>Người cập nhật</p>
                            <p className="user__update">
                              {item?.CanBoThucHien}
                            </p>
                          </div>
                          <div className="progress-action">
                            <p>Thao tác</p>
                            <p className="action">{item?.ThaoTac}</p>
                          </div>
                          <div className="progress-opinion">
                            <p>Ý kiến của cán bộ thực hiện</p>
                            <p className="opinion">
                              {item?.YKienCanBoThucHien}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))
                  : null}
              </div>
            </Panel>
          </Collapse>
        </Wrapper>
      </Form>
      <ModalPrint
        visible={visibleModalPrint}
        key={keyModalPrint}
        onCancel={handleCloseModalPrint}
      />
    </Modal>
  );
};
