import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigator from "./app/screens/Index.js";
import * as ReducerHelper from "./app/store/ReducerHelper.js";
import { Provider } from "react-redux";
import store from "./app/store/Store.js";
import { NavigationTheme } from "./app/styles/Styles.js"

class App extends React.Component {
  render() {
    return (
      <Provider store={store}>
        <NavigationContainer theme={NavigationTheme}>
          <MainNavigator />
        </NavigationContainer>
      </Provider>
    );
  }
}

export default App;