import React, { Component } from "react";
import { connect } from "react-redux";
import { View, Text } from "react-native";
import { Button } from "react-native-paper";
import PropTypes from "prop-types";

import { validateEmail, validatePassword } from "../lib/validation";

import { signIn } from "../redux/auth/actions";

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
      emailMsg: "",
      passwordMsg: ""
    };
  }
  
  submit = () => {
    const { email, password } = this.state;
    const formValid = this.validate();
    if (formValid) {
      this.props.signIn(email, password);
    }
  };

  validate = () => {
    const { email, password } = this.state;
    const emailMsg = validateEmail(email);
    const passwordMsg = validatePassword(password);

    this.setState({
      emailMsg,
      passwordMsg
    });

    if (!!emailMsg || !!passwordMsg) {
      return false;
    }

    return true;
  };

  render() {
    const { loading, error } = this.props;
    const { emailMsg, passwordMsg } = this.state;
    const { container, errorText, fields, button, buttonContent } = styles;
    return (
      <View style={container}>
        <View style={fields}>
          <TextField
            type="text"
            label="Email"
            onChange={val => this.setState({ email: val })}
            errMsg={emailMsg}
          />

          <TextField
            type="password"
            label="Password"
            onChange={val => this.setState({ password: val })}
            errMsg={passwordMsg}
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
  signIn: (username, password) => dispatch(signIn(username, password))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignInForm);
