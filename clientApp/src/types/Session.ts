export interface IPermisions {
    create: boolean
    modify: boolean
    visualize: boolean
}
export interface IModule {
    id: number;
    name: string;
}
export interface IRole {
    id: number;
    name: string;
    description: string;
}
export interface IUser {
    userAddress: string;
    id: number;
    username: string;
    state: boolean;
}

export interface IUserRole {
    userId: number;
    roleId: number;
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