"use strict";(self.webpackChunkkkts=self.webpackChunkkkts||[]).push([[53],{64684:(n,t,e)=>{e.d(t,{A:()=>m});var a,r,o=e(82483),l=e(57528),i=e(22953),d=e(6535);const p=i.Ay.h3(a||(a=(0,l.A)(["\n  font-size: 14px;\n  font-weight: 500;\n  color: ",";\n  margin: 0;\n  margin-bottom: 5px;\n"])),(0,d.palette)("text",0)),c=i.Ay.p(r||(r=(0,l.A)(["\n  font-size: 13px;\n  font-weight: 400;\n  color: ",";\n  line-height: 24px;\n"])),(0,d.palette)("text",3));var s=e(56723);const b=n=>(0,s.jsxs)("div",{children:[n.title?(0,s.jsxs)(p,{className:"isoBoxTitle",children:[" ",n.title," "]}):"",n.subtitle?(0,s.jsxs)(c,{className:"isoBoxSubTitle",children:[" ",n.subtitle," "]}):""]});var x;const g=i.Ay.div(x||(x=(0,l.A)(["\n  width: 100%;\n  height: ",";\n  border: 1px solid #d5d5d5;\n  /* height: ","; */\n  /* padding: ","; */\n  /* padding: 0 10px; */\n  background: #fafafa;\n  /* margin: 8px; */\n  padding: 10px;\n  /* background-color: ","; */\n  /* border: ","; */\n  /* margin: 0 0 30px; */\n\n  &:last-child {\n    margin-bottom: 0;\n  }\n\n  & .box-content {\n    height: calc(100%);\n    /* overflow: hidden; */\n    display: flex;\n    flex-direction: column;\n  }\n\n  @media only screen and (max-width: 1280px) {\n    height: calc(100% - 40px) !important;\n  }\n\n  @media only screen and (max-width: 767px) {\n    padding: 20px;\n    ",";\n  }\n\n  &.half {\n    width: calc(50% - 34px);\n    @media (max-width: 767px) {\n      width: 100%;\n    }\n  }\n"])),(n=>n.isFullHeight?"100%":"calc(100% - 10px)"),(n=>n.heightTitle?"auto":"100%"),(n=>n.isIframe?"0 10px":"10px 0"),(n=>n.isIframe?"#F2F6FC":"transparent"),(n=>n.isIframe?"":"none"),"");var h=e(18570);const m=n=>{var t;const e=null===(t=document.querySelectorAll(".isoComponentTitle")[0])||void 0===t?void 0:t.clientHeight,a=(0,h.op)("isIframe",!1);return(0,o.useEffect)((()=>{const n=document.querySelector(".ant-table-wrapper");null!==n&&void 0!==n&&n.parentElement}),[]),(0,s.jsx)(g,{...n,isIframe:a,className:"".concat(n.className?n.className:""," isoBoxWrapper"),style:{...n.style},heightTitle:e,children:(0,s.jsxs)("div",{className:"box-content",children:[(0,s.jsx)(b,{title:n.title,subtitle:n.subtitle}),n.children]})})}},67353:(n,t,e)=>{e.d(t,{A:()=>s});e(82483);var a,r=e(57528),o=e(22953),l=e(55333);const i=o.Ay.div(a||(a=(0,r.A)(["\n  padding-bottom: ",";\n  margin-top: 5px;\n  display: flex;\n  flex-wrap: wrap;\n  /* justify-content: start; */\n  justify-content: end;\n  align-items: center;\n  /* & > div + div {\n    margin-right: 10px;\n  }\n  & > div:first-child {\n    margin-right: 10px;\n  } */\n  & > * {\n    margin-right: 0 !important;\n    /* padding: 0; */\n  }\n  gap: 10px;\n  display: ",";\n  justify-content: ",";\n  /* gap: ","; */\n  .ant-select-search,\n  .ant-select,\n  .ant-calendar-picker {\n    margin-right: 10px;\n\n    &.ant-calendar-picker {\n      margin-left: 5px;\n    }\n\n    &:last-child {\n      margin-right: 0;\n    }\n  }\n"])),(n=>n.isIframe?"":"10px"),(n=>!0===(null===n||void 0===n?void 0:n.isCenter)?"flex":!0===(null===n||void 0===n?void 0:n.isLeft)?"start":""),(n=>!0===(null===n||void 0===n?void 0:n.isCenter)?"center":!0===(null===n||void 0===n?void 0:n.isLeft)?"start":""),(n=>!0===(null===n||void 0===n?void 0:n.isCenter)?"5px":"")),d=(0,l.A)(i);var p=e(18570),c=e(56723);const s=n=>{const t=(0,p.op)("isIframe",!1),{isDashBoard:e,isCenter:a}=n;return(0,c.jsx)(d,{isCenter:a,...n,isIframe:t,className:"boxFilter",children:n.children})}},53615:(n,t,e)=>{e.d(t,{ab:()=>y,Ay:()=>v});var a=e(57528),r=e(82483),o=e(30518),l=e(46976),i=e(56723);const d=n=>{const[t,e]=(0,r.useState)(0),[a,d]=(0,r.useState)(!1);(0,r.useEffect)((()=>{document.querySelector(".ant-table")&&!1===a&&d(!0)}),[]);const p=n=>{if(n){const t=window.getComputedStyle(n),e=parseFloat(t.marginTop),a=parseFloat(t.marginBottom),r=parseFloat(t.paddingTop),o=parseFloat(t.paddingBottom);return n.offsetHeight+e+a+r+o}};(0,r.useEffect)((()=>{if(a){const n=document.querySelector(".box-content"),t=document.querySelector(".boxFilter"),a=document.querySelector(".ant-table"),r=document.querySelector(".ant-table-pagination")?document.querySelector(".ant-table-pagination"):{offsetHeight:50},o=p(a)+r.offsetHeight,l=(p(n)?p(n):0)-(p(t)?p(t):0)-(o||0),i=()=>{l&&e(l<440?440:l-30)};return i(),window.addEventListener("resize",i),()=>{window.removeEventListener("resize",i)}}}),[a]);const{dataSource:c,keyword:s,onSearch:b}=n;let x={emptyText:(0,i.jsx)(o.A,{image:o.A.PRESENTED_IMAGE_SIMPLE,description:"Kh\xf4ng c\xf3 d\u1eef li\u1ec7u"})},g={scroll:n.scroll?n.scroll:{y:t,x:900},...n,locale:{...x,...n.locale}};if("function"===typeof b){const t=b(c||[],s);g={...n,dataSource:t}}return(0,i.jsx)(l.A,{...g,bordered:!0})};d.defaultProps={keyword:""};const p=d;var c,s,b,x=e(22953),g=e(6535),h=e(28650),m=e(55333);const f=(0,x.Ay)(p)(c||(c=(0,a.A)(["\n  overflow: hidden;\n  overflow-x: auto;\n  background: ",";\n\n  .ant-spin-container {\n    height: 100%;\n    display: flex;\n    flex-direction: column;\n  }\n\n  .ant-table-body {\n    & > table:first-child {\n      border-collapse: collapse;\n      border-radius: 0 !important;\n    }\n    /* overflow-x: auto; */\n    /* min-height: calc(100vh - 40vh); */\n    max-height: calc(100vh - 390px);\n    min-width: 1000px;\n    overflow: auto;\n    .selected__table {\n      /* display: inline-block; */\n      /* .ant-checkbox {\n        display: inline-block;\n        height: 16px;\n      } */\n    }\n    /* .selected__table label {\n      line-height: auto !important;\n    } */\n    .ant-table-selection-column .ant-checkbox-wrapper {\n      /* line-height: initial; */\n    }\n    background: #f2f6fc;\n    .ant-table-tbody {\n      /* background: ","; */\n    }\n    /* .ant-table-wrapper .ant-table-tbody > tr.ant-table-row:hover > td {\n      background: auto !important;\n    } */\n  }\n  .ant-table-wrapper table {\n    border-collapse: collapse;\n  }\n\n  .ant-table-cell-row-hover {\n    /* background: auto !important; */\n    /* box-shadow: 10px 10px #000; */\n  }\n\n  .ant-table-row:has(.ant-table-cell-row-hover) {\n    box-shadow: ",";\n    position: relative;\n    z-index: 1;\n  }\n  .ant-table-tbody tr {\n    cursor: pointer;\n  }\n  .ant-table-tbody tr:nth-child(even) {\n    background: #fff !important;\n  }\n  .ant-table-tbody tr:nth-child(odd) {\n    background: "," !important;\n  }\n  .ant-table-tbody .ant-table-measure-row {\n    td {\n      border: none !important;\n    }\n  }\n  .ant-table-thead .ant-table-selection {\n    display: flex;\n    label {\n      display: flex;\n      justify-content: right;\n      margin-right: 3px;\n    }\n  }\n  .ant-table-cell-row-hover .ant-icon__table {\n    visibility: visible !important;\n  }\n  .ant-table-tbody > tr:nth-child(2) td {\n    border-top: none !important;\n  }\n  .ant-table-thead > tr > th {\n    color: ",";\n    font-size: 13px;\n    background-color: ",";\n    border-bottom: none;\n    box-shadow: ",";\n    border-inline-end: "," !important;\n    text-align: center;\n    border: ",";\n\n    &.ant-table-column-sort {\n      background: ",";\n      margin: ",";\n    }\n  }\n\n  .ant-table-thead > tr > th.ant-table-selection-column,\n  .ant-table-tbody > tr > td.ant-table-selection-column {\n    text-align: center;\n  }\n\n  .ant-table-thead > tr > th,\n  .ant-table-tbody > tr > td {\n    padding: 8px 5px;\n    text-align: ",";\n\n    p {\n      margin-bottom: 0;\n    }\n  }\n\n  .ant-table-container {\n    background: #f2f6fc;\n  }\n\n  .ant-table-tbody > tr > td {\n    font-size: 12px;\n    /* color: ","; */\n    border: "," !important;\n    /* border-bottom: 1px solid ","; */\n\n    a {\n      color: ",";\n      ",";\n\n      /* &:hover {\n        color: ",";\n      } */\n    }\n  }\n\n  // .ant-table-thead > tr.ant-table-row-hover > td,\n  // .ant-table-tbody > tr.ant-table-row-hover > td,\n  // .ant-table-thead > tr:hover > td,\n  // .ant-table-tbody > tr:hover > td {\n  //   background-color: #efefea;\n  // }\n\n  .ant-table-bordered .ant-table-thead > tr > th {\n    /* border-bottom: 1px solid ","; */\n  }\n\n  .ant-table-bordered .ant-table-thead > tr > th,\n  .ant-table-bordered .ant-table-tbody > tr > td {\n    /* border-right: 1px solid ","; */\n  }\n\n  .ant-table-pagination {\n    float: left;\n    /* float: ","; */\n  }\n\n  .ant-pagination-prev,\n  .ant-pagination-next {\n    // border: 1px solid ",";\n  }\n\n  .ant-pagination-disabled,\n  .ant-pagination-prev.ant-pagination-disabled,\n  .ant-pagination-next.ant-pagination-disabled {\n    // border: 1px solid ",";\n\n    a {\n      border: 0;\n    }\n  }\n\n  .ant-pagination-prev,\n  .ant-pagination-next,\n  .ant-pagination-jump-prev,\n  .ant-pagination-jump-next {\n    transform: ",";\n  }\n\n  .ant-pagination-prev,\n  .ant-pagination-jump-prev,\n  .ant-pagination-jump-next {\n    margin: ",";\n  }\n\n  .ant-pagination-item {\n    margin: ",";\n\n    &:hover {\n      border-color: ",";\n      ",";\n    }\n\n    &:hover a {\n      color: ",";\n    }\n  }\n\n  /* .ant-pagination-item-active {\n    background-color: ",";\n    border-color: ",";\n\n    a {\n      color: #ffffff;\n    }\n\n    &:hover a {\n      color: #ffffff;\n    }\n  } */\n\n  .ant-table-expanded-row {\n    background: ",";\n\n    p {\n      color: ",";\n    }\n  }\n\n  .ant-spin-nested-loading > div > .ant-spin {\n    max-height: none;\n    .ant-spin-dot i {\n      color: ",";\n    }\n  }\n\n  .ant-table-header {\n    border-radius: 0 !important;\n    background-color: transparent;\n  }\n\n  .ant-table-title {\n    background: ",";\n    color: ",";\n    font-size: 13px;\n    font-weight: 500;\n    padding: 16px 30px;\n    ",";\n  }\n\n  .ant-table-footer {\n    background: ",";\n    color: ",";\n    font-size: 12px;\n    font-weight: 400;\n\n    ",";\n  }\n\n  .ant-table-content {\n    overflow-x: auto;\n  }\n\n  .ant-table-column-sorter-up.on .anticon-caret-up,\n  .ant-table-column-sorter-down.on .anticon-caret-up,\n  .ant-table-column-sorter-up.on .anticon-caret-down,\n  .ant-table-column-sorter-down.on .anticon-caret-down {\n    color: ",";\n  }\n  .ant-table-column-sorter {\n    vertical-align: text-bottom;\n    top: -1.5px;\n    display: inline-block;\n  }\n\n  &.isoSearchableTable {\n    .isoTableSearchBox {\n      padding: 20px;\n      display: flex;\n      background: #ffffff;\n      border: 1px solid ",";\n      ",";\n\n      input {\n        font-size: 14px;\n        font-weight: 400;\n        color: ",";\n        line-height: inherit;\n        height: 36px;\n        width: 100%;\n        padding: 0 15px;\n        margin: 0;\n        border: 1px solid ",";\n        outline: 0 !important;\n        overflow: hidden;\n        background-color: #ffffff;\n        ",";\n        ",";\n        ",";\n\n        &:focus,\n        &:hover {\n          border-color: ",";\n          ",";\n        }\n\n        &::-webkit-input-placeholder {\n          color: ",";\n        }\n\n        &:-moz-placeholder {\n          color: ",";\n        }\n\n        &::-moz-placeholder {\n          color: ",";\n        }\n        &:-ms-input-placeholder {\n          color: ",";\n        }\n      }\n\n      button {\n        font-size: 12px;\n        font-weight: 400;\n        padding: 0;\n        text-transform: uppercase;\n        color: #ffffff;\n        background-color: ",";\n        border: 0;\n        outline: 0;\n        height: 36px;\n        padding: 0 15px;\n        margin-left: -1px;\n        cursor: pointer;\n        border-radius: ",";\n        ",";\n\n        &:hover {\n          background-color: ",";\n        }\n      }\n    }\n\n    .ant-table-thead > tr > th {\n      word-break: keep-all;\n\n      span {\n        display: flex;\n        justify-content: flex-start;\n        align-items: center;\n\n        i {\n          margin: ",";\n          order: -1;\n        }\n      }\n    }\n  }\n\n  &.isoGroupTable {\n    .ant-table-thead > tr {\n      th {\n        border: 1px solid ",";\n        border-left: 0;\n\n        &[rowspan] {\n          text-align: center;\n        }\n\n        &.isoImageCell {\n          padding: 3px;\n        }\n      }\n\n      &:first-child {\n        th {\n          &:first-child {\n            /* border-left: ","\n              solid ","; */\n          }\n        }\n      }\n\n      &:last-child {\n        th {\n          border-top: 0;\n        }\n      }\n    }\n\n    .ant-table-tbody {\n      .ant-table-row {\n        background: ",";\n        td {\n          /* border-right: 1px solid ","; */\n\n          &:first-child {\n            /* border-left: ","\n              solid ","; */\n          }\n\n          &:last-child {\n            /* border-left: ","\n              solid ","; */\n          }\n\n          &.isoImageCell {\n            padding: 3px;\n          }\n        }\n      }\n    }\n  }\n\n  &.isoEditableTable {\n    .isoEditData {\n      .isoEditDataWrapper {\n        display: flex;\n        align-items: center;\n\n        input {\n          font-size: 12px;\n          font-weight: 400;\n          color: ",";\n          line-height: inherit;\n          padding: 7px 10px;\n          margin: ",";\n          border: 1px solid ",";\n          outline: 0 !important;\n          overflow: hidden;\n          background-color: #ffffff;\n          ",";\n          ",";\n          ",";\n\n          &:focus,\n          &:hover {\n            border-color: ",";\n            ",";\n          }\n\n          &::-webkit-input-placeholder {\n            color: ",";\n          }\n\n          &:-moz-placeholder {\n            color: ",";\n          }\n\n          &::-moz-placeholder {\n            color: ",";\n          }\n          &:-ms-input-placeholder {\n            color: ",";\n          }\n        }\n\n        .isoEditIcon {\n          cursor: pointer;\n        }\n      }\n\n      .isoDataWrapper {\n        display: flex;\n        align-items: center;\n\n        .isoEditIcon {\n          margin: ",";\n          cursor: pointer;\n          flex-shrink: 0;\n        }\n      }\n    }\n  }\n"])),(0,g.palette)("primary",16),(0,g.palette)("secondary",12),(n=>n.noneBorder?"none":"  rgb(159, 162, 165) 0px 2px 2px 0px"),(0,g.palette)("primary",16),(0,g.palette)("text",6),(0,g.palette)("primary",16),(n=>n.noneBorder?"none":"  inset 0 -1px 0px 0 #000000"),(n=>n.noneBorder?"none":" 1px solid #797979"),(n=>n.noneBorder?"none":" 1px solid #797979"),(0,g.palette)("secondary",1),(n=>"rtl"===n["data-rtl"]?"0 4px 0 0":"0 0 0 4px"),(n=>"rtl"===n["data-rtl"]?"right":"left"),(0,g.palette)("text",3),(n=>n.noneBorder?"":"1px solid #797979"),(0,g.palette)("border",0),(0,g.palette)("primary",0),(0,h.kY)(),(0,g.palette)("primary",4),(0,g.palette)("border",0),(0,g.palette)("border",0),(n=>"rtl"===n["data-rtl"]?"left":"right"),(0,g.palette)("border",0),(0,g.palette)("border",0),(n=>"rtl"===n["data-rtl"]?"rotate(180deg)":"rotate(0)"),(n=>"rtl"===n["data-rtl"]?"0 0 0 8px":"0 8px 0 0"),(n=>"rtl"===n["data-rtl"]?"0 0 0 8px":"0 8px 0 0"),(0,g.palette)("primary",0),(0,h.kY)(),(0,g.palette)("primary",0),(0,g.palette)("primary",0),(0,g.palette)("primary",0),(0,g.palette)("grayscale",6),(0,g.palette)("text",3),(0,g.palette)("primary",0),(0,g.palette)("secondary",1),(0,g.palette)("secondary",2),(0,h.Vq)(),(0,g.palette)("secondary",1),(0,g.palette)("secondary",2),(0,h.Vq)(),(0,g.palette)("primary",0),(0,g.palette)("border",0),(0,h.MS)("0 1px 6px rgba(0,0,0,0.2)"),(0,g.palette)("text",3),(0,g.palette)("secondary",7),(0,h.Vq)("3px 0 0 3px"),(0,h.kY)(),(0,h.MS)("none"),(0,g.palette)("secondary",7),(0,h.MS)("none"),(0,g.palette)("grayscale",0),(0,g.palette)("grayscale",0),(0,g.palette)("grayscale",0),(0,g.palette)("grayscale",0),(0,g.palette)("primary",0),(n=>"rtl"===n["data-rtl"]?"3px 0 0 3px":"0 3px 3px 0"),(0,h.kY)(),(0,g.palette)("primary",1),(n=>"rtl"===n["data-rtl"]?"0 0 0 10px":"0 10px 0 0"),(0,g.palette)("border",0),(n=>"rtl"===n["data-rtl"]?"0":"1px"),(0,g.palette)("border",0),(0,g.palette)("secondary",12),(0,g.palette)("border",0),(n=>"rtl"===n["data-rtl"]?"0":"1px"),(0,g.palette)("border",0),(n=>"rtl"===n["data-rtl"]?"1px":"0"),(0,g.palette)("border",0),(0,g.palette)("text",3),(n=>"rtl"===n["data-rtl"]?"0 0 0 10px":"0 10px 0 0"),(0,g.palette)("border",0),(0,h.Vq)("3px"),(0,h.MS)(),(0,h.kY)(),(0,g.palette)("border",0),(0,h.MS)(),(0,g.palette)("grayscale",0),(0,g.palette)("grayscale",0),(0,g.palette)("grayscale",0),(0,g.palette)("grayscale",0),(n=>"rtl"===n["data-rtl"]?"0 auto 0 0":"0 0 0 auto")),u=x.Ay.div(s||(s=(0,a.A)(["\n  .isoCustomizedTableControlBar {\n    margin-bottom: 40px;\n\n    .ant-form-item {\n      margin: ",";\n    }\n\n    .ant-form-item-label {\n      label {\n        color: ",";\n\n        &:after {\n          margin: ",";\n        }\n      }\n    }\n\n    .ant-switch-checked {\n      border-color: ",";\n      background-color: ",";\n    }\n  }\n"])),(n=>"rtl"===n["data-rtl"]?"0 0 0 16px":"0 16px 0 0"),(0,g.palette)("secondary",2),(n=>"rtl"===n["data-rtl"]?"0 2px 0 8px":"0 8px 0 2px"),(0,g.palette)("primary",0),(0,g.palette)("primary",0)),y=(0,x.Ay)(p)(b||(b=(0,a.A)(["\n  .ant-table-placeholder {\n    border: none !important;\n  }\n"]))),v=((0,m.A)(u),(0,m.A)(f))},81538:(n,t,e)=>{e.d(t,{A:()=>c});e(82483);var a,r=e(57528),o=e(22953),l=e(55333);const i=o.Ay.div(a||(a=(0,r.A)(["\n  /* margin-top: 15px;\n  margin-bottom: 15px; */\n  text-align: right;\n  /* flex: 1; */\n  padding: 0 3px 0 0;\n  display: flex;\n  gap: 10px;\n  justify-content: end;\n  flex-wrap: wrap;\n  align-items: center;\n  @media only screen and (max-width: 1336px) {\n    text-align: left;\n    flex: none;\n    width: 100%;\n    padding: 0 0 10px 0;\n    margin-top: 5px;\n    margin-bottom: 5px;\n  }\n  /* button {\n    margin-right: 0px;\n    margin-left: 10px;\n    @media only screen and (max-width: 1336px) {\n      margin-left: 0px;\n      margin-right: 10px;\n    }\n  } */\n"]))),d=(0,l.A)(i);var p=e(56723);const c=n=>(0,p.jsx)(d,{children:n.children})},34045:(n,t,e)=>{e.d(t,{A:()=>s});e(82483);var a,r=e(57528),o=e(22953),l=e(6535),i=e(55333);const d=o.Ay.h1(a||(a=(0,r.A)(["\n  font-size: 19px;\n  font-weight: 600;\n  color: ",";\n  padding-left: 10px;\n  /* margin-bottom: 15px; */\n  display: inline-flex;\n  align-items: center;\n  white-space: nowrap;\n  text-transform: uppercase;\n  /*   \n  &:before {\n    content: '';\n    width: 4px;\n    height: 35px;\n    background-color: ",";\n    display: flex;\n    margin: ",";\n  } */\n\n  .long-text {\n    @media only screen and (max-width: 800px) {\n      font-size: 16px;\n    }\n\n    @media only screen and (max-width: 479px) {\n      font-size: 14px;\n    }\n\n    @media only screen and (max-width: 430px) {\n      font-size: 12px;\n    }\n\n    .ke-khai-lai {\n      color: #ff4c3b;\n      font-size: 14px;\n      text-decoration: underline;\n      cursor: pointer;\n    }\n  }\n"])),(0,l.palette)("secondary",2),(0,l.palette)("secondary",11),(n=>"rtl"===n["data-rtl"]?"0 0 0 15px":"0 8px 0 0")),p=(0,i.A)(d);e(92378),e(82402);var c=e(56723);const s=n=>{var t;return!(null===(t=JSON.parse(localStorage.getItem("data_config")))||void 0===t||!t.isIframe)&&JSON.parse(localStorage.getItem("data_config")).isIframe?null:(0,c.jsx)(p,{className:"isoComponentTitle",children:n.children})}}}]);