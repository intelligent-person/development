import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import Loader from "../../../Loader/Loader";
import * as hooks from "../../../../hooks/posts";
import PostInfo from "./PostInfo/PostInfo";
import AddAnswer from "./Answers/AddAnwer/AddAnswer";
import Answers from "./Answers/Answers";
import { queryClient } from "../../../../hooks/queryClient";
import NotFound from "../../../Results/NotFound";

const Post = () => {
  const { postId } = useParams();
  const { status, data, error } = hooks.useFetchPostById(postId);
  const mainUser = queryClient.getQueryData(["Main User"]);

  return status === "loading" ? (
    <Loader />
  ) : status === "error" ? (
    error.message
  ) : data === null ? (
    <NotFound />
  ) : (
    <>
      <PostInfo post={data} />
      <Answers />
      {mainUser && data.userId !== mainUser?.sub && <AddAnswer post={data} />}
    </>
  );
};

export default Post;
