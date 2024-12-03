import styled from "styled-components";

export const FormStyle = styled.div`
  .list-file-upload {
    margin-top: 10px;
    display: flex;
    flex-direction: column;
    gap: 5px;
    .file-item {
      display: flex;
      align-items: center;
      gap: 10px;
      svg {
        cursor: pointer;
        color: red;
      }
    }
  }
`;
