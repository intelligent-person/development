import React, { useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { Button } from "antd";
import * as yup from "yup";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useTranslation } from "react-i18next";
import remarkGfm from "remark-gfm";
import ReactMarkdown from "react-markdown";
import { useAuth0 } from "@auth0/auth0-react";
import * as hooks from "../../../../../../hooks/comments";
import { queryClient } from "../../../../../../hooks/queryClient";

const CreatorSchema = (t) =>
  yup.object().shape({
    comment: yup
      .string()
      .required(t("errors.isRequired"))
      .min(20, t("errors.tooShort")),
  });
const AddComment = ({ answerId, setIsAddComment }) => {
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
        user: {
          sub: mainUser.sub,
          name: mainUser.name,
          picture: mainUser.picture,
          reputation: mainUser.reputation,
          status: mainUser.status,
        },
        answerId,
        body: data.comment,
      };
      await addComment.mutateAsync(newAnswer);
      reset({
        comment: "",
      });
      setIsAddComment(false);
    }
  };
  return (
    <form onSubmit={handleSubmit(createcomment)}>
      {errors.comment && <p className={"error"}>{errors.comment.message}</p>}
      <Controller
        control={control}
        name={"comment"}
        render={({ field }) => (
          <TextArea
            value={field.value}
            onChange={field.onChange}
            rows={2}
            placeholder={"вы можете сделать текст в виде кода применив ``"}
          />
        )}
      />
      <Button htmlType="submit" type="primary" style={{ marginTop: 15 }}>
        Add Comment
      </Button>
    </form>
  );
};

export default AddComment;
