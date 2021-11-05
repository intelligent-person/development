import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Dropdown, Menu } from "antd";
import Avatar from "antd/es/avatar/avatar";
import { NavLink } from "react-router-dom";
import "../../utils/i18n";
import { useTranslation } from "react-i18next";
import { ZhihuOutlined } from "@ant-design/icons";

const LogoutButton = () => {
  const { logout, user } = useAuth0();
  const { t, i18n } = useTranslation();
  const { SubMenu } = Menu;

  const menu = (
    <Menu>
      <Menu.Item key={"1"}>
        <NavLink to={"/profile"}>{t("Logout.Profile")}</NavLink>
      </Menu.Item>
      <SubMenu
        key="2"
        icon={<ZhihuOutlined />}
        title={t("Logout.ChangeLanguage")}
      >
        <Menu.Item key="4" onClick={() => i18n.changeLanguage("ua")}>
          UA
        </Menu.Item>
        <Menu.Item key="5" onClick={() => i18n.changeLanguage("ru")}>
          RU
        </Menu.Item>
        <Menu.Item key="6" onClick={() => i18n.changeLanguage("en")}>
          EN
        </Menu.Item>
      </SubMenu>
      <Menu.Item key={"3"} onClick={() => logout()} danger>
        {t("Logout.Out")}
      </Menu.Item>
    </Menu>
  );
  return (
    <Dropdown overlay={menu}>
      <a
        className="ant-dropdown-link"
        onClick={(e) => e.preventDefault()}
        href={"#"}
      >
        <Avatar src={user.picture} />
      </a>
    </Dropdown>
  );
};

export default React.memo(LogoutButton);
