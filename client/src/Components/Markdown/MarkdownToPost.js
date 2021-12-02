import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import ReactMarkdown from "react-markdown";
import { darcula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkGfm from "remark-gfm";

const MarkdownToPost = ({ body, codeLanguage }) => {
  return (
    <ReactMarkdown
      children={body}
      components={{
        code({ node, inline, className, children, ...props }) {
          return !inline ? (
            <SyntaxHighlighter
              wrapLines={true}
              customStyle={{
                minWidth: 400,
                padding: "0 10px",
                margin: 0,
                /*overflow-y: hidden;*/
              }}
              children={String(children)
                .replace(/\n$/, "")
                .replaceAll("\\s\\s\n", "\n")}
              style={darcula}
              language={codeLanguage}
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
  );
};

export default MarkdownToPost;
