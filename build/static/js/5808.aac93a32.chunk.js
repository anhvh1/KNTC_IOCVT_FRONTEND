"use strict";(self.webpackChunkkkts=self.webpackChunkkkts||[]).push([[5808],{73858:(e,n,a)=>{a.d(n,{E:()=>i});var t=a(8118),r=a.n(t);const i=(e,n)=>r()({method:"POST",url:e,data:n,headers:{"Content-Type":"multipart/form-data",Authorization:"Bearer ".concat(localStorage.getItem("access_token"))}}).catch((e=>{const{status:n,statusText:a}=e.response;return{Status:0,Message:n||a?"".concat(n," - ").concat(a):"\u0110\xe3 c\xf3 l\u1ed7i x\u1ea3y ra"}}))},74405:(e,n,a)=>{a.d(n,{$:()=>o,A:()=>c});var t,r=a(26418),i=a(57528),l=a(22953),s=a(6535);const u=(e=>(0,l.Ay)(e)(t||(t=(0,i.A)(["\n  &.ant-checkbox-wrapper {\n    font-size: 13px;\n    color: ",";\n\n    .ant-checkbox {\n      top: inherit;\n    }\n\n    .ant-checkbox-checked .ant-checkbox-inner,\n    .ant-checkbox-indeterminate .ant-checkbox-inner {\n      background-color: ",";\n      border-color: ",";\n    }\n\n    .ant-checkbox:hover .ant-checkbox-inner,\n    .ant-checkbox-input:focus + .ant-checkbox-inner {\n      border-color: ",";\n    }\n\n    &:hover {\n      .ant-checkbox-inner {\n        border-color: ",";\n      }\n    }\n  }\n"])),(0,s.palette)("text",1),(0,s.palette)("primary",0),(0,s.palette)("primary",0),(0,s.palette)("primary",0),(0,s.palette)("primary",0)))(r.A),o=r.A.Group,c=u},2637:(e,n,a)=>{a.d(n,{A:()=>u});a(82483);var t,r=a(57528),i=a(22953);a(6535);const l=i.Ay.div(t||(t=(0,r.A)(["\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  flex-wrap: wrap;\n  padding: 10px 0;\n  gap: 10px;\n  width: 100%;\n"])));var s=a(56723);const u=e=>(0,s.jsx)(l,{className:"wrapper-top",children:e.children})},67466:(e,n,a)=>{a.d(n,{D:()=>r});var t=a(82483);function r(e){const[n,a]=(0,t.useState)(0);return[n,()=>{a(n+1)}]}},35184:(e,n,a)=>{a.r(n),a.d(n,{default:()=>j});var t=a(93445),r=a(96454),i=a(82483),l=a(82402),s=a(53660),u=a(34045),o=(a(81538),a(64684)),c=a(67353),h=(a(53615),a(65828)),d=(a(74405),a(54686),a(5103),a(33713)),y=(a(94690),a(79948)),p=a(91012),C=a(18570),v=(a(30180),a(56723));const{Item:g,useForm:D}=y.A,x=e=>{const[n]=D(),{dataEdit:a,loading:r,visible:l,action:s}=e,[u,o]=(0,i.useState)([]),[c,x]=(0,i.useState)(!1);(0,i.useEffect)((()=>{a&&a.QuyTrinhID&&n&&n.setFieldsValue({...a}),a&&a.FileDinhKem&&o([a.FileDinhKem])}),[]);const Q=(e,n,a)=>{const t=new FileReader;t.addEventListener("load",(()=>n(t.result,e,a))),t.readAsDataURL(e)},A=(e,n,a)=>{const t=[...a];o(t),x(!0)};return(0,v.jsx)(h.aF,{title:"C\u1eadp nh\u1eadt quy tr\xecnh",width:600,visible:l,onCancel:e.onCancel,footer:[(0,v.jsx)(h.$n,{onClick:e.onCancel,children:"H\u1ee7y"},"back"),(0,v.jsx)(h.$n,{type:"primary",loading:r,onClick:async a=>{a.preventDefault();const r=await n.validateFields();r.File=u[0],u[0]?e.onCreate(r):(t.Ay.destroy(),t.Ay.warning("Vui l\xf2ng \u0111\xednh k\xe8m file t\xe0i li\u1ec7u "))},children:"L\u01b0u"})],children:(0,v.jsxs)(y.A,{form:n,children:[(0,v.jsx)(g,{name:"QuyTrinhID",hidden:!0}),(0,v.jsx)(g,{label:"T\xean quy t\xecnh",name:"TenQuyTrinh",...d.ITEM_LAYOUT,rules:[d.REQUIRED],children:(0,v.jsx)(h.pd,{})}),(0,v.jsxs)("div",{className:"wrapper-file",style:{display:"flex",gap:10,alignItems:"center"},children:[(0,v.jsx)(p.A,{showUploadList:!1,beforeUpload:(e,n)=>((e,n,a)=>{var r;const i=null===(r=(0,C.VD)("data_config"))||void 0===r?void 0:r.fileLimit,l=e.size/1024/1024<i,s=[];return a.forEach((e=>{u.filter((n=>n.TenFileGoc===e.name)).length&&s.push(e)})),l?Q(e,n,a):t.Ay.error("File \u0111\xednh k\xe8m ph\u1ea3i nh\u1ecf h\u01a1n ".concat(i,"MB")),!1})(e,A,n),disabled:r,children:(0,v.jsx)(h.$n,{type:"primary",loading:r,className:"btn-upload",children:"Ch\u1ecdn file t\xe0i li\u1ec7u t\u1eeb m\xe1y t\xednh"})}),u?u.map((e=>(0,v.jsx)("a",{href:null===e||void 0===e?void 0:e.FileUrl,target:"_blank",children:(0,v.jsx)("p",{children:e.name||e.TenFile})}))):null]})]})})};var Q=a(67466),A=a(73858),m=a(51751),I=a(84684);const f={getallcap:I.Ay.v2Url+"QuanLyQuyTrinhNghiepVu/GetAllCap",getcoquanbycap:I.Ay.v2Url+"QuanLyQuyTrinhNghiepVu/GetCoQuanByCap",getquytrinhbycap:I.Ay.v2Url+"QuanLyQuyTrinhNghiepVu/GetQuyTrinhByCap",luuquytrinh:I.Ay.v2Url+"QuanLyQuyTrinhNghiepVu/Save"},T={GetAllCap:e=>(0,m.vk)(f.getallcap,{...e}),GetCoQuanByCap:e=>(0,m.vk)(f.getcoquanbycap,{...e}),GetQuyTrinhByCap:e=>(0,m.vk)(f.getquytrinhbycap,{...e}),SaveQuyTrinh:e=>(0,m.zO)(f.luuquytrinh,{...e})};var b=a(92378),k=a(2637);const j=(0,l.Ng)((function(e){return{role:(0,C.vh)(e.Auth.role,"quy-trinh-he-thong")}}),r.A)((e=>{document.title="Quy tr\xecnh h\u1ec7 th\u1ed1ng";const[n,a]=(0,i.useState)(b.parse(e.location.search)),[r,l]=(0,i.useState)([]),[d,y]=(0,i.useState)([]),[p,g]=(0,i.useState)([]),[D,m]=(0,i.useState)({}),[I,j]=(0,i.useState)([]),[S,w]=(0,i.useState)(!1),[F,G]=(0,Q.D)(),[U,q]=(0,i.useState)(0);(0,i.useEffect)((()=>{(0,C._Y)(n)}),[n]);const E=(e,t)=>{let r=n,i={value:e,property:t},l=(0,C.D5)(r,i,null);a(l)};(0,i.useEffect)((()=>{T.GetAllCap().then((e=>{e.data.Status>0&&l(e.data.Data)})),n.CapID&&N(n.CapID),n.CoQuanID&&B(n.CoQuanID),n.QuyTrinhID&&n.CoQuanID&&T.GetQuyTrinhByCap({CapID:n.CoQuanID}).then((e=>{if(e.data.Status>0){if(e.data.Data){const a=e.data.Data.find((e=>e.QuyTrinhID===Number(n.QuyTrinhID)));m(a),q((e=>e+1))}}else t.Ay.destroy(),t.Ay.warning(e.data.Message)}))}),[]);const N=e=>{T.GetCoQuanByCap({CapID:e}).then((e=>{e.data.Status>0?y(e.data.Data):(t.Ay.destroy(),t.Ay.warning(e.data.Message))}))},B=e=>{T.GetQuyTrinhByCap({CapID:e}).then((e=>{e.data.Status>0?g(e.data.Data):(t.Ay.destroy(),t.Ay.warning(e.data.Message))}))},L=()=>{w(!1)},{role:M}=e;return(0,v.jsxs)(s.A,{children:[(0,v.jsx)(k.A,{children:(0,v.jsx)(u.A,{children:"Quy tr\xecnh h\u1ec7 th\u1ed1ng"})}),(0,v.jsxs)(o.A,{children:[(0,v.jsxs)(c.A,{children:[(0,v.jsx)(h.l6,{style:{width:300},placeholder:"Ch\u1ecdn c\u1ea5p",value:n.CapID,onChange:e=>{E(e,"CapID"),E(null,"CoQuanID"),E(null,"QuyTrinhID"),e?N(e):(m({}),g([]),y([]))},children:r?r.map((e=>{var n;return(0,v.jsx)(h.c$,{value:null===(n=e.CapID)||void 0===n?void 0:n.toString(),children:e.TenCap})})):null}),(0,v.jsx)(h.l6,{style:{width:300},placeholder:"Ch\u1ecdn c\u01a1 quan",value:n.CoQuanID,onChange:e=>{E(e,"CoQuanID"),E(null,"QuyTrinhID"),B(e),m({})},children:d?d.map((e=>{var n;return(0,v.jsx)(h.c$,{value:null===(n=e.CapID)||void 0===n?void 0:n.toString(),children:e.TenCap})})):null}),(0,v.jsxs)(h.l6,{style:{width:350},placeholder:"Ch\u1ecdn quy tr\xecnh",value:n.QuyTrinhID,onChange:e=>{E(e,"QuyTrinhID");const n=p.find((n=>n.QuyTrinhID===Number(e)));m(n),q((e=>e+1))},children:[" ",p?p.map((e=>{var n;return(0,v.jsx)(h.c$,{value:null===(n=e.QuyTrinhID)||void 0===n?void 0:n.toString(),children:e.TenQuyTrinh})})):null]}),null!==D&&void 0!==D&&D.ImgUrl&&null!==M&&void 0!==M&&M.edit?(0,v.jsx)(h.$n,{type:"primary",onClick:()=>{w(!0),G()},children:"S\u1eeda"}):null]}),(0,v.jsx)("div",{style:{width:"100%",height:"100%"},children:null!==D&&void 0!==D&&D.ImgUrl?(0,v.jsx)("iframe",{style:{width:"100%",height:"100%"},src:null===D||void 0===D?void 0:D.ImgUrl}):null},U)]}),(0,v.jsx)(x,{visible:S,onCancel:L,dataEdit:D,onCreate:e=>{const a=new FormData;e.File.FileID||a.append("files",e.File),delete e.File,e.CapID=n.CoQuanID,a.append("QuyTrinhStr",JSON.stringify(e)),(0,A.E)(f.luuquytrinh,a).then((a=>{a.data.Status>0?(T.GetQuyTrinhByCap({CapID:n.CoQuanID}).then((n=>{if(n.data.Status>0){g(n.data.Data);const a=n.data.Data.find((n=>n.QuyTrinhID===e.QuyTrinhID));m(a),q((e=>e+1))}else t.Ay.destroy(),t.Ay.warning(n.data.Message)})),t.Ay.destroy(),t.Ay.success(a.data.Message),L()):(t.Ay.destroy(),t.Ay.error(a.data.Message))})).catch((e=>{t.Ay.destroy()}))}},F)]})}))}}]);