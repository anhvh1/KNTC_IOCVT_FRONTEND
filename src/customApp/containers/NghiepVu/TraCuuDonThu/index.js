import {Modal, Table, Tooltip, message, Upload} from 'antd';
import actions from '../../../redux/DanhMuc/DanhMucQuocTich/actions';
import actionsCoQuan from '../../../redux/DanhMuc/DMCoQuan/actions';
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import LayoutWrapper from '../../../../components/utility/layoutWrapper';
import PageHeader from '../../../../components/utility/pageHeader';
import PageAction from '../../../../components/utility/pageAction';
import Box from '../../../../components/utility/box';
import {formDataCaller} from '../../../../api/formDataCaller';
import BoxFilter from '../../../../components/utility/boxFilter';
import BoxTable from '../../../../components/utility/boxTable';
import Checkbox from '../../../../components/uielements/checkbox';
import TableDetail from './tableDetails';

import {
  Button,
  InputSearch,
  TreeSelect,
  Option,
  Select,
} from '../../../../components/uielements/exportComponent';
import {
  changeUrlFilter,
  exportExcel,
  getDefaultPageSize,
  getFilterData,
  getRoleByKey,
} from '../../../../helpers/utility';
import {useKey} from '../../../CustomHook/useKey';
import {useDispatch, useSelector} from 'react-redux';
import queryString from 'query-string';
import api, {apiUrl} from './config';
import moment from 'moment';
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import PageWrap from '../../../../components/utility/PageWrap';
const TraCuuDonThu = (props) => {
  document.title = 'Tra cứu đơn thư';

  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search),
  );
  const [action, setAction] = useState('');
  const [selectedRowsKey, setSelectedRowsKey] = useState([]);
  const [key, inceaseModalKey] = useKey();
  const [DanhSachLoaiDon, setDanhSachLoaiDon] = useState([]);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [DanhSachBuocXacMinh, setDanhSachBuocXacMinh] = useState([]);
  const {DanhSachCoQuan} = useSelector((state) => state.DMCoQuan);
  const role = useSelector((state) =>
    getRoleByKey(state.Auth.role, 'tra-cuu-don-thu'),
  );

  const dispatch = useDispatch();

  useEffect(() => {
    changeUrlFilter(filterData);
    dispatch(actions.getList(filterData));
  }, [filterData]);

  useEffect(() => {
    dispatch(actions.getList(filterData));
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

  const showModalAdd = () => {
    setAction('add');
    setDataModalAddEdit({});
    inceaseModalKey();
    setVisibleModalAddEdit(true);
  };

  const deleteModalAddEdit = (QuocTichID) => {
    Modal.confirm({
      title: 'Xóa Dữ Liệu',
      content: 'Bạn có muốn xóa quốc tịch này không?',
      cancelText: 'Không',
      okText: 'Có',
      onOk: () => {
        setConfirmLoading(true);
        api
          .XoaQuocTich(QuocTichID)
          .then((res) => {
            if (res.data.Status > 0) {
              setConfirmLoading(false);

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

  const showModalEdit = (id) => {
    const QuocTichID = id;
    setAction('edit');
    api
      .ChiTietQuocTich({QuocTichID})
      .then((res) => {
        if (res.data.Status > 0) {
          setDataModalAddEdit(res.data.Data);
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

  const hideModalAddEdit = () => {
    // setAction("");
    setSelectedRowsKey([]);
    setDataModalAddEdit({});
    setVisibleModalAddEdit(false);
  };

  const submitModalAddEdit = (data) => {
    setConfirmLoading(true);
    if (action === 'add') {
      api
        .THemQuocTich(data)
        .then((res) => {
          setConfirmLoading(false);
          if (res.data.Status > 0) {
            message.destroy();
            message.success(res.data.Message);
            hideModalAddEdit();
            dispatch(actions.getList(filterData));
          } else {
            setConfirmLoading(false);
            message.destroy();
            message.error(res.data.Message);
          }
        })
        .catch((error) => {
          setConfirmLoading(false);
          message.destroy();
          message.error(error.toString());
        });
    }
    if (action === 'edit') {
      api
        .CapNhatQuocTich(data)
        .then((res) => {
          if (res.data.Status > 0) {
            setConfirmLoading(false);
            message.destroy();
            message.success(res.data.Message);
            hideModalAddEdit();
            dispatch(actions.getList(filterData));
          } else {
            setConfirmLoading(false);
            message.destroy();
            message.error(res.data.Message);
          }
        })
        .catch((error) => {
          setConfirmLoading(false);
          message.destroy();
          message.error(error.toString());
        });
    }
  };

  const renderThaoTac = (record) => {
    return (
      <div className={'action-btn'}>
        {/* {role.edit ? */}
        <Tooltip title={'Sửa'}>
          <EditOutlined onClick={() => showModalEdit(record.QuocTichID)} />
        </Tooltip>
        {/* : ""} */}
        {/* {role.delete ? */}
        <Tooltip title={'Xóa'}>
          <DeleteOutlined
            onClick={() => deleteModalAddEdit(record.QuocTichID)}
          />
        </Tooltip>
        {/* : ""} */}
      </div>
    );
  };

  const renderThaoTac2 = (record) => {
    return (
      <div className={'action-btn'}>
        {/* {role.edit ? */}
        <Tooltip title={'Sửa'}>
          <EditOutlined onClick={() => showModalEdit2(record.id)} />
        </Tooltip>
        {/* : ""} */}
        {/* {role.delete ? */}
        <Tooltip title={'Xóa'}>
          <DeleteOutlined onClick={() => deleteModalAddEdit2(record.id)} />
        </Tooltip>
        {/* : ""} */}
      </div>
    );
  };

  const showModalEdit2 = (id) => {
    const input = document.getElementById(`NgayCapNhat${id}`);
    input.focus();
  };

  const deleteModalAddEdit2 = (id) => {
    Modal.confirm({
      title: 'Xóa Dữ Liệu',
      content: 'Bạn có muốn xóa quốc tịch này không?',
      cancelText: 'Không',
      okText: 'Có',
      onOk: () => {
        const newArr = DanhSachBuocXacMinh.filter((item) => item.id !== id);
        setDanhSachBuocXacMinh(newArr);
      },
    });
  };

  const {DanhSachQuocTich, TotalRow} = props;
  const PageNumber = filterData.PageNumber
    ? parseInt(filterData.PageNumber)
    : 1;
  const PageSize = filterData.PageSize
    ? parseInt(filterData.PageSize)
    : getDefaultPageSize();

  const handleBeforeUploadFile = (info, id, key) => {
    const obj = DanhSachBuocXacMinh.filter((item) => item.id === id)[0];
    const indexObj = DanhSachBuocXacMinh.indexOf(obj);
    const newObj = {
      ...obj,
    };
    newObj[key] = [...info.fileList];
    const newDanhSachBuocXacMinh = [...DanhSachBuocXacMinh];
    newDanhSachBuocXacMinh.splice(indexObj, 1, newObj);
    setDanhSachBuocXacMinh(newDanhSachBuocXacMinh);
  };

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
      title: 'Mã quốc tịch',
      dataIndex: 'MaQuocTich',
      align: 'left',
      width: '15%',
    },
    {
      title: 'Tên quốc tịch',
      dataIndex: 'TenQuocTich',
      align: 'left',
      width: '25%',
    },
    {
      title: 'Ghi chú',
      dataIndex: 'GhiChu',
      align: 'left',
      width: '35%',
    },
    {
      title: 'Đang sử dụng',
      dataIndex: 'TrangThai',
      align: 'center',
      width: '10%',
      render: (text, record) => {
        return <Checkbox checked={record.TrangThai}></Checkbox>;
      },
    },
    {
      title: 'Thao tác',
      width: '10%',
      align: 'center',
      render: (text, record) => renderThaoTac(record),
    },
  ];

  const columnsTest = [
    {
      title: 'STT',
      width: '5%',
      align: 'center',
      render: (text, record, index) => (
        <span>{(PageNumber - 1) * PageSize + (index + 1)}</span>
      ),
    },
    {
      title: 'Ngày cập nhật',
      // dataIndex: "NgayCapNhat",
      align: 'left',
      width: '15%',
      render: (text, record) => {
        return (
          <div className="customize-data">
            <input
              defaultValue={record.NgayCapNhat}
              onChange={(e) => handleChangeValue(e, record.id)}
              id={`NgayCapNhat${record.id}`}
              className="NgayCapNhat"
            />
          </div>
        );
      },
    },
    {
      title: 'Tên hồ sơ',
      dataIndex: 'TenHoSo',
      align: 'left',
      width: '25%',
      render: (text, record) => {
        return (
          <div className="customize-data">
            <input
              defaultValue={record.TenHoSo}
              onChange={(e) => handleChangeValue(e, record.id)}
              className="TenHoSo"
            />
          </div>
        );
      },
    },
    {
      title: 'File Đính Kèm',
      dataIndex: 'ListFileDinhKem',
      align: 'left',
      width: '35%',
      render: (text, record) => (
        <Upload
          multiple
          onChange={(info) =>
            handleBeforeUploadFile(info, record.id, 'ListFileDinhKem')
          }
          fileList={record.ListFileDinhKem ? record.ListFileDinhKem : []}
        >
          <Button icon={<UploadOutlined />}>Upload</Button>
        </Upload>
      ),
    },
    {
      title: 'Đang sử dụng',
      dataIndex: 'TrangThai',
      align: 'center',
      width: '10%',
      render: (text, record) => {
        return <Checkbox checked={record.TrangThai}></Checkbox>;
      },
    },
    {
      title: 'Thao tác',
      width: '10%',
      align: 'center',
      render: (text, record) => renderThaoTac2(record),
    },
  ];

  const handleChangeValue = (e, id, type) => {
    if (type === 'file') {
      const files = e.target.files[0];
      const key = e.target.getAttribute('class');
      const obj = DanhSachBuocXacMinh.filter((item) => item.id === id)[0];
      const indexObj = DanhSachBuocXacMinh.indexOf(obj);
      const newObj = {
        ...obj,
        [key]: {...files},
      };
      const newDanhSachBuocXacMinh = [...DanhSachBuocXacMinh];
      newDanhSachBuocXacMinh.splice(indexObj, 1, newObj);
      setDanhSachBuocXacMinh(newDanhSachBuocXacMinh);
    } else {
      const key = e.target.getAttribute('class');
      const obj = DanhSachBuocXacMinh.filter((item) => item.id === id)[0];
      const indexObj = DanhSachBuocXacMinh.indexOf(obj);
      const newObj = {
        ...obj,
        [key]: e.target.value,
      };
      const newDanhSachBuocXacMinh = [...DanhSachBuocXacMinh];
      newDanhSachBuocXacMinh.splice(indexObj, 1, newObj);
      setDanhSachBuocXacMinh(newDanhSachBuocXacMinh);
    }
    // newObj[key] = e.target.value
  };

  const handleSaveValue = () => {
    const file = document.getElementById('file');
    const files = file.files[0];
    // file.addEventListener('change', (event) => {
    //   const files = event.target.files;
    // });
    // const form =
    const FileDinhKemStr = {
      FileType: '16',
      NghiepVuID: '1',
    };
    // api.InsertFile()
    const formFile = new FormData();
    formFile.append('files', files);
    formFile.append('FileDinhKemStr', JSON.stringify(FileDinhKemStr));
    formDataCaller(apiUrl.InsertFile, formFile)
      .then((responsefile) => {
        if (response.data.Status > 0) {
        } else {
          message.destroy();
          message.error(response.data.Message);
        }
      })
      .catch((error) => {
        message.destroy();
      });
  };

  const handleAddBuocXacMinh = () => {
    const newList = DanhSachBuocXacMinh.concat({
      NgayCapNhat: '1',
      TenHoSo: '',
      ListFileDinhKem: [],
      id: key,
    });
    inceaseModalKey();
    setDanhSachBuocXacMinh(newList);
  };

  const handleRenderTableItems = (item) => {
    const parent = document.createElement('tr');
    for (const iterator of object) {
      // const tr =
    }
  };

  const handleSaveBuocXacMinh = () => {
    // const Rows = document.getElementsByClassName('customize-row')
    // const newArr = [...Rows]
    // Array.isArray(newArr)
    // const allValue = []
    // newArr.forEach(item => {
    //   const childs = item.children
    //   for (let i = 0; i < childs.length; i++) {
    //     const element = childs[i];
    //     const classItem = element.firstChild.getAttribute('class')
    //   }
    // })
  };

  return (
    <LayoutWrapper>
      <PageWrap>
        <PageHeader>Danh Sách Đơn Thư</PageHeader>
        <PageAction>
          {/* {role ? role.add ?  */}
          <Button type="primary" onClick={showModalAdd}>
            <PlusOutlined />
            In số
          </Button>
          {/* //  : '' : ''} */}
        </PageAction>
      </PageWrap>
      <Box>
        <BoxFilter>
          <TreeSelect
            showSearch
            treeData={DanhSachCoQuan}
            style={{width: '300px'}}
            dropdownStyle={{maxHeight: 400, overflow: 'auto'}}
            placeholder="Chọn cơ quan"
            allowClear
            treeDefaultExpandAll
            onChange={(value) => onFilter(value, 'CoQuanID')}
            notFoundContent={'Không có dữ liệu'}
            treeNodeFilterProp={'title'}
            // defaultValue={filterData.CoQuanID}
          />
          <Select style={{width: '300px'}}>
            {DanhSachLoaiDon.map((item) => (
              <Option></Option>
            ))}
          </Select>
          <InputSearch
            allowClear
            defaultValue={filterData.Keyword}
            placeholder={'Tìm kiếm theo tên hoặc nội dung'}
            style={{width: 300}}
            onSearch={(value) => onFilter(value, 'Keyword')}
          />
        </BoxFilter>
        <BoxTable
          size="large"
          columns={columns}
          dataSource={DanhSachQuocTich}
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
        <TableDetail />
        <Button onClick={handleSaveBuocXacMinh}>Lưu</Button>
        <Button onClick={handleAddBuocXacMinh}>Thêm bước xác minh</Button>
        <input type="file" id="file"></input>

        <BoxTable
          size="large"
          rowClassName="customize-row"
          columns={columnsTest}
          dataSource={DanhSachBuocXacMinh}
          // onChange={onTableChange}
          pagination={{
            showSizeChanger: true,
            showTotal: (total, range) =>
              `Từ ${range[0]} đến ${range[1]} trên ${total} kết quả`,
            total: TotalRow,
            current: PageNumber,
            pageSize: PageSize,
          }}
        />
        {/* <table>
          <thead>
            <th>STT</th>
            <th>Ngày cập nhật</th>
            <th>Tên hồ sơ</th>
            <th>File đính kèm</th>
            <th>Thao tác</th>
          </thead>
          <tbody>
            {DanhSachBuocXacMinh.map(item => handleRenderTableItems(item))}
          </tbody>
        </table> */}
      </Box>
    </LayoutWrapper>
  );
};

export default TraCuuDonThu;
