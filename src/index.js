import React from "react";
import ReactDom from "react-dom";
import "@fontsource/lato";

import App from "./App";
import { MuiThemeProvider } from "@material-ui/core/styles";
import { createTheme } from "@material-ui/core/styles";

const THEME = createTheme({
  typography: {
    fontFamily: `"Lato", sans-serifs`,
    fontSize: 14,
    fontWeightLight: 300,
    fontWeightRegular: 400,
    fontWeightMedium: 500,
  },
});

const AppWithTheme = () => (
  <MuiThemeProvider theme={THEME}>
    <App />
  </MuiThemeProvider>
);

ReactDom.render(<AppWithTheme />, document.getElementById("app"));
