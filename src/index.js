import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from './Routes';
import './index.css';

const Index = () => <Routes />;

ReactDOM.render(
  <Router>
    <Index />
  </Router>,
  document.getElementById('index')
);
