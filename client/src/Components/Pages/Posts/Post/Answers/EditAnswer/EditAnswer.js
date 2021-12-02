import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { AnswerCreatorSchema } from "../AnswerCreatorSchema";
import Draft from "../../../../../Markdown/Draft";
import { useTranslation } from "react-i18next";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import markdownToDraft from "../../../../../Markdown/markdown-to-draft";
import * as hooks from "../../../../../../hooks/answers";
import { Button } from "antd";
import draftToMarkdown from "../../../../../Markdown/draft-to-markdown";

const EditAnswer = ({ answer, setIsEditMode }) => {
  const { t } = useTranslation();
  const updateAnswer = hooks.useUpdateAnswer();
  const defaultValues = {
    Draft: EditorState.createWithContent(
      convertFromRaw(markdownToDraft(answer.body))
    ),
  };
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(AnswerCreatorSchema(t)), defaultValues });
  const onSubmit = async (data) => {
    await updateAnswer.mutateAsync({
      ...answer,
      body: draftToMarkdown(convertToRaw(data.Draft.getCurrentContent())),
    });
    setIsEditMode(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {errors.Draft && <p className={"error"}>{errors.Draft.message}</p>}
      <Draft control={control} codeLanguage={answer.codeLanguage} />
      <Button
        type={"primary"}
        htmlType={"submit"}
        style={{ margin: "10px 0 15px" }}
      >
        Submit
      </Button>
    </form>
  );
};

export default EditAnswer;
