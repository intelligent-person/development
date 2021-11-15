import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPosts } from "../../../Redux/posts-reducer";
import { Pagination } from "antd";
import { Content } from "antd/es/layout/layout";
import { Route, Switch } from "react-router-dom";
import PostCreator from "./PostCreator/PostCreator";
import Loader from "../../Loader/Loader";
import PostsFilter from "./PostsFilter";
import PostsBreadCrumb from "./PostsBreadCrumb";
import Posts from "./Posts";

const PostInfoContainer = React.lazy(() => import("./Post/PostContainer"));

const PostsContainer = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.posts.posts);
  const postsCount = useSelector((state) => state.posts.postsCount);
  const mainUser = useSelector((state) => state.users.mainUser);
  const [pageSize, setPageSize] = useState(10);
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState("newest");
  const [searchValue, setSearchValue] = useState("");
  const [include, setInclude] = useState({ unanswered: false });

  useEffect(() => {
    dispatch(getPosts(pageSize, page, sort, include, searchValue));
  }, [page, pageSize, sort, include, dispatch, searchValue]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [posts]);

  const setSize = (page, pageSize) => {
    setPage(page);
    setPageSize(pageSize);
  };

  return (
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
                  mainUser={mainUser}
                  postsCount={postsCount}
                  setSort={setSort}
                  setInclude={setInclude}
                  setPage={setPage}
                  setSearchValue={setSearchValue}
                />
                <Posts
                  posts={posts}
                  searchValue={searchValue}
                  setInclude={setInclude}
                />
                <div style={{ textAlign: "center", marginTop: 50 }}>
                  <Pagination
                    defaultCurrent={1}
                    total={postsCount}
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
            render={() => <PostCreator mainUser={mainUser} />}
          />
        </Switch>
      </Content>
    </>
  );
};

export default PostsContainer;
