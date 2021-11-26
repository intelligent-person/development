import React, { useEffect, useState } from "react";
import { Pagination } from "antd";
import { Content } from "antd/es/layout/layout";
import { Route, Switch } from "react-router-dom";
import PostCreator from "./PostCreator/PostCreator";
import Loader from "../../Loader/Loader";
import PostsFilter from "./PostsFilter/PostsFilter";
import PostsBreadCrumb from "./PostsBreadCrumb";
import Posts from "./Posts";
import { queryClient } from "../../../hooks/queryClient";
import * as hooks from "../../../hooks/posts";

const PostInfoContainer = React.lazy(() => import("./Post/Post"));

const PostsContainer = () => {
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("newest");
  const [searchValue, setSearchValue] = useState("");
  const [include, setInclude] = useState({ unanswered: false });
  const { status, error, data, refetch } = hooks.useFetchPosts(
    pageSize,
    page,
    sort,
    include,
    searchValue
  );
  useEffect(() => {
    refetch();
  }, [page, pageSize, sort, include, searchValue]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [data]);

  const setSize = (page, pageSize) => {
    setPage(page);
    setPageSize(pageSize);
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
        style={{ padding: 24, margin: 0, minHeight: 280 }}
      >
        <Switch>
          <Route
            path={"/questions"}
            exact={true}
            render={() => (
              <>
                <PostsFilter
                  postsCount={data.postsCount}
                  setSort={setSort}
                  setInclude={setInclude}
                  setPage={setPage}
                  setSearchValue={setSearchValue}
                />
                <Posts
                  posts={data.posts}
                  searchValue={searchValue}
                  setInclude={setInclude}
                />
                <div style={{ textAlign: "center", marginTop: 50 }}>
                  <Pagination
                    defaultCurrent={1}
                    total={data.postsCount}
                    onChange={setSize}
                    current={page}
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
            render={() => <PostCreator />}
          />
        </Switch>
      </Content>
    </>
  );
};

export default PostsContainer;
