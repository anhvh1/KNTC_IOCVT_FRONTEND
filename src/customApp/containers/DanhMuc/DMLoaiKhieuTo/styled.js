import styled from 'styled-components';

export const RedTree = styled.div`
    .ant-tree .ant-tree-treenode:not(.ant-tree .ant-tree-treenode-disabled).filter-node .ant-tree-title {
        color: red;
    }
    span.ant-tree-iconEle.ant-tree-icon__customize {
        display: none !important;
    }
`;

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

export const RenderTree = styled.div`
    margin-top: 20px;
    height: calc(100vh - 265px);
    overflow-y: scroll;
`;
