import React from "react";
import "./posts.css";
import PostShortContent from "./PostShortContent/PostShortContent";

const Posts = ({ posts }) => {
  return posts.map((post) => <PostShortContent post={post} />);
};

export default React.memo(Posts);
