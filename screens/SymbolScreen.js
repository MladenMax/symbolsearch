import React, { Component } from "react";
import { connect } from "react-redux";
import { View, ScrollView, Text } from "react-native";
import { Appbar, Divider, ActivityIndicator } from "react-native-paper";
import { LineChart } from "react-native-svg-charts";
import "react-native-svg";
import moment from 'moment';

import { getNews } from "../redux/symbol/actions.js";

import { styles } from "../styles/SymbolScreen";

class SymbolScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      limit: 5
    };
  }

  goBack = () => {
    this.props.navigation.goBack();
  };

  getChartData = charts => {
    return charts.map(chart => {
      const { high, low } = chart;
      if (high && low) {
        return Math.round((high + low) / 2);
      }
    });
  };

  onShowMore = id => {
    const limit = this.state.limit + 5;
    this.props.getNews(limit, 0, id);
    this.setState({ limit });
  };

  renderChart = charts => {
    if (charts) {
      return (
        <LineChart
          style={styles.chart}
          data={this.getChartData(charts)}
          svg={{ stroke: "rgb(0, 150, 136)" }}
          contentInset={{ top: 20, bottom: 20 }}
        />
      );
    }
    return null;
  }

  renderAbout = description => {
    if (!!description) {
      const { content, subTitle, descriptionText } = styles;
      return (
        <View style={content}>
          <Text style={subTitle}>ABOUT</Text>
          <Text style={descriptionText}>{description}</Text>
        </View>
      );
    }
    return null;
  }

  renderNews = news => {
    if (news) {
      const { content, subTitle } = styles;
      return (
        <View style={content}>
          <Text style={subTitle}>NEWS</Text>
          {this.renderRows(news)}
          {this.renderShowMoreOrSpinner()}
        </View>
      );
    }
    return null;
  }

  renderRows = news => {
    const { newsContainer, newsTitle, newsDate } = styles;
    return news.map((post, key) => {
      const { title, published } = post;
      return (
        <View key={key} style={newsContainer}>
          <Text style={newsTitle}>{title}</Text>
          <Text style={newsDate}>{moment(published).format('DD[.] MMM YYYY[.]')}</Text>
          <Divider />
        </View>
      );
    });
  };

  renderShowMoreOrSpinner = () => {
    const { loading, symbol } = this.props;
    const { showMore, showMoreSpinner } = styles;
    if (!loading) {
      return <Text style={showMore} onPress={() => { this.onShowMore(symbol.id) }}>SHOW MORE</Text>;
    }
    return <ActivityIndicator size={20} style={showMoreSpinner} />;
  }

  renderContent = () => {
    const { symbol, news, charts } = this.props;
    const { heading, symbolSpinner } = styles;
    if (symbol) {
      const { price, description } = symbol;
      const average = (price.bid + price.ask) / 2;
      return (
        <ScrollView>
          <Text style={heading}>{`$ ${average.toFixed(2)}`}</Text>
          {this.renderChart(charts)}
          {this.renderAbout(description)}
          {this.renderNews(news)}
        </ScrollView>
      )
    }
    return <ActivityIndicator size={40} style={symbolSpinner} />;
  }

  render() {
    const name = this.props.navigation.getParam("name");
    const { container, header } = styles;
    return (
      <View style={container}>
        <Appbar.Header style={header}>
          <Appbar.BackAction onPress={this.goBack} />
          <Appbar.Content title={name} />
        </Appbar.Header>
        {this.renderContent()}
      </View>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.symbol.loading,
  symbol: state.symbol.symbol,
  charts: state.symbol.charts,
  news: state.symbol.news
});

const mapDispatchToProps = dispatch => ({
  getNews: (limit, offset, id) => dispatch(getNews(limit, offset, id))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SymbolScreen);
