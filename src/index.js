import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import IndexPage from './pages/IndexPage';
import ExperiencePage from './pages/ExperiencePage';
import './index.css';

const Index = () => (
  <Switch>
    <Route exact path="/" component={IndexPage} />
    <Route path="/home" component={IndexPage} />
    <Route path="/experience" component={ExperiencePage} />
  </Switch>
);

ReactDOM.render(
  <Router>
    <Index />
  </Router>,
  document.getElementById('index')
);
