import React, { useEffect, useState } from "react";
import * as hooks from "../../../../../../hooks/comments";
import UserComment from "./UserComment";
import { Button, message } from "antd";
import { queryClient } from "../../../../../../hooks/queryClient";
import { useTranslation } from "react-i18next";
import styles from "./comments.module.css";

const CurrentComments = ({ setPage, page, data }) => {
  const { t } = useTranslation();
  return (
    <div className={styles.comments}>
      <h3 style={{ margin: "0" }}>{t("comment.comments")}</h3>
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
          {t("comment.showMore")}
        </Button>
      )}
      {data.answerComments.length > 3 && (
        <Button
          type={"text"}
          style={{ marginLeft: 50 }}
          onClick={() => {
            setPage(1);
          }}
        >
          {t("comment.showLess")}
        </Button>
      )}
    </div>
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
      <></>
    )
  ) : status === "error" ? (
    message.error(error.message)
  ) : data.answerComments[0] ? (
    <CurrentComments data={data} page={page} setPage={setPage} />
  ) : (
    <></>
  );
};

export default Comments;
