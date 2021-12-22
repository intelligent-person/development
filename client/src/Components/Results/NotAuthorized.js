import React from "react";
import { Button, Result } from "antd";
import { NavLink } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";

const NotAuthorized = () => {
  const { loginWithRedirect } = useAuth0();
  return (
    <Result
      status="403"
      title="403"
      subTitle="Sorry, you are not authorized to access this page."
      extra={
        <>
          <NavLink to={"/questions?page=1&pageSize=10"}>
            <Button type="default">Back Home</Button>
          </NavLink>
          <Button onClick={() => loginWithRedirect()} type="primary">
            Authorize
          </Button>
        </>
      }
    />
  );
};

export default NotAuthorized;
