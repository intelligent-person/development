import React from "react";
import * as hooks from "../../../hooks/users/index";
import Loader from "../../Loader/Loader";
import { message } from "antd";

const Users = () => {
  const { status, data, error, refetch } = hooks.useFetchUsers();
  const deleteUser = hooks.useDeleteUsers();
  return status === "loading" ? (
    <Loader />
  ) : status === "error" ? (
    message.error(error.message)
  ) : (
    <>
      {data.map((user) => (
        <div key={user._id}>
          <img
            style={{ width: "50px", height: "50px" }}
            src={`${user.picture}`}
            alt=""
          />
          <b>{user.name}</b> <br />
          Reputation: <b>{user.reputation}</b> <br />
          <b>{user.status}</b>
          {/*<button onClick={() => dispatch(deleteUser(user._id))}>DELETE</button>*/}
          <button
            onClick={async () => {
              await deleteUser.mutateAsync(user._id);
              refetch();
            }}
          >
            DELETE
          </button>
        </div>
      ))}
    </>
  );
};

export default React.memo(Users);
