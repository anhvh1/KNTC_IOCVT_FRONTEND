import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Table} from './table';

const Report = ({
  tableLoading,
  setThongTinBaoCaoChiTiet,
  ThongTinBaoCao,
  ChiTietDonThu,
  ThongTinBaoCaoChiTiet,
  GetChiTietDonThu,
  loadingDetailsReport,
  Step,
  setStep,
  onRollBack,
  onExport,
  DetailsReportPayload,
  setLoadingDetailsReport,
  ListChangeRowReport,
  setListChangeRowReport,
  isViewDetail,
  tableKey,
  title = true,
  MaxLevel,
}) => {
  const {DanhSachTenFile, DanhSachLoaiKhieuTo} = useSelector(
    (state) => state.Report,
  );

  const mapsToProps = {
    tableHeader: ThongTinBaoCao?.DataTable?.TableHeader,
    tableData: ThongTinBaoCao?.DataTable?.TableData,
    tableHeaderDetail: ThongTinBaoCaoChiTiet?.DataTable?.TableHeader,
    tableDataDetail: ThongTinBaoCaoChiTiet?.DataTable?.TableData,
    setThongTinBaoCaoChiTiet,
    ListChangeRowReport,
    setListChangeRowReport,
    loading: Step === 1 ? tableLoading : loadingDetailsReport,
    setLoadingDetailsReport,
    ThongTinBaoCaoChiTiet,
    loadingDetailsReport,
    DetailsReportPayload,
    DanhSachLoaiKhieuTo,
    GetChiTietDonThu,
    DanhSachTenFile,
    tableLoading,
    ChiTietDonThu,
    BieuSo: Step === 1 ? ThongTinBaoCao?.BieuSo : '',
    Title: Step === 1 ? ThongTinBaoCao?.Title : '',
    SubTitle:
      Step === 1 && title
        ? `Số liệu tính từ ngày ${ThongTinBaoCao?.TuNgay} đến ngày ${ThongTinBaoCao?.DenNgay}`
        : '',
    setStep,
    Step,
    onRollBack,
    onExport,
    isViewDetail: isViewDetail === false ? false : true,
    MaxLevel,
  };
  return (
    <>
      <Table {...mapsToProps} key={tableKey} />
    </>
  );
};

export default Report;
