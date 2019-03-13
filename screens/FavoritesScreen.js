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

  componentWillReceiveProps(nextProps) {
    const { symbol, charts, news  } = nextProps;
    if (news) {
      this.props.navigation.navigate("Symbol", { data: { symbol, charts } });
    }
  }

  unfollowSymbol = (id, name) => {
    this.props.updateWatchlist(id, false);
    const snackbarMsg = `${name} removed from favorites`;
    this.setState({
      showSnackbar: true,
      snackbarMsg
    });
  };

  openSymbol = id => {
    this.props.getSymbol(id);
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
          followSymbol={() => this.unfollowSymbol(id, name)}
          openSymbol={() => this.openSymbol(id)}
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
    const { container, header } = styles;
    return (
      <View style={container}>
        <Appbar.Header style={header}>
          <Appbar.Content title="Favorites" />
        </Appbar.Header>
        {this.renderOverlay()}
        {this.renderWatchlist()}
        {this.renderSnackbar()}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  watchlist: state.search.watchlist,
  loading: state.symbol.loading,
  symbol: state.symbol.symbol,
  charts: state.symbol.charts,
  news: state.symbol.news
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
