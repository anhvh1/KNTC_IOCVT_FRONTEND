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
import {connect, useSelector, useDispatch} from 'react-redux';
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
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import {CheckboxGroup} from '../../../../components/uielements/checkbox';
import {ITEM_LAYOUT} from '../../../../settings/constants';
import Wrapper from './danhsachdonthu.styled';
import dayjs from 'dayjs';
const {Item} = Form;
const DanhSachDonThu = (props) => {
  const {filterData, setFilterData, TickSync} = props;
  const [dataModalAddEdit, setDataModalAddEdit] = useState({});
  const [visibleModalAddEdit, setVisibleModalAddEdit] = useState(false);
  const {DanhSachDonThu} = useSelector((state) => state.DongBoDuLieu);
  const [action, setAction] = useState('');
  const [modalKey, inceaseModalKey] = useKey();
  const {selectedRowsKey, setSelectedRowsKey} = props;
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [loaiDongBo, setLoaiDongBo] = useState(1);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(actions.getList());
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
    },
    {
      title: 'Ngày nhập đơn',
      dataIndex: 'NgayNhapDon',
      align: 'left',
      width: '10%',
      render: (text, record, index) =>
        record.NgayNhapDon
          ? dayjs(record.NgayNhapDon).format('DD/MM/YYYY')
          : null,
    },
    {
      title: 'Tên chủ đơn',
      dataIndex: 'HoTen',
      align: 'left',
      width: '10%',
    },
    {
      title: 'Nội dung',
      dataIndex: 'NoiDungDon',
      align: 'left',
      width: '50%',
    },
    {
      title: 'Loại đơn',
      dataIndex: 'TenLoaiKhieuTo',
      align: 'left',
      width: '10%',
    },
    {
      title: 'Hướng xử lý',
      width: '10%',
      dataIndex: 'TenHuongGiaiQuyet',
      align: 'center',
      margin: '15px',
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

  const handleRenderContentKhieuNai = () => {
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
                checked={selectedRowsKey.includes(record.DonThuID)}
                onChange={() => {
                  handleCheckboxChange(record);
                }}
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
    const newDanhSachDonThu = DanhSachDonThu?.map((item) => ({
      ...item,
      key: item?.DonThuID,
    }));
    return (
      <>
        <BoxTable
          rowSelection={rowSelection}
          columns={columns}
          dataSource={newDanhSachDonThu}
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
      </>
    );
  };

  const DanhSachDonThuSelected = DanhSachDonThu.filter((item) =>
    selectedRowsKey.includes(item.DonThuID),
  );

  return (
    // <Wrapper>

    //     <LayoutWrapper>
    <Wrapper>
      <BoxFilter>
        <Row gutter={[12, 12]}>
          {/* <Col xs={24} lg={11}>
            <div className={'filter-item'}>
              <div className={'label'}>Đường dẫn:</div>
              <div className={'input'}>
                <Input
                  defaultValue={filterData.URl}
                  onChange={(e) => onFilter(e.target.value, 'URl')}
                />
              </div>
            </div>
          </Col>
          <Col xs={24} lg={11}>
            <div className={'filter-item'}>
              <div className={'label'}>Mật khẩu:</div>
              <div className={'input'}>
                <Input
                  defaultValue={filterData.Password}
                  onChange={(e) => onFilter(e.target.value, 'Password')}
                />
              </div>
            </div>
          </Col>
          <Col xs={24} lg={11}>
            <div className={'filter-item'}>
              <div className={'label'}>Loại đồng bộ:</div>
              <div className={'input'}>
                <Radio.Group
                  defaultValue={
                    filterData.loaiDongBo ? Number(filterData.loaiDongBo) : null
                  }
                  onChange={(e) => onFilter(e.target.value, 'loaiDongBo')}
                >
                  <Radio value={1}>Theo Giờ</Radio>
                  <Radio value={2}>Theo Ngày Trong Tuần</Radio>
                </Radio.Group>
              </div>
            </div>
          </Col>
          <Col xs={24} lg={11}>
            <div className={'filter-item'}>
              <div className={'label'}>Giờ đồng bộ:</div>
              <div className={'input'}>
                <Input
                  defaultValue={filterData.GioDongBo}
                  onChange={(e) => onFilter(e.target.value, 'GioDongBo')}
                />
              </div>
            </div>
          </Col> */}

          {Number(filterData.loaiDongBo) === 2 && role?.add ? (
            <Col xs={24} lg={11}>
              <div className={'filter-item'}>
                <div className={'label-time'}>Từ ngày : </div>
                <div className={'input'}>
                  <CheckboxGroup
                    onChange={(value) => {
                      let str = '';
                      value.forEach((item, index) => {
                        if (index > 0) {
                          str += ';' + item.toString();
                        } else {
                          str += item.toString();
                        }
                      });
                      onFilter(str, 'NgayTrongTuan');
                    }}
                    defaultValue={filterData.NgayTrongTuan?.split(';')}
                  >
                    <Checkbox key={'2'} value={'2'}>
                      Thứ 2
                    </Checkbox>
                    <Checkbox key={'3'} value={'3'}>
                      Thứ 3
                    </Checkbox>
                    <Checkbox key={'4'} value={'4'}>
                      Thứ 4
                    </Checkbox>
                    <Checkbox key={'5'} value={'5'}>
                      Thứ 5
                    </Checkbox>
                    <Checkbox key={'6'} value={'6'}>
                      Thứ 6
                    </Checkbox>
                    <Checkbox key={'7'} value={'7'}>
                      Thứ 7
                    </Checkbox>
                    <Checkbox key={'CN'} value={'CN'}>
                      Chủ nhật
                    </Checkbox>
                  </CheckboxGroup>
                </div>
              </div>
            </Col>
          ) : null}
          <Col xs={24}>
            {role?.add ? (
              <Button
                type="primary"
                disabled={selectedRowsKey.length < 1}
                onClick={() => TickSync(DanhSachDonThuSelected)}
              >
                Đánh dấu đồng bộ
              </Button>
            ) : null}
          </Col>
        </Row>
      </BoxFilter>
      {handleRenderContentKhieuNai()}
    </Wrapper>

    //     </LayoutWrapper>
    // </Wrapper>
  );
};

function mapStateToProps(state) {
  return {
    ...state.DongBoDuLieu,
  };
}

export default connect(mapStateToProps, actions)(DanhSachDonThu);
