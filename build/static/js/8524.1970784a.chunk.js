"use strict";(self.webpackChunkkkts=self.webpackChunkkkts||[]).push([[8524,2782],{74405:(e,n,a)=>{a.d(n,{$:()=>l,A:()=>d});var t,r=a(26418),o=a(57528),c=a(22953),i=a(6535);const s=(e=>(0,c.Ay)(e)(t||(t=(0,o.A)(["\n  &.ant-checkbox-wrapper {\n    font-size: 13px;\n    color: ",";\n\n    .ant-checkbox {\n      top: inherit;\n    }\n\n    .ant-checkbox-checked .ant-checkbox-inner,\n    .ant-checkbox-indeterminate .ant-checkbox-inner {\n      background-color: ",";\n      border-color: ",";\n    }\n\n    .ant-checkbox:hover .ant-checkbox-inner,\n    .ant-checkbox-input:focus + .ant-checkbox-inner {\n      border-color: ",";\n    }\n\n    &:hover {\n      .ant-checkbox-inner {\n        border-color: ",";\n      }\n    }\n  }\n"])),(0,i.palette)("text",1),(0,i.palette)("primary",0),(0,i.palette)("primary",0),(0,i.palette)("primary",0),(0,i.palette)("primary",0)))(r.A),l=r.A.Group,d=s},2637:(e,n,a)=>{a.d(n,{A:()=>s});a(82483);var t,r=a(57528),o=a(22953);a(6535);const c=o.Ay.div(t||(t=(0,r.A)(["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  flex-wrap: wrap;\n  padding: 10px 0;\n  gap: 10px;\n  width: 100%;\n"])));var i=a(56723);const s=e=>(0,i.jsx)(c,{className:"wrapper-top",children:e.children})},67466:(e,n,a)=>{a.d(n,{D:()=>r});var t=a(82483);function r(e){const[n,a]=(0,t.useState)(0);return[n,()=>{a(n+1)}]}},18524:(e,n,a)=>{a.r(n),a.d(n,{default:()=>E});var t=a(72741),r=a(93445),o=a(256),c=a(85384),i=a(82483),s=a(82402),l=a(53660),d=a(34045),h=a(81538),u=a(64684),g=a(67353),A=a(53615),y=a(74405),m=a(69973),x=a(65828),D=a(18570),p=a(67466),v=a(92378),f=a(81331),b=a(33713),T=a(79948),N=a(23511),j=a(56723);const{Item:k,useForm:S}=T.A,M=e=>{const[n]=S(),[a,t]=(0,i.useState)(!0),{dataEdit:r,loading:o,visible:c,action:s}=e;(0,i.useEffect)((()=>{r&&r.NguonDonDenID&&n&&n.setFieldsValue({...r,TrangThai:r.TrangThai?1:0})}),[]);return(0,j.jsx)(x.aF,{title:"".concat("edit"===s?"S\u1eeda":"Th\xeam"," th\xf4ng tin ngu\u1ed3n \u0111\u01a1n \u0111\u1ebfn"),width:450,open:c,onCancel:e.onCancel,footer:[(0,j.jsx)(x.$n,{onClick:e.onCancel,children:"H\u1ee7y"},"back"),(0,j.jsx)(x.$n,{htmlType:"submit",type:"primary",form:"formnguondonden",loading:o,onClick:async a=>{a.preventDefault();const t=await n.validateFields();e.onCreate({...t,TrangThai:Boolean(t.TrangThai)})},disabled:a,children:"L\u01b0u"},"submit")],children:(0,j.jsxs)(T.A,{form:n,name:"formnguondonden",initialValues:{TrangThai:1},onValuesChange:(e,n)=>{const{MaNguonDonDen:a,TenNguonDonDen:r}=n;t(!a||!r)},children:["edit"===s?(0,j.jsx)(k,{name:"NguonDonDenID",hidden:!0}):"",(0,j.jsx)(k,{label:"M\xe3 ngu\u1ed3n \u0111\u01a1n \u0111\u1ebfn",name:"MaNguonDonDen",...b.ITEM_LAYOUT,rules:[b.REQUIRED],children:(0,j.jsx)(x.mS,{form:n,nameField:"MaNguonDonDen"})}),(0,j.jsx)(k,{label:"T\xean ngu\u1ed3n \u0111\u01a1n \u0111\u1ebfn",name:"TenNguonDonDen",...b.ITEM_LAYOUT,rules:[b.REQUIRED],children:(0,j.jsx)(x.pd,{})}),(0,j.jsx)(k,{label:"Ghi ch\xfa",name:"GhiChu",...b.ITEM_LAYOUT,children:(0,j.jsx)(x.TM,{})}),(0,j.jsx)(k,{label:"\u0110ang s\u1eed d\u1ee5ng",name:"TrangThai",...b.ITEM_LAYOUT,children:(0,j.jsxs)(N.Ay.Group,{children:[(0,j.jsx)(N.Ay,{value:1,children:"C\xf3"}),(0,j.jsx)(N.Ay,{value:0,children:"Kh\xf4ng"})]})})]})})};var w=a(48259),C=a(21428),P=a(38674),z=a(2782),I=a(2637);const E=(0,s.Ng)((function(e){return{...e.DanhMucNguonDonDen,role:(0,D.vh)(e.Auth.role,"danh-muc-nguon-don-den")}}),c.A)((e=>{var n;document.title="Danh M\u1ee5c Ngu\u1ed3n \u0110\u01a1n \u0110\u1ebfn";const[a,c]=(0,i.useState)(v.parse(e.location.search)),[s,b]=(0,i.useState)({}),[T,N]=(0,i.useState)(!1),[k,S]=(0,i.useState)(""),[E,L]=(0,p.D)(),[q,R]=(0,i.useState)([]),[H,G]=(0,i.useState)(!1),{TotalRow:K}=e;(0,i.useEffect)((()=>{(0,D._Y)(a),e.getList(a)}),[a]),(0,i.useEffect)((()=>{e.getList(a)}),[]);const U=(e,n)=>{let t=a,r={value:e,property:n},o=(0,D.D5)(t,r,null);c(o),R([])},V=()=>{S(""),R([]),b({}),N(!1)},B=n=>(0,j.jsxs)("div",{className:"action-btn",children:[O.edit?(0,j.jsx)(o.A,{title:"S\u1eeda",children:(0,j.jsx)(C.A,{onClick:()=>(e=>{const n=e;S("edit"),f.A.ChiTietNguonDonDen({NguonDonDenID:n}).then((e=>{e.data.Status>0?(b(e.data.Data),L(),N(!0)):(r.Ay.destroy(),r.Ay.error(e.data.Message))})).catch((e=>{r.Ay.destroy(),r.Ay.error(e.toString())}))})(n.NguonDonDenID)})}):"",O.delete?(0,j.jsx)(o.A,{title:"X\xf3a",children:(0,j.jsx)(P.A,{onClick:()=>{return o=n.NguonDonDenID,void t.A.confirm({icon:(0,j.jsx)(w.A,{}),title:"X\xf3a D\u1eef Li\u1ec7u",content:"B\u1ea1n c\xf3 mu\u1ed1n x\xf3a ngu\u1ed3n \u0111\u01a1n \u0111\u1ebfn n\xe0y kh\xf4ng?",cancelText:"Kh\xf4ng",okText:"C\xf3",onOk:()=>{G(!0),f.A.XoaNguonDonDen({NguonDonDenID:o}).then((n=>{n.data.Status>0?(G(!1),e.getList({...a,PageNumber:Math.ceil((K?K-1:K)/a.PageSize)<a.PageNumber?Math.ceil((K?K-1:K)/a.PageSize):a.PageNumber}),r.Ay.destroy(),r.Ay.success(n.data.Message),c({...a,PageNumber:Math.ceil((K?K-1:K)/a.PageSize)<a.PageNumber?Math.ceil((K?K-1:K)/a.PageSize):a.PageNumber})):(r.Ay.destroy(),r.Ay.error(n.data.Message))})).catch((e=>{r.Ay.destroy(),r.Ay.error(e.toString())}))}});var o}})}):""]}),{DanhSachNguonDonDen:F,role:O}=e,Y=a.PageNumber?parseInt(a.PageNumber):1,$=a.PageSize?parseInt(a.PageSize):(0,D.WT)(),_=[{title:"STT",width:"5%",align:"center",key:"stt",render:(e,n,a)=>(0,j.jsx)("span",{children:(Y-1)*$+(a+1)})},{title:"M\xe3 ngu\u1ed3n \u0111\u01a1n \u0111\u1ebfn",dataIndex:"MaNguonDonDen",align:"left",width:"15%"},{title:"T\xean ngu\u1ed3n \u0111\u01a1n \u0111\u1ebfn",dataIndex:"TenNguonDonDen",align:"left",width:"25%"},{title:"Ghi ch\xfa",dataIndex:"GhiChu",align:"left",width:"35%"},{title:"\u0110ang s\u1eed d\u1ee5ng",dataIndex:"TrangThai",align:"center",width:"10%",render:(e,n)=>(e=>(0,j.jsx)(y.A,{checked:e.TrangThai}))(n)},{title:"Thao t\xe1c",width:"10%",align:"center",render:(e,n)=>B(n)}],X=[{value:!0,key:"\u0110ang s\u1eed d\u1ee5ng"},{value:!1,key:"Kh\xf4ng s\u1eed d\u1ee5ng"}];return(0,j.jsxs)(l.A,{children:[(0,j.jsxs)(I.A,{children:[(0,j.jsx)(d.A,{children:"Danh M\u1ee5c Ngu\u1ed3n \u0110\u01a1n \u0110\u1ebfn"}),(0,j.jsx)(h.A,{children:O&&O.add?(0,j.jsxs)(x.$n,{type:"primary",onClick:()=>{S("add"),b({}),L(),N(!0)},children:[(0,j.jsx)(z.A,{}),"Th\xeam m\u1edbi"]}):""})]}),(0,j.jsxs)(u.A,{children:[(0,j.jsxs)(g.A,{children:[(0,j.jsx)(m.Ay,{defaultValue:null===(n=X.find((e=>e.value.toString()===a.status)))||void 0===n?void 0:n.key,style:{width:200},placeholder:"Ch\u1ecdn tr\u1ea1ng th\xe1i",allowClear:!0,onChange:e=>U(e,"status"),children:X.map((e=>(0,j.jsx)(m.c$,{value:e.value,children:e.key})))}),(0,j.jsx)(x.NJ,{allowClear:!0,defaultValue:a.Keyword,placeholder:"Nh\u1eadp m\xe3 ho\u1eb7c t\xean ngu\u1ed3n \u0111\u01a1n \u0111\u1ebfn",style:{width:300},onSearch:e=>U(e,"Keyword")})]}),(0,j.jsx)(A.Ay,{rowKey:"NguonDonDenID",columns:_,dataSource:F,onChange:(e,n,t)=>{let r=a,o={pagination:e,filters:n,sorter:t},i=(0,D.D5)(r,null,o);c(i),R([])},pagination:{showSizeChanger:!0,showTotal:(e,n)=>"T\u1eeb ".concat(n[0]," \u0111\u1ebfn ").concat(n[1]," tr\xean ").concat(e," k\u1ebft qu\u1ea3"),total:K,current:Y,pageSize:$}})]}),(0,j.jsx)(M,{visible:T,dataEdit:s,action:k,loading:H,onCreate:n=>{G(!0),"add"===k&&f.A.ThemNguonDonDen(n).then((n=>{G(!1),n.data.Status>0?(r.Ay.destroy(),r.Ay.success(n.data.Message),V(),e.getList({...a,PageNumber:Math.ceil((K?K-1:K)/a.PageSize)<a.PageNumber?Math.ceil((K?K-1:K)/a.PageSize):a.PageNumber}),c({...a,PageNumber:Math.ceil((K?K-1:K)/a.PageSize)<a.PageNumber?Math.ceil((K?K-1:K)/a.PageSize):a.PageNumber})):(G(!1),r.Ay.destroy(),r.Ay.error(n.data.Message))})).catch((e=>{G(!1),r.Ay.destroy(),r.Ay.error(e.toString())})),"edit"===k&&f.A.CapNhatNguonDonDen(n).then((n=>{n.data.Status>0?(G(!1),r.Ay.destroy(),r.Ay.success(n.data.Message),V(),e.getList(a)):(G(!1),r.Ay.destroy(),r.Ay.error(n.data.Message))})).catch((e=>{G(!1),r.Ay.destroy(),r.Ay.error(e.toString())}))},onCancel:V,DanhSachNguonDonDen:F},E)]})}))},38674:(e,n,a)=>{a.d(n,{A:()=>s});var t=a(58168),r=a(82483);const o={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M360 184h-8c4.4 0 8-3.6 8-8v8h304v-8c0 4.4 3.6 8 8 8h-8v72h72v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80h72v-72zm504 72H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zM731.3 840H292.7l-24.2-512h487l-24.2 512z"}}]},name:"delete",theme:"outlined"};var c=a(56594),i=function(e,n){return r.createElement(c.A,(0,t.A)({},e,{ref:n,icon:o}))};const s=r.forwardRef(i)},21428:(e,n,a)=>{a.d(n,{A:()=>s});var t=a(58168),r=a(82483);const o={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M257.7 752c2 0 4-.2 6-.5L431.9 722c2-.4 3.9-1.3 5.3-2.8l423.9-423.9a9.96 9.96 0 000-14.1L694.9 114.9c-1.9-1.9-4.4-2.9-7.1-2.9s-5.2 1-7.1 2.9L256.8 538.8c-1.5 1.5-2.4 3.3-2.8 5.3l-29.5 168.2a33.5 33.5 0 009.4 29.8c6.6 6.4 14.9 9.9 23.8 9.9zm67.4-174.4L687.8 215l73.3 73.3-362.7 362.6-88.9 15.7 15.6-89zM880 836H144c-17.7 0-32 14.3-32 32v36c0 4.4 3.6 8 8 8h784c4.4 0 8-3.6 8-8v-36c0-17.7-14.3-32-32-32z"}}]},name:"edit",theme:"outlined"};var c=a(56594),i=function(e,n){return r.createElement(c.A,(0,t.A)({},e,{ref:n,icon:o}))};const s=r.forwardRef(i)},2782:(e,n,a)=>{a.d(n,{A:()=>s});var t=a(58168),r=a(82483);const o={icon:{tag:"svg",attrs:{viewBox:"64 64 896 896",focusable:"false"},children:[{tag:"path",attrs:{d:"M482 152h60q8 0 8 8v704q0 8-8 8h-60q-8 0-8-8V160q0-8 8-8z"}},{tag:"path",attrs:{d:"M192 474h672q8 0 8 8v60q0 8-8 8H160q-8 0-8-8v-60q0-8 8-8z"}}]},name:"plus",theme:"outlined"};var c=a(56594),i=function(e,n){return r.createElement(c.A,(0,t.A)({},e,{ref:n,icon:o}))};const s=r.forwardRef(i)}}]);