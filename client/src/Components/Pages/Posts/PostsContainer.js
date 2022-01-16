import React, { useCallback, useEffect, useState } from "react";
import { Button, Pagination, Result } from "antd";
import { NavLink, Redirect, useHistory } from "react-router-dom";
import Loader from "../../Loader/Loader";
import PostsFilter from "./PostsFilter/PostsFilter";
import Posts from "./Posts";
import * as hooks from "../../../hooks/posts";
import qs from "query-string";

const PostsContainer = () => {
  const location = window.location;
  const params = new URL(location.href).searchParams;
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
  const postCall = useCallback(() => {
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
  useEffect(() => {
    postCall();
  }, [postCall]);

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
  ) : !data.posts ? (
    <Redirect to={`/questions?page=1&pageSize=10`} />
  ) : (
    <>
      <PostsFilter postsCount={data.postsCount} />
      {data.postsCount === 0 ? (
        <Result
          title="Вопросов не найдено"
          extra={
            <Button type="primary" key="console">
              <NavLink to={"/questions?page=1&pageSize=10"}>Вернутся</NavLink>
            </Button>
          }
        />
      ) : (
        <Posts posts={data.posts} />
      )}
      {data.postsCount > 20 && (
        <div style={{ textAlign: "center", marginTop: 50 }}>
          <Pagination
            defaultCurrent={1}
            total={data.postsCount}
            onChange={setSize}
            current={params.get("page")}
          />
        </div>
      )}
    </>
  );
};

export default PostsContainer;
