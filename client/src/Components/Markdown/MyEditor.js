import React from "react";
import { Editor } from "react-draft-wysiwyg";
import "./../../../node_modules/react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

const MyEditor = ({ onChange, editorState }) => {
  return (
    <div style={{ border: "1px solid grey", padding: "0 20px" }}>
      <Editor
        editorState={editorState}
        wrapperClassName="demo-wrapper"
        editorClassName="demo-editor"
        onEditorStateChange={onChange}
      />
    </div>
  );
};

export default MyEditor;
