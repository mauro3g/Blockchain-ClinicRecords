export interface IPermisions {
    create: boolean
    modify: boolean
    visualize: boolean
}
export interface IModule {
    id: string;
    name: string;
}
export interface IRole {
    id: string;
    name: string;
    description: string;
}
export interface IUser {
    userAddress: string;
    id: string;
    username: string;
    state: boolean;
}

export interface IAddUser {
    userAddress: string;
    id: string;
    username: string;
    password: string;
    roleType: string
}

export interface IUserRole {
    userId: string;
    roleId: string;
}

export interface IModulePermissions {
    moduleId: string;
    permisions: IPermisions;
}

export interface IRoleModules {
    roleId: string;
    modulePermissions: IModulePermissions[];
}

//interface for returning a session value
export interface ISession {
    userId: string;
    username: string;
    state: boolean;
    roleId: string;
}