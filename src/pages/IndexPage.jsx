// @flow
import React, { Component } from 'react';
import styled from 'styled-components';
import posed from 'react-pose';
import { throttle } from 'throttle-debounce';
import Introduction from '../components/introduction/Introduction';
import InlineNav from '../components/menu/InlineNav';
import AboutMe from '../components/me/AboutMe';
import ContactMe from '../components/me/ContactMe';
import Experience from '../components/experience/VerticalTimeline';
import Projects from '../components/projects/Projects';

const Page = styled.div`
  background: #222;
`;

const TransparentHeader = styled.div`
  box-shadow: 10px 0 5px black;
  display: block;
  background: #333;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 1;
  overflow: hidden;
`;

const IntroductionBlock = styled.div`
  height: 100vh;
  width: 100%;
`;

const AboutMeBlock = styled.div`
  position: relative;
  padding: 300px 0;
  @media only screen and (min-width: 900px) {
    padding: 50vh 0;
  }

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
  margin-bottom: -200px;
  background: transparent;
  padding: 10vh 0;
  z-index: 0;
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
  background: transparent;
  padding: 2em 0;
  z-index: 0;
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

const AnimatedHeader = posed(TransparentHeader)({
  visible: {
    opacity: 1,
    height: 'auto',
    transition: {
      duration: 300,
    },
  },
  hidden: {
    opacity: 0,
    height: 0,
    transition: {
      duration: 300,
    },
  },
});

function parallaxBlock(element: HTMLElement, styles, parallaxSettings: Object) {
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

function isAnyPartOfElementInViewport(el: HTMLElement) {
  const rect = el.getBoundingClientRect();
  const windowHeight = window.innerHeight || document.documentElement.clientHeight;
  const windowWidth = window.innerWidth || document.documentElement.clientWidth;

  const vertInView = rect.top < windowHeight && rect.top + rect.height > 0;
  const horInView = rect.left <= windowWidth && rect.left + rect.width >= 0;

  return vertInView && horInView;
}

function getScreenVerticalTakenPlace(el?: HTMLElement) {
  if (!el) return 0;
  const rect = el.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  const top = Math.min(rect.top < 0 ? 0 : rect.top, windowHeight);
  const bottom = Math.min(rect.bottom > windowHeight ? windowHeight : rect.bottom, windowHeight);

  return (bottom - top) / windowHeight;
}

type Props = {};

type State = {
  displayTopNav: boolean,
  currentBlock: 'about' | 'experience' | 'projects',
};

class IndexPage extends Component<Props, State> {
  introductionBlock: ?HTMLElement = null;

  aboutMeBlock: ?HTMLElement = null;

  projectsBlock: ?HTMLElement = null;

  expBack: ?HTMLElement = null;

  state = {
    displayTopNav: false,
    currentBlock: 'about',
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
    const throttledCurrentBlockDetection = throttle(200, this.detectCurrentBlock);
    const throttledToggleTopMenu = throttle(200, this.toggleTopMenu);
    window.addEventListener('scroll', this.parallaxExperience);
    window.addEventListener('scroll', () => {
      throttledCurrentBlockDetection();
      throttledToggleTopMenu();
    });
  }

  parallaxExperience = () => {
    if (this.expBack) {
      parallaxBlock(this.expBack, window.getComputedStyle(this.expBack), this.parallax.expBlock);
    }

    if (!this.parallax.ticking) {
      window.requestAnimationFrame(() => {
        this.parallax.ticking = false;
      });

      this.parallax.ticking = false;
    }
  };

  toggleTopMenu = () => {
    const { displayTopNav } = this.state;

    if (this.introductionBlock) {
      const needDisplayTopNav = !isAnyPartOfElementInViewport(this.introductionBlock);

      if (needDisplayTopNav !== displayTopNav) {
        this.setState({
          displayTopNav: needDisplayTopNav,
        });
      }
    }
  };

  detectCurrentBlock = () => {
    const { currentBlock } = this.state;

    if (this.expBack && this.aboutMeBlock && this.projectsBlock) {
      const items = [
        {
          name: 'about',
          value: getScreenVerticalTakenPlace(this.aboutMeBlock),
        },
        {
          name: 'experience',
          value: getScreenVerticalTakenPlace(this.expBack),
        },
        {
          name: 'projects',
          value: getScreenVerticalTakenPlace(this.projectsBlock),
        },
      ].sort((l, r) => r.value - l.value);

      const newCurrentBlock = items[0].name;

      if (newCurrentBlock !== currentBlock) {
        this.setState({
          currentBlock: newCurrentBlock,
        });
      }
    }
  };

  render() {
    const { displayTopNav, currentBlock } = this.state;
    return (
      <Page>
        <AnimatedHeader pose={displayTopNav ? 'visible' : 'hidden'} key="introduction">
          <InlineNav currentBlock={currentBlock} />
        </AnimatedHeader>
        <IntroductionBlock
          innerRef={mount => {
            this.introductionBlock = mount;
          }}
        >
          <Introduction />
        </IntroductionBlock>

        <AboutMeBlock
          id="aboutMe"
          innerRef={mount => {
            this.aboutMeBlock = mount;
          }}
        >
          <AboutMe />
        </AboutMeBlock>
        <ExperienceBlock
          innerRef={mount => {
            this.expBack = mount;
          }}
        >
          <ExperienceBackground id="experience" />
          <Experience />
        </ExperienceBlock>
        <ProjectsBlock
          innerRef={mount => {
            this.projectsBlock = mount;
          }}
          id="projects"
        >
          <ProjectsBackground />
          <Projects />
        </ProjectsBlock>
        <ContactMeBlock>
          <ContactMe />
          <ContactMeBackground />
        </ContactMeBlock>
      </Page>
    );
  }
}

export default IndexPage;
