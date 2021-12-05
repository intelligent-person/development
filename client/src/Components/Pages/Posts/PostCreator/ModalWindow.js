import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Modal } from "antd";
import * as userHooks from "../../../../hooks/users";
import { queryClient } from "../../../../hooks/queryClient";

const ModalWindow = () => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  const mainUser = queryClient.getQueryData(["Main User"]);
  const updateUser = userHooks.useUpdateUser();
  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = async () => {
    setIsModalVisible(false);
    await updateUser.mutateAsync({
      ...mainUser,
      helpInPostCreate: 0,
    });
  };
  return (
    <Modal
      title={<h2>Как задать хороший вопрос</h2>}
      visible={isModalVisible}
      okText={"Не показывать мне это снова"}
      onOk={handleCancel}
      cancelText={"Задать вопрос"}
      onCancel={handleOk}
    >
      <p>
        Вы готовы задать свой первый вопрос, связанный с программированием, и
        сообщество здесь, чтобы помочь! Чтобы получить наилучшие ответы, мы
        предоставили несколько рекомендаций:
      </p>
      <p>
        Перед публикацией <NavLink to={"/questions"}>поищите на сайте</NavLink>{" "}
        , чтобы убедиться, что на ваш вопрос нет ответа.
      </p>
      <h3>1. Обобщите проблему</h3>
      <h3>2. Опишите, что вы пробовали</h3>
      <h3>3. При необходимости покажите код</h3>
    </Modal>
  );
};

export default ModalWindow;
