import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { EditCreatorSchema } from "../EditCreatorSchema";
import Draft from "../../../../../Markdown/Draft";
import { useTranslation } from "react-i18next";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import markdownToDraft from "../../../../../Markdown/markdown-to-draft";
import * as hooks from "../../../../../../hooks/answers";
import { Button } from "antd";
import draftToMarkdown from "../../../../../Markdown/draft-to-markdown";

const EditAnswer = ({ answer, setIsEditMode, page }) => {
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
  } = useForm({ resolver: yupResolver(EditCreatorSchema(t)), defaultValues });
  const onSubmit = async (data) => {
    await updateAnswer.mutateAsync({
      answer: {
        ...answer,
        body: draftToMarkdown(convertToRaw(data.Draft.getCurrentContent())),
        isEdited: true,
      },
      page,
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
        {t("answer.editAnswer")}
      </Button>
    </form>
  );
};

export default EditAnswer;
