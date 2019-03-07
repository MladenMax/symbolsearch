import React, { Component } from "react";
import { connect } from "react-redux";
import { KeyboardAvoidingView, Text } from "react-native";

import SignInForm from "../components/SignInForm";

import { getUserInfo, getUserAccounts } from "../redux/user/actions";

import { styles } from "../styles/SignInScreen";

class SignInScreen extends Component {
  static navigationOptions = {
    header: null
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.authenticated) {
      this.props.getUserInfo();
      this.props.navigation.navigate("Tabs");
    }
  }

  componentWillUnmount() {
    this.props.getUserAccounts();
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
  authenticated: state.auth.authenticated
});

const mapDispatchToProps = dispatch => ({
  getUserInfo: () => dispatch(getUserInfo()),
  getUserAccounts: () => dispatch(getUserAccounts())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInScreen);
