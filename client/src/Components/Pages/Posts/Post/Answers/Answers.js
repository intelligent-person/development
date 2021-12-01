import React, { useEffect, useState } from "react";
import Answer from "./Answer";
import { useParams } from "react-router-dom";
import * as hooks from "../../../../../hooks/answers";
import Loader from "../../../../Loader/Loader";
import { Pagination } from "antd";
import { queryClient } from "../../../../../hooks/queryClient";

const Answers = () => {
  const [page, setPage] = useState(1);
  const { postId } = useParams();
  const currentData = queryClient.getQueryData(["posts", `PostId: ${postId}`]);
  const { status, error, data, refetch } = hooks.useFetchAnswers(postId, page);
  useEffect(() => {
    refetch();
  }, [page]);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page && data]);
  return status === "loading" ? (
    <Loader />
  ) : status === "error" ? (
    error.message
  ) : data[0] ? (
    <>
      <h2 style={{ marginTop: 50 }}>{currentData.answersCount} Answers</h2>
      {data.map((answer) => {
        return <Answer answer={answer} />;
      })}
      {currentData.answersCount > 10 && (
        <Pagination
          style={{ marginTop: 20 }}
          defaultCurrent={1}
          total={currentData.answersCount}
          onChange={(page) => setPage(page)}
          current={page}
        />
      )}
    </>
  ) : (
    <></>
  );
};

export default Answers;
