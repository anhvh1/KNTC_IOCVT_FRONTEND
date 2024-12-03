import styled from "styled-components";

export const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: calc(100% - 50px);
  padding: 10px 20px;
  /* border: 1px solid rgba(229, 229, 229, 1);
  border-radius: 10px; */
  .wrapper-inspection-info {
    display: flex;
    flex-direction: column;
    /* align-items: center; */
    /* justify-content: center; */
    height: 100%;
    .inspection-info {
      font-family: Arial, sans-serif;
      margin: 20px;
      .item {
        display: flex;
        flex-direction: column;
        gap: 10px;
        .list-item {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
      }
    }
  }
  .wrapper-info {
    display: flex;
    flex-wrap: wrap;
    /* gap: 10px; */
    .item {
      display: flex;
      /* align-items: center; */
      gap: 20px;
      flex-wrap: wrap;
      flex-basis: 50%;
    }
    .item-full {
      flex-basis: 100%;
      display: flex;
      align-items: center;
      gap: 20px;
      flex-wrap: wrap;
    }
    .item-file {
      flex-basis: 50%;
      display: flex;
      /* align-items: center; */
      flex-direction: column;
      gap: 5px;
      flex-wrap: wrap;
    }
  }
  .title {
    font-weight: bold;
    font-size: 16px;
    margin-bottom: 20px;
  }
  .subtitle {
    font-weight: 500;
    font-size: 14px;
    margin-bottom: 10px;
  }
  .actions-btn {
    display: flex;
    align-items: center;
    gap: 10px;
    flex-wrap: wrap;
    margin-bottom: 10px;
  }
  .wrapper-fields {
    position: relative;
    padding-top: 20px;
    margin-top: 20px;
    /* &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 1px;
      background-color: #000;
      top: 0;
      left: 10px;
      margin: 0 -30px;
    } */
  }
  .field-top {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
  }
  .wrapper-member,
  .wrapper-fields {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }
  .wrapper-fields .field-item__title,
  .wrapper-member .field-item__title {
    font-weight: 500;
    font-size: 14px;
    margin-bottom: 10px;
    color: rgba(0, 123, 255, 1);
  }
  .required {
    color: red;
  }

  .item,
  .item-full,
  .item-file {
    margin-bottom: 15px;
  }

  .item label,
  .item-full label,
  .item-file label {
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
