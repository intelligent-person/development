import React from "react";
import { Route, Switch } from "react-router-dom";
import { Layout } from "antd";
import Loader from "../Loader/Loader";

const HomeContainer = React.lazy(() => import("../Pages/Home/HomeContainer"));
const PostsContainer = React.lazy(() =>
  import("../Pages/Posts/PostsContainer")
);
const UsersContainer = React.lazy(() =>
  import("../Pages/Users/UsersContainer")
);
const ProfileContainer = React.lazy(() =>
  import("../Pages/Profile/ProfileContainer")
);

const ContentContainer = () => {
  return (
    <Layout style={{ padding: "0 24px 24px", marginTop: 0 }}>
      <React.Suspense fallback={<Loader />}>
        <Switch>
          <Route path={"/"} exact={true} component={HomeContainer} />
          <Route path={"/questions"} component={PostsContainer} />
          <Route path={"/users"} exact component={UsersContainer} />
          <Route path={"/user/:id"} component={ProfileContainer} />
        </Switch>
      </React.Suspense>
    </Layout>
  );
};

export default ContentContainer;
