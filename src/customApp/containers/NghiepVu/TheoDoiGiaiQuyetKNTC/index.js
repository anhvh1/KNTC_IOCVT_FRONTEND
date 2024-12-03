import {Modal, Table, Tabs, Tooltip, message} from 'antd';
import {DatePicker} from '../../../../components/uielements/exportComponent';
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import actions from '../../../redux/NghiepVu/TheoGioiGiaiQuyetKNTC/actions';
import LayoutWrapper from '../../../../components/utility/layoutWrapper';
import PageHeader from '../../../../components/utility/pageHeader';
import PageAction from '../../../../components/utility/pageAction';
import Box from '../../../../components/utility/box';
import BoxFilter from '../../../../components/utility/boxFilter';
import BoxTable from '../../../../components/utility/boxTable';
import Checkbox from '../../../../components/uielements/checkbox';
import Select from '../../../../components/uielements/select';
import Wrapper from './index.styled';
import {Input} from 'antd';
import dayjs from 'dayjs';
import {
  Button,
  InputSearch,
} from '../../../../components/uielements/exportComponent';
import {
  CapHanhChinh,
  CapID,
  LoaiFileDinhKem,
  TrangThaiMoi,
} from '../../../../settings/constants';
import {
  changeUrlFilter,
  getDefaultPageSize,
  getFilterData,
  getRoleByKey,
  handleRenderTrangThai,
  mapFileToPromiseArray,
} from '../../../../helpers/utility';
import {useKey} from '../../../CustomHook/useKey';
import queryString from 'query-string';
import api from './config';
import {handleTextLong} from '../../../../helpers/utility';
import ModalAddEdit from './modalAddEdit';
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  PrinterOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import {CheckboxGroup} from '../../../../components/uielements/checkbox';
import ModalChiTietDonThu from '../Shared/Modal/ModalChiTietDonThu';
import FilterTime from '../Shared/Component/BoxFilterTime';
import moment from 'moment';
import icons from '../icons';
import PageWrap from '../../../../components/utility/PageWrap';
import ModalQuyetDinhGiaoXacMinh from '../CapNhatQDGiaoXacMinh/modalAddEdit';
import {getLocalKey} from '../../../../helpers/utility';
import apiQD from '../CapNhatQDGiaoXacMinh/config';

