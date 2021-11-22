import React from "react";
import { useParams } from "react-router-dom";
import Post from "./Post";
import Loader from "../../../Loader/Loader";
import * as hooks from "../../../../hooks/posts";

const PostContainer = () => {
  const { postId } = useParams();
  const { status, error, data } = hooks.useFetchPostById(postId);
  return status === "loading" ? (
    <Loader />
  ) : status === "error" ? (
    error.message
  ) : (
    <Post post={data} />
  );
};

export default PostContainer;
