import React from "react";
import * as hooks from "../../hooks/posts";
import { AlignLeftOutlined } from "@ant-design/icons";
import Loader from "../Loader/Loader";

const Tag = ({ tag }) => {
  const { status, error, data } = hooks.useFetchTagCount(tag);
  return status === "loading" ? (
    <></>
  ) : status === "error" ? (
    error.message
  ) : (
    <div>
      {tag} - {data} вопросов
    </div>
  );
};

export default React.memo(Tag);
