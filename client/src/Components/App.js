import React from "react";
import "antd/dist/antd.css";
import "../App.css";
import { Layout } from "antd";
import HeaderComponent from "./HeaderComponent/HeaderComponent";
import ContentContainer from "./ContentContainer/ContentContainer";

const App = () => {
  return (
    <Layout>
      <HeaderComponent />
      <Layout style={{ marginTop: 64 }}>
        <ContentContainer />
      </Layout>
    </Layout>
  );
};

export default React.memo(App);
