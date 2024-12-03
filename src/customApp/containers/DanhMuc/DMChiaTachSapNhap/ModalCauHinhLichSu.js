import React, {useEffect, useRef, useState} from 'react';
import {
  COL_COL_ITEM_LAYOUT_RIGHT,
  ITEM_LAYOUT2,
  COL_ITEM_LAYOUT_HALF,
  ITEM_LAYOUT_HALF_SMALL,
  ITEM_LAYOUT_SMALL,
  ITEM_LAYOUT_SMALL_2,
  REQUIRED,
  COL_ITEM_LAYOUT_HALF_RIGHT,
  ITEM_LAYOUT_HALF2,
} from '../../../../settings/constants';
import {Form, Radio, Row, Col, Modal as ModalAnt} from 'antd';
import {
  Button,
  Modal,
  Input,
  Select,
  Option,
} from '../../../../components/uielements/exportComponent';
import {checkInputNumber} from '../../../../helpers/utility';
import apiTiepDan from '../../NghiepVu/TiepCongDanThuongXuyen/config';
import TextArea from 'antd/lib/input/TextArea';
import {DeleteOutlined} from '@ant-design/icons';
import box from '../../../../components/utility/box';
import BoxFilter from '../../../../components/utility/boxFilter';
import BoxTable from '../../../../components/utility/boxTable';
import {InputSearch} from '../../../../components/uielements/exportComponent';
const {Item, useForm} = Form;
import {getDefaultPageSize} from '../../../../helpers/utility';
import api from './config';
import {getFilterData} from '../../../../helpers/utility';
import dayjs from 'dayjs';

export default (props) => {
  const [dataLichSuCauHinh, setDataLichSuCauHinh] = useState({});
  const [dataFilter, setDataFilter] = useState({});

  const getDanhSachLichSuCauHinh = (param) => {
    api.DanhSachCauHinhLichSu(param).then((res) => {
      if (res.data.Status > 0) {
        setDataLichSuCauHinh({
          DanhSachCauHinhLichSu: res.data.Data,
          TotalRow: res.data.TotalRow,
        });
      }
    });
  };

  useEffect(() => {
    getDanhSachLichSuCauHinh(dataFilter);
  }, [dataFilter]);

  const onTableChange = (pagination, filters, sorter) => {
    let oldFilterData = dataFilter;
    let onOrder = {pagination, filters, sorter};
    let newFilterData = getFilterData(oldFilterData, null, onOrder);
    setDataFilter(newFilterData);
  };

  const PageNumber = dataFilter.PageNumber
    ? parseInt(dataFilter.PageNumber)
    : 1;
  const PageSize = dataFilter.PageSize
    ? parseInt(dataFilter.PageSize)
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
      title: 'Tên cơ quan mới',
      dataIndex: 'TenCoQuanMoi',
      align: 'left',
      width: 30,
      render: (text, record, index) => (
        <p dangerouslySetInnerHTML={{__html: record.TenCoQuanMoi}}></p>
      ),
    },
    {
      title: 'Tên cơ quan cũ',
      dataIndex: 'TenChiaTachSapNhap',
      align: 'left',
      width: 30,
      render: (text, record, index) => (
        <p dangerouslySetInnerHTML={{__html: record.TenCoQuanCu}}></p>
      ),
    },

    {
      title: 'Trạng thái',
      dataIndex: 'ChiaTachSapNhap',
      align: 'left',
      width: 30,
    },
    {
      title: 'Người thực hiện',
      width: '15%',
      align: 'center',
      dataIndex: 'TenNguoiThucHien',
    },
    {
      title: 'Ngày thực hiện',
      align: 'left',
      width: 30,
      render: (text, record, index) => (
        <p>
          {record.NgayThucHien
            ? dayjs(record.NgayThucHien).format('DD/MM/YYYY')
            : null}
        </p>
      ),
    },
  ];

  const onFilter = (value, property) => {
    let oldFilterData = {...dataFilter};
    let onFilter = {value, property};
    let newfilterData = getFilterData(oldFilterData, onFilter, null);
    //get filter data
    setDataFilter(newfilterData);
  };

  const {visible, onCancel, loading} = props;

  return (
    <Modal
      title={`Lịch sử cấu hình chia tách, sát nhập cơ quan`}
      width={1000}
      visible={visible}
      onCancel={props.onCancel}
      footer={[
        <Button key="back" onClick={props.onCancel}>
          Đóng
        </Button>,
      ]}
    >
      <BoxFilter>
        <InputSearch
          defaultValue={dataFilter.Keyword}
          placeholder={'Nhập tên cơ quan'}
          style={{width: 300}}
          onSearch={(value) => onFilter(value, 'Keyword')}
        />
      </BoxFilter>
      <BoxTable
        columns={columns}
        dataSource={dataLichSuCauHinh.DanhSachCauHinhLichSu}
        onChange={onTableChange}
        minHeight={400}
        pagination={{
          showSizeChanger: true,
          showTotal: (total, range) =>
            `Từ ${range[0]} đến ${range[1]} trên ${total} kết quả`,
          total: dataLichSuCauHinh.TotalRow,
          current: PageNumber,
          pageSize: PageSize,
        }}
        rowKey={(record) => record.ChiaTachSapNhapID}
      />
    </Modal>
  );
};
