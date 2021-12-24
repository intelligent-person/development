import React, { useContext, useState } from "react";
import MessageUser from "./MessageUser";
import * as hooks from "../../../hooks/messages";
import { NavLink, useHistory } from "react-router-dom";
import qs from "query-string";
import styles from "./message.module.css";
import { MessageOutlined } from "@ant-design/icons";
import * as commentHooks from "../../../hooks/comments";
import * as answerHooks from "../../../hooks/answers";
import Loader from "../../Loader/Loader";
import { message } from "antd";

export const themes = {
  notRead: {
    background: "#ffefef",
    color: "black",
    fontWeight: 700,
  },
  read: {
    background: "#ffffff",
    color: "rgba(0, 0, 0, 0.7)",
    fontWeight: 400,
  },
  hover: {
    background: "#f6f6f6",
    color: "rgba(0, 0, 0, 0.8)",
    fontWeight: 700,
  },
};

const Message = ({ messageData, setVisible }) => {
  const { messageId, date, mainUser, type, read } = messageData;
  const { status, error, data } =
    type === "comment"
      ? commentHooks.useFetchCommentById(messageId)
      : answerHooks.useFetchAnswerById(messageId);
  const updateMessage = hooks.useUpdateMessages();
  const history = useHistory();
  const queryParams = qs.parse(window.location.search);
  const [onMouseOver, setOnMouseOver] = useState(false);
  const ThemeContext = React.createContext(
    onMouseOver ? themes.hover : read ? themes.read : themes.notRead
  );
  const theme = useContext(ThemeContext);

  const updateNotReadMessage = async () => {
    if (read === false) {
      await updateMessage.mutateAsync({ ...messageData, read: true });
    }
    const newQueries = {
      ...queryParams,
      scrollTo: messageId,
      type,
    };
    history.push({
      search: qs.stringify(newQueries),
    });
    setVisible(false);
  };

  return status === "loading" ? (
    <Loader />
  ) : status === "error" ? (
    message.error(error.message)
  ) : (
    <ThemeContext.Provider value={themes.notRead}>
      <div onClick={updateNotReadMessage}>
        <NavLink to={`/questions/id/${data.postId}`}>
          <div
            onMouseOver={(event) => setOnMouseOver(true)}
            onMouseLeave={(e) => setOnMouseOver(false)}
            style={{
              background: theme.background,
              color: theme.color,
            }}
            className={styles.message}
          >
            <div>
              <h4
                style={{
                  color: theme.color,
                  fontWeight: theme.fontWeight,
                }}
              >
                <MessageOutlined className={styles.messageIcon} />
                {type === "comment" ? (
                  <span>Comment</span>
                ) : (
                  <span>Answer</span>
                )}
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
            <MessageUser userId={mainUser} date={date} />
          </div>
        </NavLink>
      </div>
    </ThemeContext.Provider>
  );
};

export default React.memo(Message);
