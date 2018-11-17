import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

const Layout = styled.article`
  padding: 2em 3em;
  display: flex;
  flex-direction: row;
  flex-wrap: no-wrap;

  @media (max-width: 900px) {
    flex-direction: column;
  }

  background-color: transparent;
  color: white;
`;

const MyDescriptionSection = styled.section`
  flex: 1;
  display: block;
`;

const MyDescription = styled.p`
  font-size: 1.1em;
  line-height: 1.4em;
`;

const SectionContent = styled.div`
  @media (min-width: 900px) {
    max-width: 400px;
    margin: 0 auto;
  }
`;

const MySkillsSection = styled.section`
  flex: 1;

  display: block;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 2em;
  font-family: 'Gabriela', serif;
  color: white;
`;

const SkillGroup = styled.div``;

const GroupTitle = styled.h3`
  margin: 0;
  color: white;
`;

const GroupSkills = styled.div``;

const Skill = styled.div`
  display: inline-block;
  color: #e83b6c;
  margin-right: 10px;
`;

const Emphasize = styled.span`
  color: #e83b6c;
`;

const AboutMe = () => (
  <Layout>
    <MyDescriptionSection>
      <SectionContent>
        <Title>
          <FormattedMessage
            id="AboutMe.Title"
            defaultMessage="I am Vladislav Sereda. Full stack web developer"
          />
        </Title>
        <MyDescription>
          <FormattedMessage
            id="AboutMe.Description"
            defaultMessage="My skills are broad. I can do both {frontEnd} and {backEnd} development and can turn application templates into working solution."
            values={{
              frontEnd: <Emphasize>Front End</Emphasize>,
              backEnd: <Emphasize>Back End</Emphasize>,
            }}
          />
        </MyDescription>
      </SectionContent>
    </MyDescriptionSection>
    <MySkillsSection>
      <SectionContent>
        <Title>
          <FormattedMessage id="AboutMe.Skills.Title" defaultMessage="My Skills" />
        </Title>
        <SkillGroup>
          <GroupTitle>Front End</GroupTitle>
          <GroupSkills>
            <Skill>HTML</Skill>
            <Skill>CSS</Skill>
            <Skill>Javascript</Skill>
            <Skill>React</Skill>
            <Skill>Apollo Client</Skill>
            <Skill>Angular.js</Skill>
          </GroupSkills>
        </SkillGroup>
        <SkillGroup>
          <GroupTitle>Back End</GroupTitle>
          <GroupSkills>
            <Skill>Node JS</Skill>
            <Skill>Graph QL</Skill>
            <Skill>REST</Skill>
            <Skill>NoSQL</Skill>
            <Skill>Docker</Skill>
          </GroupSkills>
        </SkillGroup>
        <SkillGroup>
          <GroupTitle>
            <FormattedMessage id="AboutMe.Skills.Personal.Title" defaultMessage="Personal Skills" />
          </GroupTitle>
          <GroupSkills>
            <Skill>Upper-Intermediate English</Skill>
          </GroupSkills>
        </SkillGroup>
      </SectionContent>
    </MySkillsSection>
  </Layout>
);

export default AboutMe;
