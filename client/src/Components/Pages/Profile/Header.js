import React, { useState } from "react";
import styles from "./profile.module.css";
import DateComponent from "../../DateComponent/DateComponent";
import { Button, Input, Upload, message } from "antd";
import ImgCrop from "antd-img-crop";
import {
  EditOutlined,
  FacebookOutlined,
  GithubOutlined,
  InstagramOutlined,
  LinkedinOutlined,
  LoadingOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import * as userHooks from "../../../hooks/users";
import { queryClient } from "../../../hooks/queryClient";
import * as yup from "yup";
import { useTranslation } from "react-i18next";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams } from "react-router-dom";

const CreatorSchema = (t) =>
  yup.object().shape({
    name: yup
      .string()
      .required(t("errors.isRequired"))
      .min(3, t("errors.tooShort"))
      .max(30, t("errors.tooLong")),
  });

const Header = ({ picture, name, date, isOnline, links }) => {
  const { sub } = useParams();
  const [nameValue, setNameValue] = useState(name);
  const [telegramValue, setTelegramValue] = useState(links?.telegram);
  const [instagramValue, setInstagramValue] = useState(links?.instagram);
  const [facebookValue, setFaceBookValue] = useState(links?.facebook);
  const [githubValue, setGithubValue] = useState(links?.github);
  const [linkedInValue, setLinkedInValue] = useState(links?.linkedIn);
  const [isEditMode, setIsEditMode] = useState(false);
  const [uploadPhotoState, setUploadPhotoState] = useState({ loading: false });
  const updateUser = userHooks.useUpdateUser();
  const mainUser = queryClient.getQueryData(["Main User"]);
  const { t } = useTranslation();
  const defaultValues = { name };
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(CreatorSchema(t)),
    defaultValues,
  });

  function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  }

  function beforeUpload(file) {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  }

  const handleUploadPhoto = (info) => {
    if (info.file.status === "uploading") {
      setUploadPhotoState({ loading: true });
      return;
    }
    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (imageUrl) =>
        setUploadPhotoState({
          imageUrl,
          loading: false,
        })
      );
    }
  };
  const { loading, imageUrl } = uploadPhotoState;
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  const onChangeUser = async (data) => {
    await updateUser.mutateAsync({
      sub: mainUser.sub,
      links: {
        telegram: telegramValue,
        instagram: instagramValue,
        facebook: facebookValue,
        github: githubValue,
        linkedIn: linkedInValue,
      },
      name: data.name,
    });
    setNameValue(data.name);
    setIsEditMode(false);
  };
  return (
    <form onSubmit={handleSubmit(onChangeUser)} className={styles.header}>
      <div>
        {isEditMode ? (
          <ImgCrop rotate>
            <Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              showUploadList={false}
              action={`http://localhost:5000/api/users/uploadPhoto/${mainUser.sub}`}
              beforeUpload={beforeUpload}
              onChange={handleUploadPhoto}
            >
              {imageUrl ? (
                <img src={imageUrl} alt="avatar" style={{ width: "100%" }} />
              ) : (
                uploadButton
              )}
            </Upload>
          </ImgCrop>
        ) : (
          <img
            className={styles.img}
            src={imageUrl ? imageUrl : picture}
            alt={nameValue}
          />
        )}
      </div>
      <div>
        {isEditMode ? (
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                className={styles.name}
                value={field.value}
                onChange={field.onChange}
              />
            )}
          />
        ) : (
          <h1 className={styles.name}>{nameValue}</h1>
        )}
        {errors.name && <p className={styles.error}>{errors.name.message}</p>}
        <div className={styles.timeWrapper}>
          <div className={styles.time}>
            <img
              width="17"
              height="17"
              style={{ marginBottom: 5 }}
              src="https://cdn-icons-png.flaticon.com/512/1244/1244336.png"
              alt="register"
              title="register"
              className="loaded"
            />
            {" присоединился "}
            <DateComponent postDate={date} />
          </div>
          <div className={styles.time}>
            <img
              width="17"
              height="17"
              src="https://cdn-icons.flaticon.com/png/512/3818/premium/3818205.png?token=exp=1640126428~hmac=0115cd46b45ebffc3f35d57ee7f918a7"
              alt="online"
              title="online"
              style={{ marginBottom: 5, marginLeft: 10 }}
            />{" "}
            <DateComponent postDate={isOnline} />
          </div>
        </div>
        {isEditMode ? (
          <div className={styles.linkWrapper}>
            <img
              width="15"
              height="15"
              src="https://cdn-icons-png.flaticon.com/512/253/253802.png"
              alt="Телеграмма бесплатно иконка"
              title="Телеграмма бесплатно иконка"
              className="loaded"
            />
            <Input
              className={styles.input}
              value={telegramValue}
              onChange={(e) => setTelegramValue(e.target.value)}
            />
            <InstagramOutlined />
            <Input
              className={styles.input}
              value={instagramValue}
              onChange={(e) => setInstagramValue(e.target.value)}
            />
            <FacebookOutlined />
            <Input
              className={styles.input}
              value={facebookValue}
              onChange={(e) => setFaceBookValue(e.target.value)}
            />
            <GithubOutlined />
            <Input
              className={styles.input}
              value={githubValue}
              onChange={(e) => setGithubValue(e.target.value)}
            />
            <LinkedinOutlined />
            <Input
              className={styles.input}
              value={linkedInValue}
              onChange={(e) => setLinkedInValue(e.target.value)}
            />
          </div>
        ) : (
          <div className={styles.linkWrapper}>
            {telegramValue && (
              <a href={telegramValue} style={{ alignItems: "center" }}>
                <img
                  width="17"
                  height="17"
                  src="https://cdn-icons.flaticon.com/png/512/4401/premium/4401433.png?token=exp=1640179047~hmac=18e924199017ce2d1f59ccbb8b96bf06"
                  alt="Телеграмма бесплатно иконка"
                  title="Телеграмма бесплатно иконка"
                  className="loaded"
                />
              </a>
            )}
            {instagramValue && (
              <a href={instagramValue}>
                <InstagramOutlined className={styles.icon} />
              </a>
            )}
            {facebookValue && (
              <a href={facebookValue}>
                <FacebookOutlined className={styles.icon} />
              </a>
            )}
            {githubValue && (
              <a href={githubValue}>
                <GithubOutlined className={styles.icon} />
              </a>
            )}
            {linkedInValue && (
              <a href={linkedInValue}>
                <LinkedinOutlined className={styles.icon} />
              </a>
            )}
          </div>
        )}
      </div>
      {mainUser?.sub === sub && (
        <div className={styles.editIcon}>
          {isEditMode ? (
            <Button
              type={"text"}
              htmlType={"submit"}
              className={styles.editButton}
            >
              <EditOutlined className={styles.editIcon} />
            </Button>
          ) : (
            <EditOutlined
              onClick={() => setIsEditMode(true)}
              style={{ fontSize: 20 }}
            />
          )}
        </div>
      )}
    </form>
  );
};

export default Header;
