import React, { useEffect } from "react";
import "antd/dist/antd.css";
import "../App.css";
import { Layout } from "antd";
import HeaderComponent from "./HeaderComponent/HeaderComponent";
import ContentContainer from "./ContentContainer/ContentContainer";
import { useAuth0 } from "@auth0/auth0-react";
import { BrowserRouter } from "react-router-dom";
import Authorization from "./Authorization";

const App = () => {
  const { isAuthenticated } = useAuth0();
  return (
    <BrowserRouter>
      <Layout>
        <HeaderComponent />

        <Layout
          style={{
            marginTop: 64,
          }}
        >
          {isAuthenticated && <Authorization />}
          <ContentContainer />
        </Layout>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
