import React, { createElement, useState } from "react";
import { Avatar, Button, Comment, Tooltip } from "antd";
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
} from "@ant-design/icons";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  darcula,
  materialLight,
  base16AteliersulphurpoolLight,
} from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import * as hooks from "../../../../../hooks/answers";
import { NavLink } from "react-router-dom";
import { queryClient } from "../../../../../hooks/queryClient";
import Comments from "./Comments/Comments";
import AddComment from "./Comments/AddComment";

const Answer = ({ answer }) => {
  const updateAnswer = hooks.useUpdateAnswer();
  const deleteAnswer = hooks.useDeleteAnswer();
  const mainUser = queryClient.getQueryData(["Main User"]);
  const userAction = answer.votes.users.find(
    (item) => item && item.userId === mainUser?.sub
  );
  const [isAddComment, setIsAddComment] = useState(false);

  const like = async () => {
    if (answer.votes.votesCount >= 0) {
      let newVotesCount = null;
      let newAction = null;
      if (!userAction || userAction?.action === null) {
        newVotesCount = answer.votes.votesCount + 1;
        newAction = "liked";
      } else if (userAction.action === "disliked") {
        newVotesCount = answer.votes.votesCount + 1;
        newAction = null;
      } else {
        newVotesCount = answer.votes.votesCount - 1;
        newAction = null;
      }
      await updateAnswer.mutateAsync({
        ...answer,
        votes: {
          votesCount: newVotesCount,
          users: [
            answer.votes.users,
            { userId: mainUser.sub, action: newAction },
          ],
        },
      });
    }
  };
  const dislike = async () => {
    if (answer.votes.votesCount >= 0) {
      let newVotesCount = null;
      let newAction = null;
      let stop = false;
      if (
        (!userAction || userAction?.action === null) &&
        answer.votes.votesCount > 0
      ) {
        newVotesCount = answer.votes.votesCount - 1;
        newAction = "disliked";
      } else if (
        userAction?.action === "liked" &&
        answer.votes.votesCount > 0
      ) {
        newVotesCount = answer.votes.votesCount - 1;
        newAction = null;
      } else if (
        answer.votes.votesCount !== 0 ||
        userAction?.action === "disliked"
      ) {
        newVotesCount = answer.votes.votesCount + 1;
        newAction = null;
      } else stop = true;
      !stop &&
        (await updateAnswer.mutateAsync({
          ...answer,
          votes: {
            votesCount: newVotesCount,
            users: [
              answer.votes.users,
              { userId: mainUser.sub, action: newAction },
            ],
          },
        }));
    }
  };
  const deleteCurrentAnswer = async () => {
    if (mainUser) {
      const params = { id: answer._id, postId: answer.postId };
      await deleteAnswer.mutateAsync(params);
    }
  };

  const actions = [
    <Tooltip
      key="comment-basic-like"
      title={!mainUser && "Вы не вошли в свой аккаунт"}
    >
      <span onClick={mainUser && like}>
        {createElement(
          userAction?.action === "liked" ? LikeFilled : LikeOutlined
        )}
        <span
          className="comment-action"
          style={{ marginLeft: 10, fontSize: 20 }}
        >
          {answer.votes.votesCount}
        </span>
      </span>
    </Tooltip>,
    <Tooltip
      key="comment-basic-dislike"
      title={!mainUser && "Вы не вошли в свой аккаунт"}
    >
      <span onClick={mainUser && dislike}>
        {React.createElement(
          userAction?.action === "disliked" ? DislikeFilled : DislikeOutlined
        )}
      </span>
    </Tooltip>,
    <span
      key="comment-basic-reply-to"
      onClick={() =>
        isAddComment ? setIsAddComment(false) : setIsAddComment(true)
      }
    >
      Reply to
    </span>,
    <span key="comment-basic-reply-to" onClick={deleteCurrentAnswer}>
      Delete
    </span>,
  ];
  return (
    <>
      <Comment
        actions={actions}
        author={
          <>
            <div>
              <NavLink
                to={`/user/${answer.user.name.split(" ").join("-")}/${
                  answer.user.sub
                }`}
              >
                {answer.user.name}
              </NavLink>
            </div>
            <div>
              {answer.user.status} <strong>{answer.user.reputation}</strong>
            </div>
          </>
        }
        avatar={
          <NavLink
            to={`/user/${answer.user.name.split(" ").join("-")}/${
              answer.user.sub
            }`}
          >
            <Avatar src={answer.user.picture} alt={answer.user.name} />
          </NavLink>
        }
        content={
          <div style={{ paddingTop: 15 }}>
            <ReactMarkdown
              children={answer.body}
              components={{
                code({ node, inline, className, children, ...props }) {
                  return !inline ? (
                    <SyntaxHighlighter
                      wrapLines={true}
                      customStyle={{
                        minWidth: 400,
                        padding: "0 10px",
                        margin: 0,
                        /*overflow-y: hidden;*/
                      }}
                      children={String(children)
                        .replace(/\n$/, "")
                        .replaceAll("\\s\\s\n", "\n")}
                      style={darcula}
                      language={answer.codeLanguage}
                      PreTag="div"
                      {...props}
                    />
                  ) : (
                    <code className={"monospace"} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
              remarkPlugins={[remarkGfm]}
            />
          </div>
        }
        datetime={<span>{new Date().toLocaleDateString()}</span>}
      >
        {isAddComment && (
          <AddComment answerId={answer._id} setIsAddComment={setIsAddComment} />
        )}
        <Comments answerId={answer._id} />
      </Comment>
    </>
  );
};
export default React.memo(Answer);
