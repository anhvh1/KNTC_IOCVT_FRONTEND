"use strict";(self.webpackChunkkkts=self.webpackChunkkkts||[]).push([[1594],{74405:(e,a,t)=>{t.d(a,{$:()=>l,A:()=>d});var n,i=t(26418),r=t(57528),o=t(22953),s=t(6535);const c=(e=>(0,o.Ay)(e)(n||(n=(0,r.A)(["\n  &.ant-checkbox-wrapper {\n    font-size: 13px;\n    color: ",";\n\n    .ant-checkbox {\n      top: inherit;\n    }\n\n    .ant-checkbox-checked .ant-checkbox-inner,\n    .ant-checkbox-indeterminate .ant-checkbox-inner {\n      background-color: ",";\n      border-color: ",";\n    }\n\n    .ant-checkbox:hover .ant-checkbox-inner,\n    .ant-checkbox-input:focus + .ant-checkbox-inner {\n      border-color: ",";\n    }\n\n    &:hover {\n      .ant-checkbox-inner {\n        border-color: ",";\n      }\n    }\n  }\n"])),(0,s.palette)("text",1),(0,s.palette)("primary",0),(0,s.palette)("primary",0),(0,s.palette)("primary",0),(0,s.palette)("primary",0)))(i.A),l=i.A.Group,d=c},2637:(e,a,t)=>{t.d(a,{A:()=>c});t(82483);var n,i=t(57528),r=t(22953);t(6535);const o=r.Ay.div(n||(n=(0,i.A)(["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  flex-wrap: wrap;\n  padding: 10px 0;\n  gap: 10px;\n  width: 100%;\n"])));var s=t(56723);const c=e=>(0,s.jsx)(o,{className:"wrapper-top",children:e.children})},67466:(e,a,t)=>{t.d(a,{D:()=>i});var n=t(82483);function i(e){const[a,t]=(0,n.useState)(0);return[a,()=>{t(a+1)}]}},1594:(e,a,t)=>{t.r(a),t.d(a,{default:()=>I});var n=t(72741),i=t(93445),r=t(256),o=t(10474),s=t(82483),c=t(82402),l=t(53660),d=t(34045),h=t(81538),u=t(64684),g=t(67353),x=t(53615),y=t(65828),A=t(74405),p=t(18570),m=t(67466),T=t(92378),k=t(6897),b=(t(94690),t(33713)),j=t(79948),S=t(23511),L=t(24028),f=t(56723);const{Item:C,useForm:K}=j.A,v=e=>{const[a]=K(),[t,n]=(0,s.useState)(!0),{dataEdit:i,loading:r,visible:o,action:c}=e,[l,d]=(0,s.useState)();(0,s.useEffect)((()=>{i&&i.LoaiKetQuaID&&a&&a.setFieldsValue({...i})}),[]);return(0,f.jsx)(y.aF,{title:"".concat("edit"===c?"S\u1eeda":"Th\xeam"," th\xf4ng tin lo\u1ea1i k\u1ebft qu\u1ea3"),width:450,visible:o,onCancel:e.onCancel,footer:[(0,f.jsx)(y.$n,{onClick:e.onCancel,children:"H\u1ee7y"},"back"),(0,f.jsx)(y.$n,{htmlType:"submit",type:"primary",form:"formmonhoc",loading:r,onClick:async t=>{t.preventDefault();const n=await a.validateFields();"edit"===c&&e.onCreate({...n,TrangThai:l||n.TrangThai}),"add"===c&&e.onCreate({...n,TrangThai:void 0===l||l})},disabled:t,children:"L\u01b0u"},"submit")],children:(0,f.jsxs)(j.A,{form:a,name:"formmonhoc",onChange:async(e,t)=>{const r=await a.getFieldsValue(),{MaLoaiKetQua:o,TenLoaiKetQua:s,TrangThai:c,GhiChu:l}=r;o&&s&&(o!==i.MaLoaiKetQua||s!==i.TenLoaiKetQua||c!==i.TrangThai||l!==i.GhiChu)?n(!1):n(!0)},children:["edit"===c?(0,f.jsx)(C,{name:"LoaiKetQuaID",hidden:!0}):"",(0,f.jsx)(C,{label:"M\xe3 lo\u1ea1i k\u1ebft qu\u1ea3",name:"MaLoaiKetQua",...b.ITEM_LAYOUT,rules:[b.REQUIRED],children:(0,f.jsx)(y.mS,{})}),(0,f.jsx)(C,{label:"T\xean lo\u1ea1i k\u1ebft qu\u1ea3",name:"TenLoaiKetQua",...b.ITEM_LAYOUT,rules:[b.REQUIRED],children:(0,f.jsx)(y.pd,{})}),(0,f.jsx)(C,{label:"Ghi ch\xfa",name:"GhiChu",...b.ITEM_LAYOUT,children:(0,f.jsx)(L.A,{})}),(0,f.jsx)(C,{label:"\u0110ang s\u1eed d\u1ee5ng",name:"TrangThai",...b.ITEM_LAYOUT,children:(0,f.jsxs)(S.Ay.Group,{onChange:e=>{d(e.target.value)},value:l,defaultValue:!0,children:[(0,f.jsx)(S.Ay,{value:!0,children:"C\xf3"}),(0,f.jsx)(S.Ay,{value:!1,children:"Kh\xf4ng"})]})})]})})};var w=t(21428),M=t(38674),Q=t(2782),D=t(2637);const I=(0,c.Ng)((function(e){return{...e.DanhMucLoaiKetQua,role:(0,p.vh)(e.Auth.role,"danh-muc-loai-ket-qua")}}),o.A)((e=>{document.title="Danh M\u1ee5c Lo\u1ea1i K\u1ebft Qu\u1ea3";const[a,t]=(0,s.useState)(T.parse(e.location.search)),[o,c]=(0,s.useState)({}),[b,j]=(0,s.useState)(!1),[S,L]=(0,s.useState)(""),[C,K]=(0,m.D)(),[I,N]=(0,s.useState)([]),[P,E]=(0,s.useState)(!1);(0,s.useEffect)((()=>{(0,p._Y)(a),e.getList(a)}),[a]),(0,s.useEffect)((()=>{e.getList(a)}),[]);const q=(e,n)=>{let i=a,r={value:e,property:n},o=(0,p.D5)(i,r,null);t(o),N([])},z=()=>{N([]),c({}),j(!1)},G=o=>(0,f.jsxs)("div",{className:"action-btn",children:[(0,f.jsx)(r.A,{title:"S\u1eeda",children:(0,f.jsx)(w.A,{onClick:()=>(e=>{const a=e;L("edit"),k.A.ChiTietLoaiKetQua({LoaiKetQuaID:a}).then((e=>{e.data.Status>0?(c(e.data.Data),K(),j(!0)):(i.Ay.destroy(),i.Ay.error(e.data.Message))})).catch((e=>{i.Ay.destroy(),i.Ay.error(e.toString())}))})(o.LoaiKetQuaID)})}),(0,f.jsx)(r.A,{title:"X\xf3a",children:(0,f.jsx)(M.A,{onClick:()=>{return r=o.LoaiKetQuaID,void n.A.confirm({title:"X\xf3a D\u1eef Li\u1ec7u",content:"B\u1ea1n c\xf3 mu\u1ed1n x\xf3a lo\u1ea1i k\u1ebft qu\u1ea3 n\xe0y kh\xf4ng?",cancelText:"Kh\xf4ng",okText:"C\xf3",onOk:()=>{E(!0),k.A.XoaLoaiKetQua(r).then((n=>{n.data.Status>0?(E(!1),e.getList({...a,PageNumber:Math.ceil((U-1)/a.PageSize)<a.PageNumber?Math.ceil((U-1)/a.PageSize):a.PageNumber}),i.Ay.destroy(),i.Ay.success(n.data.Message),t({...a,PageNumber:Math.ceil((U-1)/a.PageSize)<a.PageNumber?Math.ceil((U-1)/a.PageSize):a.PageNumber})):(i.Ay.destroy(),i.Ay.error(n.data.Message))})).catch((e=>{i.Ay.destroy(),i.Ay.error(e.toString())}))}});var r}})})]}),{DanhSachLoaiKetQua:O,TotalRow:U,role:F}=e,R=a.PageNumber?parseInt(a.PageNumber):1,V=a.PageSize?parseInt(a.PageSize):(0,p.WT)(),Y=[{title:"STT",width:"5%",align:"center",render:(e,a,t)=>(0,f.jsx)("span",{children:(R-1)*V+(t+1)})},{title:"M\xe3 lo\u1ea1i k\u1ebft qu\u1ea3",dataIndex:"MaLoaiKetQua",align:"left",width:"15%"},{title:"T\xean lo\u1ea1i k\u1ebft qu\u1ea3",dataIndex:"TenLoaiKetQua",align:"left",width:"25%"},{title:"Ghi ch\xfa",dataIndex:"GhiChu",align:"left",width:"35%"},{title:"\u0110ang s\u1eed d\u1ee5ng",align:"center",width:"10%",render:(e,a)=>(e=>(0,f.jsx)(A.A,{checked:e.TrangThai}))(a)},{title:"Thao t\xe1c",width:"10%",align:"center",render:(e,a)=>G(a)}];return(0,f.jsxs)(l.A,{children:[(0,f.jsxs)(D.A,{children:[(0,f.jsx)(d.A,{children:"Danh M\u1ee5c Lo\u1ea1i K\u1ebft Qu\u1ea3"}),(0,f.jsx)(h.A,{children:F&&F.add?(0,f.jsxs)(y.$n,{type:"primary",onClick:()=>{L("add"),c({}),K(),j(!0)},children:[(0,f.jsx)(Q.A,{}),"Th\xeam M\u1edbi"]}):""})]}),(0,f.jsxs)(u.A,{children:[(0,f.jsxs)(g.A,{children:[(0,f.jsxs)(y.l6,{style:{width:"200px"},defaultValue:a.Status?"true"===a.Status?"\u0110ang s\u1eed d\u1ee5ng":"Kh\xf4ng s\u1eed d\u1ee5ng":void 0,placeholder:"Ch\u1ecdn tr\u1ea1ng th\xe1i",allowClear:!0,onChange:e=>q(e,"Status"),children:[(0,f.jsx)(Option,{value:!0,children:"\u0110ang s\u1eed d\u1ee5ng"}),(0,f.jsx)(Option,{value:!1,children:"Kh\xf4ng s\u1eed d\u1ee5ng"})]}),(0,f.jsx)(y.NJ,{defaultValue:a.Keyword,placeholder:"Nh\u1eadp m\xe3 ho\u1eb7c t\xean lo\u1ea1i k\u1ebft qu\u1ea3",style:{width:300},onSearch:e=>q(e,"Keyword"),allowClear:!0})]}),(0,f.jsx)(x.Ay,{columns:Y,dataSource:O,onChange:(e,n,i)=>{let r=a,o={pagination:e,filters:n,sorter:i},s=(0,p.D5)(r,null,o);t(s),N([])},pagination:{showSizeChanger:!0,showTotal:(e,a)=>"T\u1eeb ".concat(a[0]," \u0111\u1ebfn ").concat(a[1]," tr\xean ").concat(e," k\u1ebft qu\u1ea3"),total:U,current:R,pageSize:V},rowKey:e=>e.LoaiKetQuaID})]}),(0,f.jsx)(v,{visible:b,dataEdit:o,action:S,loading:P,onCreate:t=>{E(!0),"add"===S&&k.A.ThemLoaiKetQua(t).then((t=>{E(!1),t.data.Status>0?(i.Ay.destroy(),i.Ay.success(t.data.Message),z(),e.getList(a)):(E(!1),i.Ay.destroy(),i.Ay.error(t.data.Message))})).catch((e=>{E(!1),i.Ay.destroy(),i.Ay.error(e.toString())})),"edit"===S&&k.A.CapNhatLoaiKetQua(t).then((t=>{t.data.Status>0?(E(!1),i.Ay.destroy(),i.Ay.success(t.data.Message),z(),e.getList(a)):(E(!1),i.Ay.destroy(),i.Ay.error(t.data.Message))})).catch((e=>{E(!1),i.Ay.destroy(),i.Ay.error(e.toString())}))},onCancel:z,DanhSachLoaiKetQua:O},C)]})}))}}]);