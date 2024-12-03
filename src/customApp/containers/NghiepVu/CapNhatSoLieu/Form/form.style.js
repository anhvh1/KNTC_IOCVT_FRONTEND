import styled from "styled-components";

export const WrapperInfo = styled.div`
  .subtitle {
    color: rgba(8, 8, 8, 1);
    font-family: Roboto;
    font-size: 14px;
    font-weight: 500;
    line-height: 16.41px;
    text-align: left;
    margin-bottom: 10px;
  }
  .wrapper-info {
    border: 1px solid #ddd;
    border-radius: 5px;
    .info-list {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
    }
    .info-item {
      display: flex;
      gap: 10px;
      align-items: center;
    }
    .info-table {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 10px;
      border-top: 1px solid #ddd;
    }

    .info-table,
    .info-list {
      padding: 20px;
    }
    .wrapper-table {
      padding: 0 20px 20px 20px;
    }
    display: flex;
    flex-direction: column;
  }
`;

export const FormWrapper = styled.div`
  .actions-wrapper {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
    margin-bottom: 10px;
  }
  .subtitle {
    color: rgba(8, 8, 8, 1);
    font-family: Roboto;
    font-size: 14px;
    font-weight: 500;
    line-height: 16.41px;
    text-align: left;
  }
  .note {
    text-align: right;
  }
  .table-data {
    width: 100%;
    border-collapse: collapse;
    table-layout: fixed;
    thead th {
      border: 1px solid #ddd;
      padding: 8px;
    }
    tbody td {
      border: 1px solid #ddd;
      padding: 8px;
    }
  }
  .required {
    color: red;
  }
  .inspection-info {
    font-family: Arial, sans-serif;
    margin: 20px;
  }

  .item {
    margin-bottom: 15px;
  }

  .item label {
    font-weight: bold;
  }

  .item p {
    margin: 0;
  }

  .btn-top {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
    margin-bottom: 10px;
  }
`;
