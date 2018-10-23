import React from 'react';
import IndexPage from './IndexPage';
// import ParalaxPage from './ParalaxPage';
import SkillsPage from './SkillsPage';

const LandingPage = () => (
  <React.Fragment>
    <IndexPage />
    <div style={{ height: '50vh', background: 'linear-gradient(black, white)' }} />
    {/* <ParalaxPage /> */}
    <SkillsPage />
  </React.Fragment>
);

export default LandingPage;
