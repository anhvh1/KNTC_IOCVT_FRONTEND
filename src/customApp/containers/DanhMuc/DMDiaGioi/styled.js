import styled from "styled-components";

const RedFilterTree = styled.div`
.ant-tree .ant-tree-treenode:not(.ant-tree .ant-tree-treenode-disabled).filter-node .ant-tree-title {
    color: red;
}
`

export const MarginR = styled.span`
    svg {
        margin-right: 10px;
    }
    .delete {
        color: red;
    }
    .add {
        color: green;
        font-weight: 800;
    }
    .stop {
        color: red;
    }
    .check {
        color: green;
    }
`;

export default RedFilterTree;