// @flow

import React from 'react';
import styled from 'styled-components';
import { FormattedMessage } from 'react-intl';
import { Layout } from 'antd';
import WebGL from '../background/utils/WebGL';
import Scene from '../background/Scene';
import SiteNav from '../menu/SiteNav';

const { Content, Sider } = Layout;

const FullScreenLayout = styled(Layout)`
  height: 100%;
  width: 100%;
  background: black !important;
`;

const FullScreenScene = styled(Scene)`
  position: absolute;
  top: 0;
  left: 0;
  z-index: -1;
`;

const FullScreenPlaceholder = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  height: 100vh;
  width: 100vh;
  z-index: -1;
  background: black;
`;

const StyledContent = styled(Content)`
  max-width: 1000px;
  margin: 0 auto;
  background: transparent;
`;

const TransparentSider = styled(Sider)`
  background: transparent !important;
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

class Introduction extends React.PureComponent<Props, State> {
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
    const isWebGL2Available = WebGL.isWebGL2Available();

    return (
      <FullScreenLayout style={{ flexDirection: 'row-reverse' }}>
        {isWebGL2Available ? <FullScreenScene /> : <FullScreenPlaceholder />}
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
                  <BackdropText>
                    <FormattedMessage id="IndexPage.Welcome.Backdrop" defaultMessage="Hello" />
                  </BackdropText>
                  <PrimaryText>
                    <FormattedMessage id="IndexPage.Welcome.Title" defaultMessage="Hello" />
                  </PrimaryText>
                </FirstWord>
              </HeadlineMessage>
              <DescriptionText>
                <FormattedMessage
                  id="IndexPage.Welcome.Description.Name"
                  defaultMessage="My name is Vladislav Sereda."
                />
              </DescriptionText>
              <DescriptionText>
                <FormattedMessage
                  id="IndexPage.Welcome.Description.Role"
                  defaultMessage="I'm Web developer."
                />
              </DescriptionText>
            </IntroductoryMessage>
          </CenteredWrapper>
        </StyledContent>
      </FullScreenLayout>
    );
  }
}

export default Introduction;
