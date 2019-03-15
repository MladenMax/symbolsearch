import React, { Component } from 'react';
import { connect } from 'react-redux';

import { View, ScrollView } from 'react-native';
import {
	Appbar,
	Searchbar,
	DataTable,
	ActivityIndicator,
	Snackbar,
} from 'react-native-paper';

import DataRow from '../components/DataRow';

import { getSymbols, updateWatchlist } from '../redux/search/actions';
import { openSymbol } from '../redux/symbol/actions.js';

import { styles } from '../styles/MainScreen';

class SearchScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			query: '',
			filtered: null,
			showSnackbar: false,
			snackbarMsg: '',
		};
	}

	componentWillMount() {
		this.props.getSymbols();
	}

	componentWillReceiveProps(nextProps) {
		if (nextProps.isOpen) {
			this.props.navigation.navigate('Symbol');
		}
	}

	filterList = (list, query) => {
		return list.filter(item => item.name.startsWith(query));
	};

	onChange = query => {
		const { symbols } = this.props;
		const filtered = this.filterList(symbols, query);
		this.setState({
			query,
			filtered,
		});
	};

	onSearch = () => {
		const { query } = this.state;
		const { symbols } = this.props;
		const filtered = this.filterList(symbols, query);
		this.setState({ filtered });
	};

	followSymbol = (id, name) => {
		const { watchlist, updateWatchlist } = this.props;

		const following = !!watchlist.find(symbol => {
			return symbol.id === id;
		});

		if (following) {
			snackbarMsg = `${name} removed from favorites`;
			updateWatchlist(id, !following);
		} else {
			snackbarMsg = `${name} added to favorites`;
			updateWatchlist(id, !following);
		}
		this.setState({
			showSnackbar: true,
			snackbarMsg,
		});
	};

	openSymbol = id => {
		this.props.openSymbol(id);
	};

	renderRows = (symbols, watchlist) => {
		return symbols.map(symbol => {
			const { id, name, price } = symbol;
			const average = (price.bid + price.ask) / 2;
			const following = !!watchlist.find(symbol => {
				return symbol.id === id;
			});
			return (
				<DataRow
					key={id}
					name={name}
					value={average}
					following={following}
					followSymbol={() => this.followSymbol(id, name)}
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
		const { filtered } = this.state;
		const { symbols, watchlist } = this.props;
		const { datatable, overlay, indicator } = styles;
		if (watchlist) {
			const toRender = filtered ? filtered : symbols;
			return (
				<ScrollView>
					<DataTable style={datatable}>
						{this.renderRows(toRender, watchlist)}
					</DataTable>
				</ScrollView>
			);
		} else {
			return (
				<View style={overlay}>
					<ActivityIndicator size={40} style={indicator} />
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
		const { query } = this.state;
		const { container, header, searchbar } = styles;
		return (
			<View style={container}>
				<Appbar.Header style={header}>
					<Appbar.Content title="Market Search" />
				</Appbar.Header>

				<Searchbar
					style={searchbar}
					placeholder="Search"
					onChangeText={query => {
						this.onChange(query);
					}}
					onIconPress={() => {
						this.onSearch();
					}}
					value={query}
				/>
				{this.renderLoaderOrSymbols()}
				{this.renderSnackbar()}
				{this.renderOpeningLoader()}
			</View>
		);
	}
}

const mapStateToProps = state => ({
	symbols: state.search.symbols,
	watchlist: state.search.watchlist,
	opening: state.symbol.opening,
	isOpen: state.symbol.isOpen,
});

const mapDispatchToProps = dispatch => ({
	getSymbols: () => dispatch(getSymbols()),
	updateWatchlist: (id, following) => dispatch(updateWatchlist(id, following)),
	openSymbol: id => dispatch(openSymbol(id)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SearchScreen);
