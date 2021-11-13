import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { Button, Modal } from "antd";

const ModalRedirect = () => {
  const [isModalVisible, setIsModalVisible] = useState(true);
  return (
    <Modal
      visible={isModalVisible}
      onCancel={() => setIsModalVisible(false)}
      footer={
        <NavLink to={"/questions"} onClick={() => setIsModalVisible(false)}>
          <Button type={"primary"}>Вернутся к вопросам</Button>
        </NavLink>
      }
    >
      <h1>Ваш вопрос опубликован!</h1>
    </Modal>
  );
};
export default ModalRedirect;
