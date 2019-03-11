import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import PropTypes from "prop-types";

import { validateEmail, validatePassword } from "../lib/validation";

import { authUser } from "../redux/auth/actions";

import TextField from "./TextField";

import { styles } from "../styles/SignInForm";

class SignInForm extends Component {
  static propTypes = {
    loading: PropTypes.bool,
    signIn: PropTypes.func,
  };

  constructor(props) {
    super(props);
    this.state = {
      email: "mladen.maximovic@gmail.com",
      password: "Qwer1234",
      emailMessage: "",
      passwordMessage: ""
    };
  }

  submit = () => {
    const { email, password } = this.state;
    const formValid = this.validate(email, password);
    if (formValid) {
      this.props.authUser(email, password);
    }
  };

  validate = (email, password) => {
    const emailMessage = validateEmail(email);
    const passwordMessage = validatePassword(password);

    this.setState({
      emailMessage,
      passwordMessage
    });

    if (!!emailMessage || !!passwordMessage) {
      return false;
    }

    return true;
  };

  render() {
    const { loading, error } = this.props;
    const { emailMessage, passwordMessage } = this.state;
    const { container, errorText, fields, button, buttonContent } = styles;
    return (
      <View style={container}>
        <View style={fields}>
          <TextField
            type="text"
            label="Email"
            onChange={val => this.setState({ email: val })}
            errorMessage={emailMessage}
          />

          <TextField
            type="password"
            label="Password"
            onChange={val => this.setState({ password: val })}
            errorMessage={passwordMessage}
          />
        </View>

        {!loading && error && <Text style={errorText}>{error.message}</Text>}

        <Button
          style={button}
          contentStyle={buttonContent}
          mode="contained"
          loading={loading}
          onPress={() => this.submit()}
        >
          {!loading && "SIGN IN"}
        </Button>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  loading: state.auth.loading,
  error: state.auth.error
});

const mapDispatchToProps = dispatch => ({
  authUser: (username, password) => dispatch(authUser(username, password))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInForm);
