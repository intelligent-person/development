import React, { useEffect, useState } from "react";
import { MessageOutlined } from "@ant-design/icons";
import { Button, Drawer, message } from "antd";
import * as hooks from "../../../hooks/messages/useFetchMessages";
import { useAuth0 } from "@auth0/auth0-react";
import Message from "./Message";
import styles from "./message.module.css";

const Messages = () => {
  const { user } = useAuth0();
  const { data, status, error, refetch } = hooks.useFetchMessages(user.sub);
  const [visible, setVisible] = useState(false);
  const [isMessage, setIsMessage] = useState(false);
  useEffect(() => {
    setIsMessage(false);
    data?.forEach((message) => {
      if (message.read === false) setIsMessage(true);
    });
  }, [data]);
  useEffect(() => {
    setInterval(() => {
      refetch();
    }, 3000);
  }, []);
  const showDrawer = () => {
    setVisible(true);
  };
  const onClose = () => {
    setVisible(false);
  };
  return status === "loading" ? (
    <></>
  ) : status === "error" ? (
    message.error(error.message)
  ) : (
    <>
      <Button type={"text"} onClick={showDrawer}>
        <div style={{ marginTop: 16 }} className={styles.headerMessageIcon}>
          <MessageOutlined style={{ color: "white", fontSize: 25 }} />
          {isMessage && <div className={styles.isMessage}></div>}
        </div>
      </Button>
      <Drawer
        title={
          <>
            <MessageOutlined style={{ fontSize: 22 }} />
            <span style={{ marginLeft: 10 }}>Messages</span>
          </>
        }
        placement="right"
        onClose={onClose}
        width={500}
        visible={visible}
        bodyStyle={{ padding: 0 }}
      >
        {data.map((message) => (
          <Message messageData={message} setVisible={setVisible} />
        ))}
      </Drawer>
    </>
  );
};

export default Messages;
