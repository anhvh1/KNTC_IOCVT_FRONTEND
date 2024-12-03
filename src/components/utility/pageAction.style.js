import styled from "styled-components";
import WithDirection from "../../settings/withDirection";

const WDComponentDivAction = styled.div`
  /* margin-top: 15px;
  margin-bottom: 15px; */
  text-align: right;
  /* flex: 1; */
  padding: 0 3px 0 0;
  display: flex;
  gap: 10px;
  justify-content: end;
  flex-wrap: wrap;
  align-items: center;
  &.filter-action {
    justify-content: space-between;
    padding: 10px;
    /* background: #fff; */
    /* margin: 10px 10px; */
  }
  @media only screen and (max-width: 1336px) {
    text-align: left;
    flex: none;
    /* width: 100%; */
    padding: 0 0 10px 0;
    margin-top: 5px;
    margin-bottom: 5px;
  }
  .filter-left {
    display: flex;
    gap: 10px;
    text-align: left;
    align-items: center;
    flex-wrap: wrap;
  }
  .filter-left2 {
    gap: 10px;
    text-align: left;
    align-items: center;
  }
  .filter-right {
    display: flex;
    gap: 10px;
  }
  /* button {
    margin-right: 0px;
    margin-left: 10px;
    @media only screen and (max-width: 1336px) {
      margin-left: 0px;
      margin-right: 10px;
    }
  } */
`;

const ComponentDivAction = WithDirection(WDComponentDivAction);
export { ComponentDivAction };
