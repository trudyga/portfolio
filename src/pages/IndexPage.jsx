// @flow

import React, { Component } from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import Scene from '../components/background/Scene';
import SiteNav from '../components/menu/SiteNav';
import AboutMe from '../components/me/AboutMe';
import ContactMe from '../components/me/ContactMe';
import Experience from '../components/experience/VerticalTimeline';
import Projects from '../components/projects/Projects';

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
  background-attachment: fixed;

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
  background: transparent;

  transition: transform 0.1s ease;
`;

const ExperienceBackground = styled.div`
  position: absolute;
  top: -30%;
  left: 0;
  height: 130%;
  width: 100%;
  z-index: -1;

  background-image: url('/public/images/trianglify_experience_2.svg');
  background-position-x: center;
  background-size: cover;
  background-repeat: no-repeat;
`;

const ProjectsBlock = styled.div`
  position: relative;
  top: -200px;
  background: transparent;
  padding: 10vh 0;
`;

const ProjectsBackground = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: -1;

  background-image: url('/public/images/trianglify.svg');
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
`;

const ContactMeBlock = styled.div`
  position: relative;
  top: -200px;
  background: transparent;
  padding: 2em 0;
`;

const ContactMeBackground = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  width: 100%;
  z-index: -1;

  background-image: url('/public/images/trianglify-bluish-green2.svg');
  background-size: cover;
  background-repeat: no-repeat;
  background-attachment: fixed;
`;

type Props = {};

type State = {
  menuCollapsed: boolean,
};

function parallaxBlock(element, styles, parallaxSettings) {
  const paddingTop = parseFloat(styles.getPropertyValue('padding-top'));
  const marginTop = parseFloat(styles.getPropertyValue('margin-top'));

  const elementRect = element.getBoundingClientRect();
  const windowHeigth = window.innerHeight;

  const percentScrolled = Math.min(
    Math.max(0, (windowHeigth - elementRect.top + paddingTop + marginTop) / windowHeigth),
    1
  );

  parallaxSettings.current = parallaxSettings.max * percentScrolled; // eslint-disable-line
  element.style.transform = `translateY(-${parallaxSettings.current}px)`; // eslint-disable-line
}

class IndexPage extends Component<Props, State> {
  state = {
    menuCollapsed: true,
  };

  parallax = {
    ticking: false,
    expBlock: {
      min: 0,
      current: 0,
      max: 200,
    },
  };

  componentDidMount() {
    window.addEventListener('scroll', this.handleScroll);
  }

  collapseMenu = (collapsed: boolean) => {
    this.setState(() => ({
      menuCollapsed: collapsed,
    }));
  };

  handleScroll = () => {
    const lastScrollPosition = window.scrollY;

    if (this.expBack) {
      parallaxBlock(
        this.expBack,
        window.getComputedStyle(this.expBack),
        this.parallax.expBlock,
        lastScrollPosition
      );
    }

    if (!this.parallax.ticking) {
      window.requestAnimationFrame(() => {
        this.parallax.ticking = false;
      });

      this.parallax.ticking = false;
    }
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
                    <BackdropText>
                      <FormattedMessage id="IndexPage.Welcome.Backdrop" defaultMessage="Hello" />
                    </BackdropText>
                    <PrimaryText>
                      <FormattedMessage id="IndexPage.Welcome.Title" defaultMessage="Hello" />
                    </PrimaryText>
                  </FirstWord>
                </HeadlineMessage>
                <DescriptionText>
                  <FormattedMessage
                    id="IndexPage.Welcome.Description.Name"
                    defaultMessage="My name is Vladislav Sereda."
                  />
                </DescriptionText>
                <DescriptionText>
                  <FormattedMessage
                    id="IndexPage.Welcome.Description.Role"
                    defaultMessage="I'm Web developer."
                  />
                </DescriptionText>
              </IntroductoryMessage>
            </CenteredWrapper>
          </StyledContent>
        </FullScreenLayout>
        <AboutMeBlock>
          <AboutMe />
        </AboutMeBlock>
        <ExperienceBlock
          innerRef={mount => {
            this.expBack = mount;
          }}
        >
          <ExperienceBackground />
          <Experience />
        </ExperienceBlock>
        <ProjectsBlock
          innerRef={mount => {
            this.projectBack = mount;
          }}
        >
          <ProjectsBackground />
          <Projects />
        </ProjectsBlock>
        <ContactMeBlock>
          <ContactMe />
          <ContactMeBackground />
        </ContactMeBlock>
      </React.Fragment>
    );
  }
}

export default IndexPage;
