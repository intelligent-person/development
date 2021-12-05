import React, { useEffect, useState } from "react";
import { Controller, useWatch } from "react-hook-form";
import { convertToRaw } from "draft-js";
import draftToMarkdown from "../Markdown/draft-to-markdown";
import MyEditor from "./MyEditor";
import "./markdown.module.css";
import MarkdownToPost from "./MarkdownToPost";

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
        <MarkdownToPost
          body={
            draftBody &&
            draftBody._immutable._map._root.bitmap &&
            String(draftToMarkdown(convertToRaw(draftBody.getCurrentContent())))
          }
          codeLanguage={codeLanguage}
        />
      </div>
    </>
  );
};

export default Draft;
