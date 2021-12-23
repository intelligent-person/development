import React, { useContext, useState } from "react";
import * as commentHooks from "../../../hooks/comments";
import * as answerHooks from "../../../hooks/answers";
import Loader from "../../Loader/Loader";
import { message } from "antd";
import { NavLink } from "react-router-dom";
import styles from "./message.module.css";
import { MessageOutlined } from "@ant-design/icons";
import { themes } from "./Message";

const MessageBody = ({ messageId, read, type }) => {
  const { status, error, data } =
    type === "comment"
      ? commentHooks.useFetchCommentById(messageId)
      : answerHooks.useFetchAnswerById(messageId);
  const [onMouseOver, setOnMouseOver] = useState(false);
  const ThemeContext = React.createContext(
    onMouseOver ? themes.hover : read ? themes.read : themes.notRead
  );
  const theme = useContext(ThemeContext);
  return status === "loading" ? (
    <Loader />
  ) : status === "error" ? (
    message.error(error.message)
  ) : (
    <NavLink to={`/questions/id/${data.postId}`}>
      <div
        onMouseOver={(event) => setOnMouseOver(true)}
        onMouseLeave={(e) => setOnMouseOver(false)}
        style={{
          background: theme.background,
          color: theme.color,
        }}
      >
        <h4
          style={{
            color: theme.color,
            fontWeight: theme.fontWeight,
          }}
        >
          <MessageOutlined className={styles.messageIcon} />
          {type === "comment" ? <span>Comment</span> : <span>Answer</span>}
        </h4>
        <h3
          className={styles.title}
          style={{
            fontWeight: theme.fontWeight,
          }}
        >
          {type === "comment"
            ? data.postTitle.length > 50
              ? data.postTitle.slice(0, 45) + "..."
              : data.postTitle
            : data.title.length > 50
            ? data.title.slice(0, 45) + "..."
            : data.title}
        </h3>
        <div
          style={{
            color: theme.color,
            fontWeight: theme.fontWeight,
          }}
        >
          {data.body.slice(0, 100)}
        </div>
      </div>
    </NavLink>
  );
};

export default MessageBody;
