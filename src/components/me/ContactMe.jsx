import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';

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
  flex: 1;
`;

const Links = styled.div`
  display: flex;
  justify-content: flex-start;
  flex-wrap: nowrap;
`;

const Link = styled.a`
  display: flex;
  justify-content: center;
  align-content: center;

  cursor: pointer;
  text-decoration: none;
  color: #03ffd1;
  padding: 10px;
  margin: 10px;

  transition: color 0.3s ease-out;

  :hover {
    color: #e83b6c;
  }
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
      <Link href="#resume" rel="noopener noreferrer" target="_blank">
        <LinkText>
          <FormattedMessage id="ContactMe.ResumeLink" defaultMessage="Resume" />
        </LinkText>
      </Link>
      <Link href="https://www.linkedin.com/in/trudyga/" rel="noopener noreferrer" target="_blank">
        <LinkText>LinkedIn</LinkText>
      </Link>
      <Link href="mailto:trudygajs@gmail.com">
        <LinkText>
          <FormattedMessage id="ContactMe.EmailLink" defaultMessage="Email" />
        </LinkText>
      </Link>
    </Links>
  </Container>
);

export default ContactMe;
