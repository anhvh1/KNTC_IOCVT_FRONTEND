import {Modal, Table, Tabs, Tooltip, message, Pagination, Spin} from 'antd';
import {DatePicker} from '../../../../components/uielements/exportComponent';
import React, {useState, useEffect, useRef} from 'react';
import {connect, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import actions from '../../../redux/NghiepVu/SoTiepDan/actions';
import LayoutWrapper from '../../../../components/utility/layoutWrapper';
import PageHeader from '../../../../components/utility/pageHeader';
import PageAction from '../../../../components/utility/pageAction';
import Box from '../../../../components/utility/box';
import BoxFilter from '../../../../components/utility/boxFilter';
import BoxTable from '../../../../components/utility/boxTable';
import Checkbox from '../../../../components/uielements/checkbox';
import Select from '../../../../components/uielements/select';
import Wrapper from './SoTiepDan.styled';
import {Input} from 'antd';
import dayjs from 'dayjs';
import {
  Button,
  InputSearch,
} from '../../../../components/uielements/exportComponent';
import {LoaiFileDinhKem, LoaiTiepDan} from '../../../../settings/constants';
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
import {formatDate} from '../../../../helpers/utility';
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  PrinterOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import {CheckboxGroup} from '../../../../components/uielements/checkbox';
import ModalChiTietDonThu from '../Shared/Modal/ModalChiTietDonThu';
import BoxExcel from './boxExcel';
import actionsApp from '../../../../redux/app/actions';
import moment from 'moment';
import ModalInPhieu from '../Shared/Modal/modalInPhieu';
import {HuongGiaiQuyet} from '../../../../settings/constants';
import ModalDanKhongDen from '../Shared/Modal/ModalDanKhongDen';
import FilterTime from '../Shared/Component/BoxFilterTime';
import PageWrap from '../../../../components/utility/PageWrap';
import {getLocalKey} from '../../../../helpers/utility';
const SoTiepDan = (props) => {
  document.title = 'Sổ tiếp dân';
  const {filterData, setFilterData} = props;
  const {
    DanhSachTiepDan,
    DanhSachHuongXuLy,
    TotalRow,
    DanhSachBieuMau,
    DanhSachTiepDanAll,
    DanhSachLoaiKhieuTo,
    role,
    DanhSachQuocTich,
    DanhSachDanToc,
    DanhSachTinh,
    DanhSachHuyen,
    DanhSachXa,
    DanhSachChucVu,
    DanhSachHinhThucDaGiaiQuyet,
    DanhSachCanBoXuLy,
    DanhSachTenFile,
    DanhSachCap,
    tableLoading,
    DanhSachCoQuan,
  } = props;
  const [selectedRowsKey, setSelectedRowsKey] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [visibleModalChiTietDonThu, setVisibleModalChiTietDonThu] =
    useState(false);
  const [keyModalChiTietDonThu, setKeyModalChiTietDonThu] = useState(0);
  const [dataModalChiTietDonThu, setDataModalChiTietDonThu] = useState({});
  const [visibleModalInPhieu, setVisibleModalInPhieu] = useState(false);
  const [keyModalInPhieu, setKeyModalInPhieu] = useState(0);

  const [dataModalDanKhongDen, setDataModalDanKhongDen] = useState({});
  const [visibleModalDanKhongDen, setVisibleModalDanKhongDen] = useState(false);
  const [keyModalDanKhongDen, setKeyModalDanKhongDen] = useState(0);

  const dispatch = useDispatch();
  const excelRef = useRef();

  const showModalChiTietDonThu = () => {
    const TiepDanKhongDonID = selectedRowsKey[0];
    const DonThuID = DanhSachTiepDan?.find(
      (item) => item.TiepDanKhongDonID === TiepDanKhongDonID,
    )?.DonThuID;
    const XuLyDonID = DanhSachTiepDan?.find(
      (item) => item.TiepDanKhongDonID === TiepDanKhongDonID,
    )?.XuLyDonID;
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

  const user = getLocalKey('user', {});
  const isBanTiepDan = user?.BanTiepDan
    ? user.BanTiepDan && user?.CapID === 4
    : false;

  useEffect(() => {
    changeUrlFilter(filterData);
    props.getInitData(filterData);
  }, [filterData]);

  useEffect(() => {
    if (
      filterData.DonThuID &&
      filterData.isPrint &&
      filterData.TiepDanKhongDonID
    ) {
      setSelectedRowsKey([Number(filterData.TiepDanKhongDonID)]);
      showModalBieuMau();
    }
  }, []);

  useEffect(() => {
    // props.getInitData(filterData);
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

  const deleteReport = () => {
    Modal.confirm({
      title: 'Xóa Dữ Liệu',
      content: 'Bạn có muốn xóa đơn thư này không?',
      cancelText: 'Không',
      okText: 'Có',
      onOk: () => {
        setConfirmLoading(true);
        const callApi = (data) => api.XoaDonThu(data);
        const ListItem = DanhSachTiepDan.filter((item) =>
          selectedRowsKey.includes(item.TiepDanKhongDonID),
        );
        callApi(ListItem)
          .then((res) => {
            if (res.data.Status > 0) {
              setConfirmLoading(false);
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
    if (selectedRows.includes(record.TiepDanKhongDonID)) {
      // Nếu đã checked thì uncheck
      setSelectedRowsKey(
        selectedRows.filter((key) => key !== record.TiepDanKhongDonID),
      );
    } else {
      // Nếu chưa checked thì check
      setSelectedRowsKey([...selectedRows, record.TiepDanKhongDonID]);
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
                checked={selectedRowsKey.includes(record.TiepDanKhongDonID)}
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
    // const rowSelection = {
    //   selectedRowsKey,
    //   onChange: (selectedRowkey) => setSelectedRowsKey(selectedRowkey),
    // };
    const newDanhSachTiepDan = DanhSachTiepDan?.map((item) => {
      return {
        ...item,
        key: item.TiepDanKhongDonID,
        // Children: [{Ten: 1, NoiDung: 2, KetQuaTiep: 3}],
      };
    });
    const tabsKey = Number(filterData.tabsKey);

    return (
      <>
        {handleRenderBoxFilter()}
        {/* || (tabsKey !== 3 && tabsKey !== 2) */}
        {!isBanTiepDan || type === 1 ? (
          <BoxTable
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
        ) : (
          <>
            <div className="table-scroll">
              {tableLoading ? (
                <div className="wrapper-scroll">
                  <Spin />
                </div>
              ) : null}
              <table className="table-scroll__wrapper">
                <thead>
                  <th style={{width: '3%'}}></th>
                  <th style={{width: '5%'}}>STT</th>
                  <th style={{width: '15%'}}>Tên chủ đơn/ Địa chỉ</th>
                  <th style={{width: '5%'}}>Số lượng người</th>
                  <th style={{width: '25%'}}>Nội dung vụ việc</th>
                  {/* <th style={{width: '5%'}}>Trùng đơn</th> */}
                  <th style={{width: '15%'}}>Kết quả tiếp</th>
                  <th style={{width: '15%'}}>
                    Kết quả giải quyết của các ngành
                  </th>
                  <th style={{width: '15%'}}>Thông tin tài liệu</th>
                </thead>
                <tbody>
                  {newDanhSachTiepDan &&
                    newDanhSachTiepDan?.map((item, index) => {
                      if (item) {
                        if (item.Children) {
                          return (
                            <>
                              <tr>
                                <td colSpan={2} className="table-primary">
                                  <p>
                                    {item.NgayTiep
                                      ? dayjs(item.NgayTiep).format(
                                          'DD/MM/YYYY',
                                        )
                                      : null}
                                  </p>
                                </td>
                                <td className="table-primary" colSpan={2}>
                                  <p>{item?.TenLanhDaoTiep}</p>
                                </td>
                                <td className="table-primary" colSpan={5}>
                                  <p>{item?.NoiDungTiep}</p>
                                </td>
                              </tr>
                              {item.Children.map((item, indexChild) => (
                                <tr>
                                  <td>
                                    <div
                                      className="select-table"
                                      style={{
                                        display: 'flex',
                                        alignItems: 'center',
                                      }}
                                      onClick={(event) =>
                                        handleIconClick(event, item)
                                      }
                                    >
                                      <UnorderedListOutlined
                                        className="ant-icon__table"
                                        onClick={(event) =>
                                          handleIconClick(event, item)
                                        }
                                        style={{
                                          marginRight: 4,
                                          fontSize: 14,
                                          visibility: 'hidden',
                                        }}
                                      />
                                      <div>
                                        <Checkbox
                                          className="selected__table"
                                          checked={selectedRowsKey.includes(
                                            item.TiepDanKhongDonID,
                                          )}
                                          onChange={() =>
                                            handleCheckboxChange(item)
                                          }
                                        />
                                      </div>
                                    </div>
                                  </td>
                                  <td style={{textAlign: 'center'}}>
                                    {indexChild + 1}
                                  </td>
                                  <td>{item?.NhomKN?.HoTen}</td>
                                  <td style={{textAlign: 'right'}}>
                                    {item?.NhomKN?.SoLuong}
                                  </td>
                                  <td>{item?.NoiDungTiep}</td>
                                  {/* <td style={{textAlign: 'center'}}>
                                    <Checkbox />
                                  </td> */}
                                  <td>{item?.KetQuaTiep}</td>
                                  <td>{item?.KetQuaGQCacNganh}</td>
                                  <td>
                                    {item?.DanhSachHoSoTaiLieu
                                      ? item?.DanhSachHoSoTaiLieu.map(
                                          (item, index) => (
                                            <p>
                                              {index + 1}. {item.TenFile}
                                            </p>
                                          ),
                                        )
                                      : null}
                                  </td>
                                </tr>
                              ))}
                            </>
                          );
                        }
                        return (
                          <tr>
                            <td colSpan={2} className="table-primary">
                              <p>
                                {item.NgayTiep
                                  ? dayjs(item.NgayTiep).format('DD/MM/YYYY')
                                  : null}
                              </p>
                            </td>
                            <td className="table-primary" colSpan={2}>
                              <p>{item?.TenLanhDaoTiep}</p>
                            </td>
                            <td className="table-primary" colSpan={5}>
                              <p>{item?.NoiDungTiep}</p>
                            </td>
                          </tr>
                        );
                      }
                    })}
                </tbody>
              </table>
            </div>
            <Pagination
              showSizeChanger={true}
              style={{marginTop: '10px'}}
              showTotal={(total, range) =>
                `Từ ${range[0]} đến ${range[1]} trên ${total}`
              }
              total={TotalRow}
              current={PageNumber}
              PageSize={PageSize}
              // onShowSizeChange={(page, size) =>
              //   this.onSearch(size, "PageSize", 1)
              // }
              // loading={tableLoad}
              // defaultPageSize={PageSize}
              // size={PageSize}
              onChange={(PageNumber, PageSize) =>
                changePage(PageNumber, PageSize)
              }
            />
          </>
        )}
      </>
    );
  };

  const printExcel = () => {
    const html = excelRef.current.innerHTML;
    exportExcel(html, 'Danh sách đơn thư');
  };

  const handleChangedSidebarActive = () => {
    if (key === 3) {
      dispatch(actionsApp.changeCurrent('tiep-dot-xuat'));
    } else if (key === 2) {
      dispatch(actionsApp.changeCurrent('tiep-dinh-ky'));
    } else {
      dispatch(actionsApp.changeCurrent('tiep-thuong-xuyen'));
    }
  };

  const closeModalBieuMau = () => {
    setVisibleModalInPhieu(false);
    setFilterData({});
  };

  const showModalBieuMau = () => {
    setKeyModalInPhieu((prevKey) => prevKey + 1);
    setVisibleModalInPhieu(true);
  };

  const handleRenderBoxFilter = () => {
    const {Search} = Input;
    return (
      <BoxFilter isCenter={true}>
        <Select
          style={{width: '200px'}}
          value={filterData.Status}
          placeholder={'Chọn hướng xử lý'}
          allowClear
          onChange={(value) => onFilter(value, 'HuongXuLyID')}
        >
          {DanhSachHuongXuLy
            ? DanhSachHuongXuLy.map((item) => (
                <Option
                  value={item.HuongGiaiQuyetID}
                  key={item.HuongGiaiQuyetID}
                >
                  {item.TenHuongGiaiQuyet}
                </Option>
              ))
            : null}
        </Select>
        <Select
          style={{width: '200px'}}
          value={filterData.LoaiKhieuToID}
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
          defaultValue={filterData.Keyword}
          placeholder={'Nhập đối tượng KNTC, KNPA hoặc nội dung tiếp'}
          style={{width: 300}}
          onSearch={(value) => onFilter(value, 'Keyword')}
        />
      </BoxFilter>
    );
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
    value.NgayTruc = formatDate(value.NgayTruc);
    for (const key in value) {
      if (!value[key]) {
        delete value[key];
      }
    }
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
      dataIndex: 'TenNguonDonDen',
      align: 'left',
      width: '7%',
    },
    {
      title: 'Ngày tiếp',
      dataIndex: 'NgayTiepStr',
      align: 'left',
      width: '10%',
      render: (text, record, index) => (
        <p>
          {record.NgayTiep ? dayjs(record.NgayTiep).format('DD/MM/YYYY') : null}
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
      title: 'Cơ quan đã giải quyết',
      align: 'left',
      width: '10%',
      render: (text, record, index) => <p>{record.CQDaGiaiQuyetID}</p>,
    },
    {
      title: 'Phân loại đơn/Số người',
      dataIndex: 'LoaiDoiTuong',
      align: 'left',
      width: '10%',
      render: (text, record, index) => (
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
      ),
    },

    {
      title: 'CMND/Hộ chiếu của công dân',
      align: 'left',
      width: '10%',
      render: (text, record, index) => <div>{record?.CMND}</div>,
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

  const itemsTabs = [
    {
      key: '1',
      label: (
        <div className="ant-tabs__title">
          {isBanTiepDan ? `Sổ tiếp thường xuyên` : 'Khiếu nại'}
        </div>
      ),
      children: <>{handleRenderContentKhieuNai(1)}</>,
    },
    {
      key: '3',
      label: (
        <div className="ant-tabs__title">
          {isBanTiepDan ? `Sổ tiếp định kỳ` : 'Tố cáo'}
        </div>
      ),
      children: <>{handleRenderContentKhieuNai()}</>,
    },
    {
      key: '2',
      label: (
        <div className="ant-tabs__title">
          {isBanTiepDan ? `Sổ tiếp đột xuất` : 'Tố cáo'}
        </div>
      ),
      children: <>{handleRenderContentKhieuNai()}</>,
    },
  ];

  // const LayDonThuoc = ã

  const itemTarget = DanhSachTiepDan?.find(
    (item) => item?.TiepDanKhongDonID === selectedRowsKey[0],
  );
  const key = itemTarget?.LoaiTiepDanID;

  const DonThuID = itemTarget?.DonThuID;
  const XuLyDonID = itemTarget?.XuLyDonID;

  const LinkToCacDonVi =
    itemTarget?.LoaiTiepDanID === LoaiTiepDan.ThuongXuyen
      ? `tiep-thuong-xuyen?TiepDanKhongDonID=${itemTarget?.TiepDanKhongDonID}&XuLyDonID=${itemTarget?.XuLyDonID}&DonThuID=${itemTarget?.DonThuID}`
      : itemTarget?.LoaiTiepDanID === LoaiTiepDan.DotXuat
      ? `tiep-dot-xuat?TiepDanKhongDonID=${itemTarget?.TiepDanKhongDonID}`
      : itemTarget?.LoaiTiepDanID === LoaiTiepDan.DinhKy
      ? `tiep-dinh-ky?TiepDanKhongDonID=${itemTarget?.TiepDanKhongDonID}`
      : null;

  const isDanKhongDen = itemTarget?.DanKhongDenID > 0;

  return (
    <LayoutWrapper>
      <PageWrap>
        <PageHeader>Sổ tiếp dân</PageHeader>
        <PageAction>
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
              onClick={deleteReport}
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
                  onClick={() => {
                    showModalDanKhongDen(itemTarget);
                  }}
                  disabled={!(selectedRowsKey.length === 1)}
                >
                  <EditOutlined />
                  Sửa
                </Button>
              ) : (
                <Link to={LinkToCacDonVi}>
                  <Button
                    type="primary"
                    onClick={() => {
                      handleChangedSidebarActive(key);
                    }}
                    disabled={!(selectedRowsKey.length === 1)}
                  >
                    <EditOutlined />
                    Sửa
                  </Button>
                </Link>
              )}
            </>
          ) : null}
          <Button
            className="btn-center"
            disabled={!(selectedRowsKey.length === 1)}
            type="primary"
            onClick={showModalBieuMau}
          >
            <img
              className="btn-icon__img"
              src={
                !(selectedRowsKey.length === 1) ? icons.Print : icons.PrintWhite
              }
            />
            In phiếu
          </Button>
          <Button onClick={printExcel} type="primary" className="btn-center">
            <img className="btn-icon__img" src={icons.PrintWhite} />
            In sổ
          </Button>
          {role.add ? (
            <Link to={'tiep-thuong-xuyen'}>
              <Button
                type="primary"
                onClick={() => handleChangedSidebarActive(key)}
                className="btn-center"
              >
                <img className="btn-icon__img" src={icons.newFileWhite} />
                Lượt tiếp mới
              </Button>
            </Link>
          ) : null}
        </PageAction>
      </PageWrap>
      <Box>
        <Wrapper>
          {isBanTiepDan ? (
            <Tabs
              items={itemsTabs}
              defaultActiveKey="1"
              activeKey={filterData?.tabsKey}
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
                setFilterData({...newFilterData, tabsKey: value});
              }}
            ></Tabs>
          ) : null}
        </Wrapper>
        {isBanTiepDan ? null : handleRenderContentKhieuNai()}
        <BoxExcel excelRef={excelRef} DanhSachTiepDan={DanhSachTiepDanAll} />
      </Box>

      <ModalChiTietDonThu
        visible={visibleModalChiTietDonThu}
        key={keyModalChiTietDonThu}
        dataEdit={dataModalChiTietDonThu}
        onCancel={closeModalChiTietDonThu}
      />
      <ModalDanKhongDen
        visible={visibleModalDanKhongDen}
        key={keyModalDanKhongDen}
        dataEdit={dataModalDanKhongDen}
        onCancel={hideModalDanKhongDen}
        onCreate={submitModalDanKhongDen}
      />
      <ModalInPhieu
        visible={visibleModalInPhieu}
        DanhSachBieuMau={DanhSachBieuMau}
        key={keyModalInPhieu}
        onCancel={closeModalBieuMau}
        TiepDanKhongDonID={selectedRowsKey[0]}
        XuLyDonID={XuLyDonID}
        DonThuID={DonThuID}
      />
    </LayoutWrapper>
  );
};

function mapStateToProps(state) {
  return {
    ...state.SoTiepDan,
    role: getRoleByKey(state.Auth.role, 'so-tiep-dan'),
  };
}

export default connect(mapStateToProps, actions)(SoTiepDan);
