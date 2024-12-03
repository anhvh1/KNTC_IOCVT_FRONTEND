const baseUrl = [
  'https://unittest.gosol.com.vn/api/v2/',
  'https://kntcv2dev.gosol.com.vn/api/v2/',
  'https://kntc.vinhphuc.gov.vn/api/v2/',
];

const APIKEY = baseUrl[0];

window._env = {
  REACT_APP_API_BASE_URL: APIKEY,
};

export {baseUrl};
