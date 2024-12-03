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
  InputNumber,
  Spin,
} from 'antd';
import Button from '../../../../../components/uielements/button';
import Select, {Option} from '../../../../../components/uielements/select';
import Wrapper from './ModalStyle/modalKiemTraTrung.styled';
import BoxTable from '../../../../../components/utility/boxTable';
import {handleTextLong} from '../../../../../helpers/utility';
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
} from '../../../../../settings/constants';
import {
  Modal,
  Textarea,
} from '../../../../../components/uielements/exportComponent';
import moment from 'moment';
import {
  _debounce,
  getValueConfigLocalByKey,
} from '../../../../../helpers/utility';
import {
  DeleteOutlined,
  EditOutlined,
  FileOutlined,
  FundViewOutlined,
  PlusOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import dayjs from 'dayjs';
import api from '../config';
import ModalChiTietDonThu from './ModalChiTietDonThu';
const {Item} = Form;
const ModalKiemTraTrung = (props) => {
  const form = useRef();
  const [DanhSachDonTrung, setDanhSachDonTrung] = useState([]);
  const [Loading, setLoading] = useState(false);
  const [DanhSachDonThu, setDanhSachDonThu] = useState([]);
  const [viewCT, setViewCT] = useState(false);
  const {dataEdit, visible, onCancel} = props;
  const [visibleModalChiTietDonThu, setVisibleModalChiTietDonThu] =
    useState(false);
  const [keyModalChiTietDonThu, setKeyModalChiTietDonThu] = useState(0);
  const [dataModalChiTietDonThu, setDataModalChiTietDonThu] = useState({});

  useEffect(() => {
    const {DanhSachDonThu} = dataEdit;
    if (DanhSachDonThu) {
      setDanhSachDonThu(DanhSachDonThu);
    }
    if (form && form.current) {
      form.current.setFieldsValue({...dataEdit});
    }
  }, []);

  const handleViewDetailsSoLan = (DonThuID, type) => {
    if (type === 1) {
      api
        .CTDonTrung({DonThuID})
        .then((res) => {
          if (res.data.Status > 0) {
            setDanhSachDonTrung(res.data.Data);
            setViewCT(true);
          } else {
            message.destroy();
            message.warning(res.data.Message);
          }
        })
        .catch((err) => {
          message.destroy();
          message.warning(err.toString());
        });
    } else if (type === 2) {
      api
        .CTDonKhieuToLan2({DonThuID})
        .then((res) => {
          if (res.data.Status > 0) {
            setDanhSachDonTrung(res.data.Data);
            setViewCT(true);
          } else {
            message.destroy();
            message.warning(res.data.Message);
          }
        })
        .catch((err) => {
          message.destroy();
          message.warning(err.toString());
        });
    }
  };

  const closeModalChiTietDonThu = () => {
    setDataModalChiTietDonThu({});
    setVisibleModalChiTietDonThu(false);
  };

  const showModalChiTietDonThu = (DonThuID, XuLyDonID) => {
    if (XuLyDonID && DonThuID) {
      api.ChiTietDonThu2({XuLyDonID, DonThuID}).then((res) => {
        if (res.data.Status > 0) {
          setDataModalChiTietDonThu(res.data.Data);
          setVisibleModalChiTietDonThu(true);
          setKeyModalChiTietDonThu((prevKey) => prevKey + 1);
        }
      });
    }
  };

  const handleKiemTraTrung = () => {
    setLoading(true);
    const value = form.current.getFieldsValue();
    const type = dataEdit?.type;
    if (type === 1) {
      api
        .KiemTraTrung(value)
        .then((res) => {
          setLoading(false);
          if (res.data.Status > 0) {
            setDanhSachDonThu(res.data.Data);
          } else {
            message.destroy();
            message.warning(res.data.Message);
          }
        })
        .catch((err) => {
          setLoading(false);
          message.destroy();
          message.warning(err.toString());
        });
    } else if (type === 2) {
      api
        .KhieuToTan2(value)
        .then((res) => {
          setLoading(false);
          if (res.data.Status > 0) {
            setDanhSachDonThu(res.data.Data);
          } else {
            message.destroy();
            message.warning(res.data.Message);
          }
        })
        .catch((err) => {
          setLoading(false);
          message.destroy();
          message.warning(err.toString());
        });
    }
  };

  const columns = [
    {
      title: '.',
      width: '10%',
      align: 'center',
      render: (text, record, index) => (
        <span>
          {
            <Button
              style={{width: '100%'}}
              type="primary"
              onClick={() => props.onCreate(record.DonThuID, record.XuLyDonID)}
            >
              Trùng đơn
            </Button>
          }
        </span>
      ),
    },
    {
      title: 'STT',
      width: '5%',
      align: 'center',
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: 'Lần trùng',
      dataIndex: 'SoLan',
      align: 'center',
      width: '5%',
      render: (text, record, index) => (
        <a onClick={() => handleViewDetailsSoLan(record.DonThuID, 1)}>
          {record.SoLan}
        </a>
      ),
    },
    {
      title: 'Cơ quan tiếp nhận',
      dataIndex: 'TenCoQuan',
      align: 'left',
      width: '15%',
      render: (text, record, index) => <p>{record.TenCoQuan}</p>,
    },
    {
      title: 'Họ tên',
      dataIndex: 'HoTen',
      align: 'left',
      width: '10%',
      render: (text, record, index) => <p>{record?.HoTen}</p>,
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'DiaChiCT',
      align: 'left',
      width: '20%',
      render: (text, record, index) => <div>{record?.DiaChiCT}</div>,
    },
    {
      title: 'Nội dung đơn',
      dataIndex: 'NoiDungDon',
      align: 'left',
      width: '30%',
      render: (text, record, index) => (
        <Tooltip title={record?.NoiDungDon}>
          {handleTextLong(record?.NoiDungDon, 150)}
        </Tooltip>
      ),
    },
    {
      title: 'Loại đơn',
      dataIndex: 'TenLoaiKhieuTo',
      align: 'left',
      width: '10%',
    },
    {
      title: 'Thao tác',
      align: 'center',
      width: '10%',
      render: (text, record, index) => (
        <Tooltip title={'Xem chi tiết'}>
          <FundViewOutlined
            style={{fontSize: 20}}
            onClick={() =>
              showModalChiTietDonThu(record.DonThuID, record.XuLyDonID)
            }
          />
        </Tooltip>
      ),
    },
  ];

  const columnsKhieuNai = [
    {
      title: '',
      width: '10%',
      align: 'center',
      render: (text, record, index) => (
        <span>
          {
            <Button
              type="primary"
              onClick={() => props.onCreate(record.DonThuID, record.XuLyDonID)}
            >
              Khiếu tố lần 2
            </Button>
          }
        </span>
      ),
    },
    {
      title: 'Số lần GQ',
      width: '5%',
      align: 'center',
      render: (text, record, index) => (
        <a onClick={() => handleViewDetailsSoLan(record.DonThuID, 2)}>
          {record.LanGQ}
        </a>
      ),
    },
    {
      title: 'Họ tên',
      dataIndex: 'HoTen',
      align: 'left',
      width: '10%',
      render: (text, record, index) => <p>{record?.HoTen}</p>,
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'DiaChiCT',
      align: 'left',
      width: '20%',
      render: (text, record, index) => <div>{record?.DiaChiCT}</div>,
    },
    {
      title: 'Nội dung đơn',
      dataIndex: 'NoiDungDon',
      align: 'left',
      width: '30%',
      render: (text, record, index) => (
        <Tooltip title={record?.NoiDungDon}>
          {handleTextLong(record?.NoiDungDon, 150)}
        </Tooltip>
      ),
    },
    {
      title: 'Loại đơn',
      dataIndex: 'TenLoaiKhieuTo',
      align: 'left',
      width: '10%',
    },
  ];

  const columnsDetails = [
    {
      title: 'STT',
      width: '10%',
      align: 'center',
      render: (text, record, index) => <span>{index + 1}</span>,
    },
    {
      title: 'Ngày nhập',
      width: '5%',
      align: 'center',
      render: (text, record, index) => (
        <span>
          {record.NgayNhapDon
            ? dayjs(record.NgayNhapDon).format('DD/MM/YYYY')
            : null}
        </span>
      ),
    },
    {
      title: 'Họ tên',
      dataIndex: 'HoTen',
      align: 'left',
      width: '10%',
      render: (text, record, index) => <p>{record?.HoTen}</p>,
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'DiaChiCT',
      align: 'left',
      width: '20%',
      render: (text, record, index) => <div>{record?.DiaChiCT}</div>,
    },
    {
      title: 'Nội dung đơn',
      dataIndex: 'NoiDungDon',
      align: 'left',
      width: '30%',
      render: (text, record, index) => (
        <Tooltip title={record?.NoiDungDon}>
          {handleTextLong(record?.NoiDungDon, 150)}
        </Tooltip>
      ),
    },
    {
      title: 'Loại đơn',
      dataIndex: 'TenLoaiKhieuTo',
      align: 'left',
      width: '10%',
    },
    {
      title: 'Cơ quan tiếp nhận',
      dataIndex: 'TenCoQuan',
      align: 'left',
      width: '10%',
    },
    {
      title: 'Hướng xử lý',
      dataIndex: 'TenHuongGiaiQuyet',
      align: 'left',
      width: '10%',
    },
  ];

  const columnsDetailsKhieuNai = [
    {
      title: 'Số đơn',
      width: '10%',
      align: 'center',
      render: (text, record, index) => <span>{record.SoDonThu}</span>,
    },
    {
      title: 'Họ tên',
      dataIndex: 'HoTen',
      align: 'left',
      width: '10%',
      render: (text, record, index) => <p>{record?.HoTen}</p>,
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'DiaChiCT',
      align: 'left',
      width: '15%',
      render: (text, record, index) => <div>{record?.DiaChiCT}</div>,
    },
    {
      title: 'Nội dung đơn',
      dataIndex: 'NoiDungDon',
      align: 'left',
      width: '25%',
      render: (text, record, index) => (
        <Tooltip title={record?.NoiDungDon}>
          {handleTextLong(record?.NoiDungDon, 150)}
        </Tooltip>
      ),
    },
    {
      title: 'Loại đơn',
      dataIndex: 'TenLoaiKhieuTo',
      align: 'left',
      width: '10%',
    },
    {
      title: 'Cơ quan tiếp nhận',
      dataIndex: 'TenCoQuan',
      align: 'left',
      width: '10%',
    },
    {
      title: 'Hướng xử lý',
      dataIndex: 'TenHuongGiaiQuyet',
      align: 'left',
      width: '10%',
    },
    {
      title: 'Cơ quan đã GQ',
      dataIndex: 'TenCoQuanDaGQ',
      align: 'left',
      width: '10%',
    },
  ];

  return (
    <Modal
      title={dataEdit.type === 1 ? 'Kiểm tra trùng đơn' : 'Khiếu tố lần 2'}
      visible={visible}
      className="center-modal__footer"
      footer={[
        <>
          {!viewCT ? (
            <Button className="btn-danger" onClick={() => onCancel()}>
              Đóng
            </Button>
          ) : (
            <Button className="btn-danger" onClick={() => setViewCT(false)}>
              Quay lại
            </Button>
          )}
        </>,
      ]}
      width={1400}
      onCancel={() => onCancel()}
    >
      <Wrapper>
        <Form ref={form}>
          <Row gutter={[30, 15]}>
            <Col md={12} span={24}>
              <Item label="Họ Tên" name="hoTen" {...ITEM_LAYOUT}>
                <Input />
              </Item>
            </Col>
            <Col md={12} span={24}>
              <Item label="Nội dung đơn" name="noiDung" {...ITEM_LAYOUT}>
                <Input />
              </Item>
            </Col>
            <Col md={12} span={24}>
              <Item label="CCCD/CMTND" name="cmnd" {...ITEM_LAYOUT}>
                <Input />
              </Item>
            </Col>
            <Col md={12} span={24}>
              <Item label="Địa chỉ" name="diaChi" {...ITEM_LAYOUT}>
                <Input />
              </Item>
            </Col>
            <Col md={12} span={24}>
              <Item label="Loại khiếu tố" name="LoaiKhieuTo" {...ITEM_LAYOUT}>
                <Input />
              </Item>
            </Col>
            <Col md={12} span={24}>
              <Button onClick={handleKiemTraTrung}>Kiểm tra trùng</Button>
            </Col>
          </Row>
          <p style={{fontWeight: 500}}>
            Tổng số đơn tìm thấy :{' '}
            <span style={{color: 'red'}}>{DanhSachDonThu?.length}</span> đơn thư
          </p>
          {!viewCT ? (
            <BoxTable
              columns={
                dataEdit.type === 1
                  ? columns
                  : dataEdit.type === 2
                  ? columnsKhieuNai
                  : null
              }
              dataSource={DanhSachDonThu}
              loading={Loading}
              pagination={false}
            />
          ) : (
            <BoxTable
              columns={
                dataEdit.type === 1
                  ? columnsDetails
                  : dataEdit.type === 2
                  ? columnsDetailsKhieuNai
                  : null
              }
              dataSource={DanhSachDonTrung}
              loading={Loading}
              pagination={false}
            />
          )}
        </Form>
      </Wrapper>
      <ModalChiTietDonThu
        visible={visibleModalChiTietDonThu}
        key={keyModalChiTietDonThu}
        dataEdit={dataModalChiTietDonThu}
        onCancel={closeModalChiTietDonThu}
      />
    </Modal>
  );
};

export default ModalKiemTraTrung;
