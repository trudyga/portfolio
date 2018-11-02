import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import Link from '../atoms/Link';

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  align-items: center;

  max-width: 1080px;
  margin: 0 auto;

  @media only screen and (max-width: 500px) {
    flex-direction: column-reverse;
  }
`;

const Creator = styled.span`
  display: inline-block;
  color: white;
  font-size: 1em;
  padding-left: 10px;
  flex: 1;
`;

const Links = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: nowrap;
`;

const StyledLink = styled(Link)`
  padding: 10px;
  margin: 10px;
`;

const LinkText = styled.span`
  vertical-align: middle;
  font-size: 1em;

  :not(:last-child) {
    margin-right: 1em;
  }
`;

const ContactMe = () => (
  <Container>
    <Creator>© 2018 Sereda Vladislav</Creator>
    <Links>
      <StyledLink href="#resume" rel="noopener noreferrer" target="_blank">
        <LinkText>
          <FormattedMessage id="ContactMe.ResumeLink" defaultMessage="Resume" />
        </LinkText>
      </StyledLink>
      <StyledLink
        href="https://www.linkedin.com/in/trudyga/"
        rel="noopener noreferrer"
        target="_blank"
      >
        <LinkText>LinkedIn</LinkText>
      </StyledLink>
      <StyledLink href="mailto:trudygajs@gmail.com">
        <LinkText>
          <FormattedMessage id="ContactMe.EmailLink" defaultMessage="Email" />
        </LinkText>
      </StyledLink>
    </Links>
  </Container>
);

export default ContactMe;
