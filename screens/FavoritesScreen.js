import React, { Component } from "react";
import { connect } from "react-redux";
import find from "lodash/find";

import { View, ScrollView } from "react-native";
import { Appbar, DataTable, ActivityIndicator, Snackbar } from "react-native-paper";

import DataRow from "../components/DataRow";

import { getWatchlist, removeSymbolFromWatchlist, getSymbolCharts, getSymbolNews } from "../redux/symbol/actions.js";

import { styles } from "../styles/MainScreen";

class FavoritesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      watchlist: null,
      showSnackbar: false,
      snackbarMsg: ""
    };
  }

  componentWillMount() {
    this.props.navigation.addListener("willFocus", () => {
      this.props.getWatchlist();
    });
  }

  componentWillUnmount() {
    this.props.navigation.removeListener("willFocus");
  }

  componentWillReceiveProps(nextProps) {
    const { watchlist } = nextProps;
    if (watchlist) {
      this.setState({
        watchlist
      });
    }
  }

  onHeartPress = (id, displayName) => {
    const newWatchlist = this.state.watchlist.filter(symbol => {
      return symbol.displayName !== displayName;
    });
    this.props.removeSymbolFromWatchlist(id);
    const snackbarMsg = `${displayName} removed from favorites`;
    this.setState({
      watchlist: newWatchlist,
      showSnackbar: true,
      snackbarMsg
    });
  };

  onNamePress = id => {
    const { watchlist } = this.state;
    const toSend = find(watchlist, symbol => {
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

  renderList = watchlist => {
    return watchlist.map((symbol, key) => {
      const { id, displayName, price } = symbol;
      const avg = (price.bid + price.ask) / 2;
      return (
        <DataRow
          key={key}
          name={displayName}
          value={avg.toFixed(2)}
          isActive={true}
          onHeartPress={() => this.onHeartPress(id, displayName)}
          onNamePress={() => this.onNamePress(id)}
        />
      );
    });
  };

  render() {
    const { watchlist, showSnackbar, snackbarMsg } = this.state;
    const { container, header, datatable, activityIndicator, snackbar } = styles;
    return (
      <View style={container}>
        <Appbar.Header style={header}>
          <Appbar.Content title="Favorites" />
        </Appbar.Header>

        {watchlist ? (
          <ScrollView>
            <DataTable style={datatable}>
              {this.renderList(watchlist)}
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
  watchlist: state.symbol.getWatchlist.watchlist
});

const mapDispatchToProps = dispatch => ({
  getWatchlist: () => dispatch(getWatchlist()),
  removeSymbolFromWatchlist: symbolId => dispatch(removeSymbolFromWatchlist(symbolId))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FavoritesScreen);
