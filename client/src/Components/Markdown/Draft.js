import React from "react";
import { Controller, useWatch } from "react-hook-form";
import { convertToRaw } from "draft-js";
import draftToMarkdown from "../Markdown/draft-to-markdown";
import MyEditor from "./MyEditor";
import ReactMarkdown from "react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkGfm from "remark-gfm";
import "./markdown.css";

const Draft = ({ control, codeLanguage }) => {
  const draftBody = useWatch({
    control,
    name: "Draft",
  });
  return (
    <>
      <Controller
        name={"Draft"}
        control={control}
        render={({ field }) => {
          return (
            <MyEditor editorState={field.value} onChange={field.onChange} />
          );
        }}
      />
      <div style={{ padding: 14 }}>
        <ReactMarkdown
          className={"markdown"}
          children={
            draftBody &&
            String(draftToMarkdown(convertToRaw(draftBody.getCurrentContent())))
          }
          components={{
            code({ node, inline, className, children, ...props }) {
              return !inline ? (
                <SyntaxHighlighter
                  customStyle={{
                    padding: 10,
                    paddingLeft: 10,
                    margin: 0,
                  }}
                  children={String(children).replace(/\n$/, "")}
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
      </div>
    </>
  );
};

export default Draft;
