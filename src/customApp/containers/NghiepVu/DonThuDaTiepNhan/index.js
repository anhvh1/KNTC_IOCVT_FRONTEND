import {Modal, Table, Tabs, Tooltip, message, Pagination, Spin} from 'antd';
import {DatePicker} from '../../../../components/uielements/exportComponent';
import React, {useState, useEffect, useRef} from 'react';
import {connect, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import actions from '../../../redux/NghiepVu/DonThuDaTiepNhan/actions';
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
import {HuongGiaiQuyet, LoaiFileDinhKem} from '../../../../settings/constants';
import {
  changeUrlFilter,
  getDefaultPageSize,
  getFilterData,
  getRoleByKey,
  exportExcel,
} from '../../../../helpers/utility';
import {useKey} from '../../../CustomHook/useKey';
import queryString from 'query-string';
import api from './config';
import icons from '../icons';
import {handleTextLong} from '../../../../helpers/utility';
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  PrinterOutlined,
  UnorderedListOutlined,
  FileOutlined,
} from '@ant-design/icons';
import {CheckboxGroup} from '../../../../components/uielements/checkbox';
import ModalChiTietDonThu from '../Shared/Modal/ModalChiTietDonThu';
import BoxExcel from './boxExcel';
import actionsApp from '../../../../redux/app/actions';
import moment from 'moment';
import ModalInPhieu from '../Shared/Modal/modalInPhieu';
import ModalDanKhongDen from '../Shared/Modal/ModalDanKhongDen';
import FilterTime from '../Shared/Component/BoxFilterTime';
import PageWrap from '../../../../components/utility/PageWrap';
import {getLocalKey} from '../../../../helpers/utility';
import ModalRutDon from '../Shared/Modal/ModalRutDon';
import apiSoTiepDan from '../SoTiepDan/config';
import {mapFileToPromiseArray} from '../../../../helpers/utility';
import RutDonFunc from '../Shared/Modal/RutDonFunc';
const SoTiepDan = (props) => {
  document.title = 'Đơn thư đã tiếp nhận';
  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search),
  );
  const [selectedRowsKey, setSelectedRowsKey] = useState([]);
  const [visibleModalChiTietDonThu, setVisibleModalChiTietDonThu] =
    useState(false);
  const [keyModalChiTietDonThu, setKeyModalChiTietDonThu] = useState(0);
  const [dataModalChiTietDonThu, setDataModalChiTietDonThu] = useState({});
  const [visibleModalInPhieu, setVisibleModalInPhieu] = useState(false);
  const [keyModalInPhieu, setKeyModalInPhieu] = useState(0);

  const [dataModalDanKhongDen, setDataModalDanKhongDen] = useState({});
  const [visibleModalDanKhongDen, setVisibleModalDanKhongDen] = useState(false);
  const [keyModalDanKhongDen, setKeyModalDanKhongDen] = useState(0);
  const {role} = props;
  const dispatch = useDispatch();
  const excelRef = useRef();

  const reloadData = () => {
    props.getInitData(filterData);
  };

  const {
    visibleModalRutDon,
    showModalRutDon,
    submitModalRutDon,
    keyModalRutDon,
    loadingModalRutDon,
    hideModalRutDon,
  } = RutDonFunc({
    selectedRowsKey,
    setSelectedRowsKey,
    XuLyDonID: selectedRowsKey[0],
    reloadData,
  });

  const showModalChiTietDonThu = () => {
    const XuLyDonID = selectedRowsKey[0];
    const DonThuID = DanhSachTiepDan?.find(
      (item) => item.XuLyDonID === XuLyDonID,
    )?.DonThuID;
    if (XuLyDonID && DonThuID) {
      api.ChiTietDonThu2({XuLyDonID, DonThuID}).then((res) => {
        if (res.data.Status > 0) {
          setDataModalChiTietDonThu(res.data.Data);
          setVisibleModalChiTietDonThu(true);
          setKeyModalChiTietDonThu((prevKey) => prevKey + 1);
        }
      });
    }
  };

  const closeModalChiTietDonThu = () => {
    setDataModalChiTietDonThu({});
    setVisibleModalChiTietDonThu(false);
  };

  const {
    DanhSachTiepDan,
    DanhSachHuongXuLy,
    TotalRow,
    DanhSachBieuMau,
    DanhSachTiepDanAll,
    DanhSachLoaiKhieuTo,
    tableLoading,
  } = props;

  useEffect(() => {
    changeUrlFilter(filterData);
    props.getInitData(filterData);
  }, [filterData]);

  useEffect(() => {
    if (filterData.DonThuID && filterData.isPrint && filterData.XuLyDonID) {
      setSelectedRowsKey([Number(filterData.XuLyDonID)]);
      showModalBieuMau();
      setFilterData((prevFilter) => ({
        ...prevFilter,
        tabsKey: filterData.LoaiTiepDanID,
      }));
    }
  }, []);

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

  const deleteModalAddEdit = () => {
    Modal.confirm({
      title: 'Xóa Dữ Liệu',
      content: 'Bạn có muốn xóa đơn thư này không?',
      cancelText: 'Không',
      okText: 'Có',
      onOk: () => {
        const callApi = (data) => api.XoaDonThu(data);

        const ListItemThuongXuyen = DanhSachTiepDan.filter((item) =>
          selectedRowsKey.includes(item.XuLyDonID),
        );
        // const newListItemDelete = [];
        // ListItemThuongXuyen.forEach((item) =>
        //   newListItemDelete.push({
        //     XuLyDonID: item.XuLyDonID,
        //     DonThuID: item.DonThuID,
        //   }),
        // );
        callApi(ListItemThuongXuyen)
          .then((res) => {
            if (res.data.Status > 0) {
              props.getInitData({
                ...filterData,
                PageNumber:
                  Math.ceil((TotalRow - 1) / filterData.PageSize) <
                  filterData.PageNumber
                    ? Math.ceil((TotalRow - 1) / filterData.PageSize)
                    : filterData.PageNumber,
              });
              message.destroy();
              message.success(res.data.Message);
              setSelectedRowsKey([]);
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

  const handleIconClick = (event, record) => {
    event.stopPropagation(); // ngăn chặn sự kiện click truyền qua Checkbox
    handleCheckboxChange(record);
  };

  const handleCheckboxChange = (record) => {
    const selectedRows = [...selectedRowsKey];
    if (selectedRows.includes(record.XuLyDonID)) {
      // Nếu đã checked thì uncheck
      setSelectedRowsKey(
        selectedRows.filter((key) => key !== record.XuLyDonID),
      );
    } else {
      // Nếu chưa checked thì check
      setSelectedRowsKey([...selectedRows, record.XuLyDonID]);
    }
  };

  const handleCheckboxChange2 = (key) => {
    const selectedRows = [...selectedRowsKey];
    if (selectedRows.includes(key)) {
      // Nếu đã checked thì uncheck
      setSelectedRowsKey(selectedRows.filter((keyRows) => keyRows !== key));
    } else {
      // Nếu chưa checked thì check
      setSelectedRowsKey([...selectedRows, key]);
    }
  };

  const changePage = (NewPageNumber, NewPageSize) => {
    let oldFilterData = {...filterData};
    if (oldFilterData.PageSize) {
      if (oldFilterData.PageSize !== NewPageSize) {
        oldFilterData.PageNumber = 1;
        oldFilterData.PageSize = NewPageSize;
      } else {
        oldFilterData.PageNumber = NewPageNumber;
        oldFilterData.PageSize = NewPageSize;
      }
    } else {
      oldFilterData.PageNumber = NewPageNumber;
      oldFilterData.PageSize = NewPageSize;
    }
    if (
      (oldFilterData.PageNumber === 1 && oldFilterData.PageSize === 10) ||
      !oldFilterData.PageNumber
    ) {
      delete oldFilterData.PageNumber;
      delete oldFilterData.PageSize;
    }
    setFilterData(oldFilterData);
  };

  const handleRenderContentKhieuNai = (type) => {
    const rowSelection = {
      selectedRowsKey,
      renderCell: (checked, record, index, originNode) => {
        return (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
            }}
            onClick={(event) => handleIconClick(event, record)}
          >
            <UnorderedListOutlined
              className="ant-icon__table"
              onClick={(event) => handleIconClick(event, record)}
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
    const newDanhSachTiepDan = DanhSachTiepDan?.map((item) => {
      return {
        ...item,
        key: item.XuLyDonID,
      };
    });
    const tabsKey = Number(filterData.tabsKey);

    return (
      <>
        {handleRenderBoxFilter()}
        <BoxTable
          // scroll={{
          //   x: 1400,
          // }}
          rowSelection={rowSelection}
          columns={columns}
          dataSource={newDanhSachTiepDan}
          loading={tableLoading}
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

  const printExcel = () => {
    const html = excelRef.current.innerHTML;
    exportExcel(html, 'Danh sách đơn thư');
  };

  const handleChangedSidebarActive = () => {
    dispatch(actionsApp.changeCurrent('tiep-nhan-don'));
  };

  const showModalDanKhongDen = (data) => {
    const DanKhongDenID = data.DanKhongDenID;
    api
      .GetByIDDanKhongDen({DanKhongDenID})
      .then((res) => {
        if (res.data.Status > 0) {
          setKeyModalDanKhongDen((prevKey) => prevKey + 1);
          setDataModalDanKhongDen(res.data.Data);
          setVisibleModalDanKhongDen(true);
        } else {
          message.destroy();
          message.warning(res.data.Message);
        }
      })
      .catch((err) => {
        message.destroy();
        message.warning(res.data.Message);
      });
  };

  const hideModalDanKhongDen = () => {
    setVisibleModalDanKhongDen(false);
  };

  const submitModalDanKhongDen = (value) => {
    api
      .TiepDanKhongDen(value)
      .then((res) => {
        if (res.data.Status > 0) {
          message.destroy();
          message.success(res.data.Message);
          hideModalDanKhongDen();
          props.getInitData(filterData);
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

  const closeModalBieuMau = () => {
    setVisibleModalInPhieu(false);
  };

  const showModalBieuMau = () => {
    setKeyModalInPhieu((prevKey) => prevKey + 1);
    setVisibleModalInPhieu(true);
  };

  const handleRenderBoxFilter = () => {
    const {Search} = Input;
    return (
      <BoxFilter isCenter={true}>
        {/* <Select
          style={{width: '200px'}}
          value={filterData?.HuongXuLyID}
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
        </Select> */}
        <Select
          style={{width: '200px'}}
          value={filterData?.LoaiKhieuToID}
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
        <FilterTime onFilter={onFilter} filterData={filterData} />
        <InputSearch
          allowClear
          defaultValue={filterData?.Keyword}
          placeholder={'Nhập đối tượng KNTC, KNPA hoặc nội dung tiếp'}
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
      title: 'STT',
      width: '5%',
      align: 'center',
      render: (text, record, index) => (
        <span>{(PageNumber - 1) * PageSize + (index + 1)}</span>
      ),
    },
    {
      title: 'Số đơn thư',
      dataIndex: 'SoDonThu',
      align: 'left',
      width: '7%',
    },
    {
      title: 'Nguồn đơn đến',
      dataIndex: 'NguonDonDens',
      align: 'left',
      width: '7%',
    },
    {
      title: 'Ngày tiếp nhận',
      dataIndex: 'NgayTiepStr',
      align: 'left',
      width: '10%',
      render: (text, record, index) => (
        <p>
          {record.NgayTiepNhan
            ? dayjs(record.NgayTiepNhan).format('DD/MM/YYYY')
            : null}
        </p>
      ),
    },
    {
      title: 'Họ tên - Địa chỉ',
      dataIndex: 'TenChuDon',
      align: 'left',
      width: '25%',
      render: (text, record, index) => (
        <div>
          {record?.listDoiTuongKN
            ? record.listDoiTuongKN.map((item) => (
                <div>
                  <p style={{fontWeight: '600', textTransform: 'capitalize'}}>
                    {item.HoTen}
                  </p>
                  <p>{item.DiaChiCT ? `ĐC: ${item.DiaChiCT}` : ''}</p>
                  {/* <p>{item.CMND ? `CMND/CCCD: ${item.CMND}` : ''}</p> */}
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
        <Tooltip title={record?.NoiDungDon}>
          {handleTextLong(record?.NoiDungDon, 150)}
        </Tooltip>
      ),
    },
    {
      title: 'Phân loại đơn/Số người',
      dataIndex: 'LoaiDoiTuong',
      align: 'left',
      width: '10%',
      render: (text, record, index) => {
        return (
          <p>
            <p>
              {record?.NhomKN?.LoaiDoiTuongKNID === 1
                ? 'Cá nhân'
                : record?.NhomKN?.LoaiDoiTuongKNID === 2
                ? 'Tổ chức'
                : record?.NhomKN?.LoaiDoiTuongKNID === 3
                ? 'Tập thể'
                : ''}
              : {record?.NhomKN?.SoLuong}
            </p>
          </p>
        );
      },
    },

    {
      title: 'CMND/Hộ chiếu của công dân',
      align: 'left',
      width: '10%',
      render: (text, record, index) => (
        <div>
          {record?.listDoiTuongKN
            ? record.listDoiTuongKN?.map((item) => (
                <div>
                  <p>
                    {item?.CMND && item?.CMND !== '' ? (
                      <>
                        <p
                          style={{
                            fontWeight: '600',
                            textTransform: 'capitalize',
                          }}
                        >
                          {item.HoTen}:
                          <span
                            style={{
                              fontWeight: '400',
                              marginLeft: '2px',
                            }}
                          >
                            {item.CMND}
                          </span>
                        </p>
                      </>
                    ) : (
                      ''
                    )}
                  </p>
                </div>
              ))
            : null}
        </div>
      ),
    },

    {
      title: 'Cơ quan đã giải quyết',
      align: 'left',
      width: '10%',
      render: (text, record, index) => <p>{record.CQDaGiaiQuyetID}</p>,
    },
    {
      title: 'Hướng xử lý',
      dataIndex: 'HuongXuLy',
      align: 'left',
      width: '15%',
      children: [
        {
          title: 'Thụ lý để giải quyết',
          key: '1',
          width: 100,
          align: 'center',
          render: (text, record, index) => (
            <p>
              {record.HuongGiaiQuyetID === HuongGiaiQuyet.DeXuatThuLy
                ? 'x'
                : null}
            </p>
          ),
        },
        {
          title: 'Trả lại đơn và hướng dẫn',
          key: '2',
          width: 100,
          align: 'center',
          render: (text, record, index) => (
            <p>
              {record.HuongGiaiQuyetID === HuongGiaiQuyet.TraDon ||
              record.HuongGiaiQuyetID === HuongGiaiQuyet.HuongDan
                ? 'x'
                : null}
            </p>
          ),
        },
        {
          title: 'Chuyển đơn đến cơ quan, tổ chức đơn vị có thẩm quyền',
          key: '3',
          width: 100,
          align: 'center',
          render: (text, record, index) => (
            <p>
              {record.HuongGiaiQuyetID === HuongGiaiQuyet.ChuyenDon
                ? 'x'
                : null}
            </p>
          ),
        },
      ],
    },

    {
      title: 'Cán bộ tiếp',
      dataIndex: 'TenCanBo',
      align: 'left',
      width: '10%',
    },
    {
      title: 'Theo dõi giải quyết kết quả giải quyết',
      align: 'left',
      width: '5%',
    },
    {
      title: 'Ghi chú',
      align: 'left',
      width: '5%',
    },
  ];

  const key = Number(filterData?.tabsKey);

  const itemSelected = DanhSachTiepDan?.find(
    (item) => item.XuLyDonID === selectedRowsKey[0],
  );

  const LinkTo = `tiep-nhan-don?XuLyDonID=${selectedRowsKey[0]}`;

  const DonThuID = itemSelected?.DonThuID;
  const XuLyDonID = itemSelected?.XuLyDonID;
  const isDanKhongDen = itemSelected?.DanKhongDenID > 0;

  const checkRutDon =
    !(selectedRowsKey.length === 1) ||
    itemSelected?.DanKhongDenID ||
    itemSelected?.RutDonID;
  //  ||
  // itemSelected.RutDonID;
  const ChuyenDonSangTiepDanThuongXuyen = () => {
    Modal.confirm({
      title: (
        <span style={{color: 'red'}}>
          Vụ việc sẽ được chuyển thành "Tiếp dân thường xuyên"
        </span>
      ),
      content: 'Bạn có muốn thực hiện thao tác này không?',
      cancelText: 'Không',
      okText: 'Có',
      onOk: () => {
        api
          .ChuyenDonSangTiepDanThuongXuyen(XuLyDonID, DonThuID, {})
          .then((res) => {
            if (res.data.Status > 0) {
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
              message.error(res.data.Message);
            }
          })
          .catch((err) => {});
      },
    });
  };
  return (
    <LayoutWrapper>
      <PageWrap>
        <PageHeader>Đơn thư đã tiếp nhận</PageHeader>
        <PageAction>
          {role.edit ? (
            <Button
              // type="primary"
              className={`${checkRutDon ? '' : 'ant-btn-second'} btn-center `}
              onClick={showModalRutDon}
              disabled={checkRutDon}
            >
              <FileOutlined /> Rút đơn
            </Button>
          ) : null}
          {role.edit ? (
            <Button
              type="primary"
              onClick={ChuyenDonSangTiepDanThuongXuyen}
              disabled={!(selectedRowsKey.length >= 1)}
            >
              <EditOutlined /> Chuyển thành tiếp dân thường xuyên
            </Button>
          ) : null}
          <Button
            className="btn-center"
            type="primary"
            onClick={showModalChiTietDonThu}
            disabled={!(selectedRowsKey.length === 1)}
          >
            <img
              className="btn-icon__img"
              src={
                !(selectedRowsKey.length === 1)
                  ? icons.Preview
                  : icons.PreviewWhite
              }
            />
            Xem chi tiết
          </Button>
          {role.delete ? (
            <Button
              type="primary"
              onClick={deleteModalAddEdit}
              disabled={!(selectedRowsKey.length >= 1)}
            >
              <DeleteOutlined />
              Xóa
            </Button>
          ) : null}
          {role.edit ? (
            <>
              {isDanKhongDen ? (
                <Button
                  type="primary"
                  onClick={() => showModalDanKhongDen(itemSelected)}
                  // onClick={showModalEdit}
                  disabled={!(selectedRowsKey.length === 1)}
                >
                  <EditOutlined />
                  Sửa
                </Button>
              ) : (
                <Link to={LinkTo}>
                  <Button
                    type="primary"
                    onClick={() => handleChangedSidebarActive(key)}
                    // onClick={showModalEdit}
                    disabled={!(selectedRowsKey.length === 1)}
                  >
                    <EditOutlined />
                    Sửa
                  </Button>
                </Link>
              )}
            </>
          ) : null}
          {Number(filterData?.tabsKey) !== 3 &&
          Number(filterData?.tabsKey) !== 2 ? (
            <Button
              className="btn-center"
              disabled={!(selectedRowsKey.length === 1)}
              type="primary"
              onClick={showModalBieuMau}
            >
              <img
                className="btn-icon__img"
                src={
                  !(selectedRowsKey.length === 1)
                    ? icons.Print
                    : icons.PrintWhite
                }
              />
              In phiếu
            </Button>
          ) : null}
          <Button onClick={printExcel} type="primary" className="btn-center">
            <img className="btn-icon__img" src={icons.PrintWhite} />
            In sổ
          </Button>
          <Link to={LinkTo}>
            <Button
              type="primary"
              onClick={() => handleChangedSidebarActive(key)}
              className="btn-center"
            >
              <img className="btn-icon__img" src={icons.newFileWhite} />
              Lượt tiếp mới
            </Button>
          </Link>
        </PageAction>
      </PageWrap>
      <Box>
        <Wrapper>{handleRenderContentKhieuNai()}</Wrapper>
        <BoxExcel
          type={Number(filterData.tabsKey)}
          excelRef={excelRef}
          DanhSachTiepDan={DanhSachTiepDanAll}
        />
      </Box>

      <ModalDanKhongDen
        visible={visibleModalDanKhongDen}
        key={keyModalDanKhongDen}
        dataEdit={dataModalDanKhongDen}
        onCancel={hideModalDanKhongDen}
        onCreate={submitModalDanKhongDen}
      />
      <ModalChiTietDonThu
        visible={visibleModalChiTietDonThu}
        key={keyModalChiTietDonThu}
        dataEdit={dataModalChiTietDonThu}
        onCancel={closeModalChiTietDonThu}
      />
      <ModalInPhieu
        visible={visibleModalInPhieu}
        DanhSachBieuMau={DanhSachBieuMau}
        key={keyModalInPhieu}
        onCancel={closeModalBieuMau}
        XuLyDonID={selectedRowsKey[0]}
        DonThuID={DonThuID}
      />
      <ModalRutDon
        key={keyModalRutDon}
        visible={visibleModalRutDon}
        onCancel={hideModalRutDon}
        onCreate={submitModalRutDon}
        loading={loadingModalRutDon}
      />
    </LayoutWrapper>
  );
};

function mapStateToProps(state) {
  return {
    ...state.DonThuDaTiepNhan,
    role: getRoleByKey(state.Auth.role, 'don-thu-da-tiep-nhan'),
  };
}

export default connect(mapStateToProps, actions)(SoTiepDan);
