import styled, { css } from 'styled-components';

const Link = styled.a`
  display: flex;
  justify-content: center;
  align-content: center;
  cursor: pointer;
  text-decoration: none;
  color: #03ffd1;

  ${props =>
    props.bordered &&
    css`
      border: 1px solid #03ffd1;
      border-radius: 5%;
      padding: 10px 20px;
      margin: 10px;
    `};

  transition-property: color, border;
  transition-duration: 0.3s;
  transition-timing-function: ease-out;

  :hover {
    color: #e83b6c;
    border-color: #e83b6c;
  }
`;

export default Link;
