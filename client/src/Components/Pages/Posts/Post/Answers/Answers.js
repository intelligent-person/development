import React, { useEffect, useState } from "react";
import Answer from "./Answer";
import { useParams } from "react-router-dom";
import * as hooks from "../../../../../hooks/answers";
import Loader from "../../../../Loader/Loader";
import { Pagination } from "antd";
import { queryClient } from "../../../../../hooks/queryClient";
import { useTranslation } from "react-i18next";
import styles from "./answers.module.css";

const Answers = () => {
  const [page, setPage] = useState(1);
  const { postId } = useParams();
  const { t } = useTranslation();
  const currentData = queryClient.getQueryData(["posts", `PostId: ${postId}`]);
  const { status, error, data } = hooks.useFetchAnswers(postId, page);
  useEffect(() => {
    status !== "loading" && window.scrollTo({ top: 0, behavior: "smooth" });
  }, [status, page]);
  return status === "loading" ? (
    <Loader />
  ) : status === "error" ? (
    error.message
  ) : data.length === 0 ? (
    <h1 style={{ textAlign: "center" }}>{t("PostComponent.futureAnswers")}</h1>
  ) : (
    <>
      <h2 className={styles.answersTitle}>
        {currentData.answersCount} {t("answer.answers")}
      </h2>
      {data.map((answer) => {
        return <Answer answer={answer} page={page} />;
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
  );
};

export default Answers;
