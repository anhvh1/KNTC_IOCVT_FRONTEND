import React, { useEffect, useRef, useState } from "react";
import { connect } from "react-redux";
import queryString from "query-string";
import actions from "../../../redux/HeThong/NhatKyHeThong/actions";
import moment from "moment";
import LayoutWrapper from "../../../../components/utility/layoutWrapper";
import PageHeader from "../../../../components/utility/pageHeader";
import Box from "../../../../components/utility/box";
import BoxFilter from "../../../../components/utility/boxFilter";
import BoxTable from "../../../../components/utility/boxTable";
import {
  Button,
  InputSearch,
} from "../../../../components/uielements/exportComponent";
import {
  changeUrlFilter,
  exportExcel,
  getDefaultPageSize,
  getFilterData,
} from "../../../../helpers/utility";
import BoxExcel from "./printExcel";
import { FileExcelOutlined } from "@ant-design/icons";
import PageAction from "../../../../components/utility/pageAction";
import ModalDetail from "./modalDetail";
import { useVisible } from "../../../CustomHook/useVisible";
import { useKey } from "../../../CustomHook/useKey";
import PageWrap from "../../../../components/utility/PageWrap";
import FilterTime from "../../NghiepVu/Shared/Component/BoxFilterTime";
import BreadCrumb from "../../NghiepVu/Shared/Component/BreadCumb";
function NhatKyHeThong(props) {
  document.title = "Nhật ký hệ thống";
  const excelRef = useRef();

  const [filterData, setFilterData] = useState(
    queryString.parse(props.location.search)
  );
  const { NhatKyHeThong, TotalRow, TableLoading, NhatKyHeThongAll } = props;
  const [visibleDetail, openVisibleDetail, closeVisibleDetail] = useVisible();
  const [modalKey, inceaseModalKey] = useKey();
  const [dataDetail, setDataDetail] = useState({});

  useEffect(() => {
    changeUrlFilter(filterData);
    props.getList(filterData);
  }, [filterData]);

  const onSearch = (value, property) => {
    let onFilter = { value, property };
    let newFilterData = getFilterData(filterData, onFilter, null);
    setFilterData(newFilterData);
  };

  const onTableChange = (pagination, filters, sorter) => {
    let onOrder = { pagination, filters, sorter };
    let newFilterData = getFilterData(filterData, null, onOrder);
    setFilterData(newFilterData);
  };

  const showDetail = (record) => {
    openVisibleDetail();
    setDataDetail(record);
  };

  const PageNumber = filterData.PageNumber
    ? parseInt(filterData.PageNumber)
    : 1;
  const PageSize = filterData.PageSize
    ? parseInt(filterData.PageSize)
    : getDefaultPageSize();
  //format table
  const columns = [
    {
      title: "STT",
      width: 5,
      align: "center",
      render: (text, record, index) => (
        <span>{(PageNumber - 1) * PageSize + (index + 1)}</span>
      ),
    },
    {
      title: "Tên cán bộ",
      dataIndex: "TenCanBo",
      width: 30,
    },
    {
      title: "Lịch sử thao tác",
      dataIndex: "LogInfo",
      width: 50,
      render: (text, record) => (
        <a onClick={() => showDetail(record)}>{text}</a>
      ),
    },
    {
      title: "Thời gian",
      align: "center",
      width: 15,
      render: (text, record) =>
        record.LogTime
          ? moment(record.LogTime).format("DD/MM/YYYY HH:mm:ss")
          : "",
    },
  ];

  const printExcel = () => {
    const html = excelRef.current.innerHTML;
    exportExcel(html, "Nhật ký hệ thống");
  };

  return (
    <LayoutWrapper>
      <PageHeader>
        <BreadCrumb />
        <div className="filter-right">
          <Button
            type="dowloadlist"
            onClick={printExcel}
            icon={<FileExcelOutlined />}
          >
            Xuất file
          </Button>
        </div>
      </PageHeader>
      <PageAction className="filter-action">
        <div className="filter-left">
          <FilterTime onFilter={onSearch} filterData={filterData} />
          <InputSearch
            defaultValue={filterData.Keyword}
            placeholder="Nhập nội dung tìm kiếm"
            onSearch={(value) => onSearch(value, "Keyword")}
            style={{ width: 300 }}
            allowClear
          />
        </div>
      </PageAction>
      <Box>
        <BoxTable
          columns={columns}
          dataSource={NhatKyHeThong}
          pagination={{
            showSizeChanger: true, //show text: PageSize/page
            showTotal: (total, range) =>
              `Từ ${range[0]} đến ${range[1]} trên ${total} kết quả`,
            total: TotalRow,
            current: PageNumber, //current page
            pageSize: PageSize,
          }}
          loading={TableLoading}
          onChange={onTableChange}
        />
      </Box>
      <BoxExcel excelRef={excelRef} NhatKyHeThong={NhatKyHeThongAll} />
      <ModalDetail
        onCancel={closeVisibleDetail}
        dataDetail={dataDetail}
        visible={visibleDetail}
      />
    </LayoutWrapper>
  );
}

function mapStateToProps(state) {
  return {
    ...state.NhatKyHeThong,
  };
}

export default connect(mapStateToProps, actions)(NhatKyHeThong);
