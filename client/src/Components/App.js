import React, { useEffect } from "react";
import "antd/dist/antd.css";
import "../App.css";
import { Layout } from "antd";
import HeaderComponent from "./HeaderComponent/HeaderComponent";
import ContentContainer from "./ContentContainer/ContentContainer";
import { useAuth0 } from "@auth0/auth0-react";
import { useDispatch } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import * as hooks from "../hooks/users";
import Loader from "./Loader/Loader";

const App = () => {
  const { user, isAuthenticated } = useAuth0();
  const { status, error, data, refetch } = hooks.useAuthUser(user?.sub);
  const addUser = hooks.useAddUser();
  useEffect(async () => {
    await refetch();
    if (data) {
      if (isAuthenticated && user.sub !== data.sub) {
        const date = new Date();
        const newUser = {
          name: user.name,
          picture: user.picture,
          email: user.email,
          sub: user.sub,
          isOnline: date,
        };
        await addUser.mutateAsync(newUser);
      }
    }
  }, [isAuthenticated]);
  return status === "loading" ? (
    <Loader />
  ) : status === "error" ? (
    error.message
  ) : (
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
