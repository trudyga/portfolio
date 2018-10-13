import React from 'react';
import styled, { css } from 'styled-components';

const Timeline = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  height: 100%;
`;

const TimelineItem = styled.div`
  flex: 1;
  position: relative;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;

  background-color: rgba(20, 20, 20, 0.6);
  transition: background-color 0.5s ease-out;
  :hover {
    background-color: initial;
  }
`;

const BackgroundImage = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  z-index: -1;

  background-color: lightgray;
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  ${props =>
    props.background &&
    css`
      background-image: url(${props.background});
    `};
`;

const Year = styled.h1`
  font-family: 'Gabriela', serif;
  font-size: 25px;
  text-align: center;
  text-decoration: underline;
  text-transform: uppercase;
`;

const Tag = styled.i`
  font-size: 25px;
  text-align: center;
`;

const Description = styled.div`
  position: absolute;
  min-height: 300px;
  height: 100%;
  bottom: 0;
  left: 0;
`;

class TimelineContainer extends React.Component {
  state = {
    hovering: false,
  };

  render() {
    const { hovering } = this.state; // eslint-disable-line
    return (
      <Timeline>
        <TimelineItem>
          <BackgroundImage background="public/images/bookShelf.jpeg" />
          <Year>2015</Year>
          <Tag>University</Tag>
          <Description>
            lskdjf lskdjflskj lskdfj lskdjf lsdkfj;alksdfja;ls kjfl;kajf ;lkdsj ;las djklsdj ;la
            flas jf;l
          </Description>
        </TimelineItem>
        <TimelineItem>
          <Year>2017</Year>
          <Tag>Inzite Ltd.</Tag>
        </TimelineItem>
        <TimelineItem>
          <Year>2018</Year>
          <Tag>Self-improvement</Tag>
        </TimelineItem>
        <TimelineItem>
          <Year>Now</Year>
        </TimelineItem>
      </Timeline>
    );
  }
}

export default TimelineContainer;
