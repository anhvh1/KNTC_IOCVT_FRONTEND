import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import LayoutWrapper from '../../../../components/utility/layoutWrapper';
import PageHeader from '../../../../components/utility/pageHeader';
import Box from '../../../../components/utility/box';
import BoxFilter from '../../../../components/utility/boxFilter';
import Select, {Option} from '../../../../components/uielements/select';
import {InputSearch} from '../../../../components/uielements/exportComponent';
import {
  changeUrlFilter,
  getFilterData,
  getRoleByKey,
} from '../../../../helpers/utility';
import queryString from 'query-string';
import Layout, {LayoutFull} from './layout';
import NhomFileComponent from './nhomFileComponent';
import FileComponent from './fileComponent';
import api from './fileConfig';
import './style.css';
import PageWrap from '../../../../components/utility/PageWrap';

const index = (props) => {
  document.title = 'Danh Mục File Đính Kèm';
  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search),
  );
  const [selectedRowsKey, setSelectedRowsKey] = useState([]);
  const [danhSachChucNang, setDanhSachChucNang] = useState([]);
  const [tableHeight, setTableHeight] = useState(500);

  const onWindowResize = () => {
    let currentWidth = window.innerWidth;
    window.addEventListener('resize', (e) => {
      currentWidth = e.currentTarget.innerWidth;
      setTableHeight(currentWidth >= 1200 && currentWidth < 1337 ? 470 : 500);
    });

    setTableHeight((pre) =>
      currentWidth >= 1200 && currentWidth < 1337 ? 470 : 500,
    );
  };

  const getDanhSachChucNang = (filterData) => {
    api
      .DanhSachChucNang({...filterData, Keyword: filterData?.KeywordNhomFile})
      .then((res) => {
        if (res.data.Status === 1) {
          setDanhSachChucNang(res.data.Data);
        } else {
          message.destroy();
          message.success(res.data.Message);
        }
      })
      .catch((error) => {
        message.destroy();
        message.error(error.toString());
      });
  };

  useEffect(() => {
    changeUrlFilter(filterData);
    getDanhSachChucNang(filterData);
    onWindowResize();
  }, [filterData]);

  useEffect(() => {
    getDanhSachChucNang(filterData);
    onWindowResize();
  }, []);

  const onFilter = (value, property) => {
    let oldFilterData = filterData;
    let onFilter = {value, property};
    let newfilterData = getFilterData(oldFilterData, onFilter, null);
    //get filter data
    setFilterData(newfilterData);
    setSelectedRowsKey([]);
  };

  const onChangeChucNang = (value) => {
    onFilter(value, 'ChucNangID');
  };

  const FilterListGroupFileByKey = (keyword) => {};

  const {role} = props;
  return (
    <LayoutWrapper>
      <PageWrap>
        <PageHeader>Danh Mục File Đính Kèm</PageHeader>
      </PageWrap>
      <Box>
        <Layout>
          <NhomFileComponent
            filterData={filterData}
            setFilterData={setFilterData}
            selectedRowsKey={selectedRowsKey}
            setSelectedRowsKey={setSelectedRowsKey}
            danhSachChucNang={danhSachChucNang}
            onFilter={onFilter}
            tableHeight={tableHeight}
            role={role}
          />
          <FileComponent
            filterData={filterData}
            setFilterData={setFilterData}
            danhSachChucNang={danhSachChucNang}
            selectedRowsKey={selectedRowsKey}
            setSelectedRowsKey={setSelectedRowsKey}
            tableHeight={tableHeight}
            onFilter={onFilter}
            role={role}
          />
        </Layout>
      </Box>
    </LayoutWrapper>
  );
};

function mapStateToProps(state) {
  return {
    ...state.DanhMucChucNangFile,
    role: getRoleByKey(state.Auth.role, 'danh-muc-file-dinh-kem'),
  };
}

export default connect(mapStateToProps)(index);
