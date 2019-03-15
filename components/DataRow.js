import React from 'react';
import { Platform, Text } from 'react-native';
import { DataTable } from 'react-native-paper';
import PropTypes from 'prop-types';

import Icon from '../components/Icon';
import { icons } from '../consts/icons';
import { colors } from '../consts/colors';

import { styles } from '../styles/DataRow';

const DataRow = ({ name, value, following, followSymbol, openSymbol }) => {
	const { row, nameCell, valueCell, valueText, followingCell } = styles;
	return (
		<DataTable.Row style={row}>
			<DataTable.Cell style={nameCell} onPress={openSymbol}>
				{name}
			</DataTable.Cell>
			<DataTable.Cell style={valueCell}>
				<Text style={valueText}>{`$ ${value.toFixed(2)}`}</Text>
			</DataTable.Cell>
			<DataTable.Cell style={followingCell} onPress={followSymbol}>
				<Icon
					name={
						following
							? icons.heart[Platform.OS]
							: icons.heart_empty[Platform.OS]
					}
					size={25}
					color={following ? colors.follow : colors.unfollow}
				/>
			</DataTable.Cell>
		</DataTable.Row>
	);
};

DataRow.propTypes = {
	name: PropTypes.string,
	value: PropTypes.number,
	following: PropTypes.bool,
	followSymbol: PropTypes.func,
	openSymbol: PropTypes.func,
};

export default DataRow;
