import React, { Component } from 'react';
import { connect } from 'react-redux';
import { KeyboardAvoidingView, Text } from 'react-native';

import SignInForm from '../components/SignInForm';

import { styles } from '../styles/SignInScreen';

class SignInScreen extends Component {
	static navigationOptions = {
		header: null,
	};

	componentWillReceiveProps(nextProps) {
		nextProps.authenticated && this.props.navigation.navigate('Tabs');
	}

	render() {
		const { container, heading } = styles;
		return (
			<KeyboardAvoidingView behavior="padding" style={container}>
				<Text style={heading}>Welcome</Text>
				<SignInForm />
			</KeyboardAvoidingView>
		);
	}
}

const mapStateToProps = state => ({
	authenticated: state.auth.authenticated,
});

export default connect(
	mapStateToProps,
	null
)(SignInScreen);
