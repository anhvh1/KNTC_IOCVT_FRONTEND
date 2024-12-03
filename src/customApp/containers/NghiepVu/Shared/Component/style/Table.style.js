import styled from "styled-components";

const TableWrapper = styled.div`
  table {
    border-collapse: collapse;
    width: 100%;
    border: none;
    table-layout: fixed;
  }
  thead th {
    border: 1px solid #ddd;
    padding: 8px;
  }
  tbody td {
    border: 1px solid #ddd;
    padding: 8px;
  }
  thead {
    width: 100% !important;
  }
  .center {
    text-align: center;
  }
  .bold {
    font-weight: 600;
    font-size: 14px;
  }
`;

export default TableWrapper;
