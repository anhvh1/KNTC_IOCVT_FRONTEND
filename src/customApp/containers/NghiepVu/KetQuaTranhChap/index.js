import {Modal, Table, Tabs, Tooltip, message} from 'antd';
import {DatePicker} from '../../../../components/uielements/exportComponent';
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import actions from '../../../redux/NghiepVu/KetQuaTranhChap/actions';
import LayoutWrapper from '../../../../components/utility/layoutWrapper';
import PageHeader from '../../../../components/utility/pageHeader';
import PageAction from '../../../../components/utility/pageAction';
import Box from '../../../../components/utility/box';
import BoxFilter from '../../../../components/utility/boxFilter';
import BoxTable from '../../../../components/utility/boxTable';
import Checkbox from '../../../../components/uielements/checkbox';
import Select from '../../../../components/uielements/select';
import Wrapper from './KetQuaTranhChap.styled';
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
  mapFileToPromiseArray,
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
import PageWrap from '../../../../components/utility/PageWrap';
const QLHoSoDonThu = (props) => {
  document.title = 'Kết quả tranh chấp';
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

  const showModalChiTietDonThu = () => {
    const XuLyDonID = selectedRowsKey[0];
    const DonThuID = DanhSachKetQuaTranhChap?.find(
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

  const {
    DanhSachKetQuaTranhChap,
    DanhSachHuongXuLy,
    DanhSachCanBo,
    DanhSachCoQuan,
    TotalRow,
    tableLoading,
    role,
  } = props;

  useEffect(() => {
    changeUrlFilter(filterData);
    props.getInitData(filterData);
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

  const showModalAdd = () => {
    const XuLyDonID = selectedRowsKey[0];
    api
      .ChiTietKetQua({XuLyDonID})
      .then((res) => {
        if (res.data.Status > 0) {
          setDataModalAddEdit({isViewDetails: true, ...res.data.Data});
          inceaseModalKey();
          setVisibleModalAddEdit(true);
        } else {
          message.destroy();
          message.error(res.data.Message);
        }
      })
      .catch((error) => {
        message.destroy();
        message.error(error.toString());
      });
  };

  const closeModalChuyenDon = () => {
    setVisibleModalChuyenDon(false);
  };

  const hideModalAddEdit = () => {
    // setAction("");
    // setSelectedRowsKey([]);
    setDataModalAddEdit({});
    setVisibleModalAddEdit(false);
  };

  const submitModalAddEdit = (data) => {
    setLoading(true);
    const XuLyDonID = selectedRowsKey[0];
    data.XuLyDonID = XuLyDonID;
    const LoaiFile = {
      FileType: LoaiFileDinhKem.FileKetQuaTranhChap,
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
      api.Save(data).then((res) => {
        setLoading(false);
        if (!res || !res.data || res.data.Status !== 1) {
          message.error(
            `${res && res.data ? res.data.Message : 'Lỗi hệ thống'}`,
          );
        } else {
          message.success(res.data.Message);
          hideModalAddEdit();
          props.getInitData(filterData);
          setSelectedRowsKey([]);
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

              // visibility: 'visible',
            }}
            // onClick={(event) => handleIconClick(event, record)}
          >
            <UnorderedListOutlined
              className="ant-icon__table"
              // onClick={(event) => handleIconClick(event, record)}
              // onClick={() => setSelectedRowsKey([record.XuLyDonID])}
              style={{marginRight: 4, fontSize: 14, visibility: 'hidden'}}
            />
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
    const newDanhSachKetQuaTranhChap = DanhSachKetQuaTranhChap?.map((item) => ({
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
          dataSource={newDanhSachKetQuaTranhChap}
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
        <Select
          style={{width: '200px'}}
          value={filterData.TrangThai ? Number(filterData.TrangThai) : null}
          placeholder={'Chọn trạng thái'}
          allowClear
          onChange={(value) => onFilter(value, 'TrangThai')}
        >
          <Option value={1} key={1}>
            Chưa có kết quả
          </Option>
          <Option value={2} key={2}>
            Đã có kết quả
          </Option>
        </Select>
        <InputSearch
          allowClear
          defaultValue={filterData?.Keyword}
          placeholder={'Nhập tên chủ đơn hoặc nội dung đơn'}
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
      dataIndex: 'NgayPhan',
      align: 'left',
      width: '10%',
      render: (text, record, index) => (
        <p style={{color: record.TrangThaiQuaHan === 1 ? 'red' : ''}}>
          {record.NgayPhan ? dayjs(record.NgayPhan).format('DD/MM/YYYY') : null}
        </p>
      ),
    },

    {
      title: 'Trạng thái',
      dataIndex: 'TrangThai',
      align: 'center',
      width: '10%',
      render: (text, record, index) => (
        <p style={{color: record.TrangThaiQuaHan === 1 ? 'red' : ''}}>
          {record.TrangThaiStr}
        </p>
      ),
    },
  ];

  return (
    <LayoutWrapper>
      <PageWrap>
        <PageHeader>Kết quả tranh chấp</PageHeader>
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
              Nhập kết quả
            </Button>
          ) : null}
        </PageAction>
      </PageWrap>
      <Box>
        <Wrapper>{handleRenderContentKhieuNai()}</Wrapper>
      </Box>
      <ModalAddEdit
        visible={visibleModalAddEdit}
        dataEdit={dataModalAddEdit}
        action={action}
        loading={loading}
        key={modalKey}
        onCreate={submitModalAddEdit}
        onCancel={hideModalAddEdit}
        dataSource={DanhSachKetQuaTranhChap}
        DanhSachHuongXuLy={DanhSachHuongXuLy}
        XuLyDonID={selectedRowsKey[0]}
        DanhSachCanBo={DanhSachCanBo}
        DanhSachCoQuan={DanhSachCoQuan}
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
    ...state.KetQuaTranhChap,
    role: getRoleByKey(state.Auth.role, 'ket-qua-tranh-chap'),
  };
}

export default connect(mapStateToProps, actions)(QLHoSoDonThu);
