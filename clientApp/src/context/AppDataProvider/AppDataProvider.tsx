import { EthNetworkContext } from "context";
import { MODULE_IDENTIFICATOR, PERMISSION_TYPE } from "lib/constants/modules";
import React from "react";
import { IAddUser, IUser, IUserRole } from "types/Session";
import { SessionContext } from "../SessionProvider/SessionProvider";

interface Props {
  users: IUser[];
  userRoles: IUserRole[];
  getUsers: () => Promise<void>;
  getUserRoles: () => Promise<void>;
}

export const AppDataContext = React.createContext({} as Props);

const AppDataProvider = ({ children }) => {
  const { sessionContract, currentAccount } =
    React.useContext(EthNetworkContext);
  const { hasPermissions } = React.useContext(SessionContext);
  const [users, setUsers] = React.useState<IUser[]>([]);
  const [userRoles, setUserRoles] = React.useState<IUserRole[]>([]);

  const requestRegisterUser = async (newUser: IAddUser) => {
    try {
      console.log("requestRegisterUser");
      const res = await sessionContract.methods
        .addUser(
          newUser.userAddress,
          newUser.id,
          newUser.username,
          newUser.password,
          newUser.roleType
        )
        .send({ from: currentAccount });
      console.log("user creation res: ", res);
    } catch (e: any) {
      if (e.message.includes("invalid address")) {
        throw new Error("La dirección Ethereum ingresada no es válida");
      } else {
        const errorData = e.message.toString();
        const jsonIndex = errorData.indexOf("{");
        const jsonString = errorData.slice(jsonIndex, errorData.length - 1);
        const jsonError = JSON.parse(jsonString);
        const txHash = Object.keys(jsonError.value.data)[0];
        console.log(jsonError.value.data[txHash]);
        throw new Error(jsonError.value.data[txHash]);
      }
    }
  };

  const getUsers = async () => {
    console.log("Get Users from: ", currentAccount);
    if (
      hasPermissions(
        MODULE_IDENTIFICATOR.USERS_MANAGE,
        PERMISSION_TYPE.VISUALIZE
      )
    ) {
      const _user = await sessionContract.methods
        .getUsers()
        .call({ from: currentAccount });
      if (_user !== undefined) {
        console.log("obtained users ", _user);
        setUsers(_user);
      } else {
        console.log("no se pudieron obtener usuarios");
      }
    }else{
      throw new Error("No tienes permisos para usar esta opción")
    }
  };

  const getUserRoles = async () => {
    const _userRoles: IUserRole[] = await sessionContract.methods
      .getUserRoles()
      .call();
    if (_userRoles !== undefined) {
      //console.log("obtained user roles ", _userRoles);
      setUserRoles(_userRoles);
    } else {
      console.log("no se pudieron obtener usuarios y roles");
    }
  };

  return (
    <AppDataContext.Provider
      value={{
        users,
        userRoles,
        getUsers,
        getUserRoles,
      }}
    >
      {children}
    </AppDataContext.Provider>
  );
};

export default AppDataProvider;
