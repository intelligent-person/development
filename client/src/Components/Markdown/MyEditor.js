import React, { useRef, useState } from "react";
import {
  EditorState,
  RichUtils,
  getDefaultKeyBinding,
  convertToRaw,
} from "draft-js";
import createImagePlugin from "@draft-js-plugins/image";
import Editor from "@draft-js-plugins/editor";
import "./markdown.css";
import "draft-js/dist/Draft.css";
import "@draft-js-plugins/image/lib/plugin.css";
import { draftToMarkdown } from "markdown-draft-js";

const MyEditor = (props) => {
  const [state, setState] = useState({
    editorState: EditorState.createEmpty(),
  });
  const inputRef = useRef();
  const focus = () => inputRef.current.focus();
  const onChange = (editorState) => setState({ editorState });

  const handleKeyCommand = (command, editorState) => {
    const newState = RichUtils.handleKeyCommand(editorState, command);
    if (newState) {
      onChange(newState);
      return true;
    }
    return false;
  };

  const mapKeyToEditorCommand = (e) => {
    if (e.keyCode === 9 /* TAB */) {
      const newEditorState = RichUtils.onTab(
        e,
        state.editorState,
        4 /* maxDepth */
      );
      if (newEditorState !== state.editorState) {
        onChange(newEditorState);
      }
      return;
    }
    return getDefaultKeyBinding(e);
  };

  const toggleBlockType = (blockType) => {
    onChange(RichUtils.toggleBlockType(state.editorState, blockType));
  };

  const toggleInlineStyle = (inlineStyle) => {
    onChange(RichUtils.toggleInlineStyle(state.editorState, inlineStyle));
  };

  const imagePlugin = createImagePlugin();
  const { editorState } = state;

  // If the user changes block type before entering any text, we can
  // either style the placeholder or hide it. Let's just hide it now.
  let className = "RichEditor-editor";
  let contentState = editorState.getCurrentContent();
  const rawObject = convertToRaw(contentState);
  const markdownString = draftToMarkdown(rawObject);
  props.bodyHandler(markdownString);
  if (!contentState.hasText()) {
    if (contentState.getBlockMap().first().getType() !== "unstyled") {
      className += " RichEditor-hidePlaceholder";
    }
  }

  return (
    <div>
      <div className="RichEditor-root">
        <BlockStyleControls
          editorState={editorState}
          onToggle={toggleBlockType}
        />
        <InlineStyleControls
          editorState={editorState}
          onToggle={toggleInlineStyle}
        />
        <div className={className} onClick={focus}>
          <Editor
            textAlignment={5}
            blockStyleFn={getBlockStyle}
            customStyleMap={styleMap}
            editorState={editorState}
            handleKeyCommand={handleKeyCommand}
            keyBindingFn={mapKeyToEditorCommand}
            onBlur={() => props.setBodyDirty(true)}
            onChange={onChange}
            placeholder="Tell a story..."
            ref={inputRef}
            spellCheck={true}
            plugins={[imagePlugin]}
          />
        </div>
      </div>
    </div>
  );
};

// Custom overrides for "code" style.
const styleMap = {
  CODE: {
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    fontFamily: '"Inconsolata", "Menlo", "Consolas", monospace',
    fontSize: 16,
    padding: 2,
  },
};

function getBlockStyle(block) {
  switch (block.getType()) {
    case "blockquote":
      return "RichEditor-blockquote";
    default:
      return null;
  }
}

const StyleButton = (props) => {
  const onToggle = (e) => {
    e.preventDefault();
    props.onToggle(props.style);
  };

  let className = "RichEditor-styleButton";
  if (props.active) {
    className += " RichEditor-activeButton";
  }

  return (
    <span className={className} onMouseDown={onToggle}>
      {props.label}
    </span>
  );
};

const BLOCK_TYPES = [
  { label: "H1", style: "header-one" },
  { label: "H2", style: "header-two" },
  { label: "H3", style: "header-three" },
  { label: "H4", style: "header-four" },
  { label: "H5", style: "header-five" },
  { label: "H6", style: "header-six" },
  { label: "Blockquote", style: "blockquote" },
  { label: "UL", style: "unordered-list-item" },
  { label: "OL", style: "ordered-list-item" },
  { label: "Code Block", style: "code-block" },
];

const BlockStyleControls = (props) => {
  const { editorState } = props;
  const selection = editorState.getSelection();
  const blockType = editorState
    .getCurrentContent()
    .getBlockForKey(selection.getStartKey())
    .getType();

  return (
    <div className="RichEditor-controls">
      {BLOCK_TYPES.map((type) => (
        <StyleButton
          key={type.label}
          active={type.style === blockType}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

let INLINE_STYLES = [
  { label: "Bold", style: "BOLD" },
  { label: "Italic", style: "ITALIC" },
  { label: "Strikethrough", style: "STRIKETHROUGH" },
  { label: "Monospace", style: "CODE" },
];

const InlineStyleControls = (props) => {
  const currentStyle = props.editorState.getCurrentInlineStyle();

  return (
    <div className="RichEditor-controls">
      {INLINE_STYLES.map((type) => (
        <StyleButton
          key={type.label}
          active={currentStyle.has(type.style)}
          label={type.label}
          onToggle={props.onToggle}
          style={type.style}
        />
      ))}
    </div>
  );
};

export default MyEditor;
