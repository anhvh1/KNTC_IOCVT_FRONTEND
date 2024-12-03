import styled from "styled-components";

export const RedTree = styled.div`
  .ant-tree
    .ant-tree-treenode:not(.ant-tree .ant-tree-treenode-disabled).filter-node
    .ant-tree-title {
  }
  span.ant-tree-iconEle.ant-tree-icon__customize {
    display: none !important;
  }
`;

export const StyledModalCoQuan = styled.div`
  @media (min-width: 1024px) {
    .checkbox-coquan {
      width: 88%;
      float: right;
    }
  }
`;

export const StyledBoxDMCoQuan = styled.div`
  width: 100%;
  .mg-top {
    margin-top: 20px;
    height: calc(100vh - 265px);
    overflow: scroll;
  }
`;

const layout = {
  colFull: {
    xs: 24,
    sm: 24,
    md: 24,
    lg: 24,
    xl: 24,
  },
  colHaft: {
    xs: 24,
    sm: 24,
    md: 24,
    lg: 12,
    xl: 12,
  },
  colThirt: {
    xs: 24,
    sm: 24,
    md: 12,
    lg: 8,
    xl: 8,
  },
  colCustom1: {
    xs: 24,
    sm: 24,
    md: 12,
    lg: 9,
    xl: 9,
  },
  colCustom2: {
    xs: 24,
    sm: 24,
    md: 12,
    lg: 7,
    xl: 7,
  },
  colCustom3: {
    xs: 24,
    sm: 24,
    md: 12,
    lg: 8,
    xl: 8,
  },
  formItem1: {
    labelCol: {
      xs: 3,
      sm: 3,
      md: 3,
      lg: 3,
      xl: 3,
    },
    wrapperCol: {
      xs: 21,
      sm: 21,
      md: 21,
      lg: 21,
      xl: 21,
    },
    labelAlign: "left",
  },
  formItem2: {
    labelCol: {
      xs: 6,
      sm: 6,
      md: 6,
      lg: 6,
      xl: 6,
    },
    wrapperCol: {
      xs: 18,
      sm: 18,
      md: 18,
      lg: 18,
      xl: 18,
    },
    labelAlign: "left",
  },
  formItem3: {
    labelCol: {
      xs: 9,
      sm: 9,
      md: 9,
      lg: 9,
      xl: 9,
    },
    wrapperCol: {
      xs: 16,
      sm: 16,
      md: 16,
      lg: 16,
      xl: 16,
    },
    // labelAlign: "right",
  },
  formItem2_1: {
    labelCol: {
      xs: 6,
      sm: 6,
      md: 6,
      lg: 6,
      xl: 6,
    },
    wrapperCol: {
      xs: 18,
      sm: 18,
      md: 18,
      lg: 18,
      xl: 18,
    },
  },
  formItem3_1: {
    labelCol: {
      xs: 8,
      sm: 8,
      md: 8,
      lg: 8,
      xl: 8,
    },
    wrapperCol: {
      xs: 15,
      sm: 15,
      md: 15,
      lg: 15,
      xl: 15,
    },
  },
  formItem3_3: {
    labelCol: {
      xs: 5,
      sm: 5,
      md: 5,
      lg: 5,
      xl: 5,
    },
    wrapperCol: {
      xs: 18,
      sm: 18,
      md: 18,
      lg: 18,
      xl: 18,
    },
  },
};

export default layout;
