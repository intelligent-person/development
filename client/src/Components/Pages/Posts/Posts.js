import React from "react";
import { Button, Popover } from "antd";
import { NavLink } from "react-router-dom";
import "./posts.css";
import DateComponent from "../../DateComponent/DateComponent";
import ReactMarkdown from "react-markdown";
import Tag from "../../Tag/Tag";
import { useTranslation } from "react-i18next";
import PostShortContent from "./PostShortContent/PostShortContent";

const Posts = ({ posts, searchValue, setInclude }) => {
  return posts.map((post) => (
    <PostShortContent
      post={post}
      searchValue={searchValue}
      setInclude={setInclude}
    />
  ));
};

export default React.memo(Posts);
