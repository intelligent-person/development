import React from "react";
import { useParams } from "react-router-dom";
import Loader from "../../../Loader/Loader";
import * as hooks from "../../../../hooks/posts";
import PostInfo from "./PostInfo/PostInfo";
import AddAnswer from "./AddAnwer/AddAnswer";
import Answers from "./Answers/Answers";

const Post = () => {
  const { postId } = useParams();
  const { status, error, data, refetch } = hooks.useFetchPostById(postId);
  return status === "loading" ? (
    <Loader />
  ) : status === "error" ? (
    error.message
  ) : (
    <>
      <PostInfo post={data} />
      <Answers />
      <AddAnswer post={data} refetch={refetch} />
    </>
  );
};

export default Post;
