"use strict";(self.webpackChunkkkts=self.webpackChunkkkts||[]).push([[9530],{74405:(e,t,a)=>{a.d(t,{$:()=>l,A:()=>o});var n,c=a(26418),r=a(57528),i=a(22953),s=a(6535);const h=(e=>(0,i.Ay)(e)(n||(n=(0,r.A)(["\n  &.ant-checkbox-wrapper {\n    font-size: 13px;\n    color: ",";\n\n    .ant-checkbox {\n      top: inherit;\n    }\n\n    .ant-checkbox-checked .ant-checkbox-inner,\n    .ant-checkbox-indeterminate .ant-checkbox-inner {\n      background-color: ",";\n      border-color: ",";\n    }\n\n    .ant-checkbox:hover .ant-checkbox-inner,\n    .ant-checkbox-input:focus + .ant-checkbox-inner {\n      border-color: ",";\n    }\n\n    &:hover {\n      .ant-checkbox-inner {\n        border-color: ",";\n      }\n    }\n  }\n"])),(0,s.palette)("text",1),(0,s.palette)("primary",0),(0,s.palette)("primary",0),(0,s.palette)("primary",0),(0,s.palette)("primary",0)))(c.A),l=c.A.Group,o=h},2637:(e,t,a)=>{a.d(t,{A:()=>h});a(82483);var n,c=a(57528),r=a(22953);a(6535);const i=r.Ay.div(n||(n=(0,c.A)(["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  flex-wrap: wrap;\n  padding: 10px 0;\n  gap: 10px;\n  width: 100%;\n"])));var s=a(56723);const h=e=>(0,s.jsx)(i,{className:"wrapper-top",children:e.children})},67466:(e,t,a)=>{a.d(t,{D:()=>c});var n=a(82483);function c(e){const[t,a]=(0,n.useState)(0);return[t,()=>{a(t+1)}]}},69530:(e,t,a)=>{a.r(t),a.d(t,{default:()=>N});var n=a(72741),c=a(93445),r=a(256),i=a(16950),s=a(82483),h=a(82402),l=a(53660),o=a(34045),d=a(81538),u=a(64684),g=a(67353),x=a(53615),y=a(65828),A=a(74405),p=a(18570),C=a(67466),m=a(92378),T=a(50865),b=(a(94690),a(33713)),j=a(79948),v=a(24028),S=a(56723);const{Item:k,useForm:f}=j.A,V=e=>{const[t]=f(),[a,n]=(0,s.useState)(!0),{dataEdit:c,loading:r,visible:i,action:h}=e,[l,o]=(0,s.useState)();(0,s.useEffect)((()=>{c&&c.ChucVuID&&t&&t.setFieldsValue({...c})}),[]);return(0,S.jsx)(y.aF,{title:"".concat("edit"===h?"S\u1eeda":"Th\xeam"," th\xf4ng tin ch\u1ee9c v\u1ee5"),width:450,visible:i,onCancel:e.onCancel,footer:[(0,S.jsx)(y.$n,{onClick:e.onCancel,children:"H\u1ee7y"},"back"),(0,S.jsx)(y.$n,{htmlType:"submit",type:"primary",form:"formmonhoc",loading:r,onClick:async a=>{a.preventDefault();const n=await t.validateFields();"edit"===h&&e.onCreate({...n,TrangThai:l||n.TrangThai}),"add"===h&&e.onCreate({...n,TrangThai:void 0===l||l})},disabled:a,children:"L\u01b0u"},"submit")],children:(0,S.jsxs)(j.A,{form:t,name:"formmonhoc",onChange:async(e,a)=>{const r=await t.getFieldsValue(),{MaChucVu:i,TenChucVu:s,TrangThai:h,GhiChu:l}=r;i&&s&&(i!==c.MaChucVu||s!==c.TenChucVu||h!==c.TrangThai||l!==c.GhiChu)?n(!1):n(!0)},children:["edit"===h?(0,S.jsx)(k,{name:"ChucVuID",hidden:!0}):"",(0,S.jsx)(k,{label:"M\xe3 ch\u1ee9c v\u1ee5",name:"MaChucVu",...b.ITEM_LAYOUT,rules:[b.REQUIRED],children:(0,S.jsx)(y.mS,{})}),(0,S.jsx)(k,{label:"T\xean ch\u1ee9c v\u1ee5",name:"TenChucVu",...b.ITEM_LAYOUT,rules:[b.REQUIRED],children:(0,S.jsx)(y.pd,{})}),(0,S.jsx)(k,{label:"Ghi ch\xfa",name:"GhiChu",...b.ITEM_LAYOUT,children:(0,S.jsx)(v.A,{})}),(0,S.jsx)(k,{label:"\u0110ang s\u1eed d\u1ee5ng",name:"TrangThai",...b.ITEM_LAYOUT,children:(0,S.jsxs)(y.sx.Group,{onChange:e=>{o(e.target.value)},value:l,defaultValue:!0,children:[(0,S.jsx)(y.sx,{value:!0,children:"C\xf3"}),(0,S.jsx)(y.sx,{value:!1,children:"Kh\xf4ng"})]})})]})})};var w=a(21428),M=a(38674),D=a(2782),I=a(2637);const N=(0,h.Ng)((function(e){return{...e.DanhMucChucVu,role:(0,p.vh)(e.Auth.role,"danh-muc-chuc-vu")}}),i.A)((e=>{document.title="Danh M\u1ee5c Ch\u1ee9c V\u1ee5";const[t,a]=(0,s.useState)(m.parse(e.location.search)),[i,h]=(0,s.useState)({}),[b,j]=(0,s.useState)(!1),[v,k]=(0,s.useState)(""),[f,N]=(0,C.D)(),[P,E]=(0,s.useState)([]),[L,z]=(0,s.useState)(!1);(0,s.useEffect)((()=>{(0,p._Y)(t),e.getList(t)}),[t]),(0,s.useEffect)((()=>{e.getList(t)}),[]);const G=(e,n)=>{let c=t,r={value:e,property:n},i=(0,p.D5)(c,r,null);a(i),E([])},K=()=>{E([]),h({}),j(!1)},O=i=>(0,S.jsxs)("div",{className:"action-btn",children:[null!==R&&void 0!==R&&R.edit?(0,S.jsx)(r.A,{title:"S\u1eeda",children:(0,S.jsx)(w.A,{onClick:()=>(e=>{const t=e;k("edit"),T.A.ChiTietChucVu({ChucVuID:t}).then((e=>{e.data.Status>0?(h(e.data.Data),N(),j(!0)):(c.Ay.destroy(),c.Ay.error(e.data.Message))})).catch((e=>{c.Ay.destroy(),c.Ay.error(e.toString())}))})(i.ChucVuID)})}):"",null!==R&&void 0!==R&&R.delete?(0,S.jsx)(r.A,{title:"X\xf3a",children:(0,S.jsx)(M.A,{onClick:()=>{return r=i.ChucVuID,void n.A.confirm({title:"X\xf3a D\u1eef Li\u1ec7u",content:"B\u1ea1n c\xf3 mu\u1ed1n x\xf3a ch\u1ee9c v\u1ee5 n\xe0y kh\xf4ng?",cancelText:"Kh\xf4ng",okText:"C\xf3",onOk:()=>{z(!0),T.A.XoaChucVu(r).then((n=>{n.data.Status>0?(z(!1),e.getList({...t,PageNumber:Math.ceil((F-1)/t.PageSize)<t.PageNumber?Math.ceil((F-1)/t.PageSize):t.PageNumber}),c.Ay.destroy(),c.Ay.success(n.data.Message),a({...t,PageNumber:Math.ceil((F-1)/t.PageSize)<t.PageNumber?Math.ceil((F-1)/t.PageSize):t.PageNumber})):(c.Ay.destroy(),c.Ay.error(n.data.Message))})).catch((e=>{c.Ay.destroy(),c.Ay.error(e.toString())}))}});var r}})}):""]}),{DanhSachChucVu:U,TotalRow:F,role:R}=e,Y=t.PageNumber?parseInt(t.PageNumber):1,_=t.PageSize?parseInt(t.PageSize):(0,p.WT)(),$=[{title:"STT",width:"5%",align:"center",render:(e,t,a)=>(0,S.jsx)("span",{children:(Y-1)*_+(a+1)})},{title:"M\xe3 ch\u1ee9c v\u1ee5",dataIndex:"MaChucVu",align:"left",width:"15%"},{title:"T\xean ch\u1ee9c v\u1ee5",dataIndex:"TenChucVu",align:"left",width:"25%"},{title:"Ghi ch\xfa",dataIndex:"GhiChu",align:"left",width:"35%"},{title:"\u0110ang s\u1eed d\u1ee5ng",align:"center",width:"10%",render:(e,t)=>(e=>(0,S.jsx)(A.A,{checked:e.TrangThai}))(t)},{title:"Thao t\xe1c",width:"10%",align:"center",render:(e,t)=>O(t)}];return(0,S.jsxs)(l.A,{children:[(0,S.jsxs)(I.A,{children:[(0,S.jsx)(o.A,{children:"Danh M\u1ee5c Ch\u1ee9c V\u1ee5"}),(0,S.jsx)(d.A,{children:R&&R.add?(0,S.jsxs)(y.$n,{type:"primary",onClick:()=>{k("add"),h({}),N(),j(!0)},children:[(0,S.jsx)(D.A,{}),"Th\xeam m\u1edbi"]}):""})]}),(0,S.jsxs)(u.A,{children:[(0,S.jsxs)(g.A,{children:[(0,S.jsxs)(y.l6,{style:{width:"200px"},defaultValue:t.Status?"true"===t.Status?"\u0110ang s\u1eed d\u1ee5ng":"Kh\xf4ng s\u1eed d\u1ee5ng":void 0,placeholder:"Ch\u1ecdn tr\u1ea1ng th\xe1i",allowClear:!0,onChange:e=>G(e,"Status"),children:[(0,S.jsx)(Option,{value:!0,children:"\u0110ang s\u1eed d\u1ee5ng"}),(0,S.jsx)(Option,{value:!1,children:"Kh\xf4ng s\u1eed d\u1ee5ng"})]}),(0,S.jsx)(y.NJ,{defaultValue:t.Keyword,placeholder:"Nh\u1eadp m\xe3 ho\u1eb7c t\xean ch\u1ee9c v\u1ee5",style:{width:300},onSearch:e=>G(e,"Keyword"),allowClear:!0})]}),(0,S.jsx)(x.Ay,{columns:$,dataSource:U,onChange:(e,n,c)=>{let r=t,i={pagination:e,filters:n,sorter:c},s=(0,p.D5)(r,null,i);a(s),E([])},pagination:{showSizeChanger:!0,showTotal:(e,t)=>"T\u1eeb ".concat(t[0]," \u0111\u1ebfn ").concat(t[1]," tr\xean ").concat(e," k\u1ebft qu\u1ea3"),total:F,current:Y,pageSize:_},rowKey:e=>e.ChucVuID})]}),(0,S.jsx)(V,{visible:b,dataEdit:i,action:v,loading:L,onCreate:a=>{z(!0),"add"===v&&T.A.ThemChucVu(a).then((a=>{z(!1),a.data.Status>0?(c.Ay.destroy(),c.Ay.success(a.data.Message),K(),e.getList(t)):(z(!1),c.Ay.destroy(),c.Ay.error(a.data.Message))})).catch((e=>{z(!1),c.Ay.destroy(),c.Ay.error(e.toString())})),"edit"===v&&T.A.CapNhatChucVu(a).then((a=>{a.data.Status>0?(z(!1),c.Ay.destroy(),c.Ay.success(a.data.Message),K(),e.getList(t)):(z(!1),c.Ay.destroy(),c.Ay.error(a.data.Message))})).catch((e=>{z(!1),c.Ay.destroy(),c.Ay.error(e.toString())}))},onCancel:K,DanhSachChucVu:U},f)]})}))}}]);