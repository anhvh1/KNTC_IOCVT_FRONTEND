const date = new Date();
const currentYear = date.getFullYear();
// import {baseUrl} from '../../public/env-config';

export default {
  // v2Url: "https://linhvucthanhtra.quangtri.gov.vn/api/", //linhvucthanhtra
  // v2Url: "https://ttkt-quangtri.gosol.com.vn/api/", //test
  v2Url: "https://ttkt-quangtri-dev.gosol.com.vn/api/", //dev
};
const siteConfig = {
  siteName: "Hệ thống quản lý công tác thanh tra, kiểm tra",
  siteIcon: "", //ion-flash
  footerText: `Copyright © ${currentYear} GO SOLUTIONS. All rights`,
};
const themeConfig = {
  topbar: "theme6",
  sidebar: "theme8",
  layout: "theme2",
  theme: "themedefault",
};
const language = "english";

const firebaseConfig = {
  apiKey: "",
  authDomain: "",
  databaseURL: "",
  projectId: "",
  storageBucket: "",
  messagingSenderId: "",
};

export { siteConfig, themeConfig, language, firebaseConfig };
