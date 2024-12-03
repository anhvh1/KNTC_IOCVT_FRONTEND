import styled from "styled-components";
import { palette } from "styled-theme";

const BoxWrapper = styled.div`
  width: 100%;
  height: ${(props) => (props.isFullHeight ? `100%` : "calc(100% - 10px)")};
  padding: 10px 10px 0;

  &:last-child {
    margin-bottom: 0;
  }

  & .box-content {
    height: calc(100%);
    /* overflow: hidden; */
    display: flex;
    flex-direction: column;
  }

  @media only screen and (max-width: 1280px) {
    height: calc(100% - 40px) !important;
  }

  @media only screen and (max-width: 767px) {
    padding: 20px;
    ${"" /* margin: 0 10px 30px; */};
  }

  &.half {
    width: calc(50% - 34px);
    @media (max-width: 767px) {
      width: 100%;
    }
  }
`;

export { BoxWrapper };
