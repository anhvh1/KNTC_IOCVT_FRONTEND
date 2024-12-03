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
  position: relative;
  .wrapper-table {
    max-height: 500px;
    overflow: auto;
  }
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
    p {
      padding: 0 8px;
      display: inline-block;
    }
  }

  .inspection-table td {
    height: 50px;
    .note-area {
      height: 100%;
    }
  }

  .inspection-table th {
    background-color: #f2f2f2;
    font-weight: bold;
  }

  .parent-row {
    background-color: rgb(76, 153, 227);
    font-weight: bold;
    color: #fff;
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
  .odd {
    background: rgba(244, 246, 249, 1);
  }
  .count-column,
  .count-column__time {
    display: flex;
    align-items: center;
    gap: 10px;
    .hightlight-count {
      padding: 0 6px;
      background: rgba(76, 153, 227, 1);
      color: #fff;
    }
  }
  .count-column__time {
    justify-content: center;
  }
  .top-table {
    text-align: center;
    margin-bottom: 20px;
    p {
      font-weight: bold;
      font-size: 16px;
    }
  }
  .hightlight-content {
    background: rgba(234, 221, 103, 1);
    color: rgba(255, 0, 0, 1);
  }
  .wrapper-modal-check-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
    margin-bottom: 20px;
    .filter-left {
      display: flex;
      align-items: center;
      gap: 20px;
    }
  }
  .warning-check {
    color: red;
    font-weight: bold;
  }
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

  .ant-checkbox-wrapper-disabled .ant-checkbox-inner {
    background-color: rgba(229, 229, 229, 1) !important;
    border-color: rgba(229, 229, 229, 1) !important;
    &::after {
      border-color: #fff !important; /* Màu dấu tích */
    }
  }

  .ant-checkbox-checked .ant-checkbox-inner {
    background-color: white;
    border-color: #1890ff; /* Màu viền xanh của Ant Design */
  }

  .ant-checkbox-checked .ant-checkbox-inner::after {
    border-color: #1890ff; /* Màu dấu tích */
  }

  /* Tùy chọn: Nếu bạn muốn thay đổi màu khi hover */
  .ant-checkbox:hover .ant-checkbox-inner {
    border-color: #1890ff;
  }

  .ant-checkbox-wrapper:hover .ant-checkbox-inner,
  .ant-checkbox:hover .ant-checkbox-inner,
  .ant-checkbox-input:focus + .ant-checkbox-inner {
    border-color: #d9d9d9 !important; /* Giữ màu viền mặc định */
  }

  .ant-checkbox-checked::after {
    border: none !important; /* Loại bỏ hiệu ứng outline khi checked */
  }

  /* .ant-checkbox-wrapper:hover .ant-checkbox-checked .ant-checkbox-inner,
  .ant-checkbox-checked:hover .ant-checkbox-inner {
    background-color: white !important; 
    border-color: #1890ff !important; 
  } */
`;

const styleExportExcel = `
  * {
    font-family: "Times New Roman", Times, serif !important;
  }
    .checkbox-table input{
      text-align: center !important;
      width: 30px !important;
      height: 30px !important;
      }
  .top-table {
    text-align: center;
    margin-bottom : 20px;
  }
  .inspection-table td {
    padding : 10px !important;
    }
  .top-table  p {
      font-weight: bold;
      font-size: 16px;
      margin-bottom : 0px !important;
      margin: 0 !important;
  }
  .hightlight-content {
    background: rgba(234, 221, 103, 1) !important;
    color: rgba(255, 0, 0, 1) !important;
  }
   p {
    background: rgba(234, 221, 103, 1) !important;
    color: rgba(255, 0, 0, 1) !important;
  }
  .center {
    text-align: center !important;
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
      background-color: rgb(76, 153, 227);
      font-weight: bold;
      color : #fff;
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
  .title-report {
    text-align: center;
    margin-bottom: 50px;
  }

   .title-report .title {
   font-size: 18px;
   font-weight: 600;
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