import React, {Component, useEffect, useState} from 'react';
import {connect, useDispatch, useSelector} from 'react-redux';
import axios from 'axios';
import queryString from 'query-string';
import actions from '../../../redux/HeThong/QLHuongDanSuDung/actions';
import api, {apiUrl} from './config';
import Constants from '../../../../settings/constants';
import {Link} from 'react-router-dom';
import moment from 'moment';

import LayoutWrapper from '../../../../components/utility/layoutWrapper';
import PageHeader from '../../../../components/utility/pageHeader';
import PageAction from '../../../../components/utility/pageAction';
import Box from '../../../../components/utility/box';
import BoxFilter from '../../../../components/utility/boxFilter';
import BoxTable from '../../../../components/utility/boxTable';
import actionsSidebar from '../../../redux/HeThong/Sidebar/actions';
import {ModalAddEdit} from './modalAddEdit';
import {Modal, message, Input, Switch} from 'antd';
import Button from '../../../../components/uielements/button';
import Select, {Option} from '../../../../components/uielements/select';
import {
  changeUrlFilter,
  getFilterData,
  getDefaultPageSize,
  getConfigLocal,
} from '../../../../helpers/utility';
import optionsSidebar from '../../../sidebar';
import {formDataCaller} from '../../../../api/formDataCaller';
import {
  DeleteOutlined,
  DownloadOutlined,
  EditOutlined,
  FileAddOutlined,
} from '@ant-design/icons';
import {useKey} from '../../../CustomHook/useKey';
import PageWrap from '../../../../components/utility/PageWrap';

