import React from 'react';
import { Route, Switch } from 'react-router-dom';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import ru from 'react-intl/locale-data/ru';
import ParalaxPage from './pages/ParalaxPage';
import IndexPage from './pages/IndexPage';
import ExperiencePage from './pages/ExperiencePage';
import SkillsPage from './pages/SkillsPage';

import localeData from '../public/locales/data.json';

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
    <Route path={`${url}/skills`} component={SkillsPage} />
    <Route path={`${url}/experience`} component={ExperiencePage} />
    <Route path={`${url}/paralax`} component={ParalaxPage} />
    <Route component={() => <h1>404 Page</h1>} />
  </Switch>
);

type LanguageProviderProps = {
  locale: string,
};
const LanguageProvider = ({ locale }: LanguageProviderProps) => (
  <IntlProvider locale={locale} messages={localeData[locale]}>
    <ApplicationRoutes match={{ url: `/${locale}` }} />
  </IntlProvider>
);

const LanguageRoutes = () => (
  <Switch>
    <Route exact path="/" component={() => <LanguageProvider locale="en" />} />
    <Route path="/en" component={() => <LanguageProvider locale="en" />} />
    <Route path="/ru" component={() => <LanguageProvider locale="ru" />} />
  </Switch>
);

export default LanguageRoutes;
