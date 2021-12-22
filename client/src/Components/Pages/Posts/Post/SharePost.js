import React, { useRef } from "react";
import { Button, Input, message } from "antd";
import { useTranslation } from "react-i18next";

const SharePost = () => {
  const { t } = useTranslation();
  const inputRef = useRef(null);
  const copyText = () => {
    const copyText = inputRef.current;
    copyText.select();
    document.execCommand("copy");
    message.info(t("post.isCopied"));
  };
  return (
    <div>
      <Input
        ref={inputRef}
        style={{ maxWidth: 400 }}
        value={window.location.href}
      />
      <Button style={{ marginLeft: 10 }} type={"primary"} onClick={copyText}>
        {t("post.copy")}
      </Button>
    </div>
  );
};

export default SharePost;
