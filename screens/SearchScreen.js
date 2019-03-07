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

import {
  symbolSearch,
  getWatchlist,
  addSymbolToWatchlist,
  removeSymbolFromWatchlist
} from "../redux/symbol/actions";

import { styles } from "../styles/MainScreen";

class SearchScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      query: "",
      symbols: null,
      filtered: null,
      watchlist: {},
      showSnackbar: false,
      snackbarMsg: ""
    };
  }

  componentWillMount() {
    const { symbolSearch, getWatchlist, navigation } = this.props;
    symbolSearch();
    navigation.addListener("willFocus", () => {
      getWatchlist();
    });
  }

  componentWillUnmount() {
    this.props.navigation.removeListener("willFocus");
  }

  componentWillReceiveProps(nextProps) {
    const { symbols, watchlist } = nextProps;

    if (symbols) {
      this.setState({ symbols });
    }

    if (watchlist) {
      this.setState({ watchlist });
    }
  }

  filterList = (list, query) => {
    return list.filter(item => item.displayName.startsWith(query));
  };

  onChangeText = query => {
    const { symbols } = this.state;
    const filtered = this.filterList(symbols, query);
    this.setState({
      query,
      filtered
    });
  };

  onSearchPress = () => {
    const { query, symbols } = this.state;
    const filtered = this.filterList(symbols, query);
    this.setState({ filtered });
  };

  onHeartPress = id => {
    const { symbols, watchlist } = this.state;
    const { addSymbolToWatchlist, removeSymbolFromWatchlist } = this.props;

    const isWatched = find(watchlist, symbol => {
      return symbol.id === id;
    });

    let newWatchlist;
    let snackbarMsg;

    if (isWatched) {
      removeSymbolFromWatchlist(id);
      newWatchlist = watchlist.filter(symbol => {
        return symbol.displayName !== isWatched.displayName;
      });
      snackbarMsg = `${isWatched.displayName} removed from favorites`;
    } else {
      addSymbolToWatchlist(id);
      const toAdd = find(symbols, symbol => {
        return symbol.id === id;
      });
      newWatchlist = [...watchlist, toAdd];
      snackbarMsg = `${toAdd.displayName} added to favorites`;
    }

    this.setState({
      watchlist: newWatchlist,
      showSnackbar: true,
      snackbarMsg
    });
  };

  onNamePress = id => {
    const { symbols } = this.state;
    const toSend = find(symbols, symbol => {
      return symbol.id === id;
    });
    const { displayName, price, baseInstrument } = toSend;
    this.props.navigation.navigate("Symbol", {
      data: {
        id: toSend.id,
        displayName,
        price,
        description: baseInstrument.description
      }
    });
  };

  renderList = symbols => {
    const { watchlist } = this.state;
    return symbols.map((symbol, key) => {
      const { id, displayName, price } = symbol;
      const avg = (price.bid + price.ask) / 2;
      const isActive = !!find(watchlist, obj => {
        return obj.id === id;
      });
      return (
        <DataRow
          key={key}
          name={displayName}
          value={avg.toFixed(2)}
          isActive={isActive}
          onHeartPress={() => this.onHeartPress(id)}
          onNamePress={() => this.onNamePress(id)}
        />
      );
    });
  };

  render() {
    const { query, symbols, filtered, showSnackbar, snackbarMsg } = this.state;
    const { container, header, searchbar, datatable, activityIndicator, snackbar } = styles;
    const listToRender = filtered ? filtered : symbols;
    return (
      <View style={container}>
        <Appbar.Header style={header}>
          <Appbar.Content title="Market Search" />
        </Appbar.Header>

        <Searchbar
          style={searchbar}
          placeholder="Search"
          onChangeText={query => {
            this.onChangeText(query);
          }}
          onIconPress={() => {
            this.onSearchPress();
          }}
          value={query}
        />

        {listToRender ? (
          <ScrollView>
            <DataTable style={datatable}>
              {this.renderList(listToRender)}
            </DataTable>
          </ScrollView>
        ) : (
          <ActivityIndicator size={40} style={activityIndicator} />
        )}

        {showSnackbar && (
          <Snackbar
            style={snackbar}
            visible={showSnackbar}
            onDismiss={() => {
              this.setState({ showSnackbar: false });
            }}
            duration={3000}
          >
            {snackbarMsg}
          </Snackbar>
        )}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  symbols: state.symbol.symbolSearch.symbols,
  watchlist: state.symbol.getWatchlist.watchlist
});

const mapDispatchToProps = dispatch => ({
  symbolSearch: () => dispatch(symbolSearch()),
  getWatchlist: () => dispatch(getWatchlist()),
  addSymbolToWatchlist: symbolId => dispatch(addSymbolToWatchlist(symbolId)),
  removeSymbolFromWatchlist: symbolId =>
    dispatch(removeSymbolFromWatchlist(symbolId)),
  getSymbolCharts: symbolId => dispatch(getSymbolCharts(symbolId)),
  getSymbolNews: (limit, offset, tags) =>
    dispatch(getSymbolNews(limit, offset, tags))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SearchScreen);
