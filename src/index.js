import React from 'react';
import ReactDOM from 'react-dom';
import Scene from './components/background/Scene';
import './index.css';

const Index = () => (
  <div>
    <Scene />
  </div>
);

ReactDOM.render(<Index />, document.getElementById('index'));
