import React from "react";

const Users = ({ users, deleteUser }) => {
  return (
    <div>
      {users.map((user) => (
        <div key={user._id}>
          <img
            style={{ width: "50px", height: "50px" }}
            src={`${user.picture}`}
            alt=""
          />
          <b>{user.name}</b> <br />
          Reputation: <b>{user.reputation}</b> <br />
          <b>{user.status}</b>
          <button onClick={() => deleteUser(user._id)}>DELETE</button>
        </div>
      ))}
    </div>
  );
};

export default React.memo(Users);
