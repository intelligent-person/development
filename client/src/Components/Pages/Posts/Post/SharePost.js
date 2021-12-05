import React from "react";
import { Input } from "antd";

const SharePost = () => {
  return (
    <div>
      <Input style={{ maxWidth: 400 }} value={window.location.href} />
    </div>
  );
};

export default SharePost;
