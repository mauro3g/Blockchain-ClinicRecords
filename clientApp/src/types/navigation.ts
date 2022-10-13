export interface INavigation {
    text: string,
    to: string,
    icon: string
}

export interface IMenuOption {
    moduleId: number,
    navigation: INavigation
}