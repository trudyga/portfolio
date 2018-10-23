// @flow

import React, { Component } from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';
import Scene from '../components/background/Scene';
import SiteNav from '../components/menu/SiteNav';
import AboutMe from '../components/about/AboutMe';
import Experience from '../components/experience/VerticalTimeline';

const { Content, Sider } = Layout;

const FullScreenLayout = styled(Layout)`
  height: 100%;
  width: 100%;
`;

const FullScreenScene = styled(Scene)`
  position: absolute;
  top: 0;
  left: 0;
`;

const StyledContent = styled(Content)`
  max-width: 1000px;
  margin: 0 auto;
  background: transparent;
  z-index: 1;
`;

const TransparentSider = styled(Sider)`
  background: transparent !important;
`;

const CenteredWrapper = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
`;

const IntroductoryMessage = styled.div`
  margin-left: 20px;
`;

const HeadlineMessage = styled.div`
  display: inline-block;
  min-height: 90px;
`;
const FirstWord = styled.div`
  position: relative;
  display: inline-block;
`;

const BackdropText = styled.i`
  font-family: 'Oleo Script Swash Caps', cursive;
  position: absolute;
  color: rgba(255, 255, 255, 0.3);
  font-size: 75px;
`;

const PrimaryText = styled.span`
  font-family: 'Gabriela', serif;
  color: white
  position: relative;
  top: 45px;
  font-size: 25px;
  left: 2em;
  text-transform: uppercase;
`;

const DescriptionText = styled.p`
  margin: 0;
  font-family: 'Gabriela', serif;
  color: white
  font-size: 25px;
`;

const AboutMeBlock = styled.div`
  position: relative;
  padding: 300px 0;
  background-image: url('/public/images/trianglify.svg');
  background-size: cover;
  background-repeat: no-repeat;

  ::before {
    content: '';
    display: block;
    height: 15vh;
    position: absolute;
    top: 0;
    width: 100%;
    background: linear-gradient(to left bottom, black 50%, transparent 50%);
  }
`;

const ExperienceBlock = styled.div`
  position: relative;
  padding: 200px 0;

  background-image: url('/public/images/trianglify-gray-green2.svg');
  background-size: cover;
  background-repeat: no-repeat;
  background-color: #222;

  ::before {
    content: '';
    display: block;
    position: absolute;
    top: -200px;
    width: 100%;
    height: 200px;
    background: linear-gradient(to left top, #222 25%, transparent 50%);
  }

  ::after {
    content: '';
    display: block;
    position: absolute;
    top: 0;
    width: 100%;
    height: 200px;
    background: linear-gradient(to left bottom, #222 25%, transparent 50%);
  }
`;

const ProjectsBlock = styled.div`
  background-image: url('/public/images/trianglify-bluish-green2.svg');
  background-size: cover;
  background-repeat: no-repeat;
  background-color: #222;

  padding: 400px 0;
`;

type Props = {};

type State = {
  menuCollapsed: boolean,
};

class IndexPage extends Component<Props, State> {
  state = {
    menuCollapsed: true,
  };

  collapseMenu = (collapsed: boolean) => {
    this.setState(() => ({
      menuCollapsed: collapsed,
    }));
  };

  render() {
    const { menuCollapsed } = this.state;

    return (
      <React.Fragment>
        <FullScreenLayout style={{ flexDirection: 'row-reverse' }}>
          <FullScreenScene />
          <TransparentSider
            theme="dark"
            collapsible={false}
            collapsed={menuCollapsed}
            onCollapse={this.collapseMenu}
          >
            <SiteNav transparentBackground collapsed={menuCollapsed} />
          </TransparentSider>
          <StyledContent style={{ background: 'transparent' }}>
            <CenteredWrapper>
              <IntroductoryMessage>
                <HeadlineMessage>
                  <FirstWord>
                    <BackdropText>Hello</BackdropText>
                    <PrimaryText>Hello</PrimaryText>
                  </FirstWord>
                </HeadlineMessage>
                <DescriptionText>My name is Vladislav Sereda.</DescriptionText>
                <DescriptionText>
                  {`
                  I'm Web developer.
                `}
                </DescriptionText>
              </IntroductoryMessage>
            </CenteredWrapper>
          </StyledContent>
        </FullScreenLayout>
        <AboutMeBlock>
          <AboutMe />
        </AboutMeBlock>
        <ExperienceBlock>
          <Experience />
        </ExperienceBlock>
        <ProjectsBlock>
          <h1 style={{ textAlign: 'center' }}>It works!</h1>
        </ProjectsBlock>
      </React.Fragment>
    );
  }
}

export default IndexPage;