const TheoGioiGiaiQuyet = (props) => {
  document.title = 'Theo dõi giải quyết KNTC, KNPA';
  const {filterData, setFilterData} = props;
  // const [filterData, setFilterData] = useState(
  //   queryString.parse(props.location.search),
  // );
  const [dataModalAddEdit, setDataModalAddEdit] = useState({});
  const [visibleModalAddEdit, setVisibleModalAddEdit] = useState(false);
  const [action, setAction] = useState('');
  const [modalKey, inceaseModalKey] = useKey();
  const [selectedRowsKey, setSelectedRowsKey] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [visibleModalChiTietDonThu, setVisibleModalChiTietDonThu] =
    useState(false);
  const [keyModalChiTietDonThu, setKeyModalChiTietDonThu] = useState(0);
  const [dataModalChiTietDonThu, setDataModalChiTietDonThu] = useState({});
  const [visibleModalQD, setVisibleModalQD] = useState(false);
  // const [stateModalQDGiaoXacMinh, setStateModalQDGiaoXacMinh] = useState({
  //   visibleModalQD: false,
  //   keyModalQD: 0,
  // });

  const showModalChiTietDonThu = () => {
    const XuLyDonID = selectedRowsKey[0];
    const DonThuID = DanhSachTheoDoiGiaiQuyet?.find(
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

  const closeModalChiTietDonThu = () => {
    setDataModalChiTietDonThu({});
    setVisibleModalChiTietDonThu(false);
  };

  const user = getLocalKey('user', {});

  const checkCTHuyen =
    user.ChuTichUBND === 1 && user.CapHanhChinh === CapHanhChinh.CapUBNDHuyen;

  const {
    DanhSachCoQuanQDGiaoXacMinh,
    DanhSachTheoDoiGiaiQuyet,
    DanhSachHuongXuLy,
    DanhSachLoaiKhieuTo,
    TotalRow,
    role,
    tableLoading,
  } = props;

  const TrangThaiID = DanhSachTheoDoiGiaiQuyet?.find(
    (item) => item.XuLyDonID === selectedRowsKey[0],
  )?.TrangThaiID;

  const StateID = DanhSachTheoDoiGiaiQuyet?.find(
    (item) => item.XuLyDonID === selectedRowsKey[0],
  )?.StateID;

  const TrinhDuThao = DanhSachTheoDoiGiaiQuyet?.find(
    (item) => item.XuLyDonID === selectedRowsKey[0],
  )?.TrinhDuThao;

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

  const showModalAdd = (type) => {
    setAction('add');
    setDataModalAddEdit({type});
    inceaseModalKey();
    if (type === 1 && checkCTHuyen) {
      setVisibleModalQD(true);
    } else {
      setVisibleModalAddEdit(true);
    }
  };

  const hideModalAddEdit = () => {
    setDataModalAddEdit({});
    setVisibleModalQD(false);
    setVisibleModalAddEdit(false);
  };

  const submitModalAddEdit = (data, isTrinh) => {
    setConfirmLoading(true);
    const XuLyDonID = selectedRowsKey[0];
    data.XuLyDonID = XuLyDonID;
    const {type} = data;
    const callApi = (data) =>
      type === 1 ? api.BanHanh(data) : api.BanHanhQuyetDinhGiaiQuyet(data);
    const LoaiFile = {
      FileType: checkCTHuyen
        ? LoaiFileDinhKem.FileCapNhatGiaoXacMinh
        : data?.type === 1
        ? LoaiFileDinhKem.BanHanhQDGiaoXacMinh
        : data?.type === 2
        ? LoaiFileDinhKem.BanHanhQDGiaoGiaiQuyet
        : null,
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
        if (type === 1) {
          if (TrangThaiID === 4) {
            if (checkCTHuyen) {
              api.CapNhatQuyetDinhGiaoXacMinhCTH(data).then((res) => {
                setConfirmLoading(false);
                if (!res || !res.data || res.data.Status !== 1) {
                  message.error(
                    `${res && res.data ? res.data.Message : 'Lỗi hệ thống'}`,
                  );
                } else {
                  message.success(res.data.Message);
                  setSelectedRowsKey([]);
                  hideModalAddEdit();
                  props.getInitData(filterData);
                }
              });
            } else {
              callApi({
                XuLyDonID,
                NoiDungBanHanh: '',
                DanhSachHoSoTaiLieu: [],
              }).then((res) => {
                if (!res || !res.data || res.data.Status !== 1) {
                  setConfirmLoading(false);
                  message.error(
                    `${res && res.data ? res.data.Message : 'Lỗi hệ thống'}`,
                  );
                } else {
                  if (checkCTHuyen) {
                    api.CapNhatQuyetDinhGiaoXacMinhCTH(data).then((res) => {
                      setConfirmLoading(false);
                      if (!res || !res.data || res.data.Status !== 1) {
                        message.error(
                          `${
                            res && res.data ? res.data.Message : 'Lỗi hệ thống'
                          }`,
                        );
                      } else {
                        message.success(res.data.Message);
                        setSelectedRowsKey([]);
                        hideModalAddEdit();
                        props.getInitData(filterData);
                      }
                    });
                  } else {
                    setConfirmLoading(false);
                    hideModalAddEdit();
                    props.getInitData(filterData);
                  }
                }
              });
            }
          } else {
            callApi({
              XuLyDonID,
              NoiDungBanHanh: '',
              DanhSachHoSoTaiLieu: [],
            }).then((res) => {
              if (!res || !res.data || res.data.Status !== 1) {
                setConfirmLoading(false);
                message.error(
                  `${res && res.data ? res.data.Message : 'Lỗi hệ thống'}`,
                );
              } else {
                if (checkCTHuyen) {
                  api.CapNhatQuyetDinhGiaoXacMinhCTH(data).then((res) => {
                    setConfirmLoading(false);
                    if (!res || !res.data || res.data.Status !== 1) {
                      message.error(
                        `${
                          res && res.data ? res.data.Message : 'Lỗi hệ thống'
                        }`,
                      );
                    } else {
                      message.success(res.data.Message);
                      setSelectedRowsKey([]);
                      hideModalAddEdit();
                      props.getInitData(filterData);
                    }
                  });
                } else {
                  setConfirmLoading(false);
                  hideModalAddEdit();
                  props.getInitData(filterData);
                }
              }
            });
          }
        } else {
          callApi(data).then((res) => {
            setConfirmLoading(false);
            if (!res || !res.data || res.data.Status !== 1) {
              message.error(
                `${res && res.data ? res.data.Message : 'Lỗi hệ thống'}`,
              );
            } else {
              if (!res || !res.data || res.data.Status !== 1) {
                message.error(
                  `${res && res.data ? res.data.Message : 'Lỗi hệ thống'}`,
                );
              } else {
                message.success(res.data.Message);
                setSelectedRowsKey([]);
                hideModalAddEdit();
                props.getInitData(filterData);
              }
            }
          });
        }
      });
    }
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

              // visibility: 'visible',
            }}
            // onClick={(event) => handleIconClick(event, record)}
          >
            <UnorderedListOutlined
              className="ant-icon__table"
              // onClick={(event) => handleIconClick(event, record)}
              // onClick={() => setSelectedRowsKey([record.XuLyDonID])}
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
    const newDanhSachTheoDoiGiaiQuyet = DanhSachTheoDoiGiaiQuyet?.map(
      (item) => ({
        ...item,
        key: item?.XuLyDonID,
      }),
    );
    return (
      <>
        {handleRenderBoxFilter()}
        <BoxTable
          loading={tableLoading}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={newDanhSachTheoDoiGiaiQuyet}
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

  const handleRenderBoxFilter = () => {
    const {Search} = Input;
    return (
      <BoxFilter isCenter={true}>
        <Select
          style={{width: '200px'}}
          value={filterData.Status}
          placeholder={'Chọn trạng thái'}
          allowClear
          onChange={(value) => onFilter(value, 'TrangThaiXuLyID')}
        >
          <Option value={0}>Chưa duyệt</Option>
          <Option value={1}>Đã duyệt</Option>
          <Option value={2}>Xử lý lại</Option>
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
        />
      </BoxFilter>
    );
  };

  const PageNumber = filterData.PageNumber
    ? parseInt(filterData.PageNumber)
    : 1;
  const PageSize = filterData.PageSize
    ? parseInt(filterData.PageSize)
    : getDefaultPageSize();

  const columns = [
    {
      title: 'Số đơn thư',
      dataIndex: 'SoDonThu',
      align: 'left',
      width: '10%',
      render: (text, record, index) => (
        <p style={{color: record.TrangThaiQuaHan === 1 ? 'red' : ''}}>
          {record.SoDonThu}
        </p>
      ),
    },
    {
      title: 'Ngày tiếp nhận',
      dataIndex: 'NgayGui',
      align: 'left',
      width: '10%',
      render: (text, record, index) => (
        <p style={{color: record.TrangThaiQuaHan === 1 ? 'red' : ''}}>
          {record.NgayGui ? dayjs(record.NgayGui).format('DD/MM/YYYY') : null}
        </p>
      ),
    },
    {
      title: 'Thông tin chủ đơn',
      dataIndex: 'TenChuDon',
      align: 'left',
      width: '25%',
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
      title: 'Cơ quan được giao xác minh',
      dataIndex: 'CoQuanDuocGiaoXacMinh',
      align: 'left',
      width: '10%',
      render: (text, record, index) => (
        <p style={{color: record.TrangThaiQuaHan === 1 ? 'red' : ''}}>
          {record?.GiaoXacMinh?.CoQuanID
            ? DanhSachCoQuan?.find(
                (item) => item.CoQuanID === record?.GiaoXacMinh?.CoQuanID,
              )?.TenCoQuan
            : null}
        </p>
      ),
    },
    {
      title: 'Hạn giải quyết',
      dataIndex: 'HanGiaiQuyet',
      align: 'left',
      width: '10%',
      render: (text, record, index) => (
        <p style={{color: record.TrangThaiQuaHan === 1 ? 'red' : ''}}>
          {record.NgayQuaHan
            ? dayjs(record.NgayQuaHan).format('DD/MM/YYYY')
            : null}
        </p>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'TrangThai',
      align: 'left',
      width: '10%',
      render: (text, record, index) => (
        <p style={{color: record.TrangThaiQuaHan === 1 ? 'red' : ''}}>
          {handleRenderTrangThai(record, 'TrangThai')}
        </p>
      ),
    },
  ];

  const {DanhSachCoQuan} = props;
  const checkTrangThaiTinh = TrangThaiID >= 3 && TrangThaiID < 6;
  // checkCTHuyen
  //   ? TrangThaiID >= 4 && TrangThaiID < 6
  //   : TrangThaiID >= 3 && TrangThaiID < 6;

  const TrangThaiIDMoi = DanhSachTheoDoiGiaiQuyet?.find(
    (item) => item.XuLyDonID === selectedRowsKey[0],
  )?.TrangThaiIDMoi;

  const CheckTrangThai = DanhSachTheoDoiGiaiQuyet?.find(
    (item) => item.XuLyDonID === selectedRowsKey[0],
  )?.CheckTrangThai;

  const checkBanHanhQDGiaoXacMinh = CheckTrangThai
    ? !(
        (selectedRowsKey.length === 1 &&
          TrangThaiIDMoi === TrangThaiMoi.ChuaDuyetLan2) ||
        TrangThaiIDMoi === TrangThaiMoi.DaTrinhDuyetLan2 ||
        TrangThaiIDMoi === TrangThaiMoi.DaBanHanhQuyetDinhGiaoXacMinh
      )
    : !(selectedRowsKey.length === 1 && TrinhDuThao >= 1 && checkTrangThaiTinh);

  const checkBanHanhQDGQ = CheckTrangThai
    ? !(
        selectedRowsKey.length === 1 &&
        (TrangThaiIDMoi === TrangThaiMoi.DuyetLan2VaTrinhXacMinhLan3 ||
          TrangThaiIDMoi === TrangThaiMoi.DuyetLan3)
      )
    : !(selectedRowsKey.length === 1 && TrangThaiID === 5);

  return (
    <LayoutWrapper>
      <PageWrap>
        <PageHeader>Theo dõi giải quyết KNTC, KNPA</PageHeader>
        <PageAction>
          <Button
            className="btn-center"
            type="primary"
            onClick={showModalChiTietDonThu}
            disabled={!(selectedRowsKey.length === 1)}
          >
            <img
              src={
                !(selectedRowsKey.length === 1)
                  ? icons.Preview
                  : icons.PreviewWhite
              }
              className="btn-icon__img"
            />
            Xem chi tiết đơn thư
          </Button>
          {role.edit ? (
            <Button
              className="btn-center"
              type="primary"
              onClick={() => showModalAdd(1)}
              disabled={
                checkBanHanhQDGiaoXacMinh
                // !(
                //   selectedRowsKey.length === 1 &&
                //   TrinhDuThao >= 1 &&
                //   checkTrangThaiTinh
                // )
              }
            >
              <img
                src={
                  checkBanHanhQDGiaoXacMinh
                    ? icons.Approval
                    : icons.ApprovalWhite
                }
                className="btn-icon__img"
              />
              {checkCTHuyen
                ? TrangThaiID !== 4 || !TrangThaiID
                  ? 'Giao xác minh, giải quyết'
                  : 'Cập nhật giao xác minh, giải quyết'
                : TrangThaiID !== 4 || !TrangThaiID
                ? 'Ban hành QĐ giao xác minh'
                : 'Cập nhật QĐ giao xác minh'}
            </Button>
          ) : null}
          {role.edit ? (
            <Button
              className="btn-center"
              type="primary"
              onClick={() => showModalAdd(2)}
              disabled={
                checkBanHanhQDGQ

                // !(selectedRowsKey.length === 1) || TrangThaiID !== 5
                // !(TrangThaiID === 5 || TrangThaiID === 4)
              }
            >
              <img
                src={
                  checkBanHanhQDGQ
                    ? // !(selectedRowsKey.length === 1) || TrangThaiID !== 5
                      // !(TrangThaiID === 5 || TrangThaiID === 4)
                      icons.Approval
                    : icons.ApprovalWhite
                }
                className="btn-icon__img"
              />
              Ban hành QĐ giải quyết
            </Button>
          ) : null}
        </PageAction>
      </PageWrap>
      <Box>
        <Wrapper>{handleRenderContentKhieuNai()}</Wrapper>
      </Box>
      <ModalQuyetDinhGiaoXacMinh
        visible={visibleModalQD}
        dataEdit={dataModalAddEdit}
        action={action}
        loading={confirmLoading}
        key={modalKey}
        onCreate={submitModalAddEdit}
        onCancel={hideModalAddEdit}
        dataSource={DanhSachTheoDoiGiaiQuyet}
        DanhSachHuongXuLy={DanhSachHuongXuLy}
        XuLyDonID={selectedRowsKey[0]}
        DanhSachCoQuan={DanhSachCoQuanQDGiaoXacMinh}
        checkCTHuyen={checkCTHuyen}
        TitleModal={
          checkCTHuyen
            ? TrangThaiID !== 4 || !TrangThaiID
              ? 'Giao xác minh, giải quyết'
              : 'Cập nhật giao xác minh, giải quyết'
            : TrangThaiID !== 4 || !TrangThaiID
            ? 'Ban hành QĐ giao xác minh'
            : 'Cập nhật QĐ giao xác minh'
        }
      />
      <ModalAddEdit
        visible={visibleModalAddEdit}
        dataEdit={dataModalAddEdit}
        action={action}
        loading={confirmLoading}
        key={modalKey}
        onCreate={submitModalAddEdit}
        onCancel={hideModalAddEdit}
        dataSource={DanhSachTheoDoiGiaiQuyet}
        DanhSachHuongXuLy={DanhSachHuongXuLy}
        XuLyDonID={selectedRowsKey[0]}
        DanhSachCoQuan={DanhSachCoQuan}
      />
      <ModalChiTietDonThu
        visible={visibleModalChiTietDonThu}
        key={keyModalChiTietDonThu}
        dataEdit={dataModalChiTietDonThu}
        onCancel={closeModalChiTietDonThu}
      />
    </LayoutWrapper>
  );
};

function mapStateToProps(state) {
  return {
    ...state.TheoGioiGiaiQuyet,
  };
}

export default connect(mapStateToProps, actions)(TheoGioiGiaiQuyet);
