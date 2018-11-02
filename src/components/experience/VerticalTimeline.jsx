import React from 'react';
import styled, { css } from 'styled-components';
import posed, { PoseGroup } from 'react-pose';
import { Icon } from 'antd';
import { Watch } from 'scrollmonitor-react';

import { FormattedMessage } from 'react-intl';
import Title from '../atoms/BlockTitle';
import TimelineContent from './TimelineContent';

const Container = styled.div`
  position: relative;
  max-width: 1080px;
  width: 90%;
  margin: 0 auto;
`;

const Timeline = styled.div`
  position: relative;
`;

const TimelineLine = styled.div`
  position: absolute;
  top: -20%;
  left: 20px;
  height: 140%;
  width: 4px;
  background: #e83b6c;

  @media screen and (min-width: 1000px) {
    top: 0;
    left: 50%;
  }
`;

const TimelineItem = styled.div`
  position: relative;
  display: block;

  :first-child {
    padding-top: 10px;
  }

  :last-child {
    padding-bottom: 10px;
  }

  @media only screen and (max-width: 1000px) {
    position: relative;
    display: block;

    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 20px;
    padding-left: 30px;

    ::after {
      content: '';
      position: absolute;
      top: 18px;
      left: 23px;
      width: 0;
      height: 0;
      border-top: 7px solid transparent;
      border-bottom: 7px solid transparent;

      border-right: 7px solid #333;
    }
  }

  @media only screen and (min-width: 1000px) {
    max-width: 50%;
    margin: 0;

    :nth-child(odd) {
      padding-left: 33px;
      left: 50%;

      ::after {
        content: '';
        position: absolute;
        top: 18px;
        left: 26px;
        rigth: unset;
        width: 0;
        height: 0;
        border-top: 7px solid transparent;
        border-bottom: 7px solid transparent;
        border-left: unset;
        border-right: 7px solid #333;
      }
    }

    :nth-child(even) {
      padding-right: 30px;
      left: 0;

      ::after {
        content: '';
        position: absolute;
        top: 18px;
        left: unset;
        right: 23px;
        width: 0;
        height: 0;
        border-top: 7px solid transparent;
        border-bottom: 7px solid transparent;
        border-left: 7px solid #333;
        border-right: unset;
      }
    }
  }
`;

const TimelineCircle = styled.div`
  position: absolute;
  display: block;
  width: 20px;
  height: 20px;
  background: #e83b6c;

  border-width: 3px;
  border-style: solid;
  border-color: #ff749b;
  border-radius: 50%;
  top: 15px;
  left: -8px;

  @media screen and (min-width: 1000px) {
    ${props =>
      props.left
        ? css`
            left: unset;
            right: -12px;
          `
        : css`
            left: -8px;
            right: unset;
          `};
  }
`;

const StyledTitle = styled(Title)`
  position: absolute;
  top: -30%;
  width: 100%;
`;

const AnimatedTimelineLine = posed(TimelineLine)({
  viewable: {
    top: '-20%',
    height: '140%',
    transition: {
      duration: 1000,
      ease: 'easeInOut',
    },
  },
  hidden: {
    height: 0,
  },
});

const AnimatedTimelineCircle = posed(TimelineCircle)({
  viewable: {
    opacity: 1,
    transition: ({ i }) => ({ delay: (i + 1) * 500 }),
  },
  hidden: {
    opacity: 0,
  },
});

const AnimatedTimelineItem = posed(TimelineItem)({
  viewable: {
    opacity: 1,
    transition: ({ i }) => ({ delay: (i + 1) * 500 }),
  },
  hidden: {
    opacity: 0,
  },
});

type State = {
  viewable: boolean,
  items: Array<Object>,
};

type Props = {
  isInViewport: boolean, // eslint-disable-line
};

class VerticalTimeline extends React.Component<Props, State> {
  static getDerivedStateFromProps(props: Props, state: State) {
    if (props.isInViewport && !state.viewable) {
      return Object.assign({
        ...state,
        viewable: props.isInViewport,
      });
    }

    return null;
  }

  state = {
    viewable: false,
    items: [
      {
        id: 1,
        headline: 'National Aviation University',
        position: 'Student',
        timespan: 'September 2015 - Present',
        description: `Студент четвертого курса специальности "Инженерия програмного обеспечения" Национального Авиационного Университета`,
        tags: [
          {
            id: 1,
            value: 'Software Development Faculty',
          },
        ],
        icon: <Icon style={{ fontSize: '1em' }} type="read" theme="outlined" />,
      },
      {
        id: 2,
        headline: 'Inzite LTD',
        position: 'Full Stack Web Developer',
        timespan: 'October 2017 - August 2018',
        description: `Я был членом команды разработки,
        выполняя работы по улучшению функционала сервиса, а также реализации новых возможностей
        веб-платформы.`,
        tags: [
          {
            id: 1,
            value: 'JavaScript',
          },
          {
            id: 2,
            value: 'Node.js',
          },
          {
            id: 3,
            value: 'Mongo DB',
          },
          {
            id: 4,
            value: 'Angular.js',
          },
        ],
        icon: <Icon style={{ fontSize: '1em' }} type="idcard" theme="outlined" />,
      },
      {
        id: 3,
        headline: 'Self Improvement',
        position: 'None',
        timespan: 'September 2018 - Present',
        description: `Изучение веб-технологий и реализация веб-приложений на их основе.`,
        tags: [
          {
            id: 1,
            value: 'React',
          },
          {
            id: 2,
            value: 'GraphQL',
          },
          {
            id: 3,
            value: 'Three.js',
          },
        ],
        icon: <Icon style={{ fontSize: '1em' }} type="rocket" theme="outlined" />,
      },
    ],
  };

  render() {
    const { viewable, items } = this.state;

    return (
      <Container>
        <StyledTitle>
          <FormattedMessage id="Experience.SectionTitle" defaultMessage="Experience" />
        </StyledTitle>
        <Timeline
          innerRef={el => {
            this.timeline = el;
          }}
        >
          <AnimatedTimelineLine pose={viewable ? 'viewable' : 'hidden'} />
          <PoseGroup>
            {items.map(item => (
              <AnimatedTimelineItem
                pose={viewable ? 'viewable' : 'hidden'}
                key={item.id}
                i={item.id}
              >
                <AnimatedTimelineCircle
                  pose={viewable ? 'viewable' : 'hidden'}
                  i={item.id}
                  left={item.id % 2 === 1}
                />
                <TimelineContent
                  headline={item.headline}
                  position={item.position}
                  timespan={item.timespan}
                  description={item.description}
                  icon={item.icon}
                  tags={item.tags}
                />
              </AnimatedTimelineItem>
            ))}
          </PoseGroup>
        </Timeline>
      </Container>
    );
  }
}

export default Watch(VerticalTimeline);
