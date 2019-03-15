import React from 'react';
import { Platform, Text } from 'react-native';
import {
	createStackNavigator,
	createBottomTabNavigator,
} from 'react-navigation';

import SearchScreen from '../screens/SearchScreen';
import FavoritesScreen from '../screens/FavoritesScreen';

import Icon from '../components/Icon';
import { icons } from '../consts/icons';

import { styles } from '../styles/TabNavigator';
import { colors } from '../consts/colors';

const SearchStack = createStackNavigator(
	{
		Search: SearchScreen,
	},
	{ header: null, headerMode: 'none' }
);

SearchStack.navigationOptions = {
	tabBarLabel: ({ focused }) => {
		const { label } = styles;
		return (
			<Text
				style={[label, { color: focused ? colors.focused : colors.blured }]}
			>
				{'Market Search'}
			</Text>
		);
	},
	tabBarIcon: ({ focused }) => {
		return (
			<Icon
				name={icons.list[Platform.OS]}
				size={26}
				color={focused ? colors.focused : colors.blured}
			/>
		);
	},
};

const FavoritesStack = createStackNavigator(
	{
		Favorites: FavoritesScreen,
	},
	{ header: null, headerMode: 'none' }
);

FavoritesStack.navigationOptions = {
	tabBarLabel: ({ focused }) => {
		const { label } = styles;
		return (
			<Text
				style={[label, { color: focused ? colors.focused : colors.blured }]}
			>
				{'Favorites'}
			</Text>
		);
	},
	tabBarIcon: ({ focused }) => {
		return (
			<Icon
				name={icons.heart[Platform.OS]}
				size={26}
				color={focused ? colors.focused : colors.blured}
			/>
		);
	},
};

export default createBottomTabNavigator({
	SearchStack,
	FavoritesStack,
});
