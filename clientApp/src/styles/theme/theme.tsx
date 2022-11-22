import { blue, red } from "@mui/material/colors";
import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    highlightBlue: Palette["primary"];
    highlightGreen: Palette["primary"];
  }

  // allow configuration using `createTheme`
  interface PaletteOptions {
    highlightBlue: PaletteOptions["primary"];
    highlightGreen: PaletteOptions["primary"];
  }
}

const theme = createTheme({
  palette: {
    primary: {
      main: blue[800],
      light: blue[400],
      dark: blue[900],
    },
    secondary: {
      main: red[600],
      light: red[400],
      dark: red[900],
    },
    highlightBlue: {
      main: "#bbdefb",
    },
    highlightGreen: {
      main: "#dcedc8",
    },
  },

  typography: {
    fontFamily: "Roboto",
  },

  components: {
    // Name of the component
    MuiButton: {
      styleOverrides: {
        // Name of the slot
        root: {
          // Some CSS
          fontSize: '1rem',
          borderRadius: '20px'
        },
      },
    },
  },
});

export default theme;
