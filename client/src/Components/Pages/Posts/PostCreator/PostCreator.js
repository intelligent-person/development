import React, { useState } from "react";
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
import { useForm, Controller, useWatch } from "react-hook-form";
import ModalRedirect from "./ModalRedirect";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { convertToRaw, EditorState } from "draft-js";
import { draftToMarkdown } from "markdown-draft-js";

const CreatorSchema = yup.object().shape({
  title: yup
    .string()
    .required("Заполните текущее поле!")
    .min(20, "Слишком короткий заголовок!"),
  tags: yup
    .string()
    .required("Заполните текущее поле!")
    .max(40, "Слишком много тегов!"),
  Draft: yup.object().required("Заполните текущее поле!"),
});

const defaultValues = { Draft: EditorState.createEmpty() };

const PostCreator = ({ mainUser }) => {
  const dispatch = useDispatch();
  const [isSubmitSuccess, setIsSubmitSuccess] = useState(false);
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CreatorSchema),
    defaultValues,
  });
  const draftBody = useWatch({
    control,
    name: "Draft", // without supply name will watch the entire form, or ['firstName', 'lastName'] to watch both
  });
  let contentState = draftBody.getCurrentContent();
  const rawObject = convertToRaw(contentState);
  const markdownBody = draftToMarkdown(rawObject);
  const createPost = (data) => {
    if (mainUser) {
      const newPost = {
        title: data.title,
        body: markdownBody,
        codeLanguage: data.select,
        user: mainUser,
        tags: data.tags.split(" "),
        views: 0,
        answersCount: 0,
      };
      console.log(newPost);
      dispatch(addPost(newPost));
      setIsSubmitSuccess(true);
    }
  };
  return (
    <form onSubmit={handleSubmit(createPost)}>
      <div className={"contentBlock sendBlock"}>
        <Controller
          name="select"
          control={control}
          defaultValue="cpp"
          render={({ field }) => (
            <Select
              {...field}
              style={{ width: 120 }}
              options={[
                { value: "javascript", label: "javascript" },
                { value: "cpp", label: "cpp" },
                { value: "python", label: "python" },
                { value: "java", label: "java" },
                { value: "jsx", label: "jsx" },
                { value: "html", label: "html" },
                { value: "css", label: "css" },
                { value: "django", label: "django" },
                { value: "php", label: "php" },
              ]}
            />
          )}
        />
        <Button type="primary" htmlType="submit">
          Задать вопрос
        </Button>
      </div>
      <div className={"contentBlock"}>
        <h2 style={{ marginBottom: 0 }}>Заголовок</h2>
        <h5>
          Будьте конкретны и представьте, что задаете вопрос другому человеку.
        </h5>
        {errors.title && <p className={"error"}>{errors.title.message}</p>}
        <Controller
          control={control}
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
        {errors.Draft && <p className={"error"}>{errors.Draft.message}</p>}
        <Controller
          name={"Draft"}
          control={control}
          render={({ field }) => {
            return (
              <MyEditor editorState={field.value} onChange={field.onChange} />
            );
          }}
        />
        {/*<MyEditor setBody={setBody} control={control} />*/}
      </div>
      <div style={{ padding: 14 }}>
        <ReactMarkdown
          children={markdownBody}
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
                  // language={language}
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
        {errors.tags && <p className={"error"}>{errors.tags.message}</p>}
        <Controller
          control={control}
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
      {isSubmitSuccess && <ModalRedirect />}
      <ModalWindow />
    </form>
  );
};

export default React.memo(PostCreator);
