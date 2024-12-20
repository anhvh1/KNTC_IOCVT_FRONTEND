import React from 'react';
import {Provider} from 'react-redux';
import {store, history} from './redux/store';
import PublicRoutes from './router';
import {ThemeProvider} from 'styled-components';
import {ConfigProvider} from 'antd';
import {IntlProvider} from 'react-intl';
import themes from './settings/themes';
// import AppLocale from './languageProvider';
import config, {getCurrentLanguage} from './containers/LanguageSwitcher/config';
import {themeConfig} from './settings';
import DashAppHolder from './dashAppStyle';
import Boot from './redux/boot';

// const currentAppLocale =
//   AppLocale[getCurrentLanguage(config.defaultLanguage || 'english').locale];

const DashApp = () => (
  // <ConfigProvider locale={currentAppLocale.antd}>
  <IntlProvider
    locale={'en'}
    // messages={currentAppLocale.messages}
  >
    <ThemeProvider theme={themes[themeConfig.theme]}>
      <DashAppHolder>
        <Provider store={store}>
          <PublicRoutes history={history} />
        </Provider>
      </DashAppHolder>
    </ThemeProvider>
  </IntlProvider>
  // </ConfigProvider>
);

Boot(history, store)
  .then(() => ClearCacheComponent())
  .catch((error) => console.error(error));

export default DashApp;
// export {AppLocale};
