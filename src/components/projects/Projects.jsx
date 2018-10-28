import React from 'react';
import styled from 'styled-components';
import { Icon } from 'antd';

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

const Title = styled.h2`
  margin: 0;
  text-align: center;
  font-size: 2em;
  font-family: 'Gabriela', serif;
  color: white;
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
  border-radius: 5px;
`;

const Image = styled.img`
  height: 100%;
  width: 100%;
  object-fit: fill;
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

const Link = styled.a`
  display: flex;
  justify-content: center;
  align-content: center;

  cursor: pointer;
  text-decoration: none;
  color: #03ffd1;
  border: 1px solid #03ffd1;
  border-radius: 5%;
  padding: 10px 20px;
  margin: 10px;

  transition-property: color, border;
  transition-duration: 0.3s;
  transition-timing-function: ease-out;

  :hover {
    color: #e83b6c;
    border-color: #e83b6c;
  }
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
    <Title>My Projects</Title>
    <ProjectsList>
      <Project>
        <ProjectImage>
          <Image alt="anime" src="/public/images/anime3.png" />
        </ProjectImage>
        <Description>
          <ProjectTitle>Inzite</ProjectTitle>
          <ProjectOverview>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos dolor quas aliquid
            aliquam nihil distinctio ea ex tenetur at dolores.
          </ProjectOverview>
          <ProjectControls>
            <Link href="https://inzite.io/" rel="noopener noreferrer" target="_blank">
              <LinkText>View Project</LinkText>
              <ChromeIcon />
            </Link>
          </ProjectControls>
        </Description>
      </Project>
      <Project>
        <ProjectImage>
          <Image alt="anime" src="/public/images/anime3.png" />
        </ProjectImage>
        <Description>
          <ProjectTitle>Medium Clone</ProjectTitle>
          <ProjectOverview>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos dolor quas aliquid
            aliquam nihil distinctio ea ex tenetur at dolores.
          </ProjectOverview>
          <ProjectControls>
            <Link href="https://inzite.io/" rel="noopener noreferrer" target="_blank">
              <LinkText>View Project</LinkText>
              <GithubIcon />
            </Link>
          </ProjectControls>
        </Description>
      </Project>
      <Project>
        <ProjectImage>
          <Image alt="anime" src="/public/images/anime3.png" />
        </ProjectImage>

        <Description>
          <ProjectTitle>Notes</ProjectTitle>
          <ProjectOverview>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos dolor quas aliquid
            aliquam nihil distinctio ea ex tenetur at dolores.
          </ProjectOverview>
          <ProjectControls>
            <Link
              href="https://github.com/trudyga/note_app"
              rel="noopener noreferrer"
              target="_blank"
            >
              <LinkText>View Project</LinkText>
              <GithubIcon />
            </Link>
          </ProjectControls>
        </Description>
      </Project>
      <Project>
        <ProjectImage>
          <Image alt="anime" src="/public/images/anime3.png" />
        </ProjectImage>
        <Description>
          <ProjectTitle>Stat App</ProjectTitle>
          <ProjectOverview>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos dolor quas aliquid
            aliquam nihil distinctio ea ex tenetur at dolores.
          </ProjectOverview>
          <ProjectControls>
            <Link
              href="https://github.com/trudyga/StatApp"
              rel="noopener noreferrer"
              target="_blank"
            >
              <LinkText>View Project</LinkText>
              <GithubIcon />
            </Link>
          </ProjectControls>
        </Description>
      </Project>

      {/* <Row>
        <Col sm={12}>
          <div>
            <h3>Web development</h3>
            <Skills>
              <Tag>Angular.js</Tag>
              <Tag>Node.js</Tag>
            </Skills>
            <p>Create this, create that</p>
            <a href="https://inzite.io/" rel="noopener noreferrer" target="_blank">
              View Project
            </a>
          </div>
        </Col>
        <Col sm={12}>
          <div>
            <Image alt="anime" src="/public/images/anime3.png" />
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <div>
            <Image alt="anime" src="/public/images/anime2.png" />
          </div>
        </Col>
        <Col sm={12}>
          <div>
            <h3>Web development</h3>
            <Skills>
              <Tag>React</Tag>
              <Tag>Apollo Client</Tag>
              <Tag>Node.js</Tag>
              <Tag>GraphQL</Tag>
            </Skills>
            <p>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Non obcaecati veritatis enim
              unde deleniti corporis deserunt incidunt labore officiis corrupti.
            </p>
            <a href="https://github.com/trudyga/StatApp" rel="noopener noreferrer" target="_blank">
              <Icon style={{ fontSize: '25px' }} type="github" theme="outlined" />
            </a>
          </div>
        </Col>
      </Row>
      <Row>
        <Col sm={12}>
          <h3>Web development</h3>
          <Skills>
            <Tag>Angular</Tag>
            <Tag>ASP.NET</Tag>
          </Skills>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi dolore in perferendis
            repellendus saepe natus odio incidunt inventore quam non.
          </p>
          <a href="https://github.com/trudyga/StatApp" rel="noopener noreferrer" target="_blank">
            <Icon style={{ fontSize: '25px' }} type="github" theme="outlined" />
          </a>
        </Col>
        <Col sm={12}>
          <div>
            <Image alt="anime" src="/public/images/anime1.jpg" />
          </div>
        </Col>
      </Row> */}
      {/* <Row>
        <Col xs={24} sm={12}>
          <Card
            style={{ margin: '20px' }}
            cover={<img alt="anime" src="/public/images/anime3.png" />}
            actions={[
              <a href="https://inzite.io/" rel="noopener noreferrer" target="_blank">
                <Icon style={{ fontSize: '25px' }} type="chrome" theme="outlined" />
              </a>,
            ]}
          >
            <Meta
              title="Inzite Platform"
              description={
                <Skills>
                  <Tag>Angular.js</Tag>
                  <Tag>Node.js</Tag>
                </Skills>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12}>
          <Card
            style={{ margin: '20px' }}
            cover={<img alt="anime" src="/public/images/anime2.png" />}
            actions={[
              <a
                href="https://github.com/trudyga/StatApp"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Icon style={{ fontSize: '25px' }} type="github" theme="outlined" />
              </a>,
            ]}
          >
            <Meta
              title="Medium Clone"
              description={
                <Skills>
                  <Tag>React</Tag>
                  <Tag>Apollo Client</Tag>
                  <Tag>Node.js</Tag>
                  <Tag>GraphQL</Tag>
                </Skills>
              }
            />
          </Card>
        </Col>
      </Row>
      <Row>
        <Col xs={24} sm={12}>
          {' '}
          <Card
            style={{ margin: '20px' }}
            cover={<img alt="anime" src="/public/images/anime1.jpg" />}
            actions={[
              <a
                href="https://github.com/trudyga/note_app"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Icon style={{ fontSize: '25px' }} type="github" theme="outlined" />
              </a>,
            ]}
          >
            <Meta
              title="Note App"
              description={
                <Skills>
                  <Tag>Jade</Tag>
                  <Tag>Node.js</Tag>
                  <Tag>MySQL</Tag>
                  <Tag>Microservice Architecture</Tag>
                </Skills>
              }
            />
          </Card>
        </Col>
        <Col xs={24} sm={12}>
          {' '}
          <Card
            style={{ margin: '20px' }}
            cover={<img alt="anime" src="/public/images/anime1.jpg" />}
            actions={[
              <a
                href="https://github.com/trudyga/StatApp"
                rel="noopener noreferrer"
                target="_blank"
              >
                <Icon style={{ fontSize: '25px' }} type="github" theme="outlined" />
              </a>,
            ]}
          >
            <Meta
              title="Stat App"
              description={
                <Skills>
                  <Tag>Angular</Tag>
                  <Tag>ASP.NET</Tag>
                </Skills>
              }
            />
          </Card>
        </Col>
      </Row> */}
    </ProjectsList>
  </Container>
);

export default Projects;
