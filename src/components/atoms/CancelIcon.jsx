// @flow
import React from 'react';
import CancelImage from './cancel.svg';

type Props = {
  width?: number,
  height?: number,
};

const CancelIcon = ({ width, height }: Props) => <CancelImage width={width} height={height} />;
CancelIcon.defaultProps = {
  width: 25,
  height: 25,
};

export default CancelIcon;
