import React from "react";
import { Avatar, Button, Comment } from "antd";
import { NavLink, useParams } from "react-router-dom";
import * as hooks from "../../../../../../hooks/comments";
import { queryClient } from "../../../../../../hooks/queryClient";
import "../../post.css";
import { useTranslation } from "react-i18next";
import MarkdownToPost from "../../../../../Markdown/MarkdownToPost";
import * as userHooks from "../../../../../../hooks/users";
import Loader from "../../../../../Loader/Loader";
import { EditOutlined } from "@ant-design/icons";

const UserComment = ({ comment }) => {
  const { t } = useTranslation();
  const { postId } = useParams();
  const deleteComment = hooks.useDeleteComment();
  const { data, status, error } = userHooks.useUserById(comment.userId);
  const postData = queryClient.getQueryData(["posts", `PostId: ${postId}`]);
  const mainUser = queryClient.getQueryData(["Main User"]);
  const deleteCurrentComment = async () => {
    if (mainUser) {
      const params = {
        commentId: comment._id,
        answerId: comment.answerId,
      };
      await deleteComment.mutateAsync(params);
    }
  };
  return status === "loading" ? (
    <Loader />
  ) : status === "error" ? (
    error.message
  ) : (
    <Comment
      datetime={comment.date
        .slice(0, comment.date.indexOf("T"))
        .split("-")
        .reverse()
        .join(".")}
      className={"comment"}
      author={
        <>
          <NavLink to={`/user/${data.name}/${data.sub}`}>{data.name}</NavLink>{" "}
          <strong>
            {data.status} {data.reputation}
          </strong>
        </>
      }
      avatar={
        <NavLink to={`/user/${data.name}/${data.sub}`}>
          <Avatar src={data.picture} alt={data.name} />
        </NavLink>
      }
      content={
        <div style={{ display: "flex" }}>
          <MarkdownToPost
            body={comment.body
              .split("")
              .filter((item) => item !== "#")
              .join("")}
            codeLanguage={"none"}
          />
          {(mainUser?.sub === data.sub ||
            mainUser?.sub === postData?.userId) && (
            <>
              <Button
                type={"text"}
                style={{ color: "grey", marginTop: -4 }}
                onClick={deleteCurrentComment}
              >
                {t("comment.delete")}
              </Button>
            </>
          )}
        </div>
      }
    />
  );
};

export default UserComment;
