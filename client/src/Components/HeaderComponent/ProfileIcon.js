import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import Avatar from "antd/es/avatar/avatar";
import * as hooks from "../../hooks/users";
import { NavLink } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";

const ProfileIcon = () => {
  const { user } = useAuth0();
  const { status, data } = hooks.useUserById(user.sub);

  return (
    status !== "loading" && (
      <div>
        <NavLink to={`/user/${data.name?.replaceAll(" ", "-")}/${user.sub}`}>
          {data.picture ? (
            <Avatar src={data.picture} />
          ) : (
            <Avatar
              style={{ backgroundColor: "#87d068" }}
              icon={<UserOutlined />}
            />
          )}
        </NavLink>
      </div>
    )
  );
};

export default ProfileIcon;
