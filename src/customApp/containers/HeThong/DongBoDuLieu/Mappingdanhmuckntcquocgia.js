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
import {connect} from 'react-redux';
import actions from '../../../redux/DanhMuc/DanhMucDanToc/action';
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
  Option,
  Select,
} from '../../../../components/uielements/exportComponent';
import {
  changeUrlFilter,
  getDefaultPageSize,
  getFilterData,
  getRoleByKey,
  _debounce,
} from '../../../../helpers/utility';
import {useKey} from '../../../CustomHook/useKey';
import queryString from 'query-string';
import api from './config';
import {DeleteOutlined, EditOutlined, PlusOutlined} from '@ant-design/icons';
import {CheckboxGroup} from '../../../../components/uielements/checkbox';
import {ITEM_LAYOUT} from '../../../../settings/constants';
import Wrapper from './Mappingdanhmuckntcquocgia.styled';
const {Item} = Form;
const LichSuDongBo = (props) => {
  const {
    filterData,
    setFilterData,
    LoadDataCallApi,
    UpdateDataMapping,
    DanhSachDuLieuMapping,
  } = props;
  const [dataModalAddEdit, setDataModalAddEdit] = useState({});
  const [visibleModalAddEdit, setVisibleModalAddEdit] = useState(false);
  const [DanhSachDuLieuMappingUpdate, setDanhSachDuLieuMappingUpdate] =
    useState([]);
  const [newDanhSachDuLieuMapping, setDanhSachDuLieuMapping] = useState([]);
  const [action, setAction] = useState('');
  const [modalKey, inceaseModalKey] = useKey();
  const [selectedRowsKey, setSelectedRowsKey] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [loaiDongBo, setLoaiDongBo] = useState(1);

  const onTableChange = (pagination, filters, sorter) => {
    let oldFilterData = filterData;
    let onOrder = {pagination, filters, sorter};
    let newFilterData = getFilterData(oldFilterData, null, onOrder);

    setFilterData(newFilterData);
  };

  useEffect(() => {
    setDanhSachDuLieuMapping(DanhSachDuLieuMapping);
  }, [DanhSachDuLieuMapping]);

  const onFilter = (value, property) => {
    let oldFilterData = filterData;
    let onFilter = {value, property};
    let newfilterData = getFilterData(oldFilterData, onFilter, null);
    //get filter data
    setFilterData(newfilterData);
  };

  const handleChangedMaMapping = _debounce((Ma, MappingCode) => {
    const newDanhSachDuLieuMapping = [...DanhSachDuLieuMapping];
    const newDanhSachDuLieuMappingUpdate = [...DanhSachDuLieuMappingUpdate];

    const obj = newDanhSachDuLieuMapping.find((item) => item.Ma === Ma);
    obj.MappingCode = MappingCode;
    if (!newDanhSachDuLieuMappingUpdate.find((item) => item.Ma === obj.Ma)) {
      newDanhSachDuLieuMappingUpdate.push(obj);
    }
    setDanhSachDuLieuMappingUpdate(newDanhSachDuLieuMappingUpdate);
  }, 300);

  const {TotalRow, role} = props;
  const PageNumber = filterData.PageNumber
    ? parseInt(filterData.PageNumber)
    : 1;
  const PageSize = filterData.PageSize
    ? parseInt(filterData.PageSize)
    : getDefaultPageSize();

  const columns = [
    {
      title: 'STT',
      //   width: 5,
      width: '10%',
      align: 'center',
      render: (text, record, index) => (
        <span>{(PageNumber - 1) * PageSize + (index + 1)}</span>
      ),
    },
    {
      title: 'Mã trên KNTC',
      dataIndex: 'Ma',
      align: 'left',
      width: '30%',
      //   width: 20,
    },
    {
      title: 'Tên trên KNTC',
      dataIndex: 'Ten',
      align: 'left',
      width: '30%',
      //   width: 35,
    },
    {
      title: 'Mã mapping',
      dataIndex: 'MappingCode',
      width: '30%',
      align: 'left',
      //   width: 40,
      render: (text, record, index) => {
        return (
          <Input
            disabled={!role?.add}
            defaultValue={record.MappingCode}
            onChange={(e) => handleChangedMaMapping(record.Ma, e.target.value)}
          />
        );
      },
    },
  ];

  const Columns2 = [
    {
      title: 'STT',
      // width: 30,
      align: 'center',
      render: (text, record, index) => (
        <span>{(PageNumber - 1) * PageSize + (index + 1)}</span>
      ),
    },
    {
      title: 'Mã trên API',
      dataIndex: 'MaAPI',
    },
    {
      title: 'Tên trên API',
      dataIndex: 'TenAPI',
    },
  ];

  const {DanhSachAnhXa, DanhSachDuLieuMapping2} = props;

  return (
    <Wrapper>
      <LayoutWrapper>
        <Box>
          <Row>
            <Col xs={24} md={16}>
              <BoxFilter>
                <div className="filter-item">
                  <p className="label">Loại danh mục ánh xạ : </p>
                  <Select
                    style={{width: '300px'}}
                    defaultValue={filterData.TypeApi}
                    onChange={(value) => onFilter(value, 'TypeApi')}
                  >
                    {DanhSachAnhXa
                      ? DanhSachAnhXa.map((item) => (
                          <Option value={item.Ma}>{item.Ten}</Option>
                        ))
                      : null}
                  </Select>
                </div>
              </BoxFilter>
              <BoxTable
                loading={props.loading}
                columns={columns}
                dataSource={newDanhSachDuLieuMapping}
                onChange={onTableChange}
                pagination={false}
              />
            </Col>
            <Col xs={24} md={8}>
              <BoxFilter>
                {role?.add ? (
                  <Button
                    onClick={LoadDataCallApi}
                    disabled={!filterData.TypeApi}
                  >
                    Tất cả dữ liệu & call api
                  </Button>
                ) : null}
                {role?.add ? (
                  <Button
                    style={{marginLeft: '10px'}}
                    disabled={!filterData.TypeApi}
                    onClick={() =>
                      UpdateDataMapping(DanhSachDuLieuMappingUpdate)
                    }
                  >
                    Cập nhật dữ liệu mapping
                  </Button>
                ) : null}
              </BoxFilter>
              <BoxTable
                columns={Columns2}
                dataSource={DanhSachDuLieuMapping2}
                onChange={onTableChange}
                scroll={{
                  x: 400,
                }}
                pagination={false}
              />
            </Col>
          </Row>
        </Box>
      </LayoutWrapper>
    </Wrapper>
  );
};

function mapStateToProps(state) {
  return {
    ...state.ReducerDanToc,
  };
}

export default connect(mapStateToProps, actions)(LichSuDongBo);
