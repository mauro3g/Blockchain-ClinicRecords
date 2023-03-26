import React from "react";
import { EthNetworkContext } from "context";
import { INavigation } from "types/navigation";
import { IModule, IRole, IRoleModules, ISession } from "types/Session";
import { MENU_NAVIGATION } from "lib/constants/navigation";
import { useStorage } from "hooks";
import {
  LOCAL_STORAGE_USER_KEY,
  SESSION_DATE_KEY,
} from "lib/constants/storage";
import { IModulePermissions } from "../../types/Session";

interface Props {
  modules: IModule[];
  roles: IRole[];
  roleModules: IRoleModules[];
  navigation: INavigation[];
  openNav: boolean;
  sessionValuesActive: boolean;
  setOpenNav: React.Dispatch<boolean>;
  loggedUser: ISession | undefined;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  hasPermissions: (moduleId: string, permission: string) => boolean;
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
  const [permissionsIndex, setPermissionsIndex] = React.useState<number>(-1);
  const [sessionValuesActive, setSessionValuesActive] =
    React.useState<boolean>(false);

  const { saveItem, deleteItem, getItem } = useStorage();

  const {
    sessionContract,
    connectedContracts,
    handleOpenBackdrop,
    handleCloseBackdrop,
  } = React.useContext(EthNetworkContext);

  const getModules = async () => {
    const _modules: IModule[] = await sessionContract.methods
      .getModules()
      .call();
    if (_modules !== undefined) {
      //console.log("obtained modules ", _modules);
      setModules(_modules);
    } else {
      console.log("no se pudieron obtener modulos");
    }
  };

  const getRoles = async () => {
    const _roles: IRole[] = await sessionContract.methods.getRoles().call();
    if (_roles !== undefined) {
      //console.log("obtained roles ", _roles);
      setRoles(_roles);
    } else {
      console.log("no se pudieron obtener roles");
    }
  };

  const getRoleModules = async () => {
    const _roleModules: IRoleModules[] = await sessionContract.methods
      .getRoleModules()
      .call();
    if (_roleModules !== undefined) {
      //console.log("obtained role modules ", _roleModules);
      setRoleModules(_roleModules);
    } else {
      console.log("no se pudieron obtener modulos y roles");
    }
  };

  const createNavigation = (roleId: string) => {
    const _roleModule = roleModules.find((rm) => rm.roleId === roleId);
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

  const hasPermissions = React.useCallback(
    (moduleId: string, permission: string): boolean => {
      console.log("rolmod", roleModules);
      console.log("pi", permissionsIndex);
      const _modulePermissions: IModulePermissions | undefined = roleModules[
        permissionsIndex
      ].modulePermissions.find((mp) => mp.moduleId === moduleId);
      const _permission: boolean = _modulePermissions?.permisions[permission];
      return _permission;
    },
    [permissionsIndex]
  );

  const login = async (username: string, password: string) => {
    try {
      const _session: ISession = await sessionContract.methods
        .login(username, password)
        .call();
      if (_session !== undefined) {
        console.log("obtained session values ", _session);
        setLoggedUser(_session);
        saveItem(LOCAL_STORAGE_USER_KEY, _session);
        saveItem(SESSION_DATE_KEY, new Date());
      } else {
        console.log("no se pudo obtener informacion de sesion");
      }
    } catch (e: any) {
      console.log("error al iniciar sesion");
      console.log(e.message);
      if (e.message.toString().includes("Invalid username or password")) {
        throw new Error("Nombre de usuario o contraseña inválidos");
      }
      else if (e.message.toString().includes("revert Disabled user")) {
        
        throw new Error("Usuario Inactivo");
      }
    }
  };

  const logout = () => {
    console.log("logout");
    deleteItem(LOCAL_STORAGE_USER_KEY);
    deleteItem(SESSION_DATE_KEY);
    setLoggedUser(undefined);
  };

  React.useEffect(() => {
    if (sessionContract) {
      handleOpenBackdrop();
      getModules();
      getRoles();
      getRoleModules();
    }
  }, [sessionContract]);

  React.useEffect(() => {
    if (
      connectedContracts &&
      roleModules.length > 0 &&
      modules.length > 0 &&
      roles.length > 0
    ) {
      handleCloseBackdrop();
      if (Boolean(loggedUser)) {
        const _permissionsIndex = roleModules.findIndex(
          (rm) => rm.roleId === loggedUser?.roleId
        );
        console.log(_permissionsIndex);
        createNavigation(loggedUser?.roleId as string);
        setPermissionsIndex(_permissionsIndex);
        setSessionValuesActive(true);
      } else {
        const _storedSession = getItem(LOCAL_STORAGE_USER_KEY);
        if (Boolean(_storedSession)) {
          setLoggedUser({
            userId: _storedSession[0],
            username: _storedSession[1],
            state: _storedSession[2],
            roleId: _storedSession[3],
          });
        }
      }
    }
  }, [loggedUser, roleModules, modules, roles, connectedContracts]);

  return (
    <SessionContext.Provider
      value={{
        modules,
        roles,
        roleModules,
        navigation,
        openNav,
        sessionValuesActive,
        setOpenNav,
        loggedUser,
        login,
        logout,
        hasPermissions,
      }}
    >
      {children}
    </SessionContext.Provider>
  );
};

export default SessionProvider;
