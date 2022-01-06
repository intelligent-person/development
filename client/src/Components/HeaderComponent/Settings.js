import React from "react";
import { SettingOutlined } from "@ant-design/icons";
import { Dropdown, Menu } from "antd";
import { useAuth0 } from "@auth0/auth0-react";
import { useTranslation } from "react-i18next";

const Settings = () => {
  const { logout, isAuthenticated } = useAuth0();
  const { t, i18n } = useTranslation();
  const { SubMenu } = Menu;
  const menu = (
    <Menu>
      <SubMenu
        key="2"
        icon={<>{i18n.language.toUpperCase()} </>}
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
      {isAuthenticated && (
        <Menu.Item key={"3"} onClick={() => logout()} danger>
          {t("Logout.Out")}
        </Menu.Item>
      )}
    </Menu>
  );
  return (
    <div style={{ marginTop: 6, marginLeft: 15 }}>
      <Dropdown overlay={menu} trigger={["click"]}>
        <a
          className="ant-dropdown-link"
          onClick={(e) => e.preventDefault()}
          href={"#"}
        >
          <SettingOutlined style={{ color: "white", fontSize: 25 }} />
        </a>
      </Dropdown>
    </div>
  );
};

export default Settings;
