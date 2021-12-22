import React from "react";
import { Button, Result } from "antd";
import { NavLink } from "react-router-dom";

const NotFound = () => {
  return (
    <Result
      status="404"
      title="404"
      subTitle="Sorry, the page you visited does not exist."
      extra={
        <NavLink to={"/questions?page=1&pageSize=10"}>
          <Button type="primary">Back Home</Button>
        </NavLink>
      }
    />
  );
};

export default NotFound;
