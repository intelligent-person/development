import React, { useState } from "react";
import "../../../Markdown/markdown.css";
import { Button, Input, Select } from "antd";
import ModalWindow from "./ModalWindow";
import { useForm, Controller, useWatch } from "react-hook-form";
import ModalRedirect from "./ModalRedirect";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { convertToRaw } from "draft-js";
import draftToMarkdown from "../../../Markdown/draft-to-markdown";
import { useTranslation } from "react-i18next";
import { queryClient } from "../../../../hooks/queryClient";
import * as hooks from "../../../../hooks/posts";
import Loader from "../../../Loader/Loader";
import Draft from "../../../Markdown/Draft";

const CreatorSchema = (t) =>
  yup.object().shape({
    title: yup
      .string()
      .required(t("errors.isRequired"))
      .min(20, t("errors.tooShort")),
    tags: yup
      .string()
      .required(t("errors.isRequired"))
      .max(40, t("errors.tooManyTags")),
    Draft: yup
      .mixed()
      .test("Draft", t("errors.isRequired"), (value) => {
        return value?.getCurrentContent().hasText() === true;
      })
      .test("Draft", t("errors.tooShort"), (value) => {
        if (value) {
          return (
            convertToRaw(value?.getCurrentContent()).blocks[0].text.length > 30
          );
        }
      }),
  });
const defaultValues = { Draft: undefined, select: "cpp" };

const PostCreator = () => {
  const mainUser = queryClient.getQueryData(["Main User"]);
  const addPost = hooks.useAddPost();
  const { t } = useTranslation();
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(CreatorSchema(t)),
    defaultValues,
  });
  const languageControl = useWatch({
    control,
    name: "select", // without supply name will watch the entire form, or ['firstName', 'lastName'] to watch both
  });

  const createPost = async (data) => {
    if (mainUser) {
      let contentState = data.Draft.getCurrentContent();
      const rawObject = convertToRaw(contentState);
      const markdownBody = draftToMarkdown(rawObject);
      const newPost = {
        title: data.title,
        body: markdownBody,
        codeLanguage: data.select,
        user: mainUser,
        tags: data.tags.split(" "),
        views: 0,
        answersCount: 0,
      };
      await addPost.mutateAsync(newPost);
      reset({
        Draft: undefined,
        title: "",
        tags: "",
      });
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
          {t("postCreator.addQuestion")}
        </Button>
      </div>
      <div className={"contentBlock"}>
        <h2 style={{ marginBottom: 0 }}>{t("postCreator.title")}</h2>
        <h5>{t("postCreator.subTitle")}</h5>
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
        <h3 style={{ marginBottom: 0 }}>{t("postCreator.body")}</h3>
        {errors.Draft && <p className={"error"}>{errors.Draft.message}</p>}
        <Draft control={control} codeLanguage={languageControl} />
      </div>
      <div className={"contentBlock"}>
        <h2>{t("postCreator.tags")}</h2>
        <h5>{t("postCreator.subTags")}</h5>
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
      {addPost.isSuccess && <ModalRedirect />}
      {addPost.isLoading && <Loader />}
      <ModalWindow />
    </form>
  );
};

export default React.memo(PostCreator);