const QLHuongDanSuDung = (props) => {
  document.title = 'Quản lý hướng dẫn sử dụng';
  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search),
  );
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [modalKey, increaseKey] = useKey();
  const [visibleModalAddEdit, setVisibleModalAddEdit] = useState(false);
  const {ListSideBar} = useSelector((state) => state.ListSideBar);
  const [dataModalAddEdit, setDataModalAddEdit] = useState({});
  const [DanhSachCacCap, setDanhSachCacCap] = useState([]);
  const [action, setAction] = useState('');
  const dispatch = useDispatch();

  const getDanhSachCacCap = async () => {
    try {
      const res = await api.danhSachCacCapDonVi();
      setDanhSachCacCap(res.data.Data);
    } catch (error) {}
  };

  useEffect(() => {
    dispatch(actions.getInitData(filterData));
    dispatch(actionsSidebar.getList());
    getDanhSachCacCap();
  }, []);

  useEffect(() => {
    changeUrlFilter(filterData); //change url
    props.getList(filterData); //get list
  }, [filterData]);

  const onFilter = (value, property) => {
    //get filter data
    let oldFilterData = {...filterData};
    let onFilter = {value, property};
    let newFilterData = getFilterData(oldFilterData, onFilter, null);
    setFilterData(newFilterData);
  };
  //order, paging --------------------------------------------
  const onTableChange = (pagination, filters, sorter) => {
    //get filter data
    let oldFilterData = {...filterData};
    let onOrder = {pagination, filters, sorter};
    let newFilterData = getFilterData(oldFilterData, null, onOrder);
    //get filter data
    setFilterData(newFilterData);
  };

  //Delete-----------------------------------------------------
  const deleteData = (HuongDanSuDungID) => {
    Modal.confirm({
      title: 'Xóa dữ liệu',
      content: ' Bạn có muốn xóa file tài liệu hướng dẫn này không?',
      cancelText: 'Không',
      okText: 'Có',
      onOk: () => {
        api
          .xoaHuongDan({
            ListId: [HuongDanSuDungID],
          })
          .then((response) => {
            if (response.data.Status > 0) {
              //message success
              message.success('Xóa thành công');
              //reset page
              dispatch(actions.getList(filterData));
              dispatch(actions.getGuild());
            } else {
              Modal.error({
                title: 'Lỗi',
                content: response.data.Message,
              });
            }
          })
          .catch((error) => {
            Modal.error(Constants.API_ERROR);
          });
      },
    });
  };

  //download
  const downloadData = (record) => {
    //if(record.Base64String){
    Modal.confirm({
      title: 'Tải file hướng dẫn',
      content: 'Bạn có muốn tải file hướng dẫn?',
      cancelText: 'Không',
      okText: 'Có',
      onOk: async () => {
        const huongdan = await api.downloadFile({
          HuongDanSuDungID: record.HuongDanSuDungID,
        });
        if (huongdan && huongdan.data.Status > 0) {
          const Data = huongdan.data.Data;
          if (Data.UrlFile && Data.UrlFile !== '') {
            const link = document.createElement('a');
            link.href = Data.UrlFile;
            link.download = Data.TenFileGoc;
            link.target = '_blank';
            link.click();
          }
        }
      },
    });
  };

  //Modal add ------------------------------------------------
  const showModalAdd = () => {
    setDataModalAddEdit({});
    setVisibleModalAddEdit(true);
    increaseKey();
    setAction('add');
  };

  const submitModalAddEdit = (data, FileData) => {
    setConfirmLoading(true);

    if (action === 'add') {
      const formSave = new FormData();
      formSave.append('files', FileData);
      formSave.append('HuongDanSuDungModelStr', JSON.stringify(data));

      formDataCaller(apiUrl.themhuongdan, formSave)
        .then((response) => {
          setConfirmLoading(false);
          if (response.data.Status > 0) {
            //message success
            message.success('Thêm thành công');
            //hide modal
            hideModalAddEdit();
            //reset page
            dispatch(actions.getList(filterData));
            dispatch(actions.getGuild());
          } else {
            message.destroy();
            message.error(response.data.Message);
          }
        })
        .catch((error) => {
          message.destroy();
          message.error(error.toString());
        });
    } else if (action === 'edit') {
      const formSave = new FormData();
      formSave.append('HuongDanSuDungModelStr', JSON.stringify(data));
      if (FileData.name) {
        formSave.append('files', FileData);
      }
      formDataCaller(apiUrl.suahuongdan, formSave)
        .then((response) => {
          setConfirmLoading(false);
          if (response.data.Status > 0) {
            //message success
            message.success('Cập nhật thành công');
            //hide modal
            hideModalAddEdit();
            //reset page
            dispatch(actions.getList(filterData));
            dispatch(actions.getGuild());
          } else {
            message.destroy();
            message.error(response.data.Message);
          }
        })
        .catch((error) => {
          message.destroy();
          message.error(error.toString());
        });
    }
  };

  //Modal edit ------------------------------------------------
  const showModalEdit = (record) => {
    setDataModalAddEdit({
      Data: record,
      DanhSachHuongDan: [],
    });
    setVisibleModalAddEdit(true);
    increaseKey();
    setAction('edit');
  };

  const hideModalAddEdit = () => {
    setVisibleModalAddEdit(false);
    setDataModalAddEdit({});
  };

  //Render action ---------------------------------------------
  const renderActionAdd = () => {
    const {FileLimit} = props;
    return (
      <span>
        <Button type="primary" onClick={showModalAdd}>
          <FileAddOutlined />
          Thêm mới
        </Button>
        {/* <FileAddOutlined type="primary" onClick={showModalAdd}>
          Thêm
        </FileAddOutlined> */}
      </span>
    );
  };

  //Render ----------------------------------------------------
  //data
  const {DanhSachHuongDan, TotalRow, role} = props;

  //paging info
  const PageNumber = filterData.PageNumber
    ? parseInt(filterData.PageNumber)
    : 1;
  const PageSize = filterData.PageSize
    ? parseInt(filterData.PageSize)
    : getDefaultPageSize();
  //format table
  const iconStyle = {fontSize: 20, cursor: 'pointer', margin: '0 10px'};
  const iconStyleDisable = {
    fontSize: 20,
    cursor: 'default',
    margin: '0 10px',
    color: 'grey',
  };
  const columns = [
    {
      title: 'STT',
      align: 'center',
      width: '5%',
      render: (text, record, index) => (
        <span>{(PageNumber - 1) * PageSize + (index + 1)}</span>
      ),
    },
    {
      title: 'Tên chức năng',
      dataIndex: 'TenChucNang',
      width: '25%',
    },
    {
      title: 'Tiêu đề hướng dẫn',
      dataIndex: 'TieuDe',
      width: '30%',
      render: (text, record, index) => (
        <span style={{whiteSpace: 'pre'}}>{text}</span>
      ),
    },
    {
      title: 'Cấp',
      dataIndex: 'TenChucNang',
      width: '10%',
      render: (text, record, index) => {
        return (
          <span>
            {record.CapID
              ? DanhSachCacCap?.find((item) => item.Cap === record.CapID)
                  ?.TenCap
              : null}
          </span>
        );
      },
    },
    {
      title: 'Ngày cập nhật',
      dataIndex: 'NgayCapNhat',
      width: '15%',
      align: 'center',
      render: (text) => moment(text).format('DD/MM/YYYY'),
    },
    {
      title: 'Thao tác',
      dataIndex: 'NgayCapNhat',
      width: '10%',
      align: 'center',
      render: (text, record, index) => (
        <div className="action-btn">
          {role.edit ? (
            <EditOutlined onClick={() => showModalEdit(record)} />
          ) : null}
          {role.delete ? (
            <DeleteOutlined
              onClick={() => deleteData(record.HuongDanSuDungID)}
            />
          ) : null}
          <DownloadOutlined onClick={() => downloadData(record)} />
        </div>
      ),
    },
  ];

  const {FileLimit} = props;
  return (
    <LayoutWrapper>
      <PageWrap>
        <PageHeader>tài liệu hướng dẫn</PageHeader>
        <PageAction>{role.add ? renderActionAdd() : ''}</PageAction>
      </PageWrap>
      <Box>
        <BoxFilter>
          <Select
            allowClear
            onChange={(value) => onFilter(value, 'NhomChucNang')}
            defaultValue={
              filterData.NhomChucNang ? filterData.NhomChucNang : undefined
            }
            placeholder="Chọn nhóm chức năng"
            style={{width: 200}}
          >
            {ListSideBar.map((item) => (
              <Option key={item.MenuID} value={item.MenuID.toString()}>
                {item.TenMenu}
              </Option>
            ))}
          </Select>
          <Select
            allowClear
            onChange={(value) => onFilter(value, 'CapID')}
            defaultValue={filterData.CapID ? filterData.CapID : undefined}
            style={{width: '200px'}}
            placeholder={'Chọn cấp'}
          >
            {DanhSachCacCap?.map((item) => (
              <Option value={item.Cap?.toString()}>{item.TenCap}</Option>
            ))}
          </Select>
          <Input.Search
            allowClear={true}
            defaultValue={filterData.Keyword}
            placeholder="Tìm kiếm theo tên chức năng"
            onSearch={(value) => onFilter(value, 'Keyword')}
            style={{width: 300}}
          />
        </BoxFilter>
        <BoxTable
          columns={columns}
          // rowKey="HuongDanSuDungID"
          dataSource={DanhSachHuongDan}
          loading={props.TableLoading}
          onChange={onTableChange}
          pagination={{
            showSizeChanger: true, //show text: PageSize/page
            showTotal: (total, range) =>
              `Từ ${range[0]} đến ${range[1]} trên ${total} kết quả`,
            total: TotalRow,
            current: PageNumber, //current page
            pageSize: PageSize,
          }}
        />
      </Box>
      <ModalAddEdit
        confirmLoading={confirmLoading}
        visible={visibleModalAddEdit}
        onCancel={hideModalAddEdit}
        onCreate={submitModalAddEdit}
        dataModalAddEdit={dataModalAddEdit}
        danhSachCacCap={DanhSachCacCap}
        key={modalKey}
        FileLimit={FileLimit}
        actions={actions}
      />
    </LayoutWrapper>
  );
};

function mapStateToProps(state) {
  return {
    ...state.QLHuongDanSuDung,
    FileLimit: getConfigLocal('fileLimit', 10),
  };
}

export default connect(mapStateToProps, actions)(QLHuongDanSuDung);
