import styled from 'styled-components';

const Wrapper = styled.div`
  flex-direction: column;
  display: flex;
  flex: 1;
  .right_code {
    text-align: right;
  }
  .title_report {
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    margin-bottom: 15px;
    .title_main {
      p {
        font-weight: 600;
        font-size: 16px;
      }
    }
  }

  .table_primary {
    position: relative;
    z-index: 0;
    margin-bottom: 5px !important;
    border: none !important;
    border-spacing: 10px 0px;
    border-collapse: separate;
  }

  .table_primary thead,
  .table_primary .thead_tr {
    position: sticky;
    z-index: 1;
  }

  .table_primary thead tr th,
  .table_primary .thead_tr th {
    background: #f2f6fc !important;
    padding: 12px 8px !important;
    border: none;
    font-size: 12px;
  }

  .table td,
  .table th {
    vertical-align: middle;
  }

  .table_primary tbody tr td {
    background: #f2f6fc;
    border-left: none;
    border-right: none;
    border-top: 1px solid #dddddd;
    font-size: 12px;
    padding: 10px 0;
    border-bottom: 1px solid #dddddd;
  }

  .table_primary tbody tr::after {
    content: '';
    display: none;
    /*check if hover table notworking*/
  }

  .table_primary tbody tr:not(.thead_tr):hover {
    background: #f2f6fc;
    box-shadow: 0 2px 8px -3px #000000;
    transform: scale(1, 1);
  }

  .table_content tr.active td p {
    font-weight: bold;
  }
  .visible {
    display: none;
  }
  .wrapper {
    flex: 1;
    position: relative;
  }
  .loadingDetailsReport {
    .table-spin__loading {
      visibility: visible;
    }
  }
  .table-spin__loading {
    position: absolute;
    z-index: 10;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
    visibility: hidden;
  }
  .wrapperLoading {
    background: rgba(255, 255, 255, 0.5);
    position: absolute;
    top: 70px;
    left: 0;
    right: 0;
    bottom: 0;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  p {
    text-align: left;
  }
  .disabled-rowItem {
    display: none;
  }
  .wrapper__table {
    /* max-height: ${(props) =>
      props.isIframe ? 'calc(100vh - 150px)' : '635px'}; */
    /* min-height: 100%; */
    overflow: auto;
    width: calc(100% + 5px);
    position: relative;
  }
  /* Track */
  .wrapper__table::-webkit-scrollbar-track {
    /*background: #dadbe2;*/
    background: transparent;
    border-radius: 10px;
  }

  /* Handle */
  .wrapper__table::-webkit-scrollbar-thumb {
    background: #bfc4cd;
    border-radius: 10px;
  }

  /* table, th, td {
            border: 1px solid black;
            border-color: rgb(233, 233, 233);
        } */
  #my-table {
    table-layout: fixed;
    /* width: 100%; */
    width: ${(props) => props.TableWidth};
  }
  div.wrapper-table {
    /* max-height: 550px; */
  }
  .table_content tbody tr {
    border: 1px solid;
    border-color: rgb(233, 233, 233);
    height: 50px;
  }
  /* .table_content tbody tr td:last-child {
    box-shadow: 3px 0px 0px 0 red;
  } */
  .table_content tbody .trHover:hover {
    background-color: #e6e6e6;
    cursor: pointer;
    input {
      background-color: #e6e6e6 !important;
    }
  }
  .table_content tbody input {
    width: 100%;
    border: none;
    outline: none;
  }
  table {
    border-collapse: collapse;
    /* height: 100%; */
    /* width: 100%; */
    table-layout: fixed;
    min-width: 100%;
    /* max-height: 300px; */
  }
  .table_content th {
    font-size: 12px;
  }
  .table_content thead {
    z-index: 1;
    background: #f2f6fc;
    position: sticky;
    top: 0px;
    tr {
      min-height: 40px;
      height: 0 !important;
      th {
        font-size: 15px;
      }
    }
  }
  .table_content thead th {
    /* padding: 10px ; */
    border: 1px solid;
    border-color: rgb(233, 233, 233);
    /* display:table; */
    /* table-layout:fixed; */
    box-shadow: 0 0 1px rgba(255, 255, 255, 0.5);
  }
  .table_content tbody th {
    border: 1px solid;
    border-color: rgb(233, 233, 233);
    word-break: break-all;
    /* border-left: 1px solid;
             */
  }
  .table_content tbody td {
    border: 1px solid;
    border-color: rgb(233, 233, 233);
  }
  .table_content tbody td input {
    height: 50px;
  }
  /* thead,tbody { display: block; } */
  .table_content tbody tr td p,
  .table_content tbody tr td input {
    padding: 0 10px;
    font-size: 13px;
    line-break: anywhere;
  }
  .table_content tbody {
    overflow-y: auto; /* Trigger vertical scroll    */
    /* overflow-x: hidden; Hide the horizontal scroll */
    overflow-x: auto;
    border-collapse: collapse;
    width: 100%;
    table-layout: fixed;
  }
  .table_content thead th {
    border-top: none !important;
    border-bottom: none !important;
    box-shadow: inset 0 -1px 0 rgb(233, 233, 233),
      inset 0 1px 0 rgb(233, 233, 233);
    font-size: 15px;
    height: 50px;
    padding: 5px;
    /* padding: 2px 0; */
  }
`;

export default Wrapper;
