import React from "react";
import { Route, Switch } from "react-router-dom";
import { Layout } from "antd";
import Loader from "../Loader/Loader";
import PostCreator from "../Pages/Posts/PostCreator/PostCreator";
import { Content } from "antd/es/layout/layout";
import PostsBreadCrumb from "../Pages/Posts/PostsBreadCrumb";
import NotAuthorized from "../Results/NotAuthorized";

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

const PostInfoContainer = React.lazy(() => import("../Pages/Posts/Post/Post"));

const ContentContainer = () => {
  return (
    <Layout
      style={{
        padding: "0 50px 24px",
        marginTop: 0,
      }}
    >
      <React.Suspense fallback={<Loader />}>
        <Switch>
          <Route path={"/"} exact={true} component={HomeContainer} />
          <Route
            path={"/login"}
            exact={true}
            render={() => <NotAuthorized />}
          />
          <Route
            path={"/questions"}
            render={() => (
              <>
                <PostsBreadCrumb />
                <Content
                  className="site-layout-background"
                  style={{
                    padding: "30px 100px 50px",
                    margin: 0,
                    minHeight: 670,
                  }}
                >
                  <Route
                    path={"/questions"}
                    exact={true}
                    component={PostsContainer}
                  />
                  <Route
                    path={"/questions/id/:postId"}
                    render={() => (
                      <React.Suspense fallback={<Loader />}>
                        <PostInfoContainer />
                      </React.Suspense>
                    )}
                  />
                  <Route
                    path={"/questions/ask"}
                    exact={true}
                    render={() => (
                      <React.Suspense fallback={<Loader />}>
                        <PostCreator />
                      </React.Suspense>
                    )}
                  />
                </Content>
              </>
            )}
          />

          <Route path={"/users"} exact component={UsersContainer} />
          <Route path={"/user/:name/:sub"} component={ProfileContainer} />
        </Switch>
      </React.Suspense>
    </Layout>
  );
};

export default ContentContainer;
