import React, { Component } from "react";
import { connect } from "react-redux";

import { View, ScrollView } from "react-native";
import { Appbar, DataTable, ActivityIndicator, Snackbar } from "react-native-paper";

import DataRow from "../components/DataRow";

import { getWatchlist, updateWatchlist } from "../redux/search/actions";
import { getSymbol } from "../redux/symbol/actions.js";

import { styles } from "../styles/MainScreen";

class FavoritesScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSnackbar: false,
      snackbarMsg: ""
    };
  }

  unfollowSymbol = (id, name) => {
    this.props.updateWatchlist(id, false);
    const snackbarMsg = `${name} removed from favorites`;
    this.setState({
      showSnackbar: true,
      snackbarMsg
    });
  };

  openSymbol = (id, name) => {
    this.props.getSymbol(id);
    this.props.navigation.navigate("Symbol", { id, name });
  };

  renderRows = watchlist => {
    return watchlist.map((symbol, key) => {
      const { id, name, price } = symbol;
      const average = (price.bid + price.ask) / 2;
      return (
        <DataRow
          key={key}
          name={name}
          value={average}
          following={true}
          onHeartPress={() => this.unfollowSymbol(id, name)}
          onNamePress={() => this.openSymbol(id, name)}
        />
      );
    });
  };

  renderWatchlist = () => {
    const { watchlist } = this.props;
    const { datatable, activityIndicator } = styles;
    if (watchlist) {
      return (
        <ScrollView>
          <DataTable style={datatable}>
            {this.renderRows(watchlist)}
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
    const { container, header } = styles;
    return (
      <View style={container}>
        <Appbar.Header style={header}>
          <Appbar.Content title="Favorites" />
        </Appbar.Header>
        {this.renderWatchlist()}
        {this.renderSnackbar()}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  watchlist: state.search.watchlist
});

const mapDispatchToProps = dispatch => ({
  getWatchlist: () => dispatch(getWatchlist()),
  updateWatchlist: (id, following) => dispatch(updateWatchlist(id, following)),
  getSymbol: id => dispatch(getSymbol(id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FavoritesScreen);
