import React, { createElement, useEffect, useRef, useState } from "react";
import { Avatar, Comment, Tooltip } from "antd";
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
  EditOutlined,
  CheckOutlined,
} from "@ant-design/icons";

import * as hooks from "../../../../../hooks/answers";
import * as userHooks from "../../../../../hooks/users";
import { NavLink, useHistory, useParams } from "react-router-dom";
import { queryClient } from "../../../../../hooks/queryClient";
import Comments from "./Comments/Comments";
import AddComment from "./Comments/AddComment";
import { useTranslation } from "react-i18next";
import MarkdownToPost from "../../../../Markdown/MarkdownToPost";
import EditAnswer from "./EditAnswer/EditAnswer";
import Loader from "../../../../Loader/Loader";
import styles from "./answers.module.css";
import qs from "query-string";

const Answer = ({ answer, page }) => {
  const { t } = useTranslation();
  const updateUser = userHooks.useUpdateUser();
  const { data, status, error, refetch } = userHooks.useUserById(answer.userId);
  const { postId } = useParams();
  const post = queryClient.getQueryData(["posts", `PostId: ${postId}`]);
  const updateAnswer = hooks.useUpdateAnswer();
  const deleteAnswer = hooks.useDeleteAnswer();
  const mainUser = queryClient.getQueryData(["Main User"]);
  const userAction = answer.votes.find(
    (item) => item && item.userId === mainUser?.sub
  );
  const [isAddComment, setIsAddComment] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const myRef = useRef(null);
  const queryParams = qs.parse(window.location.search);
  const history = useHistory();

  useEffect(() => {
    if (myRef.current !== null) {
      if (
        queryParams.type === "answer" &&
        queryParams.scrollTo === answer._id
      ) {
        myRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
        setTimeout(() => {
          history.push({
            search: qs.stringify({}),
          });
        }, 3000);
      }
    }
  }, [queryParams]);

  const like = async () => {
    if (answer.votesCount >= 0) {
      let newVotesCount;
      let newAction;
      let newReputation;
      if (!userAction || userAction?.action === null) {
        newVotesCount = answer.votesCount + 1;
        newAction = "liked";
        newReputation = data.reputation + 1;
      } else if (userAction.action === "disliked") {
        newVotesCount = answer.votesCount + 1;
        newAction = null;
        newReputation = data.reputation + 1;
      } else {
        newVotesCount = answer.votesCount - 1;
        newAction = null;
        newReputation = data.reputation - 1;
      }
      await updateAnswer.mutateAsync({
        answer: {
          ...answer,
          votesCount: newVotesCount,
          votes: [
            ...answer.votes.filter((vote) => vote.userId !== mainUser.sub),
            { userId: mainUser.sub, action: newAction },
          ],
        },
        page,
      });
      await updateUser.mutateAsync({
        sub: data.sub,
        reputation: newReputation,
      });
    }
  };
  const dislike = async () => {
    if (answer.votesCount >= 0) {
      let newVotesCount = null;
      let newAction = null;
      let newReputation = null;
      let stop = false;
      if (
        (!userAction || userAction?.action === null) &&
        answer.votesCount > 0
      ) {
        newVotesCount = answer.votesCount - 1;
        newAction = "disliked";
        newReputation = data.reputation - 1;
      } else if (userAction?.action === "liked" && answer.votesCount > 0) {
        newVotesCount = answer.votesCount - 1;
        newAction = null;
        newReputation = data.reputation - 1;
      } else if (answer.votesCount !== 0 && userAction?.action === "disliked") {
        newVotesCount = answer.votesCount + 1;
        newAction = null;
        newReputation = data.reputation + 1;
      } else stop = true;
      if (!stop) {
        await updateAnswer.mutateAsync({
          answer: {
            ...answer,
            votesCount: newVotesCount,
            votes: [
              ...answer.votes.filter((vote) => vote.userId !== mainUser.sub),
              { userId: mainUser.sub, action: newAction },
            ],
          },
          page,
        });
        await updateUser.mutateAsync({
          sub: data.sub,
          reputation: newReputation,
        });
      }
    }
  };
  const deleteCurrentAnswer = async () => {
    if (mainUser) {
      const params = { id: answer._id, postId: answer.postId, page };
      await deleteAnswer.mutateAsync(params);
      await updateUser.mutateAsync({
        sub: data.sub,
        reputation: data.reputation - answer.votesCount - 10,
      });
    }
  };

  const confirmAnswer = async () => {
    await updateAnswer.mutateAsync({
      answer: { ...answer, confirmed: true },
      page,
    });
    await updateUser.mutateAsync({
      sub: data.sub,
      reputation: data.reputation + 5,
    });
    refetch();
  };

  const actions = [
    <Tooltip
      key="comment-basic-like"
      className={styles.actions}
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
          {answer.votesCount}
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
    <Tooltip
      key="comment-basic-dislike"
      title={!mainUser && "Вы не вошли в свой аккаунт"}
    >
      <span
        key="comment-basic-reply-to"
        onClick={() =>
          mainUser &&
          (isAddComment ? setIsAddComment(false) : setIsAddComment(true))
        }
      >
        {t("answer.reply")}
      </span>
    </Tooltip>,
    status !== "loading" && mainUser?.sub === data?.sub && (
      <>
        <span
          key="comment-basic-reply-to"
          onClick={() =>
            isEditMode ? setIsEditMode(false) : setIsEditMode(true)
          }
        >
          {t("answer.edit")}
        </span>
        <span key="comment-basic-reply-to" onClick={deleteCurrentAnswer}>
          {t("comment.delete")}
        </span>
        {answer.isEdited === true && (
          <EditOutlined title={t("answer.edited")} />
        )}
      </>
    ),
  ];

  return status === "loading" ? (
    <Loader />
  ) : status === "error" ? (
    error.message
  ) : (
    <div className={styles.answer} ref={myRef}>
      <Comment
        actions={actions}
        author={
          <>
            <div className={styles.name}>
              <NavLink
                to={`/user/${data.name.split(" ").join("-")}/${data.sub}`}
              >
                {data.name}
              </NavLink>
            </div>
            <div>
              <strong>{data.reputation}</strong>
            </div>
          </>
        }
        avatar={
          <>
            <NavLink to={`/user/${data.name.split(" ").join("-")}/${data.sub}`}>
              <Avatar src={data.picture} alt={data.name} />
            </NavLink>
          </>
        }
        content={
          <div className={styles.answerContent}>
            <MarkdownToPost
              codeLanguage={answer.codeLanguage}
              body={answer.body}
            />
          </div>
        }
        datetime={
          <>
            <span>{new Date(answer.date).toLocaleDateString()}</span>
            {answer.confirmed ? (
              <CheckOutlined
                style={{ color: "green", fontSize: 36, marginLeft: 10 }}
                title={"подтвержденный"}
              />
            ) : (
              mainUser?.sub === post.userId && (
                <CheckOutlined
                  onClick={confirmAnswer}
                  className={styles.passiveAnswer}
                  title={"подтвердить"}
                />
              )
            )}
          </>
        }
      >
        {isEditMode && (
          <EditAnswer
            answer={answer}
            setIsEditMode={setIsEditMode}
            page={page}
          />
        )}
        {isAddComment && (
          <AddComment
            answerId={answer._id}
            setIsAddComment={setIsAddComment}
            answerUserId={answer.userId}
            postTitle={answer.title}
            postUserId={answer.postUserId}
            postId={answer.postId}
          />
        )}
        <Comments answerId={answer._id} />
      </Comment>
    </div>
  );
};
export default Answer;
