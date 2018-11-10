// @flow
import React from 'react';
import type { Node } from 'react';
import styled from 'styled-components';
import { Tag } from 'antd';

const TimelineContentBox = styled.div`
  padding: 10px;
  border-radius: 3px;

  min-height: 100px;
  background: #333;
`;

const Headline = styled.h3`
  color: white;
  font-size: 20px;
  margin-bottom: 0.5em;
`;

const Info = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  box-shadow: inset 1px 2px 4px #111;
  border-radius: 4px;
  margin-bottom: 0.5em 0;

  color: white;
  background-color: #222;
  border: 1px solid #222;

  @media screen and (max-width: 500px) {
    flex-direction: column;
  }
`;

const Position = styled.span`
  padding-left: 0.5em;
  line-height: 2rem;
  height: 2rem;
  flex: 1;
`;

const TimeSpan = styled.span`
  padding-left: 0.5em;
  line-height: 2rem;
  height: 2rem;
  flex: 1;
`;

const Description = styled.div`
  color: #ddd;
  text-align: justify;
  margin: 0.5em 0;

  @media only screen and (max-width: 600px) {
    text-align: left;
  }
`;

const Tags = styled.div`
  color: white;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  margin: 0.5em 0;
`;

type TagType = {
  id: number,
  value: string,
};

type Props = {
  headline: string,
  position: Node | null,
  timespan: string,
  description: Node,
  tags: Array<TagType>,
  icon: Node,
};

const TimelineContent = ({ headline, position, timespan, description, tags, icon }: Props) => (
  <TimelineContentBox>
    <Headline>{headline}</Headline>
    <Info>
      {position && (
        <Position>
          {icon}
          <span>
            &ensp;
            {position}
          </span>
        </Position>
      )}
      <TimeSpan>{timespan}</TimeSpan>
    </Info>
    <Description>{description}</Description>
    <Tags>
      {tags.map(({ id, value }) => (
        <Tag key={id} style={{ marginBottom: '10px' }} color="#e83b6c">
          {value}
        </Tag>
      ))}
    </Tags>
  </TimelineContentBox>
);

export default TimelineContent;
