import React, { Component } from "react";
import { connect } from "react-redux";
import { View, ScrollView, Text } from "react-native";
import { Appbar, Divider } from "react-native-paper";
import { LineChart } from "react-native-svg-charts";
import "react-native-svg";
import moment from 'moment';

import { getSymbolCharts, getSymbolNews, invalidateNews } from "../redux/symbol/actions.js";

import { styles } from "../styles/SymbolScreen";

class SymbolScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      offset: 0,
      news: null,
    };
  }

  componentWillMount() {
    this.props.navigation.addListener("willFocus", () => {
      const { offset } = this.state;
      const { id } = this.props.navigation.getParam("data");
      this.props.getSymbolNews(5, offset, id);
      this.props.getSymbolCharts(id);
    });
  }

  componentWillReceiveProps(nextProps) {
    const { news, offset } = this.state;
    if (!nextProps.loading && nextProps.news) {
      const newNews = !!news
        ? [...news, ...nextProps.news.results]
        : nextProps.news.results;
      this.setState({ news: newNews, offset: offset + 5 });
    }
  }

  goBack = () => {
    this.props.invalidateNews();
    this.props.navigation.goBack();
  };

  getChartData = () => {
    const { charts } = this.props;
    return charts.map(chart => {
      return Math.round((chart.low + chart.high) / 2);
    });
  };

  getNewsData = () => {
    const { offset } = this.state;
    const { id } = this.props.navigation.getParam("data");
    this.props.getSymbolNews(5, offset, id);
  };

  onShowMorePress = () => {
    this.getNewsData();
  };

  renderNews = () => {
    const { news } = this.state;
    const { newsTitle, newsDate } = styles;
    return news.map((post, key) => {
      const { title, published } = post;
      return (
        <View key={key} style={news}>
          <Text style={newsTitle}>{title}</Text>
          <Text style={newsDate}>{moment(published).format('DD[.] MMM YYYY[.]')}</Text>
          <Divider />
        </View>
      );
    });
  };

  render() {
    const { displayName, price, description } = this.props.navigation.getParam("data");
    const avg = (price.bid + price.ask) / 2;
    const { container, header, heading, chart, content, subTitle, descriptionText, showMore } = styles;
    return (
      <View style={container}>
        <Appbar.Header style={header}>
          <Appbar.BackAction onPress={this.goBack} />
          <Appbar.Content title={displayName} />
        </Appbar.Header>

        <ScrollView>
          <Text style={heading}>{`$ ${avg.toFixed(2)}`}</Text>

          {this.props.charts && (
            <LineChart
              style={chart}
              data={this.getChartData()}
              svg={{ stroke: "rgb(0, 150, 136)" }}
              contentInset={{ top: 20, bottom: 20 }}
            />
          )}
          <View style={content}>
            <Text style={subTitle}>ABOUT</Text>
            <Text style={descriptionText}>{description}</Text>
          </View>
          <View style={content}>
            <Text style={subTitle}>NEWS</Text>
            {!!this.state.news && this.renderNews()}
          </View>
          <Text style={showMore} onPress={() => {this.onShowMorePress()}}>SHOW MORE</Text>
        </ScrollView>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.symbol.symbolCharts.loading,
  charts: state.symbol.symbolCharts.charts,
  news: state.symbol.symbolNews.news
});

const mapDispatchToProps = dispatch => ({
  getSymbolCharts: symbolId => dispatch(getSymbolCharts(symbolId)),
  getSymbolNews: (limit, offset, tags) =>
    dispatch(getSymbolNews(limit, offset, tags)),
  invalidateNews: () => dispatch(invalidateNews())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SymbolScreen);
