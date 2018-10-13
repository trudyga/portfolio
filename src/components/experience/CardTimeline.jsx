/* eslint-disable */
import React from 'react';
import styled, { css } from 'styled-components';

const Timeline = styled.div`
  height: 100%;
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  flex-direction: row;
`;

const Card = styled.div`
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  justify-content: center;
  align-content: center;

  position: absolute;
  top: 0;
  left: 10vw;
  width: 80%;
  height: 90%;
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
  border-radius: 10px;

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

const DimBackground = styled.div`
  position: absolute;
  height: 100%;
  width: 100%;
  top: 0;
  left: 0;
  border-radius: 10px;
  ${props =>
    props.background &&
    css`
      background: ${props.background};
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

class CardTimeline extends React.Component {
  state = {
    items: [
      {
        key: 1,
        year: '2015',
        tag: 'university',
      },
      {
        key: 2,
        year: '2015',
        tag: 'university',
      },
      {
        key: 3,
        year: '2015',
        tag: 'university',
      },
      {
        key: 4,
        year: '2015',
        tag: 'university',
      },
      {
        key: 5,
        year: '2015',
        tag: 'university',
      },
    ],
    topItem: {
      key: 1,
    },
  };

  render() {
    const { items, topItem } = this.state;
    return (
      <Timeline>
        {/* {items.map(({ key, year, tag }) => (
          <Card
            key={key}
            style={{ left: `${10 + Math.abs(key - topItem.key)}%`, zIndex: -1 * Math.abs(topItem.key - key) }}
          >
            <BackgroundImage background="public/images/bookShelf.jpeg" />
            <Year>{year}</Year>
            <Tag>{tag}</Tag>
            <Description>
              lskdjf lskdjflskj lskdfj lskdjf lsdkfj;alksdfja;ls kjfl;kajf ;lkdsj ;las djklsdj ;la
              flas jf;l
            </Description>
          </Card>
        ))} */}

        <Card style={{ left: '3%', zIndex: -2 }}>
          <DimBackground background="rgba(150, 150, 150, 0.9)" />
          <BackgroundImage background="public/images/bookShelf.jpeg" />
          <Year>2015</Year>
          <Tag>University</Tag>
        </Card>
        <Card style={{ left: '5%', zIndex: -1 }}>
          <DimBackground background="rgba(200, 200, 200, 0.9)" />
          <BackgroundImage background="public/images/bookShelf.jpeg" />
          <Year>2015</Year>
          <Tag>University</Tag>
        </Card>
        <Card style={{ zIndex: 1 }}>
          <BackgroundImage background="public/images/bookShelf.jpeg" />
          <Year>2015</Year>
          <Tag>University</Tag>
        </Card>
        <Card style={{ left: '15%', zIndex: -1 }}>
          <DimBackground background="rgba(200, 200, 200, 0.9)" />
          <BackgroundImage background="public/images/bookShelf.jpeg" />
          <Year>2015</Year>
          <Tag>University</Tag>
        </Card>
        <Card style={{ left: '18%', zIndex: -2 }}>
          <DimBackground background="rgba(150, 150, 150, 0.9)" />
          <BackgroundImage background="public/images/bookShelf.jpeg" />
          <Year>2015</Year>
          <Tag>University</Tag>
        </Card>
      </Timeline>
    );
  }
}

export default CardTimeline;
