import { AppDataContext } from "context";
import React from "react";

const Users = () => {
  const { users, userRoles, getUsers, getUserRoles } =
    React.useContext(AppDataContext);

  React.useEffect(() => {
    if (users.length === 0) {
      getUsers();
    }
  });

  return (
    <div>
      {users.map((u) => (
        <div>{u.username}</div>
      ))}
    </div>
  );
};

export default Users;
