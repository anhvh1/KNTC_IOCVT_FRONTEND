"use strict";(self.webpackChunkkkts=self.webpackChunkkkts||[]).push([[9827],{89827:(n,e,i)=>{i.d(e,{A:()=>A});var l,a=i(82483),t=i(79948),s=i(26418),r=i(63419),h=i(88701),c=i(27957),d=i(256),o=i(23511),u=i(9716),x=i(65828),p=i(2370),m=i(69973),g=i(18570),j=i(57528);const y=i(22953).Ay.div(l||(l=(0,j.A)(["\n  overflow: hidden;\n  .ant-tabs-tab + .ant-tabs-tab {\n    margin: 0 !important;\n  }\n  .line-break {\n    background: #bdbdbd;\n    width: 100%;\n    height: 1px;\n    /* position: absolute; */\n    left: 0;\n    margin-top: 10px;\n  }\n  .group-info {\n    display: grid;\n    grid-template-columns: calc(50% - 5px) calc(50% - 5px);\n    gap: 5px;\n  }\n  .summary-content {\n    margin-top: 5px;\n  }\n  .wrapper-content {\n    display: grid;\n    grid-template-columns: calc(50% - 5px) calc(50% - 5px);\n    gap: 10px;\n    /* justify-content: space-around; */\n    @media only screen and (max-width: 600px) {\n      grid-template-columns: auto;\n    }\n  }\n  .wrapper-content__group {\n    display: grid;\n    grid-template-columns: calc(33% - 5px) calc(33% - 5px) calc(33% - 5px);\n    gap: 10px;\n    @media only screen and (max-width: 991px) {\n      grid-template-columns: auto auto;\n    }\n    @media only screen and (max-width: 600px) {\n      grid-template-columns: auto;\n    }\n  }\n  .ant-tabs-tab {\n    /* height: 30px; */\n    width: 200px;\n    justify-content: center;\n    align-items: center;\n  }\n\n  .title {\n    margin-top: 10px;\n    font-weight: 600;\n  }\n\n  .ant-tabs-tab-active {\n    background: #0b57d0 !important;\n    padding: 0;\n    display: flex;\n    & > div {\n      color: #fff !important;\n    }\n  }\n  .ant-form-title__left {\n    margin-bottom: 0;\n    .ant-form-item-row {\n      display: grid !important;\n    }\n    .ant-form-item-label {\n      text-align: left;\n    }\n    .ant-form-item-row {\n      width: 100%;\n    }\n    .ant-form-item-control-input-content {\n      width: 100%;\n      /* width: 450px; */\n      input {\n        height: 30px;\n      }\n    }\n  }\n  .tile-content {\n    font-weight: 600;\n    margin-bottom: 10px;\n  }\n  .item-info + .item-info {\n    margin-top: 10px;\n  }\n  .item-info {\n    span {\n      font-weight: 600;\n    }\n  }\n  .box-file {\n    table {\n      border-collapse: collapse;\n    }\n    table th,\n    table td {\n      border: 1px solid #d7d7d7;\n    }\n  }\n  .file-item {\n    padding: 5px;\n  }\n  .file {\n    display: flex;\n    justify-content: space-between;\n    align-items: center;\n    margin-top: 10px;\n    p {\n      font-weight: 600;\n    }\n  }\n\n  .ant-form-title__left {\n    margin-bottom: 0;\n    .ant-form-item-row {\n      display: grid !important;\n    }\n    .ant-form-item-label {\n      text-align: left;\n    }\n    .ant-form-item-row {\n      width: 100%;\n    }\n    .ant-form-item-control-input-content {\n      width: 100%;\n      /* width: 450px; */\n      input {\n        height: 30px;\n      }\n    }\n  }\n\n  .group-title {\n    margin-top: 10px;\n    display: flex;\n    align-items: center;\n    justify-content: space-between;\n    .title-content__breadCum {\n      font-size: 14px;\n      font-weight: 600;\n    }\n    button {\n      width: 80px !important;\n      height: 25px !important;\n    }\n  }\n  .wrapper-user {\n    margin-top: 10px;\n    .title {\n      display: grid;\n      grid-template-columns: 45.5% auto;\n      /* justify-content: space-between; */\n      p {\n        font-size: 13px;\n      }\n    }\n  }\n  .groups-user {\n    display: flex;\n    flex-direction: column;\n    gap: 10px;\n    .wrapper-select {\n      display: grid;\n      grid-template-columns: 450px 450px auto;\n      gap: 30px;\n      align-items: center;\n    }\n  }\n  .btn-delete {\n    justify-self: end;\n    justify-items: end;\n    button {\n      width: 80px;\n      height: 25px;\n    }\n  }\n\n  .file-wrapper {\n    margin-top: 30px;\n    .file-wrapper__top {\n      display: flex;\n      justify-content: space-between;\n      align-items: center;\n      p {\n        font-size: 13px;\n        font-weight: bold;\n      }\n    }\n    .file-wrapper__content {\n      table {\n        margin-top: 10px;\n        width: 100%;\n        border-collapse: collapse;\n        thead th {\n          border: 1px solid #797979;\n        }\n        tbody td {\n          border: 1px solid #797979;\n        }\n      }\n    }\n  }\n  .info-wrapper {\n    margin-top: 30px;\n  }\n  .user-report {\n    margin-top: 30px;\n  }\n  .ant-picker {\n    height: 30px;\n    width: 100%;\n  }\n"])));var f=i(33713),T=(i(94690),i(93474)),v=i(87734),b=i(21428),N=i(38674),D=i(54686),C=i.n(D),S=i(6374),w=i(56723);const{Item:_}=t.A,A=n=>{var e;const[i,l,j,D,A,k,L,Q,F]=(0,S.U)(),[K,H]=(0,a.useState)(1),[q,B]=(0,a.useState)([]),Y=(0,a.useRef)(),{dataEdit:I,visible:V,onCancel:E,DanhSachCoQuan:X,ItemLoaiKhieuTo:M,loading:G}=n;(0,a.useEffect)((()=>{var e,i,l;const{dataEdit:a,DanhSachCoQuan:t}=n,s=null===(e=(0,g.b5)("user"))||void 0===e?void 0:e.CapID,r=null===(i=(0,g.b5)("user"))||void 0===i?void 0:i.CoQuanID,h=null===(l=(0,g.b5)("user"))||void 0===l?void 0:l.BanTiepDan;if(a&&a.DanhSachHoSoTaiLieu&&F({DanhSachHoSoTaiLieu:a.DanhSachHoSoTaiLieu?a.DanhSachHoSoTaiLieu:[]}),a){const n=[];(a.SoTienThuHoi||null!==a&&void 0!==a&&a.SoDatThuHoi)&&n.push(1),(a.SoToChuc||null!==a&&void 0!==a&&a.SoTienToChucTraLai||null!==a&&void 0!==a&&a.SoCaNhan||null!==a&&void 0!==a&&a.SoTienCaNhanTraLai||null!==a&&void 0!==a&&a.SoDatCaNhanTraLai||null!==a&&void 0!==a&&a.SoDatToChucTraLai)&&n.push(2),(a.SoNguoiBiKienNghiXuLy||null!==a&&void 0!==a&&a.SoCanBoBiXuLy)&&n.push(3),(a.SoNguoiChuyenCoQuanDieuTra||null!==a&&void 0!==a&&a.SoCanBoChuyenCoQuanDieuTra)&&n.push(4),B(n)}if(Y.current){const n={...a,NgayQuyetDinh:null!==a&&void 0!==a&&a.NgayQuyetDinh?C()(a.NgayQuyetDinh):null,ThoiHanThiHanh:null!==a&&void 0!==a&&a.ThoiHanThiHanh?C()(a.ThoiHanThiHanh):null};if(2!==s&&4!==s||!h)Y.current.setFieldsValue({CoQuanBanHanh:r,...n});else{var c;const e=null===(c=t.find((n=>n.CoQuanID===r)))||void 0===c?void 0:c.CoQuanChaID;e&&Y.current.setFieldsValue({CoQuanBanHanh:e,...n})}}}),[]);const R=(n,e)=>{const i=[...q];if(n.target.checked)i.push(e);else{const n=i.indexOf(e);i.splice(n,1)}B(i)},P=n=>{if(q)return q.find((e=>e===n))},U=e=>{var i;const l=null===n||void 0===n||null===(i=n.dataEdit)||void 0===i?void 0:i.isViewDetails,{dataEdit:a}=n;return 1==e?l?(0,w.jsx)(w.Fragment,{children:(0,w.jsxs)("div",{className:"wrapper-content",children:[(0,w.jsxs)("p",{children:["S\u1ed1 ti\u1ec1n: ",(0,g.yV)(a.SoTienThuHoi)," (\u0111\u1ed3ng)"]}),(0,w.jsxs)("p",{children:["S\u1ed1 \u0111\u1ea5t: ",(0,g.yV)(a.SoDatThuHoi)," (m2)"]})]})}):(0,w.jsxs)("div",{className:"wrapper-checked",children:[(0,w.jsxs)(s.A,{onChange:n=>R(n,1),checked:P(1),children:["C\u1eadp nh\u1eadt n\u1ed9i dung"," ",(0,w.jsx)("span",{style:{fontWeight:600},children:'"Ki\u1ebfn ngh\u1ecb thu h\u1ed3i cho nh\xe0 n\u01b0\u1edbc"'})]}),(0,w.jsx)("div",{className:"line-break",style:{marginLeft:"-22px",width:"115%"}}),q.includes(1)?(0,w.jsxs)(r.A,{gutter:[10,10],children:[(0,w.jsx)(h.A,{md:12,span:24,children:(0,w.jsx)(_,{label:(0,w.jsxs)("p",{children:["S\u1ed1 ti\u1ec1n ",(0,w.jsx)("span",{style:{color:"red"},children:"(Ngh\xecn \u0111\u1ed3ng)"})]}),className:"ant-form-title__left",name:"SoTienThuHoi",children:(0,w.jsx)(x.TD,{})})}),(0,w.jsx)(h.A,{md:12,span:24,children:(0,w.jsx)(_,{label:(0,w.jsxs)("p",{children:["S\u1ed1 \u0111\u1ea5t ",(0,w.jsx)("span",{style:{color:"red"},children:"(m2)"})]}),className:"ant-form-title__left",name:"SoDatThuHoi",children:(0,w.jsx)(x.TD,{})})})]}):null]}):2===e?l?(0,w.jsx)(w.Fragment,{children:(0,w.jsxs)("div",{className:"wrapper-content__group",children:[(0,w.jsxs)("p",{children:["S\u1ed1 t\u1ed5 ch\u1ee9c \u0111\u01b0\u1ee3c tr\u1ea3 l\u1ea1i quy\u1ec1n l\u1ee3i:"," ",(0,g.yV)(a.SoToChuc)," "]}),(0,w.jsxs)("p",{children:["S\u1ed1 ti\u1ec1n: ",(0,g.yV)(a.SoTienToChucTraLai)," (\u0111\u1ed3ng)"]}),(0,w.jsxs)("p",{children:["S\u1ed1 \u0111\u1ea5t: ",(0,g.yV)(a.SoDatToChucTraLai)," (m2)"]}),(0,w.jsxs)("p",{children:["S\u1ed1 c\xe1 nh\xe2n \u0111\u01b0\u1ee3c tr\u1ea3 quy\u1ec1n l\u1ee3i:"," ",(0,g.yV)(a.SoCaNhan)," "]}),(0,w.jsxs)("p",{children:["S\u1ed1 ti\u1ec1n: ",(0,g.yV)(a.SoTienCaNhanTraLai)," (\u0111\u1ed3ng)"]}),(0,w.jsxs)("p",{children:["S\u1ed1 \u0111\u1ea5t: ",(0,g.yV)(a.SoDatCaNhanTraLai)," (m2)"]})]})}):(0,w.jsxs)(w.Fragment,{children:[(0,w.jsxs)(s.A,{onChange:n=>R(n,2),checked:P(2),children:["C\u1eadp nh\u1eadt n\u1ed9i dung"," ",(0,w.jsx)("span",{style:{fontWeight:600},children:'"Tr\u1ea3 l\u1ea1i cho t\u1ed5 ch\u1ee9c, c\xe1 nh\xe2n"'})]}),(0,w.jsx)("div",{className:"line-break",style:{marginLeft:"-22px",width:"115%"}}),q.includes(2)?(0,w.jsxs)(r.A,{gutter:[10,10],children:[(0,w.jsx)(h.A,{md:8,span:24,children:(0,w.jsx)(_,{label:"S\u1ed1 t\u1ed5 ch\u1ee9c \u0111\u01b0\u1ee3c tr\u1ea3 quy\u1ec1n l\u1ee3i",className:"ant-form-title__left",name:"SoToChuc",children:(0,w.jsx)(x.TD,{})})}),(0,w.jsx)(h.A,{md:8,span:24,children:(0,w.jsx)(_,{label:(0,w.jsxs)("p",{children:["S\u1ed1 ti\u1ec1n ",(0,w.jsx)("span",{style:{color:"red"},children:"(ngh\xecn \u0111\u1ed3ng)"})]}),className:"ant-form-title__left",name:"SoTienToChucTraLai",children:(0,w.jsx)(x.TD,{})})}),(0,w.jsx)(h.A,{md:8,span:24,children:(0,w.jsx)(_,{label:(0,w.jsxs)("p",{children:["S\u1ed1 \u0111\u1ea5t ",(0,w.jsx)("span",{style:{color:"red"},children:"(m2)"})]}),className:"ant-form-title__left",name:"SoDatToChucTraLai",children:(0,w.jsx)(x.TD,{})})}),(0,w.jsx)(h.A,{md:8,span:24,children:(0,w.jsx)(_,{label:"S\u1ed1 c\xe1 nh\xe2n \u0111\u01b0\u1ee3c tr\u1ea3 quy\u1ec1n l\u1ee3i",className:"ant-form-title__left",name:"SoCaNhan",children:(0,w.jsx)(x.TD,{})})}),(0,w.jsx)(h.A,{md:8,span:24,children:(0,w.jsx)(_,{label:(0,w.jsxs)("p",{children:["S\u1ed1 ti\u1ec1n ",(0,w.jsx)("span",{style:{color:"red"},children:"(ngh\xecn \u0111\u1ed3ng)"})]}),className:"ant-form-title__left",name:"SoTienCaNhanTraLai",children:(0,w.jsx)(x.TD,{})})}),(0,w.jsx)(h.A,{md:8,span:24,children:(0,w.jsx)(_,{label:(0,w.jsxs)("p",{children:["S\u1ed1 \u0111\u1ea5t ",(0,w.jsx)("span",{style:{color:"red"},children:"(m2)"})]}),className:"ant-form-title__left",name:"SoDatCaNhanTraLai",children:(0,w.jsx)(x.TD,{})})})]}):null]}):3===e?l?(0,w.jsx)(w.Fragment,{children:(0,w.jsxs)("div",{className:"wrapper-content",children:[(0,w.jsxs)("p",{children:["T\u1ed5ng s\u1ed1 ng\u01b0\u1eddi b\u1ecb ki\u1ebfn ngh\u1ecb x\u1eed l\xfd: ",a.SoNguoiBiKienNghiXuLy," "]}),(0,w.jsxs)("p",{children:["Trong \u0111\xf3 s\u1ed1 c\xe1n b\u1ed9, c\xf4ng ch\u1ee9c, vi\xean ch\u1ee9c: ",a.SoCanBoBiXuLy," "]})]})}):(0,w.jsxs)(w.Fragment,{children:[(0,w.jsxs)(s.A,{onChange:n=>R(n,3),checked:P(3),children:["C\u1eadp nh\u1eadt n\u1ed9i dung"," ",(0,w.jsx)("span",{style:{fontWeight:600},children:'"Ki\u1ebfn ngh\u1ecb x\u1eed l\xfd h\xe0nh ch\xednh"'})]}),(0,w.jsx)("div",{className:"line-break",style:{marginLeft:"-22px",width:"115%"}}),q.includes(3)?(0,w.jsxs)(r.A,{gutter:[10,10],children:[(0,w.jsx)(h.A,{md:12,span:24,children:(0,w.jsx)(_,{label:"T\u1ed5ng s\u1ed1 ng\u01b0\u1eddi b\u1ecb ki\u1ebfn ngh\u1ecb x\u1eed l\xfd",className:"ant-form-title__left",name:"SoNguoiBiKienNghiXuLy",children:(0,w.jsx)(x.TD,{})})}),(0,w.jsx)(h.A,{md:12,span:24,children:(0,w.jsx)(_,{label:"Trong \u0111\xf3 s\u1ed1 c\xe1n b\u1ed9, c\xf4ng ch\u1ee9c, vi\xean ch\u1ee9c",className:"ant-form-title__left",name:"SoCanBoBiXuLy",children:(0,w.jsx)(x.TD,{})})})]}):null]}):4===e?l?(0,w.jsx)(w.Fragment,{children:(0,w.jsxs)("div",{className:"wrapper-content",children:[(0,w.jsxs)("p",{children:["T\u1ed5ng s\u1ed1 ng\u01b0\u1eddi: ",a.SoNguoiChuyenCoQuanDieuTra," "]}),(0,w.jsxs)("p",{children:["Trong \u0111\xf3 s\u1ed1 c\xe1n b\u1ed9, c\xf4ng ch\u1ee9c, vi\xean ch\u1ee9c:"," ",a.SoCanBoChuyenCoQuanDieuTra]})]})}):(0,w.jsxs)(w.Fragment,{children:[(0,w.jsxs)(s.A,{onChange:n=>R(n,4),checked:P(4),children:["C\u1eadp nh\u1eadt n\u1ed9i dung"," ",(0,w.jsx)("span",{style:{fontWeight:600},children:'"Chuy\u1ec3n c\u01a1 quan \u0111i\u1ec1u tra"'})]}),(0,w.jsx)("div",{className:"line-break",style:{marginLeft:"-22px",width:"115%"}}),q.includes(4)?(0,w.jsxs)(r.A,{gutter:[10,10],children:[(0,w.jsx)(h.A,{md:12,span:24,children:(0,w.jsx)(_,{label:"T\u1ed5ng s\u1ed1 ng\u01b0\u1eddi",className:"ant-form-title__left",name:"SoNguoiChuyenCoQuanDieuTra",children:(0,w.jsx)(x.TD,{})})}),(0,w.jsx)(h.A,{md:12,span:24,children:(0,w.jsx)(_,{label:"Trong \u0111\xf3 s\u1ed1 c\xe1n b\u1ed9, c\xf4ng ch\u1ee9c, vi\xean ch\u1ee9c",className:"ant-form-title__left",name:"SoCanBoChuyenCoQuanDieuTra",children:(0,w.jsx)(x.TD,{})})})]}):null]}):void 0},W=null===I||void 0===I?void 0:I.Lan2,z=null!==(e=n.dataEdit)&&void 0!==e&&e.isViewDetails?n.dataEdit.isViewDetails:null,O=[{key:"1",label:(0,w.jsx)("div",{className:"ant-tabs__title",children:"Ki\u1ebfn ngh\u1ecb thu h\u1ed3i cho nh\xe0 n\u01b0\u1edbc"}),children:(0,w.jsx)(w.Fragment,{children:U(1)})},{key:"2",label:(0,w.jsx)("div",{className:"ant-tabs__title",children:"Tr\u1ea3 l\u1ea1i cho t\u1ed5 ch\u1ee9c, c\xe1 nh\xe2n"}),children:(0,w.jsx)(w.Fragment,{children:U(2)})},{key:"3",label:(0,w.jsx)("div",{className:"ant-tabs__title",children:"Ki\u1ebfn ngh\u1ecb x\u1eed l\xfd h\xe0nh ch\xednh"}),children:(0,w.jsx)(w.Fragment,{children:U(3)})},{key:"4",label:(0,w.jsx)("div",{className:"ant-tabs__title",children:"Chuy\u1ec3n c\u01a1 quan \u0111i\u1ec1u tra"}),children:(0,w.jsx)(w.Fragment,{children:U(4)})}],{isDetails:$}=n,J=M===f.LoaiKhieuTo.KhieuNai?"S\xf4\u0301 quy\xea\u0301t \u0111i\u0323nh, k\xea\u0301t lu\xe2\u0323n":M===f.LoaiKhieuTo.ToCao?"V\u0103n ba\u0309n, quy\xea\u0301t \u0111i\u0323nh":M===f.LoaiKhieuTo.KienNghiPhanAnh?"Ba\u0301o ca\u0301o, k\xea\u0301t qua\u0309":"S\xf4\u0301 quy\xea\u0301t \u0111i\u0323nh",Z=J?J.toString().toLowerCase():"";return(0,w.jsx)(x.aF,{title:$?"Chi ti\u1ebft ".concat(Z):"C\u1eadp nh\u1eadt ".concat(Z," "),visible:V,className:"center-modal__footer",padding:0,footer:z?(0,w.jsx)(w.Fragment,{children:(0,w.jsx)(p.A,{className:"btn-danger",onClick:()=>E(),children:"\u0110\xf3ng"})}):(0,w.jsxs)(w.Fragment,{children:[(0,w.jsxs)(p.A,{type:"primary",onClick:()=>(async()=>{const{onCreate:e,dataEdit:i}=n;Y.current.validateFields().then((i=>{const l={...i,DanhSachHoSoTaiLieu:D,LoaiKetQuaID:K,ThoiHanThiHanh:(0,g.Yq)(i.ThoiHanThiHanh),NgayQuyetDinh:(0,g.Yq)(i.NgayQuyetDinh)};n.XuLyDonID&&(l.XuLyDonID=n.XuLyDonID);for(const n in l)l[n]||delete l[n];e(l)})).catch((n=>console.log("errr",n)))})(),loading:G,children:[(0,w.jsx)(v.A,{})," L\u01b0u"]}),(0,w.jsx)(p.A,{className:"btn-danger",onClick:()=>E(),loading:G,children:"H\u1ee7y"})]}),width:1e3,onCancel:()=>E(),children:(0,w.jsx)(y,{children:(0,w.jsxs)(t.A,{ref:Y,name:"CapNhatQuyetDinhGiaiQuyet",children:[z?null:(0,w.jsxs)(w.Fragment,{children:[(0,w.jsxs)("p",{className:"title",style:{padding:" 0 22px"},children:["Th\xf4ng tin chung:"," "]}),(0,w.jsxs)(r.A,{gutter:[10,10],style:{padding:" 0 22px"},children:[(0,w.jsx)(h.A,{md:12,span:24,children:(0,w.jsx)(_,{label:J,name:"SoQuyetDinh",className:"ant-form-title__left",children:(0,w.jsx)(c.A,{})})}),(0,w.jsx)(h.A,{md:12,span:24,children:(0,w.jsx)(_,{label:"Ng\xe0y",name:"NgayQuyetDinh",rules:[f.REQUIRED],className:"ant-form-title__left",children:(0,w.jsx)(x.lr,{placeholder:"",format:"DD/MM/YYYY"})})}),(0,w.jsx)(h.A,{md:12,span:24,children:(0,w.jsx)(_,{label:"C\u01a1 quan ban h\xe0nh",name:"CoQuanBanHanh",rules:[f.REQUIRED],className:"ant-form-title__left",children:(0,w.jsx)(m.Ay,{children:X&&X.map((n=>(0,w.jsx)(m.c$,{value:null===n||void 0===n?void 0:n.CoQuanID,children:null===n||void 0===n?void 0:n.TenCoQuan})))})})}),(0,w.jsx)(h.A,{md:12,span:24,children:(0,w.jsx)(_,{label:"Th\u1eddi h\u1ea1n thi h\xe0nh",name:"ThoiHanThiHanh",className:"ant-form-title__left",children:(0,w.jsx)(x.lr,{placeholder:"",format:"DD/MM/YYYY"})})}),(0,w.jsx)(h.A,{md:24,span:24,children:(0,w.jsx)(_,{label:"T\xf3m t\u1eaft n\u1ed9i dung ".concat(Z),name:"TomTatNoiDungGQ",className:"ant-form-title__left",children:(0,w.jsx)(x.TM,{style:{width:"100%"}})})})]}),(0,w.jsx)("div",{className:"line-break"}),(0,w.jsxs)("div",{className:"file",style:{padding:" 0 22px"},children:[(0,w.jsx)("p",{children:J}),(0,w.jsxs)(p.A,{type:"primary",onClick:()=>A(),children:["Th\xeam ",Z]})]}),(0,w.jsx)("div",{className:"line-break"})]}),z?(0,w.jsxs)("div",{style:{padding:" 0 22px"},children:[(0,w.jsx)("p",{className:"title",children:"Th\xf4ng tin chung: "}),(0,w.jsxs)("div",{className:"group-info",children:[(0,w.jsxs)("p",{children:[J,": ",null===I||void 0===I?void 0:I.SoQuyetDinh]}),(0,w.jsxs)("p",{children:["Ng\xe0y: ",null===I||void 0===I?void 0:I.NgayQuyetDinhStr]}),(0,w.jsxs)("p",{children:["C\u01a1 quan ban h\xe0nh: ",null===I||void 0===I?void 0:I.TenCoQuanBanHanh]}),(0,w.jsxs)("p",{children:["Th\u1eddi h\u1ea1n thi h\xe0nh:"," ",null!==I&&void 0!==I&&I.ThoiHanThiHanh?C()(I.ThoiHanThiHanh).format("DD/MM/YYYY"):null]})]}),(0,w.jsxs)("p",{className:"summary-content",children:["T\xf3m t\u1eaft n\u1ed9i dung ",Z,": ",I.TomTatNoiDungGQ]}),(0,w.jsx)("p",{className:"title",children:J})]}):null,D&&null!==D&&void 0!==D&&D.length?(0,w.jsx)("div",{style:{marginTop:"10px",padding:"0 22px"},className:"box-file",children:(0,w.jsxs)("table",{children:[(0,w.jsx)("thead",{children:(0,w.jsxs)("tr",{children:[(0,w.jsx)("th",{style:{width:"5%"},children:"STT"}),(0,w.jsx)("th",{style:{width:"30%"},children:"T\xean h\u1ed3 s\u01a1, t\xe0i li\u1ec7u"}),(0,w.jsx)("th",{style:{width:"30%"},children:"File \u0111\xednh k\xe8m"}),(0,w.jsx)("th",{style:{width:"25%"},children:"Ng\xe0y c\u1eadp nh\u1eadt"}),z?null:(0,w.jsx)("th",{style:{width:"15%",textAlign:"center"},children:"Thao t\xe1c"})]})}),D.map(((n,e)=>{var i,l;return(0,w.jsxs)("tbody",{children:[(0,w.jsxs)("tr",{children:[(0,w.jsx)("td",{rowspan:n.FileDinhKem.length,style:{textAlign:"center"},children:e+1}),(0,w.jsx)("td",{rowspan:n.FileDinhKem.length,children:(null===n||void 0===n?void 0:n.name)||(null===n||void 0===n?void 0:n.TenFile)}),(0,w.jsx)("td",{children:(0,w.jsx)("div",{className:"group-file",children:n.FileDinhKem[0]?(0,w.jsx)("p",{className:"file-item",children:(0,w.jsx)("a",{href:n.FileDinhKem[0].FileUrl,target:"_blank",children:(null===(i=n.FileDinhKem[0])||void 0===i?void 0:i.name)||(null===(l=n.FileDinhKem[0])||void 0===l?void 0:l.TenFile)})}):null})}),(0,w.jsx)("td",{rowspan:n.FileDinhKem.length,children:(0,w.jsx)("p",{children:C()().format("DD/MM/YYYY")})}),z?null:(0,w.jsx)("td",{rowspan:n.FileDinhKem.length,style:{textAlign:"center"},children:(0,w.jsxs)("div",{className:"action-btn",children:[(0,w.jsx)(d.A,{title:"S\u1eeda h\u1ed3 s\u01a1,t\xe0i li\u1ec7u",children:(0,w.jsx)(b.A,{onClick:()=>A(e)})}),(0,w.jsx)(d.A,{title:"X\xf3a h\u1ed3 s\u01a1,t\xe0i li\u1ec7u",children:(0,w.jsx)(N.A,{onClick:()=>Q(n,e)})})]})})]}),n.FileDinhKem?n.FileDinhKem.map(((n,e)=>{if(e>0)return(0,w.jsx)("tr",{children:(0,w.jsx)("td",{children:(0,w.jsx)("p",{className:"file-item",children:(0,w.jsx)("a",{href:n.FileUrl,target:"_blank",children:n.name||n.TenFile})})})})})):null]})}))]})}):"",z?(0,w.jsx)("div",{style:{padding:" 0 22px"},children:W?(0,w.jsxs)("p",{className:"title",children:["Quy\u1ebft \u0111\u1ecbnh l\u1ea7n 2: ",null===I||void 0===I?void 0:I.KetQuaGiaiQuyetLan2]}):(0,w.jsxs)("p",{className:"title",children:["Ph\xe2n t\xedch k\u1ebft qu\u1ea3:"," ",(e=>{const{ItemLoaiKhieuTo:i}=n;if(8===i){if(1===e)return"T\u1ed1 c\xe1o \u0111\xfang";if(2===e)return"T\u1ed1 c\xe1o c\xf3 \u0111\xfang, c\xf3 sai";if(3===e)return"T\u1ed1 c\xe1o sai"}else{if(1===e)return"Khi\u1ebfu n\u1ea1i \u0111\xfang";if(2===e)return"Khi\u1ebfu n\u1ea1i \u0111\xfang m\u1ed9t ph\u1ea7n";if(3===e)return"Khi\u1ebfu n\u1ea1i sai"}})(null===I||void 0===I?void 0:I.PhanTichKetQua)]})}):null,z||9===M?null:(0,w.jsxs)("div",{style:{padding:" 0 22px"},children:[(0,w.jsx)(_,{label:(0,w.jsx)("p",{className:"title",children:"Ph\xe2n t\xedch k\u1ebft qu\u1ea3"}),className:"ant-form-title__left",name:"PhanTichKetQua",children:8===M?(0,w.jsxs)(o.Ay.Group,{children:[(0,w.jsx)(o.Ay,{value:1,children:"T\u1ed1 c\xe1o \u0111\xfang"}),(0,w.jsx)(o.Ay,{value:2,children:"T\u1ed1 c\xe1o c\xf3 \u0111\xfang c\xf3 sai"}),(0,w.jsx)(o.Ay,{value:3,children:"T\u1ed1 c\xe1o sai"})]}):(0,w.jsxs)(o.Ay.Group,{children:[(0,w.jsx)(o.Ay,{value:1,children:"Khi\u1ebfu n\u1ea1i \u0111\xfang"}),(0,w.jsx)(o.Ay,{value:2,children:"Khi\u1ebfu n\u1ea1i 1 ph\u1ea7n"}),(0,w.jsx)(o.Ay,{value:3,children:"Khi\u1ebfu n\u1ea1i sai"})]})}),W?(0,w.jsx)(w.Fragment,{children:(0,w.jsx)(_,{label:(0,w.jsx)("p",{className:"title",children:"Quy\u1ebft \u0111\u1ecbnh l\u1ea7n 2"}),className:"ant-form-title__left",name:"KetQuaGiaiQuyetLan2",children:(0,w.jsxs)(o.Ay.Group,{children:[(0,w.jsx)(o.Ay,{value:1,children:"C\xf4ng nh\u1eadn quy\u1ebft \u0111\u1ecbnh l\u1ea7n 1"}),(0,w.jsx)(o.Ay,{value:2,children:"H\u1ee7y, s\u1eeda quy\u1ebft \u0111\u1ecbnh l\u1ea7n 1"})]})})}):null]}),9!==M?(0,w.jsxs)(w.Fragment,{children:[(0,w.jsx)("div",{className:"line-break"}),(0,w.jsxs)("div",{style:{padding:" 0 22px"},children:[(0,w.jsxs)("p",{className:"title",children:["N\u1ed9i dung ",J," v\xe0 ph\xe2n c\xf4ng thi h\xe0nh quy\u1ebft \u0111\u1ecbnh"]}),(0,w.jsx)(u.A,{forceRender:!0,items:O,value:K,onChange:n=>H(n)})]})]}):null,(0,w.jsx)(T.A,{visible:i,dataEdit:l,onCancel:k,onCreate:L},j)]})})})}}}]);