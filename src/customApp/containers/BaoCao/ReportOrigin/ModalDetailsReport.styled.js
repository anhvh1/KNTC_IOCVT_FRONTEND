import styled from 'styled-components'


const Wrapper = styled.div`
    .ant-form-item .ant-form-item-label > label::after {
        content: ':' !important;
    }
    .wrapper-title {
        margin-top: 10px;
        font-size: 18px;
        font-weight: 600;
        text-align: start;
        margin-bottom: 10px;
    }

    .modal-collapse {
        /* padding: 0 50px; */
    }

    .ant-collapse {
        .red-panel:first-child {
            padding : 0 50px;
        }
        .red-panel:nth-child(3) {
            padding : 0 50px;
        }
    }


    .panel-wrapper__file > .ant-collapse-header:first-child {
        padding: 0 50px !important;
    }


    .panel-file__items > .ant-collapse-header:first-child {
        padding: 0 50px !important;
    }

    .ant-form-item-label {
        /* min-width: 140px;
        max-width: 140px; */
        @media only screen and (max-width : 576px) {
            & {
                max-width: 100px !important;
            }
        }
    }

    .toggle-details {
        margin-top: 18px;
        margin-bottom: 25px;
        color: #FF6F00;
        font-size: 18px;
        text-align: center;
        cursor: pointer;
        position: relative;
    }
    .down-icon {
        position: absolute;
        bottom: -12px;
        left: 0;
        right: 0;
        justify-content: center
    }
    .up-icon {
        position: absolute;
        top: -12px;
        left: 0;
        right: 0;
        justify-content: center

    }
    .panel-odd {
        background: #fff;
        padding: 20px 0;
    }
    .panel-even {
        background: #EDEDED;
        padding: 15px 0 20px 0 ;
        margin-top: 10px;
    }
    .file-wrapper {
        display: grid;
        margin-top: 15px;
        grid-template-columns: 32% 32% 32%;
        gap: 30px;
        padding: 0 50px;
        /* row-gap: 20px;
        column-gap: 10px; */
        justify-content: center;
        align-items: center;
        .file-items {
            box-shadow: 4px 1px 9px 4px #d9d9d9;
            display: flex;
            column-gap: 5px;
            /* justify-content: center; */
            align-items: center;
            padding: 15px;
            .file-items__image {
                flex-basis: 25%;
                display: flex;
                justify-content: center;
                img{
                    max-width: 90px;
                    height: auto;
                }
            }
            .file-items__info {
                flex-basis: 75%;
                .file-items__type {
                    display: flex;
                    justify-content: space-between;
                    > .anticon  {
                        margin-left: 10px;
                        font-size: 20px;
                    }
                    .ant-select{
                        flex-basis: 90%;
                    }
                    /* .ant-select-selector {
                        width: 300px;
                    } */
                }
                .file-items__desc {
                    p {
                        padding: 1px 0;
                    }
                    .user_add {
                        margin-top: 5px ;
                    }
                }
            }
        }
    }
    .wrapper-progress {
        margin-top: 50px;
        .progress-old {
            background: #ededed;
        }
        .progress-item {
            position: relative;
            z-index: 9999;
            display: flex;
            margin-bottom: 50px;
            max-height: 112px;
            align-items: center;
            padding: 10px;
            @media only screen and (max-width : 1500px) { 
                margin-bottom: 35px;
                align-items: center;
                padding: 5px;
            }
            @media only screen and (max-width : 1020px) { 
                margin-bottom: 20px;
            }
            @media only screen and (max-width : 900px) { 
                max-height: 100%;
                margin-bottom: 30px;
            }
            div + div {
                margin-left: 5px;
            }
            .wrapper-progress__main {
                display: grid;
                flex-basis: 80%;
                grid-template-columns:  15% 27% 27% auto;
                position: relative;
                align-items: center;
                @media only screen and (max-width : 1500px) {
                    grid-template-columns:  50% 50%;
                    column-gap: 10px;
                    row-gap: 5px;
                    & > .progress-time:first-child p:first-child,& > .progress-user__update p:first-child,
                    & > .progress-action p:first-child,& > .progress-opinion p:first-child{
                        display: inline-block !important;
                    }
                    &::before {
                        position: absolute;
                        content: '';
                        height: 100%;
                        width: 2px;
                        left: -6px;
                        background: #2878D7;
                    }
                    & div {
                        display: grid;
                        grid-template-columns: 40% 60%;
                        justify-content: space-between;
                        padding: 0 !important;
                        margin: 0 !important;
                    }
                    .progress-time p:last-child,.progress-action p:last-child,.progress-user__update p:last-child,.progress-opinion p:last-child {
                        padding: 0 10px;
                        font-size: 13px;
                    } 
                    .progress-time p:first-child,.progress-action p:first-child {
                        background :#FF6F00;
                        padding: 2px 5px;
                        color:#fff;
                    }
                    .progress-user__update p:first-child,.progress-opinion p:first-child {
                        background :#0263D1;
                        padding: 2px 5px;
                        color:#fff;
                    }
                    & .progress-time {
                        .time {
                            text-align: start;
                        }
                        &::before {
                            content: none;
                        }
                    }
                    & .progress-item {
                        text-align: start !important;
                    }
                }
                @media only screen and (max-width : 1020px) {
                    & div {
                        grid-template-columns: 50% 50%;
                    }
                }
                @media only screen and (max-width : 900px) {
                    grid-template-columns:  auto;
                    column-gap: 10px;
                    row-gap: 5px;
                    & div {
                        grid-template-columns: 40% 60%;
                    }
                }
                & > .progress-time:first-child p:first-child,& > .progress-user__update p:first-child,
                & > .progress-action p:first-child,& > .progress-opinion p:first-child{
                    /* visibility: hidden; */
                    display: none;
                }
            }
            .wrapper-top__title {
                position: absolute;
                top: -55%;
                display: flex;
                right: 0%;
                /* width: 100%; */
                left: 0;
                &::after {
                    content: '';
                    position: absolute;
                    width: 75.5%;
                    height: 2px;
                    background: #2878D7;
                    bottom: -6px;
                    right: 0;
                }
                @media only screen and (max-width : 1500px) {
                    display: none;
                }
                .progress-action p,.progress-time p {
                    background: #FF6F00;
                    color : #fff;
                    padding : 0 10px;
                }
                .progress-user__update p, .progress-opinion p{
                    background: #2878D7;
                    color: #fff;
                    padding: 0 10px;
                }
                .progress-title {
                    align-self: center;
                    flex-basis: 23.5%;
                    font-weight: 600;
                }
                .progress-user__update {
                    flex-basis: 20%;
                    p {
                        /* padding: 0 10px; */
                        width: 100%;
                    }
                }
                .progress-time {
                    position: relative;
                    flex-basis: 10%;
                    padding : 0 10px;
                    text-align: center;
                    p {
                        width: 100%;
                    }
                    &::before {
                        content:  none;
                    }
                    @media only screen and (max-width : 1750px) {
                        flex-basis: auto;
                        padding: 0 5px;
                    }

                }
                .progress-action {
                    flex-basis: 21%;
                    /* padding: 0 10px; */
                    p {
                        width: 100%;
                    }
                }
                .progress-opinion {
                    flex: 1 1 auto;
                    /* flex-basis: 23%; */
                    p {
                        width: 100%;
                    }
                }
            }
            .progress-circle {
                background:#0263D1 ;
                color: #fff;
                position: relative;
                width : 50px;
                height: 50px;
                border-radius: 50%;
                display: flex;
                justify-content: center;
                align-items: center;
                &::after {
                    position: absolute;
                    content: '';
                    top: 2px;
                    width: 100%;
                    height: 100%;
                    left: 3px;
                    background: #000;
                    border-radius: 50%;
                    filter: blur(3px);
                    z-index: -1;
                }
            }
            .progress-title {
                align-self: center;
                flex-basis: 20%;
                font-weight: 600;
            }
            .progress-user__update {
                flex-basis: 20%;
            }
            /* & > .progress-time:first-child p:first-child,.progress-user__update:first-child p:first-child,
            .progress-action:first-child p:first-child,.progress-opinion:first-child p:first-child{
                visibility: hidden;
            } */
            .progress-time {
                position: relative;
                flex-basis: 11%;
                padding : 0 10px;
            }
            .progress-action {
                flex-basis: 20%;
            }
            .progress-opinion {
                flex-basis: auto;
            }
            .progress-opinion p:first-child, .progress-user__update p:first-child, .progress-time p:first-child, .progress-action p:first-child {
                font-weight: 500;
            }
            .progress-time .time{
                text-align: center;
            }
            .progress-action .action,.progress-time .time {
                /* background: #FF6F00; */
                color : #000;
                /* padding : 0 10px; */
            }
            .progress-user__update .user__update, .progress-opinion .opinion{
                /* background: #2878D7; */
                color: #000;
                /* padding: 0 10px; */
            }
            /* .time ,.action, .opinion,.user__update {
                padding: 5px;
            } */
            .progress-time::before {
                content: '';
                position: absolute;
                left: 0;
                top: 0;
                bottom: 0;
                width: 1px;
                height: 100%;
                background: #0263D1;
            }
            p {
                border-radius: 5px;
            }
        }
        .progress-item + .progress-item .progress-circle::before {
            content: '';
            position: absolute;
            height : 80px;
            top: -80px;
            width: 2px;
            background:#0263D1 ;
            @media only screen and (max-width : 1500px) { 
                height : 80px;
                top: -80px;
            }
            @media only screen and (max-width : 1050px) { 
                /* height : 100;
                top: -115px; */
            }
            @media only screen and (max-width : 900px) { 
                height : 115px;
                top: -115px;
            }
            @media only screen and (max-width : 767px) { 
                height : 145px;
                top: -145px;
            }
        }
    }
    .wrapper-item {
        display: grid;
    }
    .grt-4 {
        grid-template-columns: auto auto auto auto;
    }
    .grt-3 {
        grid-template-columns: auto auto auto;
    }
    .grt-2 {
        grid-template-columns: auto auto;
    }
`


export default Wrapper