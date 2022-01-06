import React from "react";
import { useTranslation } from "react-i18next";
import * as userHooks from "../../../../hooks/users";
import styles from "../posts.module.css";
import ShortPostUser from "./ShortPostUser";
import ShortPostInfo from "./ShortPostInfo";
import ShortPostBody from "./ShortPostBody";
import Loader from "../../../Loader/Loader";

const PostShortContent = ({ post }) => {
  const { t } = useTranslation();
  const mobile = window.innerWidth < 450 && true;
  const { data, status, error } = userHooks.useUserById(post.userId);

  return status === "loading" ? (
    <Loader />
  ) : status === "error" ? (
    error.message
  ) : (
    <div key={post._id} className={styles.post}>
      {mobile ? (
        <>
          <ShortPostBody post={post} />
          <div className={styles.postWrapper}>
            <ShortPostUser post={post} data={data} />
            <ShortPostInfo post={post} />
          </div>
        </>
      ) : (
        <>
          <ShortPostInfo post={post} />
          <ShortPostBody post={post} />
          <ShortPostUser post={post} data={data} />
        </>
      )}
    </div>
  );
};

export default PostShortContent;
