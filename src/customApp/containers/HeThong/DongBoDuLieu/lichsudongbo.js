import {
  Modal,
  Table,
  Tooltip,
  message,
  Row,
  Col,
  Form,
  Input,
  Radio,
} from 'antd';
import React, {useState, useEffect} from 'react';
import {connect, useDispatch} from 'react-redux';
import actions from '../../../redux/HeThong/DongBoDuLieu/actions';
import LayoutWrapper from '../../../../components/utility/layoutWrapper';
import PageHeader from '../../../../components/utility/pageHeader';
import PageAction from '../../../../components/utility/pageAction';
import Box from '../../../../components/utility/box';
import BoxFilter from '../../../../components/utility/boxFilter';
import BoxTable from '../../../../components/utility/boxTable';
import Checkbox from '../../../../components/uielements/checkbox';
import {
  Button,
  InputSearch,
} from '../../../../components/uielements/exportComponent';
import {
  changeUrlFilter,
  getDefaultPageSize,
  getFilterData,
  getRoleByKey,
} from '../../../../helpers/utility';
import {useKey} from '../../../CustomHook/useKey';
import queryString from 'query-string';
import api from './config';
import {DeleteOutlined, EditOutlined, PlusOutlined} from '@ant-design/icons';
import {CheckboxGroup} from '../../../../components/uielements/checkbox';
import {ITEM_LAYOUT} from '../../../../settings/constants';
import Wrapper from './lichsudongbo.styled';
import dayjs from 'dayjs';
const {Item} = Form;
const LichSuDongBo = (props) => {
  const {filterData, setFilterData} = props;
  const [dataModalAddEdit, setDataModalAddEdit] = useState({});
  const [visibleModalAddEdit, setVisibleModalAddEdit] = useState(false);
  const [action, setAction] = useState('');
  const [modalKey, inceaseModalKey] = useKey();
  const [selectedRowsKey, setSelectedRowsKey] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [loaiDongBo, setLoaiDongBo] = useState(1);
  const dispatch = useDispatch();

  const onTableChange = (pagination, filters, sorter) => {
    let oldFilterData = filterData;
    let onOrder = {pagination, filters, sorter};
    let newFilterData = getFilterData(oldFilterData, null, onOrder);

    setFilterData(newFilterData);
  };

  const onFilter = (value, property) => {
    let oldFilterData = filterData;
    let onFilter = {value, property};
    let newfilterData = getFilterData(oldFilterData, onFilter, null);
    //get filter data
    setFilterData(newfilterData);
  };

  const {DanhSachLichSuDongBo, TotalRow, role, updateStateReport} = props;
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
      title: 'Mã đơn thư',
      dataIndex: 'SoDonThu',
      align: 'left',
      width: '10%',
      //   width: 20,
    },
    {
      title: 'Ngày nhập đơn',
      dataIndex: 'NgayNhapDon',
      align: 'left',
      width: '10%',
      render: (text, record) => (
        <p>
          {record?.NgayNhapDon
            ? dayjs(record.NgayNhapDon).format('DD/MM/YYYY')
            : null}
        </p>
      ),
      //   width: 40,
    },
    {
      title: 'Tên chủ đơn',
      dataIndex: 'HoTen',
      align: 'left',
      width: '10%',
      //   width: 30,
      //   render: (text, record) => {
      //     return <Checkbox checked={record.TrangThai}></Checkbox>;
      //   },
    },
    {
      title: 'Nội dung',
      dataIndex: 'NoiDungDon',
      align: 'left',
      width: '50%',
      //   width: 40,
    },
    {
      title: 'Loại đơn',
      dataIndex: 'TenLoaiKhieuTo',
      width: '10%',
      align: 'left',
      //   width: 40,
    },
    {
      title: 'Hướng xử lý',
      dataIndex: 'TenHuongGiaiQuyet',
      width: '10%',
      align: 'center',
      //   render: (text, record) => renderThaoTac(record),
    },
  ];

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

  const rowSelection = {
    selectedRowsKey,
    renderCell: (checked, record, index, originNode) => {
      return (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'right',
            padding: '0 3px',
          }}
        >
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
  const newDanhSachLichSuDongBo = DanhSachLichSuDongBo?.map((item) => ({
    ...item,
    key: item?.XuLyDonID,
  }));

  return (
    <Wrapper>
      <LayoutWrapper>
        <Box>
          <BoxFilter>
            {/* {role?.add ? (
              <Button
                disabled={selectedRowsKey.length < 1}
                onClick={() => updateStateReport(DanhSachLichSuDongBo)}
                type={'primary'}
              >
                Cập nhật trạng thái đơn
              </Button>
            ) : null} */}
          </BoxFilter>
          <BoxTable
            rowSelection={rowSelection}
            columns={columns}
            dataSource={newDanhSachLichSuDongBo}
            onChange={onTableChange}
            pagination={false}
            // pagination={{
            //   showSizeChanger: true,
            //   showTotal: (total, range) =>
            //     `Từ ${range[0]} đến ${range[1]} trên ${total} kết quả`,
            //   total: TotalRow,
            //   current: PageNumber,
            //   pageSize: PageSize,
            // }}
          />
        </Box>
      </LayoutWrapper>
    </Wrapper>
  );
};

export default LichSuDongBo;
// export default connect(mapStateToProps, actions)(LichSuDongBo);
