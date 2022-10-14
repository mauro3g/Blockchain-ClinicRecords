import React from "react";
import { EthNetworkContext } from "context";
import { INavigation } from "types/navigation";
import {
  IModule,
  IRole,
  IRoleModules,
  ISession,
  IUserRole,
} from "types/Session";
import { MENU_NAVIGATION } from "lib/constants/navigation";

interface Props {
  modules: IModule[];
  roles: IRole[];
  roleModules: IRoleModules[];
  navigation: INavigation[];
  openNav: boolean;
  setOpenNav: React.Dispatch<boolean>;
  loggedUser: ISession | undefined;
  login: (username: string, password: string) => Promise<void>
}

export const SessionContext = React.createContext({} as Props);

const SessionProvider = ({ children }) => {
  const [modules, setModules] = React.useState<IModule[]>([]);
  const [roles, setRoles] = React.useState<IRole[]>([]);
  const [roleModules, setRoleModules] = React.useState<IRoleModules[]>([]);
  const [navigation, setNavigation] = React.useState<INavigation[]>([]);
  const [openNav, setOpenNav] = React.useState<boolean>(false);
  const [loggedUser, setLoggedUser] = React.useState<ISession | undefined>(
    undefined
  );

  const { sessionContract } = React.useContext(EthNetworkContext);

  const getModules = async () => {
    console.log("Get Modules");
    const _modules: IModule[] = await sessionContract.methods
      .getModules()
      .call();
    if (_modules !== undefined) {
      console.log("obtained modules ", _modules);
      setModules(_modules);
    } else {
      console.log("no se pudieron obtener modulos");
    }
  };

  const getRoles = async () => {
    console.log("Get Roles");
    const _roles: IRole[] = await sessionContract.methods.getRoles().call();
    if (_roles !== undefined) {
      console.log("obtained roles ", _roles);
      setRoles(_roles);
    } else {
      console.log("no se pudieron obtener roles");
    }
  };

  

  const getRoleModules = async () => {
    console.log("Get Role Modules");
    const _roleModules: IRoleModules[] = await sessionContract.methods
      .getRoleModules()
      .call();
    if (_roleModules !== undefined) {
      console.log("obtained role modules ", _roleModules);
      setRoleModules(_roleModules);
    } else {
      console.log("no se pudieron obtener modulos y roles");
    }
  };

  const createNavigation = (roleId: string) => {
    const _roleModule = roleModules.find(
      (rm) => rm.roleId === roleId
    );
    const _navigation: INavigation[] = [];
    _roleModule?.modulePermissions.forEach((mp) => {
      let menuNavigation = MENU_NAVIGATION.find(
        (mn) => mn.moduleId.toString() === mp.moduleId
      );
      if (Boolean(menuNavigation)) {
        _navigation.push(menuNavigation?.navigation as INavigation);
      }
    });
    setNavigation(_navigation);
  };

  const login = async(username: string, password: string) => {
    console.log("Login");
    const _session: ISession = await sessionContract.methods
      .login(username, password)
      .call();
    if (_session !== undefined) {
      console.log("obtained session values ", _session);
      setLoggedUser(_session);
    } else {
      console.log("no se pudo obtener informacion de sesion");
    }
  }

  React.useEffect(() => {
    getModules();
    getRoles();
    getRoleModules();
  }, [sessionContract]);

  React.useEffect(() => {
    if (roleModules.length > 0 && Boolean(loggedUser)) {
      createNavigation(loggedUser?.roleId as string);
    }
  }, [loggedUser]);

  return (
    <SessionContext.Provider
      value={{
        modules,
        roles,
        roleModules,
        navigation,
        openNav,
        setOpenNav,
        loggedUser,
        login
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
