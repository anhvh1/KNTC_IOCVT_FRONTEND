import Table from '../../components/uielements/table';
import styled from 'styled-components';
import {palette} from 'styled-theme';
import {transition, boxShadow, borderRadius} from '../../settings/style-util';
import WithDirection from '../../settings/withDirection';

const DataTable = styled(Table)`
  overflow: hidden;
  overflow-x: auto;
  background: ${palette('primary', 16)};

  .ant-spin-container {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .ant-table-body {
    & > table:first-child {
      border-collapse: collapse;
      border-radius: 0 !important;
    }
    /* overflow-x: auto; */
    /* min-height: calc(100vh - 40vh); */
    max-height: calc(100vh - 390px);
    min-width: 1000px;
    overflow: auto;
    .selected__table {
      /* display: inline-block; */
      /* .ant-checkbox {
        display: inline-block;
        height: 16px;
      } */
    }
    /* .selected__table label {
      line-height: auto !important;
    } */
    .ant-table-selection-column .ant-checkbox-wrapper {
      /* line-height: initial; */
    }
    background: #f2f6fc;
    .ant-table-tbody {
      /* background: ${palette('secondary', 12)}; */
    }
    /* .ant-table-wrapper .ant-table-tbody > tr.ant-table-row:hover > td {
      background: auto !important;
    } */
  }
  .ant-table-wrapper table {
    border-collapse: collapse;
  }

  .ant-table-cell-row-hover {
    /* background: auto !important; */
    /* box-shadow: 10px 10px #000; */
  }

  .ant-table-row:has(.ant-table-cell-row-hover) {
    box-shadow: ${(props) =>
      props.noneBorder ? 'none' : '  rgb(159, 162, 165) 0px 2px 2px 0px'};
    position: relative;
    z-index: 1;
  }
  .ant-table-tbody tr {
    cursor: pointer;
  }
  .ant-table-tbody tr:nth-child(even) {
    background: #fff !important;
  }
  .ant-table-tbody tr:nth-child(odd) {
    background: ${palette('primary', 16)} !important;
  }
  .ant-table-tbody .ant-table-measure-row {
    td {
      border: none !important;
    }
  }
  .ant-table-thead .ant-table-selection {
    display: flex;
    label {
      display: flex;
      justify-content: right;
      margin-right: 3px;
    }
  }
  .ant-table-cell-row-hover .ant-icon__table {
    visibility: visible !important;
  }
  .ant-table-tbody > tr:nth-child(2) td {
    border-top: none !important;
  }
  .ant-table-thead > tr > th {
    color: ${palette('text', 6)};
    font-size: 13px;
    background-color: ${palette('primary', 16)};
    border-bottom: none;
    box-shadow: ${(props) =>
      props.noneBorder ? 'none' : '  inset 0 -1px 0px 0 #000000'};
    border-inline-end: ${(props) =>
      props.noneBorder ? 'none' : ' 1px solid #797979'} !important;
    text-align: center;
    border: ${(props) => (props.noneBorder ? 'none' : ' 1px solid #797979')};

    &.ant-table-column-sort {
      background: ${palette('secondary', 1)};
      margin: ${(props) =>
        props['data-rtl'] === 'rtl' ? '0 4px 0 0' : '0 0 0 4px'};
    }
  }

  .ant-table-thead > tr > th.ant-table-selection-column,
  .ant-table-tbody > tr > td.ant-table-selection-column {
    text-align: center;
  }

  .ant-table-thead > tr > th,
  .ant-table-tbody > tr > td {
    padding: 8px 5px;
    text-align: ${(props) => (props['data-rtl'] === 'rtl' ? 'right' : 'left')};

    p {
      margin-bottom: 0;
    }
  }

  .ant-table-container {
    background: #f2f6fc;
  }

  .ant-table-tbody > tr > td {
    font-size: 12px;
    /* color: ${palette('text', 3)}; */
    border: ${(props) =>
      props.noneBorder ? '' : '1px solid #797979'} !important;
    /* border-bottom: 1px solid ${palette('border', 0)}; */

    a {
      color: ${palette('primary', 0)};
      ${transition()};

      /* &:hover {
        color: ${palette('primary', 4)};
      } */
    }
  }

  // .ant-table-thead > tr.ant-table-row-hover > td,
  // .ant-table-tbody > tr.ant-table-row-hover > td,
  // .ant-table-thead > tr:hover > td,
  // .ant-table-tbody > tr:hover > td {
  //   background-color: #efefea;
  // }

  .ant-table-bordered .ant-table-thead > tr > th {
    /* border-bottom: 1px solid ${palette('border', 0)}; */
  }

  .ant-table-bordered .ant-table-thead > tr > th,
  .ant-table-bordered .ant-table-tbody > tr > td {
    /* border-right: 1px solid ${palette('border', 0)}; */
  }

  .ant-table-pagination {
    float: left;
    /* float: ${(props) => (props['data-rtl'] === 'rtl' ? 'left' : 'right')}; */
  }

  .ant-pagination-prev,
  .ant-pagination-next {
    // border: 1px solid ${palette('border', 0)};
  }

  .ant-pagination-disabled,
  .ant-pagination-prev.ant-pagination-disabled,
  .ant-pagination-next.ant-pagination-disabled {
    // border: 1px solid ${palette('border', 0)};

    a {
      border: 0;
    }
  }

  .ant-pagination-prev,
  .ant-pagination-next,
  .ant-pagination-jump-prev,
  .ant-pagination-jump-next {
    transform: ${(props) =>
      props['data-rtl'] === 'rtl' ? 'rotate(180deg)' : 'rotate(0)'};
  }

  .ant-pagination-prev,
  .ant-pagination-jump-prev,
  .ant-pagination-jump-next {
    margin: ${(props) =>
      props['data-rtl'] === 'rtl' ? '0 0 0 8px' : '0 8px 0 0'};
  }

  .ant-pagination-item {
    margin: ${(props) =>
      props['data-rtl'] === 'rtl' ? '0 0 0 8px' : '0 8px 0 0'};

    &:hover {
      border-color: ${palette('primary', 0)};
      ${transition()};
    }

    &:hover a {
      color: ${palette('primary', 0)};
    }
  }

  /* .ant-pagination-item-active {
    background-color: ${palette('primary', 0)};
    border-color: ${palette('primary', 0)};

    a {
      color: #ffffff;
    }

    &:hover a {
      color: #ffffff;
    }
  } */

  .ant-table-expanded-row {
    background: ${palette('grayscale', 6)};

    p {
      color: ${palette('text', 3)};
    }
  }

  .ant-spin-nested-loading > div > .ant-spin {
    max-height: none;
    .ant-spin-dot i {
      color: ${palette('primary', 0)};
    }
  }

  .ant-table-header {
    border-radius: 0 !important;
    background-color: transparent;
  }

  .ant-table-title {
    background: ${palette('secondary', 1)};
    color: ${palette('secondary', 2)};
    font-size: 13px;
    font-weight: 500;
    padding: 16px 30px;
    ${borderRadius()};
  }

  .ant-table-footer {
    background: ${palette('secondary', 1)};
    color: ${palette('secondary', 2)};
    font-size: 12px;
    font-weight: 400;

    ${borderRadius()};
  }

  .ant-table-content {
    overflow-x: auto;
  }

  .ant-table-column-sorter-up.on .anticon-caret-up,
  .ant-table-column-sorter-down.on .anticon-caret-up,
  .ant-table-column-sorter-up.on .anticon-caret-down,
  .ant-table-column-sorter-down.on .anticon-caret-down {
    color: ${palette('primary', 0)};
  }
  .ant-table-column-sorter {
    vertical-align: text-bottom;
    top: -1.5px;
    display: inline-block;
  }

  &.isoSearchableTable {
    .isoTableSearchBox {
      padding: 20px;
      display: flex;
      background: #ffffff;
      border: 1px solid ${palette('border', 0)};
      ${boxShadow('0 1px 6px rgba(0,0,0,0.2)')};

      input {
        font-size: 14px;
        font-weight: 400;
        color: ${palette('text', 3)};
        line-height: inherit;
        height: 36px;
        width: 100%;
        padding: 0 15px;
        margin: 0;
        border: 1px solid ${palette('secondary', 7)};
        outline: 0 !important;
        overflow: hidden;
        background-color: #ffffff;
        ${borderRadius('3px 0 0 3px')};
        ${transition()};
        ${boxShadow('none')};

        &:focus,
        &:hover {
          border-color: ${palette('secondary', 7)};
          ${boxShadow('none')};
        }

        &::-webkit-input-placeholder {
          color: ${palette('grayscale', 0)};
        }

        &:-moz-placeholder {
          color: ${palette('grayscale', 0)};
        }

        &::-moz-placeholder {
          color: ${palette('grayscale', 0)};
        }
        &:-ms-input-placeholder {
          color: ${palette('grayscale', 0)};
        }
      }

      button {
        font-size: 12px;
        font-weight: 400;
        padding: 0;
        text-transform: uppercase;
        color: #ffffff;
        background-color: ${palette('primary', 0)};
        border: 0;
        outline: 0;
        height: 36px;
        padding: 0 15px;
        margin-left: -1px;
        cursor: pointer;
        border-radius: ${(props) =>
          props['data-rtl'] === 'rtl' ? '3px 0 0 3px' : '0 3px 3px 0'};
        ${transition()};

        &:hover {
          background-color: ${palette('primary', 1)};
        }
      }
    }

    .ant-table-thead > tr > th {
      word-break: keep-all;

      span {
        display: flex;
        justify-content: flex-start;
        align-items: center;

        i {
          margin: ${(props) =>
            props['data-rtl'] === 'rtl' ? '0 0 0 10px' : '0 10px 0 0'};
          order: -1;
        }
      }
    }
  }

  &.isoGroupTable {
    .ant-table-thead > tr {
      th {
        border: 1px solid ${palette('border', 0)};
        border-left: 0;

        &[rowspan] {
          text-align: center;
        }

        &.isoImageCell {
          padding: 3px;
        }
      }

      &:first-child {
        th {
          &:first-child {
            /* border-left: ${(props) =>
              props['data-rtl'] === 'rtl' ? '0' : '1px'}
              solid ${palette('border', 0)}; */
          }
        }
      }

      &:last-child {
        th {
          border-top: 0;
        }
      }
    }

    .ant-table-tbody {
      .ant-table-row {
        background: ${palette('secondary', 12)};
        td {
          /* border-right: 1px solid ${palette('border', 0)}; */

          &:first-child {
            /* border-left: ${(props) =>
              props['data-rtl'] === 'rtl' ? '0' : '1px'}
              solid ${palette('border', 0)}; */
          }

          &:last-child {
            /* border-left: ${(props) =>
              props['data-rtl'] === 'rtl' ? '1px' : '0'}
              solid ${palette('border', 0)}; */
          }

          &.isoImageCell {
            padding: 3px;
          }
        }
      }
    }
  }

  &.isoEditableTable {
    .isoEditData {
      .isoEditDataWrapper {
        display: flex;
        align-items: center;

        input {
          font-size: 12px;
          font-weight: 400;
          color: ${palette('text', 3)};
          line-height: inherit;
          padding: 7px 10px;
          margin: ${(props) =>
            props['data-rtl'] === 'rtl' ? '0 0 0 10px' : '0 10px 0 0'};
          border: 1px solid ${palette('border', 0)};
          outline: 0 !important;
          overflow: hidden;
          background-color: #ffffff;
          ${borderRadius('3px')};
          ${boxShadow()};
          ${transition()};

          &:focus,
          &:hover {
            border-color: ${palette('border', 0)};
            ${boxShadow()};
          }

          &::-webkit-input-placeholder {
            color: ${palette('grayscale', 0)};
          }

          &:-moz-placeholder {
            color: ${palette('grayscale', 0)};
          }

          &::-moz-placeholder {
            color: ${palette('grayscale', 0)};
          }
          &:-ms-input-placeholder {
            color: ${palette('grayscale', 0)};
          }
        }

        .isoEditIcon {
          cursor: pointer;
        }
      }

      .isoDataWrapper {
        display: flex;
        align-items: center;

        .isoEditIcon {
          margin: ${(props) =>
            props['data-rtl'] === 'rtl' ? '0 auto 0 0' : '0 0 0 auto'};
          cursor: pointer;
          flex-shrink: 0;
        }
      }
    }
  }
`;

const WDCustomizedTableWrapper = styled.div`
  .isoCustomizedTableControlBar {
    margin-bottom: 40px;

    .ant-form-item {
      margin: ${(props) =>
        props['data-rtl'] === 'rtl' ? '0 0 0 16px' : '0 16px 0 0'};
    }

    .ant-form-item-label {
      label {
        color: ${palette('secondary', 2)};

        &:after {
          margin: ${(props) =>
            props['data-rtl'] === 'rtl' ? '0 2px 0 8px' : '0 8px 0 2px'};
        }
      }
    }

    .ant-switch-checked {
      border-color: ${palette('primary', 0)};
      background-color: ${palette('primary', 0)};
    }
  }
`;

const EmptyTable = styled(Table)`
  .ant-table-placeholder {
    border: none !important;
  }
`;

const CustomizedTableWrapper = WithDirection(WDCustomizedTableWrapper);
export {CustomizedTableWrapper, EmptyTable};
export default WithDirection(DataTable);
