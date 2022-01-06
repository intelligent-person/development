import React from "react";
import * as userHooks from "../../../hooks/users";
import Loader from "../../Loader/Loader";
import { message } from "antd";
import Avatar from "antd/es/avatar/avatar";
import styles from "./message.module.css";
import DateComponent from "../../DateComponent/DateComponent";

const MessageUser = ({ userId, date }) => {
  const { data, status, error } = userHooks.useUserById(userId);
  return status === "loading" ? (
    <Loader />
  ) : status === "error" ? (
    message.error(error.message)
  ) : (
    <div className={styles.user}>
      <Avatar src={data.picture} className={styles.ava} />
    </div>
  );
};

export default MessageUser;
