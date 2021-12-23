import React from "react";
import * as userHooks from "../../../hooks/users";
import Loader from "../../Loader/Loader";
import { message } from "antd";
import Avatar from "antd/es/avatar/avatar";
import styles from "./message.module.css";

const MessageUser = ({ userId }) => {
  const { data, status, error } = userHooks.useUserById(userId);
  return status === "loading" ? (
    <Loader />
  ) : status === "error" ? (
    message.error(error.message)
  ) : (
    <div>
      <Avatar src={data.picture} className={styles.ava} />
    </div>
  );
};

export default MessageUser;
