import React from 'react';
import styled from 'styled-components';

const Container = styled.div``;

const Section = styled.section`
  position: relative;
  min-height: 200px;
`;

const SectionContent = styled.div`
  display: flex;
  flex-direction: row;
`;

const SectionTitle = styled.h3`
  font-family: 'Oleo Script Swash Caps', cursive;
  font-size: 2em;
`;

const Skill = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const Restfull = styled.span`
  font-size: 30px;
  font-family: 'Gabriela', serif;
  text-transform: uppercase;
`;

const Skillset = () => (
  <Container>
    <Section>
      <SectionTitle>Frameworks</SectionTitle>
      <SectionContent>
        <Skill>
          <Restfull>React</Restfull>
        </Skill>
        <Skill>
          <Restfull>Angular.js</Restfull>
        </Skill>
      </SectionContent>
    </Section>
    <Section>
      <SectionTitle>Graphics</SectionTitle>
      <Skill>
        <Restfull>Three.js</Restfull>
      </Skill>
    </Section>
    <Section>
      <SectionTitle>Communication</SectionTitle>
      <Skill>
        <img height="50px" width="50px" src="/public/images/GraphQL.svg" alt="Graph QL" />
        <Restfull>GraphQL</Restfull>
      </Skill>
      <Skill>
        <Restfull>Rest</Restfull>
      </Skill>
    </Section>
  </Container>
);

export default Skillset;
