"use strict";(self.webpackChunkkkts=self.webpackChunkkkts||[]).push([[9300],{2637:(e,n,i)=>{i.d(n,{A:()=>h});i(82483);var t,a=i(57528),o=i(22953);i(6535);const l=o.Ay.div(t||(t=(0,a.A)(["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  flex-wrap: wrap;\n  padding: 10px 0;\n  gap: 10px;\n  width: 100%;\n"])));var s=i(56723);const h=e=>(0,s.jsx)(l,{className:"wrapper-top",children:e.children})},82859:(e,n,i)=>{i.d(n,{A:()=>h});var t=i(65828),a=i(18570),o=i(54686),l=i.n(o),s=i(56723);const h=e=>{const{onFilter:n,filterData:i}=e;return(0,s.jsxs)("div",{style:{display:"flex",gap:10},children:[(0,s.jsx)(t.lr,{placeholder:"T\u1eeb ng\xe0y",format:"DD/MM/YYYY",value:i.TuNgay?l()(i.TuNgay,"YYYY/MM/DD"):null,onChange:(e,i)=>n(e?(0,a.Yq)(e):null,"TuNgay"),disabledDate:e=>(0,a.IH)(e,i.DenNgay)}),(0,s.jsx)(t.lr,{value:i.DenNgay?l()(i.DenNgay,"YYYY/MM/DD"):null,onChange:(e,i)=>n(e?(0,a.Yq)(e):null,"DenNgay"),placeholder:"\u0110\u1ebfn ng\xe0y",format:"DD/MM/YYYY",disabledDate:e=>(0,a.IH)(i.TuNgay,e,2)})]})}},86880:(e,n,i)=>{i.d(n,{A:()=>L});var t,a=i(82483),o=i(79948),l=i(72741),s=i(93445),h=i(256),c=i(2370),d=(i(69973),i(57528));const r=i(22953).Ay.div(t||(t=(0,d.A)(["\n  .item-info + .item-info {\n    margin-top: 10px;\n  }\n  .item-info {\n    span {\n      font-weight: 600;\n    }\n  }\n  .box-file {\n    table {\n      border-collapse: collapse;\n    }\n    table th,\n    table td {\n      border: 1px solid #d7d7d7;\n    }\n  }\n  .file-item {\n    padding: 5px;\n  }\n  .file {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    margin-top: 10px;\n    p {\n      font-weight: 600;\n    }\n  }\n\n  .ant-form-title__left {\n    margin-bottom: 0;\n    .ant-form-item-row {\n      display: grid !important;\n    }\n    .ant-form-item-label {\n      text-align: left;\n    }\n    .ant-form-item-row {\n      width: 100%;\n    }\n    .ant-form-item-control-input-content {\n      width: 100%;\n      /* width: 450px; */\n      input {\n        height: 30px;\n      }\n    }\n  }\n\n  .group-title {\n    margin-top: 10px;\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    .title-content__breadCum {\n      font-size: 14px;\n      font-weight: 600;\n    }\n    button {\n      width: 80px !important;\n      height: 25px !important;\n    }\n  }\n  .wrapper-user {\n    margin-top: 10px;\n    .title {\n      display: grid;\n      grid-template-columns: 45.5% auto;\n      /* justify-content: space-between; */\n      p {\n        font-size: 13px;\n      }\n    }\n  }\n  .justifyEnd {\n    justify-content: end !important;\n  }\n  .groups-user {\n    display: flex;\n    flex-direction: column;\n    gap: 10px;\n    .wrapper-select {\n      display: grid;\n      grid-template-columns: 450px 450px auto;\n      gap: 30px;\n      align-items: center;\n    }\n  }\n  .btn-delete {\n    justify-self: end;\n    justify-items: end;\n    button {\n      width: 80px;\n      height: 25px;\n    }\n  }\n\n  .file-wrapper {\n    margin-top: 30px;\n    .file-wrapper__top {\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n      p {\n        font-size: 13px;\n        font-weight: bold;\n      }\n    }\n    .file-wrapper__content {\n      table {\n        margin-top: 10px;\n        width: 100%;\n        border-collapse: collapse;\n        thead th {\n          border: 1px solid #797979;\n        }\n        tbody td {\n          border: 1px solid #797979;\n        }\n      }\n    }\n  }\n  .info-wrapper {\n    margin-top: 30px;\n  }\n  .user-report {\n    margin-top: 30px;\n  }\n  .ant-picker {\n    height: 30px;\n    width: 100%;\n  }\n"])));var u=i(33713),p=i(65828),m=(i(94690),i(18570)),x=(i(93474),i(87734)),y=i(21428),S=i(38674),g=i(54686),T=i.n(g),D=i(56723);const{Item:f}=o.A;class H extends a.Component{constructor(e){var n;super(e),n=this,this.deteleFile=(e,n)=>{const{DanhSachHoSoTaiLieu:i}=this.state;e.FileDinhKemID?l.A.confirm({title:"Th\xf4ng b\xe1o",content:"B\u1ea1n c\xf3 mu\u1ed1n x\xf3a file \u0111\xednh k\xe8m n\xe0y kh\xf4ng ?",okText:"C\xf3",cancelText:"Kh\xf4ng",onOk:()=>{e.TrangThai=0;const n=[...i],t=n.indexOf(e);n.splice(t,1),this.setState({DanhSachHoSoTaiLieu:n,isFalseFile:!1,messErr:""})}}):(i.splice(n,1),this.setState({DanhSachHoSoTaiLieu:i,isFalseFile:!1,messErr:""}))},this.onOk=async function(){let e=arguments.length>0&&void 0!==arguments[0]&&arguments[0],i=arguments.length>1?arguments[1]:void 0;const{DanhSachHoSoTaiLieu:t}=n.state,{onCreate:a,dataEdit:o}=n.props;n.formRef.current.validateFields().then((o=>{(0,m.b5)("user",{});const l={DanhSachHoSoTaiLieu:t,HuongGiaiQuyetID:o.HuongGiaiQuyetID,NoiDungHuongDan:o.NoiDungHuongDan};n.props.XuLyDonID&&(l.XuLyDonID=n.props.XuLyDonID);const s=n.state.keyModalTrinhDuyet+1;e?n.setState({visibleModalTrinhDuyet:!0,keyModalTrinhDuyet:s}):i?(n.setState({visibleModalTrinhDuyet:!1}),a(l,!0)):a(l)})).catch((e=>console.log("errr",e)))},this.TrinhKetQua=()=>{const e=this.state.keyModalTrinhDuyet+1;this.setState({visibleModalTrinhDuyet:!0,keyModalTrinhDuyet:e})},this.showModalHoSoTaiLieu=e=>{if(e||0===e){const{DanhSachHoSoTaiLieu:n,keyModalHoSoTaiLieu:i}=this.state,t=i+1;this.setState({keyModalHoSoTaiLieu:t,visibleModalHoSoTaiLieu:!0,dataModalHoSoTaiLieu:{...n[e],index:e}})}else{const{DanhSachHoSoTaiLieu:e,keyModalHoSoTaiLieu:n}=this.state,i=n+1;this.setState({keyModalHoSoTaiLieu:i,visibleModalHoSoTaiLieu:!0})}},this.closeModalHoSoTaiLieu=e=>{this.setState({visibleModalHoSoTaiLieu:!1,dataModalHoSoTaiLieu:{}})},this.closeModalTrinhDuyet=()=>{this.setState({visibleModalTrinhDuyet:!1})},this.deleteHoSoTaiLieu=e=>{l.A.confirm({title:"X\xf3a D\u1eef Li\u1ec7u",content:"B\u1ea1n c\xf3 mu\u1ed1n x\xf3a H\u1ed3 s\u01a1, t\xe0i li\u1ec7u n\xe0y kh\xf4ng?",cancelText:"Kh\xf4ng",okText:"C\xf3",onOk:()=>{const{DanhSachHoSoTaiLieu:n,keyModalHoSoTaiLieu:i}=this.state;n.splice(e,1),s.Ay.destroy(),s.Ay.success("X\xf3a th\xe0nh c\xf4ng")}})},this.submitModalHoSoTaiLieu=e=>{const{index:n}=e;if(n||0===n){const{DanhSachHoSoTaiLieu:i}=this.state,t=[...i];t.splice(n,1,e),this.setState({visibleModalHoSoTaiLieu:!1,DanhSachHoSoTaiLieu:t}),s.Ay.destroy(),s.Ay.success("C\u1eadp nh\u1eadt h\u1ed3 s\u01a1 t\xe0i li\u1ec7u th\xe0nh c\xf4ng")}else{const{DanhSachHoSoTaiLieu:n,keyModalHoSoTaiLieu:i}=this.state,t=[...n];t.push(e),this.setState({visibleModalHoSoTaiLieu:!1,DanhSachHoSoTaiLieu:t}),s.Ay.destroy(),s.Ay.success("Th\xeam m\u1edbi h\u1ed3 s\u01a1 t\xe0i li\u1ec7u th\xe0nh c\xf4ng")}},this.state={DanhSachHoSoTaiLieu:[],dataModalHoSoTaiLieu:{},keyModalHoSoTaiLieu:0,visibleModalHoSoTaiLieu:!1,keyModalTrinhDuyet:0,visibleModalTrinhDuyet:!1,fileView:{},fileKey:0,isFile:!1},this.formRef=a.createRef()}componentDidMount(){const{dataEdit:e}=this.props;e&&e.DanhSachHoSoTaiLieu&&this.setState({DanhSachHoSoTaiLieu:e.DanhSachHoSoTaiLieu})}render(){var e;const{dataEdit:n,title:i,visible:t,onCreate:a,fileKey:l,onCancel:s,DanhSachTenFile:d,DanhSachHuongXuLy:m,DanhSachCanBoXuLy:g,loading:f}=this.props,{ListFileDinhKem:H,isFile:L,DanhSachHoSoTaiLieu:v,visibleModalTrinhDuyet:b}=this.state,j=null!==(e=this.props.dataEdit)&&void 0!==e&&e.isViewDetails?this.props.dataEdit.isViewDetails:null;return(0,D.jsx)(p.aF,{title:"K\u1ebft qu\u1ea3 x\u1eed l\xfd \u0111\u01a1n",visible:t,className:"center-modal__footer",footer:j?(0,D.jsx)(D.Fragment,{children:(0,D.jsx)(c.A,{className:"btn-danger",onClick:()=>s(),children:"\u0110\xf3ng"})}):(0,D.jsxs)(D.Fragment,{children:[(0,D.jsxs)(c.A,{type:"primary",onClick:()=>this.onOk(),loading:f,children:[(0,D.jsx)(x.A,{})," L\u01b0u"]}),(0,D.jsxs)(c.A,{type:"primary",onClick:()=>this.onOk(!0),loading:f,children:[(0,D.jsx)(x.A,{})," L\u01b0u v\xe0 tr\xecnh"]}),(0,D.jsx)(c.A,{className:"btn-danger",onClick:()=>s(),children:"H\u1ee7y"})]}),width:800,onCancel:()=>s(),children:(0,D.jsx)(r,{children:(0,D.jsxs)(o.A,{ref:this.formRef,children:[(0,D.jsxs)(D.Fragment,{children:[(0,D.jsxs)("p",{className:"item-info",children:["H\u01b0\u1edbng x\u1eed l\xfd : ",(0,D.jsx)("span",{children:null===n||void 0===n?void 0:n.HuongXuLy})]}),(0,D.jsxs)("p",{className:"item-info",children:["N\u1ed9i dung x\u1eed l\xfd : ",(0,D.jsx)("span",{children:null===n||void 0===n?void 0:n.NoiDungHuongDan})]}),(null===n||void 0===n?void 0:n.HuongGiaiQuyetID)===u.HuongGiaiQuyet.ChuyenDon?(0,D.jsxs)("p",{className:"item-info",children:["Chuy\u1ec3n cho c\u01a1 quan : ",(0,D.jsx)("span",{children:null===n||void 0===n?void 0:n.ChuyenChoCoQuan})]}):null,(0,D.jsx)("p",{className:"item-info",children:"H\u1ed3 s\u01a1, t\xe0i li\u1ec7u"})]}),v&&null!==v&&void 0!==v&&v.length?(0,D.jsx)("div",{style:{marginTop:"10px"},className:"box-file",children:(0,D.jsxs)("table",{children:[(0,D.jsx)("thead",{children:(0,D.jsxs)("tr",{children:[(0,D.jsx)("th",{style:{width:"5%"},children:"STT"}),(0,D.jsx)("th",{style:{width:"30%"},children:"T\xean h\u1ed3 s\u01a1, t\xe0i li\u1ec7u"}),(0,D.jsx)("th",{style:{width:"30%"},children:"File \u0111\xednh k\xe8m"}),(0,D.jsx)("th",{style:{width:"25%"},children:"Ng\xe0y c\u1eadp nh\u1eadt"}),j?null:(0,D.jsx)("th",{style:{width:"15%",textAlign:"center"},children:"Thao t\xe1c"})]})}),v.map(((e,n)=>{var i;return(0,D.jsxs)("tbody",{children:[(0,D.jsxs)("tr",{children:[(0,D.jsx)("td",{rowspan:e.FileDinhKem.length,style:{textAlign:"center"},children:n+1}),(0,D.jsx)("td",{rowspan:e.FileDinhKem.length,children:(null===e||void 0===e?void 0:e.name)||(null===e||void 0===e?void 0:e.TenFile)}),(0,D.jsx)("td",{children:(0,D.jsx)("div",{className:"group-file",children:e.FileDinhKem[0]?(0,D.jsx)("p",{className:"file-item",children:(0,D.jsx)("a",{href:e.FileDinhKem[0].FileUrl,target:"_blank",children:e.FileDinhKem[0].name||(null===(i=e.FileDinhKem[0])||void 0===i?void 0:i.TenFile)})}):null})}),(0,D.jsx)("td",{rowspan:e.FileDinhKem.length,children:(0,D.jsx)("p",{children:T()().format("DD/MM/YYYY")})}),j?null:(0,D.jsx)("td",{rowspan:e.FileDinhKem.length,style:{textAlign:"center"},children:(0,D.jsxs)("div",{className:"action-btn",children:[(0,D.jsx)(h.A,{title:"S\u1eeda H\u1ed3 s\u01a1, t\xe0i li\u1ec7u",children:(0,D.jsx)(y.A,{onClick:()=>this.showModalHoSoTaiLieu(n)})}),(0,D.jsx)(h.A,{title:"X\xf3a H\u1ed3 s\u01a1, t\xe0i li\u1ec7u",children:(0,D.jsx)(S.A,{onClick:()=>this.deteleFile(e,n)})})]})})]}),e.FileDinhKem?e.FileDinhKem.map(((e,n)=>{if(n>0)return(0,D.jsx)("tr",{children:(0,D.jsx)("td",{children:(0,D.jsx)("p",{className:"file-item",children:(0,D.jsx)("a",{href:e.FileUrl,target:"_blank",children:e.name||(null===e||void 0===e?void 0:e.TenFile)})})})})})):null]})}))]})}):""]})})},l)}}const L=H},6374:(e,n,i)=>{i.d(n,{U:()=>l});var t=i(82483),a=i(72741),o=i(93445);const l=e=>{const[n,i]=(0,t.useState)({DanhSachHoSoTaiLieu:[],dataModalHoSoTaiLieu:{},keyModalHoSoTaiLieu:0,visibleModalHoSoTaiLieu:!1,loading:!1}),{visibleModalHoSoTaiLieu:l,dataModalHoSoTaiLieu:s,keyModalHoSoTaiLieu:h,DanhSachHoSoTaiLieu:c}=n;return[l,s,h,c,e=>{const{DanhSachHoSoTaiLieu:t,keyModalHoSoTaiLieu:a}=n;if(e||0===e){const n=a+1;i((i=>({...i,keyModalHoSoTaiLieu:n,visibleModalHoSoTaiLieu:!0,DanhSachHoSoTaiLieu:{...t[e],index:e}})))}else{const e=a+1;i((n=>({...n,keyModalHoSoTaiLieu:e,visibleModalHoSoTaiLieu:!0})))}},e=>{i((e=>({...e,visibleModalHoSoTaiLieu:!1,dataModalHoSoTaiLieu:{}})))},e=>{const{index:t}=e;if(t||0===t){const{DanhSachHoSoTaiLieu:a}=n,l=[...a];l.splice(t,1,e),i((e=>({...e,visibleModalHoSoTaiLieu:!1,DanhSachHoSoTaiLieu:l}))),o.Ay.destroy(),o.Ay.success("C\u1eadp nh\u1eadt h\u1ed3 s\u01a1 t\xe0i li\u1ec7u th\xe0nh c\xf4ng")}else{const{DanhSachHoSoTaiLieu:t,keyModalHoSoTaiLieu:a}=n,l=[...t];l.push(e),i((e=>({...e,visibleModalHoSoTaiLieu:!1,DanhSachHoSoTaiLieu:l}))),o.Ay.destroy(),o.Ay.success("Th\xeam m\u1edbi h\u1ed3 s\u01a1 t\xe0i li\u1ec7u th\xe0nh c\xf4ng")}},(e,t)=>{const{DanhSachHoSoTaiLieu:o}=n;if(e.FileDinhKemID)a.A.confirm({title:"Th\xf4ng b\xe1o",content:"B\u1ea1n c\xf3 mu\u1ed1n x\xf3a file \u0111\xednh k\xe8m n\xe0y kh\xf4ng ?",okText:"C\xf3",cancelText:"Kh\xf4ng",onOk:()=>{e.TrangThai=0;const n=[...o],t=n.indexOf(e);n.splice(t,1),i((e=>({...e,DanhSachHoSoTaiLieu:n})))}});else{const e=[...o];e.splice(t,1),i((n=>({...n,DanhSachHoSoTaiLieu:e})))}},e=>{i((n=>({...n,...e})))}]}},60559:(e,n,i)=>{i.d(n,{A:()=>h});var t=i(58168),a=i(82483);const o={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M912 192H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zm0 284H328c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h584c4.4 0 8-3.6 8-8v-56c0-4.4-3.6-8-8-8zM104 228a56 56 0 10112 0 56 56 0 10-112 0zm0 284a56 56 0 10112 0 56 56 0 10-112 0zm0 284a56 56 0 10112 0 56 56 0 10-112 0z"}}]},name:"unordered-list",theme:"outlined"};var l=i(56594),s=function(e,n){return a.createElement(l.A,(0,t.A)({},e,{ref:n,icon:o}))};const h=a.forwardRef(s)}}]);