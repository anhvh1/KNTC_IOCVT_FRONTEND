import styled from "styled-components";

const Wrapper = styled.div`
  .ant-tabs-nav {
    margin-bottom: 0px;
  }
  .ant-tabs-ink-bar-animated {
    display: none;
  }
  .ant-tabs-tab {
    border: 1px solid rgba(229, 229, 229, 1);
    width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    /* padding: 10px 30px; */
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    border-bottom: none;
  }
  .ant-tabs-tab-active {
    border: 1px solid rgba(33, 111, 202, 1);
    border-bottom: none;
  }
  .ant-tabs-tab + .ant-tabs-tab {
    margin: 0;
  }
`;

const WrapperTable = styled.div`
  max-height: 500px;
  overflow: auto;
  position: relative;
  .center {
    text-align: center;
  }
  .default-body {
    border: 1px solid #ddd;
  }
  .loading-table {
    width: 100%;
    position: absolute;
    height: 100%;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
    display: flex;
    justify-content: center;
    align-items: center;
    background: rgba(255, 255, 255, 0.6);
  }
  .inspection-table {
    width: 100%;
    border-collapse: collapse;
    font-family: Arial, sans-serif;
  }

  .inspection-table thead {
    position: sticky;
    top: -1px;
    background: white; /* Hoặc màu nền bạn muốn */
    z-index: 1; /* Đảm bảo thead nằm trên các hàng khác */
    border: 1px solid #ddd; /* Thêm border cho th */
    box-shadow: rgba(0, 22, 0, 0.1) 1px 0px 0px 0px;
  }

  .inspection-table th,
  .inspection-table td {
    border: 1px solid #ddd;
    padding: 8px;
    /* text-align: left; */
  }

  .inspection-table th {
    background-color: #f2f2f2;
    font-weight: bold;
  }

  .parent-row {
    background-color: #e6e6e6;
    font-weight: bold;
  }

  .child-row td:first-child {
    padding-left: 20px;
  }

  .highlighted {
    background-color: #fff9c4;
  }

  input[type="checkbox"] {
    transform: scale(1.5);
  }
`;

const WrapperModalCheck = styled.div`
  height: 50%;
  .ant-menu {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
  }
  .ant-menu-item-selected {
    color: rgba(70, 144, 218, 1);
    background: #fff;
  }
  .ant-menu-item {
    position: relative;
  }
  .ant-menu-item:hover {
    background: #fff !important;
  }
  .ant-menu-item::after {
    position: absolute;
    content: "";
    background: rgba(70, 144, 218, 1);
    left: 5px;
    height: 100%;
    width: 2px;
  }
  .ant-menu-title-content {
    border-bottom: 2px solid rgba(70, 144, 218, 1);
  }
`;

const styleExportExcel = `

  .center {
    text-align: center;
  }
  .inspection-table th:nth-child(1) {
    width: 5%;
  }

  .inspection-table th:nth-child(2) {
      width: 20%;
  }

  .inspection-table th:nth-child(3) {
      width: 30%;
  }

  .inspection-table th:nth-child(4),
  .inspection-table th:nth-child(5) {
      width: 10%;
  }

  .inspection-table th:nth-child(6),
  .inspection-table th:nth-child(7) {
      width: 15%;
  }

  .inspection-table th:nth-child(8) {
      width: 15%;
  }
  .inspection-table {
    width: 100%;
    border-collapse: collapse;
    font-family: Arial, sans-serif;
    }

    .inspection-table th,
    .inspection-table td {
      border: 1px solid #ddd;
      padding: 10px 20px !important;
      text-align: left;
    }

    .inspection-table th {
      background-color: #f2f2f2;
      font-weight: bold;
    }

    .parent-row {
      background-color: #e6e6e6;
      font-weight: bold;
    }

    .child-row td:first-child {
      padding-left: 20px;
    }

    .highlighted {
      background-color: #fff9c4;
    }

    input[type="checkbox"] {
      transform: scale(1.5);
    }
`;

