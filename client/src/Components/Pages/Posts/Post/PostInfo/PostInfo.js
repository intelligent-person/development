import React from "react";
import { Button, Row } from "antd";
import { NavLink } from "react-router-dom";
import DateComponent from "../../../../DateComponent/DateComponent";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkGfm from "remark-gfm";
import { useTranslation } from "react-i18next";

const PostInfo = ({ post }) => {
  const { t } = useTranslation();
  return (
    <>
      <div className={"postHeader"}>
        <Row justify={"space-between"}>
          <h1 style={{ maxWidth: "80%" }}>{post.title}</h1>
          <NavLink to={"/questions/ask"}>
            <Button type={"primary"}>{t("FilterComponent.AskQuestion")}</Button>
          </NavLink>
        </Row>
        <div style={{ display: "flex" }}>
          <div>{t("PostComponent.Date")}</div>
          <div style={{ margin: "0 30px 0 7px", fontWeight: 600 }}>
            <DateComponent postDate={post.date} />
          </div>
          <div>
            {t("PostComponent.Views")}{" "}
            <span style={{ fontWeight: 600 }}>{post.views}</span>
          </div>
        </div>
      </div>
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
                children={String(children)
                  .replace(/\n$/, "")
                  .replaceAll("\\s\\s\n", "\n")}
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
    </>
  );
};

export default PostInfo;
