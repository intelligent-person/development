import React, { useState } from "react";
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
import { EditCreatorSchema } from "../EditCreatorSchema";
import styles from "../../../../../Markdown/markdown.module.css";
import * as userHooks from "../../../../../../hooks/users";
import { useAddUserTags } from "../../../../../../hooks/userTags";

const AddAnswer = ({ post }) => {
  const { t } = useTranslation();
  const defaultValues = { Draft: undefined };
  const { data } = userHooks.useUserById(post.userId);
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(EditCreatorSchema(t)), defaultValues });
  const currentUrl = window.location.href;
  const { isAuthenticated } = useAuth0();
  const addAnswer = hooks.useAddAnswer();
  const addUserTags = useAddUserTags();
  const updateUser = userHooks.useUpdateUser();
  const mainUser = queryClient.getQueryData(["Main User"]);

  const createAnswer = async (formData) => {
    let contentState = formData.Draft.getCurrentContent();
    const rawObject = convertToRaw(contentState);
    const markdownBody = draftToMarkdown(rawObject);
    if (isAuthenticated) {
      await updateUser.mutateAsync({
        sub: mainUser.sub,
        tags: [
          ...post.tags.map((tag) => {
            let returnedTag = { tag, tagCount: 0 };
            for (let i = 0; i < mainUser.tags.length; i++) {
              if (tag === mainUser.tags[i].tag)
                return { tag, tagCount: mainUser.tags[i].tagCount + 1 };
            }
            return returnedTag;
          }),
        ],
      });
      await updateUser.mutateAsync({
        sub: post.userId,
        reputation: data.reputation + 5,
      });
      const newAnswer = {
        title: post.title,
        body: markdownBody,
        codeLanguage: post.codeLanguage,
        userId: mainUser.sub,
        postId: post._id,
      };
      await addAnswer.mutateAsync(newAnswer);
      reset({
        Draft: EditorState.createEmpty(),
      });
      await addUserTags.mutateAsync({ tags: post.tags, userId: mainUser.sub });
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
      <h2>
        {t("post.yourAnswer")}
        {!mainUser && <> (You're not register)</>}
      </h2>
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
