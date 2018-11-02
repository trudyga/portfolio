// @flow
import React from 'react';
import MenuImage from './menu.svg';

type Props = {
  width?: number,
  height?: number,
};

const MenuIcon = ({ width, height }: Props) => <MenuImage width={width} height={height} />;
MenuIcon.defaultProps = {
  width: 25,
  height: 25,
};

export default MenuIcon;
