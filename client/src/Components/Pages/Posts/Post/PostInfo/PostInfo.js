import React, { useState } from "react";
import { Alert, Button, Row, Space } from "antd";
import { NavLink } from "react-router-dom";
import DateComponent from "../../../../DateComponent/DateComponent";
import { useTranslation } from "react-i18next";
import styles from "./postInfo.module.css";
import "../post.css";
import * as userHooks from "../../../../../hooks/users";
import * as postHooks from "../../../../../hooks/posts";
import MarkdownToPost from "../../../../Markdown/MarkdownToPost";
import Loader from "../../../../Loader/Loader";
import EditPost from "../EditPost";
import { EditOutlined } from "@ant-design/icons";
import SharePost from "../SharePost";
import { queryClient } from "../../../../../hooks/queryClient";

const PostInfo = ({ post }) => {
  const { t } = useTranslation();
  const mainUser = queryClient.getQueryData(["Main User"]);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isShareMode, setIsShareMode] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const deletePost = postHooks.useDeletePost();
  const { data, status, error } = userHooks.useUserById(post.userId);

  return status === "loading" ? (
    <Loader />
  ) : status === "error" ? (
    error.message
  ) : (
    <div className={"postHeader"}>
      <div className={"postHeader"}>
        <Row justify={"space-between"}>
          <h1 style={{ maxWidth: "80%" }}>{post.title}</h1>
          <NavLink to={mainUser ? "/questions/ask" : "/login"}>
            <Button type={"primary"}>{t("FilterComponent.AskQuestion")}</Button>
          </NavLink>
        </Row>
        <div style={{ display: "flex" }}>
          <div>{t("PostComponent.Date")}</div>
          <div style={{ margin: "0 30px 0 7px", fontWeight: 600 }}>
            <DateComponent postDate={post.date} />
          </div>
          <div>
            {t("PostComponent.Views")}{" "}
            <span style={{ fontWeight: 600 }}>{post.views}</span>
          </div>
        </div>
      </div>
      <div>
        <MarkdownToPost body={post.body} codeLanguage={post.codeLanguage} />
      </div>
      <div className={styles.user}>
        <div>
          <Button
            type={"text"}
            onClick={() =>
              isShareMode ? setIsShareMode(false) : setIsShareMode(true)
            }
            style={{ padding: 5 }}
          >
            {t("post.share")}
          </Button>
          {post.userId === mainUser?.sub && (
            <>
              <Button
                type={"text"}
                onClick={() =>
                  isEditMode ? setIsEditMode(false) : setIsEditMode(true)
                }
                style={{ padding: 8 }}
              >
                {t("post.edit")}
              </Button>
              <Button
                type={"text"}
                onClick={() =>
                  isDeleteMode ? setIsDeleteMode(false) : setIsDeleteMode(true)
                }
                style={{ padding: 8 }}
              >
                {t("post.delete")}
              </Button>
            </>
          )}
        </div>
        <div className={styles.userWrapper}>
          <div>
            <NavLink to={`/user/${data.name.split(" ").join("-")}/${data.sub}`}>
              <img src={data.picture} alt={data.name} />
            </NavLink>
          </div>
          <div>
            <div>
              <NavLink
                to={`/user/${data.name.split(" ").join("-")}/${data.sub}`}
              >
                {data.name}
              </NavLink>
            </div>
            <div>
              <strong>{data.reputation}</strong>
            </div>
          </div>
        </div>
      </div>

      {post.isEdited === true && <EditOutlined title={t("answer.edited")} />}
      {isEditMode && <EditPost post={post} setIsEditMode={setIsEditMode} />}
      {isShareMode && <SharePost />}
      {isDeleteMode && (
        <Alert
          className={styles.deleteModal}
          message={
            <>
              <strong>{t("post.deleteTitle")}</strong> <br />
              {t("post.deleteDescription")}
            </>
          }
          type="info"
          action={
            <Space direction="horizontal">
              <Button
                onClick={() => setIsDeleteMode(false)}
                size="small"
                type="primary"
              >
                {t("post.cancel")}
              </Button>
              <NavLink to={"/questions"}>
                <Button
                  onClick={async () => await deletePost.mutateAsync(post._id)}
                  size="small"
                  danger
                  type="ghost"
                >
                  {t("post.delete")}
                </Button>
              </NavLink>
            </Space>
          }
        />
      )}
    </div>
  );
};

export default PostInfo;
