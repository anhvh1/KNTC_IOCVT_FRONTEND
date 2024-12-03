import {Modal, Table, Tooltip, message, Switch} from 'antd';
import actions from '../../../redux/HeThong/TraCuuQuyetDinhGiaiQuyet/actions';
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
import Checkbox from '../../../../components/uielements/checkbox';
import dayjs from 'dayjs';
import {Option} from '../../../../components/uielements/exportComponent';
import {DatePicker as DatePickerFormat} from '../../../../components/uielements/exportComponent';
import ModalChiTietDonThu from '../../NghiepVu/Shared/Modal/ModalChiTietDonThu';
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
import {useSelector} from 'react-redux';
import PageWrap from '../../../../components/utility/PageWrap';
const TraCuuQuyetDinhGiaiQuyet = (props) => {
  document.title = 'Tra cứu quyết định giải quyết';
  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search),
  );
  const [action, setAction] = useState('');
  const [modalKey, inceaseModalKey] = useKey();
  const [selectedRowsKey, setSelectedRowsKey] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [visibleModalChiTietDonThu, setVisibleModalChiTietDonThu] =
    useState(false);
  const [keyModalChiTietDonThu, setKeyModalChiTietDonThu] = useState(0);
  const [dataModalChiTietDonThu, setDataModalChiTietDonThu] = useState({});

  useEffect(() => {
    changeUrlFilter(filterData);
    props.getList(filterData);
  }, [filterData]);

  useEffect(() => {
    props.getList(filterData);
    // props.getInit(filterData);
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
    const DonThuID = DanhSachQuyetDinhGQ?.find(
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

  const {DanhSachQuyetDinhGQ, TotalRow, role, tableLoading} = props;

  const closeModalChiTietDonThu = () => {
    setDataModalChiTietDonThu({});
    setVisibleModalChiTietDonThu(false);
  };

  const handleChangeStatus = (value, data) => {
    api
      .UpdateTrangThaiKhoa({XuLyDonID: data.XuLyDonID, TrangThaiKhoa: value})
      .then((res) => {
        if (res.data.Status > 0) {
          message.destroy();
          message.success(res.data.Message);
          props.getList(filterData);
        } else {
          message.destroy();
          message.error(res.data.Message);
        }
      })
      .catch((err) => {
        message.destroy();
        message.error(err.toString());
      });
  };

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
      title: 'Tên quyết định',
      align: 'left',
      width: '20%',
      render: (text, record) => record.SoDonThu,
    },
    {
      title: 'Số đơn',
      align: 'left',
      width: '15%',
      render: (text, record) => record.SoDonThu,
    },
    {
      title: 'Ngày tiếp nhận',
      align: 'left',
      width: '15%',
      render: (text, record) =>
        record.NgayTiep ? dayjs(record.NgayTiep).format('DD/MM/YYYY') : null,
    },

    {
      title: 'Nội dung vụ việc',
      dataIndex: 'NoiDungDon',
      align: 'left',
      width: '35%',
    },
    {
      title: 'Trạng thái khóa',
      width: '10%',
      align: 'center',
      render: (text, record) =>
        role.edit ? (
          <Switch
            onChange={(value) => handleChangeStatus(value, record)}
            checked={record.TrangThaiKhoa}
          ></Switch>
        ) : null,
    },
  ];

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
        </div>
      );
    },
    onChange: (selectedRowkey) => {
      setSelectedRowsKey(selectedRowkey);
    },
  };
  const newDanhSachQuyetDinhGQ = DanhSachQuyetDinhGQ?.map((item) => ({
    ...item,
    key: item?.XuLyDonID,
  }));

  return (
    <LayoutWrapper>
      <PageWrap>
        <PageHeader>Tra cứu quyết định giải quyết</PageHeader>
        <PageAction>
          <Button
            type="primary"
            onClick={showModalChiTietDonThu}
            disabled={!(selectedRowsKey.length === 1)}
          >
            <PlusOutlined />
            Xem chi tiết đơn thư
          </Button>
        </PageAction>
      </PageWrap>
      <Box>
        <BoxTable
          columns={columns}
          loading={tableLoading}
          rowSelection={rowSelection}
          dataSource={newDanhSachQuyetDinhGQ}
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
    ...state.TraCuuQuyetDinhGiaiQuyet,
    role: getRoleByKey(state.Auth.role, 'tra-cuu-qd-gq'),
  };
}

export default connect(mapStateToProps, actions)(TraCuuQuyetDinhGiaiQuyet);
