import React from "react";
import { Avatar, Button, Comment } from "antd";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { NavLink, useParams } from "react-router-dom";
import * as hooks from "../../../../../../hooks/comments";
import { queryClient } from "../../../../../../hooks/queryClient";
import "../../post.css";
import { useTranslation } from "react-i18next";

const UserComment = ({ comment }) => {
  const { t } = useTranslation();
  const { postId } = useParams();
  const deleteComment = hooks.useDeleteComment();
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
  return (
    <Comment
      datetime={comment.date
        .slice(0, comment.date.indexOf("T"))
        .split("-")
        .reverse()
        .join(".")}
      className={"comment"}
      author={
        <>
          <NavLink to={`/user/${comment.user.name}/${comment.user.sub}`}>
            {comment.user.name}
          </NavLink>{" "}
          <strong>
            {comment.user.status} {comment.user.reputation}
          </strong>
        </>
      }
      avatar={
        <NavLink to={`/user/${comment.user.name}/${comment.user.sub}`}>
          <Avatar src={comment.user.picture} alt={comment.user.name} />
        </NavLink>
      }
      content={
        <div style={{ display: "flex" }}>
          <ReactMarkdown
            children={comment.body
              .split("")
              .filter((item) => item !== "#")
              .join("")}
            components={{
              code({ node, inline, className, children, ...props }) {
                return (
                  inline && (
                    <code className={"monospace"} {...props}>
                      {children}
                    </code>
                  )
                );
              },
            }}
            remarkPlugins={[remarkGfm]}
          />
          {(mainUser?.sub === comment.user.sub ||
            mainUser?.sub === postData?.user?.sub) && (
            <Button
              type={"text"}
              style={{ color: "grey", marginTop: -4 }}
              onClick={deleteCurrentComment}
            >
              {t("comment.delete")}
            </Button>
          )}
        </div>
      }
    />
  );
};

export default UserComment;
