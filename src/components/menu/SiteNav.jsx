// @flow
import React, { Component } from 'react';
import { Redirect, withRouter } from 'react-router-dom';
import { Icon } from 'antd';
import styled, { css } from 'styled-components';
import { FormattedMessage } from 'react-intl';
import MenuIcon from '../atoms/MenuIcon';
import CancelIcon from '../atoms/CancelIcon';
import Link from '../atoms/Link';

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
      fill: #03ffd1;
      color: #03ffd1;
    `};

  :hover {
    ${props =>
      props.hoverable &&
      css`
        fill: #e83b6c;
        color: #e83b6c;
      `};
  }
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

const MenuItemIcon = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ExpandedMenu = styled.div`
  background: black;
  position: fixed;
  bottom: 0;
  right: 0;
  z-index: 9999;
  height: 100%;
  overflow: hidden;

  transition: all 0.3s ease-out;

  width: ${props => (props.expanded ? '100%' : '0')};
  max-width: ${props => (props.expanded ? '100%' : '0')};
`;

const ExpandedMenuControls = styled.div`
  width: 100%;
  padding: 0 1em;
  position: absolute;
  top: 0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

const ExpandedMenuItems = styled.div`
  position: relative;
  top: 50%;
  height: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;
`;

type Props = {
  transparentBackground?: boolean,
  collapsed?: boolean,
  onExpand?: () => void,
  onShrink?: () => void,
};

type State = {
  current: string,
  redirectToLocale: string,
  isExpanded: boolean,
};

class SiteNav extends Component<Props, State> {
  static defaultProps = {
    transparentBackground: false,
    collapsed: false,
    onExpand: () => {},
    onShrink: () => {},
  };

  state = {
    current: '',
    redirectToLocale: '',
    isExpanded: false,
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

  toggleMenu = () => {
    const { onShrink, onExpand } = this.props;
    this.setState(({ isExpanded }) => {
      if (isExpanded) {
        onShrink();
      } else {
        onExpand();
      }

      return {
        isExpanded: !isExpanded,
      };
    });
  };

  hideMenu = () => {
    const { onShrink } = this.props;

    this.setState({
      isExpanded: false,
    });

    onShrink();
  };

  render() {
    const { transparentBackground, collapsed } = this.props;
    const { current, redirectToLocale, isExpanded } = this.state;

    return (
      <MenuContainer>
        <StyledMenu
          onClick={this.handleClick}
          selectedKeys={[current]}
          inlineCollapsed={collapsed}
          transparentBackground={transparentBackground}
        >
          <MenuItem selected onClick={this.toggleMenu}>
            {/* <Icon style={{ fontSize: '25px' }} type="menu-fold" theme="outlined" /> */}
            <MenuItemIcon selected>{isExpanded ? <CancelIcon /> : <MenuIcon />}</MenuItemIcon>
            <MenuItemText>
              {isExpanded ? (
                <FormattedMessage id="Menu.Hide.ButtonText" defaultMessage="Close" />
              ) : (
                <FormattedMessage id="Menu.Open.ButtonText" defaultMessage="Menu" />
              )}
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
        <ExpandedMenu expanded={isExpanded}>
          <ExpandedMenuControls>
            <MenuItem selected onClick={this.toggleMenu}>
              <MenuItemIcon>
                <CancelIcon />
              </MenuItemIcon>
              <MenuItemText>
                <FormattedMessage id="Menu.Hide.ButtonText" defaultMessage="Close" />
              </MenuItemText>
            </MenuItem>
          </ExpandedMenuControls>
          <ExpandedMenuItems>
            <MenuItem selected hoverable>
              <Link href="#aboutMe" onClick={this.hideMenu}>
                <MenuItemText>
                  <FormattedMessage id="Menu.Items.AboutMe" defaultMessage="About Me" />
                </MenuItemText>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link href="#experience" onClick={this.hideMenu}>
                <MenuItemText selected hoverable>
                  <FormattedMessage id="Menu.Items.Experience" defaultMessage="Experience" />
                </MenuItemText>
              </Link>
            </MenuItem>
            <MenuItem>
              <Link href="#projects" onClick={this.hideMenu}>
                <MenuItemText selected hoverable>
                  <FormattedMessage id="Menu.Items.Projects" defaultMessage="Projects" />
                </MenuItemText>
              </Link>
            </MenuItem>
          </ExpandedMenuItems>
        </ExpandedMenu>
      </MenuContainer>
    );
  }
}

export default withRouter(SiteNav);
