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
  Tabs,
  Radio,
  DatePicker,
  Modal as ModalAnt,
  TimePicker,
  Tooltip,
} from 'antd';
import Button from '../../../../components/uielements/button';
import Select, {Option} from '../../../../components/uielements/select';
import Wrapper from './modalXacMinhNoiDungDon.styled';
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
  getValueConfigLocalByKey,
  mapFileToPromiseArray,
} from '../../../../helpers/utility';
import ModalAddEditHoSoTaiLieu from '../Shared/Modal/ModalAddEditFileTaiLieu';
import ModalCapNhatBuocXacMinh from './ModalCapNhatBuocXacMinh';
import ModalTrinhDuyet from './modalTrinhBaoCaoXacMinh';
import {
  DeleteOutlined,
  EditOutlined,
  FileOutlined,
  PlusOutlined,
  SaveOutlined,
} from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import {LoaiFileDinhKem} from '../../../../settings/constants';
import dayjs from 'dayjs';
import {useEffect} from 'react';
import {useState} from 'react';
import api from './config';

const {Item} = Form;
const ModalXacMinhNoiDungDon = (props) => {
  const [currentKey, setCurrentKey] = useState(1);
  const [DanhSachQuyTrinhXacMinh, setDanhSachQuyTrinhXacMinh] = useState([]);
  const [DanhSachToXacMinh, setDanhSachToXacMinh] = useState([]);
  const [DanhSachHoSoTaiLieu, setDanhSachHoSoTaiLieu] = useState([]);
  const [visibleModalCapNhatXacMinh, setVisibleModalCapNhatXacMinh] =
    useState(false);
  const [keyModalCapNhatXacMinh, setKeyModalCapNhatXacMinh] = useState(0);
  const [dataModalCapNhatXacMinh, setDataModalCapNhatXacMinh] = useState({});
  const [dataEdit, setDataEdit] = useState({});

  const {DanhSachCanBo} = props;

  useEffect(() => {
    const {dataEdit} = props;
    if (dataEdit) {
      setDataEdit(dataEdit);
    }
  }, []);

  useEffect(() => {
    if (dataEdit && dataEdit.BuocXacMinh) {
      setDanhSachQuyTrinhXacMinh(dataEdit.BuocXacMinh);
    }
    if (dataEdit && dataEdit.GiaoXacMinh?.ToXacMinh) {
      setDanhSachToXacMinh(dataEdit.GiaoXacMinh?.ToXacMinh);
    }
    if (dataEdit && dataEdit.GiaoXacMinh?.DanhSachHoSoTaiLieu) {
      setDanhSachHoSoTaiLieu(dataEdit.GiaoXacMinh?.DanhSachHoSoTaiLieu);
    }
  }, [dataEdit]);

  const showModalCapNhatXacMinh = (item) => {
    setDataModalCapNhatXacMinh(item);
    setVisibleModalCapNhatXacMinh(true);
    setKeyModalCapNhatXacMinh((prevKey) => prevKey + 1);
  };

  const closeModalCapNhatXacMinh = () => {
    setVisibleModalCapNhatXacMinh(false);
  };

  const SubmitModalCapNhatXacMinh = (data) => {
    const {XuLyDonID} = props;
    data.XuLyDonID = XuLyDonID;
    const LoaiFile = {
      FileType: LoaiFileDinhKem.FileBuocXacMinh,
    };
    const Promise_Files = [];
    if (data.DanhSachHoSoTaiLieu) {
      mapFileToPromiseArray(
        data.DanhSachHoSoTaiLieu,
        Promise_Files,
        LoaiFile,
        api,
      );
    }
    Promise.all(Promise_Files).then((list) => {
      api
        .CapNhatQuyetDinhGiaoXacMinh(data)
        .then((res) => {
          if (res.data.Status > 0) {
            message.destroy();
            message.success(res.data.Message);
            api.ChiTietXacMinhNoiDungDon({XuLyDonID}).then((res) => {
              if (res.data.Status > 0) {
                closeModalCapNhatXacMinh();
                setDataEdit(res.data.Data);
              }
            });
          } else {
            message.destroy();
            message.warning(res.data.Message);
          }
        })
        .catch((err) => {
          message.destroy();
          message.warning(err.toString);
        });
    });
  };

  const onOk = async () => {
    const {onCreate, dataEdit} = props;
    const value = {
      ...FormValue,
    };
    for (const key in value) {
      if (!value[key]) {
        delete value[key];
      }
    }
    // if (DanhSachHoSoTaiLieu && DanhSachHoSoTaiLieu.length) {
    // onCreate(value);
    // }
  };

  const handleAddStepConfirm = () => {
    setDataModalCapNhatXacMinh({});
    setVisibleModalCapNhatXacMinh(true);
    setKeyModalCapNhatXacMinh((prevKey) => prevKey + 1);
  };

  const submitModalStepConfirm = (data) => {};

  const handleRenderContentTabs = (tab) => {
    const {dataEdit} = props;
    const {NhomKN} = dataEdit;
    if (tab === 1) {
      return (
        <>
          <div className="wrapper-content">
            <div className="wrapper-content__top">
              <div className="content__top__title">
                <p className="title">Số đơn thư: {dataEdit?.SoDonThu}</p>
                <p className="title">
                  Thông tin đối tượng khiếu nại, tố cáo, PAKN:
                </p>
                <div className="content__top__info">
                  <div className="info">
                    {NhomKN?.DanhSachDoiTuongKN &&
                      NhomKN?.DanhSachDoiTuongKN?.map((item, index) => (
                        <>
                          {index > 0 ? (
                            <p className="title" style={{fontStyle: 'italic'}}>
                              Người đại diện {index + 1}
                            </p>
                          ) : (
                            ''
                          )}
                          <p>Chủ đơn/đại diện : {item?.HoTen}</p>
                          <p>Địa chỉ : {item?.DiaChiCT}</p>
                          <p>CCCD : {item?.CMND}</p>
                        </>
                      ))}
                  </div>
                </div>
              </div>
              <div className="line-break"></div>
              <div
                className="wrap-title"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: '5px 0',
                }}
              >
                <p className="title" style={{marginTop: 0}}>
                  Quy trình xác minh:
                </p>
                <Button onClick={handleAddStepConfirm}>
                  Thêm bước xác minh
                </Button>
              </div>
              <div className="box-file" style={{width: '100%'}}>
                <table>
                  <thead>
                    <th style={{width: '10%'}}>Bước</th>
                    <th style={{width: '40%'}}>Trình tự thủ tục giải quyết</th>
                    <th style={{width: '15%'}}> Ngày cập nhật</th>
                    <th style={{width: '15%'}}>Cán bộ cập nhật</th>
                    <th style={{width: '10%'}}>Trạng thái</th>
                    <th style={{width: '10%', textAlign: 'center'}}>
                      Thao tác
                    </th>
                  </thead>
                  <tbody>
                    {DanhSachQuyTrinhXacMinh &&
                      DanhSachQuyTrinhXacMinh.map((item) => (
                        <tr>
                          <td style={{textAlign: 'center'}}>{item?.OrderBy}</td>
                          <td>{item?.TenBuoc}</td>
                          <td>
                            {item?.NgayCapNhat
                              ? dayjs(item.NgayCapNhat).format('DD/MM/YYYY')
                              : ''}
                          </td>
                          <td>{item?.TenCanBo}</td>
                          <td>
                            {item?.TenTrangThai
                              ? item?.TenTrangThai
                              : 'Chưa cập nhật'}
                          </td>
                          <td style={{textAlign: 'center'}}>
                            <EditOutlined
                              onClick={() => showModalCapNhatXacMinh(item)}
                            />
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </>
      );
    } else if (tab === 2) {
      return (
        <>
          <div className="wrapper-content">
            <div className="wrapper-content__table">
              <div className="table_left">
                <p className="title">Thông tin đoàn/tổ xác minh:</p>
                <div className="box-file">
                  <table>
                    <thead>
                      <th style={{width: '10%'}}>STT</th>
                      <th style={{width: '70%'}}>Tên cán bộ</th>
                      <th style={{width: '20%'}}>Vai trò</th>
                    </thead>
                    <tbody>
                      {DanhSachToXacMinh &&
                        DanhSachToXacMinh.map((item, index) => (
                          <tr>
                            <td style={{textAlign: 'center'}}>{index + 1}</td>
                            <td>
                              {item.CanBoID
                                ? DanhSachCanBo.find(
                                    (canbo) => canbo.CanBoID === item.CanBoID,
                                  )?.TenCanBo
                                : ''}
                            </td>
                            <td>
                              {item?.VaiTro === 1
                                ? 'Phụ trách'
                                : item?.VaiTro === 2
                                ? 'Phối hợp'
                                : item?.VaiTro === 3
                                ? 'Theo dõi'
                                : ''}
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
                <p className="title">
                  Hạn giải quyết:{' '}
                  {dataEdit?.GiaoXacMinh?.HanGiaiQuyet
                    ? dayjs(dataEdit?.GiaoXacMinh?.HanGiaiQuyet).format(
                        'DD/MM/YYYY',
                      )
                    : ''}
                </p>
              </div>
              <div className="table_right">
                <p className="title">Hồ sơ, tài liệu:</p>
                <div className="box-file">
                  <table>
                    <thead>
                      <th style={{width: '10%'}}>STT</th>
                      <th style={{width: '60%'}}>Tên hồ sơ, tài liệu</th>
                      <th style={{width: '15%'}}>File đính kèm</th>
                      <th style={{width: '15%'}}>Ngày cập nhật</th>
                    </thead>
                    <tbody>
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
                              {/* {!isViewDetails ? (
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
                              ) : null} */}
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
                    </tbody>
                  </table>
                </div>
                <p className="title">
                  Ghi chú: {dataEdit?.GiaoXacMinh?.GhiChu}
                </p>
              </div>
            </div>
            <div className="line-break"></div>
            <p className="title">Quy trình xác minh:</p>
            <div className="box-file">
              <table>
                <thead>
                  <th style={{width: '10%'}}>Bước</th>
                  <th style={{width: '40%'}}>Trình tự thủ tục giải quyết</th>
                  <th style={{width: '15%'}}>Ngày cập nhật</th>
                  <th style={{width: '15%'}}>Cán bộ cập nhật</th>
                  <th style={{width: '10%'}}>Trạng thái</th>
                  <th style={{width: '10%', textAlign: 'center'}}>Thao tác</th>
                </thead>
                <tbody>
                  {DanhSachQuyTrinhXacMinh &&
                    DanhSachQuyTrinhXacMinh.map((item) => (
                      <tr>
                        <td style={{textAlign: 'center'}}>{item?.OrderBy}</td>
                        <td>{item?.TenBuoc}</td>
                        <td>
                          {item?.NgayCapNhat
                            ? dayjs(item.NgayCapNhat).format('DD/MM/YYYY')
                            : ''}
                        </td>
                        <td>{item?.TenCanBo}</td>
                        <td>{item?.TenTrangThai}</td>
                        <td style={{textAlign: 'center'}}>
                          <EditOutlined
                            onClick={() => showModalCapNhatXacMinh(item)}
                          />
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </>
      );
    }
  };

  const {
    title,
    visible,
    onCreate,
    fileKey,
    onCancel,
    DanhSachTenFile,
    DanhSachHuongXuLy,
    DanhSachCanBoXuLy,
    DanhSachCoQuan,
    handleRutDon,
    handleCompleteReport,
  } = props;

  const isViewDetails = props.dataEdit?.isViewDetails
    ? props.dataEdit.isViewDetails
    : null;

  const itemsTabs = [
    {
      key: 1,
      label: 'Thông tin đơn thư',
      forceRender: true,
      children: <>{handleRenderContentTabs(1)}</>,
    },
    {
      key: 2,
      label: 'Thông tin đoàn/tổ xác minh',
      forceRender: true,
      children: <>{handleRenderContentTabs(2)}</>,
    },
  ];

  return (
    <Modal
      title={'Xác minh nội dung đơn'}
      visible={visible}
      className="center-modal__footer"
      footer={
        !isViewDetails ? (
          <>
            {/* <Button type="primary" onClick={() => handleRutDon()}>
              <SaveOutlined /> Rút đơn
            </Button> */}
            <Button
              type="primary"
              onClick={() => handleCompleteReport()}
              disabled={!DanhSachQuyTrinhXacMinh.length}
            >
              <SaveOutlined /> Hoàn thành
            </Button>
            <Button className="btn-danger" onClick={() => onCancel()}>
              Đóng
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
      // padding={0}
      onCancel={() => onCancel()}
      key={fileKey}
    >
      <Wrapper>
        <Tabs
          activeKey={currentKey}
          items={itemsTabs}
          onChange={(tabs) => setCurrentKey(tabs)}
        ></Tabs>
      </Wrapper>
      <ModalCapNhatBuocXacMinh
        visible={visibleModalCapNhatXacMinh}
        dataEdit={dataModalCapNhatXacMinh}
        key={keyModalCapNhatXacMinh}
        onCancel={closeModalCapNhatXacMinh}
        onCreate={SubmitModalCapNhatXacMinh}
      />
    </Modal>
  );
};

export default ModalXacMinhNoiDungDon;
