import React, { useState } from "react";
import styles from "./profile.module.css";
import { EditOutlined } from "@ant-design/icons";
import * as userHooks from "../../../hooks/users";
import { queryClient } from "../../../hooks/queryClient";
import TextArea from "antd/es/input/TextArea";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { Button } from "antd";
import { useParams } from "react-router-dom";

const CreatorSchema = (t) =>
  yup.object().shape({
    status: yup
      .string()
      .min(3, t("errors.tooShort"))
      .max(200, t("errors.tooLong")),
  });

const About = ({ status }) => {
  const { sub } = useParams();
  const { t } = useTranslation();
  const [statusValue, setStatusValue] = useState(status);
  const [isEditStatus, setIsEditStatus] = useState(false);
  const updateUser = userHooks.useUpdateUser();
  const mainUser = queryClient.getQueryData(["Main User"]);
  const defaultValues = { status };
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CreatorSchema(t)),
    defaultValues,
  });
  const onChangeStatus = async (data) => {
    await updateUser.mutateAsync({ sub: mainUser.sub, status: data.status });
    setStatusValue(data.status);
    setIsEditStatus(false);
  };
  return (
    <form onSubmit={handleSubmit(onChangeStatus)}>
      <div className={styles.aboutWrapper}>
        <h2>About</h2>
        {mainUser?.sub === sub && (
          <div className={styles.editIcon}>
            {isEditStatus ? (
              <Button
                type={"text"}
                htmlType={"submit"}
                className={styles.editButton}
              >
                <EditOutlined className={styles.editIcon} />
              </Button>
            ) : (
              <EditOutlined
                onClick={() => setIsEditStatus(true)}
                className={styles.editIcon}
              />
            )}
          </div>
        )}
      </div>
      {errors.status && <p className={styles.error}>{errors.status.message}</p>}
      {isEditStatus ? (
        <Controller
          name="status"
          control={control}
          render={({ field }) => (
            <TextArea value={field.value} onChange={field.onChange} />
          )}
        />
      ) : (
        <h3 className={styles.status}>{statusValue}</h3>
      )}
    </form>
  );
};

export default React.memo(About);
