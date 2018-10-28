// @flow
import React, { Component } from 'react';
import { Icon } from 'antd';
import styled, { css } from 'styled-components';

const MenuContainer = styled.div`
  position: relative;
  background: transparent;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
`;

const StyledMenu = styled.div`
  min-width: 80px;

  ${props =>
    props.transparentBackground &&
    css`
      background: transparent;
    `};
`;

const MenuItem = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-content: center;
  flex-wrap: wrap;
  color: white;
  cursor: pointer;
  margin: 10px 0;

  ${props =>
    props.selected &&
    css`
      color: #03ffd1;
    `};
`;

const TopStyledMenu = styled(StyledMenu)`
  position: absolute;
  width: 50%;
  top: 0;
  right: 0;
`;

const BottomStyledMenu = styled(StyledMenu)`
  position: absolute;
  width: 50%;
  bottom: 0;
  right: 0;
`;

const MenuItemText = styled.div`
  font-family: 'Gabriela', serif;
  text-transform: uppercase;
  text-align: center;
`;

type Props = {
  transparentBackground?: boolean,
  collapsed?: boolean,
};

type State = {
  current: string,
};

class SiteNav extends Component<Props, State> {
  static defaultProps = {
    transparentBackground: false,
    collapsed: false,
  };

  state = {
    current: '',
  };

  handleClick = e => {
    this.setState({
      current: e.key,
    });
  };

  render() {
    const { transparentBackground, collapsed } = this.props;
    const { current } = this.state;

    return (
      <MenuContainer>
        <StyledMenu
          onClick={this.handleClick}
          selectedKeys={[current]}
          inlineCollapsed={collapsed}
          transparentBackground={transparentBackground}
        >
          <MenuItem selected>
            <Icon style={{ fontSize: '25px' }} type="menu-fold" theme="outlined" />
            <MenuItemText>Menu</MenuItemText>
          </MenuItem>
        </StyledMenu>
        <TopStyledMenu>
          <a href="https://github.com/trudyga" rel="noopener noreferrer" target="_blank">
            <MenuItem selected>
              <Icon style={{ fontSize: '25px' }} type="github" theme="outlined" />
            </MenuItem>
          </a>
          <a href="https://www.linkedin.com/in/trudyga/" rel="noopener noreferrer" target="_blank">
            <MenuItem selected>
              <Icon style={{ fontSize: '25px' }} type="linkedin" theme="outlined" />
            </MenuItem>
          </a>
        </TopStyledMenu>
        <BottomStyledMenu>
          <MenuItem selected>
            <MenuItemText>EN</MenuItemText>
          </MenuItem>
          <MenuItem>
            <MenuItemText>RU</MenuItemText>
          </MenuItem>
        </BottomStyledMenu>
      </MenuContainer>
    );
  }
}

export default SiteNav;
