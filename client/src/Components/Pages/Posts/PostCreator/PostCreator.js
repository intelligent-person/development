import React, { useEffect, useState } from "react";
import MyEditor from "../../../Markdown/MyEditor";
import "../../../Markdown/markdown.css";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { darcula } from "react-syntax-highlighter/dist/cjs/styles/prism";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Button, Input, Select } from "antd";
import ModalWindow from "./ModalWindow";
import { useDispatch } from "react-redux";
import { addPost } from "../../../../Redux/posts-reducer";
import { useForm, Controller } from "react-hook-form";

const PostCreator = ({ user }) => {
  const dispatch = useDispatch();
  const [language, setLanguage] = useState("cpp");
  const [body, setBody] = useState(``);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm();
  const createPost = (date) => {
    if (user) {
      const newPost = {
        title: date.title,
        body: body,
        codeLanguage: language,
        user: user,
        tags: date.tags.split(" "),
        views: 0,
        answersCount: 0,
      };
      dispatch(addPost(newPost));
    }
  };
  return (
    <form onSubmit={handleSubmit(createPost)}>
      <div className={"contentBlock sendBlock"}>
        <Select
          defaultValue="cpp"
          style={{ width: 120 }}
          onChange={(e) => setLanguage(e)}
        >
          <Select.Option value="javascript">JavaScript</Select.Option>
          <Select.Option value="cpp">C/C++</Select.Option>
          <Select.Option value="python">Python</Select.Option>
          <Select.Option value="java">Java</Select.Option>
          <Select.Option value="jsx">JSX(React.js)</Select.Option>
          <Select.Option value="html">HTML</Select.Option>
          <Select.Option value="css">CSS</Select.Option>
          <Select.Option value="django">Django</Select.Option>
          <Select.Option value="php">Php</Select.Option>
        </Select>
        <Button type="primary" htmlType="submit">
          Задать вопрос
        </Button>
      </div>
      <div className={"contentBlock"}>
        <h2 style={{ marginBottom: 0 }}>Заголовок</h2>
        <h5>
          q Будьте конкретны и представьте, что задаете вопрос другому человеку.
        </h5>
        {errors?.title?.type === "required" && (
          <p className={"error"}>Заполните текущее поле!</p>
        )}
        {errors?.title?.type === "minLength" && (
          <p className={"error"}>Заголовок слишком короткий!</p>
        )}
        <Controller
          control={control}
          rules={{
            required: true,
            minLength: 20,
          }}
          name={"title"}
          render={({ field }) => (
            <Input
              value={field.value}
              onChange={field.onChange}
              inputRef={field.ref}
              placeholder={"например, как работает Excel..."}
            />
          )}
        />
      </div>
      <div className={"contentBlock"}>
        <h3 style={{ marginBottom: 0 }}>Содержимое:</h3>
        <MyEditor setBody={setBody} control={control} />
      </div>
      <div style={{ padding: 14 }}>
        <ReactMarkdown
          children={body}
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
                  language={language}
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
      <div className={"contentBlock"}>
        <h2>Тags:</h2>
        <h5>
          Добавьте до 5 тегов через пробел, чтобы описать, о чем ваш вопрос.
        </h5>
        {errors?.tags?.type === "required" && (
          <p className={"error"}>Заполните текущее поле!</p>
        )}
        {errors?.tags?.type === "maxLength" && (
          <p className={"error"}>Слишком много тегов!</p>
        )}
        <Controller
          control={control}
          rules={{
            required: true,
            maxLength: 40,
          }}
          name={"tags"}
          render={({ field }) => (
            <Input
              value={field.value}
              onChange={field.onChange}
              inputRef={field.ref}
              placeholder={"например, javascript cpp..."}
            />
          )}
        />
      </div>
      <ModalWindow />
    </form>
  );
};

export default React.memo(PostCreator);
