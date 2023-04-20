import React from "react";
import { Layout, theme } from "antd";

const { Header, Content } = Layout;

const headerStyle = {
  top: 0,
  zIndex: 1,
  width: "100%",
  color: "white",
  paddingLeft: "36px",
};

interface Props {
  children: React.ReactNode;
}

const CustomLayout: React.FC<Props> = ({ children }) => {
  const { token } = theme.useToken();
  return (
    <Layout>
      <Header
        style={{
          ...headerStyle,
          position: "sticky",
          backgroundColor: token.colorPrimary,
        }}
        role="heading"
      >
        Covid Metrics
      </Header>
      <Content
        className="site-layout"
        style={{
          padding: "36px",
          minHeight: "calc(100vh - 64px)",
          backgroundColor: "white",
        }}
      >
        {children}
      </Content>
    </Layout>
  );
};

export default CustomLayout;
