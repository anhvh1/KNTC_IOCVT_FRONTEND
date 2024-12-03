import {Modal, Table, Tabs, Tooltip, message} from 'antd';
import React, {useState, useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import actions from '../../../redux/HeThong/TraCuuHoSoDonThu/actions';
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
  changeUrlFilter,
  getDefaultPageSize,
  getLocalKey,
  getFilterData,
  getRoleByKey,
} from '../../../../helpers/utility';
import {useKey} from '../../../CustomHook/useKey';
import queryString from 'query-string';
import api from './config';
import {UnorderedListOutlined} from '@ant-design/icons';
import Preview from '../../../../image/preview.png';
import PreviewWhite from '../../../../image/preview_wihte.png';
import {handleTextLong} from '../../../../helpers/utility';
import ModalChiTietDonThu from '../../NghiepVu/Shared/Modal/ModalChiTietDonThu';
import PageWrap from '../../../../components/utility/PageWrap';

const QuanLyVuViecPhucTap = (props) => {
  document.title = 'Danh Sách Hồ Sơ Đơn Thư';
  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search),
  );
  const [selectedRowsKey, setSelectedRowsKey] = useState([]);
  const [visibleModalChiTietDonThu, setVisibleModalChiTietDonThu] =
    useState(false);
  const [keyModalChiTietDonThu, setKeyModalChiTietDonThu] = useState(0);
  const [dataModalChiTietDonThu, setDataModalChiTietDonThu] = useState({});

  const showModalChiTietDonThu = () => {
    const DonThuID = selectedRowsKey[0];
    const XuLyDonID = DanhSachHoSoDonThu?.find(
      (item) => item.DonThuID === DonThuID,
    )?.XuLyDonID;
    api.ChiTietDonThu2({DonThuID, XuLyDonID}).then((res) => {
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

  const {DanhSachHoSoDonThu, DanhSachLoaiKhieuTo, TotalRow, tableLoading} =
    props;

  useEffect(() => {
    changeUrlFilter(filterData);
    props.getList(filterData);
  }, [filterData]);

  useEffect(() => {
    // props.getData();
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
                checked={selectedRowsKey.includes(record.DonThuID)}
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
    const newDanhSachHoSoDonThu = DanhSachHoSoDonThu?.map((item) => ({
      ...item,
      key: item?.DonThuID,
    }));

    const tabsKey = Number(filterData.tabsKey);

    return (
      <>
        {handleRenderBoxFilter()}
        <BoxTable
          rowSelection={rowSelection}
          columns={tabsKey === 2 ? columns2 : columns}
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

  const handleRenderBoxFilter = () => {
    return Number(filterData.tabsKey) !== 2 ? (
      <BoxFilter>
        {/* <Select
          style={{width: '200px'}}
          value={filterData.LoaiKhieuToID}
          placeholder={'Chọn loại đơn'}
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
        </Select> */}
        <InputSearch
          allowClear
          defaultValue={filterData?.Keyword}
          placeholder={'Nhập nội dung vụ việc'}
          style={{width: 350}}
          onSearch={(value) => onFilter(value, 'Keyword')}
        />
      </BoxFilter>
    ) : null;
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
      title: 'Ngày tiếp nhận',
      align: 'left',
      width: '20%',
      render: (text, record, index) => (
        <div>{record?.NgayTiepNhan ? record?.NgayTiepNhan : null}</div>
      ),
    },
    {
      title: 'Nội dung vụ việc',
      dataIndex: 'NoiDungDon',
      align: 'left',
      width: '40%',
      render: (text, record, index) => (
        <Tooltip title={record.NoiDungDon}>
          <p style={{color: record.TrangThaiQuaHan === 1 ? 'red' : ''}}>
            {handleTextLong(record.NoiDungDon, 150)}
          </p>
        </Tooltip>
      ),
    },
    {
      title: 'Cơ quan tiếp nhận',
      dataIndex: 'TenCoQuanTiepNhan',
      align: 'left',
      width: '10%',
      render: (text, record, index) => (
        <p style={{color: record.TrangThaiQuaHan === 1 ? 'red' : ''}}>
          {record.TenCoQuanTiepNhan}
        </p>
      ),
    },
    {
      title: 'Cơ quan xác minh',
      dataIndex: 'TenCoQuanXacMinh',
      align: 'center',
      width: '10%',
      render: (text, record, index) => (
        <p style={{color: record.TrangThaiQuaHan === 1 ? 'red' : ''}}>
          {record.TenCoQuanXacMinh}
        </p>
      ),
    },
    {
      title: 'Trạng thái xử lý',
      dataIndex: 'TrangThaiDonThu',
      align: 'center',
      width: '10%',
      render: (text, record, index) => (
        <p style={{color: record.TrangThaiQuaHan === 1 ? 'red' : ''}}>
          {record.TrangThaiDonThu}
        </p>
      ),
    },
  ];

  const columns2 = [
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
      title: 'Ngày nộp đơn',
      dataIndex: 'NgayNopDon',
      align: 'left',
      width: '20%',
      render: (text, record, index) => (
        <div>
          {record?.NgayNopDon
            ? dayjs(record?.NgayNopDon).format('DD/MM/YYYY')
            : null}
        </div>
      ),
    },
    {
      title: 'Ngày tra cứu',
      dataIndex: 'NgayTraCuu',
      align: 'left',
      width: '20%',
      render: (text, record, index) => (
        <div>
          {record?.NgayTraCuu
            ? dayjs(record?.NgayTraCuu).format('DD/MM/YYYY')
            : null}
        </div>
      ),
    },
    // {
    //   title: 'Nội dung vụ việc',
    //   dataIndex: 'NoiDungDon',
    //   align: 'left',
    //   width: '40%',
    //   render: (text, record, index) => (
    //     <Tooltip title={record.NoiDungDon}>
    //       <p style={{color: record.TrangThaiQuaHan === 1 ? 'red' : ''}}>
    //         {handleTextLong(record.NoiDungDon, 150)}
    //       </p>
    //     </Tooltip>
    //   ),
    // },
    {
      title: 'Chủ đơn',
      dataIndex: 'ChuDon',
      align: 'left',
      width: '40%',
      render: (text, record, index) => (
        <p style={{color: record.TrangThaiQuaHan === 1 ? 'red' : ''}}>
          {record.ChuDon}
        </p>
      ),
    },
    {
      title: 'CCCD',
      dataIndex: 'CCCD',
      align: 'center',
      width: '20%',
      render: (text, record, index) => (
        <p style={{color: record.TrangThaiQuaHan === 1 ? 'red' : ''}}>
          {record.CCCD}
        </p>
      ),
    },
  ];

  const itemsTabs = [
    {
      key: '1',
      label: (
        <div className="ant-tabs__title">
          Danh sách hồ sơ đơn thư được tra cứu
        </div>
      ),
      children: <>{handleRenderContentKhieuNai()}</>,
    },
    {
      key: '2',
      label: (
        <div className="ant-tabs__title">Danh sách lịch sử tra cứu hồ sơ</div>
      ),
      children: <>{handleRenderContentKhieuNai()}</>,
    },
  ];

  return (
    <LayoutWrapper>
      <PageWrap>
        <PageHeader>Danh sách hồ sơ đơn thư</PageHeader>
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
        </PageAction>
      </PageWrap>
      <Box>
        <Wrapper>
          <Tabs
            items={itemsTabs}
            defaultActiveKey="1"
            activeKey={filterData?.tabsKey?.toString()}
            onChange={(value) => {
              const newFilterData = {...filterData};
              for (const key in newFilterData) {
                if (Object.hasOwnProperty.call(newFilterData, key)) {
                  if (newFilterData[key] !== 'Status') {
                    newFilterData[key] = null;
                  }
                }
              }
              setSelectedRowsKey([]);
              if (value === '2') {
                setFilterData({
                  ...newFilterData,
                  tabsKey: value,
                });
              } else {
                setFilterData({
                  ...newFilterData,
                  tabsKey: value,
                });
              }
            }}
          ></Tabs>
        </Wrapper>
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
    ...state.TraCuuHoSoDonThu,
    role: getRoleByKey(state.Auth.role, 'tra-cuu-trang-thai-hs'),
  };
}

export default connect(mapStateToProps, actions)(QuanLyVuViecPhucTap);
