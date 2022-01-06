import React from "react";
import TextArea from "antd/es/input/TextArea";
import { Button } from "antd";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import { useAuth0 } from "@auth0/auth0-react";
import * as hooks from "../../../../../../hooks/comments";
import { queryClient } from "../../../../../../hooks/queryClient";
import styles from "./comments.module.css";

const CreatorSchema = (t) =>
  yup.object().shape({
    comment: yup
      .string()
      .required(t("errors.isRequired"))
      .min(3, t("errors.tooShort")),
  });
const AddComment = ({
  answerId,
  setIsAddComment,
  answerUserId,
  postTitle,
  postUserId,
  postId,
}) => {
  const { t } = useTranslation();
  const { isAuthenticated } = useAuth0();
  const {
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(CreatorSchema(t)),
  });
  const mainUser = queryClient.getQueryData(["Main User"]);
  const addComment = hooks.useAddComments();
  const createcomment = async (data) => {
    if (isAuthenticated) {
      const newAnswer = {
        userId: mainUser.sub,
        answerId,
        body: data.comment,
        answerUserId,
        postUserId,
        postTitle,
        postId,
      };
      console.log(newAnswer);
      await addComment.mutateAsync(newAnswer);
      reset({
        comment: "",
      });
      setIsAddComment(false);
    }
  };
  return (
    <form className={styles.comments} onSubmit={handleSubmit(createcomment)}>
      {errors.comment && <p className={"error"}>{errors.comment.message}</p>}
      <Controller
        control={control}
        name={"comment"}
        render={({ field }) => (
          <TextArea
            value={field.value}
            onChange={field.onChange}
            rows={2}
            placeholder={t("comment.recommendation")}
          />
        )}
      />
      <Button htmlType="submit" type="primary" style={{ margin: "15px 0" }}>
        {t("comment.addComment")}
      </Button>
    </form>
  );
};

export default AddComment;
