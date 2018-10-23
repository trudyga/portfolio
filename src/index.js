import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ParalaxPage from './pages/ParalaxPage';
import IndexPage from './pages/IndexPage';
import ExperiencePage from './pages/ExperiencePage';
import SkillsPage from './pages/SkillsPage';
import LandingPage from './pages/LandingPage';
import './index.css';

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
  <Router>
    <Index />
  </Router>,
  document.getElementById('index')
);
