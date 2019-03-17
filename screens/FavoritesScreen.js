import React, { Component } from 'react';
import { connect } from 'react-redux';

import { View, ScrollView } from 'react-native';
import {
	Appbar,
	DataTable,
	ActivityIndicator,
	Snackbar,
} from 'react-native-paper';

import DataRow from '../components/DataRow';

import { updateWatchlist } from '../redux/search/actions';
import { openSymbol } from '../redux/symbol/actions.js';

import { styles } from '../styles/MainScreen';

class FavoritesScreen extends Component {
	constructor(props) {
		super(props);
		this.state = {
			showSnackbar: false,
			snackbarMsg: '',
		};
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.isOpen) {
			this.props.navigation.navigate('Symbol');
		}
	}

	unfollowSymbol = (id, name) => {
		this.props.updateWatchlist(id, false);
		const snackbarMsg = `${name} removed from favorites`;
		this.setState({
			showSnackbar: true,
			snackbarMsg,
		});
	};

	openSymbol = id => {
		this.props.openSymbol(id);
	};

	renderRows = watchlist => {
		return watchlist.map(symbol => {
			const { id, displayName, price } = symbol;
			const average = (price.bid + price.ask) / 2;
			return (
				<DataRow
					key={id}
					name={displayName}
					value={average}
					following={true}
					followSymbol={() => this.unfollowSymbol(id, displayName)}
					openSymbol={() => this.openSymbol(id)}
				/>
			);
		});
	};

	renderSnackbar = () => {
		const { showSnackbar, snackbarMsg } = this.state;
		if (showSnackbar) {
			return (
				<Snackbar
					style={styles.snackbar}
					visible={showSnackbar}
					onDismiss={() => {
						this.setState({ showSnackbar: false });
					}}
					duration={3000}
				>
					{snackbarMsg}
				</Snackbar>
			);
		}
		return null;
	};

	renderLoaderOrSymbols = () => {
		const { watchlist } = this.props;
		const { datatable, overlay, activityIndicator } = styles;
		if (watchlist) {
			return (
				<ScrollView>
					<DataTable style={datatable}>{this.renderRows(watchlist)}</DataTable>
				</ScrollView>
			);
		} else {
			return (
				<View style={overlay}>
					<ActivityIndicator size={40} style={activityIndicator} />
				</View>
			);
		}
	};

	renderOpeningLoader = () => {
		const { opening } = this.props;
		const { overlay, indicator } = styles;
		if (opening) {
			return (
				<View style={overlay}>
					<ActivityIndicator size={40} style={indicator} />
				</View>
			);
		}
		return null;
	};

	render() {
		const { container, header } = styles;
		return (
			<View style={container}>
				<Appbar.Header style={header}>
					<Appbar.Content title="Favorites" />
				</Appbar.Header>
				{this.renderLoaderOrSymbols()}
				{this.renderSnackbar()}
				{this.renderOpeningLoader()}
			</View>
		);
	}
}

const mapStateToProps = state => ({
	watchlist: state.search.watchlist,
	opening: state.symbol.opening,
	isOpen: state.symbol.isOpen,
});

const mapDispatchToProps = dispatch => ({
	updateWatchlist: (id, following) => dispatch(updateWatchlist(id, following)),
	openSymbol: id => dispatch(openSymbol(id)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(FavoritesScreen);
