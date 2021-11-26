import React from "react";
import Answer from "./Answer";
import { useParams } from "react-router-dom";
import * as hooks from "../../../../../hooks/answers";
import Loader from "../../../../Loader/Loader";

const Answers = () => {
  const { postId } = useParams();
  const { status, error, data } = hooks.useFetchAnswers(postId);
  return status === "loading" ? (
    <Loader />
  ) : status === "error" ? (
    error.message
  ) : data[0] ? (
    <>
      <h1 style={{ marginTop: 50 }}>Answers</h1>
      {data.map((answer) => {
        return <Answer answer={answer} />;
      })}
    </>
  ) : (
    <></>
  );
};

export default Answers;
