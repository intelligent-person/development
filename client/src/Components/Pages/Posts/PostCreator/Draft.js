import React, { useState } from "react";
import { Controller, useWatch } from "react-hook-form";
import { convertToRaw, EditorState } from "draft-js";
import { draftToMarkdown } from "markdown-draft-js";
import MyEditor from "../../../Markdown/MyEditor";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import remarkGfm from "remark-gfm";

const Draft = ({ control, codeLanguage, onFocus, setOnFocus }) => {
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
            <MyEditor
              setOnFocus={setOnFocus}
              editorState={field.value}
              onChange={field.onChange}
            />
          );
        }}
      />
      <div style={{ padding: 14 }}>
        {onFocus && (
          <ReactMarkdown
            children={draftToMarkdown(
              convertToRaw(draftBody.getCurrentContent())
            )}
            components={{
              code({ node, inline, className, children, ...props }) {
                return !inline ? (
                  <SyntaxHighlighter
                    customStyle={{
                      padding: 0,
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
        )}
      </div>
    </>
  );
};

export default Draft;
