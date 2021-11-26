import React, { useState } from "react";
import Draft from "../../PostCreator/Draft";
import { Button } from "antd";
import { NavLink, useParams } from "react-router-dom";
import * as yup from "yup";
import { convertToRaw, EditorState, ContentState } from "draft-js";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { queryClient } from "../../../../../hooks/queryClient";
import { draftToMarkdown } from "markdown-draft-js";
import { useTranslation } from "react-i18next";
import * as hooks from "../../../../../hooks/answers";
import { useAuth0 } from "@auth0/auth0-react";

const CreatorSchema = (t) =>
  yup.object().shape({
    Draft: yup.mixed().test("Draft", t("errors.isRequired"), (value) => {
      return value?.getCurrentContent().hasText() === true;
    }),
  });
const defaultValues = { Draft: EditorState.createEmpty() };

const AddAnswer = ({ post }) => {
  const { postId } = useParams();
  const { t } = useTranslation();
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({ resolver: yupResolver(CreatorSchema(t)), defaultValues });
  const [onFocus, setOnFocus] = useState(false);
  const currentUrl = window.location.href;
  const { isAuthenticated } = useAuth0();
  const addAnswer = hooks.useAddAnswer();
  const { refetch } = hooks.useFetchAnswers(postId);
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
      refetch();
      setOnFocus(false);
      reset({
        Draft: EditorState.push(
          data.Draft,
          ContentState.createFromText(""),
          "remove-range"
        ),
      });
    }
  };
  return (
    <form onSubmit={handleSubmit(createAnswer)} style={{ marginTop: 50 }}>
      <h3>
        {t("post.shareQuestion")} <a href={currentUrl}>{t("post.question")}</a>{" "}
        {t("post.via")} <a>{t("post.email")}</a>,{" "}
        <a href={`https://t.me/share/url?url=${currentUrl}`}>
          {t("post.telegram")}
        </a>
        , {t("post.or")}{" "}
        <a href={`https://www.facebook.com/sharer.php?u=${currentUrl}`}>
          {t("post.facebook")}
        </a>
        .
      </h3>
      <h2>{t("post.yourAnswer")}</h2>

      {errors.Draft && <p className={"error"}>{errors.Draft.message}</p>}
      <Draft
        onFocus={onFocus}
        setOnFocus={setOnFocus}
        control={control}
        codeLanguage={post.codeLanguage}
      />
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
