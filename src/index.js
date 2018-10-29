import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { IntlProvider, addLocaleData } from 'react-intl';
import en from 'react-intl/locale-data/en';
import ru from 'react-intl/locale-data/ru';
import ParalaxPage from './pages/ParalaxPage';
import IndexPage from './pages/IndexPage';
import ExperiencePage from './pages/ExperiencePage';
import SkillsPage from './pages/SkillsPage';
import LandingPage from './pages/LandingPage';
import './index.css';

import localeData from '../public/locales/data.json';

addLocaleData([...en, ...ru]);

const language =
  (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage;

const languageWithoutRegionCode = language.toLowerCase().split(/[_-]+/)[0];

const messages = localeData[languageWithoutRegionCode] || localeData[language] || localeData.en;

const Index = () => (
  <Switch>
    <Route exact path="/" component={ParalaxPage} />
    <Route path="/home" component={IndexPage} />
    <Route path="/skills" component={SkillsPage} />
    <Route path="/experience" component={ExperiencePage} />
    <Route path="/landing" component={LandingPage} />
  </Switch>
);

ReactDOM.render(
  <IntlProvider locale={language} messages={messages}>
    <Router>
      <Index />
    </Router>
  </IntlProvider>,
  document.getElementById('index')
);
