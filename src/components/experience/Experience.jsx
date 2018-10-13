import React from 'react';
import VerticalTimeline from './VerticalTimeline';

class Experience extends React.Component {
  state = {
    hovering: false,
  };

  render() {
    const { hovering } = this.state; // eslint-disable-line
    return <VerticalTimeline />;
  }
}

export default Experience;
