import React from "react";
import { Platform } from "react-native";
import {
  createStackNavigator,
  createBottomTabNavigator
} from "react-navigation";

import TabBarLabel from "../components/TabBarLabel";
import TabBarIcon from "../components/TabBarIcon";
import SearchScreen from "../screens/SearchScreen";
import FavoritesScreen from "../screens/FavoritesScreen";

const SearchStack = createStackNavigator(
  {
    Search: SearchScreen
  },
  { header: null, headerMode: "none" }
);

SearchStack.navigationOptions = {
  tabBarLabel: ({ focused }) => (
    <TabBarLabel label={"Market Search"} focused={focused} />
  ),
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? `ios-list` : "md-list"}
    />
  )
};

const FavoritesStack = createStackNavigator(
  {
    Favorites: FavoritesScreen
  },
  { header: null, headerMode: "none" }
);

FavoritesStack.navigationOptions = {
  tabBarLabel: ({ focused }) => (
    <TabBarLabel label={"Favorites"} focused={focused} />
  ),
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === "ios" ? `ios-heart` : "md-heart"}
    />
  )
};

export default createBottomTabNavigator({
  SearchStack,
  FavoritesStack
});
