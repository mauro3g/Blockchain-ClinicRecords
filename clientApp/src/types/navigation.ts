export interface INavigation {
    text: string,
    to: string,
    icon: string
}

export interface IMenuOption {
    moduleId: string,
    navigation: INavigation
}