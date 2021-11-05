import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { Dropdown, Menu } from "antd";
import Avatar from "antd/es/avatar/avatar";
import { NavLink } from "react-router-dom";

const LogoutButton = () => {
  const { logout, user } = useAuth0();

  const menu = (
    <Menu>
      <Menu.Item key={"1"}>
        <NavLink to={"/profile"}>Profile</NavLink>
      </Menu.Item>
      <Menu.Item key={"2"} onClick={() => logout()} danger>
        Log out
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
