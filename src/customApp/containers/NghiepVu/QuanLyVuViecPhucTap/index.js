import {Modal, Table, Tabs, Tooltip, message} from 'antd';
import React, {useState, useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import actions from '../../../redux/NghiepVu/QuanLyVuViecPhucTap/actions';
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
import {LoaiFileDinhKem} from '../../../../settings/constants';
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
import {
  CheckOutlined,
  FileExcelOutlined,
  PrinterOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import tablePrintCss from './tablePrint.style';
import Preview from '../../../../image/preview.png';
import PreviewWhite from '../../../../image/preview_wihte.png';
import {handleTextLong} from '../../../../helpers/utility';
import ModalChiTietDonThu from '../Shared/Modal/ModalChiTietDonThu';
import {printComponent} from '../../../../helpers/utility';
import BoxExcel from './boxExcel';
import {exportExcel} from '../../../../helpers/utility';
import PageWrap from '../../../../components/utility/PageWrap';

const QuanLyVuViecPhucTap = (props) => {
  document.title = 'Quản lý vụ việc phức tạp';
  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search),
  );
  const [selectedRowsKey, setSelectedRowsKey] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [visibleModalChiTietDonThu, setVisibleModalChiTietDonThu] =
    useState(false);
  const [keyModalChiTietDonThu, setKeyModalChiTietDonThu] = useState(0);
  const [dataModalChiTietDonThu, setDataModalChiTietDonThu] = useState({});
  const printRef = useRef();
  const excelRef = useRef();
  const {role} = props;
  const showModalChiTietDonThu = () => {
    const DonThuID = selectedRowsKey[0];
    const XuLyDonID = DanhSachVuViec?.find(
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

  const {
    DanhSachVuViec,
    DanhSachLoaiKhieuTo,
    TotalRow,
    tableLoading,
    DanhSachExcel,
  } = props;

  useEffect(() => {
    changeUrlFilter(filterData);
    props.getList(filterData);
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

  const DanhDauVuViecPhucTap = () => {
    Modal.confirm({
      title: 'Thông báo',
      content:
        'Đơn thư đã đánh dấu được chuyển vào danh sách các vụ việc phức tạp, kéo dài. Bạn có chắc chắn muốn thực hiện hay không?',
      cancelText: 'Không',
      okText: 'Có',
      onOk: () => {
        setConfirmLoading(true);
        api
          .DanhDauVuViecPhucTap({DanhSachDonThuID: selectedRowsKey})
          .then((res) => {
            setConfirmLoading(false);
            if (res.data.Status > 0) {
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

  const exportPdf = () => {
    const html = `<style>${tablePrintCss}</style>` + printRef.current.innerHTML;
    printComponent(html);
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
              // onClick={() => setSelectedRowsKey([record.DonThuID])}
              style={{marginRight: 4, fontSize: 14, visibility: 'hidden'}}
            />
            <div>
              <Checkbox
                // disabled={record?.TrangThaiID === 1}
                className="selected__table"
                checked={selectedRowsKey.includes(record.DonThuID)}
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
    const newDanhSachVuViec = DanhSachVuViec?.map((item) => ({
      ...item,
      key: item?.DonThuID,
    }));

    return (
      <>
        {handleRenderBoxFilter()}
        {/* {Number(filterData.tabsKey) !== 2 ? `Tổng số vụ việc:` : null} */}
        <BoxTable
          rowSelection={rowSelection}
          columns={columns}
          loading={tableLoading}
          dataSource={newDanhSachVuViec}
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
    return Number(filterData.tabsKey) !== 2 ? (
      <BoxFilter isCenter={true}>
        <Select
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
        </Select>
        <InputSearch
          allowClear
          defaultValue={filterData?.Keyword}
          placeholder={'Nhập tên chủ đơn hoặc nội dung cần tìm kiếm'}
          style={{width: 350}}
          onSearch={(value) => onFilter(value, 'Keyword')}
        />
      </BoxFilter>
    ) : null;
  };

  const exportListExcel = () => {
    const html = excelRef.current.innerHTML;
    exportExcel(html, 'Danh sách đơn thư');
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
      title: 'Loại đơn',
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
      title: 'Ngày tiếp nhận',
      dataIndex: 'NgayNhapDon',
      align: 'center',
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
      title: 'Cơ quan tiếp nhận',
      dataIndex: 'CoQuanTiepNhan',
      align: 'center',
      width: '10%',
      render: (text, record, index) => (
        <p style={{color: record.TrangThaiQuaHan === 1 ? 'red' : ''}}>
          {record.TenCoQuan}
        </p>
      ),
    },
  ];

  const itemsTabs = [
    {
      key: '1',
      label: <div className="ant-tabs__title">Danh sách vụ việc phức tạp</div>,
      children: <>{handleRenderContentKhieuNai()}</>,
    },
    {
      key: '2',
      label: (
        <div className="ant-tabs__title">Danh sách vụ việc đang giải quyết</div>
      ),
      children: <>{handleRenderContentKhieuNai()}</>,
    },
  ];

  return (
    <LayoutWrapper>
      <PageWrap>
        <PageHeader>Quản lý vụ việc phức tạp</PageHeader>
        <PageAction>
          <Button
            className="btn-center"
            type="primary"
            onClick={showModalChiTietDonThu}
            disabled={!(selectedRowsKey?.length === 1)}
          >
            <img
              src={!(selectedRowsKey?.length === 1) ? Preview : PreviewWhite}
              className="btn-icon__img"
            />
            Xem chi tiết đơn thư
          </Button>

          {filterData.tabsKey !== '2' ? (
            <>
              <Button
                className="btn-center"
                type="primary"
                onClick={() => exportListExcel()}
                disabled={!DanhSachExcel?.length}
              >
                <FileExcelOutlined />
                Xuất excel
              </Button>
              <Button
                className="btn-center"
                type="primary"
                onClick={() => exportPdf()}
              >
                <PrinterOutlined />
                In Danh Sách
              </Button>
            </>
          ) : role.edit ? (
            <Button
              className="btn-center"
              type="primary"
              onClick={() => DanhDauVuViecPhucTap()}
              disabled={selectedRowsKey?.length < 1}
              icon={<CheckOutlined />}
              loading={confirmLoading}
            >
              Đánh dấu vụ việc phức tạp
            </Button>
          ) : null}
        </PageAction>
      </PageWrap>
      <Box>
        <Wrapper>
          <Tabs
            items={itemsTabs}
            defaultActiveKey="1"
            value={filterData?.tabsKey}
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
          {/* {handleRenderContentKhieuNai()} */}
        </Wrapper>
      </Box>
      <BoxExcel
        DanhSachVuViec={DanhSachExcel}
        excelRef={excelRef}
        printRef={printRef}
        // isPrint={isPrint}
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
    ...state.QLVuViecPhucTap,
    role: getRoleByKey(state.Auth.role, 'vu-viec-phuc-tap'),
  };
}

export default connect(mapStateToProps, actions)(QuanLyVuViecPhucTap);
