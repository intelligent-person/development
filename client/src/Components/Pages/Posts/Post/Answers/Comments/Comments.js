import React from "react";
import * as hooks from "../../../../../../hooks/comments";
import Loader from "../../../../../Loader/Loader";
import UserComment from "./UserComment";

const Comments = ({ answerId }) => {
  const { status, error, data } = hooks.useFetchComments(answerId);
  return status === "loading" ? (
    <Loader />
  ) : status === "error" ? (
    error.message
  ) : data[0] ? (
    <>
      <h3 style={{ margin: "0" }}>Comments</h3>
      <div style={{ marginLeft: 20 }}>
        {data.map((comment) => {
          return <UserComment comment={comment} />;
        })}
      </div>
    </>
  ) : (
    <></>
  );
};

export default Comments;
