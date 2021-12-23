import React from "react";
import MessageUser from "./MessageUser";
import * as hooks from "../../../hooks/messages";
import MessageBody from "./MessageBody";
import { useHistory } from "react-router-dom";
import qs from "query-string";
import styles from "./message.module.css";

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
  const { messageId, userId, date, mainUser, type, read } = messageData;
  const ThemeContext = React.createContext(read ? themes.read : themes.notRead);
  const updateMessage = hooks.useUpdateMessages();
  const history = useHistory();
  const queryParams = qs.parse(window.location.search);

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
  return (
    <ThemeContext.Provider value={themes.notRead}>
      <div className={styles.message} onClick={updateNotReadMessage}>
        <MessageBody messageId={messageId} read={read} type={type} />
        <MessageUser userId={mainUser} />
      </div>
    </ThemeContext.Provider>
  );
};

export default Message;
