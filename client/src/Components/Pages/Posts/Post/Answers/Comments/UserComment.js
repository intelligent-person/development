import React, { useEffect, useRef } from "react";
import { Avatar, Button, Comment, message } from "antd";
import { NavLink, useHistory, useParams } from "react-router-dom";
import * as hooks from "../../../../../../hooks/comments";
import { queryClient } from "../../../../../../hooks/queryClient";
import "../../post.css";
import { useTranslation } from "react-i18next";
import MarkdownToPost from "../../../../../Markdown/MarkdownToPost";
import * as userHooks from "../../../../../../hooks/users";
import Loader from "../../../../../Loader/Loader";
import qs from "query-string";

const UserComment = ({ comment }) => {
  const { t } = useTranslation();
  const { postId } = useParams();
  const deleteComment = hooks.useDeleteComment();
  const { data, status, error } = userHooks.useUserById(comment.userId);
  const postData = queryClient.getQueryData(["posts", `PostId: ${postId}`]);
  const mainUser = queryClient.getQueryData(["Main User"]);
  const history = useHistory();

  const myRef = useRef(null);
  const queryParams = qs.parse(window.location.search);

  useEffect(() => {
    if (myRef.current !== null) {
      if (
        queryParams.type === "comment" &&
        queryParams.scrollTo === comment._id
      ) {
        myRef.current.scrollIntoView({
          behavior: "smooth",
        });
        setTimeout(() => {
          history.push({
            search: qs.stringify({}),
          });
        }, 3000);
      }
    }
  }, [queryParams]);
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
    message.error(error.message)
  ) : (
    <div ref={myRef}>
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
            <strong>{data.reputation}</strong>
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
    </div>
  );
};

export default UserComment;
