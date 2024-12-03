const date = new Date();
const currentYear = date.getFullYear();
// import {baseUrl} from '../../public/env-config';
const baseUrl = [
  'https://unittest.gosol.com.vn/api/v2/',
  'https://kntcv2dev.gosol.com.vn/api/v2/',
  'https://kntc.vinhphuc.gov.vn/api/v2/',
];

export default {
  v2Url: 'https://unittest.gosol.com.vn/api/v2/',
  // v2Url: 'https://kntc.vinhphuc.gov.vn/api/v2/', // api public vinhphuc
  // apiCAS: 'https://caskkts.gosol.com.vn/',
  // v2Url: 'https://unittest.gosol.com.vn/api/v2/', // api test
  // v2Url: 'http://192.168.100.45:3060/api/v2/', // api test
  // v2Url: window?._env?.REACT_APP_API_BASE_URL
  //   ? window?._env?.REACT_APP_API_BASE_URL
  //   : baseUrl[2], // api dev
  // v2Url: "http://kntcv2api.gosol.com.vn/api/v2/", //api Dùng tạm
};

const siteConfig = {
  siteName:
    'phần mềm công tác quản lý tiếp dân, xử lý đơn và giải quyết khiếu nại tố cáo',
  siteIcon: '', //ion-flash
  footerText: `Copyright © ${currentYear} GO SOLUTIONS. All rights`,
};

const themeConfig = {
  topbar: 'theme6',
  sidebar: 'theme8',
  layout: 'theme2',
  theme: 'themedefault',
};
const language = 'english';

const firebaseConfig = {
  apiKey: '',
  authDomain: '',
  databaseURL: '',
  projectId: '',
  storageBucket: '',
  messagingSenderId: '',
};

export {siteConfig, themeConfig, language, firebaseConfig};
