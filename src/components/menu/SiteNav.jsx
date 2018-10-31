// @flow
import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { Icon } from 'antd';
import styled, { css } from 'styled-components';
import { FormattedMessage } from 'react-intl';

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
  redirectToLocale: string,
};

class SiteNav extends Component<Props, State> {
  static defaultProps = {
    transparentBackground: false,
    collapsed: false,
  };

  state = {
    current: '',
    redirectToLocale: '',
  };

  handleClick = e => {
    this.setState({
      current: e.key,
    });
  };

  redirectToEn = () => {
    this.setState({
      redirectToLocale: 'en',
    });
  };

  redirectToRu = () => {
    this.setState({
      redirectToLocale: 'ru',
    });
  };

  render() {
    const { transparentBackground, collapsed } = this.props;
    const { current, redirectToLocale } = this.state;

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
            <MenuItemText>
              <FormattedMessage id="Menu.ButtonText" defaultMessage="Menu" />
            </MenuItemText>
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
          <MenuItem selected onClick={this.redirectToEn}>
            <MenuItemText>
              <FormattedMessage id="Menu.Language.EN" defaultMessage="EN" />
            </MenuItemText>
          </MenuItem>
          <MenuItem onClick={this.redirectToRu}>
            <MenuItemText>
              <FormattedMessage id="Menu.Language.RU" defaultMessage="RU" />
            </MenuItemText>
          </MenuItem>
          {redirectToLocale && <Redirect to={`/${redirectToLocale}`} />}
        </BottomStyledMenu>
      </MenuContainer>
    );
  }
}

export default withRouter(SiteNav);
