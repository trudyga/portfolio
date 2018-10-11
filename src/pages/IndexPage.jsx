// @flow

import React, { Component } from 'react';
import { Layout } from 'antd';
import styled from 'styled-components';
import Scene from '../components/background/Scene';
import SiteNav from '../components/menu/SiteNav';

const { Content, Sider } = Layout;

const FullScreenLayout = styled(Layout)`
  height: 100%;
  width: 100%;
`;

const FullScreenScene = styled(Scene)`
  position: absolute;
  top: 0;
  left: 0;
`;

const StyledContent = styled(Content)`
  max-width: 1000px;
  margin: 0 auto;
  background: transparent;
  z-index: 1;
`;

const TransparentSider = styled(Sider)`
  background: transparent;
`;

const CenteredWrapper = styled.div`
  position: relative;
  display: flex;
  height: 100%;
  flex-direction: column;
  justify-content: center;
`;

const IntroductoryMessage = styled.div`
  margin-left: 20px;
`;

const HeadlineMessage = styled.div`
  display: inline-block;
  min-height: 90px;
`;
const FirstWord = styled.div`
  position: relative;
  display: inline-block;
`;

const BackdropText = styled.i`
  font-family: 'Oleo Script Swash Caps', cursive;
  position: absolute;
  color: rgba(255, 255, 255, 0.3);
  font-size: 75px;
`;

const PrimaryText = styled.span`
  font-family: 'Gabriela', serif;
  color: white
  position: relative;
  top: 45px;
  font-size: 25px;
  left: 2em;
  text-transform: uppercase;
`;

const DescriptionText = styled.p`
  margin: 0;
  font-family: 'Gabriela', serif;
  color: white
  font-size: 25px;
`;

type Props = {};

type State = {
  menuCollapsed: boolean,
};

class IndexPage extends Component<Props, State> {
  state = {
    menuCollapsed: true,
  };

  collapseMenu = (collapsed: boolean) => {
    this.setState(() => ({
      menuCollapsed: collapsed,
    }));
  };

  render() {
    const { menuCollapsed } = this.state;

    return (
      <FullScreenLayout style={{ flexDirection: 'row-reverse' }}>
        <FullScreenScene />
        <TransparentSider
          theme="dark"
          collapsible={false}
          collapsed={menuCollapsed}
          onCollapse={this.collapseMenu}
        >
          <SiteNav transparentBackground collapsed={menuCollapsed} />
        </TransparentSider>
        <StyledContent style={{ background: 'transparent' }}>
          <CenteredWrapper>
            <IntroductoryMessage>
              <HeadlineMessage>
                <FirstWord>
                  <BackdropText>Hello</BackdropText>
                  <PrimaryText>Hello</PrimaryText>
                </FirstWord>
              </HeadlineMessage>
              <DescriptionText>My name is Vladislav Sereda.</DescriptionText>
              <DescriptionText>
                {`
                  I'm Web developer.
                `}
              </DescriptionText>
            </IntroductoryMessage>
          </CenteredWrapper>
        </StyledContent>
      </FullScreenLayout>
    );
  }
}

export default IndexPage;
