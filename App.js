import React, { Component } from "react";
import { Provider } from "react-redux";
import { Provider as PaperProvider } from "react-native-paper";

import AppNavigator from "./navigation/AppNavigator";

import { store } from "./redux/store";

import { theme } from "./styles/App";

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PaperProvider theme={theme}>
          <AppNavigator />
        </PaperProvider>
      </Provider>
    );
  }
}

export default App;
