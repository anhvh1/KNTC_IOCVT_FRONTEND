import React, {useEffect, useState} from 'react';
import {Form, InputNumber, Radio, Select as SelectAnt} from 'antd';
import {
  Button,
  Modal,
  Input,
  Select,
  Option,
} from '../../../components/uielements/exportComponent';
import moment from 'moment';
import {getTotalMonthsOfYear} from '../../../helpers/utility';
const {Item, useForm} = Form;
// const {Option} = Select;

export default (props) => {
  const [form] = useForm();
  const {
    dataEdit,
    loading,
    visible,
    action,
    IDmodal,
    CoQuanDonVi,
    data,
    setData,
    onChangeData,
    onGetDanhSachCoQuan,
    DanhSachCoQuan,
    ListFilterYeas,
    ListQuarter,
    ListYears,
    ListMonths,
    ListCap,
  } = props;

  useEffect(() => {
    if (data.CoquanID && data.CapID) {
      onGetDanhSachCoQuan(CapID);
    }
  }, []);

  const onOk = async (e) => {
    e.preventDefault();
    const value = await data;
    props.onCreate(value);
  };

  return (
    <Modal
      title={`Lọc dữ liệu`}
      width={450}
      visible={visible}
      onCancel={props.onCancel}
      loading={loading}
      footer={[
        <Button key="back" onClick={props.onCancel}>
          Hủy
        </Button>,
        <Button
          key="submit"
          htmlType="submit"
          type="primary"
          loading={loading}
          onClick={onOk}
        >
          Xem dữ liệu
        </Button>,
      ]}
    >
      <div className="filter-wrapper">
        <div className="filter-items">
          <p className="filter-items__title">Chọn loại thời gian</p>
          <Select
            style={{width: '100%'}}
            onChange={(value) => {
              onChangeData('LoaiThoiGianID', value, null, true);
            }}
            value={data?.LoaiThoiGianID}
          >
            <Option value={1}>Tháng </Option>
            <Option value={2}>Năm</Option>
            <Option value={3}>Quý</Option>
          </Select>
        </div>
        <div className="filter-items">
          <p className="filter-items__title">Năm</p>
          <Select
            style={{width: '100%'}}
            onChange={(value) => onChangeData('Nam', value)}
            value={data?.Nam}
          >
            {ListYears &&
              ListYears.map((item) => (
                <Option value={item.Value}>{item.Nam}</Option>
              ))}
          </Select>
        </div>
        <div className="filter-items">
          <p className="filter-items__title">
            {data?.LoaiThoiGianID === 1
              ? 'Chọn tháng'
              : data?.LoaiThoiGianID === 2
              ? 'Chọn kỳ báo cáo'
              : data?.LoaiThoiGianID === 3
              ? 'Chọn quý'
              : ''}
          </p>
          {data?.LoaiThoiGianID === 1 ? (
            <Select
              style={{width: '100%'}}
              onChange={(value) => onChangeData('Data', value, 1)}
              value={data?.Data}
            >
              {ListMonths &&
                ListMonths.map((item) => (
                  <Option value={item.Value}>{item.Title}</Option>
                ))}
            </Select>
          ) : data?.LoaiThoiGianID === 3 ? (
            <Select
              style={{width: '100%'}}
              onChange={(value) => onChangeData('Data', value, 3)}
              value={data?.Data}
            >
              {ListQuarter &&
                ListQuarter.map((item) => (
                  <Option value={item.Value}>{item.Title}</Option>
                ))}
            </Select>
          ) : data?.LoaiThoiGianID === 2 ? (
            <Select
              style={{width: '100%'}}
              onChange={(value) => onChangeData('Data', value, 2)}
              value={data?.Data}
            >
              {ListFilterYeas &&
                ListFilterYeas.map((item) => (
                  <Option value={item.Value}>{item.Title}</Option>
                ))}
            </Select>
          ) : (
            ''
          )}
        </div>
      </div>
    </Modal>
  );
};
