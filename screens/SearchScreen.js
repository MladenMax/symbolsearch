import React, { Component } from "react";
import { connect } from "react-redux";
import find from "lodash/find";

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

    const following = !!find(watchlist, symbol => { return symbol.id === id });

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

  openSymbol = (id, name) => {
    this.props.getSymbol(id);
    this.props.navigation.navigate("Symbol", { id, name });
  };

  renderRows = symbols => {
    const { watchlist } = this.props;
    return symbols.map((symbol, key) => {
      const { id, name, price } = symbol;
      const average = (price.bid + price.ask) / 2;
      const following = !!find(watchlist, symbol => { return symbol.id === id });
      return (
        <DataRow
          key={key}
          name={name}
          value={average}
          following={following}
          onHeartPress={() => this.followSymbol(id, name)}
          onNamePress={() => this.openSymbol(id, name)}
        />
      );
    });
  };

  renderSymbols = symbols => {
    const { datatable, activityIndicator } = styles;
    if (this.props.watchlist) {
      return (
        <ScrollView>
          <DataTable style={datatable}>
            {this.renderRows(symbols)}
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

        {this.renderSymbols(symbols)}
        {this.renderSnackbar()}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  symbols: state.search.symbols,
  watchlist: state.search.watchlist
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
