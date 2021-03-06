import React, { useState } from "react";
import styles from "./profile.module.css";
import DateComponent from "../../DateComponent/DateComponent";
import { Button, Input, Upload, message } from "antd";
import imageCompression from "browser-image-compression";
import ImgCrop from "antd-img-crop";
import {
  EditOutlined,
  FacebookOutlined,
  FieldTimeOutlined,
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
  const [nameValue, setNameValue] = useState(name.split("@")[0]);
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
  const mobile = window.innerWidth < 450 && true;
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
  const transform = async (info) => {
    const imageFile = info;

    const options = {
      maxSizeMB: 0.01,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };

    try {
      const compressedFile = await imageCompression(imageFile, options);
      return compressedFile;
    } catch (error) {
      console.log(error);
    }
  };
  const { loading, imageUrl } = uploadPhotoState;
  const uploadButton = (
    <div className={styles.upload}>
      <div className={styles.uploadIcon}>
        {loading ? <LoadingOutlined /> : <PlusOutlined />}
      </div>
      <div style={{ marginTop: 8 }}>{t("profile.upload")}</div>
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
              listType={!mobile && "picture-card"}
              className="avatar-uploader"
              showUploadList={false}
              action={`${
                process.env.BASEURL ||
                "https://forumintelligent.herokuapp.com/api"
              }/users/uploadPhoto/${mainUser.sub}`}
              beforeUpload={beforeUpload}
              onChange={handleUploadPhoto}
              transformFile={transform}
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
                style={{ marginBottom: 10 }}
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
            {mobile ? " " : t("profile.register")}
            <DateComponent postDate={date} />
          </div>
          <div className={styles.time}>
            <FieldTimeOutlined style={{ fontSize: 15 }} />
            {t("profile.online")}
            <DateComponent postDate={isOnline} />
          </div>
        </div>
        {isEditMode ? (
          <div className={styles.linkWrapper}>
            <div className={styles.link}>
              <img
                width="15"
                height="15"
                src="https://cdn-icons-png.flaticon.com/512/253/253802.png"
                alt="???????????????????? ?????????????????? ????????????"
                title="???????????????????? ?????????????????? ????????????"
                className="loaded"
              />
              <Input
                className={styles.input}
                value={telegramValue}
                onChange={(e) => setTelegramValue(e.target.value)}
              />
            </div>
            <div className={styles.link}>
              <InstagramOutlined />
              <Input
                className={styles.input}
                value={instagramValue}
                onChange={(e) => setInstagramValue(e.target.value)}
              />
            </div>
            <div className={styles.link}>
              <FacebookOutlined />
              <Input
                className={styles.input}
                value={facebookValue}
                onChange={(e) => setFaceBookValue(e.target.value)}
              />
            </div>
            <div className={styles.link}>
              <GithubOutlined />
              <Input
                className={styles.input}
                value={githubValue}
                onChange={(e) => setGithubValue(e.target.value)}
              />
            </div>
            <div className={styles.link}>
              <LinkedinOutlined />
              <Input
                className={styles.input}
                value={linkedInValue}
                onChange={(e) => setLinkedInValue(e.target.value)}
              />
            </div>
          </div>
        ) : (
          <div className={styles.linkWrapper}>
            {telegramValue && (
              <a href={telegramValue} style={{ alignItems: "center" }}>
                <img src="https://img.icons8.com/color/17/000000/telegram-app--v1.png" />
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
