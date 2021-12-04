import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";

const defaultTheme = createTheme();

const theme = createTheme({
  palette: {
    primary: {
      main: "#06172b",
    },
    secondary: {
      main: "#bbafbb",
    },
    background: {
      default: "#324051",
      paper: "#626d7a",
    },
  },
  typography: {
    fontFamily: ['"Noto Sans JP"', defaultTheme.typography.fontFamily].join(
      ", "
    ),
  },
});
console.log(theme);

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