const styleWrapper = `
  .custom-expandable-table {
    overflow: hidden;
    overflow-x: auto;
    background: #f2f6fc;
    border: 1px solid rgb(229, 229, 229); /* Thêm border cho bảng */
  }

    table thead tr th,
    table tbody tr td {
      border: 1px solid rgb(229, 229, 229);
      padding: 10px 20px;
      background: #fff;
    }

  .custom-expandable-table .ant-spin-container {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .custom-expandable-table .ant-table-body {
    border-collapse: collapse;
    max-height: calc(100vh - 390px);
  }

  .custom-expandable-table .ant-table-tbody tr {
    cursor: pointer;
  }

  .custom-expandable-table .ant-table-tbody tr:nth-child(even) {
    background: #fff !important;
  }

  .custom-expandable-table .ant-table-tbody tr:nth-child(odd) {
    background: #f2f6fc !important;
  }

  .custom-expandable-table .ant-table-thead > tr > th {
    color: #333; /* Thay thế bằng màu từ palette */
    font-size: 13px;
    background-color: #f2f6fc; /* Thay thế bằng màu từ palette */
    border-bottom: none;
    text-align: center;
  }

  .custom-expandable-table .ant-table-thead > tr > th,
  .custom-expandable-table .ant-table-tbody > tr > td {
    padding: 8px 5px;
    text-align: left; /* Hoặc right nếu cần */
  }

  .custom-expandable-table .ant-table-tbody > tr > td {
    font-size: 12px;
    border: 1px solid rgba(229, 229, 229, 1) !important; /* Thêm border cho các ô */
  }

  .custom-expandable-table .ant-table-header {
    border-radius: 0 !important;
    background-color: transparent;
  }

  .custom-expandable-table .ant-table-title {
    background: #f2f6fc; /* Thay thế bằng màu từ palette */
    color: #333; /* Thay thế bằng màu từ palette */
    font-size: 13px;
    font-weight: 500;
    padding: 16px 30px;
  }
`;

const WrapperExcel = styled.div`
  .custom-expandable-table {
    overflow: hidden;
    overflow-x: auto;
    background: #f2f6fc;
    border: 1px solid rgb(229, 229, 229); /* Thêm border cho bảng */
  }
  table thead tr th,
  table tbody tr td {
    border: 1px solid rgb(229, 229, 229);
    padding: 10px 20px;
    background: #fff;
  }

  .custom-expandable-table .ant-spin-container {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .custom-expandable-table .ant-table-body {
    border-collapse: collapse;
    max-height: calc(100vh - 390px);
  }

  .custom-expandable-table .ant-table-tbody tr {
    cursor: pointer;
  }

  .custom-expandable-table .ant-table-tbody tr:nth-child(even) {
    background: #fff !important;
  }

  .custom-expandable-table .ant-table-tbody tr:nth-child(odd) {
    background: #f2f6fc !important;
  }

  .custom-expandable-table .ant-table-thead > tr > th {
    color: #333; /* Thay thế bằng màu từ palette */
    font-size: 13px;
    background-color: #f2f6fc; /* Thay thế bằng màu từ palette */
    border-bottom: none;
    text-align: center;
  }

  .custom-expandable-table .ant-table-thead > tr > th,
  .custom-expandable-table .ant-table-tbody > tr > td {
    padding: 8px 5px;
    text-align: left; /* Hoặc right nếu cần */
  }

  .custom-expandable-table .ant-table-tbody > tr > td {
    font-size: 12px;
    border: 1px solid rgba(229, 229, 229, 1) !important; /* Thêm border cho các ô */
  }

  .custom-expandable-table .ant-table-header {
    border-radius: 0 !important;
    background-color: transparent;
  }

  .custom-expandable-table .ant-table-title {
    background: #f2f6fc; /* Thay thế bằng màu từ palette */
    color: #333; /* Thay thế bằng màu từ palette */
    font-size: 13px;
    font-weight: 500;
    padding: 16px 30px;
  }
`;

export {
  WrapperTable,
  WrapperModalCheck,
  styleExportExcel,
  styleWrapper,
  WrapperExcel,
};
export default Wrapper;
