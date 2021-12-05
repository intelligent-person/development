import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Draft from "../../../Markdown/Draft";
import { useTranslation } from "react-i18next";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import markdownToDraft from "../../../Markdown/markdown-to-draft";
import * as hooks from "../../../../hooks/posts";
import { Button } from "antd";
import draftToMarkdown from "../../../Markdown/draft-to-markdown";
import { EditCreatorSchema } from "./Answers/EditCreatorSchema";

const EditPost = ({ post, setIsEditMode }) => {
  const { t } = useTranslation();
  const updatePost = hooks.useUpdatePost();
  const defaultValues = {
    Draft: EditorState.createWithContent(
      convertFromRaw(markdownToDraft(post.body))
    ),
  };
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: yupResolver(EditCreatorSchema(t)), defaultValues });
  const onSubmit = async (data) => {
    await updatePost.mutateAsync({
      ...post,
      body: draftToMarkdown(convertToRaw(data.Draft.getCurrentContent())),
      isEdited: true,
    });
    setIsEditMode(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {errors.Draft && <p className={"error"}>{errors.Draft.message}</p>}
      <Draft control={control} codeLanguage={post.codeLanguage} />
      <Button
        type={"primary"}
        htmlType={"submit"}
        style={{ margin: "10px 0 15px" }}
      >
        {t("answer.editAnswer")}
      </Button>
    </form>
  );
};

export default EditPost;
