import React from 'react';
import styled from 'styled-components';
import { Icon } from 'antd';
import { FormattedMessage } from 'react-intl';
import Title from '../atoms/BlockTitle';
import Link from '../atoms/Link';

// const { Meta } = Card;

// const Skills = styled.div`
//   display: flex;
//   flex-direction: row;
//   flex-wrap: wrap;
// `;

const Container = styled.div`
  max-width: 1080px;
  margin: 0 auto;
`;

const ProjectsList = styled.div``;

const Project = styled.div`
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin: 50px 0;

  @media only screen and (min-width: 700px) {
    :nth-child(even) {
      flex-direction: row-reverse;
    }
  }

  @media only screen and (max-width: 700px) {
    flex-direction: column;
  }
`;

const ProjectImage = styled.div`
  flex: 1;
  margin: 10px;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: fill;
  border-radius: 10px;
`;

const Description = styled.div`
  flex: 1;
  margin: 10px;
`;

const ProjectTitle = styled.h3`
  margin: 0;
  text-align: left;
  color: white;
  font-size: 1.5em;
`;

const ProjectOverview = styled.p`
  line-height: 1.8em;
  color: white;
`;

const ProjectControls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: nowrap;
`;

const LinkText = styled.span`
  font-size: 1em;
  line-height: 2em;

  :not(:last-child) {
    margin-right: 1em;
  }
`;

const GithubIcon = () => <Icon style={{ fontSize: '25px' }} type="github" theme="outlined" />;
const ChromeIcon = () => <Icon style={{ fontSize: '25px' }} type="chrome" theme="outlined" />;

const Projects = () => (
  <Container>
    <Title>
      <FormattedMessage id="Projects.SectionTitle" defaultMessage="My Projects" />
    </Title>
    <ProjectsList>
      <Project>
        <ProjectImage>
          <Image alt="anime" src="/assets/images/Inzite.png" />
        </ProjectImage>
        <Description>
          <ProjectTitle>Inzite</ProjectTitle>
          <ProjectOverview>
            <FormattedMessage
              id="Projects.Inzite.Overview"
              defaultMessage="Advice web-platform. I have implemented new features and improved existing functionality while working as part of development team."
            />
          </ProjectOverview>
          <ProjectControls>
            <Link bordered href="https://inzite.io/" rel="noopener noreferrer" target="_blank">
              <LinkText>
                <FormattedMessage id="Projects.ViewButton" defaultMessage="View Project" />
              </LinkText>
              <ChromeIcon />
            </Link>
          </ProjectControls>
        </Description>
      </Project>
      <Project>
        <ProjectImage>
          <Image alt="anime" src="/assets/images/MediumClone.png" />
        </ProjectImage>
        <Description>
          <ProjectTitle>Medium Clone</ProjectTitle>
          <ProjectOverview>
            <FormattedMessage
              id="Projects.MediumClone.Overview"
              defaultMessage="Web application for creation and distribution of electronic publications. The main goal of development is to research the posibilities of React and GraphQL technologies for distributed applications development"
            />
          </ProjectOverview>
          <ProjectControls>
            <Link
              bordered
              href="https://github.com/trudyga/medium_clone"
              rel="noopener noreferrer"
              target="_blank"
            >
              <LinkText>
                <FormattedMessage id="Projects.ViewButton" defaultMessage="View Project" />
              </LinkText>
              <GithubIcon />
            </Link>
          </ProjectControls>
        </Description>
      </Project>
      <Project>
        <ProjectImage>
          <Image alt="anime" src="/assets/images/StatApp.png" />
        </ProjectImage>
        <Description>
          <ProjectTitle>Stat App</ProjectTitle>
          <ProjectOverview>
            <FormattedMessage
              id="Projects.StatApp.Overview"
              defaultMessage="Web tool for carrying out the primary statistical analysis over user-defined data sets."
            />
          </ProjectOverview>
          <ProjectControls>
            <Link
              bordered
              href="https://github.com/trudyga/StatApp"
              rel="noopener noreferrer"
              target="_blank"
            >
              <LinkText>
                <FormattedMessage id="Projects.ViewButton" defaultMessage="View Project" />
              </LinkText>
              <GithubIcon />
            </Link>
          </ProjectControls>
        </Description>
      </Project>
      <Project>
        <ProjectImage>
          <Image alt="anime" src="/assets/images/NotesApp.png" />
        </ProjectImage>

        <Description>
          <ProjectTitle>Notes</ProjectTitle>
          <ProjectOverview>
            <FormattedMessage
              id="Projects.Notes.Overview"
              defaultMessage="Application provides user with tools for private notes orchestration. The main goal of development is to create microservice architecture for handing application users and their notes."
            />
          </ProjectOverview>
          <ProjectControls>
            <Link
              bordered
              href="https://github.com/trudyga/note_app"
              rel="noopener noreferrer"
              target="_blank"
            >
              <LinkText>
                {' '}
                <FormattedMessage id="Projects.ViewButton" defaultMessage="View Project" />
              </LinkText>
              <GithubIcon />
            </Link>
          </ProjectControls>
        </Description>
      </Project>
    </ProjectsList>
  </Container>
);

export default React.memo(Projects);
