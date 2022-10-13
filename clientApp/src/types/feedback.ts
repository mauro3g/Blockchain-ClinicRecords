import { AlertProps } from "@mui/material";

export interface IMessageConfig {
    open: boolean,
    message: string,
    severity: AlertProps["severity"]
}