import React from 'react';
import styled, { css } from 'styled-components';
import { FormattedMessage } from 'react-intl';
import Link from '../atoms/Link';

const Menu = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
`;

const MenuItem = styled.div`
  margin: 10px 20px;
  color: white;
  cursor: pointer;
  transition: color 0.3s ease-out;

  @media screen and (max-width: 500px) {
    margin: 10px;
  }
`;

const MenuItemText = styled.div`
  font-family: 'Gabriela', serif;
  text-transform: uppercase;
  text-align: center;
`;

const StyledLink = styled(Link)`
  color: white;

  ${props =>
    props.current &&
    css`
      color: #03ffd1;
    `};
`;

type Props = {
  currentBlock: 'about' | 'experience' | 'projects',
};

const InlineNav = ({ currentBlock }: Props) => (
  <Menu>
    <MenuItem>
      <StyledLink current={currentBlock === 'about'} href="#aboutMe">
        <MenuItemText>
          <FormattedMessage id="TopMenu.Items.AboutMe" defaultMessage="About Me" />
        </MenuItemText>
      </StyledLink>
    </MenuItem>
    <MenuItem>
      <StyledLink current={currentBlock === 'experience'} href="#experience">
        <MenuItemText>
          <FormattedMessage id="TopMenu.Items.Experience" defaultMessage="Experience" />
        </MenuItemText>
      </StyledLink>
    </MenuItem>
    <MenuItem>
      <StyledLink current={currentBlock === 'projects'} href="#projects">
        <MenuItemText>
          <FormattedMessage id="TopMenu.Items.Projects" defaultMessage="Projects" />
        </MenuItemText>
      </StyledLink>
    </MenuItem>
  </Menu>
);

export default InlineNav;
