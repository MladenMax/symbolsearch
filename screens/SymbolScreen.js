import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, Text } from 'react-native';
import { Appbar, Divider, ActivityIndicator } from 'react-native-paper';

import 'react-native-svg';
import { LineChart } from 'react-native-svg-charts';
import moment from 'moment';

import { getNews, closeSymbol } from '../redux/symbol/actions.js';

import { colors } from '../consts/colors';
import { styles } from '../styles/SymbolScreen';

class SymbolScreen extends Component {
	constructor(props) {
		super(props);

		this.state = {
			limit: 5,
		};
	}

	goBack = () => {
		this.props.closeSymbol();
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
	};

	renderChart = () => {
		const { charts } = this.props;
		if (charts) {
			return (
				<LineChart
					style={styles.chart}
					data={this.getChartData(charts)}
					svg={{ stroke: colors.stroke }}
					contentInset={{ top: 20, bottom: 20 }}
				/>
			);
		}
		return null;
	};

	renderNews = () => {
		const { news } = this.props;
		if (news) {
			const { content, subTitle } = styles;
			return (
				<View style={content}>
					<Text style={subTitle}>NEWS</Text>
					{this.renderRows(news)}
				</View>
			);
		}
		return null;
	};

	renderRows = news => {
		const { newsContainer, newsTitle, newsDate } = styles;
		return news.map((post, key) => {
			const { title, published } = post;
			return (
				<View key={key} style={newsContainer}>
					<Text style={newsTitle}>{title}</Text>
					<Text style={newsDate}>
						{moment(published).format('DD[.] MMM YYYY[.]')}
					</Text>
					<Divider />
				</View>
			);
		});
	};

	renderShowMoreOrSpinner = id => {
		const { updating } = this.props;
		const { showMore, showMoreSpinner } = styles;
		if (!updating) {
			return (
				<Text
					style={showMore}
					onPress={() => {
						this.onShowMore(id);
					}}
				>
					SHOW MORE
				</Text>
			);
		}
		return <ActivityIndicator size={20} style={showMoreSpinner} />;
	};

	render() {
		const { symbol } = this.props;
		const { container, header, heading } = styles;
		if (symbol) {
			const { id, name, price, description } = symbol;
			const average = (price.bid + price.ask) / 2;
			return (
				<View style={container}>
					<Appbar.Header style={header}>
						<Appbar.BackAction onPress={this.goBack} />
						<Appbar.Content title={name} />
					</Appbar.Header>

					<ScrollView>
						<Text style={heading}>{`$ ${average.toFixed(2)}`}</Text>
						{this.renderChart()}
						{this.renderAbout(description)}
						{this.renderNews()}
						{this.renderShowMoreOrSpinner(id)}
					</ScrollView>
				</View>
			);
		}
		return null;
	}
}

const mapStateToProps = state => ({
	symbol: state.symbol.symbol,
	charts: state.symbol.charts,
	news: state.symbol.news,
	updating: state.symbol.updating,
});

const mapDispatchToProps = dispatch => ({
	closeSymbol: () => dispatch(closeSymbol()),
	getNews: (limit, offset, id) => dispatch(getNews(limit, offset, id)),
});

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(SymbolScreen);
