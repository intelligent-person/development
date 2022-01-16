import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import { Layout } from "antd";
import Loader from "../Loader/Loader";
import PostCreator from "../Pages/Posts/PostCreator/PostCreator";
import { Content } from "antd/es/layout/layout";
import PostsBreadCrumb from "../Pages/Posts/PostsBreadCrumb";
import NotAuthorized from "../Results/NotAuthorized";
import styles from "./content.module.css";

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
  const mobile = window.innerWidth && true;
  return (
    <Layout className={styles.layout}>
      <React.Suspense fallback={<Loader />}>
        <Switch>
          <Route
            path={"/"}
            exact={true}
            render={() => <Redirect to={"questions?page=1&pageSize=10"} />}
          />
          <Route
            path={"/login"}
            exact={true}
            render={() => <NotAuthorized />}
          />
          <Route
            path={"/questions"}
            render={() => (
              <>
                {!mobile && <PostsBreadCrumb />}
                <Content
                  className={`site-layout-background ${styles.postsContent}`}
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
