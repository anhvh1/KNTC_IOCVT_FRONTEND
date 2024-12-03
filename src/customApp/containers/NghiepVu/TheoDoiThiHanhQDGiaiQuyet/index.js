import {Modal, Table, Tabs, Tooltip, message} from 'antd';
import {DatePicker} from '../../../../components/uielements/exportComponent';
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import actions from '../../../redux/NghiepVu/TheoDoiThiHanhQDGiaiQuyet/actions';
import LayoutWrapper from '../../../../components/utility/layoutWrapper';
import PageHeader from '../../../../components/utility/pageHeader';
import PageAction from '../../../../components/utility/pageAction';
import Box from '../../../../components/utility/box';
import BoxFilter from '../../../../components/utility/boxFilter';
import BoxTable from '../../../../components/utility/boxTable';
import Checkbox from '../../../../components/uielements/checkbox';
import Select from '../../../../components/uielements/select';
import Wrapper from './TiepCongDanDinhKy.styled';
import {Input} from 'antd';
import dayjs from 'dayjs';
import {
  Button,
  InputSearch,
} from '../../../../components/uielements/exportComponent';
import {LoaiFileDinhKem} from '../../../../settings/constants';
import {
  handleTextLong,
  mapFileToPromiseArray,
} from '../../../../helpers/utility';
import {
  changeUrlFilter,
  getDefaultPageSize,
  getFilterData,
  getRoleByKey,
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
import ModalChiTietDonThu from '../Shared/Modal/ModalChiTietDonThu';
import FilterTime from '../Shared/Component/BoxFilterTime';
import moment from 'moment';
import icons from '../icons';
import PageWrap from '../../../../components/utility/PageWrap';
const TheoDoiThiHanhQDGiaiQuyet = (props) => {
  document.title = 'Theo dõi thi hành quyết định giải quyết';
  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search),
  );
  const [dataModalAddEdit, setDataModalAddEdit] = useState({});
  const [visibleModalAddEdit, setVisibleModalAddEdit] = useState(false);
  const [action, setAction] = useState('');
  const [modalKey, inceaseModalKey] = useKey();
  const [selectedRowsKey, setSelectedRowsKey] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    DanhSachThiHanhQDGiaiQuyet,
    DanhSachHuongXuLy,
    DanhSachLoaiKhieuTo,
    TotalRow,
    role,
  } = props;
  const [visibleModalChiTietDonThu, setVisibleModalChiTietDonThu] =
    useState(false);
  const [keyModalChiTietDonThu, setKeyModalChiTietDonThu] = useState(0);
  const [dataModalChiTietDonThu, setdataModalChiTietDonThu] = useState(0);

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

  const showModalQuyetDinhGDKhieuNai = () => {
    const XuLyDonID = selectedRowsKey[0];
    api
      .ChiTietKhieuNai({XuLyDonID})
      .then((res) => {
        if (res.data.Status > 0) {
          setDataModalAddEdit({...res.data.Data});
          inceaseModalKey();
          setVisibleModalAddEdit(true);
          setAction('add');
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
    // setAction("");
    // setSelectedRowsKey([]);
    setDataModalAddEdit({});
    setVisibleModalAddEdit(false);
  };

  const submitModalAddEdit = (data, isTrinh) => {
    setLoading(true);
    const LoaiFile = {
      FileType: LoaiFileDinhKem.FileThiHanh,
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
        api.CapNhatQuyetDinhThiHanhKhieuNai(data).then((res) => {
          setLoading(false);
          if (!res || !res.data || res.data.Status !== 1) {
            message.error(
              `${res && res.data ? res.data.Message : 'Lỗi hệ thống'}`,
            );
          } else {
            message.success(res.data.Message);
            hideModalAddEdit();
            props.getInitData(filterData);
            setSelectedRowsKey([]);
          }
        });
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
    const newDanhSachThiHanhQDGiaiQuyet = DanhSachThiHanhQDGiaiQuyet?.map(
      (item) => ({
        ...item,
        key: item?.XuLyDonID,
      }),
    );
    return (
      <>
        {handleRenderBoxFilter()}
        <BoxTable
          rowSelection={rowSelection}
          columns={columns}
          dataSource={newDanhSachThiHanhQDGiaiQuyet}
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

  const closeModalChiTietDonThu = () => {
    setVisibleModalChiTietDonThu(false);
    setdataModalChiTietDonThu({});
  };

  const handleShowChiTietDonThu = () => {
    const itemSelect = DanhSachThiHanhQDGiaiQuyet?.find(
      (item) => item.XuLyDonID === selectedRowsKey[0],
    );
    const XuLyDonID = selectedRowsKey[0];
    api
      .ChiTietDonThu({
        XuLyDonID,
        DonThuID: itemSelect?.DonThuID,
      })
      .then((res) => {
        if (res.data.Status > 0) {
          setdataModalChiTietDonThu(res.data.Data);
          setVisibleModalChiTietDonThu(true);
          setKeyModalChiTietDonThu((prevKey) => prevKey + 1);
        } else {
          message.destroy();
          message.warning(res.data.Message);
        }
      })
      .catch((err) => {
        message.destroy();
        message.warning(err.toString());
      });
  };

  const handleRenderBoxFilter = () => {
    const {Search} = Input;
    return (
      <BoxFilter isCenter={true}>
        <Select
          style={{width: '200px'}}
          value={filterData.TrangThai}
          placeholder={'Chọn trạng thái thi hành'}
          allowClear
          onChange={(value) => onFilter(value, 'TrangThai')}
        >
          <Option value={'1'}>Chưa thi hành </Option>
          <Option value={'2'}>Đang thi hành</Option>
          <Option value={'3'}>Đã thi hành</Option>
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
      dataIndex: 'NgayTiepNhan',
      align: 'left',
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
      title: 'Thông tin chủ đơn',
      dataIndex: 'TenChuDon',
      align: 'left',
      width: '25%',
      render: (text, record, index) => (
        <div>
          {record.NhomKN?.DanhSachDoiTuongKN
            ? record.NhomKN?.DanhSachDoiTuongKN.map((item) => (
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
          {/* {record.NhomKN.LoaiDoiTuongKNID
            ? DanhSachLoaiKhieuTo.find(
                (item) => item.LoaiKhieuToID === record.NhomKN.LoaiDoiTuongKNID,
              )?.TenLoaiKhieuTo
            : null} */}
          {record.LoaiKhieuTo1ID
            ? DanhSachLoaiKhieuTo?.find(
                (item) => item.LoaiKhieuToID === record.LoaiKhieuTo1ID,
              )?.TenLoaiKhieuTo
            : null}
        </p>
      ),
    },

    {
      title: 'Cơ quan thi hành',
      dataIndex: 'TenCoQuan',
      align: 'left',
      width: '10%',
      render: (text, record, index) => (
        <p style={{color: record.TrangThaiQuaHan === 1 ? 'red' : ''}}>
          {record?.CoQuanThiHanh
            ? DanhSachCoQuan?.find(
                (item) => item.CoQuanID === record.CoQuanThiHanh,
              )?.TenCoQuan
            : ''}
        </p>
      ),
    },
    {
      title: 'Thời hạn thi hành',
      dataIndex: 'ThoiHanThiHanh',
      align: 'left',
      width: '10%',
      render: (text, record, index) => (
        <p style={{color: record.TrangThaiQuaHan === 1 ? 'red' : ''}}>
          {record.ThoiHanThiHanh
            ? dayjs(record.ThoiHanThiHanh).format('DD/MM/YYYY')
            : null}
        </p>
      ),
    },
    {
      title: 'Ngày thi hành',
      dataIndex: 'NgayThiHanh',
      align: 'left',
      width: '10%',
      render: (text, record, index) => (
        <p style={{color: record.TrangThaiQuaHan === 1 ? 'red' : ''}}>
          {record.NgayThiHanh
            ? dayjs(record.NgayThiHanh).format('DD/MM/YYYY')
            : null}
        </p>
      ),
    },
    {
      title: 'Trạng thái',
      dataIndex: 'TenTrangThai',
      align: 'left',
      width: '10%',
      render: (text, record, index) => (
        <p style={{color: record.TrangThaiQuaHan === 1 ? 'red' : ''}}>
          {record.TenTrangThai}
        </p>
      ),
    },
  ];

  const {DanhSachCoQuan} = props;

  const itemSelect = DanhSachThiHanhQDGiaiQuyet?.find(
    (item) => item.XuLyDonID === selectedRowsKey[0],
  );

  return (
    <LayoutWrapper>
      <PageWrap>
        <PageHeader>Thực hiện Báo cáo, quyết định, kết luận</PageHeader>
        <PageAction>
          <Button
            className="btn-center"
            type="primary"
            onClick={handleShowChiTietDonThu}
            disabled={!(selectedRowsKey.length === 1)}
          >
            <img
              src={
                !(selectedRowsKey.length === 1)
                  ? icons.Search
                  : icons.SearchWhite
              }
              className="btn-icon__img"
            />
            Xem chi tiết đơn thư
          </Button>
          {role.edit ? (
            <Button
              className="btn-center"
              type="primary"
              onClick={() => showModalQuyetDinhGDKhieuNai()}
              disabled={!(selectedRowsKey.length === 1)}
            >
              <img
                src={
                  !(selectedRowsKey.length === 1)
                    ? icons.Process
                    : icons.ProcessWhite
                }
                className="btn-icon__img"
              />
              Thực hiện BC, QĐ, KL
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
        dataSource={DanhSachThiHanhQDGiaiQuyet}
        DanhSachHuongXuLy={DanhSachHuongXuLy}
        XuLyDonID={selectedRowsKey[0]}
        DanhSachCoQuan={DanhSachCoQuan}
        TabsKey={filterData?.tabsKey}
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
    ...state.TheoDoiThiHanhQDGiaiQuyet,
    role: getRoleByKey(state.Auth.role, 'thi-hanh'),
  };
}

export default connect(mapStateToProps, actions)(TheoDoiThiHanhQDGiaiQuyet);
