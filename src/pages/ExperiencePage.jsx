import React from 'react';
import styled from 'styled-components';
import Experience from '../components/experience/Experience';

const Section = styled.section`
  height: 150vh;
  width: 100vh;
`;

const ExperiencePage = () => (
  <div>
    <Section>
      <h1>Sample headline</h1>
    </Section>
    <Experience />
  </div>
);

export default ExperiencePage;
