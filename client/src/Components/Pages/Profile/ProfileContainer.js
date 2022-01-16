import React from "react";
import { useParams } from "react-router-dom";
import Loader from "../../Loader/Loader";
import * as hooks from "../../../hooks/users";
import NotFound from "../../Results/NotFound";
import TopTags from "./TopTags";
import TopAnswers from "./TopAnswers";
import LastPosts from "./LastPosts";
import styles from "./profile.module.css";
import { Content } from "antd/es/layout/layout";
import About from "./About";
import Header from "./Header";
import { useTranslation } from "react-i18next";

const ProfileContainer = () => {
  const { t } = useTranslation();
  const { sub } = useParams();
  const { status, data, error } = hooks.useUserById(sub);

  return status === "loading" ? (
    <Loader />
  ) : status === "error" ? (
    error.message
  ) : !data ? (
    <NotFound />
  ) : (
    <Content className={styles.profileContent}>
      {data.sub === sub ? (
        <div>
          <Header
            isOnline={data.isOnline}
            name={data.name}
            date={data.date}
            links={data.links}
            picture={data.picture}
          />
          <div>
            <div className={styles.statBlock}>
              <div>
                <h2>{t("profile.stats")}</h2>
                <div className={styles.stat}>
                  <div className={styles.statWrapper}>
                    <div>
                      <h1>{data.reputation}</h1>
                      <h4>{t("profile.reputation")}</h4>
                    </div>
                    <div>
                      <h1>{data.answers}</h1>
                      <h4>{t("profile.answers")}</h4>
                    </div>
                  </div>
                  <div className={styles.statWrapper}>
                    <div>
                      <h1>{data.questions}</h1>
                      <h4>{t("profile.questions")}</h4>
                    </div>
                    <div>
                      <h1>{data.rang}</h1>
                      <h4>{t("profile.top")}</h4>
                    </div>
                  </div>
                </div>
              </div>
              <About status={data.status} />
            </div>
            <TopTags userId={sub} />
            <TopAnswers userId={sub} />
            <LastPosts userId={sub} />
          </div>
        </div>
      ) : (
        <Loader />
      )}
    </Content>
  );
};

export default ProfileContainer;
