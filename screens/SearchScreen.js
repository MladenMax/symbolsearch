import React, { Component } from "react";
import { connect } from "react-redux";

import { View, ScrollView } from "react-native";
import {
  Appbar,
  Searchbar,
  DataTable,
  ActivityIndicator,
  Snackbar
} from "react-native-paper";

import DataRow from "../components/DataRow";

import { getSymbols, updateWatchlist } from "../redux/search/actions";
import { getSymbol } from "../redux/symbol/actions.js";

import { styles } from "../styles/MainScreen";

class SearchScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      filtered: null,
      showSnackbar: false,
      snackbarMsg: ""
    };
  }

  componentWillMount() {
    this.props.getSymbols();
  }

  componentWillReceiveProps(nextProps) {
    const { symbol, charts, news  } = nextProps;
    if (news) {
      this.props.navigation.navigate("Symbol", { data: { symbol, charts } });
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
      filtered
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

    const following = !!watchlist.find(symbol => { return symbol.id === id });

    if (following) {
      snackbarMsg = `${name} removed from favorites`;
      updateWatchlist(id, !following);
    } else {
      snackbarMsg = `${name} added to favorites`;
      updateWatchlist(id, !following);
    }
    this.setState({
      showSnackbar: true,
      snackbarMsg
    });

  };

  openSymbol = id => {
    this.props.getSymbol(id);
  };

  renderRows = (symbols, watchlist) => {
    return symbols.map((symbol, key) => {
      const { id, name, price } = symbol;
      const average = (price.bid + price.ask) / 2;
      const following = !!watchlist.find(symbol => { return symbol.id === id });
      return (
        <DataRow
          key={key}
          name={name}
          value={average}
          following={following}
          followSymbol={() => this.followSymbol(id, name)}
          openSymbol={() => this.openSymbol(id)}
        />
      );
    });
  };

  renderSymbols = symbols => {
    const { watchlist } = this.props;
    const { datatable, activityIndicator } = styles;
    if (watchlist) {
      return (
        <ScrollView>
          <DataTable style={datatable}>
            {this.renderRows(symbols, watchlist)}
          </DataTable>
        </ScrollView>
      );
    }
    return <ActivityIndicator size={40} style={activityIndicator} />;
  }

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
  }

  renderOverlay = () => {
    const { overlay, activityIndicator } = styles;
    if (this.props.loading) {
      return (
        <View style={overlay}>
          <ActivityIndicator size={40} style={activityIndicator} />
        </View>
      )
    }
  }

  render() {
    const { query, filtered } = this.state;
    const { container, header, searchbar } = styles;
    const symbols = filtered ? filtered : this.props.symbols;
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
        {this.renderOverlay()}
        {this.renderSymbols(symbols)}
        {this.renderSnackbar()}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  symbols: state.search.symbols,
  watchlist: state.search.watchlist,
  loading: state.symbol.loading,
  symbol: state.symbol.symbol,
  charts: state.symbol.charts,
  news: state.symbol.news
});

const mapDispatchToProps = dispatch => ({
  getSymbols: () => dispatch(getSymbols()),
  updateWatchlist: (id, following) => dispatch(updateWatchlist(id, following)),
  getSymbol: id => dispatch(getSymbol(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchScreen);
