import {Modal, Table, Tooltip, message} from 'antd';
import actions from '../../../redux/HeThong/XoaDonThuLoi/actions';
import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import LayoutWrapper from '../../../../components/utility/layoutWrapper';
import PageHeader from '../../../../components/utility/pageHeader';
import PageAction from '../../../../components/utility/pageAction';
import Box from '../../../../components/utility/box';
import BoxFilter from '../../../../components/utility/boxFilter';
import BoxTable from '../../../../components/utility/boxTable';
import {
  Button,
  InputSearch,
  Select,
} from '../../../../components/uielements/exportComponent';
import Checkbox from '../../../../components/uielements/checkbox';
import dayjs from 'dayjs';
import {Option} from '../../../../components/uielements/exportComponent';
import {DatePicker as DatePickerFormat} from '../../../../components/uielements/exportComponent';
import ModalChiTietDonThu from '../../NghiepVu/Shared/Modal/ModalChiTietDonThu';
import ModalAddEdit from './modalAddEdit';
import {
  changeUrlFilter,
  exportExcel,
  getDefaultPageSize,
  getFilterData,
  getRoleByKey,
  disabledDate,
} from '../../../../helpers/utility';
import {useKey} from '../../../CustomHook/useKey';
import {formDataCaller} from '../../../../api/formDataCaller';
import {apiUrl} from './config';
import queryString from 'query-string';
import api from './config';
import moment from 'moment';
import {
  DeleteOutlined,
  EditOutlined,
  PlusOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons';
import {useSelector} from 'react-redux';
import PageWrap from '../../../../components/utility/PageWrap';
const XoaDonThuLoi = (props) => {
  document.title = 'Quy trình hệ thống';
  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search),
  );
  const [DanhSachCacCap, setDanhSachCacCap] = useState([]);
  const [DanhSachChiTietCacCap, setDanhSachChiTietCacCap] = useState([]);
  const [DanhSachQuyTrinh, setDanhSachQuyTrinh] = useState([]);
  const [dataProgress, setDataProgress] = useState({});
  const [dataModalAddEdit, setDataModalAddEdit] = useState([]);
  const [visibleModalAddEdit, setVisibleModalAddEdit] = useState(false);
  const [keyModalAddEdit, increaseKey] = useKey();
  const [keyImg, setKeyImg] = useState(0);

  useEffect(() => {
    changeUrlFilter(filterData);
  }, [filterData]);

  const onFilter = (value, property) => {
    let oldFilterData = filterData;
    let onFilter = {value, property};
    let newfilterData = getFilterData(oldFilterData, onFilter, null);
    //get filter data
    setFilterData(newfilterData);
  };

  useEffect(() => {
    api.GetAllCap().then((res) => {
      if (res.data.Status > 0) {
        setDanhSachCacCap(res.data.Data);
      }
    });
    if (filterData.CapID) {
      handleGetCoQuanByCap(filterData.CapID);
    }
    if (filterData.CoQuanID) {
      handleGetQuyTrinhByCoQuan(filterData.CoQuanID);
    }
    if (filterData.QuyTrinhID && filterData.CoQuanID) {
      api.GetQuyTrinhByCap({CapID: filterData.CoQuanID}).then((res) => {
        if (res.data.Status > 0) {
          const DanhSachQuyTrinh = res.data.Data;
          if (DanhSachQuyTrinh) {
            const obj = res.data.Data.find(
              (item) => item.QuyTrinhID === Number(filterData.QuyTrinhID),
            );
            setDataProgress(obj);
            setKeyImg((prevKey) => prevKey + 1);
          }
        } else {
          message.destroy();
          message.warning(res.data.Message);
        }
      });
    }
  }, []);

  const handleGetCoQuanByCap = (CapID) => {
    api.GetCoQuanByCap({CapID}).then((res) => {
      if (res.data.Status > 0) {
        setDanhSachChiTietCacCap(res.data.Data);
      } else {
        message.destroy();
        message.warning(res.data.Message);
      }
    });
  };

  const handleGetQuyTrinhByCoQuan = (CapID) => {
    api.GetQuyTrinhByCap({CapID}).then((res) => {
      if (res.data.Status > 0) {
        setDanhSachQuyTrinh(res.data.Data);
      } else {
        message.destroy();
        message.warning(res.data.Message);
      }
    });
  };

  const showModalAddEdit = () => {
    setVisibleModalAddEdit(true);
    increaseKey();
  };

  const hideModalAddEdit = () => {
    setVisibleModalAddEdit(false);
  };

  const submitModalAddEdit = (value) => {
    const formFile = new FormData();
    if (!value.File.FileID) {
      formFile.append('files', value.File);
    }
    delete value.File;
    value.CapID = filterData.CoQuanID;
    formFile.append('QuyTrinhStr', JSON.stringify(value));
    formDataCaller(apiUrl.luuquytrinh, formFile)
      .then((response) => {
        if (response.data.Status > 0) {
          // handleGetQuyTrinhByCoQuan(filterData.CoQuanID);
          api.GetQuyTrinhByCap({CapID: filterData.CoQuanID}).then((res) => {
            if (res.data.Status > 0) {
              setDanhSachQuyTrinh(res.data.Data);
              const obj = res.data.Data.find(
                (item) => item.QuyTrinhID === value.QuyTrinhID,
              );
              setDataProgress(obj);
              setKeyImg((prevKey) => prevKey + 1);
            } else {
              message.destroy();
              message.warning(res.data.Message);
            }
          });

          message.destroy();
          message.success(response.data.Message);
          hideModalAddEdit();
        } else {
          message.destroy();
          message.error(response.data.Message);
        }
      })
      .catch((error) => {
        message.destroy();
      });
  };

  const {role} = props;
  return (
    <LayoutWrapper>
      <PageWrap>
        <PageHeader>Quy trình hệ thống</PageHeader>
      </PageWrap>
      <Box>
        <BoxFilter>
          <Select
            style={{width: 300}}
            placeholder="Chọn cấp"
            value={filterData.CapID}
            onChange={(value) => {
              onFilter(value, 'CapID');
              onFilter(null, 'CoQuanID');
              onFilter(null, 'QuyTrinhID');
              if (!value) {
                setDataProgress({});
                setDanhSachQuyTrinh([]);
                setDanhSachChiTietCacCap([]);
              } else {
                handleGetCoQuanByCap(value);
              }
            }}
          >
            {DanhSachCacCap
              ? DanhSachCacCap.map((item) => (
                  <Option value={item.CapID?.toString()}>{item.TenCap}</Option>
                ))
              : null}
          </Select>
          <Select
            style={{width: 300}}
            placeholder="Chọn cơ quan"
            value={filterData.CoQuanID}
            onChange={(value) => {
              onFilter(value, 'CoQuanID');
              onFilter(null, 'QuyTrinhID');
              handleGetQuyTrinhByCoQuan(value);
              setDataProgress({});
            }}
          >
            {DanhSachChiTietCacCap
              ? DanhSachChiTietCacCap.map((item) => (
                  <Option value={item.CapID?.toString()}>{item.TenCap}</Option>
                ))
              : null}
          </Select>

          <Select
            style={{width: 350}}
            placeholder="Chọn quy trình"
            value={filterData.QuyTrinhID}
            onChange={(value) => {
              onFilter(value, 'QuyTrinhID');
              const obj = DanhSachQuyTrinh.find(
                (item) => item.QuyTrinhID === Number(value),
              );
              setDataProgress(obj);
              setKeyImg((prevKey) => prevKey + 1);
            }}
          >
            {' '}
            {DanhSachQuyTrinh
              ? DanhSachQuyTrinh.map((item) => (
                  <Option value={item.QuyTrinhID?.toString()}>
                    {item.TenQuyTrinh}
                  </Option>
                ))
              : null}
          </Select>
          {dataProgress?.ImgUrl && role?.edit ? (
            <Button type="primary" onClick={showModalAddEdit}>
              Sửa
            </Button>
          ) : null}
        </BoxFilter>
        <div style={{width: '100%', height: '100%'}} key={keyImg}>
          {dataProgress?.ImgUrl ? (
            <iframe
              style={{width: '100%', height: '100%'}}
              src={dataProgress?.ImgUrl}
            ></iframe>
          ) : null}
        </div>
      </Box>
      <ModalAddEdit
        key={keyModalAddEdit}
        visible={visibleModalAddEdit}
        onCancel={hideModalAddEdit}
        dataEdit={dataProgress}
        onCreate={submitModalAddEdit}
      />
    </LayoutWrapper>
  );
};

function mapStateToProps(state) {
  return {
    role: getRoleByKey(state.Auth.role, 'quy-trinh-he-thong'),
  };
}

export default connect(mapStateToProps, actions)(XoaDonThuLoi);
