import {Modal, Table, Tabs, Tooltip, message} from 'antd';
import {DatePicker} from '../../../../components/uielements/exportComponent';
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import actions from '../../../redux/NghiepVu/XuLyDon/actions';
import LayoutWrapper from '../../../../components/utility/layoutWrapper';
import PageHeader from '../../../../components/utility/pageHeader';
import PageAction from '../../../../components/utility/pageAction';
import Box from '../../../../components/utility/box';
import BoxFilter from '../../../../components/utility/boxFilter';
import BoxTable from '../../../../components/utility/boxTable';
import Checkbox from '../../../../components/uielements/checkbox';
import Select from '../../../../components/uielements/select';
import Wrapper from './XuLyDon.styled';
import ModalTrinhDuyet from './modalTrinhDuyet';
import {Input} from 'antd';
import dayjs from 'dayjs';
import {
  Button,
  InputSearch,
} from '../../../../components/uielements/exportComponent';
import {
  HuongGiaiQuyet,
  LoaiFileDinhKem,
  TrangThaiMoi,
} from '../../../../settings/constants';
import {
  changeUrlFilter,
  getDefaultPageSize,
  getLocalKey,
  getFilterData,
  getRoleByKey,
  getValueConfigLocalByKey,
  mapFileToPromiseArray,
  handleRenderTrangThai,
} from '../../../../helpers/utility';
import {useKey} from '../../../CustomHook/useKey';
import queryString from 'query-string';
import api from './config';
import ModalAddEdit from './modalAddEdit';
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  PrinterOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import {CheckboxGroup} from '../../../../components/uielements/checkbox';
import PrintWhite from '../../../../image/printer_white.png';
import Print from '../../../../image/printer.png';
import Send from '../../../../image/send.png';
import SendWhite from '../../../../image/send_white.png';
import ProcessWhite from '../../../../image/process_white.png';
import Process from '../../../../image/process.png';
import Preview from '../../../../image/preview.png';
import ModalXuLyLai from './modalXuLyLai';
import PreviewWhite from '../../../../image/preview_wihte.png';
import {handleTextLong} from '../../../../helpers/utility';
import ModalChiTietDonThu from '../Shared/Modal/ModalChiTietDonThu';
import ModalInPhieu from '../Shared/Modal/modalInPhieu';
import ModalChuyenDon from './modalChuyenDon';
import FilterTime from '../Shared/Component/BoxFilterTime';
import moment from 'moment';
import PageWrap from '../../../../components/utility/PageWrap';
import ModalChiTietKetQuaXuLyDon from '../Shared/Modal/ModalChiTietKetQuaXuLyDon';
import {LoaiMaIn} from '../../../../settings/constants';
const XuLyDon = (props) => {
  document.title = 'Xử lý đơn';
  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search),
  );
  const [dataModalAddEdit, setDataModalAddEdit] = useState({});
  const [visibleModalAddEdit, setVisibleModalAddEdit] = useState(false);
  const [action, setAction] = useState('');
  const [modalKey, inceaseModalKey] = useKey();
  const [selectedRowsKey, setSelectedRowsKey] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [loadingModalTrinhDuyet, setLoadingModaltrinhDuyet] = useState(false);
  const [visibleModalTrinhDuyet, setVisibleModalTrinhDuyet] = useState(false);
  const [keyModalTrinhDuyet, setKeyModalTrinhDuyet] = useState(0);
  const [loading, setLoading] = useState(false);
  const [visibleModalChiTietDonThu, setVisibleModalChiTietDonThu] =
    useState(false);
  const [keyModalChiTietDonThu, setKeyModalChiTietDonThu] = useState(0);
  const [dataModalChiTietDonThu, setDataModalChiTietDonThu] = useState({});
  const [visibleModalInPhieu, setVisibleModalInPhieu] = useState(false);
  const [keyModalInPhieu, setKeyModalInPhieu] = useState(0);
  const [dataModalXuLyLai, setDataModalXuLyLai] = useState({});
  const [visibleModalXuLyLai, setVisibleModalXuLyLai] = useState(false);
  const [keyModalXuLyLai, setKeyModalXuLyLai] = useState(0);

  const [visibleModalKetQuaXuLyDon, setVisibleModalKetQuaXuLyDon] =
    useState(false);
  const [keyModalKetQuaXuLyDon, setKeyModalKetQuaXuLyDon] = useState(0);
  const [dataModalXuLyDon, setdataModalXuLyDon] = useState(0);

  const showModalChiTietDonThu = () => {
    const XuLyDonID = selectedRowsKey[0];
    const DonThuID = DanhSachXuLyDon?.find(
      (item) => item.XuLyDonID === XuLyDonID,
    )?.DonThuID;
    api.ChiTietDonThu2({XuLyDonID, DonThuID}).then((res) => {
      if (res.data.Status > 0) {
        setDataModalChiTietDonThu(res.data.Data);
        setVisibleModalChiTietDonThu(true);
        setKeyModalChiTietDonThu((prevKey) => prevKey + 1);
      }
    });
  };

  useEffect(() => {
    if (filterData.XuLyDonID && filterData.isPrint) {
      setSelectedRowsKey([Number(filterData.XuLyDonID)]);
      showModalBieuMau();
    }
  }, []);

  const closeModalChiTietDonThu = () => {
    setDataModalChiTietDonThu({});
    setVisibleModalChiTietDonThu(false);
  };

  const closeModalBieuMau = () => {
    setVisibleModalInPhieu(false);
  };

  const showModalBieuMau = () => {
    setKeyModalInPhieu((prevKey) => prevKey + 1);
    setVisibleModalInPhieu(true);
  };

  const {
    DanhSachXuLyDon,
    DanhSachHuongXuLy,
    DanhSachCoQuanChuyenDon,
    DanhSachBieuMau,
    DanhSachLoaiKhieuTo,
    DanhSachLanhDao,
    TotalRow,
    tableLoading,
    role,
  } = props;

  useEffect(() => {
    changeUrlFilter(filterData);
    props.getInitData(filterData);
  }, [filterData]);

  useEffect(() => {
    props.getData();
  }, []);

  const onTableChange = (pagination, filters, sorter) => {
    let oldFilterData = filterData;
    let onOrder = {pagination, filters, sorter};
    let newFilterData = getFilterData(oldFilterData, null, onOrder);

    setFilterData(newFilterData);
    setSelectedRowsKey([]);
  };

  const onFilter = (value, property) => {
    let oldFilterData = filterData;
    let onFilter = {value, property};
    let newfilterData = getFilterData(oldFilterData, onFilter, null);
    //get filter data
    setFilterData(newfilterData);
    setSelectedRowsKey([]);
  };

  const showModalAdd = (TrangThaiID) => {
    const XuLyDonID = selectedRowsKey[0];
    if (TrangThaiID === 0) {
      setAction('add');
      inceaseModalKey();
      setVisibleModalAddEdit(true);
    }
    if (TrangThaiID === 2) {
      setAction('add');
      api
        .ChiTietDonThu({XuLyDonID})
        .then((res) => {
          if (res.data.Status > 0) {
            setDataModalXuLyLai({...res.data.Data});
            setKeyModalXuLyLai((prevKey) => prevKey + 1);
            setVisibleModalXuLyLai(true);
          } else {
            message.destroy();
            message.error(res.data.Message);
          }
        })
        .catch((error) => {
          message.destroy();
          message.error(error.toString());
        });
    }
  };

  const showModalDetails = () => {
    const XuLyDonID = selectedRowsKey[0];
    // setAction('edit');
    api
      .KetQuaXuLyDon({XuLyDonID})
      .then((res) => {
        if (res.data.Status > 0) {
          setdataModalXuLyDon({isViewDetails: true, ...res.data.Data});
          inceaseModalKey();
          setVisibleModalKetQuaXuLyDon(true);
        } else {
          message.destroy();
          message.error(res.data.Message);
        }
      })
      .catch((error) => {
        message.destroy();
        message.error(error.toString());
      });
  };

  const hideModalAddEdit = () => {
    setDataModalAddEdit({});
    setVisibleModalAddEdit(false);
  };
  const SuDungQuyTrinhPhucTap = getLocalKey('user')?.SuDungQuyTrinhPhucTap;

  const submitModalAddEdit = (data, isTrinh) => {
    const CheckChuyenDon = data?.HuongGiaiQuyetID === HuongGiaiQuyet.ChuyenDon;
    if (isTrinh) {
      Modal.confirm({
        title: 'Trình kết quả xử lý đơn',
        content: 'Bạn có muốn trình kết quả xử lý này không?',
        cancelText: 'Không',
        okText: 'Có',
        onOk: () => {
          setLoading(true);
          const LoaiFile = {
            FileType: LoaiFileDinhKem.XuLyDon,
          };
          if (action === 'add') {
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
              api.ThemMoiDonThu(data).then((res) => {
                setLoading(false);
                if (!res || !res.data || res.data.Status !== 1) {
                  message.error(
                    `${res && res.data ? res.data.Message : 'Lỗi hệ thống'}`,
                  );
                } else {
                  message.success(res.data.Message);
                  hideModalAddEdit();
                  hideModalXuLyLai();
                  props.getInitData(filterData);
                  if (isTrinh) {
                    submitModalTrinhDuyet();
                  }
                }
              });
            });
          }
        },
      });
    } else {
      setLoading(true);
      const LoaiFile = {
        FileType: LoaiFileDinhKem.XuLyDon,
      };
      if (action === 'add') {
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
          api.ThemMoiDonThu(data).then((res) => {
            setLoading(false);
            if (!res || !res.data || res.data.Status !== 1) {
              message.error(
                `${res && res.data ? res.data.Message : 'Lỗi hệ thống'}`,
              );
            } else {
              message.success(res.data.Message);
              hideModalAddEdit();
              hideModalXuLyLai();
              props.getInitData(filterData);
              if (CheckChuyenDon && !SuDungQuyTrinhPhucTap) {
                submitModalChuyenDon(data);
              } else {
                setSelectedRowsKey([]);
              }
            }
          });
        });
      }
    }
  };

  const hideModalXuLyLai = () => {
    setVisibleModalXuLyLai(false);
  };

  const handleCheckboxChange = (record) => {
    const selectedRows = [...selectedRowsKey];

    if (selectedRows.includes(record.key)) {
      // Nếu đã checked thì uncheck
      setSelectedRowsKey(selectedRows.filter((key) => key !== record.key));
    } else {
      // Nếu chưa checked thì check
      setSelectedRowsKey([...selectedRows, record.key]);
    }
  };

  const handleRenderContentKhieuNai = () => {
    const rowSelection = {
      selectedRowsKey,
      renderCell: (checked, record, index, originNode) => {
        return (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <UnorderedListOutlined
              className="ant-icon__table"
              style={{marginRight: 4, fontSize: 14, visibility: 'hidden'}}
            />
            <div>
              <Checkbox
                // disabled={record?.TrangThaiID === 1}
                className="selected__table"
                checked={selectedRowsKey.includes(record.XuLyDonID)}
                onChange={() => handleCheckboxChange(record)}
              />
            </div>
            {/* {originNode} */}
          </div>
        );
      },
      onChange: (selectedRowkey) => {
        setSelectedRowsKey(selectedRowkey);
      },
    };
    const newDanhSachXuLyDon = DanhSachXuLyDon?.map((item) => ({
      ...item,
      key: item?.XuLyDonID,
    }));

    return (
      <>
        {handleRenderBoxFilter()}
        <BoxTable
          rowSelection={rowSelection}
          columns={columns}
          loading={tableLoading}
          dataSource={newDanhSachXuLyDon}
          onChange={onTableChange}
          pagination={{
            showSizeChanger: true,
            showTotal: (total, range) =>
              `Từ ${range[0]} đến ${range[1]} trên ${total} kết quả`,
            total: TotalRow,
            current: PageNumber,
            pageSize: PageSize,
          }}
        />
      </>
    );
  };

  const closeModalTrinhDuyet = () => {
    setVisibleModalTrinhDuyet(false);
  };

  const handleRenderBoxFilter = () => {
    const {Search} = Input;
    return (
      <BoxFilter isCenter={true}>
        <Select
          style={{width: '200px'}}
          value={filterData.TrangThaiXuLyID}
          placeholder={'Chọn trạng thái xử lý'}
          allowClear
          onChange={(value) => onFilter(value, 'TrangThaiXuLyID')}
        >
          <Option value={'0'}>Chưa xử lý</Option>
          <Option value={'1'}>Đã xử lý</Option>
          <Option value={'2'}>Xử lý lại</Option>
        </Select>
        <Select
          style={{width: '200px'}}
          value={filterData.HuongXuLyID}
          placeholder={'Chọn hướng xử lý'}
          allowClear
          onChange={(value) => onFilter(value, 'HuongXuLyID')}
        >
          {DanhSachHuongXuLy
            ? DanhSachHuongXuLy.map((item) => (
                <Option
                  value={item.HuongGiaiQuyetID?.toString()}
                  key={item.HuongGiaiQuyetID}
                >
                  {item.TenHuongGiaiQuyet}
                </Option>
              ))
            : null}
        </Select>
        <Select
          style={{width: '200px'}}
          value={filterData.LoaiKhieuToID}
          placeholder={'Chọn loại khiếu tố'}
          allowClear
          onChange={(value) => onFilter(value, 'LoaiKhieuToID')}
        >
          {DanhSachLoaiKhieuTo
            ? DanhSachLoaiKhieuTo.map((item) => (
                <Option
                  value={item.LoaiKhieuToID.toString()}
                  key={item.LoaiKhieuToID}
                >
                  {item.TenLoaiKhieuTo}
                </Option>
              ))
            : null}
        </Select>
        <FilterTime onFilter={onFilter} filterData={filterData} />

        <InputSearch
          allowClear
          defaultValue={filterData?.Keyword}
          placeholder={'Nhập đối tượng KNTC, KNPA hoặc nội dung tiếp'}
          style={{width: 300}}
          onSearch={(value) => onFilter(value, 'Keyword')}
          className="search-input"
        />
      </BoxFilter>
    );
  };

  const submitModalChuyenDon = (data) => {
    data.XuLyDonID = selectedRowsKey[0];
    const LoaiFile = {
      FileType: LoaiFileDinhKem.PheDuyetKetQuaXuLy,
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
      api.ChuyenDon(data).then((res) => {
        setLoading(false);
        if (!res || !res.data || res.data.Status !== 1) {
          setSelectedRowsKey([]);
          // message.error(
          //   `${res && res.data ? res.data.Message : 'Lỗi hệ thống'}`,
          // );
        } else {
          setSelectedRowsKey([]);
          // message.success(res.data.Message);

          props.getInitData(filterData);
        }
      });
    });
  };

  const TrinhDonThu = () => {
    const CapID = getLocalKey('user')?.CapID;
    if (CapID === 3) {
      Modal.confirm({
        title: 'Trình kết quả xử lý đơn',
        content: 'Bạn có muốn trình kết quả xử lý này không?',
        cancelText: 'Không',
        okText: 'Có',
        onOk: () => {
          submitModalTrinhDuyet();
          setSelectedRowsKey([]);
        },
      });
    } else {
      setKeyModalTrinhDuyet((prevKey) => prevKey + 1);
      setVisibleModalTrinhDuyet(true);
    }
  };

  const closeModalXuLyDon = () => {
    setVisibleModalKetQuaXuLyDon(false);
  };

  const HideTrinhDuyet = () => {
    setVisibleModalTrinhDuyet(false);
    // setKeyModalTrinhDuyet(prevKey + 1)
  };

  const submitModalTrinhDuyet = (data) => {
    setLoadingModaltrinhDuyet(true);
    const XuLyDonID = selectedRowsKey[0];
    const newData = {
      ...data,
      XuLyDonID,
    };
    api
      .TrinhDuyet(newData)
      .then((res) => {
        if (res.data.Status > 0) {
          setLoadingModaltrinhDuyet(false);
          message.destroy();
          message.success(res.data.Message);
          props.getInitData(filterData);
          HideTrinhDuyet();
          setSelectedRowsKey([]);
        } else {
          message.destroy();
          message.error(res.data.Message);
        }
      })
      .catch((error) => {
        message.destroy();
        message.error(error.toString());
      });
  };

  const PageNumber = filterData.PageNumber
    ? parseInt(filterData.PageNumber)
    : 1;
  const PageSize = filterData.PageSize
    ? parseInt(filterData.PageSize)
    : getDefaultPageSize();

  const TrangThaiID = DanhSachXuLyDon?.find(
    (item) => item.XuLyDonID === selectedRowsKey[0],
  )?.TrangThaiID;

  const DonThuID = DanhSachXuLyDon?.find(
    (item) => item.XuLyDonID === selectedRowsKey[0],
  )?.DonThuID;
  const TiepDanKhongDonID = DanhSachXuLyDon?.find(
    (item) => item.XuLyDonID === selectedRowsKey[0],
  )?.TiepDanKhongDonID;
  const XuLyDonID = selectedRowsKey[0];

  const TrangThaiIDMoi = DanhSachXuLyDon?.find(
    (item) => item.XuLyDonID === selectedRowsKey[0],
  )?.TrangThaiIDMoi;

  const CheckTrangThai = DanhSachXuLyDon?.find(
    (item) => item.XuLyDonID === selectedRowsKey[0],
  )?.CheckTrangThai;

  const columns = [
    {
      title: 'Số đơn thư',
      dataIndex: 'SoDonThu',
      align: 'center',
      width: '8%',
      render: (text, record, index) => (
        <p style={{color: record.TrangThaiQuaHan === 1 ? 'red' : ''}}>
          {record.SoDonThu}
        </p>
      ),
    },
    {
      title: 'Ngày tiếp nhận',
      align: 'center',
      width: '10%',
      render: (text, record, index) => (
        <p style={{color: record.TrangThaiQuaHan === 1 ? 'red' : ''}}>
          {record.NgayTiepNhan
            ? dayjs(record.NgayTiepNhan).format('DD/MM/YYYY')
            : null}
        </p>
      ),
    },
    {
      title: 'Nguồn đơn đến',
      dataIndex: 'NguonDonDens',
      align: 'left',
      width: '10%',
      render: (text, record, index) => (
        <p style={{color: record.TrangThaiQuaHan === 1 ? 'red' : ''}}>
          {record.NguonDonDens}
        </p>
      ),
    },
    {
      title: 'Thông tin chủ đơn',
      dataIndex: 'TenChuDon',
      align: 'left',
      width: '20%',
      render: (text, record, index) => (
        <div>
          {record?.listDoiTuongKN
            ? record.listDoiTuongKN.map((item) => (
                <div>
                  <p
                    style={{
                      fontWeight: '600',
                      color: record.TrangThaiQuaHan === 1 ? 'red' : '',
                      textTransform: 'capitalize',
                    }}
                  >
                    {item.HoTen}
                  </p>
                  <p style={{color: record.TrangThaiQuaHan === 1 ? 'red' : ''}}>
                    {item.DiaChiCT}
                  </p>
                </div>
              ))
            : null}
        </div>
      ),
    },
    {
      title: 'Nội dung vụ việc',
      dataIndex: 'NoiDungDon',
      align: 'left',
      width: '30%',
      render: (text, record, index) => (
        <Tooltip title={record.NoiDungDon}>
          <p style={{color: record.TrangThaiQuaHan === 1 ? 'red' : ''}}>
            {handleTextLong(record.NoiDungDon, 150)}
          </p>
        </Tooltip>
      ),
    },
    {
      title: 'Loại khiếu tố',
      dataIndex: 'TenLoaiKhieuTo',
      align: 'left',
      width: '10%',
      render: (text, record, index) => (
        <p style={{color: record.TrangThaiQuaHan === 1 ? 'red' : ''}}>
          {record.TenLoaiKhieuTo}
        </p>
      ),
    },
    {
      title: 'Hạn xử lý',
      dataIndex: 'HanXuLy',
      align: 'center',
      width: '10%',
      render: (text, record, index) => (
        <p style={{color: record.TrangThaiQuaHan === 1 ? 'red' : ''}}>
          {record.HanXuLy}
        </p>
      ),
    },
    {
      title: 'Hướng xử lý',
      dataIndex: 'HuongXuLy',
      align: 'left',
      width: '10%',
      render: (text, record, index) => (
        <p style={{color: record.TrangThaiQuaHan === 1 ? 'red' : ''}}>
          {record.HuongXuLy}
        </p>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'TrangThaiStr',
      align: 'left',
      width: '10%',
      render: (text, record, index) => (
        <p style={{color: record.TrangThaiQuaHan === 1 ? 'red' : ''}}>
          {handleRenderTrangThai(record, 'TrangThaiStr')}
        </p>
      ),
    },
  ];

  // const TrangThaiNew = CheckTrangThai ? TrangThaiIDMoi : TrangThaiID;
  const checkTrinhDuyet = !CheckTrangThai
    ? !(
        (selectedRowsKey.length === 1 && TrangThaiID === 1) ||
        TrangThaiID === 2
      )
    : !(selectedRowsKey.length !== 1) && TrangThaiIDMoi !== TrangThaiMoi.DaXuLy;

  const checkXuLydon = !CheckTrangThai
    ? !(selectedRowsKey.length === 1) ||
      !(TrangThaiID === 0 || TrangThaiID === 2)
    : !(selectedRowsKey.length === 1) ||
      !(
        TrangThaiIDMoi === 0 ||
        TrangThaiIDMoi === TrangThaiMoi.ChuaTrinh ||
        TrangThaiIDMoi === TrangThaiMoi.XuLyLai
      );

  return (
    <LayoutWrapper>
      <PageWrap>
        <PageHeader>Xử lý đơn</PageHeader>
        <PageAction>
          {/* {role ? role.add ?  */}
          <Button
            className="btn-center"
            type="primary"
            onClick={showModalChiTietDonThu}
            disabled={!(selectedRowsKey.length === 1)}
          >
            <img
              src={!(selectedRowsKey.length === 1) ? Preview : PreviewWhite}
              className="btn-icon__img"
            />
            Xem chi tiết đơn thư
          </Button>
          <Button
            className="btn-center"
            type="primary"
            onClick={() => showModalDetails()}
            disabled={!(selectedRowsKey.length === 1)}
          >
            <img
              src={!(selectedRowsKey.length === 1) ? Preview : PreviewWhite}
              className="btn-icon__img"
            />
            Xem kết quả xử lý đơn
          </Button>
          <Button
            className="btn-center"
            type="primary"
            onClick={() => showModalBieuMau()}
            disabled={!(selectedRowsKey.length === 1)}
          >
            <img
              src={!(selectedRowsKey.length === 1) ? Print : PrintWhite}
              className="btn-icon__img"
            />
            In phiếu
          </Button>
          {role.edit && SuDungQuyTrinhPhucTap ? (
            <Button
              className="btn-center"
              type="primary"
              onClick={TrinhDonThu}
              disabled={checkTrinhDuyet}
            >
              <img
                src={checkTrinhDuyet ? Send : SendWhite}
                className="btn-icon__img"
              />
              Trình duyệt
            </Button>
          ) : null}
          {role.edit ? (
            <Button
              className="btn-center btn-handle__report"
              type="primary"
              onClick={() => showModalAdd(TrangThaiID)}
              disabled={checkXuLydon}
            >
              <img
                src={checkXuLydon ? Process : ProcessWhite}
                className="btn-icon__img"
              />
              Xử lý đơn
            </Button>
          ) : null}
        </PageAction>
      </PageWrap>
      <Box>
        <Wrapper>{handleRenderContentKhieuNai()}</Wrapper>
      </Box>
      <ModalAddEdit
        visible={visibleModalAddEdit}
        dataEdit={dataModalAddEdit}
        action={action}
        loading={loading}
        key={modalKey}
        onCreate={submitModalAddEdit}
        onCancel={hideModalAddEdit}
        dataSource={DanhSachXuLyDon}
        DanhSachHuongXuLy={DanhSachHuongXuLy}
        DanhSachCoQuan={DanhSachCoQuanChuyenDon}
        XuLyDonID={selectedRowsKey[0]}
        SuDungQuyTrinhPhucTap={SuDungQuyTrinhPhucTap}
      />
      <ModalChiTietKetQuaXuLyDon
        visible={visibleModalKetQuaXuLyDon}
        key={keyModalKetQuaXuLyDon}
        dataEdit={dataModalXuLyDon}
        onCancel={closeModalXuLyDon}
      />
      <ModalXuLyLai
        visible={visibleModalXuLyLai}
        dataEdit={dataModalXuLyLai}
        action={action}
        loading={loading}
        key={keyModalXuLyLai}
        onCreate={submitModalAddEdit}
        onCancel={hideModalXuLyLai}
        dataSource={DanhSachXuLyDon}
        DanhSachHuongXuLy={DanhSachHuongXuLy}
        XuLyDonID={selectedRowsKey[0]}
      />
      <ModalChiTietDonThu
        visible={visibleModalChiTietDonThu}
        key={keyModalChiTietDonThu}
        dataEdit={dataModalChiTietDonThu}
        onCancel={closeModalChiTietDonThu}
      />
      <ModalInPhieu
        visible={visibleModalInPhieu}
        DanhSachBieuMau={DanhSachBieuMau}
        key={keyModalInPhieu}
        onCancel={closeModalBieuMau}
        XuLyDonID={XuLyDonID}
        DonThuID={DonThuID}
        TiepDanKhongDonID={TiepDanKhongDonID}
      />
      <ModalTrinhDuyet
        visible={visibleModalTrinhDuyet}
        key={keyModalTrinhDuyet}
        onCreate={submitModalTrinhDuyet}
        DanhSachLanhDao={DanhSachLanhDao}
        onCancel={closeModalTrinhDuyet}
        loading={loadingModalTrinhDuyet}
      />
    </LayoutWrapper>
  );
};

function mapStateToProps(state) {
  return {
    ...state.XuLyDon,
    role: getRoleByKey(state.Auth.role, 'xu-ly-don-thu'),
  };
}

export default connect(mapStateToProps, actions)(XuLyDon);
