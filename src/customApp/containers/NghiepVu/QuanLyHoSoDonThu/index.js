import {Modal, Table, Tabs, Tooltip, message} from 'antd';
import {DatePicker} from '../../../../components/uielements/exportComponent';
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import actions from '../../../redux/NghiepVu/QuanLyHoSoDonThu/actions';
import LayoutWrapper from '../../../../components/utility/layoutWrapper';
import PageHeader from '../../../../components/utility/pageHeader';
import PageAction from '../../../../components/utility/pageAction';
import Box from '../../../../components/utility/box';
import BoxFilter from '../../../../components/utility/boxFilter';
import BoxTable from '../../../../components/utility/boxTable';
import Checkbox from '../../../../components/uielements/checkbox';
import Select from '../../../../components/uielements/select';
import Wrapper from './QuanLyHoSoDonThu.styled';
import {Input} from 'antd';
import dayjs from 'dayjs';
import {
  Button,
  InputSearch,
} from '../../../../components/uielements/exportComponent';
import {LoaiFileDinhKem} from '../../../../settings/constants';
import {
  changeUrlFilter,
  getDefaultPageSize,
  getLocalKey,
  getFilterData,
  getRoleByKey,
  formatDate,
  mapFileToPromiseArray,
  handleRenderTenNguonDonDen,
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
import PreviewWhite from '../../../../image/preview_wihte.png';
import {handleTextLong} from '../../../../helpers/utility';
import ModalChiTietDonThu from '../Shared/Modal/ModalChiTietDonThu';
import moment from 'moment';
import FilterTime from '../Shared/Component/BoxFilterTime';
import {useSelector, useDispatch} from 'react-redux';
import {TreeSelect} from '../../../../components/uielements/exportComponent';
import actionsCoQuan from '../../../redux/DanhMuc/DMCoQuan/actions';
import PageWrap from '../../../../components/utility/PageWrap';
const QLHoSoDonThu = (props) => {
  document.title = 'Quản lý hồ sơ đơn thư';
  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search),
  );
  const [dataModalAddEdit, setDataModalAddEdit] = useState({});
  const [visibleModalAddEdit, setVisibleModalAddEdit] = useState(false);
  const [action, setAction] = useState('');
  const [modalKey, inceaseModalKey] = useKey();
  const [selectedRowsKey, setSelectedRowsKey] = useState([]);
  const [visibleModalChiTietDonThu, setVisibleModalChiTietDonThu] =
    useState(false);
  const [keyModalChiTietDonThu, setKeyModalChiTietDonThu] = useState(0);
  const [dataModalChiTietDonThu, setDataModalChiTietDonThu] = useState({});
  const [DanhSachThongTinBoSung, setDanhSachThongTinBoSung] = useState([]);
  const [loading, setLoading] = useState(false);
  const {role} = props;
  const showModalChiTietDonThu = () => {
    const XuLyDonID = selectedRowsKey[0];
    const DonThuID = DanhSachHoSoDonThu?.find(
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

  const showModalBieuMau = () => {
    setKeyModalInPhieu((prevKey) => prevKey + 1);
    setVisibleModalInPhieu(true);
  };

  const {DanhSachHoSoDonThu, DanhSachLoaiKhieuTo, TotalRow, tableLoading} =
    props;
  const {DanhSachCoQuan} = useSelector((state) => state.DMCoQuan);
  const dispatch = useDispatch();
  useEffect(() => {
    changeUrlFilter(filterData);
    props.getInitData(filterData);
  }, [filterData]);

  useEffect(() => {
    props.getData();
    dispatch(actionsCoQuan.getInitData());
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

  const showModalAdd = () => {
    const XuLyDonID = selectedRowsKey[0];
    api.DanhSachThongTinBoSung({XuLyDonID}).then((res) => {
      if (res.data.Status > 0) {
        setDanhSachThongTinBoSung(res.data.Data);
        setAction('add');
        inceaseModalKey();
        setVisibleModalAddEdit(true);
      }
    });
  };

  const hideModalAddEdit = () => {
    setDataModalAddEdit({});
    setVisibleModalAddEdit(false);
  };

  const submitModalAddEdit = (data, isTrinh) => {
    setLoading(true);
    const LoaiFile = {
      FileType: data.LoaiFile,
    };
    const NghiepVuID = selectedRowsKey[0];
    const Promise_Files = [];
    if (data.DanhSachHoSoTaiLieu) {
      mapFileToPromiseArray(
        data.DanhSachHoSoTaiLieu,
        Promise_Files,
        LoaiFile,
        api,
        NghiepVuID,
      );
    }
    Promise.all(Promise_Files).then((list) => {
      setLoading(false);
      hideModalAddEdit();
      props.getInitData(filterData);
    });
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
    const newDanhSachHoSoDonThu = DanhSachHoSoDonThu?.map((item) => ({
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
          dataSource={newDanhSachHoSoDonThu}
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

  const ExportExcel = () => {
    const data = {
      ...filterData,
    };
    api
      .ExportExcel(data)
      .then((res) => {
        if (res.data.Status > 0) {
          const a = document.createElement('a');
          a.href = res.data.Data;
          a.target = '_blank';
          a.click();
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
    return (
      <BoxFilter isCenter={true}>
        <Select
          style={{width: '200px'}}
          value={filterData.TrangThai}
          placeholder={'Chọn trạng thái'}
          allowClear
          onChange={(value) => onFilter(value, 'TrangThai')}
        >
          <Option value={'1'} key={'1'}>
            Đã xử lý
          </Option>
          <Option value={'2'} key={'2'}>
            Chưa xử lý
          </Option>
        </Select>
        <TreeSelect
          showSearch
          treeData={DanhSachCoQuan}
          onChange={(value) => onFilter(value, 'CoQuanID')}
          style={{width: 400}}
          dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
          placeholder="Chọn cơ quan"
          allowClear
          treeDefaultExpandAll
          // onChange={value => this.onSearch(value, "CoQuanID")}
          notFoundContent={'Không có dữ liệu'}
          treeNodeFilterProp={'title'}
          // defaultValue={filterData.CoQuanID}
        />
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
        </Select>{' '}
        <FilterTime onFilter={onFilter} filterData={filterData} />
        <InputSearch
          allowClear
          defaultValue={filterData?.Keyword}
          placeholder={'Nhập tên chủ đơn'}
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
      align: 'center',
      width: '8%',
      render: (text, record, index) => (
        <p style={{color: record.TrangThaiQuaHan === 1 ? 'red' : ''}}>
          {record.SoDonThu}
        </p>
      ),
    },
    {
      title: 'Nguồn đơn đến',
      dataIndex: 'TenNguonDonDen',
      align: 'left',
      width: '10%',
      render: (text, record, index) => (
        <p style={{color: record.TrangThaiQuaHan === 1 ? 'red' : ''}}>
          {handleRenderTenNguonDonDen(record)}
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
      title: 'Nội dung đơn',
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
      title: 'Ngày nhận',
      dataIndex: 'HuongXuLy',
      align: 'left',
      width: '10%',
      render: (text, record, index) => (
        <p style={{color: record.TrangThaiQuaHan === 1 ? 'red' : ''}}>
          {record.NgayNhapDon
            ? dayjs(record.NgayNhapDon).format('DD/MM/YYYY')
            : null}
        </p>
      ),
    },

    {
      title: 'Cơ quan xử lý',
      dataIndex: 'HanXuLy',
      align: 'center',
      width: '10%',
      render: (text, record, index) => (
        <p style={{color: record.TrangThaiQuaHan === 1 ? 'red' : ''}}>
          {record.TenCoQuan}
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
          {record.TenHuongGiaiQuyet}
        </p>
      ),
    },
  ];

  return (
    <LayoutWrapper>
      <PageWrap>
        <PageHeader>Quản lý hồ sơ đơn thư</PageHeader>
        <PageAction>
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
          {role.edit ? (
            <Button
              className="btn-center"
              type="primary"
              onClick={() => showModalAdd()}
              disabled={!(selectedRowsKey.length === 1)}
            >
              <img
                src={!(selectedRowsKey.length === 1) ? Process : ProcessWhite}
                className="btn-icon__img"
              />
              Cập nhật tài liệu
            </Button>
          ) : null}
          <Button
            type="primary"
            onClick={ExportExcel}
            disabled={!DanhSachHoSoDonThu?.length}
          >
            Xuất Excel
          </Button>
        </PageAction>
      </PageWrap>
      <Box>
        <Wrapper>{handleRenderContentKhieuNai()}</Wrapper>
      </Box>
      <ModalAddEdit
        visible={visibleModalAddEdit}
        dataEdit={dataModalAddEdit}
        action={action}
        key={modalKey}
        onCreate={submitModalAddEdit}
        onCancel={hideModalAddEdit}
        dataSource={DanhSachHoSoDonThu}
        DanhSachThongTinBoSung={DanhSachThongTinBoSung}
        XuLyDonID={selectedRowsKey[0]}
        loading={loading}
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
    ...state.QLHoSoDonThu,
    role: getRoleByKey(state.Auth.role, 'ql-ho-so-don-thu'),
  };
}

export default connect(mapStateToProps, actions)(QLHoSoDonThu);
