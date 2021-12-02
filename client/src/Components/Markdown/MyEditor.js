import React from "react";
import { Editor } from "react-draft-wysiwyg";
import "./../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { useTranslation } from "react-i18next";

const MyEditor = ({ onChange, editorState }) => {
  const { t } = useTranslation();

  return (
    <div style={{ borderBottom: "1px solid #dddddd" }}>
      <Editor
        placeholder={t("postCreator.draft")}
        editorState={editorState}
        wrapperClassName="demo-wrapper"
        onEditorStateChange={onChange}
      />
    </div>
  );
};

export default MyEditor;
