import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import { ConnectedRouter } from "connected-react-router";
import { SnackbarProvider } from "notistack";
import React from "react";
import { render } from "react-dom";
import { Provider } from "react-redux";
import App from "./App";
import configureStore, { history } from "./configureStore";
import "bootstrap/dist/css/bootstrap.min.css";
import "./styles/styles.scss";
import "./Assets/Styles/style.css";
import "./Assets/Styles/style.scss";
import "./Assets/Styles/media-query.scss";

import * as serviceWorker from "./serviceWorker";

const theme = createMuiTheme({
  palette: {
    secondary: {
      main: "#ff6400"
    },
    primary: {
      main: "#1a91a9"
    }
  },
  typography: {
    // Use the system font instead of the default Roboto font.
    fontFamily: ["Muli-Regular"].join(",")
    // useNextVariants: true
  }
});

export const store = configureStore();
const renderApp = () =>
  render(
    <MuiThemeProvider theme={theme}>
      <Provider store={store}>
        <SnackbarProvider maxSnack={3} preventDuplicate>
          <ConnectedRouter history={history}>
            <App />
          </ConnectedRouter>
        </SnackbarProvider>
      </Provider>
    </MuiThemeProvider>,
    document.getElementById("root")
  );

if (process.env.NODE_ENV !== "production" && module.hot) {
  module.hot.accept("./App", renderApp);
}

renderApp();

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();

// export default socket;
