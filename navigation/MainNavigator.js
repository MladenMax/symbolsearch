import { createStackNavigator } from 'react-navigation';

import TabNavigator from './TabNavigator';
import SymbolScreen from '../screens/SymbolScreen';

const MainStackNavigator = createStackNavigator(
	{
		Tabs: TabNavigator,
		Symbol: SymbolScreen,
	},
	{
		mode: 'modal',
		header: null,
		headerMode: 'none',
	}
);

export default MainStackNavigator;
