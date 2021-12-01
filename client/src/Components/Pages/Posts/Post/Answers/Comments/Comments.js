import React, { useEffect, useState } from "react";
import * as hooks from "../../../../../../hooks/comments";
import Loader from "../../../../../Loader/Loader";
import UserComment from "./UserComment";
import { Button } from "antd";
import { queryClient } from "../../../../../../hooks/queryClient";

const CurrentComments = ({ setPage, page, data }) => {
  console.log(data.answerComments);
  return (
    <>
      <h3 style={{ margin: "0" }}>Comments</h3>
      <div style={{ marginLeft: 20 }}>
        {data.answerComments.map((comment) => {
          return <UserComment comment={comment} page={page} />;
        })}
      </div>
      {data.commentsCount !== data.answerComments.length && (
        <Button
          type={"text"}
          style={{ marginLeft: 50 }}
          onClick={() => {
            setPage(page + 1);
          }}
        >
          Показать больше
        </Button>
      )}
      {data.answerComments.length > 6 && (
        <Button
          type={"text"}
          style={{ marginLeft: 50 }}
          onClick={() => {
            setPage(1);
          }}
        >
          Скрыть
        </Button>
      )}
    </>
  );
};

const Comments = ({ answerId }) => {
  const prevData = queryClient.getQueryData([
    "posts",
    `Answer Id: ${answerId}`,
    "comments",
  ]);
  const [page, setPage] = useState(
    prevData ? Math.ceil(prevData.answerComments.length / 5) + 1 : 1
  );
  const { status, error, data, refetch } = hooks.useFetchComments(
    answerId,
    page
  );
  useEffect(() => {
    refetch();
  }, [page]);
  return status === "loading" ? (
    prevData ? (
      <CurrentComments data={prevData} page={page} setPage={setPage} />
    ) : (
      <Loader />
    )
  ) : status === "error" ? (
    error.message
  ) : data.answerComments[0] ? (
    <CurrentComments data={data} page={page} setPage={setPage} />
  ) : (
    <></>
  );
};

export default Comments;
