import React, { useEffect, useState } from "react";
import { MessageOutlined, SmileOutlined } from "@ant-design/icons";
import { Button, Drawer, notification } from "antd";
import Message from "./Message";
import styles from "./message.module.css";

const Messages = ({ data }) => {
  const [visible, setVisible] = useState(false);
  const [isMessage, setIsMessage] = useState(false);
  const openNotification = () => {
    notification.open({
      message: `You have new messages!`,
      placement: "topLeft",
      icon: <SmileOutlined style={{ color: "#108ee9" }} />,
      duration: 3,
      onClick: () => {
        setVisible(true);
      },
    });
  };
  console.log(data);
  useEffect(() => {
    setIsMessage(false);
    data?.forEach((message) => {
      if (message.read === false) {
        setIsMessage(true);
        openNotification();
      }
    });
  }, [data]);

  const showDrawer = () => {
    setVisible(true);
  };

  const onClose = () => {
    setVisible(false);
  };

  return (
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

export default React.memo(Messages);
