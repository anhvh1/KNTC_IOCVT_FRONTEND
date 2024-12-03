import React, {useEffect, useState} from 'react';
import LayoutWrapper from '../../../../components/utility/layoutWrapper';
import BoxTable from '../../../../components/utility/boxTable';
import PageHeader from '../../../../components/utility/pageHeader';
import PageAction from '../../../../components/utility/pageAction';
import Box from '../../../../components/utility/box';
import BoxFilter from '../../../../components/utility/boxFilter';
import Statiscial from '../StatiscialOrign';
import {DatePicker, message, Modal, Tooltip} from 'antd';
import {
  Button,
  InputSearch,
  Select,
  Option,
} from '../../../../components/uielements/exportComponent';
import {WrapperStatiscial} from '../HOC';
import actions from '../../../redux/BaoCao/THKetQuaThanhTraHanhChinh/action';
import {useDispatch, useSelector} from 'react-redux';
import queryString from 'query-string';
import {
  changeUrlFilter,
  getFilterData,
  disabledDate,
} from '../../../../helpers/utility';
import moment from 'moment';
import styled from 'styled-components';
const Statiscial2A = (props) => {
  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search),
  );
  const [danhSachDonVi, setDanhSachDonVi] = useState([]);
  const [tableHeader, setTableHeader] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [title, setTitle] = useState('');
  const [unitReport, setUnitReport] = useState('');
  const {ThongTinBaoCao} = useSelector(
    (state) => state.BaoCaoTongHopKetQuaThanhTraHanhChinh,
  );

  const dispatch = useDispatch();

  // useEffect(() => {
  //     dispatch(actions.getData())
  // },[])

  useEffect(() => {
    changeUrlFilter(filterData);
    dispatch(actions.getList(filterData));
  }, [filterData]);

  const onFilter = (value, property) => {
    let oldFilterData = filterData;
    let onFilter = {value, property};
    let newfilterData = getFilterData(oldFilterData, onFilter, null);
    //get filter data
    setFilterData(newfilterData);
  };

  useEffect(() => {
    if (
      ThongTinBaoCao?.DataTable &&
      ThongTinBaoCao?.DataTable.TableHeader &&
      tableHeader.length === 0
    ) {
      setTableHeader(ThongTinBaoCao?.DataTable?.TableHeader);
      setTableData(ThongTinBaoCao?.DataTable?.TableData);
      setTitle(ThongTinBaoCao.Title);
      setUnitReport(ThongTinBaoCao.DonViTinh);
      const fakeDanhSachDonVi = [
        {
          TenDonVi: 'UBND Cấp Tỉnh',
          ID: 4,
        },
        {
          TenDonVi: 'Cấp Sở, Ngành',
          ID: 1,
        },
        {
          TenDonVi: 'UBND Cấp Huyện',
          ID: 2,
        },
        {
          TenDonVi: 'UBND Cấp Xã',
          ID: 3,
        },
      ];
      setDanhSachDonVi(fakeDanhSachDonVi);
    }
  }, [ThongTinBaoCao]);

  const handleCreateReport = () => {
    const listItemsRow = document.querySelectorAll('.item-row');
    const newArr = [];
    Array.isArray(listItemsRow);
    listItemsRow.forEach((item) => {
      const obj = dataRows.filter(
        (itemRow) => itemRow.id === Number(item.getAttribute('data-id')),
      );
    });
  };

  const handleChangeDonVi = (value) => {};

  return (
    <LayoutWrapper>
      <ReportWrappper>
        <PageHeader>Báo cáo Tổng hợp kết quả thanh tra hành chính</PageHeader>
        <Box>
          <BoxFilter Step={Step} isLeft={true}>
            <Select
              style={{
                width: '300px',
              }}
              placeholder={'Chọn một đơn vị bên dưới'}
              mode="multiple"
              onChange={(value) => onFilter(value, 'ListCapID')}
            >
              {danhSachDonVi.map((item) => (
                <Option id={item.ID} key={item.ID}>
                  {item?.TenDonVi}
                </Option>
              ))}
            </Select>
            <DatePicker
              placeholder="Từ Ngày"
              defaultValue={
                filterData?.DenNgay ? filterData?.DenNgay : moment()
              }
              format={'DD/MM/YY'}
              disabledDate={(currentDate) =>
                disabledDate(currentDate, filterData.DenNgay)
              }
            ></DatePicker>
            <DatePicker
              defaultValue={
                filterData?.DenNgay ? filterData?.DenNgay : moment()
              }
              format={'DD/MM/YY'}
              placeholder="Đến Ngày"
              disabledDate={(currentDate) =>
                disabledDate(filterData.TuNgay, currentDate, 2)
              }
            ></DatePicker>
            <Button onClick={handleCreateReport}>Tạo Báo Cáo</Button>
          </BoxFilter>
          <div
            className="unit-report"
            dangerouslySetInnerHTML={{__html: unitReport}}
          ></div>
          {tableHeader.length ? (
            <Statiscial
              title="Báo cáo 2A"
              tableHeader={tableHeader}
              tableData={tableData}
              handleCreateReport={handleCreateReport}
            />
          ) : null}
        </Box>
      </ReportWrappper>
    </LayoutWrapper>
  );
};

const ReportWrappper = styled.div``;

export default Statiscial2A;
