import {Modal, Table, Tooltip, message, Tabs, Input} from 'antd';
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
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
  DatePicker,
  InputSearch,
} from '../../../../components/uielements/exportComponent';
import Wrapper from './index.styled';
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
import DonThu from './danhsachdonthu';
import LichSuDongBo from './lichsudongbo';
import MappingDanhMucKNTCQuocGia from './Mappingdanhmuckntcquocgia';
import dayjs from 'dayjs';
import FilterTime from '../../NghiepVu/Shared/Component/BoxFilterTime';
import PageWrap from '../../../../components/utility/PageWrap';
const DongBoDuLieu = (props) => {
  document.title = 'Đồng Bộ Dữ Liệu';
  const firstDayOfMonth = dayjs().startOf('month');
  const currentDate = dayjs();
  const [filterData, setFilterData] = useState({
    ...queryString.parse(props.location.search),
    TuNgay: firstDayOfMonth.format('YYYY/MM/DD'),
    DenNgay: currentDate.format('YYYY/MM/DD'),
  });
  const [dataModalAddEdit, setDataModalAddEdit] = useState({});
  const [visibleModalAddEdit, setVisibleModalAddEdit] = useState(false);
  const [DanhSachDuLieuMapping, setDanhSachDuLieuMapping] = useState([]);
  const [DanhSachDuLieuMapping2, setDanhSachDuLieuMapping2] = useState([]);
  const [loadingMapping, setLoadingMapping] = useState(false);
  const [action, setAction] = useState('');
  const [modalKey, inceaseModalKey] = useKey();
  const [selectedRowsKey, setSelectedRowsKey] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [activeKey, setActiveKey] = useState('1');

  useEffect(() => {
    changeUrlFilter(filterData);
    // props.getData(filterData);
    if (filterData.key) {
      setActiveKey(filterData.key);
    } else {
      setFilterData({...filterData, key: activeKey});
    }
  }, [filterData]);

  useEffect(() => {
    props.getInit(filterData);
  }, []);

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

  const showModalAdd = () => {
    setAction('add');
    setDataModalAddEdit({});
    inceaseModalKey();
    setVisibleModalAddEdit(true);
  };

  const UpdateStateReport = (DanhSachDonThu) => {
    api
      .CapNhatTrangThaiDon({...filterData, DanhSachDonThu})
      .then((res) => {
        if (res.data.Status > 0) {
          message.destroy();
          message.success(res.data.Message);
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

  const TickSync = (DanhSachDonThu) => {
    api
      .DanhDauDongBo({...filterData, DanhSachDonThu})
      .then((res) => {
        if (res.data.Status > 0) {
          message.destroy();
          message.success(res.data.Message);
          CallSyncDataByDay();
          setSelectedRowsKey([]);
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

  const handleCallApiByActiveKey = (key) => {
    switch (key) {
      case 1:
        break;
      case 2:
        break;
      case 3:
        break;
    }
  };

  const LoadDataCallApi = () => {
    setLoadingMapping(true);
    api
      .TaiDuLieuCallApi({
        ...filterData,
      })
      .then((res) => {
        setLoadingMapping(false);
        if (res.data.Status > 0) {
          message.destroy();
          message.success(res.data.Message);
          setDanhSachDuLieuMapping(res.data.Data);
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

  const UpdateDataMapping = (DuLieu) => {
    setLoadingMapping(true);
    api
      .CapNhatDuLieuMapping({TypeApi: filterData?.TypeApi, DuLieu})
      .then((res) => {
        setLoadingMapping(false);
        if (res.data.Status > 0) {
          message.destroy();
          message.success(res.data.Message);
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

  const CallSyncDataByDay = (key) => {
    const currentKey = key ? key : filterData.key;
    if (Number(currentKey) === 3) {
      props.getDanhMucKNTCQuocGia({
        ...filterData,
      });
    } else {
      props.getList({
        ...filterData,
      });
    }
  };

  const {DanhSachAnhXa, DanhSachDonThu, DanhSachLichSuDongBo, role} = props;

  return (
    <Wrapper>
      <LayoutWrapper>
        <PageWrap>
          <PageHeader>Đồng bộ dữ liệu</PageHeader>
        </PageWrap>
        <Box>
          {role?.add ? (
            <div style={{marginBottom: '10px'}}>
              <Checkbox>Tự động đồng bộ</Checkbox>
            </div>
          ) : null}
          <div className="filter-time">
            <FilterTime onFilter={onFilter} filterData={filterData} />
            <div className="filter-time__item">
              <div>
                <Button type="primary" onClick={CallSyncDataByDay}>
                  Tìm kiếm
                </Button>
              </div>
            </div>
          </div>
          <Tabs
            activeKey={activeKey}
            onChange={(activeKey) => {
              setFilterData({});
              onFilter(activeKey, 'key');
              setDanhSachDuLieuMapping([]);
              handleCallApiByActiveKey(activeKey);
              // CallSyncDataByDay(activeKey)
            }}
          >
            <Tabs.TabPane tab="Danh sách đơn thư" key="1">
              <DonThu
                DanhSachDonThu={DanhSachDonThu ? DanhSachDonThu : []}
                filterData={filterData}
                setFilterData={setFilterData}
                selectedRowsKey={selectedRowsKey}
                setSelectedRowsKey={setSelectedRowsKey}
                TickSync={TickSync}
                role={role}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Lịch sử đồng bộ" key="2">
              <LichSuDongBo
                filterData={filterData}
                DanhSachLichSuDongBo={DanhSachLichSuDongBo}
                setFilterData={setFilterData}
                updateStateReport={UpdateStateReport}
                role={role}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Mapping danh mục KNTC Quốc gia" key="3">
              <MappingDanhMucKNTCQuocGia
                loading={loadingMapping}
                DanhSachAnhXa={DanhSachAnhXa}
                filterData={filterData}
                setFilterData={setFilterData}
                DanhSachDuLieuMapping={DanhSachDuLieuMapping}
                DanhSachDuLieuMapping2={DanhSachDuLieuMapping2}
                LoadDataCallApi={LoadDataCallApi}
                UpdateDataMapping={UpdateDataMapping}
                role={role}
              />
            </Tabs.TabPane>
          </Tabs>
        </Box>
      </LayoutWrapper>
    </Wrapper>
  );
};

function mapStateToProps(state) {
  return {
    ...state.DongBoDuLieu,
    role: getRoleByKey(state.Auth.role, 'dong-bo-du-lieu'),
  };
}

export default connect(mapStateToProps, actions)(DongBoDuLieu);
