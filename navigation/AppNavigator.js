import {
  createAppContainer,
  createStackNavigator,
  createSwitchNavigator
} from "react-navigation";

import SignInScreen from "../screens/SignInScreen";
import MainNavigator from "./MainNavigator";

export default createAppContainer(
  createSwitchNavigator(
    {
      SignIn: createStackNavigator({ SignIn: SignInScreen }),
      Main: MainNavigator
    },
    {
      initialRouteName: "SignIn",
      header: null,
      headerMode: "none"
    }
  )
);
