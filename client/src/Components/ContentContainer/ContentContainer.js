import React from "react";
import { Route, Switch } from "react-router-dom";
import { withSuspense } from "../../hoc/WithSuspense";
import { Layout } from "antd";

const HomeContainer = React.lazy(() => import("../Pages/Home/HomeContainer"));
const PostsContainer = React.lazy(() =>
  import("../Pages/Posts/PostsContainer")
);
const UsersContainer = React.lazy(() =>
  import("../Pages/Users/UsersContainer")
);

const ContentContainer = () => {
  return (
    <Layout style={{ padding: "0 24px 24px", marginTop: 0 }}>
      <Switch>
        <Route
          path={"/"}
          exact={true}
          render={() => withSuspense(HomeContainer)}
        />
        <Route
          path={"/questions"}
          render={() => withSuspense(PostsContainer)}
        />
        <Route path={"/users"} render={() => withSuspense(UsersContainer)} />
      </Switch>
    </Layout>
  );
};

export default React.memo(ContentContainer);
