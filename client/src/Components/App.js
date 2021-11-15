import React, { useEffect } from "react";
import "antd/dist/antd.css";
import "../App.css";
import { Layout } from "antd";
import HeaderComponent from "./HeaderComponent/HeaderComponent";
import ContentContainer from "./ContentContainer/ContentContainer";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { addUser, getAuth } from "../Redux/user-reducer";
import { BrowserRouter } from "react-router-dom";

const App = () => {
  const { user, isAuthenticated } = useAuth0();
  const dispatch = useDispatch();
  useEffect(() => {
    if (isAuthenticated) {
      const date = new Date();
      const newUser = {
        name: user.name,
        picture: user.picture,
        email: user.email,
        sub: user.sub,
        isOnline: date,
      };
      dispatch(addUser(newUser));
      dispatch(getAuth(user.sub));
    }
  }, [user, dispatch, isAuthenticated]);
  return (
    <BrowserRouter>
      <Layout>
        <HeaderComponent />
        <Layout style={{ marginTop: 64 }}>
          <ContentContainer />
        </Layout>
      </Layout>
    </BrowserRouter>
  );
};

export default App;
