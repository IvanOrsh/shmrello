import { createTheme, Theme } from "@mui/material";

const theme: Theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#9fc7e3",
    },
    secondary: {
      main: "#e3e8ae",
    },
    background: {
      // default: "#BEA4FF"
      default: "#1D1F26",
    },
  },

  typography: {
    fontFamily: "Lato, sans-serif",
    h5: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 700,
    },
    button: {
      textTransform: "unset",
      fontWeight: 700,
    },
  },

  shape: {
    borderRadius: 0,
  },
});

export default theme;
