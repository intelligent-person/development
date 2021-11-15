import React, { createElement, useState } from "react";
import { Avatar, Comment, Tooltip } from "antd";
import {
  DislikeOutlined,
  LikeOutlined,
  DislikeFilled,
  LikeFilled,
} from "@ant-design/icons";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";

const Answers = ({ post }) => {
  const [likes, setLikes] = useState(0);
  const [dislikes, setDislikes] = useState(0);
  const [action, setAction] = useState(null);

  const like = () => {
    setLikes(1);
    setDislikes(0);
    setAction("liked");
  };

  const dislike = () => {
    setLikes(0);
    setDislikes(1);
    setAction("disliked");
  };

  const actions = [
    <Tooltip key="comment-basic-like" title="Like">
      <span onClick={like}>
        {createElement(action === "liked" ? LikeFilled : LikeOutlined)}
        <span className="comment-action">{likes}</span>
      </span>
    </Tooltip>,
    <Tooltip key="comment-basic-dislike" title="Dislike">
      <span onClick={dislike}>
        {React.createElement(
          action === "disliked" ? DislikeFilled : DislikeOutlined
        )}
        <span className="comment-action">{dislikes}</span>
      </span>
    </Tooltip>,
    <span key="comment-basic-reply-to">Reply to</span>,
  ];

  return (
    <Comment
      actions={actions}
      author={<a>Han Solo</a>}
      avatar={
        <Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />
      }
      content={
        <ReactMarkdown
          children={post.body}
          components={{
            code({ node, inline, className, children, ...props }) {
              return !inline ? (
                <SyntaxHighlighter
                  // wrapLines={true}
                  customStyle={{
                    padding: 0,
                    paddingLeft: 10,
                    margin: 0,
                    /*overflow-y: hidden;*/
                  }}
                  children={String(children).replace(/\n$/, "")}
                  style={darcula}
                  language={post.codeLanguage}
                  PreTag="div"
                  {...props}
                />
              ) : (
                <code className={"monospace"} {...props}>
                  {children}
                </code>
              );
            },
          }}
          remarkPlugins={[remarkGfm]}
        />
      }
      datetime={<span>{new Date().toLocaleDateString()}</span>}
    />
  );
};

export default React.memo(Answers);
