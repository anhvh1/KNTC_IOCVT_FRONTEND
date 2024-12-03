import {Modal, Table, Tabs, Tooltip, message} from 'antd';
import {DatePicker} from '../../../../components/uielements/exportComponent';
import React, {useState, useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import actions from '../../../redux/NghiepVu/QuanLyDonThuCanDonDoc/actions';
import LayoutWrapper from '../../../../components/utility/layoutWrapper';
import PageHeader from '../../../../components/utility/pageHeader';
import PageAction from '../../../../components/utility/pageAction';
import Box from '../../../../components/utility/box';
import BoxFilter from '../../../../components/utility/boxFilter';
import BoxTable from '../../../../components/utility/boxTable';
import Checkbox from '../../../../components/uielements/checkbox';
import Select from '../../../../components/uielements/select';
import Wrapper from './QuanLyDonThuCanDonDoc.styled';
import {Input} from 'antd';
import dayjs from 'dayjs';
import {useSelector, useDispatch} from 'react-redux';
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
  mapFileToPromiseArray,
} from '../../../../helpers/utility';
import {useKey} from '../../../CustomHook/useKey';
import queryString from 'query-string';
import api from './config';
import ModalAddEdit from './modalAddEdit';
import {
  DeleteOutlined,
  EditOutlined,
  ExportOutlined,
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
import {exportExcel} from '../../../../helpers/utility';
import BoxExcel from './boxExcel';
import {TreeSelect} from '../../../../components/uielements/exportComponent';
import actionsCoQuan from '../../../redux/DanhMuc/DMCoQuan/actions';
import moment from 'moment';
import FilterTime from '../Shared/Component/BoxFilterTime';
import PageWrap from '../../../../components/utility/PageWrap';
const DanhSachDonThuCanDonDoc = (props) => {
  document.title = 'Danh sách đơn thư cần đôn đốc';
  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search),
  );
  const [dataModalAddEdit, setDataModalAddEdit] = useState({});
  const [visibleModalAddEdit, setVisibleModalAddEdit] = useState(false);
  const [action, setAction] = useState('');
  const [modalKey, inceaseModalKey] = useKey();
  const [selectedRowsKey, setSelectedRowsKey] = useState([]);
  const [loading, setLoading] = useState(false);
  const [visibleModalChiTietDonThu, setVisibleModalChiTietDonThu] =
    useState(false);
  const [keyModalChiTietDonThu, setKeyModalChiTietDonThu] = useState(0);
  const [dataModalChiTietDonThu, setDataModalChiTietDonThu] = useState({});
  const dispatch = useDispatch();
  const excelRef = useRef();

  const showModalChiTietDonThu = () => {
    const XuLyDonID = selectedRowsKey[0];
    const DonThuID = DanhSachDonThuCanDonDoc?.find(
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
    }
  }, []);

  const closeModalChiTietDonThu = () => {
    setDataModalChiTietDonThu({});
    setVisibleModalChiTietDonThu(false);
  };

  const {
    DanhSachDonThuCanDonDoc,
    DanhSachHuongXuLy,
    DanhSachExcel,
    DanhSachLoaiKhieuTo,
    TotalRow,
    tableLoading,
    role,
  } = props;
  const {DanhSachCoQuan} = useSelector((state) => state.DMCoQuan);
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

  const showModalAdd = (TrangThaiID) => {
    const XuLyDonID = selectedRowsKey[0];
    setAction('add');
    inceaseModalKey();
    setVisibleModalAddEdit(true);
  };

  const hideModalAddEdit = () => {
    setDataModalAddEdit({});
    setVisibleModalAddEdit(false);
  };

  const submitModalAddEdit = (data) => {
    setLoading(true);
    const LoaiFile = {
      FileType: LoaiFileDinhKem.FileVBDonDoc,
    };
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
      api.CapNhatVBDonDoc(data).then((res) => {
        setLoading(false);
        if (!res || !res.data || res.data.Status !== 1) {
          message.error(
            `${res && res.data ? res.data.Message : 'Lỗi hệ thống'}`,
          );
        } else {
          message.success(res.data.Message);
          hideModalAddEdit();
          props.getInitData(filterData);
        }
      });
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
          </div>
        );
      },
      onChange: (selectedRowkey) => {
        setSelectedRowsKey(selectedRowkey);
      },
    };
    const newDanhSachDonThuCanDonDoc = DanhSachDonThuCanDonDoc?.map((item) => ({
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
          dataSource={newDanhSachDonThuCanDonDoc}
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
    return (
      <BoxFilter isCenter={true}>
        <FilterTime onFilter={onFilter} filterData={filterData} />
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
          value={
            filterData.TrangThaiXuLyID
              ? Number(filterData.TrangThaiXuLyID)
              : null
          }
          placeholder={'Chọn trạng thái xử lý'}
          allowClear
          onChange={(value) => onFilter(value, 'TrangThaiXuLyID')}
        >
          <Option value={1}>Chưa xử lý</Option>
          <Option value={4}>Đã xử lý</Option>
          <Option value={2}>Chưa giải quyết</Option>
          <Option value={3}>Đang giải quyết</Option>
          <Option value={5}>Đã giải quyết</Option>
        </Select>
        <Select
          style={{width: '200px'}}
          value={filterData.HuongXuLyID}
          placeholder={'Chọn hướng xử lý'}
          allowClear
          onChange={(value) => onFilter(value, 'HuongXuLyID')}
        >
          {DanhSachHuongXuLy
            ? DanhSachHuongXuLy.map((item) => (
                <Option
                  value={item.HuongGiaiQuyetID?.toString()}
                  key={item.HuongGiaiQuyetID}
                >
                  {item.TenHuongGiaiQuyet}
                </Option>
              ))
            : null}
        </Select>
        <Select
          style={{width: '200px'}}
          value={filterData.LoaiKhieuToID?.toString()}
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

        <InputSearch
          allowClear
          defaultValue={filterData?.Keyword}
          placeholder={'Nhập tên chủ đơn hoặc nội dung cần tìm'}
          style={{width: 300}}
          onSearch={(value) => onFilter(value, 'Keyword')}
        />
      </BoxFilter>
    );
  };

  const printExcel = () => {
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
      title: 'Nguồn đơn đến',
      dataIndex: 'NguonDonDen',
      align: 'left',
      width: '10%',
      render: (text, record, index) => (
        <p style={{color: record.TrangThaiQuaHan === 1 ? 'red' : ''}}>
          {record.NguonDonDen}
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
      dataIndex: 'PhanLoai',
      align: 'left',
      width: '10%',
      render: (text, record, index) => (
        <p style={{color: record.TrangThaiQuaHan === 1 ? 'red' : ''}}>
          {record.PhanLoai}
        </p>
      ),
    },

    {
      title: 'Hướng xử lý',
      dataIndex: 'TenHuongXuLy',
      align: 'left',
      width: '10%',
      render: (text, record, index) => (
        <p style={{color: record.TrangThaiQuaHan === 1 ? 'red' : ''}}>
          {record.TenHuongXuLy}
        </p>
      ),
    },
    {
      title: 'Cơ quan xử lý',
      dataIndex: 'TenCoQuan',
      align: 'center',
      width: '10%',
      render: (text, record, index) => (
        <p style={{color: record.TrangThaiQuaHan === 1 ? 'red' : ''}}>
          {record.TenCoQuan}
        </p>
      ),
    },
    {
      title: 'Hạn xử lý',
      dataIndex: 'HanXuLy',
      align: 'center',
      width: '10%',
      render: (text, record, index) => (
        <p style={{color: record.TrangThaiQuaHan === 1 ? 'red' : ''}}>
          {record.HanXuLy ? dayjs(record.HanXuLy).format('DD/MM/YYYY') : null}
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
    {
      title: 'Trạng thái đôn đốc',
      dataIndex: 'TenTrangThaiDonDoc',
      align: 'left',
      width: '10%',
      render: (text, record, index) => (
        <p style={{color: record.TrangThaiQuaHan === 1 ? 'red' : ''}}>
          {record.TenTrangThaiDonDoc}
        </p>
      ),
    },
  ];

  return (
    <LayoutWrapper>
      <PageWrap>
        <PageHeader>Danh sách đơn thư cần đôn đốc</PageHeader>
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
              Ra VB đôn đốc
            </Button>
          ) : null}
          <Button
            className="btn-center"
            type="primary"
            onClick={() => printExcel()}
            disabled={!DanhSachDonThuCanDonDoc?.length}
          >
            <ExportOutlined />
            Xuất Excel
          </Button>
        </PageAction>
      </PageWrap>
      <Box>
        <Wrapper>{handleRenderContentKhieuNai()}</Wrapper>
      </Box>
      <BoxExcel DanhSachDonThuCanDonDoc={DanhSachExcel} excelRef={excelRef} />
      <ModalAddEdit
        visible={visibleModalAddEdit}
        dataEdit={dataModalAddEdit}
        action={action}
        loading={loading}
        key={modalKey}
        onCreate={submitModalAddEdit}
        onCancel={hideModalAddEdit}
        dataSource={DanhSachDonThuCanDonDoc}
        DanhSachHuongXuLy={DanhSachHuongXuLy}
        XuLyDonID={selectedRowsKey[0]}
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
    ...state.QuanLyDonThuCanDonDoc,
    role: getRoleByKey(state.Auth.role, 'don-doc'),
  };
}

export default connect(mapStateToProps, actions)(DanhSachDonThuCanDonDoc);
