import styled from 'styled-components';
import {palette} from 'styled-theme';
import {transition} from '../../../settings/style-util';

const Collapse = ComponentName => styled(ComponentName)`
    &.primary .ant-form-item-label {
        background: #2878D7;
        border-top-left-radius: 15px;
        border-bottom-left-radius: 15px;
    }
    .ant-form-item .ant-form-item-label > label::after {
        content: ':' !important;
    }
    &.equal .ant-form-item-label {
        min-width : 140px;
        max-width: 140px;
    }
    &.equal2 .ant-form-item-label {
        min-width : 100px;
        max-width: 100px;
    }
    &.textarea .ant-form-item-control-input-content {
        min-height : 115px;
    }
    &.primary label {
        color : #fff;
        height : 100%;
        padding : 0 10px;
    }
    &.primary .ant-input ,&.primary .ant-picker  {
        border-top-right-radius: 15px;
        border-bottom-right-radius: 15px;
        border-top-left-radius: 0;
        border-bottom-left-radius: 0;
    }
    .ant-form-item-row {
        min-height : 40px;
    }
    .ant-form-item-control-input ,.ant-form-item-control-input .ant-form-item-control-input-content,.ant-form-item-control-input .ant-form-item-control-input-content *:first-child {
        height: 100%;
    }

`;

export default Collapse;
