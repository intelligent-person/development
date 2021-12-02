import React from "react";
import Draft from "../../../../../Markdown/Draft";
import { Button } from "antd";
import { NavLink } from "react-router-dom";
import { convertToRaw, EditorState } from "draft-js";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { queryClient } from "../../../../../../hooks/queryClient";
import draftToMarkdown from "../../../../../Markdown/draft-to-markdown";
import { useTranslation } from "react-i18next";
import * as hooks from "../../../../../../hooks/answers";
import { useAuth0 } from "@auth0/auth0-react";
import { AnswerCreatorSchema } from "../AnswerCreatorSchema";
import styles from "../../../../../Markdown/markdown.module.css";

const AddAnswer = ({ post }) => {
  const { t } = useTranslation();
  const defaultValues = { Draft: undefined };
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(AnswerCreatorSchema(t)), defaultValues });
  const currentUrl = window.location.href;
  const { isAuthenticated } = useAuth0();
  const addAnswer = hooks.useAddAnswer();
  const mainUser = queryClient.getQueryData(["Main User"]);

  const createAnswer = async (data) => {
    let contentState = data.Draft.getCurrentContent();
    const rawObject = convertToRaw(contentState);
    const markdownBody = draftToMarkdown(rawObject);
    if (isAuthenticated) {
      const newAnswer = {
        body: markdownBody,
        codeLanguage: post.codeLanguage,
        user: mainUser,
        postId: post._id,
      };
      await addAnswer.mutateAsync(newAnswer);
      reset({
        Draft: EditorState.createEmpty(),
      });
    }
  };
  return (
    <form onSubmit={handleSubmit(createAnswer)} style={{ marginTop: 50 }}>
      <h3>
        {t("post.shareQuestion")} <a href={currentUrl}>{t("post.question")}</a>{" "}
        {t("post.via")}{" "}
        <a href={`https://t.me/share/url?url=${currentUrl}`}>
          {t("post.telegram")}
        </a>{" "}
        {t("post.or")}{" "}
        <a href={`https://www.facebook.com/sharer.php?u=${currentUrl}`}>
          {t("post.facebook")}
        </a>
        .
      </h3>
      <h2>{t("post.yourAnswer")}</h2>
      {errors.Draft && <p className={styles.error}>{errors.Draft.message}</p>}
      <Draft control={control} codeLanguage={post.codeLanguage} />
      {mainUser ? (
        <Button type="primary" htmlType="submit">
          {t("post.postAnswer")}
        </Button>
      ) : (
        <NavLink to={"/login"}>
          <Button type={"primary"}>{t("FilterComponent.AskQuestion")}</Button>
        </NavLink>
      )}
    </form>
  );
};

export default AddAnswer;
