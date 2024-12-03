import {Modal, Table, Tooltip, message} from 'antd';
import actions from '../../../redux/HeThong/XoaDonThuLoi/actions';
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import LayoutWrapper from '../../../../components/utility/layoutWrapper';
import PageHeader from '../../../../components/utility/pageHeader';
import PageAction from '../../../../components/utility/pageAction';
import Box from '../../../../components/utility/box';
import BoxFilter from '../../../../components/utility/boxFilter';
import BoxTable from '../../../../components/utility/boxTable';
import {
  Button,
  InputSearch,
  Select,
} from '../../../../components/uielements/exportComponent';
import {TreeSelect} from '../../../../components/uielements/exportComponent';
import Checkbox from '../../../../components/uielements/checkbox';
import dayjs from 'dayjs';
import actionsCoQuan from '../../../redux/DanhMuc/DMCoQuan/actions';
import {Option} from '../../../../components/uielements/exportComponent';
import {DatePicker as DatePickerFormat} from '../../../../components/uielements/exportComponent';
import apiCoQuan from '../../DanhMuc/DMCoQuan/config';
import ModalChiTietDonThu from '../../NghiepVu/Shared/Modal/ModalChiTietDonThu';
import FilterTime from '../../NghiepVu/Shared/Component/BoxFilterTime';
import {
  changeUrlFilter,
  exportExcel,
  getDefaultPageSize,
  getFilterData,
  getRoleByKey,
  disabledDate,
} from '../../../../helpers/utility';
import {useKey} from '../../../CustomHook/useKey';
import queryString from 'query-string';
import api from './config';
import moment from 'moment';
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import {useSelector, useDispatch} from 'react-redux';
import PageWrap from '../../../../components/utility/PageWrap';
const XoaDonThuLoi = (props) => {
  document.title = 'Xóa đơn thư lỗi';
  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search),
  );
  const [action, setAction] = useState('');
  const [modalKey, inceaseModalKey] = useKey();
  const [selectedRowsKey, setSelectedRowsKey] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const {DanhSachCoQuan} = useSelector((state) => state.DMCoQuan);
  const [visibleModalChiTietDonThu, setVisibleModalChiTietDonThu] =
    useState(false);
  const [keyModalChiTietDonThu, setKeyModalChiTietDonThu] = useState(0);
  const [dataModalChiTietDonThu, setDataModalChiTietDonThu] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    changeUrlFilter(filterData);
    props.getList(filterData);
  }, [filterData]);

  useEffect(() => {
    props.getList(filterData);
    props.getInit(filterData);
    dispatch(actionsCoQuan.getInitData());
  }, []);

  useEffect(() => {
    apiCoQuan
      .GetListCoQuanByUser(filterData)
      .then((res) => {
        if (res.data.Status > 0) {
          setDanhSachCoQuan(res.data.Data);
        } else {
          message.destroy();
          message.error(res.data.Message);
        }
      })
      .catch((err) => {
        message.destroy();
        // message.error(Constants.API_ERROR);
      });
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

  const showModalChiTietDonThu = () => {
    const XuLyDonID = selectedRowsKey[0];
    const DonThuID = DanhSachDonThuLoi?.find(
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

  const deleteDonThuLoi = () => {
    const item = DanhSachDonThuLoi.find(
      (item) => item.XuLyDonID === selectedRowsKey[0],
    );
    Modal.confirm({
      title: 'Xóa Dữ Liệu',
      content: 'Bạn có muốn xóa đơn thư này không?',
      cancelText: 'Không',
      okText: 'Có',
      onOk: () => {
        setConfirmLoading(true);
        api
          .XoaDonThuLoi(item)
          .then((res) => {
            if (res.data.Status > 0) {
              setConfirmLoading(false);
              setSelectedRowsKey([]);
              props.getList({
                ...filterData,
                PageNumber:
                  Math.ceil((TotalRow - 1) / filterData.PageSize) <
                  filterData.PageNumber
                    ? Math.ceil((TotalRow - 1) / filterData.PageSize)
                    : filterData.PageNumber,
              });
              message.destroy();
              message.success(res.data.Message);
              setFilterData({
                ...filterData,
                PageNumber:
                  Math.ceil((TotalRow - 1) / filterData.PageSize) <
                  filterData.PageNumber
                    ? Math.ceil((TotalRow - 1) / filterData.PageSize)
                    : filterData.PageNumber,
              });
            } else {
              message.destroy();
              message.error(res.data.Message);
            }
          })
          .catch((error) => {
            message.destroy();
            message.error(error.toString());
          });
      },
    });
  };

  const {
    DanhSachDonThuLoi,
    TotalRow,
    role,
    DanhSachLoaiEmail,
    DanhSachLoaiKhieuTo,
    tableLoading,
  } = props;

  const closeModalChiTietDonThu = () => {
    setDataModalChiTietDonThu({});
    setVisibleModalChiTietDonThu(false);
  };

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

  const newDanhSachDonThuLoi = DanhSachDonThuLoi?.map((item) => ({
    ...item,
    key: item?.XuLyDonID,
  }));

  const PageNumber = filterData.PageNumber
    ? parseInt(filterData.PageNumber)
    : 1;
  const PageSize = filterData.PageSize
    ? parseInt(filterData.PageSize)
    : getDefaultPageSize();

  const columns = [
    {
      title: 'STT',
      width: '5%',
      align: 'center',
      render: (text, record, index) => (
        <span>{(PageNumber - 1) * PageSize + (index + 1)}</span>
      ),
    },
    {
      title: 'Số đơn',
      align: 'left',
      width: '10%',
      render: (text, record) => record.SoDonThu,
    },
    {
      title: 'Cơ quan tiếp nhận',
      align: 'left',
      width: '15%',
      render: (text, record) => record.TenCoQuan,
    },
    {
      title: 'Tên chủ đơn',
      align: 'left',
      width: '25%',
      render: (text, record, index) => (
        <div>
          {record?.listDoiTuongKN
            ? record.listDoiTuongKN.map((item) => (
                <div>
                  <p style={{fontWeight: '600'}}>{item.HoTen}</p>
                  <p>{item.DiaChiCT ? `ĐC: ${item.DiaChiCT}` : ''}</p>
                  <p>{item.CMND ? `CMND/CCCD: ${item.CMND}` : ''}</p>
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
      width: '35%',
    },

    {
      title: 'Loại đơn',
      dataIndex: 'TenLoaiKhieuTo',
      align: 'left',
      width: '10%',
    },

    {
      title: 'Ngày tiếp nhận',
      align: 'left',
      width: '10%',
      render: (text, record) =>
        record.NgayTiepNhan
          ? moment(record.NgayTiepNhan).format('DD/MM/YYYY')
          : null,
    },

    // {
    //   title: 'Thao tác',
    //   width: '5%',
    //   align: 'center',
    //   render: (text, record) => renderThaoTac(record),
    // },
  ];

  return (
    <LayoutWrapper>
      <PageWrap>
        <PageHeader>Xóa đơn thư lỗi</PageHeader>
        <PageAction>
          <Button
            type="primary"
            onClick={showModalChiTietDonThu}
            disabled={!(selectedRowsKey.length === 1)}
          >
            <PlusOutlined />
            Xem chi tiết đơn thư
          </Button>
          {role.delete ? (
            <Button
              type="primary"
              disabled={!(selectedRowsKey.length === 1)}
              onClick={deleteDonThuLoi}
              icon={<DeleteOutlined />}
              loading={confirmLoading}
            >
              Xóa
            </Button>
          ) : null}
        </PageAction>
      </PageWrap>
      <Box>
        <BoxFilter isCenter={true}>
          <Select
            style={{width: '200px'}}
            defaultValue={filterData?.LoaiKhieuToID?.toString()}
            placeholder={'Chọn loại đơn'}
            allowClear
            onChange={(value) => onFilter(value, 'LoaiKhieuToID')}
          >
            {DanhSachLoaiKhieuTo
              ? DanhSachLoaiKhieuTo.map((item) => (
                  <Option value={item.LoaiKhieuToID.toString()}>
                    {item.TenLoaiKhieuTo}
                  </Option>
                ))
              : null}
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
          <FilterTime onFilter={onFilter} filterData={filterData} />
          <InputSearch
            defaultValue={filterData.Keyword}
            placeholder={'Nhập tên chủ đơn hoặc nội dung đơn'}
            style={{width: 300}}
            onSearch={(value) => onFilter(value, 'Keyword')}
            allowClear
          />
        </BoxFilter>
        <BoxTable
          columns={columns}
          loading={tableLoading}
          rowSelection={rowSelection}
          dataSource={newDanhSachDonThuLoi}
          onChange={onTableChange}
          pagination={{
            showSizeChanger: true,
            showTotal: (total, range) =>
              `Từ ${range[0]} đến ${range[1]} trên ${total} kết quả`,
            total: TotalRow,
            current: PageNumber,
            pageSize: PageSize,
          }}
          rowKey={(record) => record.EmailID}
        />
      </Box>
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
    ...state.XoaDonThuLoi,
    role: getRoleByKey(state.Auth.role, 'delete'),
  };
}

export default connect(mapStateToProps, actions)(XoaDonThuLoi);
