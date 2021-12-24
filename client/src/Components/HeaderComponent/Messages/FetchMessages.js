import React from "react";
import Messages from "./Messages";
import { useAuth0 } from "@auth0/auth0-react";
import * as hooks from "../../../hooks/messages/useFetchMessages";
import { message } from "antd";

const FetchMessages = () => {
  const { user } = useAuth0();
  const { data, status, error } = hooks.useFetchMessages(user.sub);
  return status === "loading" ? (
    <></>
  ) : status === "error" ? (
    message.error(error.message)
  ) : (
    <Messages data={data} />
  );
};

export default FetchMessages;
