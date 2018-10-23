import React from 'react';
import styled, { css } from 'styled-components';
import Skillset from '../components/skills/Skillset';

const Container = styled.div`
  position: relative;
  min-height: 100vh;
  width: 100%;

  ${props =>
    props.background &&
    css`
      background-color: ${props.background};
    `};

  transition-property: background-color;
  transition-delay: 0.5s;
`;

const Skillroad = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100%;
  display: block;

  ${props =>
    props.background &&
    css`
      background-color: ${props.background};
    `};

  transition: all 0.5s ease-in-out;
`;

const FrontEnd = styled(Skillroad)`
  -webkit-clip-path: polygon(100% 0, 100% 0, 0 0, 0 100%, 0 100%);
  clip-path: polygon(100% 0, 100% 0, 0 0, 0 100%, 0 100%);

  ${props =>
    props.hide &&
    css`
      -webkit-clip-path: polygon(15% 0, 15% 0, 0 0, 0 15%, 0 15%);
      clip-path: polygon(15% 0, 15% 0, 0 0, 0 15%, 0 15%);
      z-index: 1;
    `};

  ${props =>
    props.fullscreen &&
    css`
      -webkit-clip-path: unset;
      clip-path: unset;
    `};
  /* background: #d6d6d6; */
`;

const BackEnd = styled(Skillroad)`
  -webkit-clip-path: polygon(100% 0, 100% 0, 100% 100%, 0 100%, 0 100%);
  clip-path: polygon(100% 0, 100% 0, 100% 100%, 0 100%, 0 100%);

  ${props =>
    props.hide &&
    css`
      -webkit-clip-path: polygon(100% 85%, 100% 85%, 100% 100%, 85% 100%, 85% 100%);
      clip-path: polygon(100% 85%, 100% 85%, 100% 100%, 85% 100%, 85% 100%);
      z-index: 1;
    `};

  ${props =>
    props.fullscreen &&
    css`
      -webkit-clip-path: polygon(15% 0, 100% 0, 100% 100%, 0 100%, 0 15%);
      clip-path: polygon(15% 0, 100% 0, 100% 100%, 0 100%, 0 15%);
    `};
  /* background: #212121; */
`;

const RoadContent = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const FrontEndContent = styled(RoadContent)`
  position: relative;
  left: 0;
  width: 50%;

  ${props =>
    props.expand &&
    css`
      width: 100%;
    `};
  transition: all 0.5s ease-in-out;
`;

const BackEndContent = styled(RoadContent)`
  position: relative;
  left: 50%;
  width: 50%;

  ${props =>
    props.expand &&
    css`
      left: 0;
      width: 100%;
    `};
  transition: all 0.5s ease-in-out;
`;

const SkillroadTitle = styled.h2`
  display: inline-block;
  font-size: 20px;
  line-height: 1.8em;
  letter-spacing: 0.2em;
  text-align: center;
  text-transform: uppercase;
`;

const SkillroadTitleWhite = styled(SkillroadTitle)`
  color: white;
`;

class Skills extends React.Component {
  state = {
    road: '',
  };

  changeRoad = road => () => {
    this.setState({
      road,
    });
  };

  render() {
    const { road } = this.state;
    const light = '#fff';
    const dark = '#212121';
    return (
      <React.Fragment>
        <Container background={road === 'front' ? light : dark}>
          <FrontEnd
            background={light}
            onClick={this.changeRoad('front')}
            hide={road === 'back'}
            fullscreen={road === 'front'}
          >
            <FrontEndContent expand={road === 'front'}>
              <SkillroadTitle>Front End</SkillroadTitle>
            </FrontEndContent>
          </FrontEnd>
          <BackEnd
            background={dark}
            onClick={this.changeRoad('back')}
            hide={road === 'front'}
            fullscreen={road === 'back'}
          >
            <BackEndContent expand={road === 'back'}>
              <SkillroadTitleWhite>Back End</SkillroadTitleWhite>
            </BackEndContent>
          </BackEnd>
        </Container>
        {road === 'front' && <Skillset style={{ backgruond: light }} />}
      </React.Fragment>
    );
  }
}

export default Skills;
