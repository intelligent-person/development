import React, { useEffect, useState } from "react";
import { Pagination } from "antd";
import { Content } from "antd/es/layout/layout";
import { Route, Switch, useHistory } from "react-router-dom";
import PostCreator from "./PostCreator/PostCreator";
import Loader from "../../Loader/Loader";
import PostsFilter from "./PostsFilter/PostsFilter";
import PostsBreadCrumb from "./PostsBreadCrumb";
import Posts from "./Posts";
import * as hooks from "../../../hooks/posts";
import qs from "query-string";

const PostInfoContainer = React.lazy(() => import("./Post/Post"));

const PostsContainer = () => {
  const location = window.location;
  const params = new URL(window.location.href).searchParams;
  const history = useHistory();
  const queryParams = qs.parse(window.location.search);
  const { status, error, data, refetch } = hooks.useFetchPosts(
    params.get("page"),
    params.get("pageSize"),
    params.get("sort"),
    params.get("search"),
    params.get("unanswered"),
    params.get("tags")
  );
  useEffect(() => {
    if (location.pathname === "/questions") {
      refetch();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [
    params.get("search"),
    params.get("page"),
    params.get("pageSize"),
    params.get("sort"),
    params.get("unanswered"),
    params.get("tags"),
  ]);

  const setSize = (page, pageSize) => {
    const newQueries = {
      ...queryParams,
      page,
      pageSize,
    };
    history.push({
      search: qs.stringify(newQueries),
    });
  };

  return status === "loading" ? (
    <Loader />
  ) : status === "error" ? (
    error.message
  ) : (
    <>
      <PostsBreadCrumb />
      <Content
        className="site-layout-background"
        style={{ padding: "30px 100px 50px", margin: 0, minHeight: 280 }}
      >
        <Switch>
          <Route
            path={"/questions"}
            exact={true}
            render={() => (
              <>
                <PostsFilter postsCount={data.postsCount} />
                <Posts posts={data.posts} />
                <div style={{ textAlign: "center", marginTop: 50 }}>
                  <Pagination
                    defaultCurrent={1}
                    total={data.postsCount}
                    onChange={setSize}
                  />
                </div>
              </>
            )}
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
        </Switch>
      </Content>
    </>
  );
};

export default PostsContainer;
