import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import ru from 'react-intl/locale-data/ru';
import IndexPage from './pages/IndexPage';

import localeData from '../assets/locales/data.json';

addLocaleData([...en, ...ru]);

type Match = {
  url: string,
};
type ApplicationRoutesProps = {
  match: Match,
};

const ApplicationRoutes = ({ match: { url } }: ApplicationRoutesProps) => (
  <Switch>
    <Route exact path="/" component={IndexPage} />
    <Route exact path={`${url}`} component={IndexPage} />
    <Route path={`${url}/home`} component={IndexPage} />
    <Route component={() => <h1>404 Page</h1>} />
  </Switch>
);

type IntlRouterProps = {
  location: Object,
};
const IntlRouter = ({ location }: IntlRouterProps) => {
  function getCurrentLocale() {
    const parts = location.pathname.split('/');
    const locale = parts.length > 0 && parts[1];

    if (locale === 'ru') {
      return 'ru';
    }

    return 'en';
  }

  const locale = getCurrentLocale();

  return (
    <IntlProvider locale={locale} messages={localeData[locale]}>
      <ApplicationRoutes match={{ url: `/${locale}` }} />
    </IntlProvider>
  );
};

export default withRouter(IntlRouter);
