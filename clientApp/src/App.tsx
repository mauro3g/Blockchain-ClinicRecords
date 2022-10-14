import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { EthNetworkProvider, SessionProvider, AppDataProvider } from "context";
import React from "react";
import { Routes } from "routes";
import { theme } from "styles";
import "./App.css";

function App() {
  return (
    <div>
      <CssBaseline />
      <ThemeProvider theme={theme}>
        <EthNetworkProvider>
          <SessionProvider>
            <AppDataProvider>
              <Routes />
            </AppDataProvider>
          </SessionProvider>
        </EthNetworkProvider>
      </ThemeProvider>
    </div>
  );
}

export default App;
