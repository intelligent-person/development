import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import ReactMarkdown from "react-markdown";
import { darcula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkGfm from "remark-gfm";
import styles from "./markdown.module.css";

const MarkdownToPost = ({ body, codeLanguage }) => {
  console.log(body);
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
                padding: "10px 10px",
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
            <code className={styles.monospace} {...props}>
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
